import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/Hero/Hero';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import ProductCard from '../../components/ProductCard/ProductCard';
import QuickViewModal from '../../components/QuickViewModal/QuickViewModal';
import Brands from '../../components/Brands/Brands';
import Newsletter from '../../components/Newsletter/Newsletter';
import { categories } from '../../data/categories';
import { products } from '../../data/products';

const TABS = ['All', 'Women', 'Men', 'Kids'];

export default function Home() {
  const [activeTab, setActiveTab] = useState('All');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const flashSaleProducts = useMemo(
    () => products.filter((p) => p.discount > 0).slice(0, 8),
    []
  );

  const trendingProducts = useMemo(() => {
    const sorted = [...products].sort((a, b) => b.popularity - a.popularity);
    if (activeTab === 'All') return sorted.slice(0, 8);
    return sorted.filter((p) => p.gender === activeTab.toLowerCase()).slice(0, 8);
  }, [activeTab]);

  return (
    <div>
      <Hero />

      {/* Categories */}
      <section className="py-16 container-x">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-black dark:text-white">
            Shop by Category
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Flash Sale */}
      <section className="py-16 bg-brand-gray-50 dark:bg-brand-gray-900/40">
        <div className="container-x">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-black dark:text-white">
              🔥 Mid Year Sale
            </h2>
            <Link to="/shop" className="text-sm font-medium text-brand-blue hover:underline">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {flashSaleProducts.map((product) => (
              <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="py-16 container-x">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-black dark:text-white">
            Trending Products
          </h2>
          <div className="flex gap-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full border transition-colors ${
                  activeTab === tab
                    ? 'bg-brand-black text-white border-brand-black dark:bg-white dark:text-brand-black'
                    : 'border-brand-gray-300 dark:border-brand-gray-600 text-brand-gray-600 dark:text-brand-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
          ))}
        </div>
      </section>

      <Brands />
      <Newsletter />

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}
