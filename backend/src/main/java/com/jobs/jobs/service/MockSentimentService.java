package com.jobs.jobs.service.sentiment;

import com.jobs.jobs.dto.SentimentResult;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class MockSentimentService implements SentimentService {

    private static final List<SentimentResult> MOCK_RESULTS = List.of(
            new SentimentResult(0.8, "positive", "Great company culture mentioned"),
            new SentimentResult(0.3, "negative", "High stress environment indicated"),
            new SentimentResult(0.6, "neutral", "Standard job posting")
    );

    private final Random random = new Random();

    @Override
    public SentimentResult analyze(String jobDescription) {
        return MOCK_RESULTS.get(random.nextInt(MOCK_RESULTS.size()));
    }
}
