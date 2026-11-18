import React from 'react';
import { X, CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { Product } from '../types/product.types';
import { AvailabilityBadge } from './AvailabilityBadge';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onToggleWishlist?: (productId: string) => void;
  isWishlisted?: boolean;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
}) => {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
    >
      {/* Backdrop click dismiss */}
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl bg-surface border border-border text-text-main shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-surface/80 hover:bg-surface border border-border text-text-secondary hover:text-text-main transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Visual */}
        <div className="w-full md:w-1/2 relative bg-bg/50 min-h-[280px] md:min-h-[420px] flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <AvailabilityBadge availability={product.availability} size="md" />
          </div>
        </div>

        {/* Product Information */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
          {/* Category & Status */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-primary">
              {product.category}
            </span>
            <span className="text-[10px] uppercase font-sans tracking-widest text-text-secondary">
              {product.material}
            </span>
          </div>

          {/* Heading */}
          <h2
            id="quick-view-title"
            className="font-serif text-2xl md:text-3xl font-light text-text-main leading-snug mb-3"
          >
            {product.name}
          </h2>

          {/* Price */}
          <div className="mb-4 pb-4 border-b border-border">
            <span className="text-xl sm:text-2xl font-serif text-text-main">
              ₹ {product.price.toLocaleString('en-IN')}
            </span>
            <span className="ml-2 text-[10px] uppercase tracking-wider text-text-secondary font-sans">
              (Incl. of all taxes)
            </span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm font-sans text-text-secondary leading-relaxed mb-6">
            {product.description ||
              'A magnificent testament to traditional craftsmanship, sculpted with devoted attention to detail and designed for timeless grace.'}
          </p>

          {/* Specifications / Highlights */}
          {product.details && (
            <div className="space-y-2 mb-6 p-3.5 bg-bg/60 border border-border text-xs font-sans">
              {product.details.metalPurity && (
                <div className="flex justify-between text-text-secondary">
                  <span>Purity / Metal:</span>
                  <span className="font-medium text-text-main">{product.details.metalPurity}</span>
                </div>
              )}
              {product.details.weightApprox && (
                <div className="flex justify-between text-text-secondary">
                  <span>Approx Weight:</span>
                  <span className="font-medium text-text-main">{product.details.weightApprox}</span>
                </div>
              )}
              {product.details.gemstone && (
                <div className="flex justify-between text-text-secondary">
                  <span>Gemstone:</span>
                  <span className="font-medium text-text-main">{product.details.gemstone}</span>
                </div>
              )}
              {product.details.dimensions && (
                <div className="flex justify-between text-text-secondary">
                  <span>Dimensions / Size:</span>
                  <span className="font-medium text-text-main">{product.details.dimensions}</span>
                </div>
              )}
            </div>
          )}

          {/* Availability notes */}
          <div className="mt-auto pt-4 border-t border-border flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[11px] text-text-secondary">
              {product.availability === 'Ready to Ship' && (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Available in ready stock. Dispatched promptly.</span>
                </>
              )}
              {product.availability === 'Made to Order' && (
                <>
                  <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Manufactured specifically upon placement of order.</span>
                </>
              )}
              {product.availability === 'Customisable' && (
                <>
                  <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Personalised to your exact size, metal purity, or design specs.</span>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 px-6 bg-primary hover:bg-primary-hover text-surface text-[11px] font-sans font-medium tracking-[0.2em] uppercase transition-colors duration-200 text-center"
            >
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

