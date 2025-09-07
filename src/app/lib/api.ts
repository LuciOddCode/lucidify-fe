import axios from "axios";
import {
  AuthResponse,
  LoginFormData,
  SignupFormData,
  MoodEntry,
  JournalEntry,
  ChatMessage,
  ChatSession,
  CopingStrategy,
  MoodAnalytics,
  JournalAnalytics,
  EightMinuteSession,
  User,
  UserPreferences,
  TrustedContact,
  ApiResponse,
  PaginatedResponse,
} from "./types";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
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

      // Handle connection refused error (backend not running)
      if (
        error.code === "ERR_CONNECTION_REFUSED" ||
        error.message?.includes("ERR_CONNECTION_REFUSED")
      ) {
        return {
          success: false,
          message:
            "Backend server is not running. Please start the backend server on port 3001.",
        };
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

      // Handle connection refused error (backend not running)
      if (
        error.code === "ERR_CONNECTION_REFUSED" ||
        error.message?.includes("ERR_CONNECTION_REFUSED")
      ) {
        return {
          success: false,
          message:
            "Backend server is not running. Please start the backend server on port 3001.",
        };
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

// Mood tracking API functions
export const moodApi = {
  // Log a mood entry
  logMood: async (
    data: Partial<MoodEntry>
  ): Promise<ApiResponse<MoodEntry>> => {
    try {
      const response = await api.post("/mood/log", data);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to log mood",
      };
    }
  },

  // Get mood entries
  getMoodEntries: async (
    page = 1,
    limit = 10
  ): Promise<PaginatedResponse<MoodEntry>> => {
    try {
      const response = await api.get(
        `/mood/entries?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to fetch mood entries",
        data: [],
        pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
      };
    }
  },

  // Get mood analytics
  getMoodAnalytics: async (): Promise<ApiResponse<MoodAnalytics>> => {
    try {
      const response = await api.get("/mood/analytics");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to fetch mood analytics",
      };
    }
  },
};

// Journal API functions
export const journalApi = {
  // Create journal entry
  createEntry: async (
    data: Partial<JournalEntry>
  ): Promise<ApiResponse<JournalEntry>> => {
    try {
      const response = await api.post("/journal/create", data);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to create journal entry",
      };
    }
  },

  // Get journal entries
  getEntries: async (
    page = 1,
    limit = 10
  ): Promise<PaginatedResponse<JournalEntry>> => {
    try {
      const response = await api.get(
        `/journal/entries?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to fetch journal entries",
        data: [],
        pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
      };
    }
  },

  // Get AI prompt for journaling
  getAIPrompt: async (): Promise<ApiResponse<{ prompt: string }>> => {
    try {
      const response = await api.get("/journal/ai-prompt");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to get AI prompt",
      };
    }
  },

  // Get journal analytics
  getJournalAnalytics: async (): Promise<ApiResponse<JournalAnalytics>> => {
    try {
      const response = await api.get("/journal/analytics");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to fetch journal analytics",
      };
    }
  },
};

// AI Chat API functions
export const chatApi = {
  // Send message to AI
  sendMessage: async (
    message: string,
    sessionId?: string
  ): Promise<ApiResponse<ChatMessage>> => {
    try {
      const response = await api.post("/ai/chat", { message, sessionId });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to send message",
      };
    }
  },

  // Get chat history
  getChatHistory: async (
    sessionId: string
  ): Promise<ApiResponse<ChatMessage[]>> => {
    try {
      const response = await api.get(`/ai/chat/history/${sessionId}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to fetch chat history",
        data: [],
      };
    }
  },

  // Get chat sessions
  getChatSessions: async (): Promise<ApiResponse<ChatSession[]>> => {
    try {
      const response = await api.get("/ai/chat/sessions");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to fetch chat sessions",
        data: [],
      };
    }
  },
};

// Coping strategies API functions
export const copingApi = {
  // Get coping strategies
  getStrategies: async (
    type?: string
  ): Promise<ApiResponse<CopingStrategy[]>> => {
    try {
      const url = type
        ? `/coping/strategies?type=${type}`
        : "/coping/strategies";
      const response = await api.get(url);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to fetch coping strategies",
        data: [],
      };
    }
  },

  // Rate a strategy
  rateStrategy: async (
    strategyId: string,
    rating: number
  ): Promise<ApiResponse> => {
    try {
      const response = await api.post(`/coping/strategies/${strategyId}/rate`, {
        rating,
      });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to rate strategy",
      };
    }
  },
};

// 8-Minute session API functions
export const sessionApi = {
  // Start 8-minute session
  startSession: async (): Promise<ApiResponse<EightMinuteSession>> => {
    try {
      const response = await api.post("/session/start");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to start session",
      };
    }
  },

  // Update session step
  updateSessionStep: async (
    sessionId: string,
    stepId: string,
    data: any
  ): Promise<ApiResponse> => {
    try {
      const response = await api.put(
        `/session/${sessionId}/step/${stepId}`,
        data
      );
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to update session step",
      };
    }
  },

  // Complete session
  completeSession: async (
    sessionId: string
  ): Promise<ApiResponse<EightMinuteSession>> => {
    try {
      const response = await api.post(`/session/${sessionId}/complete`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to complete session",
      };
    }
  },
};

// User profile API functions
export const profileApi = {
  // Get user profile
  getProfile: async (): Promise<ApiResponse<User>> => {
    try {
      const response = await api.get("/profile");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to fetch profile",
      };
    }
  },

  // Update user profile
  updateProfile: async (data: Partial<User>): Promise<ApiResponse<User>> => {
    try {
      const response = await api.put("/profile", data);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to update profile",
      };
    }
  },

  // Update user preferences
  updatePreferences: async (
    preferences: Partial<UserPreferences>
  ): Promise<ApiResponse<User>> => {
    try {
      const response = await api.put("/profile/preferences", preferences);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to update preferences",
      };
    }
  },

  // Set trusted contact
  setTrustedContact: async (contact: TrustedContact): Promise<ApiResponse> => {
    try {
      const response = await api.post("/profile/trusted-contact", contact);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to set trusted contact",
      };
    }
  },

  // Send test notification to trusted contact
  testTrustedContact: async (): Promise<ApiResponse> => {
    try {
      const response = await api.post("/profile/trusted-contact/test");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Failed to send test notification",
      };
    }
  },

  // Export user data
  exportData: async (): Promise<ApiResponse<{ downloadUrl: string }>> => {
    try {
      const response = await api.get("/profile/export");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to export data",
      };
    }
  },

  // Delete user account
  deleteAccount: async (): Promise<ApiResponse> => {
    try {
      const response = await api.delete("/profile");
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to delete account",
      };
    }
  },
};

export default api;
