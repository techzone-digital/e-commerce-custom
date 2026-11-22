import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { ArrowLeft, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ThemeToggle, GoogleLoginButton } from '../../components/common';
import { signupValidationSchema } from './signup.validation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { signupUser, clearAuthError, clearAuthSuccess } from '@/features/auth/slices/authSlice';

interface SignupFormValues {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
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

export const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error, successMessage, isAuthenticated, isInitialized } = useAppSelector(
    (state) => state.auth
  );

  // Redirect if already authenticated
  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isInitialized, isAuthenticated, navigate]);

  useEffect(() => {
    // Clear any previous auth messages when component mounts or unmounts
    dispatch(clearAuthError());
    dispatch(clearAuthSuccess());
    return () => {
      dispatch(clearAuthError());
      dispatch(clearAuthSuccess());
    };
  }, [dispatch]);


  const formik = useFormik<SignupFormValues>({
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupValidationSchema,
    onSubmit: async (values) => {
      // Dispatch customer signup thunk with strictly customer fields only
      const resultAction = await dispatch(
        signupUser({
          fullName: values.fullName.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          password: values.password,
          confirmPassword: values.confirmPassword,
        })
      );

      if (signupUser.fulfilled.match(resultAction)) {
        setTimeout(() => {
          navigate('/verify-otp', {
            state: { email: values.email.trim() },
          });
        }, 1200);
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
        {/* Photo — different focal crop for visual distinction */}
        <img
          src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1200&q=85&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />

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
          <div className="w-8 h-px bg-primary mb-6" />
          <p className="text-[10px] uppercase tracking-[0.25em] text-primary/80 mb-3 font-sans">
            Begin Your Story
          </p>
          <h2 className="font-serif text-3xl xl:text-4xl font-light italic text-white leading-snug mb-4">
            Every Beautiful Story Begins<br />with a Special Piece.
          </h2>
          <p className="text-xs font-sans text-white/60 leading-relaxed max-w-xs">
            Join us and explore jewellery made with care and attention to detail.
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
                Customer Registration
              </p>
              <h1 className="font-serif text-[2.6rem] leading-tight font-light italic text-text-main mb-2">
                Create Account
              </h1>
              <p className="text-xs font-sans text-text-secondary leading-relaxed">
                Join Shivam Crafts and discover timeless jewellery.
              </p>
            </div>

            {/* Global API Feedback Messages */}
            {error && (
              <div
                role="alert"
                className="mb-6 p-3.5 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-start gap-2.5"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{error}</span>
              </div>
            )}

            {successMessage && (
              <div
                role="status"
                className="mb-6 p-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{successMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={formik.handleSubmit} noValidate className="space-y-6">

              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-[10px] uppercase tracking-[0.18em] font-medium text-text-secondary mb-2"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Eleanor Vance"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${inputBase} ${formik.touched.fullName && formik.errors.fullName ? inputError : inputNormal}`}
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <FieldError message={formik.errors.fullName} />
                )}
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-[10px] uppercase tracking-[0.18em] font-medium text-text-secondary mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="eleanor@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${inputBase} ${formik.touched.email && formik.errors.email ? inputError : inputNormal}`}
                />
                {formik.touched.email && formik.errors.email && (
                  <FieldError message={formik.errors.email} />
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-[10px] uppercase tracking-[0.18em] font-medium text-text-secondary mb-2"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="9876543210"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${inputBase} ${formik.touched.phone && formik.errors.phone ? inputError : inputNormal}`}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <FieldError message={formik.errors.phone} />
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-[10px] uppercase tracking-[0.18em] font-medium text-text-secondary mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
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

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-[10px] uppercase tracking-[0.18em] font-medium text-text-secondary mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`${inputBase} pr-9 ${formik.touched.confirmPassword && formik.errors.confirmPassword ? inputError : inputNormal}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((p) => !p)}
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    {showConfirmPassword
                      ? <EyeOff className="w-4 h-4" />
                      : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <FieldError message={formik.errors.confirmPassword} />
                )}
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={formik.isSubmitting || isLoading}
                  className="w-full py-3.5 px-6 bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-surface text-[11px] font-sans font-medium tracking-[0.2em] uppercase transition-colors duration-200 rounded-none shadow-none flex items-center justify-center gap-2"
                >
                  {isLoading ? 'Creating Account…' : 'Create Account'}
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

            {/* Google Signup UI */}
            <div>
              <GoogleLoginButton
                text="Continue with Google"
                onClick={() => {
                  console.log('Google signup clicked (UI placeholder - auth integration pending)');
                }}
              />
            </div>

            {/* Footer link */}
            <div className="mt-10 pt-7 border-t border-border">
              <p className="text-[11px] font-sans text-text-secondary">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-primary hover:text-primary-hover underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors duration-200"
                >
                  Sign in
                </Link>
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

export default Signup;
