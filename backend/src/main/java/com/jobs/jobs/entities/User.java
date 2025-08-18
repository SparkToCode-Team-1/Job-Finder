package com.jobs.jobs.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.Instant;

@Entity
@Table(name="users", uniqueConstraints=@UniqueConstraint(name="uk_users_email", columnNames="email"))
public class User {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;

    @NotBlank @Size(max=100) private String fullName;
    @NotBlank @Email @Size(max=255) private String email;
    @NotBlank @Size(min=60, max=100) private String passwordHash; // BCrypt ~60 chars

    @Enumerated(EnumType.STRING) @Column(nullable=false) private UserRole role = UserRole.USER;
    @Column(nullable=false, updatable=false) private Instant createdAt = Instant.now();

    public User() {}
    public User(String fullName, String email, String passwordHash, UserRole role){
        this.fullName=fullName; this.email=email; this.passwordHash=passwordHash; this.role=role;
    }

    public Long getId(){ return id; }
    public String getFullName(){ return fullName; } public void setFullName(String v){ this.fullName=v; }
    public String getEmail(){ return email; } public void setEmail(String v){ this.email=v; }
    public String getPasswordHash(){ return passwordHash; } public void setPasswordHash(String v){ this.passwordHash=v; }
    public UserRole getRole(){ return role; } public void setRole(UserRole v){ this.role=v; }
    public Instant getCreatedAt(){ return createdAt; }
}