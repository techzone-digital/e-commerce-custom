import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/env.js';
import { apiRouter } from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';

export const createApp = (): Application => {
  const app = express();

  // Core Security & Utilities Middlewares
  app.use(helmet());
  app.use(cors({ origin: config.clientUrl, credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  if (config.env === 'development') {
    app.use(morgan('dev'));
  }

  // Health check route
  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() });
  });

  // API Versioned Routing
  app.use('/api/v1', apiRouter);

  // 404 & Centralized Error Handlers
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

