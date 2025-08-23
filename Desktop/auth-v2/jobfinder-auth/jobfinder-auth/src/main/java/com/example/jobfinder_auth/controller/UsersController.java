package com.example.jobfinder_auth.controller;

import com.example.jobfinder_auth.dto.UserProfile;
import com.example.jobfinder_auth.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/src/test/api/users")
public class UsersController {

    private final UserService users;

    public UsersController(UserService users) {
        this.users = users;
    }

    // GET /api/users/me -> returns profile (includes preferences)
    @GetMapping("/me")
    public ResponseEntity<UserProfile> me(@AuthenticationPrincipal UserDetails principal) {
        return ResponseEntity.ok(users.getProfileByEmail(principal.getUsername()));
    }

    // PUT /api/users/preferences -> update simple preferences JSON
    @PutMapping("/preferences")
    public ResponseEntity<UserProfile> updatePreferences(
            @AuthenticationPrincipal UserDetails principal,
            @RequestBody Map<String, Object> body) {

        var u = users.byEmailOrThrow(principal.getUsername());
        var updated = users.updatePreferencesForUser(u.getId(), body);
        return ResponseEntity.ok(updated);
    }
}
