import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  showLabel = false,
}) => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative inline-flex items-center justify-center p-2 rounded-full border border-border bg-surface text-text-secondary hover:text-primary transition-colors focus:outline-none focus:ring-1 focus:ring-primary ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 transition-transform duration-200" aria-hidden="true" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-200" aria-hidden="true" />
      )}
      {showLabel && (
        <span className="ml-2 text-xs uppercase tracking-wider font-medium text-text-main">
          {isDark ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
