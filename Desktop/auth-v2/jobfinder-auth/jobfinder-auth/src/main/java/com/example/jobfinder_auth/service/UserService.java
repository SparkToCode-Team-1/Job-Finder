package com.example.jobfinder_auth.service;
import com.example.jobfinder_auth.dto.UserProfile;

import java.util.Map;
import java.util.HashMap;
import java.util.Set;
import com.example.jobfinder_auth.dto.RegisterRequest;
import com.example.jobfinder_auth.entity.User;
import com.example.jobfinder_auth.entity.UserRole;
import com.example.jobfinder_auth.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    private final UserRepository repo;
    private final PasswordEncoder encoder;
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
    private UserProfile toProfile(User u) {
        var p = new UserProfile(u.getId(), u.getFullName(), u.getEmail(), u.getRole().name());
        p.setPreferences(u.getPreferences());
        return p;
    }

    public UserProfile getProfile(Long userId) {
        var u = repo.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        return toProfile(u);
    }

    public UserProfile getProfileByEmail(String email) {
        return toProfile(byEmailOrThrow(email));
    }

    @org.springframework.transaction.annotation.Transactional
    public UserProfile updatePreferencesForUser(Long userId, Map<String, Object> incoming) {
        var user = repo.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        var prefs = new HashMap<>(user.getPreferences() == null ? Map.<String,Object>of() : user.getPreferences());
        var allowed = Set.of("salary_min", "location", "culture", "workType");
        incoming.forEach((k,v) -> { if (allowed.contains(k)) prefs.put(k, v); });
        user.setPreferences(prefs);
        repo.save(user);
        return toProfile(user);
    }

}