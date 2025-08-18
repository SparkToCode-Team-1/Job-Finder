package com.jobs.jobs.service;


import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jobs.jobs.dto.RegisterRequest;
import com.jobs.jobs.entities.User;
import com.jobs.jobs.entities.UserRole;
import com.jobs.jobs.repositories.UserRepository;

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
