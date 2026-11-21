import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';

export interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  redirectPath?: string;
}

/**
 * Reusable ProtectedRoute Component
 *
 * - Checks authentication state and role from Redux.
 * - Displays a loading indicator while session initialization is in progress.
 * - Redirects unauthenticated users to `/login` preserving target location in `state.from`.
 * - Redirects users with insufficient role to `/` (or safe fallback) to prevent unauthorized access.
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  redirectPath = '/login',
}) => {
  const { isAuthenticated, isInitialized, user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  // Wait until auth initialization check completes before rendering or redirecting
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg text-text-main">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-xs uppercase tracking-widest text-text-secondary font-sans">
            Loading session...
          </p>
        </div>
      </div>
    );
  }

  // Not authenticated -> redirect to login with saved return path
  if (!isAuthenticated || !user) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // Check role authorization
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // If user is a customer trying to access an admin area or vice-versa
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

