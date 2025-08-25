package com.jobs.jobs.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.jobs.jobs.entities.Jobs;

public interface JobRepository extends JpaRepository<Jobs,Integer>{

    Optional<Jobs> findBySourceIdAndSourceJobId(String sourceId, String sourceJobId);
    
    List<Jobs> findBySourceId(String sourceId);
    
    @Modifying
    @Transactional
    @Query("DELETE FROM Jobs j WHERE j.sourceId = :sourceId")
    void deleteBySourceId(String sourceId);
}
