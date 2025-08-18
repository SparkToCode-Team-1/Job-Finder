export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  description?: string;
  requirements?: string[];
  postedDate?: Date;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  jobTitle?: string;
  experienceLevel?: "Entry Level" | "Mid Level" | "Senior Level" | "Executive";
  skills?: string[];
}

export interface Company {
  id: number;
  name: string;
  description?: string;
  website?: string;
  location?: string;
  size?: string;
}
