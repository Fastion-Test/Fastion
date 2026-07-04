import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/format';

export default function Cart() {
  const { cart, subtotal, discountAmount, shipping, total, coupon, updateQuantity, removeFromCart, applyCoupon, removeCoupon, lineKey } = useCart();
  const [couponInput, setCouponInput] = useState('');
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="font-heading text-2xl font-bold mb-3 text-brand-black dark:text-white">Your cart is empty</h1>
        <p className="text-sm text-brand-gray-500 mb-6">Looks like you haven't added anything yet.</p>
        <Link to="/shop" className="btn-ripple inline-block bg-brand-black dark:bg-white text-white dark:text-brand-black font-semibold px-7 py-3 rounded-full">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-x py-10">
      <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-8 text-brand-black dark:text-white">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10">
        <div className="flex flex-col gap-4">
          {cart.map((line) => {
            const key = lineKey(line);
            return (
              <div key={key} className="flex gap-4 border border-brand-gray-200 dark:border-brand-gray-800 rounded-2xl p-4">
                <img src={line.image} alt={line.name} className="w-24 h-28 object-cover rounded-xl shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <div>
                      <p className="font-heading font-semibold text-brand-black dark:text-white">{line.name}</p>
                      <p className="text-xs text-brand-gray-500 mt-0.5">{line.brand}</p>
                      <p className="text-xs text-brand-gray-500 mt-1">Size: {line.size} · Color: {line.color}</p>
                    </div>
                    <button onClick={() => removeFromCart(key)} aria-label="Remove item" className="text-brand-gray-400 hover:text-brand-red shrink-0">
                      <FiTrash2 />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3 border border-brand-gray-300 dark:border-brand-gray-600 rounded-full px-2">
                      <button onClick={() => updateQuantity(key, line.quantity - 1)} className="p-1.5" aria-label="Decrease quantity"><FiMinus size={12} /></button>
                      <span className="w-5 text-center text-sm">{line.quantity}</span>
                      <button onClick={() => updateQuantity(key, line.quantity + 1)} className="p-1.5" aria-label="Increase quantity"><FiPlus size={12} /></button>
                    </div>
                    <p className="font-heading font-semibold text-brand-black dark:text-white">
                      {formatPrice(line.price * line.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="h-fit border border-brand-gray-200 dark:border-brand-gray-800 rounded-2xl p-6 sticky top-24">
          <h2 className="font-heading text-lg font-semibold mb-5 text-brand-black dark:text-white">Order Summary</h2>

          {!coupon ? (
            <div className="flex gap-2 mb-5">
              <input
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="Coupon code"
                className="flex-1 min-w-0 px-3 py-2 text-sm rounded-full border border-brand-gray-300 dark:border-brand-gray-600 bg-transparent focus:outline-none"
              />
              <button
                onClick={() => applyCoupon(couponInput)}
                className="text-sm font-medium px-4 py-2 rounded-full bg-brand-gray-100 dark:bg-brand-gray-800 hover:bg-brand-gray-200 dark:hover:bg-brand-gray-700"
              >
                Apply
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between mb-5 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-full">
              <span className="text-xs text-green-700 dark:text-green-400 font-medium">"{coupon.code}" applied</span>
              <button onClick={removeCoupon} className="text-xs text-brand-red">Remove</button>
            </div>
          )}
          <p className="text-[11px] text-brand-gray-400 -mt-3 mb-5">Try: SAVE10, WELCOME15, LUXE20</p>

          <div className="flex flex-col gap-2 text-sm font-body">
            <div className="flex justify-between text-brand-gray-600 dark:text-brand-gray-300">
              <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
            </div>
            {coupon && (
              <div className="flex justify-between text-green-600">
                <span>Discount ({coupon.discount * 100}%)</span><span>-{formatPrice(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-brand-gray-600 dark:text-brand-gray-300">
              <span>Shipping</span><span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between font-heading font-semibold text-base text-brand-black dark:text-white pt-3 mt-2 border-t border-brand-gray-200 dark:border-brand-gray-700">
              <span>Total</span><span>{formatPrice(total)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="btn-ripple w-full mt-6 bg-brand-black dark:bg-white text-white dark:text-brand-black font-semibold py-3.5 rounded-full hover:bg-brand-blue dark:hover:bg-brand-blue dark:hover:text-white transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
