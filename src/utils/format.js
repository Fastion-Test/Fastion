// Currency + helper formatters used across the app

export const formatPrice = (value) => {
  const num = Number(value) || 0;
  return `$${num.toFixed(2)}`;
};

export const calcDiscount = (price, oldPrice) => {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
};

export const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
