const BASE = import.meta.env.VITE_API_BASE || ""; 


export async function fetchJobs({ signal } = {}) {

  const endpoints = [
    `${BASE}/api/jobs`,  
    `/jobs.json`         
  ];

  for (const url of endpoints) {
    try {
      const res = await fetch(url, { signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
     
      return data.map(j => ({
        id: j.id ?? j.jobId ?? crypto.randomUUID(),
        title: j.title,
        company: j.company,
        location: j.location,
        salary_min: j.salary_min ?? j.salaryMin ?? null,
        salary_max: j.salary_max ?? j.salaryMax ?? null,
        job_type: j.job_type ?? j.jobType ?? "N/A",
        posted_at: j.posted_at ?? j.postedAt ?? null,
        description: j.description ?? "",
        applyUrl: j.applyUrl ?? j.sourceLink ?? "#"
      }));
    } catch (_) {
     
    }
  }
  throw new Error("Unable to fetch jobs from API or fallback.");
}