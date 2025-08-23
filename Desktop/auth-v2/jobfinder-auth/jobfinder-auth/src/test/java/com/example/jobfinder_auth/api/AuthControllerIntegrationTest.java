package com.example.jobfinder_auth.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerIntegrationTest {
    @Autowired MockMvc mvc;
    @Autowired ObjectMapper om;

    @Test
    void registerThenLogin() throws Exception {
        var registerBody = Map.of(
                "fullName", "Test User",
                "email", "test@example.com",
                "password", "Passw0rd1"
        );
        var regResp = mvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(registerBody)))
                .andExpect(status().isOk())
                .andReturn();
        String token = om.readTree(regResp.getResponse().getContentAsString()).get("token").asText();
        assertThat(token).isNotBlank();

        var loginBody = Map.of(
                "email", "test@example.com",
                "password", "Passw0rd1"
        );
        var loginResp = mvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(loginBody)))
                .andExpect(status().isOk())
                .andReturn();
        String loginToken = om.readTree(loginResp.getResponse().getContentAsString()).get("token").asText();
        assertThat(loginToken).isNotBlank();
    }
}
