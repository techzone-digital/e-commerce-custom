import jwt, { SignOptions } from 'jsonwebtoken';
import { config } from '../config/env.js';
import { UserRole } from '../constants/roles.js';

export interface JwtUserPayload {
  userId: string;
  email: string;
  role: UserRole;
}

const getJwtSecret = (): string => {
  const secret = config.jwt.secret;
  if (!secret) {
    throw new Error('JWT_SECRET is not configured in the environment variables.');
  }
  return secret;
};

/**
 * Generates a signed JWT access token for an authenticated user.
 */
export const generateAccessToken = (
  payload: JwtUserPayload,
  expiresIn?: string | number
): string => {
  const secret = getJwtSecret();
  const options: SignOptions = {
    expiresIn: (expiresIn || config.jwt.expiresIn || '7d') as SignOptions['expiresIn'],
  };

  return jwt.sign(payload, secret, options);
};

/**
 * Verifies and decodes a JWT token.
 * Throws JsonWebTokenError or TokenExpiredError if invalid/expired.
 */
export const verifyAccessToken = (token: string): JwtUserPayload => {
  const secret = getJwtSecret();
  const decoded = jwt.verify(token, secret);
  return decoded as JwtUserPayload;
};

