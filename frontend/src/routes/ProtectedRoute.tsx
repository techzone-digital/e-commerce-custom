import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';

export interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  redirectPath?: string;
  authType?: 'customer' | 'admin';
}

/**
 * Reusable ProtectedRoute Component
 *
 * - Checks authentication state and role from Redux (supporting both customer and admin auth state).
 * - Displays a loading indicator while session initialization is in progress.
 * - Redirects unauthenticated users to redirectPath (`/login` or `/admin/login`).
 * - Redirects users with insufficient role to prevent unauthorized access.
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  redirectPath,
  authType = 'customer',
}) => {
  const customerAuth = useAppSelector((state) => state.auth);
  const adminAuth = useAppSelector((state) => state.adminAuth);
  const location = useLocation();

  const isCurrentAuthAdmin = authType === 'admin';
  const isInitialized = isCurrentAuthAdmin
    ? adminAuth.isInitialized
    : customerAuth.isInitialized;
  const isAuthenticated = isCurrentAuthAdmin
    ? adminAuth.isAdminAuthenticated
    : customerAuth.isAuthenticated;
  const user = isCurrentAuthAdmin ? adminAuth.admin : customerAuth.user;
  const defaultRedirectPath = isCurrentAuthAdmin ? '/admin/login' : '/login';
  const effectiveRedirectPath = redirectPath || defaultRedirectPath;

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
    return <Navigate to={effectiveRedirectPath} state={{ from: location }} replace />;
  }

  // Check role authorization
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // If unauthorized for this route:
    // If admin route requested by non-admin, redirect to admin login
    if (isCurrentAuthAdmin) {
      return <Navigate to="/admin/login" replace />;
    }
    // If customer route requested by non-customer, redirect to home
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

