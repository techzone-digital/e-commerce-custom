export type ProductCategory =
  | 'All Jewellery'
  | 'Spadika Malai'
  | 'Silver Jewellery'
  | 'Gold Rings'
  | 'Gold Chains'
  | 'Bangles';

export type ProductMaterial = 'Gold' | 'Silver' | 'Spadika';

export type ProductAvailability = 'Ready to Ship' | 'Made to Order' | 'Customisable';

export type SortOption =
  | 'featured'
  | 'newest'
  | 'price-asc'
  | 'price-desc';

export interface Product {
  id: string;
  name: string;
  category: Exclude<ProductCategory, 'All Jewellery'>;
  material: ProductMaterial;
  price: number;
  image: string;
  secondaryImage?: string;
  availability: ProductAvailability;
  isNew?: boolean;
  isFeatured?: boolean;
  rating?: number;
  description?: string;
  details?: {
    metalPurity?: string;
    weightApprox?: string;
    gemstone?: string;
    dimensions?: string;
  };
}

export interface ProductFilterState {
  category: ProductCategory;
  minPrice: number;
  maxPrice: number;
  materials: ProductMaterial[];
  availabilities: ProductAvailability[];
  sort: SortOption;
  searchQuery?: string;
}

