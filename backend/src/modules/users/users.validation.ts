import { z } from 'zod';

const INDIAN_PHONE_REGEX = /^[6-9]\d{9}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

/**
 * Superadmin-only Create Admin Validation Schema
 * - Explicitly rejects client-supplied role (strict schema without role property)
 * - Validates name, email, optional phone, password, and confirmPassword
 */
export const createAdminSchema = z.object({
  body: z
    .object({
      name: z
        .string({ required_error: 'Admin name is required' })
        .trim()
        .min(2, 'Name must be at least 2 characters')
        .max(60, 'Name cannot exceed 60 characters'),
      email: z
        .string({ required_error: 'Admin email is required' })
        .trim()
        .email('Please enter a valid email address')
        .toLowerCase(),
      phone: z
        .string()
        .trim()
        .regex(
          INDIAN_PHONE_REGEX,
          'Phone number must be a valid 10-digit Indian mobile number (e.g. 9876543210)'
        )
        .optional()
        .or(z.literal('')),
      password: z
        .string({ required_error: 'Password is required' })
        .min(8, 'Password must be at least 8 characters')
        .regex(
          PASSWORD_REGEX,
          'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        ),
      confirmPassword: z
        .string({ required_error: 'Please confirm password' }),
    })
    .strict()
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords must match',
      path: ['confirmPassword'],
    }),
});

export type CreateAdminInput = z.infer<typeof createAdminSchema>['body'];
