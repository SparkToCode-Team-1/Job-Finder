package com.jobs.jobs.dto;

public class StatsResponse {
    private long totalJobs;
    private long totalCompanies;
    private long totalUsers;
    private long successRate;

    // Default constructor
    public StatsResponse() {}

    // Constructor with all fields
    public StatsResponse(long totalJobs, long totalCompanies, long totalUsers, long successRate) {
        this.totalJobs = totalJobs;
        this.totalCompanies = totalCompanies;
        this.totalUsers = totalUsers;
        this.successRate = successRate;
    }

    // Getters and setters
    public long getTotalJobs() {
        return totalJobs;
    }

    public void setTotalJobs(long totalJobs) {
        this.totalJobs = totalJobs;
    }

    public long getTotalCompanies() {
        return totalCompanies;
    }

    public void setTotalCompanies(long totalCompanies) {
        this.totalCompanies = totalCompanies;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }

    public long getSuccessRate() {
        return successRate;
    }

    public void setSuccessRate(long successRate) {
        this.successRate = successRate;
    }

    @Override
    public String toString() {
        return "StatsResponse{" +
                "totalJobs=" + totalJobs +
                ", totalCompanies=" + totalCompanies +
                ", totalUsers=" + totalUsers +
                ", successRate=" + successRate +
                '}';
    }
}
