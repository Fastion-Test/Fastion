import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiHeart, FiStar, FiX } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice } from '../../utils/format';

export default function QuickViewModal({ product, onClose }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [size, setSize] = useState(product?.size?.[0]);
  const [color, setColor] = useState(product?.color?.[0]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-black/50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-brand-gray-900 rounded-2xl max-w-3xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            <div className="aspect-square md:aspect-auto md:h-full bg-brand-gray-100 dark:bg-brand-gray-800">
              <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 relative">
              <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 text-brand-gray-400 hover:text-brand-black dark:hover:text-white">
                <FiX size={20} />
              </button>
              <p className="text-xs uppercase tracking-wide text-brand-gray-400">{product.brand}</p>
              <h2 className="font-heading text-xl font-semibold mt-1 mb-2 text-brand-black dark:text-white">{product.name}</h2>
              <div className="flex items-center gap-1 text-amber-500 text-sm mb-3">
                <FiStar className="fill-amber-500" /> {product.rating}
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-heading font-semibold">{formatPrice(product.price)}</span>
                {product.oldPrice > 0 && (
                  <span className="text-sm text-brand-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
                )}
              </div>
              <p className="text-sm text-brand-gray-500 dark:text-brand-gray-400 font-body mb-5 line-clamp-3">
                {product.description}
              </p>

              {product.size?.[0] !== 'One Size' && (
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-wide mb-2">Size</p>
                  <div className="flex flex-wrap gap-2">
                    {product.size.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`px-3 py-1.5 text-xs rounded-full border ${size === s ? 'bg-brand-black text-white border-brand-black dark:bg-white dark:text-brand-black' : 'border-brand-gray-300 dark:border-brand-gray-600'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    addToCart(product, { size, color });
                    onClose();
                  }}
                  className="btn-ripple flex-1 bg-brand-black dark:bg-white text-white dark:text-brand-black text-sm font-semibold py-3 rounded-full hover:bg-brand-blue dark:hover:bg-brand-blue dark:hover:text-white transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  aria-label="Toggle wishlist"
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-brand-gray-300 dark:border-brand-gray-600"
                >
                  <FiHeart className={isWishlisted(product.id) ? 'fill-brand-red text-brand-red' : ''} />
                </button>
              </div>
              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                className="block text-center text-sm mt-4 text-brand-blue hover:underline"
              >
                View full details
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
