import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiYoutube } from 'react-icons/fi';
import { FaTiktok } from 'react-icons/fa';

const COLUMNS = [
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Careers', to: '/about' },
      { label: 'Privacy Policy', to: '/about' },
      { label: 'Terms of Service', to: '/about' },
    ],
  },
  {
    title: 'Customer Service',
    links: [
      { label: 'Contact Us', to: '/contact' },
      { label: 'Shipping Info', to: '/contact' },
      { label: 'Returns', to: '/contact' },
      { label: 'FAQ', to: '/contact' },
    ],
  },
  {
    title: 'Shop',
    links: [
      { label: 'Women', to: '/shop?gender=women' },
      { label: 'Men', to: '/shop?gender=men' },
      { label: 'Kids', to: '/shop?gender=kids' },
      { label: 'Accessories', to: '/shop?category=accessories' },
    ],
  },
];

const SOCIALS = [
  { icon: <FiFacebook />, href: 'https://facebook.com' },
  { icon: <FiInstagram />, href: 'https://instagram.com' },
  { icon: <FaTiktok />, href: 'https://tiktok.com' },
  { icon: <FiYoutube />, href: 'https://youtube.com' },
];

export default function Footer() {
  return (
    <footer className="bg-brand-gray-50 dark:bg-brand-gray-900 border-t border-brand-gray-200 dark:border-brand-gray-800 pt-14 pb-8">
      <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="font-heading text-2xl font-bold text-brand-black dark:text-white">LUXE</Link>
          <p className="mt-3 text-sm text-brand-gray-500 dark:text-brand-gray-400 font-body max-w-xs">
            Modern essentials for every wardrobe, designed to last beyond the season.
          </p>
          <div className="flex gap-3 mt-5">
            {SOCIALS.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-brand-gray-300 dark:border-brand-gray-700 text-brand-gray-600 dark:text-brand-gray-300 hover:bg-brand-black hover:text-white dark:hover:bg-white dark:hover:text-brand-black transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wide mb-4 text-brand-black dark:text-white">
              {col.title}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm font-body text-brand-gray-500 dark:text-brand-gray-400 hover:text-brand-black dark:hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container-x mt-12 pt-6 border-t border-brand-gray-200 dark:border-brand-gray-800 text-center text-xs text-brand-gray-400 font-body">
        © {new Date().getFullYear()} LUXE Fashion Store. All rights reserved.
      </div>
    </footer>
  );
}
