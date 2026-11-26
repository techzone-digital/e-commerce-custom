import { Document } from 'mongoose';
import { UserRole } from '../../constants/roles.js';

export type UserStatus = 'active' | 'inactive' | 'blocked';
export type AuthProvider = 'local' | 'google';

export interface IUser {
  name: string;
  email: string;
  phone?: string;
  password?: string;
  authProvider: AuthProvider;
  googleId?: string;
  role: UserRole;
  status: UserStatus;
  isEmailVerified: boolean;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUserDocument extends IUser, IUserMethods, Document {}

export type { CreateAdminInput } from './users.validation.js';



