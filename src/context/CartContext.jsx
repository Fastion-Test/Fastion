import { createContext, useContext, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

// A cart line is uniquely identified by product id + chosen size + chosen color
const lineKey = (item) => `${item.id}-${item.size}-${item.color}`;

const COUPONS = {
  SAVE10: 0.1,
  WELCOME15: 0.15,
  LUXE20: 0.2,
};

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('cart', []);
  const [coupon, setCoupon] = useLocalStorage('cartCoupon', null);
  const { showToast } = useToast() || {};

  const addToCart = (product, { size, color, quantity = 1 } = {}) => {
    const item = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.thumbnail || product.images?.[0],
      size: size || product.size?.[0] || 'One Size',
      color: color || product.color?.[0] || '—',
    };
    setCart((prev) => {
      const key = lineKey(item);
      const existing = prev.find((line) => lineKey(line) === key);
      if (existing) {
        return prev.map((line) =>
          lineKey(line) === key ? { ...line, quantity: line.quantity + quantity } : line
        );
      }
      return [...prev, { ...item, quantity }];
    });
    showToast?.(`${product.name} added to cart`, 'success');
  };

  const removeFromCart = (key) => {
    setCart((prev) => prev.filter((line) => lineKey(line) !== key));
    showToast?.('Item removed from cart', 'info');
  };

  const updateQuantity = (key, quantity) => {
    if (quantity < 1) return;
    setCart((prev) => prev.map((line) => (lineKey(line) === key ? { ...line, quantity } : line)));
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
  };

  const applyCoupon = (code) => {
    const normalized = code.trim().toUpperCase();
    if (COUPONS[normalized]) {
      setCoupon({ code: normalized, discount: COUPONS[normalized] });
      showToast?.(`Coupon "${normalized}" applied`, 'success');
      return true;
    }
    showToast?.('Invalid coupon code', 'error');
    return false;
  };

  const removeCoupon = () => setCoupon(null);

  const subtotal = useMemo(
    () => cart.reduce((sum, line) => sum + line.price * line.quantity, 0),
    [cart]
  );

  const discountAmount = coupon ? subtotal * coupon.discount : 0;
  const shipping = cart.length === 0 || subtotal > 100 ? 0 : 7.99;
  const total = Math.max(subtotal - discountAmount + shipping, 0);
  const itemCount = cart.reduce((sum, line) => sum + line.quantity, 0);

  const value = {
    cart,
    itemCount,
    subtotal,
    discountAmount,
    shipping,
    total,
    coupon,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
    lineKey,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
