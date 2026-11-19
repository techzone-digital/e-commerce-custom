import { Document } from 'mongoose';
import { UserRole } from '../../constants/roles.js';

export type UserStatus = 'active' | 'inactive' | 'blocked';

export interface IUser {
  name: string;
  email: string;
  phone?: string;
  password?: string;
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


