import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { authService } from '../services/auth.service';
import { SignupRequest, LoginRequest, AuthResponseData, AuthState } from '../types/auth.types';
import { ApiResponse } from '@/types/api.types';

const storedToken = localStorage.getItem('token');

const initialState: AuthState = {
  user: null,
  token: storedToken || null,
  isAuthenticated: Boolean(storedToken),
  isLoading: false,
  error: null,
  successMessage: null,
};

export const signupUser = createAsyncThunk<
  AuthResponseData,
  SignupRequest,
  { rejectValue: string }
>('auth/signup', async (signupData, { rejectWithValue }) => {
  try {
    const response = await authService.signup(signupData);
    if (!response.success || !response.data) {
      return rejectWithValue(response.message || 'Signup failed');
    }
    return response.data;
  } catch (err: unknown) {
    if (isAxiosError<ApiResponse<unknown>>(err) && err.response?.data?.message) {
      return rejectWithValue(err.response.data.message);
    }
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue('An unexpected error occurred during signup. Please try again.');
  }
});

export const loginUser = createAsyncThunk<
  AuthResponseData,
  LoginRequest,
  { rejectValue: string }
>('auth/login', async (loginData, { rejectWithValue }) => {
  try {
    const response = await authService.login(loginData);
    if (!response.success || !response.data) {
      return rejectWithValue(response.message || 'Login failed');
    }
    return response.data;
  } catch (err: unknown) {
    if (isAxiosError<ApiResponse<unknown>>(err) && err.response?.data?.message) {
      return rejectWithValue(err.response.data.message);
    }
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue('An unexpected error occurred during login. Please try again.');
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
    clearAuthSuccess: (state) => {
      state.successMessage = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.successMessage = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup lifecycle
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<AuthResponseData>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isAuthenticated = true;
        state.error = null;
        state.successMessage = 'Account created successfully';

        // Persist token using the convention used in client.ts
        if (action.payload.accessToken) {
          localStorage.setItem('token', action.payload.accessToken);
        }
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Signup failed. Please try again.';
      })
      // Login lifecycle
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponseData>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isAuthenticated = true;
        state.error = null;
        state.successMessage = 'Login successful';

        // Persist token using the convention used in client.ts
        if (action.payload.accessToken) {
          localStorage.setItem('token', action.payload.accessToken);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Login failed. Please try again.';
      });
  },
});

export const { clearAuthError, clearAuthSuccess, logout } = authSlice.actions;
export default authSlice.reducer;


