export type {
  CustomerSignupInput,
  CustomerLoginInput,
  AdminLoginInput,
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




