import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import { config } from '../../config/env.js';
import { User } from '../users/users.model.js';
import { IUserDocument } from '../users/users.types.js';
import { Otp } from '../otp/otp.model.js';
import { ROLES } from '../../constants/roles.js';
import { AppError } from '../../utils/appError.js';
import { generateAccessToken } from '../../utils/jwt.js';
import {
  generateSecureOtp,
  hashOtp,
  verifyOtpHash,
  sendOtpEmail,
} from '../../utils/email.js';
import {
  CustomerSignupInput,
  CustomerLoginInput,
  AdminLoginInput,
  VerifyOtpInput,
  ResendOtpInput,
  SafeUser,
  AuthResponseData,
  SignupInitiateResponseData,
} from './auth.types.js';

const OTP_EXPIRY_MINUTES = 5;
const PENDING_SIGNUP_EXPIRY_MINUTES = 10;
const RESEND_COOLDOWN_SECONDS = 45;
const MAX_VERIFICATION_ATTEMPTS = 5;

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
 * Register a new customer (Stage 1: Validate, generate OTP, send email).
 * - Enforces customer role.
 * - Checks for duplicate accounts in User collection.
 * - Stores pending registration with bcrypt-hashed password in Otp collection.
 * - Does not create User or issue JWT until OTP is verified.
 */
export const registerCustomer = async (
  input: CustomerSignupInput
): Promise<SignupInitiateResponseData> => {
  const normalizedEmail = input.email.toLowerCase().trim();

  // 1. Prevent duplicate accounts
  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    throw new AppError('An account with this email address already exists.', 409);
  }

  // 2. Hash password with bcrypt before storing in temporary pending registration
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(input.password, salt);

  // 3. Generate secure OTP and hash it
  const plainOtp = generateSecureOtp();
  const hashedOtp = hashOtp(plainOtp);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + OTP_EXPIRY_MINUTES * 60 * 1000);
  const signupExpiresAt = new Date(now.getTime() + PENDING_SIGNUP_EXPIRY_MINUTES * 60 * 1000);

  // 4. Invalidate any existing OTP record for this email and save new pending data
  await Otp.findOneAndDelete({ email: normalizedEmail });

  await Otp.create({
    email: normalizedEmail,
    otpHash: hashedOtp,
    pendingData: {
      name: input.fullName.trim(),
      email: normalizedEmail,
      phone: input.phone?.trim(),
      passwordHash,
    },
    attempts: 0,
    expiresAt,
    signupExpiresAt,
    lastResentAt: now,
  });

  // 5. Send OTP via email
  await sendOtpEmail(normalizedEmail, plainOtp, input.fullName.trim());

  return {
    email: normalizedEmail,
    message: 'Verification code sent to your email address.',
  };
};

/**
 * Verify OTP and complete account creation (Stage 2).
 * - Validates OTP and checks expiration.
 * - Protects against brute force (max 5 attempts).
 * - Creates user with role: CUSTOMER and isEmailVerified: true.
 * - Deletes OTP record to prevent reuse.
 * - Issues JWT access token.
 */
