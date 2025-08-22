export const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://t1mkp-api.vercel.app';

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  CART: '/cart',
  CHECKOUT: '/checkout',
  PROFILE: '/profile',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register'
};

export const PRODUCT_CATEGORIES = [
  { id: 1, name: 'Electrónicos', slug: 'electronics' },
  { id: 2, name: 'Ropa', slug: 'clothing' },
  { id: 3, name: 'Hogar', slug: 'home' },
  { id: 4, name: 'Deportes', slug: 'sports' }
];