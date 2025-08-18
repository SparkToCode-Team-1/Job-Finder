package com.jobs.jobs.repositories;



import org.springframework.data.jpa.repository.JpaRepository;

import com.jobs.jobs.entities.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // Look up a user by email
    Optional<User> findByEmail(String email);

    // Check if an email is already taken
    boolean existsByEmail(String email);
}
