import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';

// Sample product data — UI only, no backend connection
const SAMPLE_PRODUCTS = [
  {
    id: 'p1',
    name: 'Antique Temple Ring',
    category: 'Gold Rings',
    price: '₹ — Sample Price',
    image:
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80&auto=format&fit=crop',
    badge: 'New',
  },
  {
    id: 'p2',
    name: 'Spadika Crystal Mala',
    category: 'Spadika Malai',
    price: '₹ — Sample Price',
    image:
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80&auto=format&fit=crop',
    badge: 'Bestseller',
  },
  {
    id: 'p3',
    name: 'Sterling Silver Bangle Set',
    category: 'Bangles',
    price: '₹ — Sample Price',
    image:
      'https://images.unsplash.com/photo-1590179068383-b9c69aacebd3?w=600&q=80&auto=format&fit=crop',
    badge: null,
  },
  {
    id: 'p4',
    name: 'Rope-Link Gold Chain',
    category: 'Gold Chains',
    price: '₹ — Sample Price',
    image:
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1200&q=80',
    badge: 'Limited',
  },
  {
    id: 'p5',
    name: 'Oxidised Silver Earrings',
    category: 'Silver Jewellery',
    price: '₹ — Sample Price',
    image:
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80&auto=format&fit=crop',
    badge: null,
  },
  {
    id: 'p6',
    name: 'Carved Gold Kada',
    category: 'Bangles',
    price: '₹ — Sample Price',
    image:
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&q=80&auto=format&fit=crop',
    badge: 'New',
  },
  {
    id: 'p7',
    name: 'Diamond-Cut Silver Ring',
    category: 'Silver Jewellery',
    price: '₹ — Sample Price',
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80&auto=format&fit=crop',
    badge: null,
  },
  {
    id: 'p8',
    name: 'Layered Gold Necklace',
    category: 'Gold Chains',
    price: '₹ — Sample Price',
    image:
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80&auto=format&fit=crop',
    badge: 'Bestseller',
  },
];

interface ProductCardProps {
  product: (typeof SAMPLE_PRODUCTS)[number];
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [wishlistActive, setWishlistActive] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <article className="group bg-surface border border-border rounded-xl overflow-hidden transition-shadow duration-300 hover:shadow-lg flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-bg">
        {imgError ? (
          <div className="w-full h-full flex items-center justify-center bg-bg text-text-secondary/40 text-xs">
            Image unavailable
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
            loading="lazy"
            decoding="async"
          />
        )}

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider font-semibold bg-primary text-surface px-2.5 py-1 rounded-full">
            {product.badge}
          </span>
        )}

        {/* Wishlist button */}
        <button
          type="button"
          onClick={() => setWishlistActive((p) => !p)}
          aria-label={wishlistActive ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 shadow-sm ${
            wishlistActive
              ? 'bg-primary border-primary text-surface'
              : 'bg-surface/90 border-border text-text-secondary hover:border-primary hover:text-primary'
          }`}
        >
          <Heart
            className="w-4 h-4"
            strokeWidth={1.75}
            fill={wishlistActive ? 'currentColor' : 'none'}
          />
        </button>

        {/* Quick View overlay — mobile tap-friendly, desktop hover */}
        <div className="absolute inset-x-0 bottom-0 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <Link
            to="/shop"
            className="block w-full bg-primary/95 hover:bg-primary text-surface text-xs uppercase tracking-widest font-medium py-3 text-center transition-colors duration-200"
          >
            View Product
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] uppercase tracking-wider text-primary font-sans mb-1">
          {product.category}
        </p>
        <h3 className="font-serif text-base text-text-main leading-snug mb-2 flex-1">
          {product.name}
        </h3>
        {/* Price — clearly marked as sample UI content */}
        <p
          className="text-xs text-text-secondary/60 italic font-sans"
          aria-label="Sample price — not actual pricing"
        >
          {product.price}
        </p>
      </div>
    </article>
  );
};

export const FeaturedProducts: React.FC = () => {
  return (
    <section
      className="py-16 md:py-20 lg:py-24 bg-bg transition-colors duration-200"
      aria-labelledby="products-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-sans mb-3">
              Handpicked
            </p>
            <h2
              id="products-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl text-text-main font-light"
            >
              Featured Products
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-text-secondary hover:text-primary transition-colors duration-200 group flex-shrink-0"
          >
            Shop All
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Product Grid */}
        {/* 1 col on xs, 2 on sm, 3 on md, 4 on lg+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
          {SAMPLE_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Sample data notice */}
        <p className="mt-8 text-center text-xs text-text-secondary/50 italic font-sans">
          * Product images and details shown are sample UI content only.
        </p>
      </div>
    </section>
  );
};

export default FeaturedProducts;

