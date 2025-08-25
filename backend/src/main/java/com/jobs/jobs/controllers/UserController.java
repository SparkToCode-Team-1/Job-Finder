package com.jobs.jobs.controllers;

import com.jobs.jobs.dto.*;
import com.jobs.jobs.entities.*;
import com.jobs.jobs.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JobRepository jobRepository;
    
    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    // Get current user profile
    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile() {
        try {
            User currentUser = getCurrentUser();
            if (currentUser == null) {
                return ResponseEntity.status(401).body("User not authenticated");
            }
            
            UserProfile userProfile = new UserProfile(currentUser);
            return ResponseEntity.ok(userProfile);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to get profile: " + e.getMessage());
        }
    }
    
    // Update user profile
    @PutMapping("/profile")
    public ResponseEntity<?> updateUserProfile(@Valid @RequestBody UpdateUserProfileRequest request) {
        try {
            User currentUser = getCurrentUser();
            if (currentUser == null) {
                return ResponseEntity.status(401).body("User not authenticated");
            }
            
            // Check if email is being changed and if it's already taken by another user
            if (!currentUser.getEmail().equals(request.getEmail())) {
                Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
                if (existingUser.isPresent() && !existingUser.get().getId().equals(currentUser.getId())) {
                    return ResponseEntity.badRequest().body("Email already exists");
                }
            }
            
            // Update user fields
            currentUser.setFullName(request.getFullName());
            currentUser.setEmail(request.getEmail());
            currentUser.setPhone(request.getPhone());
            currentUser.setLocation(request.getLocation());
            currentUser.setBio(request.getBio());
            currentUser.setSkills(request.getSkills());
            currentUser.setExperience(request.getExperience());
            currentUser.setEducation(request.getEducation());
            currentUser.setResumeUrl(request.getResumeUrl());
            
            User updatedUser = userRepository.save(currentUser);
            
            UserProfile userProfile = new UserProfile(updatedUser);
            return ResponseEntity.ok(userProfile);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to update profile: " + e.getMessage());
        }
    }
    
    // Apply for a job
    @PostMapping("/apply")
    public ResponseEntity<?> applyForJob(@Valid @RequestBody JobApplicationRequest request) {
        try {
            User currentUser = getCurrentUser();
            if (currentUser == null) {
                return ResponseEntity.status(401).body("User not authenticated");
            }
            
            // Check if job exists
            Optional<Jobs> jobOpt = jobRepository.findById(request.getJobId());
            if (jobOpt.isEmpty()) {
                return ResponseEntity.badRequest().body("Job not found");
            }
            
            Jobs job = jobOpt.get();
            
            // Check if user already applied for this job
            Optional<JobApplication> existingApplication = jobApplicationRepository
                .findByUserIdAndJobId(currentUser.getId(), request.getJobId());
                
            if (existingApplication.isPresent()) {
                return ResponseEntity.badRequest().body("You have already applied for this job");
            }
            
            // Create new application
            JobApplication application = new JobApplication();
            application.setUser(currentUser);
            application.setJob(job);
            application.setCoverLetter(request.getCoverLetter());
            application.setResumeUrl(request.getResumeUrl());
            application.setStatus(ApplicationStatus.PENDING);
            
            JobApplication savedApplication = jobApplicationRepository.save(application);
            
            JobApplicationResponse response = new JobApplicationResponse(savedApplication);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to apply for job: " + e.getMessage());
        }
    }
    
    // Get user's job applications
    @GetMapping("/applications")
    public ResponseEntity<?> getUserApplications() {
        try {
            User currentUser = getCurrentUser();
            if (currentUser == null) {
                return ResponseEntity.status(401).body("User not authenticated");
            }
            
            List<JobApplication> applications = jobApplicationRepository
                .findUserApplicationsWithJobDetails(currentUser.getId());
            
            List<JobApplicationResponse> response = applications.stream()
                .map(JobApplicationResponse::new)
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to get applications: " + e.getMessage());
        }
    }
    
    // Withdraw job application
    @DeleteMapping("/applications/{applicationId}")
    public ResponseEntity<?> withdrawApplication(@PathVariable Long applicationId) {
        try {
            User currentUser = getCurrentUser();
            if (currentUser == null) {
                return ResponseEntity.status(401).body("User not authenticated");
            }
            
            Optional<JobApplication> applicationOpt = jobApplicationRepository.findById(applicationId);
            if (applicationOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            JobApplication application = applicationOpt.get();
            
            // Check if application belongs to current user
            if (!application.getUser().getId().equals(currentUser.getId())) {
                return ResponseEntity.status(403).body("You can only withdraw your own applications");
            }
            
            // Update status to withdrawn instead of deleting
            application.setStatus(ApplicationStatus.WITHDRAWN);
            jobApplicationRepository.save(application);
            
            return ResponseEntity.ok("Application withdrawn successfully");
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to withdraw application: " + e.getMessage());
        }
    }
    
    // Check if user applied for a specific job
    @GetMapping("/applications/check/{jobId}")
    public ResponseEntity<?> checkIfApplied(@PathVariable Integer jobId) {
        try {
            User currentUser = getCurrentUser();
            if (currentUser == null) {
                return ResponseEntity.status(401).body("User not authenticated");
            }
            
            Optional<JobApplication> application = jobApplicationRepository
                .findByUserIdAndJobId(currentUser.getId(), jobId);
            
            boolean hasApplied = application.isPresent() && 
                !application.get().getStatus().equals(ApplicationStatus.WITHDRAWN);
            
            return ResponseEntity.ok(new CheckApplicationResponse(hasApplied, 
                application.map(app -> app.getStatus().name()).orElse(null)));
                
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to check application: " + e.getMessage());
        }
    }
    
    // Get user statistics
    @GetMapping("/stats")
    public ResponseEntity<?> getUserStats() {
        try {
            User currentUser = getCurrentUser();
            if (currentUser == null) {
                return ResponseEntity.status(401).body("User not authenticated");
            }
            
            long totalApplications = jobApplicationRepository.countByUserId(currentUser.getId());
            long pendingApplications = jobApplicationRepository
                .findByUserIdAndStatus(currentUser.getId(), ApplicationStatus.PENDING).size();
            long acceptedApplications = jobApplicationRepository
                .findByUserIdAndStatus(currentUser.getId(), ApplicationStatus.ACCEPTED).size();
            
            UserStatsResponse stats = new UserStatsResponse(
                totalApplications, pendingApplications, acceptedApplications);
            
            return ResponseEntity.ok(stats);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to get user stats: " + e.getMessage());
        }
    }
    
    // Helper method to get current authenticated user
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }
        
        String email = authentication.getName();
        return userRepository.findByEmail(email).orElse(null);
    }
}
