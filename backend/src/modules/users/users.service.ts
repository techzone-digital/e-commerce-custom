import { User } from './users.model.js';
import { IUserDocument } from './users.types.js';
import { CreateAdminInput } from './users.validation.js';
import { ROLES } from '../../constants/roles.js';
import { AppError } from '../../utils/appError.js';
import { SafeUser } from '../auth/auth.types.js';

/**
 * Format an IUserDocument into a SafeUser payload without sensitive fields.
 */
const toSafeUser = (user: IUserDocument): SafeUser => {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    status: user.status,
    isEmailVerified: user.isEmailVerified,
    avatar: user.avatar,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

/**
 * Create an Admin user (Superadmin only).
 * - Enforces role to always be ROLES.ADMIN
 * - Never trusts client-supplied role
 * - Validates unique email
 * - Validates unique mobile/phone if provided
 * - Uses Mongoose pre-save hook for password hashing (no double hashing)
 */
export const createAdminUser = async (input: CreateAdminInput): Promise<SafeUser> => {
  const normalizedEmail = input.email.toLowerCase().trim();
  const phone = input.phone?.trim() || undefined;

  const existingEmail = await User.findOne({ email: normalizedEmail });
  if (existingEmail) {
    throw new AppError('An account with this email address already exists.', 409);
  }

  if (phone) {
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      throw new AppError('An account with this mobile number already exists.', 409);
    }
  }

  const user = await User.create({
    name: input.name.trim(),
    email: normalizedEmail,
    phone,
    password: input.password,
    role: ROLES.ADMIN,
    status: 'active',
    isEmailVerified: true,
  });

  return toSafeUser(user);
};
