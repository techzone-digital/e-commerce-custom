import React from 'react';
import { SlidersHorizontal, ChevronDown, Grid3X3, LayoutGrid } from 'lucide-react';
import { SortOption } from '../types/product.types';

interface SortAndFilterBarProps {
  totalCount: number;
  filteredCount: number;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  onOpenMobileFilter: () => void;
  activeFilterCount: number;
  gridCols?: 3 | 4;
  onToggleGridCols?: (cols: 3 | 4) => void;
}

export const SortAndFilterBar: React.FC<SortAndFilterBarProps> = ({
  totalCount,
  filteredCount,
  sort,
  onSortChange,
  onOpenMobileFilter,
  activeFilterCount,
  gridCols = 3,
  onToggleGridCols,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-border mb-6 font-sans">
      {/* ── Left: Result Count & Mobile Filter Trigger ────────────── */}
      <div className="flex items-center gap-3">
        {/* Mobile Filter Button */}
        <button
          type="button"
          onClick={onOpenMobileFilter}
          className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 border border-border bg-surface text-text-main text-xs uppercase tracking-wider hover:border-primary transition-colors duration-200"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-primary" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-primary text-surface text-[10px] font-bold flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Product Count */}
        <p className="text-xs text-text-secondary tracking-wide">
          Showing <span className="font-medium text-text-main">{filteredCount}</span>
          {filteredCount !== totalCount && (
            <> of <span className="text-text-main">{totalCount}</span></>
          )}{' '}
          pieces
        </p>
      </div>

      {/* ── Right: Sorting Dropdown & Grid View Toggle ────────────── */}
      <div className="flex items-center gap-4">
        {/* Desktop View Switcher (3 or 4 columns) */}
        {onToggleGridCols && (
          <div className="hidden xl:flex items-center gap-1 border-r border-border pr-4">
            <button
              type="button"
              onClick={() => onToggleGridCols(3)}
              aria-label="3 columns view"
              className={`p-1.5 transition-colors ${
                gridCols === 3
                  ? 'text-primary bg-primary/10'
                  : 'text-text-secondary hover:text-text-main'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onToggleGridCols(4)}
              aria-label="4 columns view"
              className={`p-1.5 transition-colors ${
                gridCols === 4
                  ? 'text-primary bg-primary/10'
                  : 'text-text-secondary hover:text-text-main'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="shop-sort"
            className="text-[11px] uppercase tracking-wider text-text-secondary hidden sm:inline"
          >
            Sort by:
          </label>
          <div className="relative">
            <select
              id="shop-sort"
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="appearance-none bg-surface border border-border py-1.5 pl-3 pr-8 text-xs text-text-main rounded-none focus:outline-none focus:border-primary cursor-pointer tracking-wide"
            >
              <option value="featured">Featured Pieces</option>
              <option value="newest">New Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-text-secondary absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

