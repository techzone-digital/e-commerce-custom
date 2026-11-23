import React from 'react';
import { SlidersHorizontal, ChevronDown, LayoutGrid, Grid3X3 } from 'lucide-react';
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
    <div className="flex flex-wrap items-center justify-between gap-3 py-4 border-b border-border/60 mb-7 font-sans">
      {/* Left: Count + mobile filter */}
      <div className="flex items-center gap-4">
        {/* Mobile Filter Button */}
        <button
          type="button"
          onClick={onOpenMobileFilter}
          className="lg:hidden inline-flex items-center gap-2 px-4 py-2 border border-border bg-surface text-text-main text-[10px] uppercase tracking-[0.2em] hover:border-primary/60 transition-colors duration-200"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-primary flex-shrink-0" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-primary text-white text-[9px] font-bold flex items-center justify-center flex-shrink-0">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Count */}
        <p className="text-xs text-text-secondary">
          <span className="font-medium text-text-main">{filteredCount}</span>
          {filteredCount !== totalCount && (
            <> of <span className="text-text-main">{totalCount}</span></>
          )}{' '}
          <span className="hidden sm:inline">pieces</span>
        </p>
      </div>

      {/* Right: Grid toggle + Sort */}
      <div className="flex items-center gap-4">
        {/* Grid column toggle */}
        {onToggleGridCols && (
          <div className="hidden xl:flex items-center gap-1 border-r border-border/60 pr-4">
            <button
              type="button"
              onClick={() => onToggleGridCols(3)}
              aria-label="3 columns view"
              aria-pressed={gridCols === 3}
              className={`p-1.5 transition-colors duration-150 ${
                gridCols === 3 ? 'text-primary' : 'text-text-secondary/50 hover:text-text-secondary'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onToggleGridCols(4)}
              aria-label="4 columns view"
              aria-pressed={gridCols === 4}
              className={`p-1.5 transition-colors duration-150 ${
                gridCols === 4 ? 'text-primary' : 'text-text-secondary/50 hover:text-text-secondary'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Sort dropdown */}
        <div className="flex items-center gap-2.5">
          <label
            htmlFor="shop-sort"
            className="text-[10px] uppercase tracking-[0.2em] text-text-secondary hidden sm:inline select-none"
          >
            Sort
          </label>
          <div className="relative">
            <select
              id="shop-sort"
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="appearance-none bg-transparent border border-border/60 py-2 pl-3 pr-8 text-xs text-text-main focus:outline-none focus:border-primary cursor-pointer tracking-wide hover:border-primary/50 transition-colors duration-150"
            >
              <option value="featured">Featured</option>
              <option value="newest">New Arrivals</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-text-secondary absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
