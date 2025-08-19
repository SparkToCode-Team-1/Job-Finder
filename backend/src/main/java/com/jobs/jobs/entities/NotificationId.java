package com.rihal.Jobfinder;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class NotificationId implements Serializable {

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "job_id")
    private Long jobId;

    @Column(name = "type")
    private String type; // e.g., "digest" or "instant"

    public NotificationId() {}

    public NotificationId(Long userId, Long jobId, String type) {
        this.userId = userId;
        this.jobId = jobId;
        this.type = type;
    }

    // ---- Getters & Setters ----
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    // ---- equals & hashCode ----
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof NotificationId that)) return false;
        return Objects.equals(userId, that.userId) &&
                Objects.equals(jobId, that.jobId) &&
                Objects.equals(type, that.type);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, jobId, type);
    }
}
