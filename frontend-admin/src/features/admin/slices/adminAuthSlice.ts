import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { adminAuthService } from '../services/adminAuth.service';
import {
  AdminLoginRequest,
  AdminAuthResponseData,
  AdminAuthState,
} from '../types/adminAuth.types';
import { User } from '@/features/auth/types/auth.types';
import { ApiResponse } from '@/types/api.types';

const storedAdminToken = localStorage.getItem('adminToken');

const initialState: AdminAuthState = {
  admin: null,
  adminToken: storedAdminToken || null,
  isAdminAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  error: null,
  successMessage: null,
};

/**
 * Restore Admin Session on Page Refresh
 */
export const restoreAdminAuth = createAsyncThunk<
  User,
  void,
  { rejectValue: { message: string; isAuthError: boolean } }
>('adminAuth/restoreAdminAuth', async (_, { rejectWithValue }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return rejectWithValue({ message: 'No admin token found', isAuthError: true });
  }

  try {
    const response = await adminAuthService.getCurrentAdmin(token);
    if (!response.success || !response.data?.user) {
      return rejectWithValue({
        message: response.message || 'Admin session restoration failed',
        isAuthError: true,
      });
    }

    // Role safety check: user MUST have role 'admin' or 'superadmin'
    if (response.data.user.role !== 'admin' && response.data.user.role !== 'superadmin') {
      return rejectWithValue({
        message: 'Unauthorized: Administrator access required',
        isAuthError: true,
      });
    }

    return response.data.user;
  } catch (err: unknown) {
    if (isAxiosError<ApiResponse<unknown>>(err)) {
      const status = err.response?.status;
      const message = err.response?.data?.message || err.message;
      const isAuthError = status === 401 || status === 403;
      return rejectWithValue({ message, isAuthError });
    }
    if (err instanceof Error) {
      return rejectWithValue({ message: err.message, isAuthError: false });
    }
    return rejectWithValue({
      message: 'Failed to restore admin authentication session.',
      isAuthError: false,
    });
  }
});

/**
 * Admin Login Thunk
 */
export const loginAdmin = createAsyncThunk<
  AdminAuthResponseData,
  AdminLoginRequest,
  { rejectValue: string }
>('adminAuth/loginAdmin', async (loginData, { rejectWithValue }) => {
  try {
    const response = await adminAuthService.login(loginData);
    if (!response.success || !response.data) {
      return rejectWithValue(response.message || 'Admin login failed');
    }

    // Verify role safety: allow admin or superadmin
    if (response.data.user.role !== 'admin' && response.data.user.role !== 'superadmin') {
      return rejectWithValue('Access denied: Administrator privileges required.');
    }

    return response.data;
  } catch (err: unknown) {
    if (isAxiosError<ApiResponse<unknown>>(err) && err.response?.data?.message) {
      return rejectWithValue(err.response.data.message);
    }
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue('An unexpected error occurred during admin login. Please try again.');
  }
});

export const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    clearAdminAuthError: (state) => {
      state.error = null;
    },
    clearAdminAuthSuccess: (state) => {
      state.successMessage = null;
    },
    adminLogout: (state) => {
      state.admin = null;
      state.adminToken = null;
      state.isAdminAuthenticated = false;
      state.isLoading = false;
      state.isInitialized = true;
      state.error = null;
      state.successMessage = null;
      localStorage.removeItem('adminToken');
    },
  },
  extraReducers: (builder) => {
    builder
      // Restore Admin Session
      .addCase(restoreAdminAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(restoreAdminAuth.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.isInitialized = true;
        state.admin = action.payload;
        state.isAdminAuthenticated = true;
        state.adminToken = localStorage.getItem('adminToken');
        state.error = null;
      })
      .addCase(restoreAdminAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isInitialized = true;
        if (action.payload?.isAuthError) {
          state.admin = null;
          state.adminToken = null;
          state.isAdminAuthenticated = false;
          state.error = null;
          localStorage.removeItem('adminToken');
        } else {
          state.admin = null;
          state.isAdminAuthenticated = false;
          state.error = action.payload?.message || 'Network error during admin session restoration';
        }
      })

      // Admin Login
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action: PayloadAction<AdminAuthResponseData>) => {
        state.isLoading = false;
        state.isInitialized = true;
        state.admin = action.payload.user;
        state.adminToken = action.payload.accessToken;
        state.isAdminAuthenticated = true;
        state.error = null;
        state.successMessage = 'Admin login successful';

        if (action.payload.accessToken) {
          localStorage.setItem('adminToken', action.payload.accessToken);
        }
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Admin login failed. Please try again.';
      });
  },
});

export const { clearAdminAuthError, clearAdminAuthSuccess, adminLogout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;

