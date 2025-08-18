package com.rihal.Jobfinder;


import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.Instant;

@Entity @Table(name = "sentiments")
public class Sentiment {
    public enum Type { job, company_review }
    public enum Label { positive, neutral, negative }

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sentiment_id")
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @Enumerated(EnumType.STRING)
    private Type type;

    private Double score;

    @Enumerated(EnumType.STRING)
    private Label label;

    @Column(columnDefinition = "text")
    private String rationale;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    // getters/setters ...
}

