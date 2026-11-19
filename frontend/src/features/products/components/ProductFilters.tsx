import React from 'react';
import { RotateCcw } from 'lucide-react';
import {
  ProductCategory,
  ProductMaterial,
  ProductAvailability,
} from '../types/product.types';
import { CATEGORIES_LIST } from '../data/mockProducts';

interface ProductFiltersProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  selectedMaterials: ProductMaterial[];
  onToggleMaterial: (material: ProductMaterial) => void;
  selectedAvailabilities: ProductAvailability[];
  onToggleAvailability: (avail: ProductAvailability) => void;
  minPrice: number;
  maxPrice: number;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  productCountPerCategory?: Record<string, number>;
}

const ALL_MATERIALS: ProductMaterial[] = ['Gold', 'Silver', 'Spadika'];
const ALL_AVAILABILITIES: ProductAvailability[] = [
  'Ready to Ship',
  'Made to Order',
  'Customisable',
];

export const ProductFilters: React.FC<ProductFiltersProps> = ({
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
  productCountPerCategory,
}) => {
  return (
    <div className="space-y-8 font-sans">
      {/* ── Clear Filters Quick Action (if any filter is applied) ─────── */}
      {hasActiveFilters && (
        <div className="pb-4 border-b border-border flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-wider text-text-secondary">
            Filters Active
          </span>
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-medium text-primary hover:text-primary-hover transition-colors duration-200"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear All</span>
          </button>
        </div>
      )}

      {/* ── 1. Category Filter ───────────────────────────────────────── */}
      <div>
        <h4 className="text-[11px] uppercase tracking-[0.22em] text-text-main font-semibold mb-3 flex items-center gap-2">
          <span>Categories</span>
        </h4>
        <ul className="space-y-1">
          {CATEGORIES_LIST.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = productCountPerCategory?.[cat];

            return (
              <li key={cat}>
                <button
                  type="button"
                  onClick={() => onSelectCategory(cat)}
                  className={`w-full text-left py-1.5 px-2 text-xs flex items-center justify-between transition-colors duration-150 ${
                    isSelected
                      ? 'text-primary font-medium bg-primary/[0.06] border-l-2 border-primary pl-2.5'
                      : 'text-text-secondary hover:text-text-main hover:bg-bg/60'
                  }`}
                >
                  <span className="truncate">{cat}</span>
                  {count !== undefined && (
                    <span className="text-[10px] text-text-secondary/60 ml-2 font-mono">
                      ({count})
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ── 2. Price Range Filter ────────────────────────────────────── */}
      <div className="pt-6 border-t border-border">
        <h4 className="text-[11px] uppercase tracking-[0.22em] text-text-main font-semibold mb-3">
          Price Range
        </h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-text-main font-serif">
            <span>₹ {priceRange[0].toLocaleString('en-IN')}</span>
            <span className="text-text-secondary font-sans text-[10px]">to</span>
            <span>₹ {priceRange[1].toLocaleString('en-IN')}</span>
          </div>

          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            step={1000}
            value={priceRange[1]}
            onChange={(e) =>
              onPriceChange([priceRange[0], Math.max(Number(e.target.value), priceRange[0] + 500)])
            }
            aria-label="Filter maximum price"
            className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
          />

          <div className="flex items-center justify-between text-[10px] text-text-secondary/70">
            <span>Min: ₹ {minPrice.toLocaleString('en-IN')}</span>
            <span>Max: ₹ {maxPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* ── 3. Material Filter ───────────────────────────────────────── */}
      <div className="pt-6 border-t border-border">
        <h4 className="text-[11px] uppercase tracking-[0.22em] text-text-main font-semibold mb-3">
          Material
        </h4>
        <div className="space-y-2">
          {ALL_MATERIALS.map((material) => {
            const isChecked = selectedMaterials.includes(material);
            return (
              <label
                key={material}
                className="flex items-center gap-2.5 cursor-pointer select-none text-xs text-text-secondary hover:text-text-main group py-0.5"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleMaterial(material)}
                  className="w-3.5 h-3.5 rounded-none border-border text-primary focus:ring-primary focus:ring-offset-0 bg-bg cursor-pointer accent-primary"
                />
                <span className={`tracking-wide ${isChecked ? 'text-text-main font-medium' : ''}`}>
                  {material}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* ── 4. Availability Filter ──────────────────────────────────── */}
      <div className="pt-6 border-t border-border">
        <h4 className="text-[11px] uppercase tracking-[0.22em] text-text-main font-semibold mb-3">
          Availability Status
        </h4>
        <div className="space-y-2">
          {ALL_AVAILABILITIES.map((avail) => {
            const isChecked = selectedAvailabilities.includes(avail);
            return (
              <label
                key={avail}
                className="flex items-center gap-2.5 cursor-pointer select-none text-xs text-text-secondary hover:text-text-main group py-0.5"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleAvailability(avail)}
                  className="w-3.5 h-3.5 rounded-none border-border text-primary focus:ring-primary focus:ring-offset-0 bg-bg cursor-pointer accent-primary"
                />
                <span className={`tracking-wide ${isChecked ? 'text-text-main font-medium' : ''}`}>
                  {avail}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

