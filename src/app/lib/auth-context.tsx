"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User, Language } from "./types";
import { authApi } from "./api";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  language: Language;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  signup: (
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<{ success: boolean; message: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  setLanguage: (language: Language) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState<Language>("en");

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await authApi.verifyToken();
          if (response.success && response.user) {
            setUser(response.user);
          } else {
            localStorage.removeItem("token");
          }
        } catch (error) {
          localStorage.removeItem("token");
        }
      }
      setIsLoading(false);
    };

    // Get language from localStorage or browser
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && ["en", "si", "ta"].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split("-")[0];
      if (browserLang === "si" || browserLang === "ta") {
        setLanguage(browserLang as Language);
      }
    }

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password });

      if (response.success && response.user && response.token) {
        localStorage.setItem("token", response.token);
        setUser(response.user);
        return { success: true, message: response.message };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const signup = async (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      const response = await authApi.signup({
        email,
        password,
        confirmPassword,
      });

      if (response.success) {
        return { success: true, message: response.message };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const loginWithGoogle = async () => {
    try {
      // For now, we'll simulate Google OAuth - in production you'd integrate with Google OAuth
      // This would typically open a popup or redirect to Google's OAuth flow
      const response = await authApi.googleAuth();

      if (response.success && response.user && response.token) {
        localStorage.setItem("token", response.token);
        setUser(response.user);
        return { success: true, message: response.message };
      } else {
        return {
          success: false,
          message: response.message || "Google authentication failed",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Google authentication failed. Please try again.",
      };
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  const updateLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    language,
    login,
    signup,
    loginWithGoogle,
    logout,
    setLanguage: updateLanguage,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
