import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CategoryCard({ category }) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
      <Link
        to={`/shop?category=${category.id}`}
        className="group relative block aspect-[4/5] rounded-2xl overflow-hidden bg-brand-gray-100 dark:bg-brand-gray-800"
      >
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <span className="absolute bottom-4 left-4 text-white font-heading text-lg font-semibold tracking-wide">
          {category.name}
        </span>
      </Link>
    </motion.div>
  );
}
