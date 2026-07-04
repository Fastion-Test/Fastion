import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const SLIDES = [
  {
    id: 1,
    image: 'https://picsum.photos/seed/hero-1/1800/900',
    eyebrow: 'New Season',
    title: 'Mid Year Sale — Up to 50% Off',
    subtitle: 'Refresh your wardrobe with the pieces everyone is wearing right now.',
    cta: '/shop',
  },
  {
    id: 2,
    image: 'https://picsum.photos/seed/hero-2/1800/900',
    eyebrow: 'Just Landed',
    title: 'The Autumn Tailoring Edit',
    subtitle: 'Structured coats and clean lines, made to last beyond one season.',
    cta: '/shop?category=women',
  },
  {
    id: 3,
    image: 'https://picsum.photos/seed/hero-3/1800/900',
    eyebrow: 'Street Ready',
    title: 'Sneakers & Streetwear Drop',
    subtitle: 'Everyday essentials built for movement, styled for the city.',
    cta: '/shop?category=shoes',
  },
];

export default function Hero() {
  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="h-[70vh] min-h-[420px] max-h-[720px] w-full"
      >
        {SLIDES.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 h-full container-x flex flex-col justify-center max-w-2xl">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="text-white/80 uppercase tracking-[0.2em] text-xs sm:text-sm font-body mb-3"
                >
                  {slide.eyebrow}
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-white font-heading text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4"
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-white/90 font-body text-sm sm:text-base mb-7 max-w-md"
                >
                  {slide.subtitle}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <Link
                    to={slide.cta}
                    className="btn-ripple inline-block bg-white text-brand-black font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-brand-blue hover:text-white transition-colors"
                  >
                    Shop Now
                  </Link>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
