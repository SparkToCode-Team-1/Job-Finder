package com.jobs.jobs.service.sentiment;

import com.jobs.jobs.dto.SentimentResult;

public interface SentimentService {
    SentimentResult analyze(String jobDescription);
}
