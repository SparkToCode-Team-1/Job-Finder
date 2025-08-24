package com.jobs.jobs.dto;

import com.jobs.jobs.entities.JobApplication;
import com.jobs.jobs.entities.ApplicationStatus;
import java.time.ZonedDateTime;

public class JobApplicationResponse {
    private Long id;
    private Long userId;
    private String userFullName;
    private Integer jobId;
    private String jobTitle;
    private String companyName;
    private ApplicationStatus status;
    private ZonedDateTime appliedAt;
    private String coverLetter;
    private String resumeUrl;
    
    // Constructor from JobApplication entity
    public JobApplicationResponse(JobApplication application) {
        this.id = application.getId();
        this.userId = application.getUser().getId();
        this.userFullName = application.getUser().getFullName();
        this.jobId = application.getJob().getId();
        this.jobTitle = application.getJob().getTitle();
        this.companyName = application.getJob().getCompany();
        this.status = application.getStatus();
        this.appliedAt = application.getAppliedAt();
        this.coverLetter = application.getCoverLetter();
        this.resumeUrl = application.getResumeUrl();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public String getUserFullName() {
        return userFullName;
    }
    
    public void setUserFullName(String userFullName) {
        this.userFullName = userFullName;
    }
    
    public Integer getJobId() {
        return jobId;
    }
    
    public void setJobId(Integer jobId) {
        this.jobId = jobId;
    }
    
    public String getJobTitle() {
        return jobTitle;
    }
    
    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }
    
    public String getCompanyName() {
        return companyName;
    }
    
    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
    
    public ApplicationStatus getStatus() {
        return status;
    }
    
    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }
    
    public ZonedDateTime getAppliedAt() {
        return appliedAt;
    }
    
    public void setAppliedAt(ZonedDateTime appliedAt) {
        this.appliedAt = appliedAt;
    }
    
    public String getCoverLetter() {
        return coverLetter;
    }
    
    public void setCoverLetter(String coverLetter) {
        this.coverLetter = coverLetter;
    }
    
    public String getResumeUrl() {
        return resumeUrl;
    }
    
    public void setResumeUrl(String resumeUrl) {
        this.resumeUrl = resumeUrl;
    }
}
