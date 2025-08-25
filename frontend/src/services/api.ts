// API service for authentication and user management
const API_BASE_URL = "http://localhost:8080/api";

interface User {
  id: number;
  fullName: string;
  email: string;
  role: string;
  phone?: string;
  location?: string;
  bio?: string;
  skills?: string;
  experience?: string;
  education?: string;
  resumeUrl?: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

interface JobApplication {
  id: number;
  jobId: number;
  jobTitle: string;
  companyName: string;
  appliedAt: string;
  status: string;
  coverLetter?: string;
  resumeUrl?: string;
}

class ApiService {
  private getAuthHeaders() {
    const token = localStorage.getItem("authToken");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  // Authentication APIs
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Login failed");
    }

    const data = await response.json();

    // Store token and user data
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("userData", JSON.stringify(data.user));

    return data;
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Registration failed");
    }

    const data = await response.json();

    // Store token and user data
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("userData", JSON.stringify(data.user));

    return data;
  }

  logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
  }

  // User Profile APIs
  async getUserProfile(): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to get user profile");
    }

    return await response.json();
  }

  async updateUserProfile(profileData: Partial<User>): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Failed to update profile");
    }

    return await response.json();
  }

  // Jobs APIs
  async getJobs() {
    const response = await fetch(`${API_BASE_URL}/jobs`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }

    return await response.json();
  }

  // Admin Jobs APIs
  async createJob(jobData: {
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    description: string;
    requirements: string;
  }) {
    // Convert frontend data to backend format
    const backendJobData = {
      sourceId: "admin",
      sourceJobId: `admin-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      title: jobData.title,
      company: jobData.company,
      location: jobData.location,
      jobType: jobData.type,
      salaryMin: parseFloat(jobData.salary.split("-")[0]) || 0,
      salaryMax:
        parseFloat(jobData.salary.split("-")[1]) ||
        parseFloat(jobData.salary) ||
        0,
      description: `${jobData.description}\n\nالمتطلبات:\n${jobData.requirements}`,
      category: this.getCategoryFromTitle(jobData.title),
      postedAt: new Date().toISOString(),
      rawPayload: null,
      ingestedAt: new Date().toISOString(),
    };

    const response = await fetch(`${API_BASE_URL}/jobs`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(backendJobData),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Failed to create job");
    }

    return await response.json();
  }

  async updateJob(
    jobId: number,
    jobData: {
      title: string;
      company: string;
      location: string;
      type: string;
      salary: string;
      description: string;
      requirements: string;
    }
  ) {
    // Convert frontend data to backend format
    const backendJobData = {
      sourceId: "admin",
      sourceJobId: `admin-${jobId}-${Date.now()}`,
      title: jobData.title,
      company: jobData.company,
      location: jobData.location,
      jobType: jobData.type,
      salaryMin: parseFloat(jobData.salary.split("-")[0]) || 0,
      salaryMax:
        parseFloat(jobData.salary.split("-")[1]) ||
        parseFloat(jobData.salary) ||
        0,
      description: `${jobData.description}\n\nالمتطلبات:\n${jobData.requirements}`,
      category: this.getCategoryFromTitle(jobData.title),
      postedAt: new Date().toISOString(),
      rawPayload: null,
      ingestedAt: new Date().toISOString(),
    };

    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(backendJobData),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Failed to update job");
    }

    return await response.json();
  }

  async deleteJob(jobId: number) {
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
      method: "DELETE",
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Failed to delete job");
    }

    return true;
  }

  // Get all applications for admin
  async getAllApplications() {
    const response = await fetch(`${API_BASE_URL}/admin/applications`, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to get all applications");
    }

    return await response.json();
  }

  // Update application status (admin only)
  async updateApplicationStatus(
    applicationId: number,
    status: "ACCEPTED" | "REJECTED" | "PENDING"
  ) {
    const response = await fetch(
      `${API_BASE_URL}/admin/applications/${applicationId}/status`,
      {
        method: "PUT",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ status }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Failed to update application status");
    }

    return await response.json();
  }

  // Get admin statistics
  async getAdminStats() {
    const response = await fetch(`${API_BASE_URL}/jobs/stats`, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to get admin statistics");
    }

    return await response.json();
  }

  async applyForJob(jobId: number, coverLetter: string, resumeUrl?: string) {
    const response = await fetch(`${API_BASE_URL}/users/apply`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify({
        jobId,
        coverLetter,
        resumeUrl,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Failed to apply for job");
    }

    return await response.json();
  }

  async getUserApplications() {
    const response = await fetch(`${API_BASE_URL}/users/applications`, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to get applications");
    }

    return await response.json();
  }

  // Utility methods
  private getCategoryFromTitle(title: string): string {
    const titleLower = title.toLowerCase();
    if (
      titleLower.includes("software") ||
      titleLower.includes("developer") ||
      titleLower.includes("engineer") ||
      titleLower.includes("backend") ||
      titleLower.includes("frontend")
    ) {
      return "Technology";
    } else if (
      titleLower.includes("data") ||
      titleLower.includes("analyst") ||
      titleLower.includes("science")
    ) {
      return "Data Science";
    } else if (
      titleLower.includes("design") ||
      titleLower.includes("ui") ||
      titleLower.includes("ux")
    ) {
      return "Design";
    } else if (
      titleLower.includes("marketing") ||
      titleLower.includes("digital")
    ) {
      return "Marketing";
    } else if (titleLower.includes("sales")) {
      return "Sales";
    } else {
      return "Technology";
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("authToken");
  }

  getCurrentUser(): User | null {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  }
}

export const apiService = new ApiService();
export type {
  User,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  JobApplication,
};
