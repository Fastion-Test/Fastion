import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container-x py-24 text-center flex flex-col items-center">
      <h1 className="font-heading text-7xl sm:text-8xl font-bold text-brand-black dark:text-white mb-4">404</h1>
      <p className="text-lg font-heading font-semibold mb-2 text-brand-black dark:text-white">Page not found</p>
      <p className="text-sm text-brand-gray-500 mb-8 max-w-sm">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link
        to="/"
        className="btn-ripple inline-block bg-brand-black dark:bg-white text-white dark:text-brand-black font-semibold px-7 py-3 rounded-full hover:bg-brand-blue dark:hover:bg-brand-blue dark:hover:text-white transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
