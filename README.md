# LUXE — Modern Fashion E-Commerce Store

A modern, responsive clothing e-commerce front end built with React (Vite), React Router, Tailwind CSS, Framer Motion, Swiper, and Context API — inspired by Zara, ASOS, H&M, and Uniqlo.

## Getting Started

This project was built without network access, so dependencies aren't installed yet. To run it:

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Tech Stack

- **React 18 + Vite** — fast dev server and build
- **React Router DOM v6** — client-side routing across all pages
- **Tailwind CSS** — utility-first styling, dark mode via the `class` strategy
- **Framer Motion** — page transitions, hover/entry animations
- **Swiper.js** — hero slider, related-products carousel
- **React Icons** — icon set (Feather + a couple of brand icons)
- **Axios** — pre-wired API client in `src/services/`, ready to swap dummy data for a real backend
- **Context API** — `CartContext`, `WishlistContext`, `ThemeContext`, `ToastContext`

## Folder Structure

```
src/
├── assets/
├── components/       # Navbar, Footer, Hero, ProductCard, CategoryCard, SearchBar,
│                      ProductSlider, Toast, Skeleton, BackToTop, QuickViewModal,
│                      Newsletter, Brands, Layout
├── pages/            # Home, Shop, Product, Cart, Checkout, Wishlist,
│                      Login, Register, MyAccount, Contact, About, NotFound
├── context/          # CartContext, WishlistContext, ThemeContext, ToastContext
├── hooks/            # useLocalStorage, useRecentlyViewed
├── services/         # api.js (Axios instance), productService.js
├── data/             # products.js (36 dummy products), categories.js (brands + categories)
├── utils/            # format.js (price/discount/slug helpers)
├── App.jsx
└── main.jsx
```

## Features Implemented

- Sticky navbar with search, wishlist/cart badges, and a mobile hamburger menu
- Auto-playing fade hero slider (Swiper)
- Category grid, flash-sale grid, trending grid with gender tabs
- Product search (navbar + Shop page), category/brand/price/rating filters, sorting, pagination
- Product detail page: gallery with thumbnails, size/color/quantity selectors, related + recently viewed sliders
- Cart with quantity controls, coupon codes (`SAVE10`, `WELCOME15`, `LUXE20`), and an order summary
- Checkout with a shipping form, payment method selection, and order placement
- Wishlist, Login, Register, My Account (profile / orders / addresses / wishlist tabs), Contact, About, 404
- Toast notifications, loading skeletons, dark mode, scroll-to-top on route change, back-to-top button
- Cart and wishlist persist to `localStorage`

## Notes on Data & Images

- All 36 products live in `src/data/products.js` with id, name, brand, price, oldPrice, discount, rating, category, gender, description, sizes, colors, stock, and a gallery of images.
- Images are placeholder photos from `picsum.photos` (seeded, so they stay consistent between reloads). Swap these for real product photography before shipping.
- Login/Register/Checkout are wired to show toasts and navigate, but don't call a real backend yet — `src/services/api.js` is ready for that once you have one.

## Coupons for testing the cart

| Code       | Discount |
|------------|----------|
| SAVE10     | 10%      |
| WELCOME15  | 15%      |
| LUXE20     | 20%      |
