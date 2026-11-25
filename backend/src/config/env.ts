import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

if (!mongoUri) {
  console.warn('[Config] Warning: MONGODB_URI / MONGO_URI is not set in environment variables.');
}

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  clientUrl: process.env.CLIENT_URL || process.env.FRONTEND_URL || 'http://localhost:3000',
  database: {
    uri: mongoUri || '',
  },
  jwt: {
    secret: process.env.JWT_SECRET || '',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  email: {
    resendApiKey: process.env.RESEND_API_KEY || '',
    from: process.env.EMAIL_FROM || 'Shivam Crafts <onboarding@resend.dev>',
  },
} as const;


