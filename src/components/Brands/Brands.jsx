import { brands } from '../../data/categories';

export default function Brands() {
  return (
    <section className="py-14 bg-brand-gray-50 dark:bg-brand-gray-900/40">
      <div className="container-x">
        <h2 className="text-center font-heading text-xl sm:text-2xl font-semibold mb-8 text-brand-black dark:text-white">
          Featured Brands
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {brands.map((brand) => (
            <div
              key={brand}
              className="flex items-center justify-center h-20 rounded-xl border border-brand-gray-200 dark:border-brand-gray-700 bg-white dark:bg-brand-gray-800 text-brand-gray-500 dark:text-brand-gray-300 font-heading text-sm sm:text-base font-semibold tracking-wide hover:border-brand-black dark:hover:border-white transition-colors"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
