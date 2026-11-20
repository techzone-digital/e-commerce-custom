import { apiClient } from '@/services/api/client';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';
import { ApiResponse } from '@/types/api.types';
import { SignupRequest, AuthResponseData } from '../types/auth.types';

export const authService = {
  signup: async (payload: SignupRequest): Promise<ApiResponse<AuthResponseData>> => {
    const response = await apiClient.post<ApiResponse<AuthResponseData>>(
      API_ENDPOINTS.AUTH.SIGNUP,
      payload
    );
    return response.data;
  },
};

