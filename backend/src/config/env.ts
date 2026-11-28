import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

if (!mongoUri) {
  console.warn('[Config] Warning: MONGODB_URI / MONGO_URI is not set in environment variables.');
}

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  clientUrl: process.env.CLIENT_URL || process.env.FRONTEND_URL || 'http://localhost:5173',
  adminUrl: process.env.ADMIN_URL || 'http://localhost:5174',
  corsOrigins: process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)
    : [
        process.env.CLIENT_URL || process.env.FRONTEND_URL || 'http://localhost:5173',
        process.env.ADMIN_URL || 'http://localhost:5174',
      ],
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
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
  },
} as const;


