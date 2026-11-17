import { createBrowserRouter, Link } from 'react-router-dom';
import App from '../App';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { Signup, Login } from '../pages/Auth';
import { AdminLogin } from '../features/admin/auth/pages/AdminLogin';
import { AdminSignup } from '../features/admin/auth/pages/AdminSignup';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <div className="min-h-screen bg-bg text-text-main flex flex-col transition-colors duration-200">
            <header className="border-b border-border bg-surface px-6 py-4 flex items-center justify-between transition-colors duration-200">
              <span className="font-serif text-xl tracking-wider text-text-main">
                SHIVAM CRAFTS
              </span>
              <div className="flex items-center gap-4 sm:gap-6">
                <nav className="flex items-center gap-3 sm:gap-4 text-xs uppercase tracking-wider font-medium">
                  <Link
                    to="/login"
                    className="text-text-secondary hover:text-primary transition-colors py-1.5 px-2"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-3.5 py-1.5 rounded-full bg-primary hover:bg-primary-hover text-surface tracking-wider transition-colors shadow-sm"
                  >
                    Sign Up
                  </Link>
                </nav>
                <div className="h-4 w-px bg-border" aria-hidden="true" />
                <ThemeToggle showLabel />
              </div>
            </header>
            <main className="flex-1 flex items-center justify-center p-6">
              <div className="w-full max-w-md p-8 rounded-lg bg-surface border border-border shadow-sm text-center transition-colors duration-200">
                <p className="text-xs uppercase tracking-widest text-primary font-medium mb-2">
                  Haute Joaillerie
                </p>
                <h1 className="text-3xl font-serif text-text-main mb-3">
                  Jewellery E-Commerce Storefront
                </h1>
                <p className="text-sm text-text-secondary mb-6 font-sans">
                  Crafted with warm ivory, deep charcoal, and refined champagne gold accents.
                </p>
                <div className="flex justify-center">
                  <button
                    type="button"
                    className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-surface text-sm font-medium tracking-wide transition-colors"
                  >
                    Explore Collection
                  </button>
                </div>
              </div>
            </main>
          </div>
        ),
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'login',
        element: <Login />,
      },
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
