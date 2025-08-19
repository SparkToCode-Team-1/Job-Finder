package com.rihal.Jobfinder;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

@Entity
@Table(name = "notifications")
public class Notification {

    @EmbeddedId
    private NotificationId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("jobId")
    @JoinColumn(name = "job_id")
    private Job job;

    @Column(name = "sent_at")
    private Instant sentAt;

    public Notification() {}

    public Notification(User user, Job job, String type) {
        this.user = user;
        this.job = job;
        this.id = new NotificationId(user.getId(), job.getId(), type);
    }

    // ---- Getters & Setters ----
    public NotificationId getId() {
        return id;
    }

    public void setId(NotificationId id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    public Instant getSentAt() {
        return sentAt;
    }

    public void setSentAt(Instant sentAt) {
        this.sentAt = sentAt;
    }
}
