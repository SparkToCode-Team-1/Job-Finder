import React, { useEffect, useMemo, useState } from "react";
import "./Jobs.css";
import { API_ENDPOINTS, fetcher } from "../../utils";
import type { Job } from "../../types";

const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetcher(API_ENDPOINTS.jobs);
        // Map backend entity to frontend type when necessary
        const normalized: Job[] = (Array.isArray(data) ? data : data?.content || []).map(
          (j: any) => ({
            id: j.id,
            title: j.title,
            company: j.company,
            location: j.location,
            salary: j.salaryMin && j.salaryMax ? `${j.salaryMin} - ${j.salaryMax}` : j.salaryMin || j.salaryMax || "",
            type: (j.jobType || "").toString() as Job["type"],
            description: j.description,
            postedDate: j.postedAt,
          })
        );
        setJobs(normalized);
        setError(null);
      } catch (e: any) {
        console.error(e);
        setError("Failed to fetch jobs.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = [job.title, job.company]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesLocation = locationFilter ? job.location === locationFilter : true;
      const matchesType = typeFilter ? job.type === (typeFilter as any) : true;
      return matchesSearch && matchesLocation && matchesType;
    });
  }, [jobs, searchTerm, locationFilter, typeFilter]);

  return (
    <div className="jobs">
      <div className="container">
        <div className="jobs-header">
          <h1>Browse Jobs</h1>
          <div className="search-filters">
            <input
              type="text"
              placeholder="Search jobs..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="filter-select"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="">All Locations</option>
              <option value="Remote">Remote</option>
              <option value="San Francisco, CA">San Francisco</option>
              <option value="New York, NY">New York</option>
            </select>
            <select
              className="filter-select"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading jobs...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="jobs-list">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div key={job.id} className="job-card">
                  <div className="job-info">
                    <h3>{job.title}</h3>
                    <p className="company">{job.company}</p>
                    <div className="job-details">
                      <span className="location">📍 {job.location}</span>
                      {job.salary && <span className="salary">💰 {job.salary}</span>}
                      {job.type && <span className="type">⏰ {job.type}</span>}
                    </div>
                  </div>
                  <button className="apply-btn">Apply Now</button>
                </div>
              ))
            ) : (
              <div className="no-jobs">No jobs found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
