import mongoose from 'mongoose';
import { config } from './env.js';

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(config.database.uri);
    console.log(`[Database] MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('[Database] Connection error:', error);
    process.exit(1);
  }
};

