import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiX } from 'react-icons/fi';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductCardSkeleton from '../../components/Skeleton/ProductCardSkeleton';
import QuickViewModal from '../../components/QuickViewModal/QuickViewModal';
import { products } from '../../data/products';
import { categories, brands } from '../../data/categories';

const PAGE_SIZE = 9;
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'popularity', label: 'Popularity' },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);

  const search = searchParams.get('search') || '';
  const genderFilter = searchParams.get('gender') || '';
  const categoryFilter = searchParams.get('category') || '';
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(250);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [searchParams, selectedBrands, minRating, maxPrice, sortBy]);

  useEffect(() => {
    setPage(1);
  }, [searchParams, selectedBrands, minRating, maxPrice, sortBy]);

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]));
  };

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  };

  const filtered = useMemo(() => {
    let list = [...products];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }
    if (genderFilter) list = list.filter((p) => p.gender === genderFilter || p.gender === 'unisex');
    if (categoryFilter) list = list.filter((p) => p.category === categoryFilter);
    if (selectedBrands.length) list = list.filter((p) => selectedBrands.includes(p.brand));
    if (minRating) list = list.filter((p) => p.rating >= minRating);
    list = list.filter((p) => p.price <= maxPrice);

    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
        list.sort((a, b) => b.popularity - a.popularity);
        break;
      default:
        list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return list;
  }, [search, genderFilter, categoryFilter, selectedBrands, minRating, maxPrice, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const clearFilters = () => {
    setSelectedBrands([]);
    setMinRating(0);
    setMaxPrice(250);
    setSearchParams({});
  };

  const FilterPanel = (
    <div className="flex flex-col gap-8">
      <div>
        <h4 className="font-heading text-sm font-semibold mb-3 text-brand-black dark:text-white">Category</h4>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2 text-sm font-body cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={categoryFilter === cat.id}
                onChange={() => updateParam('category', cat.id)}
              />
              {cat.name}
            </label>
          ))}
          {categoryFilter && (
            <button onClick={() => updateParam('category', '')} className="text-xs text-brand-blue text-left mt-1 hover:underline">
              Clear category
            </button>
          )}
        </div>
      </div>

      <div>
        <h4 className="font-heading text-sm font-semibold mb-3 text-brand-black dark:text-white">Brand</h4>
        <div className="flex flex-col gap-2 max-h-44 overflow-y-auto pr-1">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 text-sm font-body cursor-pointer">
              <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} />
              {brand}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-heading text-sm font-semibold mb-3 text-brand-black dark:text-white">
          Max Price: ${maxPrice}
        </h4>
        <input
          type="range"
          min={20}
          max={250}
          step={5}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div>
        <h4 className="font-heading text-sm font-semibold mb-3 text-brand-black dark:text-white">Minimum Rating</h4>
        <div className="flex gap-2">
          {[4.5, 4, 3.5, 0].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`px-3 py-1.5 text-xs rounded-full border ${minRating === r ? 'bg-brand-black text-white border-brand-black dark:bg-white dark:text-brand-black' : 'border-brand-gray-300 dark:border-brand-gray-600'}`}
            >
              {r === 0 ? 'Any' : `${r}+`}
            </button>
          ))}
        </div>
      </div>

      <button onClick={clearFilters} className="text-sm font-medium text-brand-red hover:underline text-left">
        Clear all filters
      </button>
    </div>
  );

  return (
    <div className="container-x py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-brand-black dark:text-white">
            {search ? `Results for "${search}"` : 'Shop All'}
          </h1>
          <p className="text-sm text-brand-gray-500 mt-1">{filtered.length} products found</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-brand-gray-300 dark:border-brand-gray-700 bg-white dark:bg-brand-gray-800 rounded-full px-3 py-2 focus:outline-none"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <button
            onClick={() => setFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 text-sm border border-brand-gray-300 dark:border-brand-gray-700 rounded-full px-4 py-2"
          >
            <FiFilter /> Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
        <aside className="hidden lg:block">{FilterPanel}</aside>

        {filtersOpen && (
          <div className="fixed inset-0 z-[90] lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setFiltersOpen(false)} />
            <div className="absolute left-0 top-0 h-full w-80 bg-white dark:bg-brand-gray-900 p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading font-semibold">Filters</h3>
                <button onClick={() => setFiltersOpen(false)} aria-label="Close filters"><FiX /></button>
              </div>
              {FilterPanel}
            </div>
          </div>
        )}

        <div>
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          ) : paginated.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-lg font-heading font-semibold mb-2">No products found</p>
              <p className="text-sm text-brand-gray-500 mb-4">Try adjusting your filters or search terms.</p>
              <button onClick={clearFilters} className="text-brand-blue text-sm hover:underline">Clear filters</button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                {paginated.map((product) => (
                  <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`w-9 h-9 rounded-full text-sm font-medium ${
                        page === i + 1
                          ? 'bg-brand-black text-white dark:bg-white dark:text-brand-black'
                          : 'border border-brand-gray-300 dark:border-brand-gray-700 text-brand-gray-600 dark:text-brand-gray-300'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}
