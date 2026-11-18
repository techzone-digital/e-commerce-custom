import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { Signup, Login } from '../pages/Auth';
import { AdminLogin } from '../features/admin/auth/pages/AdminLogin';
import { AdminSignup } from '../features/admin/auth/pages/AdminSignup';
import { CustomerLayout } from '../layouts/CustomerLayout';
import { HomePage } from '../pages/Home';
import { ShopPage } from '../pages/Shop';

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
          // Future customer pages (Product, Cart, etc.) go here
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
      {
        path: 'admin/signup',
        element: <AdminSignup />,
      },
    ],
  },
]);
