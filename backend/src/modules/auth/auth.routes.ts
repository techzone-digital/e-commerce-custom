import { Router } from 'express';
import { validate } from '../../middleware/validate.middleware.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import {
  customerSignupSchema,
  customerLoginSchema,
  adminLoginSchema,
  verifyOtpSchema,
  resendOtpSchema,
  googleAuthSchema,
} from './auth.validation.js';
import {
  signupCustomer,
  verifyOtp,
  resendOtp,
  loginCustomer,
  googleAuth,
  loginAdmin,
  getCurrentUser,
} from './auth.controller.js';

// Public customer authentication router: mounted at /api/v1/auth
export const authRoutes = Router();

authRoutes.post('/signup', validate(customerSignupSchema), signupCustomer);
authRoutes.post('/verify-otp', validate(verifyOtpSchema), verifyOtp);
authRoutes.post('/resend-otp', validate(resendOtpSchema), resendOtp);
authRoutes.post('/login', validate(customerLoginSchema), loginCustomer);
authRoutes.post('/google', validate(googleAuthSchema), googleAuth);
authRoutes.get('/me', authenticate, getCurrentUser);

// Admin authentication router: mounted at /api/v1/admin
export const adminAuthRoutes = Router();

adminAuthRoutes.post('/login', validate(adminLoginSchema), loginAdmin);