export const verifySignupOtp = async (
  input: VerifyOtpInput
): Promise<AuthResponseData> => {
  const normalizedEmail = input.email.toLowerCase().trim();

  const otpRecord = await Otp.findOne({ email: normalizedEmail });
  if (!otpRecord) {
    throw new AppError('No pending verification found or your verification code has expired. Please sign up again.', 400);
  }

  const now = new Date();

  // 1. Check if the overall pending signup (10 mins) has expired
  if (now > otpRecord.signupExpiresAt) {
    await Otp.findOneAndDelete({ email: normalizedEmail });
    throw new AppError('Your registration session has expired. Please sign up again.', 400);
  }

  // 2. Check if the latest OTP code (5 mins) has expired
  if (now > otpRecord.expiresAt) {
    throw new AppError('Verification code has expired. Please request a new one.', 400);
  }

  // Check attempt limit
  if (otpRecord.attempts >= MAX_VERIFICATION_ATTEMPTS) {
    await Otp.findOneAndDelete({ email: normalizedEmail });
    throw new AppError('Maximum verification attempts reached. Please sign up again.', 429);
  }

  // Verify hash
  const isValid = verifyOtpHash(input.otp, otpRecord.otpHash);
  if (!isValid) {
    otpRecord.attempts += 1;
    await otpRecord.save();
    const remaining = MAX_VERIFICATION_ATTEMPTS - otpRecord.attempts;
    throw new AppError(
      `Invalid verification code. ${remaining > 0 ? `${remaining} ${remaining === 1 ? 'attempt' : 'attempts'} remaining.` : 'Your verification code is no longer valid. Please request a new code.'}`,
      400
    );
  }

  // Check again to ensure no race condition on duplicate email
  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    await Otp.findOneAndDelete({ email: normalizedEmail });
    throw new AppError('An account with this email address already exists.', 409);
  }

  // Create User with pre-hashed password (use native collection / insertOne to avoid double hashing by pre-save hook)
  const [createdUser] = await User.create(
    [
      {
        name: otpRecord.pendingData.name,
        email: otpRecord.pendingData.email,
        phone: otpRecord.pendingData.phone,
        password: otpRecord.pendingData.passwordHash,
        role: ROLES.CUSTOMER,
        isEmailVerified: true,
        status: 'active',
      },
    ],
    // Bypass Mongoose pre-save re-hashing by updating the password directly to the bcrypt hash
  );

  // Directly set the password in the database without re-triggering the pre-save bcrypt hash
  await User.collection.updateOne(
    { _id: createdUser._id },
    { $set: { password: otpRecord.pendingData.passwordHash } }
  );

  const user = await User.findById(createdUser._id);
  if (!user) {
    throw new AppError('Failed to complete user registration.', 500);
  }

  // Invalidate OTP record to prevent reuse
  await Otp.findOneAndDelete({ email: normalizedEmail });

  // Issue JWT access token
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
 * Resend OTP with cooldown enforcement.
 */
export const resendSignupOtp = async (
  input: ResendOtpInput
): Promise<{ message: string }> => {
  const normalizedEmail = input.email.toLowerCase().trim();

  const otpRecord = await Otp.findOne({ email: normalizedEmail });
  if (!otpRecord) {
    throw new AppError('No pending verification found. Please sign up again.', 400);
  }

  const now = new Date();

  // Reject resend if the overall pending signup session (10 mins) has expired
  if (now > otpRecord.signupExpiresAt) {
    await Otp.findOneAndDelete({ email: normalizedEmail });
    throw new AppError('Your registration session has expired. Please sign up again.', 400);
  }

  // Enforce cooldown (45 seconds)
  const timeSinceLastResend = (now.getTime() - new Date(otpRecord.lastResentAt).getTime()) / 1000;
  if (timeSinceLastResend < RESEND_COOLDOWN_SECONDS) {
    const waitTime = Math.ceil(RESEND_COOLDOWN_SECONDS - timeSinceLastResend);
    throw new AppError(`Please wait ${waitTime} second(s) before requesting another code.`, 429);
  }

  // Generate new OTP, refresh OTP expiry (5 mins) without extending signupExpiresAt, and reset verification attempts
  const plainOtp = generateSecureOtp();
  otpRecord.otpHash = hashOtp(plainOtp);
  otpRecord.expiresAt = new Date(now.getTime() + OTP_EXPIRY_MINUTES * 60 * 1000);
  otpRecord.attempts = 0;
  otpRecord.lastResentAt = now;

  await otpRecord.save();

  await sendOtpEmail(normalizedEmail, plainOtp, otpRecord.pendingData.name);

  return {
    message: 'A new verification code has been sent to your email.',
  };
};

/**
 * Authenticate customer login.
 * - Queries using normalized email
 * - Explicitly selects password (+password)
 * - Verifies password using user.comparePassword()
 * - Verifies account is active
 * - Verifies customer email is verified
 * - Returns safe user and JWT access token
 */
