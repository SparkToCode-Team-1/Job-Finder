package com.example.jobfinder_auth.repository;


import com.example.jobfinder_auth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // Look up a user by email
    Optional<User> findByEmail(String email);

    // Check if an email is already taken
    boolean existsByEmail(String email);
}