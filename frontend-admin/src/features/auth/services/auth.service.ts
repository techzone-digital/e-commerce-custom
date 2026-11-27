import { apiClient } from '@/services/api/client';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import { ApiResponse } from '@/types/api.types';
import {
  SignupRequest,
  LoginRequest,
  GoogleAuthRequest,
  VerifyOtpRequest,
  ResendOtpRequest,
  SignupInitiateResponse,
  AuthResponseData,
  User,
} from '../types/auth.types';

export const authService = {
  signup: async (payload: SignupRequest): Promise<ApiResponse<SignupInitiateResponse>> => {
    const response = await apiClient.post<ApiResponse<SignupInitiateResponse>>(
      API_ENDPOINTS.AUTH.SIGNUP,
      payload
    );
    return response.data;
  },

  verifyOtp: async (payload: VerifyOtpRequest): Promise<ApiResponse<AuthResponseData>> => {
    const response = await apiClient.post<ApiResponse<AuthResponseData>>(
      API_ENDPOINTS.AUTH.VERIFY_OTP,
      payload
    );
    return response.data;
  },

  resendOtp: async (payload: ResendOtpRequest): Promise<ApiResponse<{ message: string }>> => {
    const response = await apiClient.post<ApiResponse<{ message: string }>>(
      API_ENDPOINTS.AUTH.RESEND_OTP,
      payload
    );
    return response.data;
  },

  login: async (payload: LoginRequest): Promise<ApiResponse<AuthResponseData>> => {
    const response = await apiClient.post<ApiResponse<AuthResponseData>>(
      API_ENDPOINTS.AUTH.LOGIN,
      payload
    );
    return response.data;
  },

  googleLogin: async (payload: GoogleAuthRequest): Promise<ApiResponse<AuthResponseData>> => {
    const response = await apiClient.post<ApiResponse<AuthResponseData>>(
      API_ENDPOINTS.AUTH.GOOGLE,
      payload
    );
    return response.data;
  },

  getCurrentUser: async (): Promise<ApiResponse<{ user: User }>> => {
    const response = await apiClient.get<ApiResponse<{ user: User }>>(
      API_ENDPOINTS.AUTH.ME
    );
    return response.data;
  },
};




