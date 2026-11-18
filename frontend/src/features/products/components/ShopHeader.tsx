import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface ShopHeaderProps {
  totalCount: number;
}

export const ShopHeader: React.FC<ShopHeaderProps> = ({ totalCount }) => {
  return (
    <section className="relative pt-6 pb-10 sm:pb-12 border-b border-border/80 bg-gradient-to-b from-bg/80 to-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Breadcrumb ────────────────────────────────────────────── */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center space-x-2 text-[10px] uppercase font-sans tracking-[0.2em] text-text-secondary">
            <li>
              <Link
                to="/"
                className="hover:text-primary transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3 h-3 text-text-secondary/50" />
            </li>
            <li className="text-primary font-medium" aria-current="page">
              Shop
            </li>
          </ol>
        </nav>

        {/* ── Title & Intro ──────────────────────────────────────────── */}
        <div className="max-w-3xl">
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-sans mb-3">
            Pure Elegance & Craftsmanship
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-main font-light leading-tight mb-4">
            Explore Our Collections
          </h1>
          <p className="text-xs sm:text-sm font-sans text-text-secondary leading-relaxed max-w-2xl">
            Each piece is thoughtfully handcrafted by master artisans, blending sacred Indian heritage with refined contemporary aesthetics. Available in ready-to-ship heirlooms and bespoke made-to-order creations.
          </p>
          <div className="mt-4 flex items-center gap-3 text-xs font-sans text-text-secondary/70">
            <span className="w-6 h-px bg-primary/70" />
            <span>
              Curated catalogue of <strong className="text-text-main font-semibold">{totalCount}</strong> distinct designs
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

