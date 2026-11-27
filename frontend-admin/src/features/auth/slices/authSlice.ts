import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { authService } from '../services/auth.service';
import {
  SignupRequest,
  LoginRequest,
  GoogleAuthRequest,
  VerifyOtpRequest,
  ResendOtpRequest,
  SignupInitiateResponse,
  AuthResponseData,
  AuthState,
  User,
} from '../types/auth.types';
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
  SignupInitiateResponse,
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

export const verifyOtp = createAsyncThunk<
  AuthResponseData,
  VerifyOtpRequest,
  { rejectValue: string }
>('auth/verifyOtp', async (verifyData, { rejectWithValue }) => {
  try {
    const response = await authService.verifyOtp(verifyData);
    if (!response.success || !response.data) {
      return rejectWithValue(response.message || 'OTP verification failed');
    }
    return response.data;
  } catch (err: unknown) {
    if (isAxiosError<ApiResponse<unknown>>(err) && err.response?.data?.message) {
      return rejectWithValue(err.response.data.message);
    }
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue('Verification failed. Please check the code and try again.');
  }
});

export const resendOtp = createAsyncThunk<
  string,
  ResendOtpRequest,
  { rejectValue: string }
>('auth/resendOtp', async (resendData, { rejectWithValue }) => {
  try {
    const response = await authService.resendOtp(resendData);
    return response.message || 'A new verification code has been sent.';
  } catch (err: unknown) {
    if (isAxiosError<ApiResponse<unknown>>(err) && err.response?.data?.message) {
      return rejectWithValue(err.response.data.message);
    }
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue('Failed to resend code. Please try again later.');
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

export const googleLoginThunk = createAsyncThunk<
  AuthResponseData,
  GoogleAuthRequest,
  { rejectValue: string }
>('auth/googleLogin', async (googleData, { rejectWithValue }) => {
  try {
    const response = await authService.googleLogin(googleData);
    if (!response.success || !response.data) {
      return rejectWithValue(response.message || 'Google login failed');
    }
    return response.data;
  } catch (err: unknown) {
    if (isAxiosError<ApiResponse<unknown>>(err) && err.response?.data?.message) {
      return rejectWithValue(err.response.data.message);
    }
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue('An unexpected error occurred during Google login. Please try again.');
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
        if (action.payload?.isAuthError) {
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
          state.error = null;
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        } else {
          state.user = null;
          state.isAuthenticated = false;
          state.error = action.payload?.message || 'Network error during session restoration';
        }
      })

      // Signup lifecycle (Stage 1: Sends OTP, does NOT set token or authenticated)
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<SignupInitiateResponse>) => {
        state.isLoading = false;
        state.error = null;
        state.successMessage = action.payload.message || 'Verification code sent to your email';
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Signup failed. Please try again.';
      })

      // Verify OTP lifecycle (Stage 2: Sets user, token, and authenticated)
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action: PayloadAction<AuthResponseData>) => {
        state.isLoading = false;
        state.isInitialized = true;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isAuthenticated = true;
        state.error = null;
        state.successMessage = 'Email verified and account created successfully!';

        if (action.payload.accessToken) {
          localStorage.setItem('token', action.payload.accessToken);
        }
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Verification failed. Please try again.';
      })

      // Resend OTP lifecycle
      .addCase(resendOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(resendOtp.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = null;
        state.successMessage = action.payload;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to resend code. Please try again.';
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

        if (action.payload.accessToken) {
          localStorage.setItem('token', action.payload.accessToken);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Login failed. Please try again.';
      })

      // Google Login lifecycle
      .addCase(googleLoginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(googleLoginThunk.fulfilled, (state, action: PayloadAction<AuthResponseData>) => {
        state.isLoading = false;
        state.isInitialized = true;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isAuthenticated = true;
        state.error = null;
        state.successMessage = 'Google login successful';

        if (action.payload.accessToken) {
          localStorage.setItem('token', action.payload.accessToken);
        }
      })
      .addCase(googleLoginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Google login failed. Please try again.';
      });
  },
});

export const { clearAuthError, clearAuthSuccess, logout } = authSlice.actions;
export default authSlice.reducer;



