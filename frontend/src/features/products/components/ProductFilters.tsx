import React from 'react';
import { X } from 'lucide-react';
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

const FilterSectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h4 className="text-[10px] uppercase tracking-[0.28em] text-text-secondary font-sans font-semibold mb-3">
    {children}
  </h4>
);

const Divider = () => <div className="h-px bg-border/60 my-6" />;

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
    <div className="font-sans">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-lg font-light text-text-main">Refine</h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-text-secondary hover:text-primary transition-colors duration-200"
          >
            <X className="w-3 h-3" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* 1. Category Filter */}
      <div>
        <FilterSectionLabel>Category</FilterSectionLabel>
        <ul className="space-y-0.5">
          {CATEGORIES_LIST.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = productCountPerCategory?.[cat];

            return (
              <li key={cat}>
                <button
                  type="button"
                  onClick={() => onSelectCategory(cat)}
                  className={`w-full text-left py-2 px-3 text-xs flex items-center justify-between transition-all duration-150 group ${
                    isSelected
                      ? 'text-text-main bg-primary/[0.08] border-l-[1.5px] border-primary font-medium'
                      : 'text-text-secondary hover:text-text-main hover:bg-bg/70 border-l-[1.5px] border-transparent'
                  }`}
                >
                  <span className="truncate">{cat}</span>
                  {count !== undefined && (
                    <span className={`text-[10px] ml-2 tabular-nums flex-shrink-0 ${isSelected ? 'text-primary' : 'text-text-secondary/50'}`}>
                      {count}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <Divider />

      {/* 2. Price Range Filter */}
      <div>
        <FilterSectionLabel>Price Range</FilterSectionLabel>
        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-sm text-text-main">
              ₹{priceRange[0].toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-text-secondary/60 font-sans">—</span>
            <span className="font-serif text-sm text-text-main">
              ₹{priceRange[1].toLocaleString('en-IN')}
            </span>
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
            className="w-full h-[2px] bg-border appearance-none cursor-pointer accent-primary focus:outline-none"
            style={{ accentColor: 'var(--color-primary)' }}
          />

          <div className="flex justify-between text-[10px] text-text-secondary/50">
            <span>₹{minPrice.toLocaleString('en-IN')}</span>
            <span>₹{maxPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      <Divider />

      {/* 3. Material Filter */}
      <div>
        <FilterSectionLabel>Material</FilterSectionLabel>
        <div className="space-y-1">
          {ALL_MATERIALS.map((material) => {
            const isChecked = selectedMaterials.includes(material);
            return (
              <label
                key={material}
                className="flex items-center gap-3 py-1.5 cursor-pointer select-none group"
              >
                {/* Custom checkbox */}
                <span
                  className={`w-4 h-4 flex-shrink-0 border flex items-center justify-center transition-all duration-150 ${
                    isChecked
                      ? 'bg-primary border-primary'
                      : 'border-border/80 group-hover:border-primary/50'
                  }`}
                >
                  {isChecked && (
                    <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleMaterial(material)}
                  className="sr-only"
                />
                <span className={`text-xs tracking-wide transition-colors duration-150 ${
                  isChecked ? 'text-text-main' : 'text-text-secondary group-hover:text-text-main'
                }`}>
                  {material}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <Divider />

      {/* 4. Availability Filter */}
      <div>
        <FilterSectionLabel>Availability</FilterSectionLabel>
        <div className="space-y-1">
          {ALL_AVAILABILITIES.map((avail) => {
            const isChecked = selectedAvailabilities.includes(avail);
            return (
              <label
                key={avail}
                className="flex items-center gap-3 py-1.5 cursor-pointer select-none group"
              >
                <span
                  className={`w-4 h-4 flex-shrink-0 border flex items-center justify-center transition-all duration-150 ${
                    isChecked
                      ? 'bg-primary border-primary'
                      : 'border-border/80 group-hover:border-primary/50'
                  }`}
                >
                  {isChecked && (
                    <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
                      <path d="M1.5 5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleAvailability(avail)}
                  className="sr-only"
                />
                <span className={`text-xs tracking-wide transition-colors duration-150 ${
                  isChecked ? 'text-text-main' : 'text-text-secondary group-hover:text-text-main'
                }`}>
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
