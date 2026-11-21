import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { authService } from '../services/auth.service';
import { SignupRequest, LoginRequest, AuthResponseData, AuthState, User } from '../types/auth.types';
import { ApiResponse } from '@/types/api.types';

const storedToken = localStorage.getItem('token');

const initialState: AuthState = {
  user: null,
  token: storedToken || null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  error: null,
  successMessage: null,
};

export const restoreAuth = createAsyncThunk<
  User,
  void,
  { rejectValue: { message: string; isAuthError: boolean } }
>('auth/restoreAuth', async (_, { rejectWithValue }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return rejectWithValue({ message: 'No token found', isAuthError: true });
  }

  try {
    const response = await authService.getCurrentUser();
    if (!response.success || !response.data?.user) {
      return rejectWithValue({
        message: response.message || 'Authentication restoration failed',
        isAuthError: true,
      });
    }
    return response.data.user;
  } catch (err: unknown) {
    if (isAxiosError<ApiResponse<unknown>>(err)) {
      const status = err.response?.status;
      const message = err.response?.data?.message || err.message;
      // 401 (Unauthorized) or 403 (Forbidden/Suspended) are definitive auth rejections
      const isAuthError = status === 401 || status === 403;
      return rejectWithValue({ message, isAuthError });
    }
    if (err instanceof Error) {
      return rejectWithValue({ message: err.message, isAuthError: false });
    }
    return rejectWithValue({ message: 'Failed to restore authentication session.', isAuthError: false });
  }
});


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
      state.isLoading = false;
      state.isInitialized = true;
      state.error = null;
      state.successMessage = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      // Restore auth lifecycle
      .addCase(restoreAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(restoreAuth.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.isInitialized = true;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.token = localStorage.getItem('token');
        state.error = null;
      })
      .addCase(restoreAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isInitialized = true;
        // Only clear stored credentials when backend returned a definitive auth rejection (401/403 or no token)
        if (action.payload?.isAuthError) {
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
          state.error = null;
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        } else {
          // In case of network error/server offline, keep token in storage, but don't mark as authenticated
          state.user = null;
          state.isAuthenticated = false;
          state.error = action.payload?.message || 'Network error during session restoration';
        }
      })

      // Signup lifecycle
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<AuthResponseData>) => {
        state.isLoading = false;
        state.isInitialized = true;
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
        state.isInitialized = true;
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


