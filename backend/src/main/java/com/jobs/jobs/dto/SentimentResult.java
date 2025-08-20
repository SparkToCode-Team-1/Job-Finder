package com.jobs.jobs.dto;

public class SentimentResult {
    private double score;
    private String label;
    private String rationale;

    public SentimentResult(double score, String label, String rationale) {
        this.score = score;
        this.label = label;
        this.rationale = rationale;
    }

    public double getScore() { return score; }
    public String getLabel() { return label; }
    public String getRationale() { return rationale; }
}
