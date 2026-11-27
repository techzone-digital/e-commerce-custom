import axios, { AxiosInstance } from 'axios';
import { env } from '@/config/env';

export const apiClient: AxiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for attaching auth token
apiClient.interceptors.request.use(
  (config) => {
    // If the request is for admin endpoints, prioritize adminToken, otherwise check role/context
    const isAdminRequest = config.url?.startsWith('/admin');
    const adminToken = localStorage.getItem('adminToken');
    const customerToken = localStorage.getItem('token');

    const token = isAdminRequest ? adminToken || customerToken : customerToken || adminToken;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for centralized error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

