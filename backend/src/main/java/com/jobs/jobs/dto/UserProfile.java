package com.jobs.jobs.dto;

import com.jobs.jobs.entities.User;
import java.time.Instant;

public class UserProfile {
    private Long id;
    private String fullName;
    private String email;
    private String role;
    private Instant createdAt;
    private String phone;
    private String location;
    private String bio;
    private String skills;
    private String experience;
    private String education;
    private String resumeUrl;
    
    // Constructor from User entity
    public UserProfile(User user) {
        this.id = user.getId();
        this.fullName = user.getFullName();
        this.email = user.getEmail();
        this.role = user.getRole().name();
        this.createdAt = user.getCreatedAt();
        this.phone = user.getPhone();
        this.location = user.getLocation();
        this.bio = user.getBio();
        this.skills = user.getSkills();
        this.experience = user.getExperience();
        this.education = user.getEducation();
        this.resumeUrl = user.getResumeUrl();
    }
    
    // Legacy constructor for backward compatibility
    public UserProfile(Long id, String fullName, String email, String role) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.role = role;
    }
    
    // Getters
    public Long getId() { return id; }
    public String getFullName() { return fullName; }
    public String getEmail() { return email; }
    public String getRole() { return role; }
    public Instant getCreatedAt() { return createdAt; }
    public String getPhone() { return phone; }
    public String getLocation() { return location; }
    public String getBio() { return bio; }
    public String getSkills() { return skills; }
    public String getExperience() { return experience; }
    public String getEducation() { return education; }
    public String getResumeUrl() { return resumeUrl; }
    
    // Setters
    public void setId(Long id) { this.id = id; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public void setEmail(String email) { this.email = email; }
    public void setRole(String role) { this.role = role; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setLocation(String location) { this.location = location; }
    public void setBio(String bio) { this.bio = bio; }
    public void setSkills(String skills) { this.skills = skills; }
    public void setExperience(String experience) { this.experience = experience; }
    public void setEducation(String education) { this.education = education; }
    public void setResumeUrl(String resumeUrl) { this.resumeUrl = resumeUrl; }
}
