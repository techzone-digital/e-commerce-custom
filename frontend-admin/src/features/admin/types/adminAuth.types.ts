import { User } from '@/features/auth/types/auth.types';

export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface AdminAuthResponseData {
  user: User;
  accessToken: string;
}

export interface AdminAuthState {
  admin: User | null;
  adminToken: string | null;
  isAdminAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
  successMessage: string | null;
}

