import React, { useState, useMemo } from 'react';
import {
  Product,
  ProductCategory,
  ProductMaterial,
  ProductAvailability,
  SortOption,
} from '../../features/products/types/product.types';
import { MOCK_PRODUCTS, CATEGORIES_LIST } from '../../features/products/data/mockProducts';
import {
  ProductCard,
  ProductFilters,
  CategoryTabs,
  SortAndFilterBar,
  MobileFilterDrawer,
  QuickViewModal,
  ShopHeader,
  EmptyProductState,
} from '../../features/products/components';

export const ShopPage: React.FC = () => {
  // ── Filter & Sort State ───────────────────────────────────────────
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All Jewellery');
  const [selectedMaterials, setSelectedMaterials] = useState<ProductMaterial[]>([]);
  const [selectedAvailabilities, setSelectedAvailabilities] = useState<ProductAvailability[]>([]);
  const [sort, setSort] = useState<SortOption>('featured');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
  const [desktopGridCols, setDesktopGridCols] = useState<3 | 4>(3);

  // Price range boundaries from dataset
  const { absoluteMinPrice, absoluteMaxPrice } = useMemo(() => {
    const prices = MOCK_PRODUCTS.map((p) => p.price);
    return {
      absoluteMinPrice: Math.min(...prices),
      absoluteMaxPrice: Math.max(...prices),
    };
  }, []);

  const [priceRange, setPriceRange] = useState<[number, number]>([
    absoluteMinPrice,
    absoluteMaxPrice,
  ]);

  // Count items per category across whole catalog
  const productCountPerCategory = useMemo(() => {
    const counts: Record<string, number> = {
      'All Jewellery': MOCK_PRODUCTS.length,
    };
    CATEGORIES_LIST.forEach((cat) => {
      if (cat !== 'All Jewellery') {
        counts[cat] = MOCK_PRODUCTS.filter((p) => p.category === cat).length;
      }
    });
    return counts;
  }, []);

  // ── Filter Toggling Handlers ──────────────────────────────────────
  const handleToggleMaterial = (mat: ProductMaterial) => {
    setSelectedMaterials((prev) =>
      prev.includes(mat) ? prev.filter((m) => m !== mat) : [...prev, mat]
    );
  };

  const handleToggleAvailability = (avail: ProductAvailability) => {
    setSelectedAvailabilities((prev) =>
      prev.includes(avail) ? prev.filter((a) => a !== avail) : [...prev, avail]
    );
  };

  const handleClearAllFilters = () => {
    setSelectedCategory('All Jewellery');
    setSelectedMaterials([]);
    setSelectedAvailabilities([]);
    setPriceRange([absoluteMinPrice, absoluteMaxPrice]);
    setSort('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'All Jewellery' ||
    selectedMaterials.length > 0 ||
    selectedAvailabilities.length > 0 ||
    priceRange[0] !== absoluteMinPrice ||
    priceRange[1] !== absoluteMaxPrice;

  const activeFilterCount =
    (selectedCategory !== 'All Jewellery' ? 1 : 0) +
    selectedMaterials.length +
    selectedAvailabilities.length +
    (priceRange[1] !== absoluteMaxPrice || priceRange[0] !== absoluteMinPrice ? 1 : 0);

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  // ── Filter & Sort Execution ───────────────────────────────────────
  const filteredAndSortedProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      if (selectedCategory !== 'All Jewellery' && product.category !== selectedCategory) {
        return false;
      }
      if (selectedMaterials.length > 0 && !selectedMaterials.includes(product.material)) {
        return false;
      }
      if (selectedAvailabilities.length > 0 && !selectedAvailabilities.includes(product.availability)) {
        return false;
      }
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'featured':
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });
  }, [selectedCategory, selectedMaterials, selectedAvailabilities, priceRange, sort]);

  return (
    <div className="bg-bg text-text-main min-h-screen">
      {/* Shop Header */}
      <ShopHeader totalCount={MOCK_PRODUCTS.length} />

      {/* Category Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CategoryTabs
          activeCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          productCountPerCategory={productCountPerCategory}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="lg:grid lg:grid-cols-12 lg:gap-10 items-start">

          {/* Desktop Sidebar */}
          <aside
            className="hidden lg:block lg:col-span-3 sticky top-28"
            aria-label="Product filters"
          >
            <div className="bg-surface/60 border border-border/50 p-6 backdrop-blur-sm">
              <ProductFilters
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                selectedMaterials={selectedMaterials}
                onToggleMaterial={handleToggleMaterial}
                selectedAvailabilities={selectedAvailabilities}
                onToggleAvailability={handleToggleAvailability}
                minPrice={absoluteMinPrice}
                maxPrice={absoluteMaxPrice}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                onClearFilters={handleClearAllFilters}
                hasActiveFilters={hasActiveFilters}
                productCountPerCategory={productCountPerCategory}
              />
            </div>
          </aside>

          {/* Main Product Area */}
          <main className="lg:col-span-9 flex flex-col">
            {/* Sort & Filter Bar */}
            <SortAndFilterBar
              totalCount={MOCK_PRODUCTS.length}
              filteredCount={filteredAndSortedProducts.length}
              sort={sort}
              onSortChange={setSort}
              onOpenMobileFilter={() => setIsMobileDrawerOpen(true)}
              activeFilterCount={activeFilterCount}
              gridCols={desktopGridCols}
              onToggleGridCols={setDesktopGridCols}
            />

            {/* Active Filter Pills */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-[9px] uppercase tracking-[0.25em] text-text-secondary/70 font-sans">
                  Filters:
                </span>

                {selectedCategory !== 'All Jewellery' && (
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('All Jewellery')}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] bg-primary/[0.08] border border-primary/25 text-primary hover:bg-primary/[0.15] transition-colors font-sans tracking-wide"
                  >
                    <span>{selectedCategory}</span>
                    <span className="text-xs leading-none opacity-70">×</span>
                  </button>
                )}

                {selectedMaterials.map((mat) => (
                  <button
                    key={mat}
                    type="button"
                    onClick={() => handleToggleMaterial(mat)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] bg-bg border border-border text-text-secondary hover:border-primary/50 hover:text-text-main transition-colors font-sans tracking-wide"
                  >
                    <span>{mat}</span>
                    <span className="text-xs leading-none opacity-70">×</span>
                  </button>
                ))}

                {selectedAvailabilities.map((avail) => (
                  <button
                    key={avail}
                    type="button"
                    onClick={() => handleToggleAvailability(avail)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] bg-bg border border-border text-text-secondary hover:border-primary/50 hover:text-text-main transition-colors font-sans tracking-wide"
                  >
                    <span>{avail}</span>
                    <span className="text-xs leading-none opacity-70">×</span>
                  </button>
                ))}

                {(priceRange[1] !== absoluteMaxPrice || priceRange[0] !== absoluteMinPrice) && (
                  <button
                    type="button"
                    onClick={() => setPriceRange([absoluteMinPrice, absoluteMaxPrice])}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] bg-bg border border-border text-text-secondary hover:border-primary/50 hover:text-text-main transition-colors font-sans tracking-wide"
                  >
                    <span>Under ₹{priceRange[1].toLocaleString('en-IN')}</span>
                    <span className="text-xs leading-none opacity-70">×</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleClearAllFilters}
                  className="text-[9px] uppercase tracking-[0.2em] text-text-secondary/60 hover:text-primary transition-colors font-sans ml-1"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Product Grid or Empty State */}
            {filteredAndSortedProducts.length === 0 ? (
              <EmptyProductState onClearFilters={handleClearAllFilters} />
            ) : (
              <div
                className={`grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5 ${
                  desktopGridCols === 4
                    ? 'sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                    : 'sm:grid-cols-2 md:grid-cols-3'
                }`}
              >
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                    onToggleWishlist={handleToggleWishlist}
                    isWishlisted={wishlistIds.has(product.id)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedMaterials={selectedMaterials}
        onToggleMaterial={handleToggleMaterial}
        selectedAvailabilities={selectedAvailabilities}
        onToggleAvailability={handleToggleAvailability}
        minPrice={absoluteMinPrice}
        maxPrice={absoluteMaxPrice}
        priceRange={priceRange}
        onPriceChange={setPriceRange}
        onClearFilters={handleClearAllFilters}
        hasActiveFilters={hasActiveFilters}
        resultCount={filteredAndSortedProducts.length}
        productCountPerCategory={productCountPerCategory}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        isWishlisted={quickViewProduct ? wishlistIds.has(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />
    </div>
  );
};

export default ShopPage;
