import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1800&q=85&auto=format&fit=crop',
    eyebrow: 'New Collection 2024',
    headline: 'Jewellery Worn\nClose to the Heart',
    subtext:
      'Discover handcrafted gold and silver pieces rooted in tradition, made for everyday reverence.',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1200&q=80',
    eyebrow: 'Haute Joaillerie',
    headline: 'Timeless Pieces,\nCrafted with Devotion',
    subtext:
      'From intricate Spadika Malai to contemporary gold rings — each piece tells a story of craftsmanship.',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=1800&q=85&auto=format&fit=crop',
    eyebrow: 'Custom Jewellery',
    headline: 'Made to Order,\nMade for You',
    subtext:
      'Personalise your jewellery with our bespoke service. Work with our artisans to create something uniquely yours.',
  },
];

export const HeroSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        setIsTransitioning(false);
      }, 400);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[activeSlide];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: 'clamp(560px, 90vh, 900px)' }}
      aria-label="Hero — Featured Collection"
    >
      {/* Background images for all slides (preload) */}
      {HERO_SLIDES.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            idx === activeSlide ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={idx !== activeSlide}
        >
          <img
            src={s.image}
            alt=""
            className="w-full h-full object-cover"
            loading={idx === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {/* Content */}
      <div
        className={`relative z-10 h-full flex items-center transition-opacity duration-400 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ minHeight: 'clamp(560px, 90vh, 900px)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 pb-24 md:pb-28">
          <div className="max-w-xl lg:max-w-2xl">
            {/* Eyebrow */}
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-primary font-sans mb-5 md:mb-6">
              {slide.eyebrow}
            </p>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-5 md:mb-6 whitespace-pre-line">
              {slide.headline}
            </h1>

            {/* Sub-text */}
            <p className="text-sm sm:text-base text-white/70 font-sans font-light leading-relaxed max-w-md mb-9 md:mb-10">
              {slide.subtext}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary-hover text-surface px-6 sm:px-8 py-3 sm:py-3.5 text-xs uppercase tracking-widest font-medium transition-colors duration-200 rounded-full shadow-lg"
              >
                Shop Collection
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
              </Link>
              <a
                href="#categories"
                className="inline-flex items-center gap-2.5 border border-white/40 hover:border-white/80 text-white px-6 sm:px-8 py-3 sm:py-3.5 text-xs uppercase tracking-widest font-medium transition-colors duration-200 rounded-full backdrop-blur-sm"
              >
                Explore
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {HERO_SLIDES.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full ${
              idx === activeSlide
                ? 'w-6 h-1.5 bg-primary'
                : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <a
        href="#categories"
        aria-label="Scroll down"
        className="absolute bottom-10 right-6 sm:right-10 z-20 flex flex-col items-center gap-1 text-white/50 hover:text-white/80 transition-colors"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-sans">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
};

export default HeroSection;

