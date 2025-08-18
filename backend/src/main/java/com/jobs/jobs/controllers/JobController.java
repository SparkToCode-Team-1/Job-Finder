package com.jobs.jobs.controllers;

import java.net.URI;
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

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    JobRepository jobRepo;

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

    // Add sample job endpoint for testing
    // @PostMapping("/add-sample")
    // public ResponseEntity<Jobs> addSampleJob() {
    //     Jobs sampleJob = new Jobs();
    //     sampleJob.setSourceId("jobboard1");
    //     sampleJob.setSourceJobId("001");
    //     sampleJob.setTitle("Senior Software Engineer");
    //     sampleJob.setCompany("TechCorp Solutions");
    //     sampleJob.setLocation("New York, NY");
    //     sampleJob.setSalaryMin(new java.math.BigDecimal("90000"));
    //     sampleJob.setSalaryMax(new java.math.BigDecimal("130000"));
    //     sampleJob.setDescription("We are looking for an experienced Senior Software Engineer to join our growing team. You will be responsible for designing and implementing scalable web applications using modern technologies. Requirements include 5+ years of experience in Java/Spring Boot, React, and database design.");
    //     sampleJob.setJobType("Full-time");
    //     sampleJob.setPostedAt(java.time.ZonedDateTime.now().minusDays(1));
        
    //     Jobs savedJob = jobRepo.save(sampleJob);
    //     return ResponseEntity.ok(savedJob);
    // }
}
