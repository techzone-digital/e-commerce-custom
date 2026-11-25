import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { Resend } from 'resend';
import { config } from '../config/env.js';

let resendClient: Resend | null = null;
if (config.email.resendApiKey) {
  resendClient = new Resend(config.email.resendApiKey);
}

/**
 * Generate a cryptographically secure 6-digit numeric OTP string.
 */
export const generateSecureOtp = (): string => {
  return crypto.randomInt(100000, 1000000).toString();
};

/**
 * Hash an OTP using SHA-256 for secure comparison and storage.
 */
export const hashOtp = (otp: string): string => {
  return crypto.createHash('sha256').update(otp).digest('hex');
};

/**
 * Verify a plain OTP string against a stored hash.
 */
export const verifyOtpHash = (otp: string, storedHash: string): boolean => {
  const candidateHash = hashOtp(otp);
  return crypto.timingSafeEqual(Buffer.from(candidateHash), Buffer.from(storedHash));
};

/**
 * Send an OTP verification email using Resend or development console fallback.
 */
export const sendOtpEmail = async (email: string, otp: string, recipientName: string): Promise<void> => {
  if (resendClient) {
    try {
      await resendClient.emails.send({
        from: config.email.from,
        to: email,
        subject: 'Your Verification Code - Shivam Crafts',
        html: `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px 24px; background-color: #faf9f6; color: #222222; border: 1px solid #e5e0d8;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h2 style="font-family: Georgia, serif; font-size: 24px; letter-spacing: 0.1em; text-transform: uppercase; margin: 0; color: #1a1a1a;">Shivam Crafts</h2>
              <p style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #8c8275; margin-top: 4px;">Timeless Jewellery</p>
            </div>
            <div style="background-color: #ffffff; padding: 28px; border: 1px solid #eee8df;">
              <p style="font-size: 14px; line-height: 1.6; margin-top: 0;">Hello ${recipientName || 'Valued Customer'},</p>
              <p style="font-size: 14px; line-height: 1.6; color: #555555;">Thank you for registering with Shivam Crafts. Please use the following 6-digit verification code to complete your account setup:</p>
              <div style="text-align: center; margin: 28px 0;">
                <span style="font-size: 32px; font-weight: bold; font-family: monospace; letter-spacing: 8px; color: #8c6d3b; background-color: #fbf8f2; padding: 12px 24px; border: 1px dashed #d4c5ae; display: inline-block;">${otp}</span>
              </div>
              <p style="font-size: 12px; color: #777777; line-height: 1.5;">This verification code is valid for <strong>5 minutes</strong>. If you did not request this registration, please disregard this email.</p>
            </div>
            <div style="text-align: center; margin-top: 24px; font-size: 11px; color: #999999;">
              &copy; ${new Date().getFullYear()} Shivam Crafts. All rights reserved.
            </div>
          </div>
        `,
      });
      return;
    } catch (error) {
      if (config.env === 'development') {
        console.warn(`[Resend Email Warning] Failed to send email via Resend (${(error as Error).message}). Falling back to dev terminal output.`);
        console.log(`\n======================================================\n[DEV ONLY] OTP for ${email}: ${otp}\n======================================================\n`);
        return;
      }
      throw error;
    }
  }

  // Development fallback when Resend is not configured
  if (config.env === 'development') {
    console.log(`\n======================================================\n[DEV ONLY] Resend not configured. OTP for ${email}: ${otp}\n======================================================\n`);
  } else {
    throw new Error('Email service is not configured.');
  }
};

