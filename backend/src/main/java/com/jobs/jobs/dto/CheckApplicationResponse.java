package com.jobs.jobs.dto;

public class CheckApplicationResponse {
    private boolean hasApplied;
    private String status;
    
    public CheckApplicationResponse(boolean hasApplied, String status) {
        this.hasApplied = hasApplied;
        this.status = status;
    }
    
    public boolean isHasApplied() {
        return hasApplied;
    }
    
    public void setHasApplied(boolean hasApplied) {
        this.hasApplied = hasApplied;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
}
