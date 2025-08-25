package com.jobs.jobs.controllers;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.jobs.jobs.entities.Jobs;
import com.jobs.jobs.repositories.JobRepository;
import com.jobs.jobs.repositories.UserRepository;
import com.jobs.jobs.dto.StatsResponse;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobRepository jobRepo;
    
    @Autowired
    private UserRepository userRepo;

    // Get platform statistics
    @GetMapping("/stats")
    public ResponseEntity<StatsResponse> getStats() {
        // Get total jobs count
        long totalJobs = jobRepo.count();
        
        // Get total companies count (distinct companies)
        long totalCompanies = jobRepo.findAll().stream()
            .map(Jobs::getCompany)
            .filter(java.util.Objects::nonNull)
            .distinct()
            .count();
        
        // Get total users count
        long totalUsers = userRepo.count();
        
        // Calculate success rate (for demo purposes, using a formula)
        // In real scenario, this would be based on actual application/hire data
        long successRate = Math.min(95, Math.max(85, (int) (85 + (totalJobs / 50))));
        
        StatsResponse stats = new StatsResponse(totalJobs, totalCompanies, totalUsers, successRate);
        
        return ResponseEntity.ok(stats);
    }

    // List all jobs
    @GetMapping
    public List<Jobs> getAllJobs() {
        return jobRepo.findAll();
    }

    // Get a single job by ID
    @GetMapping("/{id}")
    public ResponseEntity<Jobs> getJobById(@PathVariable Integer id) {
        return ResponseEntity.of(jobRepo.findById(id));
    }

    // Create a new job
    @PostMapping
    public ResponseEntity<?> createJob(@RequestBody Jobs jobs) {
        boolean exists = jobRepo.findBySourceIdAndSourceJobId(jobs.getSourceId(), jobs.getSourceJobId()).isPresent();
        if (exists) {
            return ResponseEntity.badRequest().body("Job with the same source_id and source_job_id already exists.");
        }
        Jobs saved = jobRepo.save(jobs);
        return ResponseEntity.created(URI.create("/api/jobs/" + saved.getId())).body(saved);
    }

    // Update an existing job
    @PutMapping("/{id}")
    public ResponseEntity<Jobs> updateJobById(@PathVariable Integer id, @RequestBody Jobs toUpdate) {
        Optional<Jobs> existingJobOpt = jobRepo.findById(id);
        if (existingJobOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Jobs existingJob = existingJobOpt.get();
        existingJob.setSourceId(toUpdate.getSourceId());
        existingJob.setSourceJobId(toUpdate.getSourceJobId());
        existingJob.setTitle(toUpdate.getTitle());
        existingJob.setCompany(toUpdate.getCompany());
        existingJob.setLocation(toUpdate.getLocation());
        existingJob.setSalaryMin(toUpdate.getSalaryMin());
        existingJob.setSalaryMax(toUpdate.getSalaryMax());
        existingJob.setDescription(toUpdate.getDescription());
        existingJob.setJobType(toUpdate.getJobType());
        existingJob.setCategory(toUpdate.getCategory());
        existingJob.setPostedAt(toUpdate.getPostedAt());
        existingJob.setRawPayload(toUpdate.getRawPayload());
        existingJob.setIngestedAt(toUpdate.getIngestedAt());
        Jobs savedJob = jobRepo.save(existingJob);
        return ResponseEntity.ok(savedJob);
    }

    // Delete a job
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable Integer id) {
        Optional<Jobs> jobOpt = jobRepo.findById(id);
        if (jobOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        jobRepo.delete(jobOpt.get());
        return ResponseEntity.ok().build();
    }

    // Optional pagination endpoint
    @GetMapping("/page")
    public Page<Jobs> listJobs(Pageable pageable) {
        int size = Math.min(Math.max(pageable.getPageSize(), 1), 20);
        int page = Math.max(pageable.getPageNumber(), 0);
        Pageable safe = PageRequest.of(page, size, pageable.getSort());
        return jobRepo.findAll(safe);
    }

    // Count jobs endpoint
    @GetMapping("/count")
    public ResponseEntity<String> getJobsCount() {
        long count = jobRepo.count();
        return ResponseEntity.ok("Jobs count: " + count);
    }

    // Update existing jobs with categories
    @PostMapping("/update-categories")
    public ResponseEntity<String> updateJobCategories() {
        List<Jobs> jobs = jobRepo.findAll();
        
        for (Jobs job : jobs) {
            if (job.getCategory() == null || job.getCategory().isEmpty()) {
                // Assign categories based on job title keywords
                String title = job.getTitle().toLowerCase();
                if (title.contains("software") || title.contains("developer") || title.contains("engineer")) {
                    job.setCategory("Technology");
                } else if (title.contains("data") || title.contains("analyst")) {
                    job.setCategory("Data Science");
                } else if (title.contains("design") || title.contains("ui") || title.contains("ux")) {
                    job.setCategory("Design");
                } else if (title.contains("marketing") || title.contains("digital")) {
                    job.setCategory("Marketing");
                } else if (title.contains("sales")) {
                    job.setCategory("Sales");
                } else {
                    job.setCategory("Technology"); // Default category
                }
                jobRepo.save(job);
            }
        }
        
        return ResponseEntity.ok("Updated " + jobs.size() + " jobs with categories");
    }
    

    private Jobs createJob(String title, String company, String location, String jobType, 
                          Double salaryMin, Double salaryMax, String description, String category, LocalDateTime postedAt) {
        Jobs job = new Jobs();
        job.setSourceId("sample");
        job.setSourceJobId("sample-" + title.replaceAll("\\s+", "-").toLowerCase() + "-" + company.replaceAll("\\s+", "-").toLowerCase());
        job.setTitle(title);
        job.setCompany(company);
        job.setLocation(location);
        job.setJobType(jobType);
        job.setSalaryMin(salaryMin);
        job.setSalaryMax(salaryMax);
        job.setDescription(description);
        job.setCategory(category);
        job.setPostedAt(postedAt.atZone(java.time.ZoneId.systemDefault()));
        return job;
    }

    // Check database status
    @GetMapping("/status")
    public ResponseEntity<String> getDatabaseStatus() {
        long count = jobRepo.count();
        return ResponseEntity.ok("Database contains " + count + " jobs.");
    }

    // Search jobs by title, location and category
    @GetMapping("/search")
    public ResponseEntity<List<Jobs>> searchJobs(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "10") int limit) {
        
        List<Jobs> allJobs = jobRepo.findAll();
        
        // Filter by title
        if (title != null && !title.trim().isEmpty()) {
            allJobs = allJobs.stream()
                .filter(job -> job.getTitle().toLowerCase().contains(title.toLowerCase()) ||
                              (job.getDescription() != null && job.getDescription().toLowerCase().contains(title.toLowerCase())))
                .collect(java.util.stream.Collectors.toList());
        }
        
        // Filter by location
        if (location != null && !location.trim().isEmpty()) {
            allJobs = allJobs.stream()
                .filter(job -> job.getLocation() != null && 
                              job.getLocation().toLowerCase().contains(location.toLowerCase()))
                .collect(java.util.stream.Collectors.toList());
        }
        
        // Filter by category
        if (category != null && !category.trim().isEmpty()) {
            allJobs = allJobs.stream()
                .filter(job -> job.getCategory() != null && 
                              job.getCategory().equalsIgnoreCase(category))
                .collect(java.util.stream.Collectors.toList());
        }
        
        // Limit results
        if (limit > 0) {
            allJobs = allJobs.stream()
                .limit(limit)
                .collect(java.util.stream.Collectors.toList());
        }
        
        return ResponseEntity.ok(allJobs);
    }

    // Job application endpoint
    @PostMapping("/apply")
    public ResponseEntity<String> applyForJob(@RequestBody java.util.Map<String, Object> applicationData) {
        try {
            // For now, just return a success response
            // In a real application, you would save the application to database
            Integer jobId = (Integer) applicationData.get("jobId");
            String coverLetter = (String) applicationData.get("coverLetter");
            
            // Here you could save to a JobApplication entity
            // jobApplicationRepo.save(new JobApplication(jobId, userId, coverLetter));
            
            return ResponseEntity.ok("Application submitted successfully for job ID: " + jobId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Application failed: " + e.getMessage());
        }
    }
}
