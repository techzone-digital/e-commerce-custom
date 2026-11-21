import { Router } from 'express';
import { authenticate, authorize } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import { ROLES } from '../../constants/roles.js';
import { createAdminSchema } from './users.validation.js';
import { createAdmin } from './users.controller.js';

export const adminUserRoutes = Router();

// Superadmin-only route to create additional administrators
adminUserRoutes.post(
  '/admins',
  authenticate,
  authorize(ROLES.SUPERADMIN),
  validate(createAdminSchema),
  createAdmin
);
