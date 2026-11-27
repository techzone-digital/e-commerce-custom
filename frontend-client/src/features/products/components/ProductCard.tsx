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
  const [isHovered, setIsHovered] = useState<boolean>(false);

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
    <article
      className="group bg-surface flex flex-col h-full transition-all duration-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-bg/60 flex-shrink-0">
        {imgError ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-bg text-text-secondary/40 text-[11px] font-sans tracking-wider uppercase p-4 text-center gap-2">
            <span className="w-8 h-px bg-border/60" />
            <span>Image unavailable</span>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            loading="lazy"
            decoding="async"
          />
        )}

        {/* Soft overlay on hover */}
        <div
          className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          aria-hidden="true"
        />

        {/* Top badges row */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 z-10">
          {/* Availability badge */}
          <AvailabilityBadge availability={product.availability} />

          {/* Wishlist button */}
          <button
            type="button"
            onClick={handleHeartClick}
            aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`w-8 h-8 flex-shrink-0 flex items-center justify-center transition-all duration-200 shadow-sm ${
              isFavorited
                ? 'bg-primary text-white border border-primary'
                : 'bg-white/90 backdrop-blur-sm text-text-secondary border border-white/60 hover:border-primary/50 hover:text-primary'
            }`}
          >
            <Heart
              className="w-3.5 h-3.5 transition-transform active:scale-110"
              strokeWidth={1.75}
              fill={isFavorited ? 'currentColor' : 'none'}
            />
          </button>
        </div>

        {/* New/Featured badges (bottom-left corner) */}
        {product.isNew && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="text-[9px] uppercase tracking-[0.2em] font-sans font-medium px-2 py-1 bg-text-main/90 text-bg backdrop-blur-sm">
              New
            </span>
          </div>
        )}

        {/* Quick View - revealed on hover */}
        <div
          className={`absolute inset-x-0 bottom-0 z-10 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 sm:opacity-0 sm:translate-y-1'
          }`}
        >
          {/* Always show on mobile (no hover), reveal on desktop hover */}
          <div className="sm:opacity-0 sm:group-hover:opacity-100 sm:translate-y-0 transition-all duration-300">
            <button
              type="button"
              onClick={handleQuickViewClick}
              className="w-full py-3 px-4 bg-white/95 dark:bg-surface/95 hover:bg-primary hover:text-white text-text-main text-[10px] uppercase font-sans font-medium tracking-[0.2em] transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <Eye className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Quick View</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 gap-2.5">
        {/* Category tag */}
        <span className="text-[9px] uppercase tracking-[0.25em] text-primary/80 font-sans font-medium">
          {product.category}
        </span>

        {/* Product Name */}
        <h3 className="font-serif text-sm sm:text-base text-text-main font-light leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200 flex-1">
          {product.name}
        </h3>

        {/* Price row */}
        <div className="flex items-baseline justify-between gap-2 pt-2 border-t border-border/50">
          <p className="font-serif text-base sm:text-lg text-text-main font-normal tracking-wide">
            ₹{product.price.toLocaleString('en-IN')}
          </p>
          <span className="text-[9px] uppercase tracking-wider text-text-secondary/50 font-sans flex-shrink-0">
            Incl. tax
          </span>
        </div>
      </div>
    </article>
  );
};
