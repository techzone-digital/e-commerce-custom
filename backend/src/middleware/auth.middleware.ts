import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt.js';
import { User } from '../modules/users/users.model.js';
import { AppError } from '../utils/appError.js';
import { UserRole } from '../constants/roles.js';
import { SafeUser } from '../modules/auth/auth.types.js';

/**
 * JWT Authentication Middleware
 *
 * 1. Reads JWT from `Authorization` header (`Bearer <token>`).
 * 2. Returns 401 if header is missing or malformed.
 * 3. Verifies token using `verifyAccessToken()`.
 * 4. Catches JsonWebTokenError / TokenExpiredError and converts them to 401 AppError.
 * 5. Queries user from MongoDB by `userId`.
 * 6. Returns 401 if user does not exist.
 * 7. Checks account status and returns 403 if status !== 'active'.
 * 8. Attaches sanitized SafeUser to `req.user`.
 * 9. Calls `next()` only upon full validation.
 */
export const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError('Authentication required. Missing Authorization header.', 401);
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer' || !parts[1].trim()) {
      throw new AppError('Authentication malformed. Format must be "Bearer <token>".', 401);
    }

    const token = parts[1].trim();

    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch (jwtError: any) {
      if (jwtError?.name === 'TokenExpiredError') {
        throw new AppError('Token has expired. Please log in again.', 401);
      }
      throw new AppError('Invalid or corrupted token.', 401);
    }

    if (!decoded || !decoded.userId) {
      throw new AppError('Invalid token payload.', 401);
    }

    // Always fetch user from database to ensure fresh role and active status
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new AppError('User belonging to this token no longer exists.', 401);
    }

    if (user.status !== 'active') {
      throw new AppError('Your account has been deactivated or suspended. Please contact support.', 403);
    }

    // Attach safe user details to Express request
    const safeUser: SafeUser = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
      isEmailVerified: user.isEmailVerified,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    req.user = safeUser;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Role-Based Authorization Middleware
 *
 * @param roles Permitted roles for the route
 * - Returns 401 if authentication has not been executed (req.user is absent)
 * - Returns 403 if user's role is not within permitted roles
 * - Continues via `next()` when authorized
 */
export const authorize = (...roles: (UserRole | string)[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AppError('Authentication required before authorization.', 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('Access forbidden: You do not have permission to perform this action.', 403)
      );
    }

    next();
  };
};
