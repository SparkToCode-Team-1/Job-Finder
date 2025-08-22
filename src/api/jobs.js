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
      if (!Array.isArray(data)) throw new Error("Expected an array of jobs");

      return data.map(j => {
        const id =
          j.id ?? j.jobId ??
          (typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : String(Math.random()).slice(2));

        const salaryMin = j.salary_min ?? j.salaryMin ?? null;
        const salaryMax = j.salary_max ?? j.salaryMax ?? null;

        return {
          id,
          title: j.title ?? "",
          company: j.company ?? "",
          location: j.location ?? "",

          salary_min: salaryMin,
          salary_max: salaryMax,
          salaryMin,
          salaryMax,
          job_type: j.job_type ?? j.jobType ?? "N/A",
          posted_at: j.posted_at ?? j.postedAt ?? null,
          postedAt: j.posted_at ?? j.postedAt ?? null,
          description: j.description ?? "",

          sentiment: {
            label: j.sentiment?.label ?? "neutral",
            rationale: j.sentiment?.rationale ?? "",
            score: j.sentiment?.score ?? null
          },
          matchScore: j.matchScore ?? 0,
          saved: j.saved ?? false,

          applyUrl: j.applyUrl ?? j.sourceLink ?? "#"
        };
      });
    } catch (e) {

    }
  }

  throw new Error("Unable to fetch jobs from API or fallback.");
}
