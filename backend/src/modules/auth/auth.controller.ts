import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import * as authService from './auth.service.js';
import { CustomerSignupInput, CustomerLoginInput, AdminLoginInput } from './auth.types.js';

/**
 * Handle customer registration.
 * Route: POST /api/v1/auth/signup
 */
export const signupCustomer = asyncHandler(
  async (req: Request<{}, {}, CustomerSignupInput>, res: Response): Promise<void> => {
    const result = await authService.registerCustomer(req.body);

    res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      data: result,
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



