import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface ShopHeaderProps {
  totalCount: number;
}

export const ShopHeader: React.FC<ShopHeaderProps> = ({ totalCount }) => {
  return (
    <section className="relative overflow-hidden bg-bg pt-8 pb-12 sm:pb-16 border-b border-border/60">
      {/* Subtle decorative element */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.03] pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 200 200" fill="currentColor" className="text-primary w-full h-full">
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1"/>
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-[10px] uppercase font-sans tracking-[0.22em] text-text-secondary">
            <li>
              <Link to="/" className="hover:text-primary transition-colors duration-200">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="w-3 h-3 text-border" />
            </li>
            <li className="text-primary font-medium" aria-current="page">
              Collections
            </li>
          </ol>
        </nav>

        {/* Editorial Header Layout */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="max-w-2xl">
            {/* Eyebrow label */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-primary" aria-hidden="true" />
              <span className="text-[10px] uppercase tracking-[0.35em] text-primary font-sans font-medium">
                Shivam Crafts
              </span>
            </div>

            {/* Main heading */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-text-main font-light leading-[1.1] tracking-tight mb-4">
              Our Collections
            </h1>

            {/* Subtitle */}
            <p className="font-sans text-sm text-text-secondary leading-relaxed max-w-lg">
              Each piece handcrafted by master artisans — blending sacred Indian heritage with refined contemporary aesthetics.
            </p>
          </div>

          {/* Catalogue count - right aligned */}
          <div className="flex flex-col items-start sm:items-end gap-1 flex-shrink-0">
            <span className="font-serif text-3xl sm:text-4xl text-text-main font-light">{totalCount}</span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-text-secondary font-sans">Distinct Designs</span>
          </div>
        </div>
      </div>
    </section>
  );
};
