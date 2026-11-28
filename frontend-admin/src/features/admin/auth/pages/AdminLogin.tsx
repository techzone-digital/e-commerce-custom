import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, Location } from 'react-router-dom';
import { useFormik } from 'formik';
import { ArrowLeft, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ThemeToggle, GoogleLoginButton } from '../../../../components/common';
import { adminLoginValidationSchema } from '../validation/adminLogin.validation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  loginAdmin,
  clearAdminAuthError,
  clearAdminAuthSuccess,
} from '../../slices/adminAuthSlice';

interface AdminLoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

// ─── Shared field-level error message ───────────────────────────────────────
const FieldError: React.FC<{ message: string }> = ({ message }) => (
  <p className="mt-1.5 text-[11px] font-sans text-red-600 dark:text-red-400 tracking-wide">
    {message}
  </p>
);

// ─── Underline-style input base classes ─────────────────────────────────────
const inputBase =
  'w-full bg-transparent border-b py-2.5 text-sm text-text-main placeholder:text-text-secondary/40 focus:outline-none transition-colors duration-200';
const inputNormal = 'border-border focus:border-primary';
const inputError  = 'border-red-500/70 focus:border-red-500';

export const AdminLogin: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    isLoading,
    error,
    successMessage,
    isAdminAuthenticated,
    isInitialized,
  } = useAppSelector((state) => state.adminAuth);

  // Redirect if already authenticated as admin
  useEffect(() => {
    if (isInitialized && isAdminAuthenticated) {
      const from = (location.state as { from?: Location })?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isInitialized, isAdminAuthenticated, navigate, location.state]);

  // Clear errors and success messages on unmount or mount
  useEffect(() => {
    dispatch(clearAdminAuthError());
    dispatch(clearAdminAuthSuccess());
    return () => {
      dispatch(clearAdminAuthError());
      dispatch(clearAdminAuthSuccess());
    };
  }, [dispatch]);

  const formik = useFormik<AdminLoginFormValues>({
    initialValues: { email: '', password: '', rememberMe: false },
    validationSchema: adminLoginValidationSchema,
    onSubmit: async (values) => {
      dispatch(clearAdminAuthError());
      const resultAction = await dispatch(
        loginAdmin({
          email: values.email.trim(),
          password: values.password,
        })
      );

      if (loginAdmin.fulfilled.match(resultAction)) {
        const from = (location.state as { from?: Location })?.from?.pathname || '/admin';
        navigate(from, { replace: true });
      }
    },
  });

  return (
    <div className="min-h-screen flex bg-bg text-text-main transition-colors duration-200">

      {/* ── LEFT: Editorial image panel (desktop only) ───────────────────── */}
      <aside
        className="hidden lg:flex lg:w-[45%] xl:w-[42%] relative flex-col overflow-hidden"
        aria-hidden="true"
      >
        {/* Photo */}
        <img
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=85&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />

        {/* Dark overlay — heavier at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

        {/* Top-left back link */}
        <div className="relative z-10 p-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-200 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </div>

        {/* Bottom editorial copy */}
        <div className="relative z-10 mt-auto p-10 pb-12">
          {/* Thin gold rule */}
          <div className="w-8 h-px bg-primary mb-6" />
          <p className="text-[10px] uppercase tracking-[0.25em] text-primary/80 mb-3 font-sans">
            Admin Portal
          </p>
          <h2 className="font-serif text-3xl xl:text-4xl font-light italic text-white leading-snug mb-4">
            Crafted for those<br />who curate excellence.
          </h2>
          <p className="text-xs font-sans text-white/50 leading-relaxed max-w-xs">
            Restricted access. Authorised administrators only.
          </p>
        </div>

        {/* Right-edge vertical rule */}
        <div className="absolute top-0 right-0 h-full w-px bg-border/30" />
      </aside>

      {/* ── RIGHT: Form column ───────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">

        {/* Top bar — mobile back link + theme toggle */}
        <div className="flex items-center justify-between px-6 sm:px-10 lg:px-14 pt-7 pb-2">
          {/* Mobile-only back link */}
          <Link
            to="/"
            className="inline-flex lg:hidden items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-text-secondary hover:text-primary transition-colors duration-200 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            Home
          </Link>
          {/* Spacer on desktop so toggle floats right */}
          <span className="hidden lg:block" aria-hidden="true" />
          <ThemeToggle />
        </div>

        {/* Form wrapper — vertically centred */}
        <div className="flex-1 flex items-center justify-center px-6 sm:px-10 lg:px-16 xl:px-24 py-10">
          <div className="w-full max-w-sm">

            {/* Page heading */}
            <div className="mb-10">
              <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-sans mb-3">
                Admin Portal
              </p>
              <h1 className="font-serif text-[2.6rem] leading-tight font-light italic text-text-main mb-2">
                Sign In
              </h1>
              <p className="text-xs font-sans text-text-secondary leading-relaxed">
                Enter your credentials to access the administration panel.
              </p>
            </div>

            {/* Global feedback messages */}
            {error && (
              <div
                role="alert"
                className="mb-6 p-3.5 bg-red-500/10 border-l-2 border-red-500 text-red-600 dark:text-red-400 text-xs font-sans flex items-start gap-2.5"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{error}</span>
              </div>
            )}

            {successMessage && (
              <div
                role="status"
                className="mb-6 p-3.5 bg-green-500/10 border-l-2 border-green-500 text-green-700 dark:text-green-400 text-xs font-sans flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{successMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={formik.handleSubmit} noValidate className="space-y-7">

              {/* Email */}
              <div>
                <label
                  htmlFor="admin-email"
                  className="block text-[10px] uppercase tracking-[0.18em] font-medium text-text-secondary mb-2"
                >
                  Email Address
                </label>
                <input
                  id="admin-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="admin@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${inputBase} ${formik.touched.email && formik.errors.email ? inputError : inputNormal}`}
                />
                {formik.touched.email && formik.errors.email && (
                  <FieldError message={formik.errors.email} />
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-[10px] uppercase tracking-[0.18em] font-medium text-text-secondary mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="admin-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${inputBase} pr-9 ${formik.touched.password && formik.errors.password ? inputError : inputNormal}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    {showPassword
                      ? <EyeOff className="w-4 h-4" />
                      : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <FieldError message={formik.errors.password} />
                )}
              </div>

              {/* Remember Me + Forgot Password */}
              <div className="flex items-center justify-between">
                <label
                  htmlFor="admin-rememberMe"
                  className="inline-flex items-center gap-2.5 cursor-pointer select-none group"
                >
                  <input
                    id="admin-rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formik.values.rememberMe}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-3.5 h-3.5 rounded-none border-border text-primary focus:ring-primary focus:ring-offset-0 bg-bg cursor-pointer accent-primary"
                  />
                  <span className="text-[11px] font-sans tracking-wide text-text-secondary group-hover:text-text-main transition-colors duration-200">
                    Remember me
                  </span>
                </label>
                {/* Visual link only — no reset-password route in this task */}
                <span
                  role="link"
                  aria-label="Forgot password — not yet available"
                  className="text-[11px] font-sans tracking-wide text-text-secondary hover:text-primary transition-colors duration-200 cursor-pointer"
                >
                  Forgot password?
                </span>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={formik.isSubmitting || isLoading}
                  className="w-full py-3.5 px-6 bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-surface text-[11px] font-sans font-medium tracking-[0.2em] uppercase transition-colors duration-200 rounded-none shadow-none"
                >
                  {formik.isSubmitting || isLoading ? 'Signing In…' : 'Sign In'}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="relative my-7">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-sans tracking-[0.2em]">
                <span className="bg-bg px-3 text-text-secondary/60">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Admin Login UI */}
            <div>
              <GoogleLoginButton
                text="Continue with Google"
                onClick={() => {
                  console.log('Admin Google login clicked (UI placeholder - auth integration pending)');
                }}
              />
            </div>

            {/* Footer link */}
            <div className="mt-10 pt-7 border-t border-border">
              <p className="text-[11px] font-sans text-text-secondary leading-relaxed">
                Administrator access is restricted. Accounts must be provisioned by a system administrator.
              </p>
            </div>

          </div>
        </div>

        {/* Page footer */}
        <footer className="px-6 sm:px-10 lg:px-14 pb-6 pt-2">
          <p className="text-[10px] font-sans text-text-secondary/50 tracking-wide">
            &copy; {new Date().getFullYear()} Shivam Crafts. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default AdminLogin;
