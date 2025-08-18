package com.rihal.Jobfinder;


import jakarta.persistence.*;
import java.time.Instant;

@Entity @Table(name = "ingestion_logs")
public class IngestionLog {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ingestion_id")
    private Long id;

    private String source;
    private String status;

    @Column(name = "timestamp")
    private Instant timestamp;

    @Column(columnDefinition = "text")
    private String message;

    // getters/setters ...
}

