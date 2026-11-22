import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, AlertCircle, CheckCircle2, RotateCw, Mail } from 'lucide-react';
import { ThemeToggle } from '../../components/common';

const RESEND_INTERVAL_SECONDS = 45;

export const VerifyOtp: React.FC = () => {
  const location = useLocation();

  // Retrieve email from navigation state or fallback
  const navigationEmail = (location.state as { email?: string } | null)?.email || '';

  // State for 6 OTP digits
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer & state for Resend OTP
  const [secondsLeft, setSecondsLeft] = useState<number>(RESEND_INTERVAL_SECONDS);
  const [isResending, setIsResending] = useState<boolean>(false);

  // Success / error / verification status messages
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | 'info';
    text: string;
  } | null>(null);

  // Countdown timer effect
  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  // Autofocus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only accept numeric digits
    const cleanedVal = value.replace(/\D/g, '');

    if (!cleanedVal) {
      // If cleared
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      return;
    }

    // If multiple digits entered or pasted into a single box
    if (cleanedVal.length > 1) {
      handlePastedDigits(cleanedVal, index);
      return;
    }

    const singleDigit = cleanedVal.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = singleDigit;
    setOtp(newOtp);

    // Auto-advance focus to next input
    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Current input is already empty, move to previous and clear it
        inputRefs.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePastedDigits = (pastedData: string, startIndex = 0) => {
    const digitsOnly = pastedData.replace(/\D/g, '').slice(0, 6);
    if (!digitsOnly) return;

    const newOtp = [...otp];
    for (let i = 0; i < digitsOnly.length; i++) {
      if (startIndex + i < 6) {
        newOtp[startIndex + i] = digitsOnly[i];
      }
    }
    setOtp(newOtp);

    // Focus on next available empty field or the last filled field
    const nextIndex = Math.min(startIndex + digitsOnly.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text');
    handlePastedDigits(pasted, index);
  };

  const isOtpComplete = otp.every((digit) => digit.trim() !== '');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOtpComplete) return;

    const fullCode = otp.join('');

    // Frontend-only temporary simulation indicating backend is not yet connected
    setStatusMessage({
      type: 'info',
      text: `Entered code: ${fullCode}. Frontend verification UI ready! Backend OTP verification endpoint is not connected yet.`,
    });
  };

  const handleResend = () => {
    if (secondsLeft > 0 || isResending) return;

    setIsResending(true);
    setStatusMessage(null);

    // Simulate resend locally with UI feedback
    setTimeout(() => {
      setSecondsLeft(RESEND_INTERVAL_SECONDS);
      setIsResending(false);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      setStatusMessage({
        type: 'success',
        text: 'A new 6-digit verification code has been resent (simulated locally).',
      });
    }, 600);
  };

  return (
    <div className="min-h-screen flex bg-bg text-text-main transition-colors duration-200">
      {/* ── LEFT: Editorial image panel (desktop only) ───────────────────── */}
      <aside
        className="hidden lg:flex lg:w-[45%] xl:w-[42%] relative flex-col overflow-hidden"
        aria-hidden="true"
      >
        <img
          src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&q=85&auto=format&fit=crop"
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
            to="/signup"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-200 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            Back to Signup
          </Link>
        </div>

        {/* Bottom editorial copy */}
        <div className="relative z-10 mt-auto p-10 pb-12">
          <div className="w-8 h-px bg-primary mb-6" />
          <p className="text-[10px] uppercase tracking-[0.25em] text-primary/80 mb-3 font-sans">
            Account Security
          </p>
          <h2 className="font-serif text-3xl xl:text-4xl font-light italic text-white leading-snug mb-4">
            Protecting What Matters,<br />With Utmost Elegance.
          </h2>
          <p className="text-xs font-sans text-white/60 leading-relaxed max-w-xs">
            Confirm your email address to secure your jewellery account and access curated collections.
          </p>
        </div>

        {/* Right-edge vertical rule */}
        <div className="absolute top-0 right-0 h-full w-px bg-border/30" />
      </aside>

      {/* ── RIGHT: Form column ───────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        {/* Top bar — mobile back link + theme toggle */}
        <div className="flex items-center justify-between px-6 sm:px-10 lg:px-14 pt-7 pb-2">
          {/* Mobile-only back to signup link */}
          <Link
            to="/signup"
            className="inline-flex lg:hidden items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-text-secondary hover:text-primary transition-colors duration-200 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            Back to Signup
          </Link>
          {/* Spacer on desktop so toggle floats right */}
          <span className="hidden lg:block" aria-hidden="true" />
          <ThemeToggle />
        </div>

        {/* OTP Form wrapper — vertically centred */}
        <div className="flex-1 flex items-center justify-center px-6 sm:px-10 lg:px-16 xl:px-24 py-10">
          <div className="w-full max-w-md">
            {/* Header info */}
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-sans mb-3">
                Security Verification
              </p>
              <h1 className="font-serif text-[2.4rem] sm:text-[2.6rem] leading-tight font-light italic text-text-main mb-3">
                Verify Your Email
              </h1>
              <p className="text-xs font-sans text-text-secondary leading-relaxed">
                We've sent a 6-digit verification code to your email address.
              </p>
              {navigationEmail && (
                <div className="mt-3 inline-flex items-center gap-2 py-1.5 px-3 bg-primary/10 border border-primary/20 text-xs font-medium text-text-main rounded-none">
                  <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="font-mono text-[11px] sm:text-xs tracking-tight truncate max-w-[260px] sm:max-w-xs">
                    {navigationEmail}
                  </span>
                </div>
              )}
            </div>

            {/* Status / Feedback Banner */}
            {statusMessage && (
              <div
                role="status"
                className={`mb-6 p-3.5 text-xs flex items-start gap-2.5 border ${
                  statusMessage.type === 'error'
                    ? 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400'
                    : statusMessage.type === 'success'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                    : 'bg-primary/10 border-primary/30 text-text-main'
                }`}
              >
                {statusMessage.type === 'error' ? (
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                )}
                <span className="leading-relaxed">{statusMessage.text}</span>
              </div>
            )}

            {/* OTP Form */}
            <form onSubmit={handleVerify} noValidate className="space-y-8">
              {/* 6 Digit Inputs */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.18em] font-medium text-text-secondary mb-3">
                  Verification Code
                </label>
                <div className="flex items-center justify-between gap-2 sm:gap-3">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (inputRefs.current[idx] = el)}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      onPaste={(e) => handlePaste(e, idx)}
                      aria-label={`Digit ${idx + 1} of 6`}
                      className="w-11 h-13 sm:w-13 sm:h-14 text-center font-serif text-2xl font-normal bg-transparent border border-border focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all duration-200 text-text-main"
                    />
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={!isOtpComplete}
                  className="w-full py-3.5 px-6 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-surface text-[11px] font-sans font-medium tracking-[0.2em] uppercase transition-colors duration-200 rounded-none shadow-none flex items-center justify-center gap-2"
                >
                  Verify Email
                </button>
              </div>

              {/* Resend Section & Countdown Timer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs font-sans text-text-secondary">
                <span>
                  Didn't receive the code?
                </span>

                <div className="flex items-center gap-2">
                  {secondsLeft > 0 ? (
                    <span className="text-[11px] font-mono tracking-wide text-primary">
                      Resend in {secondsLeft}s
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={isResending}
                      className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] font-medium text-primary hover:text-primary-hover transition-colors underline underline-offset-4 decoration-primary/40 hover:decoration-primary disabled:opacity-50"
                    >
                      {isResending ? (
                        <>
                          <RotateCw className="w-3.5 h-3.5 animate-spin" />
                          Sending…
                        </>
                      ) : (
                        'Resend OTP'
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>

            {/* Back to Signup link */}
            <div className="mt-10 pt-7 border-t border-border flex items-center justify-between">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 text-[11px] font-sans text-text-secondary hover:text-primary transition-colors duration-200 group"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                Back to Signup
              </Link>

              <Link
                to="/login"
                className="text-[11px] font-sans text-primary hover:text-primary-hover underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors duration-200"
              >
                Sign In Instead
              </Link>
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

export default VerifyOtp;
