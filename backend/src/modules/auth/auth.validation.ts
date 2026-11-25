import { z } from 'zod';

// Indian mobile number: 10 digits starting with 6, 7, 8, or 9
const INDIAN_PHONE_REGEX = /^[6-9]\d{9}$/;

// Password: at least one uppercase letter, one lowercase letter, and one number
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

/**
 * Customer Signup Validation Schema
 * Matches frontend customer registration form fields.
 * Explicitly rejects any role field to ensure role privilege safety.
 */
export const customerSignupSchema = z.object({
  body: z
    .object({
      fullName: z
        .string({ required_error: 'Full name is required' })
        .trim()
        .min(3, 'Full name must be at least 3 characters')
        .max(60, 'Full name cannot exceed 60 characters'),
      email: z
        .string({ required_error: 'Email address is required' })
        .trim()
        .email('Please enter a valid email address')
        .toLowerCase(),
      phone: z
        .string({ required_error: 'Phone number is required' })
        .trim()
        .regex(
          INDIAN_PHONE_REGEX,
          'Phone number must be a valid 10-digit Indian mobile number (e.g. 9876543210)'
        ),
      password: z
        .string({ required_error: 'Password is required' })
        .min(8, 'Password must be at least 8 characters')
        .regex(
          PASSWORD_REGEX,
          'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        ),
      confirmPassword: z
        .string({ required_error: 'Please confirm your password' }),
    })
    .strict() // Disallows unexpected fields including 'role'
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords must match',
      path: ['confirmPassword'],
    }),
});

/**
 * Customer Login Validation Schema
 * Matches frontend customer login form fields.
 */
export const customerLoginSchema = z.object({
  body: z
    .object({
      email: z
        .string({ required_error: 'Email address is required' })
        .trim()
        .email('Please enter a valid email address')
        .toLowerCase(),
      password: z
        .string({ required_error: 'Password is required' })
        .min(1, 'Password is required'),
    })
    .strict(),
});

/**
 * Admin Login Validation Schema
 * Matches frontend admin login form fields.
 */
export const adminLoginSchema = z.object({
  body: z
    .object({
      email: z
        .string({ required_error: 'Email address is required' })
        .trim()
        .email('Please enter a valid email address')
        .toLowerCase(),
      password: z
        .string({ required_error: 'Password is required' })
        .min(1, 'Password is required'),
    })
    .strict(),
});

/**
 * Verify OTP Validation Schema
 */
export const verifyOtpSchema = z.object({
  body: z
    .object({
      email: z
        .string({ required_error: 'Email address is required' })
        .trim()
        .email('Please enter a valid email address')
        .toLowerCase(),
      otp: z
        .string({ required_error: 'OTP code is required' })
        .trim()
        .length(6, 'OTP must be exactly 6 digits')
        .regex(/^\d{6}$/, 'OTP must be numeric'),
    })
    .strict(),
});

/**
 * Resend OTP Validation Schema
 */
export const resendOtpSchema = z.object({
  body: z
    .object({
      email: z
        .string({ required_error: 'Email address is required' })
        .trim()
        .email('Please enter a valid email address')
        .toLowerCase(),
    })
    .strict(),
});

// Inferred TypeScript types for validated request payloads
export type CustomerSignupInput = z.infer<typeof customerSignupSchema>['body'];
export type CustomerLoginInput = z.infer<typeof customerLoginSchema>['body'];
export type AdminLoginInput = z.infer<typeof adminLoginSchema>['body'];
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>['body'];
export type ResendOtpInput = z.infer<typeof resendOtpSchema>['body'];



