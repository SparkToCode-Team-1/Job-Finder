package com.jobs.jobs.repositories;

import com.jobs.jobs.entities.JobApplication;
import com.jobs.jobs.entities.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    
    // Find applications by user
    List<JobApplication> findByUserIdOrderByAppliedAtDesc(Long userId);
    
    // Find applications by job
    List<JobApplication> findByJobIdOrderByAppliedAtDesc(Integer jobId);
    
    // Check if user already applied for a job
    Optional<JobApplication> findByUserIdAndJobId(Long userId, Integer jobId);
    
    // Find applications by status
    List<JobApplication> findByStatus(ApplicationStatus status);
    
    // Find applications by user and status
    List<JobApplication> findByUserIdAndStatus(Long userId, ApplicationStatus status);
    
    // Count applications by user
    long countByUserId(Long userId);
    
    // Count applications by job
    long countByJobId(Integer jobId);
    
    // Get user's application history with job details
    @Query("SELECT ja FROM JobApplication ja JOIN FETCH ja.job WHERE ja.user.id = :userId ORDER BY ja.appliedAt DESC")
    List<JobApplication> findUserApplicationsWithJobDetails(@Param("userId") Long userId);
}
