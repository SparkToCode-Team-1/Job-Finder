import PropTypes from 'prop-types';
import { useState } from 'react';
import { SentimentBadge, formatSalary, truncate } from './SentimentBadge';

export default function JobCard({ job, onSave }) {
  const [expanded, setExpanded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(!!job.saved);

  const handleSave = async () => {
    try {
      setSaving(true);
      await onSave(job.id);
      setSaved(true);
    } catch (e) {
      console.error(e);
      alert('Could not save job');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={styles.card}>
      {/* Job title and companyا*/}
      <div style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <SentimentBadge label={job?.sentiment?.label} />
          <h3 style={styles.title}>{job.title}</h3>
        </div>
        <div style={styles.company}>{job.company}</div>
      </div>

      {/* Discription */}
      <div style={styles.meta}>
        <span>📍 {job.location}</span>
        <span>💸 {formatSalary(job.salaryMin, job.salaryMax)}</span>
        <span>🧮 Match Score: {job.matchScore}/100</span>
      </div>

      {/*Button to show more*/}
      <p style={styles.desc}>
        {expanded ? job.description : truncate(job.description, 220)}
      </p>

      {/*Sentiment (rationale) */}
      {job?.sentiment?.rationale && (
        <div style={styles.rationale}>
          <strong>Why (Sentiment rationale):</strong> {job.sentiment.rationale}
        </div>
      )}

      {/* Buttons*/}
      <div style={styles.actions}>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          style={styles.btnGhost}
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>

        <div style={{ flex: 1 }} />

        <button
          type="button"
          onClick={handleSave}
          disabled={saved || saving}
          style={{ ...styles.btn, ...(saved ? styles.btnDisabled : {}) }}
        >
          {saved ? 'Saved ✓' : saving ? 'Saving…' : 'Save Job'}
        </button>

        <a
          href={job.applyUrl || '#'}
          target="_blank"
          rel="noreferrer"
          style={{ ...styles.btn, ...styles.btnPrimary, marginLeft: 8 }}
        >
          Apply
        </a>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #e5e7eb',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
    background: '#fff'
  },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' },
  title: { margin: 0, fontSize: 18, fontWeight: 700 },
  company: { fontSize: 14, color: '#6b7280' },
  meta: { display: 'flex', gap: 16, fontSize: 13, color: '#374151', margin: '8px 0' },
  desc: { fontSize: 14, color: '#111827', marginTop: 8, lineHeight: 1.5 },
  rationale: {
    marginTop: 8,
    background: '#f9fafb',
    border: '1px dashed #e5e7eb',
    borderRadius: 12,
    padding: 10,
    fontSize: 13,
    color: '#374151'
  },
  actions: { display: 'flex', alignItems: 'center', marginTop: 12 },
  btn: {
    border: '1px solid #d1d5db',
    padding: '8px 12px',
    borderRadius: 10,
    textDecoration: 'none',
    fontSize: 14,
    cursor: 'pointer',
    background: '#fff'
  },
  btnPrimary: { background: '#111827', color: '#fff', borderColor: '#111827' },
  btnGhost: {
    border: 'none',
    background: 'transparent',
    color: '#111827',
    fontSize: 14,
    cursor: 'pointer'
  },
  btnDisabled: { opacity: 0.6, cursor: 'not-allowed' }
};
