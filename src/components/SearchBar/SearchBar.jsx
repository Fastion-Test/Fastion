import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { products } from '../../data/products';

export default function SearchBar({ compact = false, onSubmitDone }) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products
      .filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q))
      .slice(0, 5);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    setFocused(false);
    onSubmitDone?.();
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Search products, brands..."
          className={`w-full ${compact ? 'py-1.5 text-sm' : 'py-2.5 text-base'} pl-9 pr-3 rounded-full border border-brand-gray-200 dark:border-brand-gray-700 bg-brand-gray-50 dark:bg-brand-gray-800 text-brand-black dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-blue/40`}
        />
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-400" />
      </form>
      {focused && suggestions.length > 0 && (
        <ul className="absolute mt-2 w-full bg-white dark:bg-brand-gray-900 border border-brand-gray-200 dark:border-brand-gray-700 rounded-xl shadow-lg overflow-hidden z-50">
          {suggestions.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => {
                  navigate(`/product/${p.id}`);
                  setQuery('');
                  onSubmitDone?.();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-brand-gray-50 dark:hover:bg-brand-gray-800"
              >
                <img src={p.thumbnail} alt={p.name} className="w-9 h-9 rounded-md object-cover" loading="lazy" />
                <div className="min-w-0">
                  <p className="text-sm font-body font-medium truncate">{p.name}</p>
                  <p className="text-xs text-brand-gray-500">{p.brand}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
