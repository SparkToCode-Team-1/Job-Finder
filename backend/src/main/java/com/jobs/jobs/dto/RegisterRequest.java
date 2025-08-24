package com.jobs.jobs.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class RegisterRequest {
    @NotBlank @Size(min=2, max=100) private String fullName;
    @NotBlank @Email private String email;
    @NotBlank @Size(min=8, max=64)
    @Pattern(regexp="^(?=.*[A-Za-z])(?=.*\\d).+$", message="Password must contain letters and numbers")
    private String password;

    public String getFullName(){ return fullName; } public void setFullName(String v){ this.fullName=v; }
    public String getEmail(){ return email; } public void setEmail(String v){ this.email=v; }
    public String getPassword(){ return password; } public void setPassword(String v){ this.password=v; }
}
