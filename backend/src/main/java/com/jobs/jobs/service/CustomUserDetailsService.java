package com.jobs.jobs.service;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import com.jobs.jobs.entities.User;
import com.jobs.jobs.repositories.UserRepository;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository repo;
    public CustomUserDetailsService(UserRepository repo){ this.repo = repo; }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User u = repo.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
        return new org.springframework.security.core.userdetails.User(
                u.getEmail(), u.getPasswordHash(),
                List.of(new SimpleGrantedAuthority("ROLE_"+u.getRole().name()))
        );
    }
}