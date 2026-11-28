import { apiClient } from '@/services/api/client';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import { ApiResponse } from '@/types/api.types';
import { AdminLoginRequest, AdminAuthResponseData } from '../types/adminAuth.types';
import { User } from '@/features/auth/types/auth.types';

export const adminAuthService = {
  login: async (payload: AdminLoginRequest): Promise<ApiResponse<AdminAuthResponseData>> => {
    const response = await apiClient.post<ApiResponse<AdminAuthResponseData>>(
      API_ENDPOINTS.ADMIN.LOGIN,
      payload
    );
    return response.data;
  },

  getCurrentAdmin: async (token?: string): Promise<ApiResponse<{ user: User }>> => {
    // Send adminToken in Authorization header specifically for admin profile verification
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const response = await apiClient.get<ApiResponse<{ user: User }>>(
      API_ENDPOINTS.AUTH.ME,
      { headers }
    );
    return response.data;
  },
};

