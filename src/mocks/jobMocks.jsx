export const jobsMock = [
  {
    id: 101,
    title: "Frontend Developer",
    company: "Acme Inc",
    location: "Muscat, Oman",
    salaryMin: 800,
    salaryMax: 1200,
    description: "Build UI components, collaborate with backend team, write clean code.",
    sentiment: { label: "positive", score: 0.82, rationale: "Clear scope, supportive team, learning opportunities" },
    matchScore: 85,
    applyUrl: "https://example.com/jobs/101",
    saved: false
  },
  {
    id: 102,
    title: "Backend Engineer",
    company: "Globex",
    location: "Remote",
    salaryMin: 1000,
    salaryMax: 1400,
    description: "Design APIs, optimize database queries, ensure reliability.",
    sentiment: { label: "neutral", score: 0.5, rationale: "Standard description with limited culture signals" },
    matchScore: 74,
    applyUrl: "https://example.com/jobs/102",
    saved: true
  },
  {
    id: 103,
    title: "QA Tester",
    company: "Innotech",
    location: "Dubai, UAE",
    salaryMin: 700,
    salaryMax: 900,
    description: "Write test cases, automate regression tests, report bugs clearly.",
    sentiment: { label: "negative", score: 0.2, rationale: "Heavy workload, unclear ownership in the role" },
    matchScore: 61,
    applyUrl: "https://example.com/jobs/103",
    saved: false
  }
];