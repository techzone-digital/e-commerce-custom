import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const COLLECTIONS = [
  {
    id: 'heritage',
    eyebrow: 'Featured Collection',
    title: 'Heritage Gold',
    description:
      'Rooted in centuries of South Indian craftsmanship, the Heritage Gold collection celebrates traditional temple jewellery reimagined for the modern woman.',
    image:
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1200&q=80',
    to: '/shop',
    layout: 'left',
  },
  {
    id: 'silhouette',
    eyebrow: 'New Arrival',
    title: 'Silver Silhouette',
    description:
      'Minimal forms, maximum grace. The Silver Silhouette collection brings clean contemporary design to lustrous 925 silver.',
    image:
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=900&q=85&auto=format&fit=crop',
    to: '/shop',
    layout: 'right',
  },
];

export const FeaturedCollections: React.FC = () => {
  return (
    <section
      className="py-16 md:py-20 lg:py-24 bg-surface transition-colors duration-200"
      aria-labelledby="collections-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-sans mb-3">
            Curated
          </p>
          <h2
            id="collections-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-text-main font-light"
          >
            Featured Collections
          </h2>
        </div>

        {/* Collection Editorial Layouts */}
        <div className="space-y-16 md:space-y-20 lg:space-y-24">
          {COLLECTIONS.map((col) => (
            <article
              key={col.id}
              className={`flex flex-col ${
                col.layout === 'right'
                  ? 'md:flex-row-reverse'
                  : 'md:flex-row'
              } gap-8 md:gap-12 lg:gap-16 items-center`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden flex-shrink-0">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Text */}
              <div
                className={`w-full md:w-1/2 ${
                  col.layout === 'right' ? 'md:pr-4 lg:pr-8' : 'md:pl-4 lg:pl-8'
                }`}
              >
                <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-sans mb-4">
                  {col.eyebrow}
                </p>
                <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-text-main font-light mb-5">
                  {col.title}
                </h3>
                {/* Thin rule */}
                <div className="w-10 h-px bg-primary mb-6" />
                <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-8 max-w-md">
                  {col.description}
                </p>
                <Link
                  to={col.to}
                  className="inline-flex items-center gap-2.5 text-xs uppercase tracking-widest font-medium text-primary hover:text-primary-hover transition-colors duration-200 group"
                >
                  Explore Collection
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;

