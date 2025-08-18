import PropTypes from 'prop-types';
import { useState } from "react";

function formatSalary(min, max) {
  if (min && max) return `${min}–${max} OMR`;
  if (min) return `From ${min} OMR`;
  if (max) return `Up to ${max} OMR`;
  return "Salary: N/A";
}

export default function JobCard({ job, onSave, onView }) {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(s => !s);
    onSave?.(job);
  };

  return (
    <article className="job-card">
      <header className="job-card__header">
        <h3 className="job-card__title">{job.title}</h3>
        <span className="job-card__type">{job.job_type}</span>
      </header>

      <p className="job-card__meta">
        <strong>{job.company}</strong> · {job.location}
      </p>

      <p className="job-card__salary">{formatSalary(job.salary_min, job.salary_max)}</p>

      <p className="job-card__desc">
        {job.description?.slice(0, 120) || ""}{job.description?.length > 120 ? "..." : ""}
      </p>

      <footer className="job-card__footer">
        <button className="btn" onClick={() => onView?.(job)}>View details</button>
        <a className="btn btn-outline" href={job.applyUrl} target="_blank" rel="noreferrer">Apply</a>
        <button
          className={`btn ${saved ? "btn-solid" : "btn-ghost"}`}
          onClick={handleSave}
          aria-pressed={saved}
        >
          {saved ? "Saved ✓" : "Save"}
        </button>
      </footer>
    </article>
  );
}

JobCard.propTypes = {
  job: PropTypes.object.isRequired,
  onSave: PropTypes.func,
  onView: PropTypes.func
};
