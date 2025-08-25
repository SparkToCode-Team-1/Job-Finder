package com.jobs.jobs.controllers;

import com.jobs.jobs.dto.*;
import com.jobs.jobs.entities.User;
import com.jobs.jobs.repositories.UserRepository;
import com.jobs.jobs.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtService jwtService;

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            // Find user by email
            Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
            if (userOpt.isEmpty()) {
                return ResponseEntity.badRequest().body("Invalid email or password");
            }
            
            User user = userOpt.get();
            
            // Check password
            if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
                return ResponseEntity.badRequest().body("Invalid email or password");
            }
            
            // Generate JWT token
            org.springframework.security.core.userdetails.User userDetails = 
                new org.springframework.security.core.userdetails.User(
                    user.getEmail(), 
                    user.getPasswordHash(), 
                    java.util.Collections.emptyList()
                );
            
            String token = jwtService.generateToken(userDetails);
            UserProfile userProfile = new UserProfile(user);
            
            return ResponseEntity.ok(new AuthResponse(token, userProfile));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Login failed: " + e.getMessage());
        }
    }
    
    // Register endpoint (moved from UserController for better organization)
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try {
            // Check if email already exists
            if (userRepository.findByEmail(request.getEmail()).isPresent()) {
                return ResponseEntity.badRequest().body("Email already exists");
            }
            
            // Create new user
            User user = new User();
            user.setFullName(request.getFullName());
            user.setEmail(request.getEmail());
            user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
            
            User savedUser = userRepository.save(user);
            
            // Generate JWT token
            org.springframework.security.core.userdetails.User userDetails = 
                new org.springframework.security.core.userdetails.User(
                    savedUser.getEmail(), 
                    savedUser.getPasswordHash(), 
                    java.util.Collections.emptyList()
                );
            
            String token = jwtService.generateToken(userDetails);
            UserProfile userProfile = new UserProfile(savedUser);
            
            return ResponseEntity.ok(new AuthResponse(token, userProfile));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        }
    }
    
    // Refresh token endpoint
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken() {
        // This would be implemented if you want token refresh functionality
        return ResponseEntity.ok("Refresh token functionality not implemented yet");
    }
}
