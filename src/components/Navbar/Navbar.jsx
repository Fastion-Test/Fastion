import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiHeart, FiMenu, FiMoon, FiSearch, FiShoppingBag, FiSun, FiUser, FiX } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';
import SearchBar from '../SearchBar/SearchBar';

const NAV_LINKS = [
  { label: 'Women', to: '/shop?gender=women' },
  { label: 'Men', to: '/shop?gender=men' },
  { label: 'Kids', to: '/shop?gender=kids' },
  { label: 'Home', to: '/' },
  { label: 'Lifestyle', to: '/shop?category=accessories' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount } = useCart();
  const { wishlist } = useWishlist();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-brand-black/90 backdrop-blur border-b border-brand-gray-200 dark:border-brand-gray-800">
      <div className="container-x flex items-center justify-between h-16 lg:h-20 gap-4">
        {/* Left: desktop nav links */}
        <nav className="hidden lg:flex items-center gap-7 flex-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm font-medium font-body tracking-wide text-brand-black dark:text-white hover:text-brand-blue transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-2xl text-brand-black dark:text-white"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <FiMenu />
        </button>

        {/* Center logo */}
        <Link to="/" className="font-heading text-2xl lg:text-3xl font-bold tracking-tight text-brand-black dark:text-white select-none">
          LUXE
        </Link>

        {/* Right: search, wishlist, cart, auth */}
        <div className="flex items-center justify-end gap-3 lg:gap-5 flex-1">
          <div className="hidden md:block w-56">
            <SearchBar compact />
          </div>
          <button
            className="md:hidden text-xl text-brand-black dark:text-white"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
          >
            <FiSearch />
          </button>
          <button
            onClick={toggleTheme}
            className="hidden sm:inline-flex text-xl text-brand-black dark:text-white"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
          <Link to="/wishlist" className="relative text-xl text-brand-black dark:text-white" aria-label="Wishlist">
            <FiHeart />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-red text-white text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative text-xl text-brand-black dark:text-white" aria-label="Cart">
            <FiShoppingBag />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-blue text-white text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <div className="hidden lg:flex items-center gap-4 text-sm font-medium font-body">
            <Link to="/login" className="hover:text-brand-blue transition-colors">Login</Link>
            <span className="text-brand-gray-300">/</span>
            <Link to="/register" className="hover:text-brand-blue transition-colors">Register</Link>
          </div>
          <Link to="/account" className="lg:hidden text-xl text-brand-black dark:text-white" aria-label="Account">
            <FiUser />
          </Link>
        </div>
      </div>

      {/* Mobile search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-brand-gray-200 dark:border-brand-gray-800"
          >
            <div className="container-x py-3 flex items-center gap-2">
              <SearchBar compact onSubmitDone={() => setSearchOpen(false)} />
              <button onClick={() => setSearchOpen(false)} aria-label="Close search">
                <FiX className="text-xl" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile slide-in menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 left-0 h-full w-72 bg-white dark:bg-brand-gray-900 z-50 p-6 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <span className="font-heading text-xl font-bold">LUXE</span>
                <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                  <FiX className="text-xl" />
                </button>
              </div>
              <nav className="flex flex-col gap-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className="text-base font-medium font-body text-brand-black dark:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <hr className="border-brand-gray-200 dark:border-brand-gray-700" />
              <div className="flex flex-col gap-4 text-sm font-body">
                <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
                <Link to="/account" onClick={() => setMenuOpen(false)}>My Account</Link>
                <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
                <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
              </div>
              <button
                onClick={toggleTheme}
                className="mt-auto flex items-center gap-2 text-sm font-body"
              >
                {theme === 'dark' ? <FiSun /> : <FiMoon />} Toggle theme
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
