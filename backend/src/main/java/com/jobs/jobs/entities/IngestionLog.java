package com.rihal.Jobfinder;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "ingestion_logs")
public class IngestionLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ingestion_id")
    private Long id;

    private String source;

    private String status;

    @Column(name = "timestamp")
    private Instant timestamp;

    @Column(columnDefinition = "text")
    private String message;

    // ---- Getters & Setters ----
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
