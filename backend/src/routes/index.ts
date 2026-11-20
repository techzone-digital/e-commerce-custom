import { Router } from 'express';
import { authRoutes, adminAuthRoutes } from '../modules/auth/auth.routes.js';

export const apiRouter = Router();

// Customer authentication routes -> /api/v1/auth/*
apiRouter.use('/auth', authRoutes);

// Admin routes -> /api/v1/admin/*
apiRouter.use('/admin', adminAuthRoutes);


