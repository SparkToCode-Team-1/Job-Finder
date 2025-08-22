package com.jobs.jobs.controllers;

import java.math.BigDecimal;
import java.net.URI;
import java.util.List;
import java.util.Map;
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
@RequestMapping("api/jobs")
public class JobController {

    @Autowired
    JobRepository jobRepo;
    //create job
    @PostMapping("/createjob")
    public ResponseEntity<?> createJob(@RequestBody Jobs jobs) {
        boolean exists = jobRepo.findBySourceIdAndSourceJobId(jobs.getSourceId(), jobs.getSourceJobId()).isPresent();
        if (exists) {
            return ResponseEntity.badRequest().body("Job with the same source_id and source_job_id already exists.");
        }

        Jobs saved = jobRepo.save(jobs);
        return ResponseEntity.created(URI.create("/api/jobs/" + saved.getId())).body(saved);
    }

    //Return all jobs
    @GetMapping("allJobs")
    public List<Jobs> getAllJobs(){
        List<Jobs> jobsDB=jobRepo.findAll();
        return jobsDB;
    }

    //return job by id
    @GetMapping("/{id}")
    public ResponseEntity<Jobs> getJobById(@PathVariable Integer id) {
        return ResponseEntity.of(jobRepo.findById(id));
    }


    // Search Feature
    @GetMapping("/search")
    public ResponseEntity<List<Jobs>> search2(@RequestParam Map<String, String> multipleParams) {
        String location = multipleParams.getOrDefault("location", null);
        String keyword  = multipleParams.getOrDefault("keyword", null);

        BigDecimal salaryMin = null;
        BigDecimal salaryMax = null;

        try {

            String sMin = multipleParams.containsKey("salary_min")
                    ? multipleParams.get("salary_min")
                    : multipleParams.get("salaryMin");

            String sMax = multipleParams.containsKey("salary_max")
                    ? multipleParams.get("salary_max")
                    : multipleParams.get("salaryMax");

            if (sMin != null && !sMin.isBlank()) salaryMin = new BigDecimal(sMin);
            if (sMax != null && !sMax.isBlank()) salaryMax = new BigDecimal(sMax);
        } catch (NumberFormatException nfe) {
            return ResponseEntity.badRequest().body(List.of());
        }

        List<Jobs> results = jobRepo.searchJobs(location, keyword, salaryMin, salaryMax);
        return ResponseEntity.ok(results);
    }



    //update job
    @PutMapping("/update/{id}")
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

//delete job
@DeleteMapping("delJob")
public boolean deleteJob(@RequestParam Integer id){
    Jobs jToDelete=jobRepo.findById(id).get();
    jobRepo.delete(jToDelete);
    return true;
}
    @GetMapping
    public Page<Jobs> listJobs(Pageable pageable) {
        int size = Math.min(Math.max(pageable.getPageSize(), 1), 20);
        int page = Math.max(pageable.getPageNumber(), 0);
        Pageable safe = PageRequest.of(page, size, pageable.getSort());
        return jobRepo.findAll(safe);
    }


}
