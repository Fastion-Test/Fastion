import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useLocalStorage('wishlist', []);
  const { showToast } = useToast() || {};

  const isWishlisted = (id) => wishlist.some((item) => item.id === id);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        showToast?.(`${product.name} removed from wishlist`, 'info');
        return prev.filter((item) => item.id !== product.id);
      }
      showToast?.(`${product.name} added to wishlist`, 'success');
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          oldPrice: product.oldPrice,
          image: product.thumbnail || product.images?.[0],
        },
      ];
    });
  };

  const removeFromWishlist = (id) => setWishlist((prev) => prev.filter((item) => item.id !== id));

  return (
    <WishlistContext.Provider value={{ wishlist, isWishlisted, toggleWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
