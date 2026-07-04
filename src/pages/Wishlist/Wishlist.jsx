import { Link } from 'react-router-dom';
import { FiShoppingBag, FiTrash2 } from 'react-icons/fi';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { getProductById } from '../../data/products';
import { formatPrice } from '../../utils/format';

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="font-heading text-2xl font-bold mb-3 text-brand-black dark:text-white">Your wishlist is empty</h1>
        <p className="text-sm text-brand-gray-500 mb-6">Save the pieces you love for later.</p>
        <Link to="/shop" className="btn-ripple inline-block bg-brand-black dark:bg-white text-white dark:text-brand-black font-semibold px-7 py-3 rounded-full">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container-x py-10">
      <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-8 text-brand-black dark:text-white">My Wishlist</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {wishlist.map((item) => (
          <div key={item.id} className="border border-brand-gray-200 dark:border-brand-gray-800 rounded-2xl overflow-hidden">
            <Link to={`/product/${item.id}`} className="block aspect-[3/4] bg-brand-gray-100 dark:bg-brand-gray-800">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
            </Link>
            <div className="p-3.5">
              <p className="text-[11px] uppercase tracking-wide text-brand-gray-400">{item.brand}</p>
              <p className="text-sm font-medium line-clamp-1 mb-1">{item.name}</p>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-heading font-semibold text-sm">{formatPrice(item.price)}</span>
                {item.oldPrice > 0 && <span className="text-xs text-brand-gray-400 line-through">{formatPrice(item.oldPrice)}</span>}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => addToCart(getProductById(item.id))}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-brand-black dark:bg-white text-white dark:text-brand-black text-xs font-semibold py-2 rounded-full"
                >
                  <FiShoppingBag size={13} /> Add
                </button>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  aria-label="Remove from wishlist"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-brand-gray-300 dark:border-brand-gray-600 text-brand-gray-500 hover:text-brand-red"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
