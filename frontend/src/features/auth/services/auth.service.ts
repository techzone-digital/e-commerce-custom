import { apiClient } from '@/services/api/client';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import { ApiResponse } from '@/types/api.types';
import { SignupRequest, LoginRequest, AuthResponseData, User } from '../types/auth.types';

export const authService = {
  signup: async (payload: SignupRequest): Promise<ApiResponse<AuthResponseData>> => {
    const response = await apiClient.post<ApiResponse<AuthResponseData>>(
      API_ENDPOINTS.AUTH.SIGNUP,
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

  getCurrentUser: async (): Promise<ApiResponse<{ user: User }>> => {
    const response = await apiClient.get<ApiResponse<{ user: User }>>(
      API_ENDPOINTS.AUTH.ME
    );
    return response.data;
  },
};



