package com.jobs.jobs.repositories;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;

import com.jobs.jobs.entities.Jobs;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface JobRepository extends JpaRepository<Jobs,Integer>{

    @Query(value = """
    SELECT j.*
    FROM jobs j
    WHERE
      (:location  IS NULL OR j.location::text ILIKE ('%' || :location || '%'))
      AND (:keyword   IS NULL OR j.title::text    ILIKE ('%' || :keyword  || '%'))
      AND (
        :salaryMin IS NULL OR
        (CASE
           WHEN j.salary_min ~ '^[0-9]+(\\.[0-9]+)?$' THEN j.salary_min::numeric
           ELSE NULL
         END) >= :salaryMin
      )
      AND (
        :salaryMax IS NULL OR
        (CASE
           WHEN j.salary_max ~ '^[0-9]+(\\.[0-9]+)?$' THEN j.salary_max::numeric
           ELSE NULL
         END) <= :salaryMax
      )
    """,
            nativeQuery = true)
    List<Jobs> searchJobs(
            @Param("location")  String location,
            @Param("keyword")   String keyword,
            @Param("salaryMin") BigDecimal salaryMin,
            @Param("salaryMax") BigDecimal salaryMax
    );

    Optional<Jobs> findBySourceIdAndSourceJobId(String sourceId, String sourceJobId);
    Optional<Jobs> getDistinctByDescription(String description);
    List<Jobs> queryDistinctByLocationContains(String location);
}
