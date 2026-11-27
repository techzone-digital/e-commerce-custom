import React from 'react';
import { ProductAvailability } from '../types/product.types';

interface AvailabilityBadgeProps {
  availability: ProductAvailability;
  className?: string;
  size?: 'sm' | 'md';
}

/**
 * Visual badge displaying availability status:
 * - Ready to Ship: Available in ready stock
 * - Made to Order: Manufactured upon order
 * - Customisable: Bespoke / customized according to requirements
 */
export const AvailabilityBadge: React.FC<AvailabilityBadgeProps> = ({
  availability,
  className = '',
  size = 'sm',
}) => {
  const sizeClasses =
    size === 'sm'
      ? 'text-[9px] sm:text-[10px] px-2 py-0.5'
      : 'text-[10px] sm:text-[11px] px-2.5 py-1';

  // Luxury-aligned semantic styling
  const styleMap: Record<ProductAvailability, string> = {
    'Ready to Ship':
      'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 dark:bg-emerald-950/90 dark:text-emerald-300 dark:border-emerald-500/40',
    'Made to Order':
      'bg-amber-950/80 text-amber-200 border border-amber-500/30 dark:bg-amber-950/90 dark:text-amber-200 dark:border-amber-500/40',
    'Customisable':
      'bg-[#2c2217]/90 text-[#e6c98c] border border-primary/40 dark:bg-[#1a1712]/95 dark:text-[#f0d499] dark:border-primary/50',
  };

  const dotColor: Record<ProductAvailability, string> = {
    'Ready to Ship': 'bg-emerald-400',
    'Made to Order': 'bg-amber-400',
    'Customisable': 'bg-primary',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 uppercase font-sans tracking-[0.14em] font-medium backdrop-blur-sm rounded-none shadow-sm ${sizeClasses} ${styleMap[availability]} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse ${dotColor[availability]}`} />
      <span>{availability}</span>
    </span>
  );
};

