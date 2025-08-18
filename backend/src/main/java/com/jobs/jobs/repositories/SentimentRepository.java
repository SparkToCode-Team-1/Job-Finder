package com.rihal.Jobfinder.repo;

import com.rihal.Jobfinder.Sentiment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SentimentRepository extends JpaRepository<Sentiment, Long> {
    List<Sentiment> findByJobId(Long jobId);
}
