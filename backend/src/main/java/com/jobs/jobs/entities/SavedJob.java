package com.rihal.Jobfinder;


import jakarta.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

@Entity @Table(name = "saved_jobs")
public class SavedJob {
    @EmbeddedId
    private SavedJobId id;

    @ManyToOne @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne @MapsId("jobId")
    @JoinColumn(name = "job_id")
    private Job job;

    @Column(name = "saved_at")
    private Instant savedAt;

    public SavedJob() {}
    public SavedJob(User user, Job job){ this.user = user; this.job = job; this.id = new SavedJobId(user.getId(), job.getId()); }

    // getters/setters ...
}

