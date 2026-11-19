import mongoose from 'mongoose';
import { config } from './env.js';

export const connectDB = async (): Promise<void> => {
  if (!config.database.uri) {
    throw new Error('Database connection string is missing. Please set MONGODB_URI in your .env file.');
  }

  try {
    const conn = await mongoose.connect(config.database.uri);
    console.log(`[Database] MongoDB connected successfully to host: ${conn.connection.host}, database: ${conn.connection.name}`);

    mongoose.connection.on('error', (err) => {
      console.error('[Database] MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('[Database] MongoDB connection disconnected');
    });
  } catch (error) {
    console.error('[Database] Connection error:', error);
    process.exit(1);
  }
};


