import axios from "axios";
import { AuthResponse, LoginFormData, SignupFormData } from "./types";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        window.location.href = "/pages/loginPage";
      }
    }
    return Promise.reject(error);
  }
);

// Authentication API functions
export const authApi = {
  // Login user
  login: async (data: LoginFormData): Promise<AuthResponse> => {
    try {
      const response = await api.post("/auth/login", data);
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: "Network error. Please check your connection.",
      };
    }
  },

  // Register user
  signup: async (data: SignupFormData): Promise<AuthResponse> => {
    try {
      const response = await api.post("/auth/register", data);
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: "Network error. Please check your connection.",
      };
    }
  },

  // Verify token
  verifyToken: async (): Promise<AuthResponse> => {
    try {
      const response = await api.get("/auth/verify");
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: "Token verification failed.",
      };
    }
  },

  // Google OAuth authentication
  googleAuth: async (): Promise<AuthResponse> => {
    try {
      // In a real implementation, this would handle Google OAuth flow
      // For now, we'll simulate the process
      const response = await api.post("/auth/google");
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data;
      }
      return {
        success: false,
        message: "Google authentication failed. Please try again.",
      };
    }
  },

  // Logout user
  logout: async (): Promise<void> => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      // Handle logout error silently
      console.error("Logout error:", error);
    } finally {
      // Always clear local storage
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    }
  },
};

export default api;
