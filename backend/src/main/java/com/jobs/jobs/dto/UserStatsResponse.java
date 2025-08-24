package com.jobs.jobs.dto;

public class UserStatsResponse {
    private long totalApplications;
    private long pendingApplications;
    private long acceptedApplications;
    
    public UserStatsResponse(long totalApplications, long pendingApplications, long acceptedApplications) {
        this.totalApplications = totalApplications;
        this.pendingApplications = pendingApplications;
        this.acceptedApplications = acceptedApplications;
    }
    
    public long getTotalApplications() {
        return totalApplications;
    }
    
    public void setTotalApplications(long totalApplications) {
        this.totalApplications = totalApplications;
    }
    
    public long getPendingApplications() {
        return pendingApplications;
    }
    
    public void setPendingApplications(long pendingApplications) {
        this.pendingApplications = pendingApplications;
    }
    
    public long getAcceptedApplications() {
        return acceptedApplications;
    }
    
    public void setAcceptedApplications(long acceptedApplications) {
        this.acceptedApplications = acceptedApplications;
    }
}
