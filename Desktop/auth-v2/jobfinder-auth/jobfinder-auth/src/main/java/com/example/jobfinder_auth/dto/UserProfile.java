package com.example.jobfinder_auth.dto;
import java.util.Map;

public class UserProfile {
    private Long id;
    private String fullName;
    private String email;
    private String role;
    private Map<String, Object> preferences; //new feild

    public UserProfile(Long id,String n,String e,String r){ this.id=id; this.fullName=n; this.email=e; this.role=r; }
    public Long getId(){ return id; }
    public String getFullName(){ return fullName; }
    public String getEmail(){ return email; }
    public String getRole(){ return role; }
//new getter and setters
    public Map<String, Object> getPreferences() { return preferences; }
    public void setPreferences(Map<String, Object> preferences) { this.preferences = preferences; }
}