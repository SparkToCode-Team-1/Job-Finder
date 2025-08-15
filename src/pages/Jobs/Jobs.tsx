import React from "react";
import "./Jobs.css";

const Jobs: React.FC = () => {
  const sampleJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Corp",
      location: "San Francisco, CA",
      salary: "$80,000 - $120,000",
      type: "Full-time",
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "StartupXYZ",
      location: "New York, NY",
      salary: "$90,000 - $130,000",
      type: "Full-time",
    },
    {
      id: 3,
      title: "UX Designer",
      company: "Design Studio",
      location: "Remote",
      salary: "$70,000 - $100,000",
      type: "Contract",
    },
  ];

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
            />
            <select className="filter-select">
              <option value="">All Locations</option>
              <option value="remote">Remote</option>
              <option value="sf">San Francisco</option>
              <option value="ny">New York</option>
            </select>
            <select className="filter-select">
              <option value="">All Types</option>
              <option value="fulltime">Full-time</option>
              <option value="parttime">Part-time</option>
              <option value="contract">Contract</option>
            </select>
          </div>
        </div>

        <div className="jobs-list">
          {sampleJobs.map((job) => (
            <div key={job.id} className="job-card">
              <div className="job-info">
                <h3>{job.title}</h3>
                <p className="company">{job.company}</p>
                <div className="job-details">
                  <span className="location">📍 {job.location}</span>
                  <span className="salary">💰 {job.salary}</span>
                  <span className="type">⏰ {job.type}</span>
                </div>
              </div>
              <button className="apply-btn">Apply Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
