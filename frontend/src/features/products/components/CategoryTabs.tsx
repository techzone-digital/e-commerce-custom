import React from 'react';
import { ProductCategory } from '../types/product.types';
import { CATEGORIES_LIST } from '../data/mockProducts';

interface CategoryTabsProps {
  activeCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  productCountPerCategory?: Record<string, number>;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  onSelectCategory,
  productCountPerCategory,
}) => {
  return (
    <nav
      aria-label="Jewellery Categories"
      className="w-full overflow-x-auto scrollbar-none border-b border-border/60"
    >
      <div className="flex items-stretch min-w-max">
        {CATEGORIES_LIST.map((category) => {
          const isActive = activeCategory === category;
          const count = productCountPerCategory?.[category];

          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelectCategory(category)}
              className={`relative group px-5 sm:px-6 py-4 flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-200 focus:outline-none ${
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-text-secondary hover:text-text-main font-normal'
              }`}
            >
              <span>{category}</span>
              {count !== undefined && (
                <span
                  className={`text-[9px] font-normal tabular-nums transition-colors duration-200 ${
                    isActive
                      ? 'text-primary'
                      : 'text-text-secondary/50 group-hover:text-text-secondary'
                  }`}
                >
                  ({count})
                </span>
              )}

              {/* Active indicator */}
              <span
                className={`absolute bottom-0 left-0 right-0 h-[2px] bg-primary transition-all duration-300 ${
                  isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                } origin-left`}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
};
