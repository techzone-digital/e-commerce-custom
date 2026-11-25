export type {
  CustomerSignupInput,
  CustomerLoginInput,
  AdminLoginInput,
  VerifyOtpInput,
  ResendOtpInput,
} from './auth.validation.js';

export type { JwtUserPayload } from '../../utils/jwt.js';

export interface SafeUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  status: string;
  isEmailVerified: boolean;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponseData {
  user: SafeUser;
  accessToken: string;
}

export interface SignupInitiateResponseData {
  email: string;
  message: string;
}





