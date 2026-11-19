import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { ThemeToggle } from '../../../../components/common';
import { adminSignupValidationSchema } from '../validation/adminSignup.validation';

interface AdminSignupFormValues {
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

export const AdminSignup: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const formik = useFormik<AdminSignupFormValues>({
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: adminSignupValidationSchema,
    onSubmit: (values) => {
      // UI-only: no backend authentication in this task
      console.log('Admin signup form submitted:', values);
    },
  });

  return (
    <div className="min-h-screen flex bg-bg text-text-main transition-colors duration-200">

      {/* ── LEFT: Editorial image panel (desktop only) ───────────────────── */}
      <aside
        className="hidden lg:flex lg:w-[45%] xl:w-[42%] relative flex-col overflow-hidden"
        aria-hidden="true"
      >
        {/* Photo — different focal crop from Login for visual distinction */}
        <img
          src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1200&q=85&auto=format&fit=crop"
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
            Admin Portal
          </p>
          <h2 className="font-serif text-3xl xl:text-4xl font-light italic text-white leading-snug mb-4">
            Every detail tells<br />a story of refinement.
          </h2>
          <p className="text-xs font-sans text-white/50 leading-relaxed max-w-xs">
            Admin registration is by invitation. Your request will be reviewed by an authorised administrator.
          </p>
        </div>

        {/* Right-edge vertical rule */}
        <div className="absolute top-0 right-0 h-full w-px bg-border/30" />
      </aside>

      {/* ── RIGHT: Form column ───────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">

        {/* Top bar */}
        <div className="flex items-center justify-between px-6 sm:px-10 lg:px-14 pt-7 pb-2">
          <Link
            to="/"
            className="inline-flex lg:hidden items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-text-secondary hover:text-primary transition-colors duration-200 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            Home
          </Link>
          <span className="hidden lg:block" aria-hidden="true" />
          <ThemeToggle />
        </div>

        {/* Form wrapper */}
        <div className="flex-1 flex items-center justify-center px-6 sm:px-10 lg:px-16 xl:px-24 py-10">
          <div className="w-full max-w-sm">

            {/* Page heading */}
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-sans mb-3">
                Admin Portal
              </p>
              <h1 className="font-serif text-[2.6rem] leading-tight font-light italic text-text-main mb-2">
                Request Access
              </h1>
              <p className="text-xs font-sans text-text-secondary leading-relaxed">
                Complete the form below to submit your administrator access request.
              </p>
            </div>

            {/* Invitation-only notice — refined editorial style */}
            <div className="mb-8 pl-4 border-l-2 border-primary/50">
              <p className="text-[11px] font-sans text-text-secondary leading-relaxed">
                <span className="text-text-main font-medium">Invitation only.</span>{' '}
                Admin accounts require prior authorisation from an existing administrator. Requests without a valid invitation will not be approved.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={formik.handleSubmit} noValidate className="space-y-7">

              {/* Full Name */}
              <div>
                <label
                  htmlFor="admin-signup-fullName"
                  className="block text-[10px] uppercase tracking-[0.18em] font-medium text-text-secondary mb-2"
                >
                  Full Name
                </label>
                <input
                  id="admin-signup-fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. Arjun Sharma"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${inputBase} ${formik.touched.fullName && formik.errors.fullName ? inputError : inputNormal}`}
                />
                {formik.touched.fullName && formik.errors.fullName && (
                  <FieldError message={formik.errors.fullName} />
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="admin-signup-email"
                  className="block text-[10px] uppercase tracking-[0.18em] font-medium text-text-secondary mb-2"
                >
                  Email Address
                </label>
                <input
                  id="admin-signup-email"
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

              {/* Phone */}
              <div>
                <label
                  htmlFor="admin-signup-phone"
                  className="block text-[10px] uppercase tracking-[0.18em] font-medium text-text-secondary mb-2"
                >
                  Phone Number
                </label>
                <input
                  id="admin-signup-phone"
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
                  htmlFor="admin-signup-password"
                  className="block text-[10px] uppercase tracking-[0.18em] font-medium text-text-secondary mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="admin-signup-password"
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
                  htmlFor="admin-signup-confirmPassword"
                  className="block text-[10px] uppercase tracking-[0.18em] font-medium text-text-secondary mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="admin-signup-confirmPassword"
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
                  disabled={formik.isSubmitting}
                  className="w-full py-3.5 px-6 bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-surface text-[11px] font-sans font-medium tracking-[0.2em] uppercase transition-colors duration-200 rounded-none"
                >
                  {formik.isSubmitting ? 'Submitting…' : 'Create Account'}
                </button>
              </div>
            </form>

            {/* Footer link */}
            <div className="mt-10 pt-7 border-t border-border">
              <p className="text-[11px] font-sans text-text-secondary">
                Already have an admin account?{' '}
                <Link
                  to="/admin/login"
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

export default AdminSignup;
