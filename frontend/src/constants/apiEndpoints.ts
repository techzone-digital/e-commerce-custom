export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  PRODUCTS: {
    BASE: '/products',
    DETAILS: (id: string) => `/products/${id}`,
  },
  CATEGORIES: {
    BASE: '/categories',
  },
  CART: {
    BASE: '/cart',
  },
  WISHLIST: {
    BASE: '/wishlist',
  },
  ORDERS: {
    BASE: '/orders',
  },
  PAYMENTS: {
    CREATE_INTENT: '/payments/create-intent',
    VERIFY: '/payments/verify',
  },
} as const;

