import { Router } from 'express';
import { validate } from '../../middleware/validate.middleware.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import {
  customerSignupSchema,
  customerLoginSchema,
  adminLoginSchema,
} from './auth.validation.js';
import {
  signupCustomer,
  loginCustomer,
  loginAdmin,
  getCurrentUser,
} from './auth.controller.js';

// Public customer authentication router: mounted at /api/v1/auth
export const authRoutes = Router();

authRoutes.post('/signup', validate(customerSignupSchema), signupCustomer);
authRoutes.post('/login', validate(customerLoginSchema), loginCustomer);
authRoutes.get('/me', authenticate, getCurrentUser);

// Admin authentication router: mounted at /api/v1/admin
export const adminAuthRoutes = Router();

adminAuthRoutes.post('/login', validate(adminLoginSchema), loginAdmin);



