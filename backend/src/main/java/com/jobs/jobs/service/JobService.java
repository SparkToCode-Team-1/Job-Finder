import com.jobs.jobs.dto.SentimentResult;
import com.jobs.jobs.entities.Job;
import com.jobs.jobs.repositories.JobRepository;
import com.jobs.jobs.service.sentiment.SentimentService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {
    private final JobRepository jobRepository;
    private final SentimentService sentimentService;

    public JobService(JobRepository jobRepository, SentimentService sentimentService) {
        this.jobRepository = jobRepository;
        this.sentimentService = sentimentService;
    }

    // Analyze one job by ID
    public Job analyzeJobSentiment(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        SentimentResult result = sentimentService.analyze(job.getDescription());

        job.setSentimentScore(result.getScore());
        job.setSentimentLabel(result.getLabel());
        job.setSentimentRationale(result.getRationale());

        return jobRepository.save(job);
    }

    // Analyze all existing jobs
    public void analyzeAllJobs() {
        List<Job> jobs = jobRepository.findAll();
        for (Job job : jobs) {
            SentimentResult result = sentimentService.analyze(job.getDescription());
            job.setSentimentScore(result.getScore());
            job.setSentimentLabel(result.getLabel());
            job.setSentimentRationale(result.getRationale());
            jobRepository.save(job);
        }
    }
}
