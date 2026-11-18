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
      className="w-full border-b border-border/80 overflow-x-auto scrollbar-none"
    >
      <div className="flex items-center gap-1 sm:gap-2 min-w-max pb-px">
        {CATEGORIES_LIST.map((category) => {
          const isActive = activeCategory === category;
          const count = productCountPerCategory?.[category];

          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelectCategory(category)}
              className={`relative px-4 sm:px-5 py-3 text-xs uppercase tracking-[0.18em] font-sans transition-all duration-200 whitespace-nowrap flex items-center gap-2 ${
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-text-secondary hover:text-text-main font-normal'
              }`}
            >
              <span>{category}</span>
              {count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-primary/15 text-primary'
                      : 'bg-border/60 text-text-secondary/70'
                  }`}
                >
                  {count}
                </span>
              )}

              {/* Active Indicator Line */}
              {isActive && (
                <span
                  className="absolute bottom-0 inset-x-2 h-[2px] bg-primary animate-fadeIn"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

