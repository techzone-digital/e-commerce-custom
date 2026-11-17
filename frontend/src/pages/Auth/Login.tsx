import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { ArrowLeft, Eye, EyeOff, Sparkles } from 'lucide-react';
import { ThemeToggle } from '../../components/common/ThemeToggle';
import { loginValidationSchema } from './login.validation';

export const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      console.log('Login form submitted:', values);
    },
  });

  return (
    <div className="min-h-screen bg-bg text-text-main flex flex-col justify-between transition-colors duration-200">
      {/* Top Header / Navigation Bar */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-text-secondary hover:text-primary transition-colors duration-200 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="bg-surface border border-border rounded-xl p-8 sm:p-10 shadow-sm transition-colors duration-200">
            {/* Brand Accent & Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h1 className="text-3xl font-serif text-text-main font-normal tracking-wide">
                Welcome Back
              </h1>
              <p className="mt-2 text-sm text-text-secondary font-sans font-light">
                Sign in to continue your jewellery journey.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={formik.handleSubmit} noValidate className="space-y-4">
              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs uppercase tracking-wider font-medium text-text-secondary mb-1.5"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="eleanor@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full px-4 py-2.5 rounded-lg bg-bg border text-text-main placeholder:text-text-secondary/50 text-sm focus:outline-none focus:ring-1 transition-colors ${
                    formik.touched.email && formik.errors.email
                      ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/30'
                      : 'border-border focus:ring-primary focus:border-primary'
                  }`}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400 font-sans">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs uppercase tracking-wider font-medium text-text-secondary mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-4 py-2.5 pr-10 rounded-lg bg-bg border text-text-main placeholder:text-text-secondary/50 text-sm focus:outline-none focus:ring-1 transition-colors ${
                      formik.touched.password && formik.errors.password
                        ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/30'
                        : 'border-border focus:ring-primary focus:border-primary'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="mt-1 text-xs text-red-600 dark:text-red-400 font-sans">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-1">
                <label htmlFor="rememberMe" className="inline-flex items-center gap-2 cursor-pointer select-none">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formik.values.rememberMe}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-0 bg-bg cursor-pointer"
                  />
                  <span className="text-xs text-text-secondary hover:text-text-main transition-colors">
                    Remember Me
                  </span>
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs text-text-secondary hover:text-primary transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-lg bg-primary hover:bg-primary-hover text-surface text-sm font-medium tracking-wide uppercase shadow-sm hover:shadow transition-colors duration-200"
                >
                  Sign In
                </button>
              </div>
            </form>

            {/* Signup Link */}
            <div className="mt-8 pt-6 border-t border-border text-center">
              <p className="text-sm text-text-secondary">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="text-primary hover:text-primary-hover font-medium underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer copyright note */}
      <footer className="py-4 text-center text-xs text-text-secondary/70">
        &copy; {new Date().getFullYear()} Shivam Crafts. All rights reserved.
      </footer>
    </div>
  );
};

export default Login;
