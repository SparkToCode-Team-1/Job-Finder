package com.example.jobfinder_auth.controller;

import com.example.jobfinder_auth.dto.UserProfile;
import com.example.jobfinder_auth.entity.User;
import com.example.jobfinder_auth.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UsersController {
    private final UserService users;
    public UsersController(UserService users){ this.users = users; }

    @GetMapping("/me")
    public UserProfile me(@AuthenticationPrincipal UserDetails principal){
        User u = users.byEmailOrThrow(principal.getUsername());
        return new UserProfile(u.getId(), u.getFullName(), u.getEmail(), u.getRole().name());
    }
}