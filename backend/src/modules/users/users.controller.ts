import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import * as usersService from './users.service.js';
import { CreateAdminInput } from './users.validation.js';

/**
 * Handle creation of new Admin by Superadmin.
 * Route: POST /api/v1/admin/users/admins
 */
export const createAdmin = asyncHandler(
  async (req: Request<{}, {}, CreateAdminInput>, res: Response): Promise<void> => {
    const adminUser = await usersService.createAdminUser(req.body);

    res.status(201).json({
      success: true,
      message: 'Admin account created successfully.',
      data: {
        user: adminUser,
      },
    });
  }
);
