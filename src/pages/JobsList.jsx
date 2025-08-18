import { useEffect, useReducer, useState } from "react";
import JobCard from "../components/JobCard.jsx";
import JobModal from "./JobModal.jsx"
import { fetchJobs } from "../api/jobs.js";

const initialState = {
  jobs: [],
  status: "idle",   
  error: null,
  savedIds: new Set(),
  query: ""         
};

function reducer(state, action) {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, status: "loading", error: null };
    case "LOAD_SUCCESS":
      return { ...state, status: "success", jobs: action.payload };
    case "LOAD_ERROR":
      return { ...state, status: "error", error: action.error };
    case "TOGGLE_SAVE": {
      const savedIds = new Set(state.savedIds);
      savedIds.has(action.id) ? savedIds.delete(action.id) : savedIds.add(action.id);
      return { ...state, savedIds };
    }
    case "SET_QUERY":
      return { ...state, query: action.query };
    default:
      return state;
  }
}

export default function JobsList() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [selectedJob, setSelectedJob] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    dispatch({ type: "LOAD_START" });
    fetchJobs({ signal: controller.signal })
      .then(data => dispatch({ type: "LOAD_SUCCESS", payload: data }))
      .catch(err => dispatch({ type: "LOAD_ERROR", error: err.message || "Failed" }));
    return () => controller.abort();
  }, []);

  const handleSave = (job) => dispatch({ type: "TOGGLE_SAVE", id: job.id });
  const handleView = (job) => setSelectedJob(job);

  const filtered = state.query
    ? state.jobs.filter(j =>
        [j.title, j.company, j.location].join(" ").toLowerCase()
          .includes(state.query.toLowerCase())
      )
    : state.jobs;

  return (
    <section className="jobs-page">
      <header className="jobs-page__toolbar">
        <h2>Jobs</h2>
        <input
          className="input"
          placeholder="Search by title, company, or location…"
          value={state.query}
          onChange={(e) => dispatch({ type: "SET_QUERY", query: e.target.value })}
        />
      </header>

      {state.status === "loading" && (
        <div className="grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="skeleton" key={i} />
          ))}
        </div>
      )}

      {state.status === "error" && (
        <div className="error">
          <p>حدث خطأ أثناء جلب الوظائف: {state.error}</p>
          <button onClick={() => {
            dispatch({ type: "LOAD_START" });
            fetchJobs()
              .then(data => dispatch({ type: "LOAD_SUCCESS", payload: data }))
              .catch(err => dispatch({ type: "LOAD_ERROR", error: err.message || "Failed" }));
          }}>إعادة المحاولة</button>
        </div>
      )}

      {state.status === "success" && filtered.length === 0 && (
        <p className="muted">لا توجد وظائف مطابقة لبحثك.</p>
      )}

      {state.status === "success" && filtered.length > 0 && (
        <div className="grid">
          {filtered.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onSave={handleSave}
              onView={handleView}
            />
          ))}
      </div>
    )}
    {selectedJob && <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
  </section>
  );
}
