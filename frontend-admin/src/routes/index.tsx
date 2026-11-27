import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import { AdminLogin } from '../features/admin/auth/pages/AdminLogin';
import { AdminPlaceholderDashboard } from '../pages/Admin/AdminPlaceholderDashboard';
import { ProtectedRoute } from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute allowedRoles={['admin', 'superadmin']} authType="admin" redirectPath="/login">
            <AdminPlaceholderDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'login',
        element: <AdminLogin />,
      },
      // Fallback for /admin or nested routes to stay backward-compatible
      {
        path: 'admin',
        element: <Navigate to="/" replace />,
      },
      {
        path: 'admin/login',
        element: <Navigate to="/login" replace />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
