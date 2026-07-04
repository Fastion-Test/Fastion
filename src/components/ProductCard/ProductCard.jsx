import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEye, FiHeart, FiShoppingBag, FiStar } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice } from '../../utils/format';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [imgLoaded, setImgLoaded] = useState(false);
  const wishlisted = isWishlisted(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      className="group relative bg-white dark:bg-brand-gray-900 rounded-2xl border border-brand-gray-100 dark:border-brand-gray-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.discount > 0 && (
          <span className="bg-brand-red text-white text-[11px] font-semibold px-2 py-1 rounded-full">
            -{product.discount}%
          </span>
        )}
        {product.stock < 20 && product.stock > 0 && (
          <span className="bg-brand-black/80 text-white text-[10px] font-medium px-2 py-1 rounded-full">
            Low stock
          </span>
        )}
      </div>

      {/* Wishlist */}
      <button
        onClick={() => toggleWishlist(product)}
        aria-label="Toggle wishlist"
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 dark:bg-brand-gray-800/90 flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
      >
        <FiHeart className={wishlisted ? 'fill-brand-red text-brand-red' : 'text-brand-black dark:text-white'} size={15} />
      </button>

      {/* Image */}
      <Link to={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-brand-gray-100 dark:bg-brand-gray-800">
        {!imgLoaded && <div className="absolute inset-0 skeleton" />}
        <img
          src={product.thumbnail}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        {/* Quick view - appears on hover (desktop) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            onQuickView?.(product);
          }}
          className="hidden md:flex absolute bottom-3 left-1/2 -translate-x-1/2 items-center gap-2 bg-white dark:bg-brand-gray-900 text-brand-black dark:text-white text-xs font-medium px-4 py-2 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-md"
        >
          <FiEye size={14} /> Quick View
        </button>
      </Link>

      {/* Info */}
      <div className="p-3.5 flex flex-col gap-1">
        <p className="text-[11px] uppercase tracking-wide text-brand-gray-400 font-body">{product.brand}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-body font-medium text-brand-black dark:text-white line-clamp-2 hover:text-brand-blue transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 text-amber-500 text-xs">
          <FiStar className="fill-amber-500" size={12} />
          <span className="text-brand-gray-600 dark:text-brand-gray-300">{product.rating}</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-base font-heading font-semibold text-brand-black dark:text-white">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice > 0 && (
            <span className="text-xs text-brand-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
          )}
        </div>
        <button
          onClick={() => addToCart(product)}
          className="btn-ripple mt-2 w-full flex items-center justify-center gap-2 bg-brand-black dark:bg-white text-white dark:text-brand-black text-xs font-semibold py-2.5 rounded-full hover:bg-brand-blue dark:hover:bg-brand-blue dark:hover:text-white transition-colors"
        >
          <FiShoppingBag size={14} /> Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
