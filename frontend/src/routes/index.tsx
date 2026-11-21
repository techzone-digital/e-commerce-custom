import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { Signup, Login } from '../pages/Auth';
import { AdminLogin } from '../features/admin/auth/pages/AdminLogin';
import { CustomerLayout } from '../layouts/CustomerLayout';
import { HomePage } from '../pages/Home';
import { ShopPage } from '../pages/Shop';
import { ProtectedRoute } from './ProtectedRoute';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // ── Customer-facing routes ──────────────────────────────────────────
      {
        element: <CustomerLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: 'shop',
            element: <ShopPage />,
          },
          // Protected customer account and orders routes
          {
            path: 'orders',
            element: (
              <ProtectedRoute allowedRoles={['customer']}>
                <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                  <h1 className="font-serif text-3xl mb-4 italic">My Orders</h1>
                  <p className="text-sm text-text-secondary">Your order history will appear here.</p>
                </div>
              </ProtectedRoute>
            ),
          },
          {
            path: 'account',
            element: (
              <ProtectedRoute allowedRoles={['customer']}>
                <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                  <h1 className="font-serif text-3xl mb-4 italic">My Account</h1>
                  <p className="text-sm text-text-secondary">Your account details and preferences.</p>
                </div>
              </ProtectedRoute>
            ),
          },
        ],
      },

      // ── Customer auth routes ────────────────────────────────────────────
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'login',
        element: <Login />,
      },

      // ── Admin auth routes ───────────────────────────────────────────────
      {
        path: 'admin/login',
        element: <AdminLogin />,
      },
    ],
  },
]);

