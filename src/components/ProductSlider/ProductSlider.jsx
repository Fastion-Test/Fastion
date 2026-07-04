import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ProductCard from '../ProductCard/ProductCard';

export default function ProductSlider({ products, onQuickView }) {
  if (!products?.length) return null;

  return (
    <Swiper
      modules={[Navigation]}
      navigation
      spaceBetween={16}
      slidesPerView={2}
      breakpoints={{
        640: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
        1280: { slidesPerView: 5 },
      }}
      className="!pb-2 product-slider"
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <ProductCard product={product} onQuickView={onQuickView} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
