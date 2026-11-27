import React from 'react';
import { ArrowUpRight, Sparkles, Gem, Clock } from 'lucide-react';

interface CraftsmanshipStorySectionProps {
  imageSrc?: string;
}

const DEFAULT_ARTISAN_IMAGE =
  'https://images.unsplash.com/photo-1609619742069-f5e18afeef17?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D';

export const CraftsmanshipStorySection: React.FC<CraftsmanshipStorySectionProps> = ({
  imageSrc = DEFAULT_ARTISAN_IMAGE,
}) => {
  return (
    <section
      className="py-16 md:py-24 lg:py-28 bg-surface border-y border-border transition-colors duration-200 overflow-hidden"
      aria-labelledby="craftsmanship-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-center">
          
          {/* ── LEFT COLUMN: Framed Artisan Photograph ───────────── */}
          <div className="lg:col-span-6 relative">
            <div className="relative">
              {/* Outer decorative architectural frame border */}
              <div className="relative p-2.5 sm:p-3.5 rounded-2xl border border-primary/25 bg-bg/40 shadow-sm">
                
                {/* Photo container / Placeholder */}
                <div className="relative aspect-[4/5] sm:aspect-[4/4.8] w-full rounded-xl overflow-hidden bg-bg border border-border flex items-center justify-center group">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt="Goldsmith handcrafting jewellery at the artisan workbench"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    /* Elegant visual placeholder matching reference layout & tone */
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-bg via-surface/80 to-bg relative overflow-hidden">
                      {/* Decorative ambient background accents */}
                      <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
                      <div className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full bg-primary/5 blur-2xl pointer-events-none" />

                      <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 text-primary shadow-sm">
                        <Gem className="w-7 h-7" strokeWidth={1.5} />
                      </div>

                      <p className="font-serif text-lg sm:text-xl text-text-main font-normal tracking-wide mb-2">
                        Artisan Workshop
                      </p>
                      <p className="text-xs text-text-secondary max-w-xs leading-relaxed font-sans font-light">
                        Handcrafted at the bench. Traditional South Indian goldsmithing in progress.
                      </p>

                      <div className="mt-6 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/80 bg-surface/70 text-[10px] uppercase tracking-wider text-text-secondary/80 font-mono">
                        <span>Client Photograph Placeholder</span>
                      </div>
                    </div>
                  )}

                  {/* Corner editorial badge (Fig. / Workshop tag like reference) */}
                  <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 px-3 py-1.5 rounded-md bg-surface/90 dark:bg-surface/90 backdrop-blur-md border border-border shadow-sm flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-text-secondary">
                      THE WORKBENCH
                    </span>
                    <span className="w-px h-3 bg-border" aria-hidden="true" />
                    <span className="text-[10px] font-mono text-primary font-semibold">
                      ATELIER
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Editorial Story & Highlights ───────── */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Eyebrow */}
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-primary font-sans font-semibold mb-4">
              CRAFTED WITH CARE
            </p>

            {/* Large Two-line Heading */}
            <h2
              id="craftsmanship-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-light text-text-main leading-[1.15] mb-6"
            >
              <span>From Our Hands.</span>
              <br />
              <span className="italic text-primary">Into Your Story.</span>
            </h2>

            {/* Story Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-text-secondary font-sans font-light leading-relaxed mb-8 max-w-xl">
              <p>
                Behind every creation at Shivam Crafts is the patient devotion of master artisans. From initial hand sketches and meticulous metal casting to fine filing, stone setting, and final buffing, each ornament is given time and mindful attention.
              </p>
              <p>
                We eschew mass assembly lines in favor of individual focus. Each Spadika garland, sacred gold ring, and silver piece is crafted to honor personal rituals and everyday reverence, meant to be cherished across generations.
              </p>
            </div>

            {/* Artisan Signature Area */}
            <div className="flex items-center gap-4 mb-8 pb-7 border-b border-border/70">
              <span className="font-serif text-2xl sm:text-3xl italic text-text-main tracking-wide">
                Shivam Crafts
              </span>
              <div className="w-px h-6 bg-border" aria-hidden="true" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-primary font-sans">
                Master Karigars &amp; Artisans
              </span>
            </div>

            {/* Three Horizontal Highlight Cards (matching reference layout) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8">
              
              {/* Card 1 */}
              <div className="p-4 sm:p-4.5 rounded-xl border border-border bg-bg/50 hover:border-primary/40 transition-colors duration-200">
                <div className="flex items-center gap-2 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <h3 className="font-serif text-sm sm:text-base text-text-main font-normal">
                    Made with Care
                  </h3>
                </div>
                <p className="text-[11px] text-text-secondary leading-normal font-sans">
                  Mindfully shaped and hand-finished with reverence.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-4 sm:p-4.5 rounded-xl border border-border bg-bg/50 hover:border-primary/40 transition-colors duration-200">
                <div className="flex items-center gap-2 mb-1.5">
                  <Gem className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <h3 className="font-serif text-sm sm:text-base text-text-main font-normal">
                    Thoughtful Craft
                  </h3>
                </div>
                <p className="text-[11px] text-text-secondary leading-normal font-sans">
                  Time-honoured techniques passed down for decades.
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-4 sm:p-4.5 rounded-xl border border-border bg-bg/50 hover:border-primary/40 transition-colors duration-200">
                <div className="flex items-center gap-2 mb-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <h3 className="font-serif text-sm sm:text-base text-text-main font-normal">
                    Made to Order
                  </h3>
                </div>
                <p className="text-[11px] text-text-secondary leading-normal font-sans">
                  Tailored to your size, preference, and devotion.
                </p>
              </div>
            </div>

            {/* Subtle Text Link / CTA */}
            <div>
              <a
                href="#categories"
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-medium text-text-main hover:text-primary transition-colors duration-200 group border-b border-primary/40 hover:border-primary pb-0.5"
              >
                <span>Explore Our Craftsmanship</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-primary" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default CraftsmanshipStorySection;

