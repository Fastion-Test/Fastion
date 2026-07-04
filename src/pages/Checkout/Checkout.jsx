import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiCreditCard, FiTruck } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { formatPrice } from '../../utils/format';

const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit / Debit Card', icon: <FiCreditCard /> },
  { id: 'cod', label: 'Cash on Delivery', icon: <FiTruck /> },
];

export default function Checkout() {
  const { cart, subtotal, discountAmount, shipping, total, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [payment, setPayment] = useState('card');
  const [placing, setPlacing] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', address: '', city: '', zip: '', country: '', phone: '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast('Your cart is empty', 'error');
      return;
    }
    const required = ['firstName', 'lastName', 'email', 'address', 'city', 'zip', 'country'];
    if (required.some((field) => !form[field].trim())) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    setPlacing(true);
    setTimeout(() => {
      showToast('Order placed successfully!', 'success');
      clearCart();
      setPlacing(false);
      navigate('/');
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="font-heading text-2xl font-bold mb-3 text-brand-black dark:text-white">Nothing to check out</h1>
        <p className="text-sm text-brand-gray-500">Add items to your cart before proceeding to checkout.</p>
      </div>
    );
  }

  return (
    <div className="container-x py-10">
      <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-8 text-brand-black dark:text-white">Checkout</h1>
      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10">
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="font-heading text-lg font-semibold mb-4 text-brand-black dark:text-white">Shipping Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" className="input-field" />
              <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" className="input-field" />
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email Address" className="input-field sm:col-span-2" />
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="input-field sm:col-span-2" />
              <input name="address" value={form.address} onChange={handleChange} placeholder="Street Address" className="input-field sm:col-span-2" />
              <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="input-field" />
              <input name="zip" value={form.zip} onChange={handleChange} placeholder="ZIP / Postal Code" className="input-field" />
              <input name="country" value={form.country} onChange={handleChange} placeholder="Country" className="input-field sm:col-span-2" />
            </div>
          </div>

          <div>
            <h2 className="font-heading text-lg font-semibold mb-4 text-brand-black dark:text-white">Payment Method</h2>
            <div className="flex flex-col gap-3">
              {PAYMENT_METHODS.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border cursor-pointer ${payment === method.id ? 'border-brand-black dark:border-white bg-brand-gray-50 dark:bg-brand-gray-800' : 'border-brand-gray-200 dark:border-brand-gray-700'}`}
                >
                  <input type="radio" name="payment" checked={payment === method.id} onChange={() => setPayment(method.id)} />
                  <span className="text-lg text-brand-gray-600 dark:text-brand-gray-300">{method.icon}</span>
                  <span className="text-sm font-medium">{method.label}</span>
                </label>
              ))}
            </div>
            {payment === 'card' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <input placeholder="Card Number" className="input-field sm:col-span-2" />
                <input placeholder="MM/YY" className="input-field" />
                <input placeholder="CVC" className="input-field" />
              </div>
            )}
          </div>
        </div>

        <div className="h-fit border border-brand-gray-200 dark:border-brand-gray-800 rounded-2xl p-6 sticky top-24">
          <h2 className="font-heading text-lg font-semibold mb-5 text-brand-black dark:text-white">Order Summary</h2>
          <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1 mb-4">
            {cart.map((line) => (
              <div key={`${line.id}-${line.size}-${line.color}`} className="flex gap-3">
                <img src={line.image} alt={line.name} className="w-12 h-14 object-cover rounded-lg" />
                <div className="flex-1 text-xs">
                  <p className="font-medium">{line.name}</p>
                  <p className="text-brand-gray-400">Qty {line.quantity}</p>
                </div>
                <p className="text-sm font-medium">{formatPrice(line.price * line.quantity)}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 text-sm font-body border-t border-brand-gray-200 dark:border-brand-gray-700 pt-4">
            <div className="flex justify-between text-brand-gray-600 dark:text-brand-gray-300">
              <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span><span>-{formatPrice(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-brand-gray-600 dark:text-brand-gray-300">
              <span>Shipping</span><span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between font-heading font-semibold text-base text-brand-black dark:text-white pt-3 mt-1 border-t border-brand-gray-200 dark:border-brand-gray-700">
              <span>Total</span><span>{formatPrice(total)}</span>
            </div>
          </div>
          <button
            type="submit"
            disabled={placing}
            className="btn-ripple w-full mt-6 flex items-center justify-center gap-2 bg-brand-black dark:bg-white text-white dark:text-brand-black font-semibold py-3.5 rounded-full hover:bg-brand-blue dark:hover:bg-brand-blue dark:hover:text-white transition-colors disabled:opacity-60"
          >
            {placing ? 'Placing Order...' : (<><FiCheckCircle /> Place Order</>)}
          </button>
        </div>
      </form>
    </div>
  );
}
