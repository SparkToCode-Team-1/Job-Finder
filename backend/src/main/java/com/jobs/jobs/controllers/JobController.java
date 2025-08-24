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
    @PostMapping("/add-sample")
    public ResponseEntity<String> addSampleJobs() {
        try {
            // Only load data if database is empty
            if (jobRepo.count() == 0) {
                // Sample job 1
                Jobs job1 = new Jobs();
                job1.setSourceId("indeed");
                job1.setSourceJobId("job_001");
                job1.setTitle("Senior Software Engineer");
                job1.setCompany("Tech Solutions Inc");
                job1.setLocation("Baghdad, Iraq");
                job1.setSalaryMin(new java.math.BigDecimal("800"));
                job1.setSalaryMax(new java.math.BigDecimal("1200"));
                job1.setDescription("We are looking for a Senior Software Engineer to join our dynamic team.");
                job1.setJobType("Full-time");
                job1.setPostedAt(java.time.ZonedDateTime.now().minusDays(2));
                job1.setRawPayload("{}");

                // Sample job 2
                Jobs job2 = new Jobs();
                job2.setSourceId("linkedin");
                job2.setSourceJobId("job_002");
                job2.setTitle("Frontend Developer");
                job2.setCompany("Digital Agency");
                job2.setLocation("Erbil, Iraq");
                job2.setSalaryMin(new java.math.BigDecimal("600"));
                job2.setSalaryMax(new java.math.BigDecimal("900"));
                job2.setDescription("Join our creative team as a Frontend Developer.");
                job2.setJobType("Full-time");
                job2.setPostedAt(java.time.ZonedDateTime.now().minusDays(1));
                job2.setRawPayload("{}");

                // Sample job 3
                Jobs job3 = new Jobs();
                job3.setSourceId("bayt");
                job3.setSourceJobId("job_003");
                job3.setTitle("Backend Developer");
                job3.setCompany("StartupTech");
                job3.setLocation("Basra, Iraq");
                job3.setSalaryMin(new java.math.BigDecimal("700"));
                job3.setSalaryMax(new java.math.BigDecimal("1000"));
                job3.setDescription("Looking for a skilled Backend Developer to work with Spring Boot and Java.");
                job3.setJobType("Remote");
                job3.setPostedAt(java.time.ZonedDateTime.now().minusHours(12));
                job3.setRawPayload("{}");

                jobRepo.save(job1);
                jobRepo.save(job2);
                jobRepo.save(job3);

                return ResponseEntity.ok("Sample jobs added successfully! Total jobs: " + jobRepo.count());
            } else {
                return ResponseEntity.ok("Database already has " + jobRepo.count() + " jobs.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error adding sample jobs: " + e.getMessage());
        }
    }

    // Check database status
    @GetMapping("/status")
    public ResponseEntity<String> getDatabaseStatus() {
        long count = jobRepo.count();
        return ResponseEntity.ok("Database contains " + count + " jobs.");
    }
}
