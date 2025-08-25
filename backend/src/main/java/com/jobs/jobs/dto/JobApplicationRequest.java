package com.jobs.jobs.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class JobApplicationRequest {
    
    @NotNull(message = "Job ID is required")
    private Integer jobId;
    
    @Size(max = 2000, message = "Cover letter must be less than 2000 characters")
    private String coverLetter;
    
    private String resumeUrl;
    
    // Constructors
    public JobApplicationRequest() {}
    
    public JobApplicationRequest(Integer jobId, String coverLetter, String resumeUrl) {
        this.jobId = jobId;
        this.coverLetter = coverLetter;
        this.resumeUrl = resumeUrl;
    }
    
    // Getters and Setters
    public Integer getJobId() {
        return jobId;
    }
    
    public void setJobId(Integer jobId) {
        this.jobId = jobId;
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
