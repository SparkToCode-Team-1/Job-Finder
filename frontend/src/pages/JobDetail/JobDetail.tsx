import React from "react";
import "./JobDetail.css";

const JobDetail: React.FC = () => {
  return (
    <div className="job-detail">
      <div className="container">
        <h1>Job Details</h1>
        <div className="job-content">
          <h2>Frontend Developer</h2>
          <p>
            <strong>Company:</strong> Tech Corp
          </p>
          <p>
            <strong>Location:</strong> San Francisco, CA
          </p>
          <p>
            <strong>Salary:</strong> $80,000 - $120,000
          </p>
          <p>
            <strong>Type:</strong> Full-time
          </p>

          <h3>Job Description</h3>
          <p>
            We are looking for a talented Frontend Developer to join our team...
          </p>

          <h3>Requirements</h3>
          <ul>
            <li>3+ years of React experience</li>
            <li>Strong knowledge of TypeScript</li>
            <li>Experience with modern CSS frameworks</li>
          </ul>

          <button className="apply-btn">Apply for this position</button>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
