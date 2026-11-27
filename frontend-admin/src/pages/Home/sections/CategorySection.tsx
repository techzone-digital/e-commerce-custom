import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'spadika-malai',
    name: 'Spadika Malai',
    description: 'Sacred crystal garlands',
    image:
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80&auto=format&fit=crop',
    to: '/categories',
  },
  {
    id: 'silver-jewellery',
    name: 'Silver Jewellery',
    description: 'Refined silver artistry',
    image:
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80&auto=format&fit=crop',
    to: '/categories',
  },
  {
    id: 'gold-rings',
    name: 'Gold Rings',
    description: 'Handcrafted gold bands',
    image:
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80&auto=format&fit=crop',
    to: '/categories',
  },
  {
    id: 'gold-chains',
    name: 'Gold Chains',
    description: 'Lustrous linked elegance',
    image:
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1200&q=80',
    to: '/categories',
  },
  {
    id: 'bangles',
    name: 'Bangles',
    description: 'Traditional wrist adornments',
    image:
      'https://images.unsplash.com/photo-1590179068383-b9c69aacebd3?w=600&q=80&auto=format&fit=crop',
    to: '/categories',
  },
];

export const CategorySection: React.FC = () => {
  return (
    <section
      id="categories"
      className="py-16 md:py-20 lg:py-24 bg-bg transition-colors duration-200"
      aria-labelledby="categories-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-sans mb-3">
              Collections
            </p>
            <h2
              id="categories-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl text-text-main font-light"
            >
              Shop by Category
            </h2>
          </div>
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-text-secondary hover:text-primary transition-colors duration-200 group flex-shrink-0"
          >
            View All
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Category Grid */}
        {/* Layout: 1 col on mobile, 2 on sm, 3 on md, 5 on lg+ using scroll on small screens */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={cat.to}
              className="group relative overflow-hidden rounded-xl aspect-[3/4] block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={`Browse ${cat.name}`}
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                loading="lazy"
                decoding="async"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/85" />

              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <h3 className="font-serif text-sm sm:text-base md:text-lg font-normal text-white leading-tight mb-0.5">
                  {cat.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-white/60 font-sans tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-1 group-hover:translate-y-0 transform">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;

