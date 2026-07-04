import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiLogOut, FiMapPin, FiPackage, FiUser } from 'react-icons/fi';
import { useWishlist } from '../../context/WishlistContext';

const TABS = [
  { id: 'profile', label: 'Profile', icon: <FiUser /> },
  { id: 'orders', label: 'Orders', icon: <FiPackage /> },
  { id: 'addresses', label: 'Addresses', icon: <FiMapPin /> },
  { id: 'wishlist', label: 'Wishlist', icon: <FiHeart /> },
];

export default function MyAccount() {
  const [activeTab, setActiveTab] = useState('profile');
  const { wishlist } = useWishlist();

  return (
    <div className="container-x py-10">
      <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-8 text-brand-black dark:text-white">My Account</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
        <aside className="flex lg:flex-col gap-2 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-brand-black text-white dark:bg-white dark:text-brand-black'
                  : 'text-brand-gray-600 dark:text-brand-gray-300 hover:bg-brand-gray-100 dark:hover:bg-brand-gray-800'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-brand-red hover:bg-red-50 dark:hover:bg-red-900/20">
            <FiLogOut /> Logout
          </button>
        </aside>

        <div className="border border-brand-gray-200 dark:border-brand-gray-800 rounded-2xl p-6">
          {activeTab === 'profile' && (
            <div className="flex flex-col gap-4 max-w-sm">
              <h2 className="font-heading text-lg font-semibold mb-2">Profile Details</h2>
              <input defaultValue="Jane Doe" className="input-field" placeholder="Full Name" />
              <input defaultValue="jane.doe@example.com" className="input-field" placeholder="Email" />
              <input defaultValue="+1 555 123 4567" className="input-field" placeholder="Phone" />
              <button className="btn-ripple w-fit bg-brand-black dark:bg-white text-white dark:text-brand-black text-sm font-semibold px-6 py-2.5 rounded-full mt-2">
                Save Changes
              </button>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 className="font-heading text-lg font-semibold mb-4">Order History</h2>
              <p className="text-sm text-brand-gray-500">You haven't placed any orders yet. <Link to="/shop" className="text-brand-blue hover:underline">Start shopping</Link>.</p>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div>
              <h2 className="font-heading text-lg font-semibold mb-4">Saved Addresses</h2>
              <p className="text-sm text-brand-gray-500">No saved addresses yet. Add one during checkout to see it here.</p>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div>
              <h2 className="font-heading text-lg font-semibold mb-4">Wishlist ({wishlist.length})</h2>
              {wishlist.length === 0 ? (
                <p className="text-sm text-brand-gray-500">Your wishlist is empty. <Link to="/shop" className="text-brand-blue hover:underline">Browse products</Link>.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {wishlist.map((item) => (
                    <Link key={item.id} to={`/product/${item.id}`} className="block">
                      <img src={item.image} alt={item.name} className="aspect-[3/4] object-cover rounded-xl mb-2" />
                      <p className="text-xs font-medium line-clamp-1">{item.name}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
