export interface User {
  id: string;
  email: string;
  createdAt: string;
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
