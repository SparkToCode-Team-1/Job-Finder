package com.example.jobfinder_auth.service;

import com.example.jobfinder_auth.dto.RegisterRequest;
import com.example.jobfinder_auth.entity.User;
import com.example.jobfinder_auth.entity.UserRole;
import com.example.jobfinder_auth.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    private final UserRepository repo; private final PasswordEncoder encoder;
    public UserService(UserRepository repo, PasswordEncoder encoder){ this.repo = repo; this.encoder = encoder; }

    @Transactional
    public User register(RegisterRequest r){
        if (repo.existsByEmail(r.getEmail())) throw new IllegalArgumentException("Email already in use");
        String hash = encoder.encode(r.getPassword());
        return repo.save(new User(r.getFullName(), r.getEmail(), hash, UserRole.USER));
    }

    public User byEmailOrThrow(String email){
        return repo.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));
    }
}