import React, { useState } from 'react';
import { Heart, Eye } from 'lucide-react';
import { Product } from '../types/product.types';
import { AvailabilityBadge } from './AvailabilityBadge';

export interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  onToggleWishlist?: (productId: string) => void;
  isWishlisted?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onToggleWishlist,
  isWishlisted: externalWishlisted,
}) => {
  const [internalWishlist, setInternalWishlist] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);

  const isFavorited =
    externalWishlisted !== undefined ? externalWishlisted : internalWishlist;

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(product.id);
    } else {
      setInternalWishlist((prev) => !prev);
    }
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <article className="group bg-surface border border-border flex flex-col h-full transition-all duration-300 hover:border-primary/50 hover:shadow-md">
      {/* ── Visual Media Container ──────────────────────────────────── */}
      <div className="relative aspect-square w-full overflow-hidden bg-bg/50">
        {imgError ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-bg text-text-secondary/50 text-xs font-sans p-4 text-center">
            <span>Image currently unavailable</span>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        )}

        {/* Top-Left: Availability status badge */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <AvailabilityBadge availability={product.availability} />
        </div>

        {/* Top-Right: Wishlist Button */}
        <button
          type="button"
          onClick={handleHeartClick}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 sm:w-9 sm:h-9 border flex items-center justify-center transition-colors duration-200 ${
            isFavorited
              ? 'bg-primary border-primary text-surface'
              : 'bg-surface/85 backdrop-blur-sm border-border text-text-secondary hover:border-primary hover:text-primary'
          }`}
        >
          <Heart
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform active:scale-125"
            strokeWidth={1.75}
            fill={isFavorited ? 'currentColor' : 'none'}
          />
        </button>

        {/* Desktop Quick View Reveal on Hover & Mobile always-reachable bar */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-2 sm:p-2.5 bg-gradient-to-t from-black/60 to-transparent sm:bg-none sm:opacity-0 sm:group-hover:opacity-100 sm:translate-y-2 sm:group-hover:translate-y-0 transition-all duration-300">
          <button
            type="button"
            onClick={handleQuickViewClick}
            className="w-full py-2.5 px-3 bg-surface/95 dark:bg-[#1a1712]/95 hover:bg-primary hover:text-surface text-text-main border border-border hover:border-primary text-[10px] sm:text-[11px] uppercase font-sans font-medium tracking-[0.18em] transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* ── Product Meta & Details ──────────────────────────────────── */}
      <div className="p-3.5 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Category & Material tags */}
          <div className="flex items-center justify-between gap-2 mb-1.5 text-[10px] uppercase font-sans tracking-[0.2em]">
            <span className="text-primary font-medium truncate">{product.category}</span>
            <span className="text-text-secondary/70 flex-shrink-0">{product.material}</span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-sm sm:text-base md:text-lg text-text-main font-light leading-snug line-clamp-2 transition-colors duration-200 group-hover:text-primary">
            {product.name}
          </h3>
        </div>

        {/* Pricing & Subtle Divider */}
        <div className="pt-2 border-t border-border/60 flex items-baseline justify-between gap-2">
          <p className="font-serif text-base sm:text-lg text-text-main font-normal tracking-wide">
            ₹ {product.price.toLocaleString('en-IN')}
          </p>
          <span className="text-[9px] uppercase tracking-wider text-text-secondary/60 font-sans">
            Tax incl.
          </span>
        </div>
      </div>
    </article>
  );
};

