package com.jobs.jobs.repositories;

import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;

import com.jobs.jobs.entities.Jobs;

public interface JobRepository extends JpaRepository<Jobs,Integer>{

    Optional<Jobs> findBySourceIdAndSourceJobId(String sourceId, String sourceJobId);
}
