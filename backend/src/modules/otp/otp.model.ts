import { Schema, model, Document } from 'mongoose';
import { IOtp } from './otp.types.js';

export interface IOtpDocument extends IOtp, Document {}

const pendingRegistrationSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    passwordHash: { type: String, required: true },
  },
  { _id: false }
);  

const otpSchema = new Schema<IOtpDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    otpHash: {
      type: String,
      required: true,
    },
    pendingData: {
      type: pendingRegistrationSchema,
      required: true,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    signupExpiresAt: {
      type: Date,
      required: true,
    },
    lastResentAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// TTL index to automatically remove expired documents once pending signup expires
otpSchema.index({ signupExpiresAt: 1 }, { expireAfterSeconds: 0 });

export const Otp = model<IOtpDocument>('Otp', otpSchema);

