package com.example.jobfinder_auth.controller;

import com.example.jobfinder_auth.dto.*;
import com.example.jobfinder_auth.entity.User;
import com.example.jobfinder_auth.service.CustomUserDetailsService;
import com.example.jobfinder_auth.service.JwtService;
import com.example.jobfinder_auth.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService users; private final AuthenticationManager am; private final JwtService jwt; private final CustomUserDetailsService uds;

    public AuthController(UserService users, AuthenticationManager am, JwtService jwt, CustomUserDetailsService uds){
        this.users=users; this.am=am; this.jwt=jwt; this.uds=uds;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest r){
        User saved = users.register(r);
        UserDetails ud = uds.loadUserByUsername(saved.getEmail());
        return ResponseEntity.ok(new AuthResponse(jwt.generateToken(ud)));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest r){
        try {
            am.authenticate(new UsernamePasswordAuthenticationToken(r.getEmail(), r.getPassword()));
        } catch (Exception e) { throw new BadCredentialsException("Invalid email or password"); }
        UserDetails ud = uds.loadUserByUsername(r.getEmail());
        return ResponseEntity.ok(new AuthResponse(jwt.generateToken(ud)));
    }
}