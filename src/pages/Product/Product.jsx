import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiHeart, FiMinus, FiPlus, FiStar } from 'react-icons/fi';
import { getProductById, getRelatedProducts, products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import useRecentlyViewed from '../../hooks/useRecentlyViewed';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import QuickViewModal from '../../components/QuickViewModal/QuickViewModal';
import { formatPrice } from '../../utils/format';

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const { recentIds, addRecentlyViewed } = useRecentlyViewed();

  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState(product?.size?.[0]);
  const [color, setColor] = useState(product?.color?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product.id);
      setActiveImage(0);
      setSize(product.size?.[0]);
      setColor(product.color?.[0]);
      setQuantity(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!product) {
    return (
      <div className="container-x py-24 text-center">
        <p className="text-xl font-heading font-semibold mb-3">Product not found</p>
        <Link to="/shop" className="text-brand-blue hover:underline">Back to shop</Link>
      </div>
    );
  }

  const related = getRelatedProducts(product);
  const recentlyViewed = products.filter((p) => recentIds.includes(p.id) && p.id !== product.id);

  return (
    <div className="container-x py-10">
      <nav className="text-xs text-brand-gray-500 mb-6 font-body">
        <Link to="/">Home</Link> / <Link to={`/shop?category=${product.category}`} className="capitalize">{product.category}</Link> / <span className="text-brand-black dark:text-white">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Gallery */}
        <div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-brand-gray-100 dark:bg-brand-gray-800 mb-4 group">
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-125 cursor-zoom-in"
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`aspect-square rounded-lg overflow-hidden border-2 ${activeImage === i ? 'border-brand-black dark:border-white' : 'border-transparent'}`}
              >
                <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-xs uppercase tracking-wide text-brand-gray-400 mb-1">{product.brand}</p>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-brand-black dark:text-white mb-3">
            {product.name}
          </h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1 text-amber-500 text-sm">
              <FiStar className="fill-amber-500" /> {product.rating}
            </div>
            <span className="text-brand-gray-300">•</span>
            <span className="text-sm text-brand-gray-500">{product.stock} in stock</span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-heading font-semibold text-brand-black dark:text-white">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice > 0 && (
              <>
                <span className="text-base text-brand-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
                <span className="bg-brand-red text-white text-xs font-semibold px-2 py-1 rounded-full">
                  -{product.discount}%
                </span>
              </>
            )}
          </div>

          <p className="text-sm text-brand-gray-600 dark:text-brand-gray-300 font-body leading-relaxed mb-6">
            {product.description}
          </p>

          {product.color?.[0] !== '—' && (
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wide mb-2">Color: {color}</p>
              <div className="flex gap-2">
                {product.color.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`px-4 py-2 text-xs rounded-full border ${color === c ? 'bg-brand-black text-white border-brand-black dark:bg-white dark:text-brand-black' : 'border-brand-gray-300 dark:border-brand-gray-600'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.size?.[0] !== 'One Size' && (
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wide mb-2">Size: {size}</p>
              <div className="flex flex-wrap gap-2">
                {product.size.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`w-11 h-11 flex items-center justify-center text-xs rounded-full border ${size === s ? 'bg-brand-black text-white border-brand-black dark:bg-white dark:text-brand-black' : 'border-brand-gray-300 dark:border-brand-gray-600'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-wide mb-2">Quantity</p>
            <div className="flex items-center gap-3 border border-brand-gray-300 dark:border-brand-gray-600 rounded-full w-fit px-2">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="p-2" aria-label="Decrease quantity"><FiMinus size={14} /></button>
              <span className="w-6 text-center text-sm font-medium">{quantity}</span>
              <button onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))} className="p-2" aria-label="Increase quantity"><FiPlus size={14} /></button>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => addToCart(product, { size, color, quantity })}
              className="btn-ripple flex-1 bg-brand-black dark:bg-white text-white dark:text-brand-black font-semibold py-3.5 rounded-full hover:bg-brand-blue dark:hover:bg-brand-blue dark:hover:text-white transition-colors"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product, { size, color, quantity });
                navigate('/checkout');
              }}
              className="btn-ripple flex-1 bg-brand-blue text-white font-semibold py-3.5 rounded-full hover:bg-blue-700 transition-colors"
            >
              Buy Now
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              aria-label="Toggle wishlist"
              className="w-14 h-14 flex items-center justify-center rounded-full border border-brand-gray-300 dark:border-brand-gray-600 shrink-0"
            >
              <FiHeart className={isWishlisted(product.id) ? 'fill-brand-red text-brand-red' : ''} />
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-heading text-2xl font-bold mb-6 text-brand-black dark:text-white">Related Products</h2>
          <ProductSlider products={related} onQuickView={setQuickViewProduct} />
        </section>
      )}

      {recentlyViewed.length > 0 && (
        <section className="mt-16">
          <h2 className="font-heading text-2xl font-bold mb-6 text-brand-black dark:text-white">Recently Viewed</h2>
          <ProductSlider products={recentlyViewed} onQuickView={setQuickViewProduct} />
        </section>
      )}

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}
