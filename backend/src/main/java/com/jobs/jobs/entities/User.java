package com.jobs.jobs.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.Instant;

@Entity
@Table(name="users", uniqueConstraints=@UniqueConstraint(name="uk_users_email", columnNames="email"))
public class User {
    @Id 
    @GeneratedValue(strategy=GenerationType.IDENTITY) 
    private Long id;

    @NotBlank 
    @Size(max=100) 
    private String fullName;
    
    @NotBlank 
    @Email 
    @Size(max=255) 
    private String email;
    
    @NotBlank 
    @Size(min=60, max=100) 
    private String passwordHash; // BCrypt ~60 chars

    @Enumerated(EnumType.STRING) 
    @Column(nullable=false) 
    private UserRole role = UserRole.USER;
    
    @Column(nullable=false, updatable=false) 
    private Instant createdAt = Instant.now();
    
    // Additional profile fields
    @Size(max=20)
    private String phone;
    
    @Size(max=100)
    private String location;
    
    @Column(columnDefinition = "TEXT")
    private String bio;
    
    @Size(max=500)
    private String skills;
    
    @Size(max=500)
    private String experience;
    
    @Size(max=300)
    private String education;
    
    @Column(name = "resume_url")
    private String resumeUrl;

    // Constructors
    public User() {}
    
    public User(String fullName, String email, String passwordHash, UserRole role){
        this.fullName=fullName; 
        this.email=email; 
        this.passwordHash=passwordHash; 
        this.role=role;
    }

    // Getters and Setters
    public Long getId(){ return id; }
    
    public String getFullName(){ return fullName; } 
    public void setFullName(String fullName){ this.fullName=fullName; }
    
    public String getEmail(){ return email; } 
    public void setEmail(String email){ this.email=email; }
    
    public String getPasswordHash(){ return passwordHash; } 
    public void setPasswordHash(String passwordHash){ this.passwordHash=passwordHash; }
    
    public UserRole getRole(){ return role; } 
    public void setRole(UserRole role){ this.role=role; }
    
    public Instant getCreatedAt(){ return createdAt; }
    
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    
    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }
    
    public String getExperience() { return experience; }
    public void setExperience(String experience) { this.experience = experience; }
    
    public String getEducation() { return education; }
    public void setEducation(String education) { this.education = education; }
    
    public String getResumeUrl() { return resumeUrl; }
    public void setResumeUrl(String resumeUrl) { this.resumeUrl = resumeUrl; }
}