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
        className="fixed inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-sm h-full bg-surface text-text-main shadow-2xl flex flex-col z-10 animate-slideInRight">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border/60">
          <div className="flex items-center gap-3">
            <span className="w-5 h-px bg-primary" aria-hidden="true" />
            <h3 className="font-serif text-xl font-light text-text-main tracking-wide">
              Refine
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters drawer"
            className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-text-main transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
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

        {/* Drawer Footer */}
        <div className="p-5 border-t border-border/60 bg-bg/40 flex items-center gap-3">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="flex-shrink-0 py-3 px-4 border border-border/80 text-text-secondary hover:border-primary hover:text-primary text-[10px] uppercase tracking-[0.2em] font-sans flex items-center gap-1.5 transition-colors duration-200"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-primary hover:bg-primary-hover text-white text-[10px] font-sans font-medium tracking-[0.25em] uppercase transition-colors duration-200 text-center"
          >
            View {resultCount} {resultCount === 1 ? 'Piece' : 'Pieces'}
          </button>
        </div>
      </div>
    </div>
  );
};
