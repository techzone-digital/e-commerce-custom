export interface IPendingRegistration {
  name: string;
  email: string;
  phone?: string;
  passwordHash: string;
}

export interface IOtp {
  email: string;
  otpHash: string;
  pendingData: IPendingRegistration;
  attempts: number;
  expiresAt: Date;
  signupExpiresAt: Date;
  lastResentAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

