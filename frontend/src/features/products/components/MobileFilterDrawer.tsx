import React, { useEffect } from 'react';
import { X, RotateCcw } from 'lucide-react';
import {
  ProductCategory,
  ProductMaterial,
  ProductAvailability,
} from '../types/product.types';
import { ProductFilters } from './ProductFilters';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  selectedMaterials: ProductMaterial[];
  onToggleMaterial: (mat: ProductMaterial) => void;
  selectedAvailabilities: ProductAvailability[];
  onToggleAvailability: (avail: ProductAvailability) => void;
  minPrice: number;
  maxPrice: number;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  resultCount: number;
  productCountPerCategory?: Record<string, number>;
}

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  selectedCategory,
  onSelectCategory,
  selectedMaterials,
  onToggleMaterial,
  selectedAvailabilities,
  onToggleAvailability,
  minPrice,
  maxPrice,
  priceRange,
  onPriceChange,
  onClearFilters,
  hasActiveFilters,
  resultCount,
  productCountPerCategory,
}) => {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Product Filters"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Drawer Panel */}
      <div className="relative w-full max-w-xs sm:max-w-sm h-full bg-surface border-l border-border text-text-main shadow-2xl flex flex-col z-10 animate-slideInRight">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-lg font-light text-text-main">
              Filter Collections
            </h3>
            {hasActiveFilters && (
              <span className="text-[10px] uppercase tracking-wider text-primary font-sans font-medium">
                (Active)
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters drawer"
            className="p-1.5 rounded-full hover:bg-bg text-text-secondary hover:text-text-main transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-5 py-6">
          <ProductFilters
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
            selectedMaterials={selectedMaterials}
            onToggleMaterial={onToggleMaterial}
            selectedAvailabilities={selectedAvailabilities}
            onToggleAvailability={onToggleAvailability}
            minPrice={minPrice}
            maxPrice={maxPrice}
            priceRange={priceRange}
            onPriceChange={onPriceChange}
            onClearFilters={onClearFilters}
            hasActiveFilters={hasActiveFilters}
            productCountPerCategory={productCountPerCategory}
          />
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-border bg-bg/40 flex items-center gap-3">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="py-3 px-4 border border-border text-text-secondary hover:text-text-main hover:border-text-secondary text-[10px] uppercase tracking-wider font-sans flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-primary hover:bg-primary-hover text-surface text-[11px] font-sans font-medium tracking-[0.2em] uppercase transition-colors text-center"
          >
            Show {resultCount} {resultCount === 1 ? 'Piece' : 'Pieces'}
          </button>
        </div>
      </div>
    </div>
  );
};

