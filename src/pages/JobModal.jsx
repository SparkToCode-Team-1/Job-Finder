import PropType from "prop-types";
import "./JobModal.css";

export default function JobModal({ job, onClose}){
    if(!job) return null;
      return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <header>
                    <h2>{job.title}</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </header>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> {job.salary_min && job.salary_max ? `${job.salary_min}–${job.salary_max} OMR` : "N/A"}</p>
                <p><strong>Description:</strong> {job.description}</p>
                <footer>
                    <a className="btn" href={job.applyUrl} target="_blank" rel="noreferrer">Apply</a>
                </footer>
            </div>
        </div>
      );
    }
JobModal.PropType = {
    job: PropType.object,
    onClose: PropType.func.isRequired
    };