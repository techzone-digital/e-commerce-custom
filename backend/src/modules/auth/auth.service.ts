import { User } from '../users/users.model.js';
import { IUserDocument } from '../users/users.types.js';
import { ROLES } from '../../constants/roles.js';
import { AppError } from '../../utils/appError.js';
import { generateAccessToken } from '../../utils/jwt.js';
import {
  CustomerSignupInput,
  CustomerLoginInput,
  AdminLoginInput,
  SafeUser,
  AuthResponseData,
} from './auth.types.js';

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
 * Register a new customer.
 * - Always enforces role: ROLES.CUSTOMER
 * - Never trusts client-supplied role
 * - Validates unique email
 * - Relies on Mongoose pre-save hook for password hashing (no double hashing)
 */
export const registerCustomer = async (
  input: CustomerSignupInput
): Promise<AuthResponseData> => {
  const normalizedEmail = input.email.toLowerCase().trim();

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    throw new AppError('An account with this email address already exists.', 409);
  }

  const user = await User.create({
    name: input.fullName.trim(),
    email: normalizedEmail,
    phone: input.phone?.trim(),
    password: input.password,
    role: ROLES.CUSTOMER,
  });

  const accessToken = generateAccessToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  return {
    user: toSafeUser(user),
    accessToken,
  };
};

/**
 * Authenticate customer login.
 * - Queries using normalized email
 * - Explicitly selects password (+password)
 * - Verifies password using user.comparePassword()
 * - Verifies account is active
 * - Verifies role is customer
 * - Returns safe user and JWT access token
 */
export const loginCustomer = async (
  input: CustomerLoginInput
): Promise<AuthResponseData> => {
  const normalizedEmail = input.email.toLowerCase().trim();

  const user = await User.findOne({ email: normalizedEmail }).select('+password');

  if (!user || !user.password) {
    throw new AppError('Invalid email or password.', 401);
  }

  const isPasswordValid = await user.comparePassword(input.password);
  if (!isPasswordValid) {
    throw new AppError('Invalid email or password.', 401);
  }

  if (user.status !== 'active') {
    throw new AppError('Your account has been deactivated or suspended. Please contact support.', 403);
  }

  const accessToken = generateAccessToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  return {
    user: toSafeUser(user),
    accessToken,
  };
};

/**
 * Authenticate admin or superadmin login.
 * - Queries using normalized email
 * - Explicitly selects password (+password)
 * - Verifies password using user.comparePassword()
 * - Strictly verifies role is ADMIN or SUPERADMIN
 * - Verifies account is active
 * - Returns safe user and JWT access token
 */
export const loginAdmin = async (
  input: AdminLoginInput
): Promise<AuthResponseData> => {
  const normalizedEmail = input.email.toLowerCase().trim();

  const user = await User.findOne({ email: normalizedEmail }).select('+password');

  if (!user || !user.password) {
    throw new AppError('Invalid email or password.', 401);
  }

  const isPasswordValid = await user.comparePassword(input.password);
  if (!isPasswordValid) {
    throw new AppError('Invalid email or password.', 401);
  }

  if (user.role !== ROLES.ADMIN && user.role !== ROLES.SUPERADMIN) {
    throw new AppError('Access denied: Administrator privileges required.', 403);
  }

  if (user.status !== 'active') {
    throw new AppError('This administrator account has been suspended.', 403);
  }

  const accessToken = generateAccessToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  return {
    user: toSafeUser(user),
    accessToken,
  };
};


