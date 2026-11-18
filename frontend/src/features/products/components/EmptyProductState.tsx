import React from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';

interface EmptyProductStateProps {
  onClearFilters: () => void;
}

export const EmptyProductState: React.FC<EmptyProductStateProps> = ({
  onClearFilters,
}) => {
  return (
    <div className="py-16 sm:py-24 px-4 text-center border border-dashed border-border bg-surface/50 rounded-none">
      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
        <Sparkles className="w-5 h-5" />
      </div>
      <h3 className="font-serif text-2xl font-light text-text-main mb-2">
        No Matching Jewellery Pieces
      </h3>
      <p className="text-xs font-sans text-text-secondary max-w-sm mx-auto leading-relaxed mb-6">
        We couldn't find any designs matching your exact filter selections. Try adjusting the price range, material, or category.
      </p>
      <button
        type="button"
        onClick={onClearFilters}
        className="inline-flex items-center gap-2 py-3 px-6 bg-primary hover:bg-primary-hover text-surface text-[11px] font-sans font-medium tracking-[0.2em] uppercase transition-colors duration-200"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Clear All Filters</span>
      </button>
    </div>
  );
};

