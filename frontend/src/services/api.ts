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
  applicationDate: string;
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
