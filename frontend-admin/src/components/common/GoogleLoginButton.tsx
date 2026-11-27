import React, { useState } from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { env } from '@/config/env';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { googleLoginThunk } from '@/features/auth/slices/authSlice';

/**
 * Official Google 'G' icon in SVG format.
 * Follows Google's official brand guidelines with the 4 distinctive colors.
 */
export const GoogleIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </svg>
);

export interface GoogleLoginButtonProps {
  onClick?: () => void;
  text?: string;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * Reusable Google Login/Signup Button.
 * Styled to fit the minimal, elegant, luxury jewellery design language
 * (sharp edges, refined borders, muted hover transitions, uppercase tracking).
 */
export const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  onClick,
  text = 'Continue with Google',
  isLoading = false,
  disabled = false,
  className = '',
}) => {
  const dispatch = useAppDispatch();
  const { isLoading: authLoading } = useAppSelector((state) => state.auth);
  const [localError, setLocalError] = useState<string | null>(null);

  const effectiveLoading = isLoading || authLoading;

  if (!env.googleClientId) {
    return (
      <div className="w-full">
        <button
          type="button"
          onClick={onClick}
          disabled
          title="Google Sign-In is not configured"
          className={`
            w-full relative flex items-center justify-center gap-3 py-3 px-6
            border border-border bg-surface text-text-main
            text-[11px] font-sans font-medium tracking-[0.16em] uppercase
            opacity-50 cursor-not-allowed rounded-none shadow-none select-none
            ${className}
          `}
        >
          <GoogleIcon className="w-4 h-4 flex-shrink-0" />
          <span>{text}</span>
        </button>
      </div>
    );
  }

  const handleSuccess = (credentialResponse: CredentialResponse) => {
    setLocalError(null);
    if (!credentialResponse.credential) {
      setLocalError('Google sign-in did not return a valid credential. Please try again.');
      return;
    }
    dispatch(googleLoginThunk({ idToken: credentialResponse.credential }));
  };

  const handleError = () => {
    setLocalError('Google sign-in was cancelled or failed. Please try again.');
  };

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      {effectiveLoading || disabled ? (
        <button
          type="button"
          disabled
          className="w-full relative flex items-center justify-center gap-3 py-3 px-6 border border-border bg-surface text-text-main text-[11px] font-sans font-medium tracking-[0.16em] uppercase opacity-50 cursor-not-allowed rounded-none shadow-none select-none"
        >
          <span className="inline-block w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <span>{text}</span>
        </button>
      ) : (
        <div className="w-full flex justify-center">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            text="continue_with"
            shape="rectangular"
            size="large"
            width="100%"
          />
        </div>
      )}
      {localError && (
        <p className="mt-2 text-xs text-red-500 font-sans text-center">{localError}</p>
      )}
    </div>
  );
};

