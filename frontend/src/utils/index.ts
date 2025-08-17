import axios, { AxiosRequestConfig } from "axios";

// API endpoints
export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8080/api";

export const API_ENDPOINTS = {
  jobs: `${API_BASE_URL}/jobs`,
  users: `${API_BASE_URL}/users`,
  companies: `${API_BASE_URL}/companies`,
  applications: `${API_BASE_URL}/applications`,
};

// Axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// API utility function (axios-based)
export const fetcher = async (url: string, config?: AxiosRequestConfig) => {
  const res = await api.request({ url, ...config });
  return res.data;
};

// Date formatting utilities
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// String utilities
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

// Validation utilities
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phoneRegex.test(phone);
};
