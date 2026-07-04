import { products, getProductById, getRelatedProducts } from '../data/products';

// This layer currently resolves against local dummy data. Replace the
// bodies below with `api.get('/products')` etc. once a backend exists —
// pages call this service, not the data file directly, so the swap is isolated here.

export const fetchProducts = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(products), 400));
};

export const fetchProductById = async (id) => {
  return new Promise((resolve) => setTimeout(() => resolve(getProductById(id)), 300));
};

export const fetchRelatedProducts = async (product) => {
  return new Promise((resolve) => setTimeout(() => resolve(getRelatedProducts(product)), 300));
};
