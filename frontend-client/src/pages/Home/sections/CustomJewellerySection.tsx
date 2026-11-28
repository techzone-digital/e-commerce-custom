import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export const CustomJewellerySection: React.FC = () => {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-24 lg:py-28 bg-surface transition-colors duration-200"
      aria-labelledby="custom-heading"
    >
      {/* Background image */}
      <div className="absolute inset-0 opacity-15 dark:opacity-10">
        <img
          src="https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=1600&q=70&auto=format&fit=crop"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Warm tinted overlay */}
      <div className="absolute inset-0 bg-bg/60 dark:bg-surface/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon accent */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-6">
            <Sparkles className="w-6 h-6" strokeWidth={1.5} />
          </div>

          <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-sans mb-4">
            Bespoke Service
          </p>

          <h2
            id="custom-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-main font-light mb-6 leading-tight"
          >
            Jewellery Made
            <br />
            <span className="italic">Just for You</span>
          </h2>

          {/* Gold rule */}
          <div className="w-12 h-px bg-primary mx-auto mb-7" />

          <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-5 max-w-lg mx-auto">
            Many of our pieces can be customised to your exact preference — metal choice, gemstone
            selection, size, and finish. Work directly with our master craftsmen to design something
            uniquely yours.
          </p>

          <p className="text-sm text-text-secondary/70 leading-relaxed mb-10 max-w-md mx-auto">
            Share your vision with us. We'll bring it to life through traditional handcrafting
            techniques passed down through generations.
          </p>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 text-left">
            {[
              {
                step: '01',
                title: 'Share Your Idea',
                desc: 'Tell us your design vision, occasion, or inspiration.',
              },
              {
                step: '02',
                title: 'Design Together',
                desc: 'Our artisans collaborate with you to refine every detail.',
              },
              {
                step: '03',
                title: 'Receive Your Piece',
                desc: 'Receive your bespoke jewellery, crafted with care.',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="p-5 rounded-xl border border-border bg-bg/50 dark:bg-surface/50">
                <p className="text-xs font-mono text-primary mb-2 tracking-wider">{step}</p>
                <h3 className="font-serif text-base text-text-main mb-1.5">{title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary-hover text-surface px-7 py-3.5 rounded-full text-xs uppercase tracking-widest font-medium transition-colors duration-200 shadow-sm"
            >
              Send an Enquiry
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2.5 border border-border hover:border-primary text-text-secondary hover:text-primary px-7 py-3.5 rounded-full text-xs uppercase tracking-widest font-medium transition-colors duration-200"
            >
              Explore Pieces
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomJewellerySection;

