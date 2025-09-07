export interface User {
  id: string;
  email: string;
  createdAt: string;
  name?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  language: Language;
  aiSummarization: boolean;
  anonymousMode: boolean;
  trustedContact?: TrustedContact;
  dataConsent: boolean;
}

export interface TrustedContact {
  name: string;
  email: string;
  phone?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthError {
  field?: string;
  message: string;
  code?: string;
}

export type Language = "en" | "si" | "ta";

export interface ValidationError {
  field: string;
  message: string;
}

// Mood tracking types
export interface MoodEntry {
  id: string;
  userId: string;
  mood: number; // 1-10 scale
  emotions: string[];
  notes?: string;
  voiceTranscript?: string;
  timestamp: string;
  sentiment?: SentimentAnalysis;
}

export interface SentimentAnalysis {
  score: number; // -1 to 1
  label: string; // positive, negative, neutral
  confidence: number;
}

// Journal types
export interface JournalEntry {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  mood?: number;
  sentiment?: SentimentAnalysis;
  aiPrompt?: string;
  tags?: string[];
}

// AI Chat types
export interface ChatMessage {
  id: string;
  userId: string;
  content: string;
  isUser: boolean;
  timestamp: string;
  sessionId: string;
  suggestions?: string[];
}

export interface ChatSession {
  id: string;
  userId: string;
  startTime: string;
  endTime?: string;
  messageCount: number;
}

// Coping strategies types
export interface CopingStrategy {
  id: string;
  title: string;
  description: string;
  type: 'mindfulness' | 'cbt' | 'gratitude' | 'breathing' | 'grounding';
  steps: string[];
  duration: number; // in minutes
  rating?: number;
  personalized: boolean;
}

// Analytics types
export interface MoodAnalytics {
  averageMood: number;
  moodTrend: 'improving' | 'stable' | 'declining';
  weeklyData: { date: string; mood: number }[];
  emotionFrequency: { emotion: string; count: number }[];
}

export interface JournalAnalytics {
  totalEntries: number;
  averageLength: number;
  sentimentDistribution: { label: string; count: number }[];
  commonThemes: { theme: string; frequency: number }[];
  weeklySummary: string;
}

// 8-Minute Session types
export interface SessionStep {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  completed: boolean;
  data?: any;
}

export interface EightMinuteSession {
  id: string;
  userId: string;
  startTime: string;
  endTime?: string;
  steps: SessionStep[];
  overallMood?: number;
  summary?: string;
  completed: boolean;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
