export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  status: string;
  isEmailVerified: boolean;
  avatar?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface SignupRequest {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface GoogleAuthRequest {
  idToken: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface ResendOtpRequest {
  email: string;
}

export interface SignupInitiateResponse {
  email: string;
  message: string;
}

export interface AuthResponseData {
  user: User;
  accessToken: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
  successMessage: string | null;
}


