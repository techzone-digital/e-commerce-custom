import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';

const FIFTEEN_MINUTES_MS = 15 * 60 * 1000;

const createAuthLimiter = (
  max: number,
  message: string
): RateLimitRequestHandler =>
  rateLimit({
    windowMs: FIFTEEN_MINUTES_MS,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_req, res) => {
      res.status(429).json({
        success: false,
        message,
      });
    },
  });

export const signupLimiter = createAuthLimiter(
  5,
  'Too many signup attempts. Please try again later.'
);

export const verifyOtpLimiter = createAuthLimiter(
  10,
  'Too many OTP verification attempts. Please try again later.'
);

export const resendOtpLimiter = createAuthLimiter(
  5,
  'Too many OTP resend requests. Please try again later.'
);

export const loginLimiter = createAuthLimiter(
  10,
  'Too many login attempts. Please try again later.'
);

export const googleLoginLimiter = createAuthLimiter(
  15,
  'Too many Google login attempts. Please try again later.'
);

export const adminLoginLimiter = createAuthLimiter(
  5,
  'Too many admin login attempts. Please try again later.'
);

