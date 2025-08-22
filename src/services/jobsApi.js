export async function fetchJobs() {
  const res = await fetch('/api/jobs');
  if (!res.ok) throw new Error('Failed to load jobs');
  return res.json();
}

export async function saveJob(jobId) {
  const res = await fetch('/api/saved-jobs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jobId })
  });
  if (!res.ok) throw new Error('Failed to save job');
  return res.json();
}