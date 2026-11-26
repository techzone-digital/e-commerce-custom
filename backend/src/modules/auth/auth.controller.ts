import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import * as authService from './auth.service.js';
import {
  CustomerSignupInput,
  CustomerLoginInput,
  AdminLoginInput,
  VerifyOtpInput,
  ResendOtpInput,
} from './auth.types.js';
import { GoogleAuthInput } from './auth.validation.js';

/**
 * Handle customer registration initiation (sends verification OTP).
 * Route: POST /api/v1/auth/signup
 */
export const signupCustomer = asyncHandler(
  async (req: Request<{}, {}, CustomerSignupInput>, res: Response): Promise<void> => {
    const result = await authService.registerCustomer(req.body);

    res.status(200).json({
      success: true,
      message: 'Verification code sent to your email address.',
      data: result,
    });
  }
);

/**
 * Handle customer OTP verification and account completion.
 * Route: POST /api/v1/auth/verify-otp
 */
export const verifyOtp = asyncHandler(
  async (req: Request<{}, {}, VerifyOtpInput>, res: Response): Promise<void> => {
    const result = await authService.verifySignupOtp(req.body);

    res.status(201).json({
      success: true,
      message: 'Email verified and account created successfully.',
      data: result,
    });
  }
);

/**
 * Handle customer OTP resend.
 * Route: POST /api/v1/auth/resend-otp
 */
export const resendOtp = asyncHandler(
  async (req: Request<{}, {}, ResendOtpInput>, res: Response): Promise<void> => {
    const result = await authService.resendSignupOtp(req.body);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  }
);

/**
 * Handle customer login.
 * Route: POST /api/v1/auth/login
 */
export const loginCustomer = asyncHandler(
  async (req: Request<{}, {}, CustomerLoginInput>, res: Response): Promise<void> => {
    const result = await authService.loginCustomer(req.body);

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: result,
    });
  }
);

/**
 * Handle customer Google authentication.
 * Route: POST /api/v1/auth/google
 */
export const googleAuth = asyncHandler(
  async (req: Request<{}, {}, GoogleAuthInput>, res: Response): Promise<void> => {
    const result = await authService.loginWithGoogle(req.body.idToken);

    res.status(200).json({
      success: true,
      message: 'Google login successful.',
      data: result,
    });
  }
);

/**
 * Handle admin login.
 * Route: POST /api/v1/admin/login
 */
export const loginAdmin = asyncHandler(
  async (req: Request<{}, {}, AdminLoginInput>, res: Response): Promise<void> => {
    const result = await authService.loginAdmin(req.body);

    res.status(200).json({
      success: true,
      message: 'Admin login successful.',
      data: result,
    });
  }
);

/**
 * Handle get current authenticated user profile.
 * Route: GET /api/v1/auth/me
 */
export const getCurrentUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({
      success: true,
      message: 'Authenticated user fetched successfully.',
      data: {
        user: req.user,
      },
    });
  }
);




