import React from 'react';
import { RotateCcw } from 'lucide-react';

interface EmptyProductStateProps {
  onClearFilters: () => void;
}

export const EmptyProductState: React.FC<EmptyProductStateProps> = ({
  onClearFilters,
}) => {
  return (
    <div className="py-20 sm:py-28 px-4 text-center">
      {/* Decorative diamond */}
      <div className="flex justify-center mb-6" aria-hidden="true">
        <div className="w-12 h-12 rotate-45 border border-border/60 flex items-center justify-center">
          <div className="w-5 h-5 rotate-0 border border-primary/40" />
        </div>
      </div>

      <h3 className="font-serif text-2xl sm:text-3xl font-light text-text-main mb-3">
        No Pieces Found
      </h3>
      <p className="font-sans text-sm text-text-secondary max-w-sm mx-auto leading-relaxed mb-8">
        No jewellery matched your current filters. Try broadening your search or clearing all filters to explore the full collection.
      </p>
      <button
        type="button"
        onClick={onClearFilters}
        className="inline-flex items-center gap-2.5 py-3 px-7 border border-primary text-primary hover:bg-primary hover:text-white text-[10px] font-sans font-medium tracking-[0.25em] uppercase transition-all duration-200"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Clear All Filters</span>
      </button>
    </div>
  );
};
