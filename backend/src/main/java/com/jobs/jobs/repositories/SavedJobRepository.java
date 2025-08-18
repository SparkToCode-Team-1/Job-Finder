package com.rihal.Jobfinder.repo;

import com.rihal.Jobfinder.SavedJob;
import com.rihal.Jobfinder.SavedJobId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SavedJobRepository extends JpaRepository<SavedJob, SavedJobId> { }