export const loginCustomer = async (
  input: CustomerLoginInput
): Promise<AuthResponseData> => {
  const normalizedEmail = input.email.toLowerCase().trim();

  const user = await User.findOne({ email: normalizedEmail }).select('+password');

  if (!user) {
    throw new AppError('Invalid email or password.', 401);
  }

  if (user.authProvider === 'google') {
    throw new AppError('This account uses Google Sign-In. Please continue with Google.', 400);
  }

  if (!user.password) {
    throw new AppError('Invalid email or password.', 401);
  }

  const isPasswordValid = await user.comparePassword(input.password);
  if (!isPasswordValid) {
    throw new AppError('Invalid email or password.', 401);
  }

  if (user.status !== 'active') {
    throw new AppError('Your account has been deactivated or suspended. Please contact support.', 403);
  }

  // Enforce email verification for customers
  if (!user.isEmailVerified) {
    throw new AppError('Please verify your email address before logging in.', 403);
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

const googleClient = new OAuth2Client();

/**
 * Authenticate or register a customer using a verified Google ID token.
 * - Customer-only: rejects admin/superadmin accounts.
 * - Does not auto-link to existing local password accounts.
 */
export const loginWithGoogle = async (idToken: string): Promise<AuthResponseData> => {
  if (!config.google.clientId) {
    throw new AppError('Google authentication is not configured on the server.', 503);
  }

  let payload;
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: config.google.clientId,
    });
    payload = ticket.getPayload();
  } catch {
    throw new AppError('Invalid or expired Google token.', 401);
  }

  if (!payload || !payload.sub || !payload.email) {
    throw new AppError('Google account information is incomplete.', 400);
  }

  if (payload.email_verified !== true) {
    throw new AppError('Your Google email address is not verified.', 400);
  }

  const normalizedEmail = payload.email.toLowerCase().trim();
  const googleId = payload.sub;

  // 1. Look up by googleId first
  let user = await User.findOne({ googleId });

  if (user) {
    if (user.role !== ROLES.CUSTOMER) {
      throw new AppError('Google authentication is only available for customer accounts.', 403);
    }
    if (user.status !== 'active') {
      throw new AppError('Your account has been deactivated or suspended. Please contact support.', 403);
    }
  } else {
    // 2. Look up by normalized email
    const existingByEmail = await User.findOne({ email: normalizedEmail });

    if (existingByEmail) {
      if (existingByEmail.role !== ROLES.CUSTOMER) {
        throw new AppError('Google authentication is only available for customer accounts.', 403);
      }
      if (existingByEmail.authProvider === 'local') {
        throw new AppError(
          'An account with this email already exists. Please sign in with your email and password.',
          409
        );
      }
      throw new AppError(
        'This email is already associated with a different Google account.',
        409
      );
    }

    // 3. Create new Google-only customer
    const rawName = (payload.name || normalizedEmail.split('@')[0] || 'Customer').trim();
    const safeName = rawName.length >= 2 ? rawName.slice(0, 60) : 'Customer';

    try {
      user = await User.create({
        name: safeName,
        email: normalizedEmail,
        authProvider: 'google',
        googleId,
        role: ROLES.CUSTOMER,
        isEmailVerified: true,
        status: 'active',
        ...(payload.picture ? { avatar: payload.picture } : {}),
      });
    } catch (error: any) {
      if (error?.code === 11000) {
        throw new AppError(
          'An account with this email or Google identity already exists. Please try signing in again.',
          409
        );
      }
      throw error;
    }
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
 * Unchanged from original implementation.
 */
export const loginAdmin = async (
  input: AdminLoginInput
): Promise<AuthResponseData> => {
  const normalizedEmail = input.email.toLowerCase().trim();

  const user = await User.findOne({ email: normalizedEmail }).select('+password');

  if (!user) {
    throw new AppError('Invalid email or password.', 401);
  }

  if (user.authProvider === 'google') {
    throw new AppError('This account uses Google Sign-In. Please continue with Google.', 400);
  }

  if (!user.password) {
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



