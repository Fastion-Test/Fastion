import { brands } from './categories';

// Helper to build a set of placeholder gallery images with a stable seed
const gallery = (seed, count = 4) =>
  Array.from({ length: count }, (_, i) => `https://picsum.photos/seed/${seed}-${i}/900/1100`);

const raw = [
  { name: 'Oversized Wool Coat', brand: brands[0], price: 189.99, oldPrice: 249.99, category: 'women', gender: 'women', desc: 'A relaxed-fit wool-blend coat with a deep collar and horn buttons. Built for layering through the colder months without losing shape.', sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Black', 'Camel'], rating: 4.6, stock: 24 },
  { name: 'Ribbed Knit Sweater', brand: brands[5], price: 59.99, oldPrice: 79.99, category: 'women', gender: 'women', desc: 'Soft ribbed knit with a relaxed crew neck, finished with dropped shoulders for an easy, everyday silhouette.', sizes: ['XS', 'S', 'M', 'L'], colors: ['Cream', 'Charcoal', 'Rust'], rating: 4.4, stock: 40 },
  { name: 'Pleated Midi Skirt', brand: brands[2], price: 69.99, oldPrice: 0, category: 'women', gender: 'women', desc: 'Fluid pleats that move with every step, paired with a high waistband for a polished, elongated line.', sizes: ['XS', 'S', 'M', 'L'], colors: ['Black', 'Olive'], rating: 4.2, stock: 30 },
  { name: 'Satin Slip Dress', brand: brands[8], price: 89.99, oldPrice: 119.99, category: 'women', gender: 'women', desc: 'Bias-cut satin dress with adjustable straps, designed to fall effortlessly along the body.', sizes: ['XS', 'S', 'M', 'L'], colors: ['Champagne', 'Black'], rating: 4.7, stock: 18 },
  { name: 'Tailored Wide-Leg Trousers', brand: brands[7], price: 79.99, oldPrice: 99.99, category: 'women', gender: 'women', desc: 'Sharp tailoring meets a fluid wide leg, cut from a mid-weight suiting fabric that holds its structure.', sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['Black', 'Grey'], rating: 4.5, stock: 26 },
  { name: 'Cropped Denim Jacket', brand: brands[4], price: 64.99, oldPrice: 0, category: 'women', gender: 'women', desc: 'A cropped take on the classic trucker jacket, finished with raw hem edges and antique-brass hardware.', sizes: ['XS', 'S', 'M', 'L'], colors: ['Light Wash', 'Dark Wash'], rating: 4.3, stock: 33 },
  { name: 'Linen Blend Blazer', brand: brands[0], price: 109.99, oldPrice: 139.99, category: 'women', gender: 'women', desc: 'Unstructured blazer in a breathable linen blend, cut with soft shoulders and a single button close.', sizes: ['XS', 'S', 'M', 'L'], colors: ['Stone', 'Navy'], rating: 4.5, stock: 20 },
  { name: 'Essential Cotton Tee', brand: brands[5], price: 24.99, oldPrice: 0, category: 'women', gender: 'women', desc: 'Heavyweight cotton tee with a boxy fit and clean crew neckline. A wardrobe staple in every rotation.', sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['White', 'Black', 'Sage'], rating: 4.1, stock: 60 },

  { name: 'Classic Oxford Shirt', brand: brands[6], price: 54.99, oldPrice: 69.99, category: 'men', gender: 'men', desc: 'Crisp cotton oxford shirt with a button-down collar, tailored for a clean fit through the shoulders.', sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['White', 'Light Blue'], rating: 4.4, stock: 45 },
  { name: 'Slim Fit Chinos', brand: brands[7], price: 49.99, oldPrice: 0, category: 'men', gender: 'men', desc: 'Stretch cotton chinos with a slim leg and clean front, built to move between desk and dinner.', sizes: ['30', '32', '34', '36', '38'], colors: ['Khaki', 'Navy', 'Black'], rating: 4.3, stock: 50 },
  { name: 'Merino Wool Jumper', brand: brands[5], price: 84.99, oldPrice: 104.99, category: 'men', gender: 'men', desc: 'Fine-gauge merino jumper that regulates temperature naturally, styled with a straight hem and ribbed cuffs.', sizes: ['S', 'M', 'L', 'XL'], colors: ['Charcoal', 'Bottle Green'], rating: 4.6, stock: 28 },
  { name: 'Denim Trucker Jacket', brand: brands[4], price: 79.99, oldPrice: 0, category: 'men', gender: 'men', desc: 'A rigid denim jacket built on the original trucker silhouette, made to soften and fade with wear.', sizes: ['S', 'M', 'L', 'XL'], colors: ['Indigo'], rating: 4.5, stock: 22 },
  { name: 'Tailored Suit Blazer', brand: brands[0], price: 199.99, oldPrice: 259.99, category: 'men', gender: 'men', desc: 'Structured two-button blazer cut from a fine wool blend, finished with a half-canvas construction.', sizes: ['38', '40', '42', '44'], colors: ['Charcoal', 'Navy'], rating: 4.7, stock: 15 },
  { name: 'Graphic Print Hoodie', brand: brands[9], price: 44.99, oldPrice: 59.99, category: 'men', gender: 'men', desc: 'Heavyweight fleece hoodie with a front kangaroo pocket and an understated back print.', sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Black', 'Heather Grey'], rating: 4.2, stock: 55 },
  { name: 'Cargo Utility Pants', brand: brands[9], price: 59.99, oldPrice: 0, category: 'men', gender: 'men', desc: 'Relaxed utility pants with multiple pockets and an adjustable waistband, built from ripstop cotton.', sizes: ['30', '32', '34', '36'], colors: ['Olive', 'Black'], rating: 4.3, stock: 38 },
  { name: 'Essential Crewneck Tee', brand: brands[5], price: 22.99, oldPrice: 0, category: 'men', gender: 'men', desc: 'A midweight cotton tee with a clean crew neckline, cut for a comfortable, true-to-size fit.', sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['White', 'Black', 'Navy'], rating: 4.0, stock: 70 },

  { name: 'Dino Print Sweatshirt', brand: brands[9], price: 29.99, oldPrice: 39.99, category: 'kids', gender: 'kids', desc: 'Soft brushed-fleece sweatshirt with a playful dino print, made for everyday adventures.', sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'], colors: ['Blue', 'Grey'], rating: 4.5, stock: 35 },
  { name: 'Cotton Overall Set', brand: brands[6], price: 34.99, oldPrice: 0, category: 'kids', gender: 'kids', desc: 'A two-piece cotton overall set with adjustable straps and stretch waistband for all-day comfort.', sizes: ['1-2Y', '2-3Y', '4-5Y'], colors: ['Denim Blue'], rating: 4.4, stock: 26 },
  { name: 'Striped Tee & Shorts Set', brand: brands[5], price: 27.99, oldPrice: 34.99, category: 'kids', gender: 'kids', desc: 'Breathable cotton tee and shorts set in a classic stripe, perfect for warm-weather play.', sizes: ['2-3Y', '4-5Y', '6-7Y'], colors: ['Red Stripe', 'Navy Stripe'], rating: 4.3, stock: 40 },
  { name: 'Kids Puffer Jacket', brand: brands[0], price: 49.99, oldPrice: 64.99, category: 'kids', gender: 'kids', desc: 'Lightweight quilted puffer with a foldaway hood, insulated for chilly school runs.', sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y'], colors: ['Yellow', 'Navy'], rating: 4.6, stock: 20 },
  { name: 'Unicorn Print Leggings', brand: brands[8], price: 18.99, oldPrice: 0, category: 'kids', gender: 'kids', desc: 'Stretch jersey leggings with an all-over unicorn print and a comfortable elastic waist.', sizes: ['2-3Y', '4-5Y', '6-7Y'], colors: ['Pink'], rating: 4.2, stock: 45 },

  { name: 'Classic Leather Sneakers', brand: brands[3], price: 94.99, oldPrice: 119.99, category: 'shoes', gender: 'unisex', desc: 'Minimal leather sneakers on a cupsole base, designed to pair cleanly with almost anything.', sizes: ['38', '39', '40', '41', '42', '43', '44'], colors: ['White', 'Black'], rating: 4.6, stock: 42 },
  { name: 'Chunky Running Shoes', brand: brands[9], price: 109.99, oldPrice: 0, category: 'shoes', gender: 'unisex', desc: 'Responsive foam midsole with a breathable knit upper, tuned for daily mileage.', sizes: ['39', '40', '41', '42', '43', '44', '45'], colors: ['Grey/Volt', 'Black/White'], rating: 4.5, stock: 30 },
  { name: 'Suede Chelsea Boots', brand: brands[6], price: 129.99, oldPrice: 159.99, category: 'shoes', gender: 'men', desc: 'Elastic-sided Chelsea boots in soft suede, finished with a stacked block heel.', sizes: ['40', '41', '42', '43', '44'], colors: ['Tan', 'Black'], rating: 4.7, stock: 18 },
  { name: 'Strappy Block Heels', brand: brands[8], price: 74.99, oldPrice: 94.99, category: 'shoes', gender: 'women', desc: 'A comfortable block heel with adjustable ankle straps, built for long days on your feet.', sizes: ['36', '37', '38', '39', '40'], colors: ['Black', 'Nude'], rating: 4.3, stock: 24 },
  { name: 'Canvas Slip-Ons', brand: brands[5], price: 39.99, oldPrice: 0, category: 'shoes', gender: 'unisex', desc: 'Easy slip-on canvas shoes with an elasticated vamp and a cushioned footbed.', sizes: ['38', '39', '40', '41', '42'], colors: ['White', 'Navy'], rating: 4.1, stock: 50 },

  { name: 'Structured Tote Bag', brand: brands[2], price: 89.99, oldPrice: 0, category: 'bags', gender: 'women', desc: 'A structured tote in vegetable-tanned leather with an interior zip pocket and magnetic close.', sizes: ['One Size'], colors: ['Tan', 'Black'], rating: 4.6, stock: 20 },
  { name: 'Minimalist Crossbody', brand: brands[6], price: 54.99, oldPrice: 69.99, category: 'bags', gender: 'women', desc: 'A compact crossbody with an adjustable strap, sized for the essentials and nothing more.', sizes: ['One Size'], colors: ['Black', 'Cream'], rating: 4.4, stock: 32 },
  { name: 'Canvas Weekender Duffel', brand: brands[3], price: 74.99, oldPrice: 94.99, category: 'bags', gender: 'unisex', desc: 'A durable canvas duffel with leather trims, sized to clear most airline carry-on limits.', sizes: ['One Size'], colors: ['Olive', 'Grey'], rating: 4.5, stock: 16 },
  { name: 'Leather Laptop Backpack', brand: brands[6], price: 99.99, oldPrice: 0, category: 'bags', gender: 'men', desc: 'A padded laptop compartment wrapped in full-grain leather panels, built for daily commuting.', sizes: ['One Size'], colors: ['Brown', 'Black'], rating: 4.6, stock: 22 },

  { name: 'Aviator Sunglasses', brand: brands[3], price: 34.99, oldPrice: 44.99, category: 'accessories', gender: 'unisex', desc: 'Classic aviator frames with polarized lenses and thin metal arms.', sizes: ['One Size'], colors: ['Gold/Green', 'Silver/Grey'], rating: 4.3, stock: 60 },
  { name: 'Fine Chain Necklace', brand: brands[8], price: 29.99, oldPrice: 0, category: 'accessories', gender: 'women', desc: 'A delicate 18k gold-plated chain necklace with a secure lobster clasp.', sizes: ['One Size'], colors: ['Gold', 'Silver'], rating: 4.5, stock: 45 },
  { name: 'Leather Woven Belt', brand: brands[7], price: 39.99, oldPrice: 49.99, category: 'accessories', gender: 'men', desc: 'A hand-woven leather belt with a matte brass buckle, sized to trim if needed.', sizes: ['S', 'M', 'L', 'XL'], colors: ['Brown', 'Black'], rating: 4.2, stock: 34 },
  { name: 'Wool Beanie', brand: brands[5], price: 19.99, oldPrice: 0, category: 'accessories', gender: 'unisex', desc: 'A ribbed wool-blend beanie with a folded cuff, made to keep its shape wash after wash.', sizes: ['One Size'], colors: ['Charcoal', 'Camel', 'Black'], rating: 4.4, stock: 55 },

  { name: 'Hydrating Face Serum', brand: brands[8], price: 32.99, oldPrice: 39.99, category: 'beauty', gender: 'unisex', desc: 'A lightweight serum with hyaluronic acid, formulated to hydrate without a heavy finish.', sizes: ['30ml'], colors: ['—'], rating: 4.6, stock: 48 },
  { name: 'Matte Lipstick Duo', brand: brands[2], price: 24.99, oldPrice: 0, category: 'beauty', gender: 'women', desc: 'A two-pack of long-wear matte lipsticks in versatile everyday shades.', sizes: ['One Size'], colors: ['Rosewood/Terracotta'], rating: 4.3, stock: 40 },
  { name: 'Restorative Hair Mask', brand: brands[8], price: 27.99, oldPrice: 34.99, category: 'beauty', gender: 'unisex', desc: 'A deep-conditioning mask formulated with argan oil to repair and restore shine.', sizes: ['200ml'], colors: ['—'], rating: 4.5, stock: 30 },
  { name: 'Mineral Sunscreen SPF50', brand: brands[8], price: 22.99, oldPrice: 0, category: 'beauty', gender: 'unisex', desc: 'A broad-spectrum mineral sunscreen that sits invisibly under makeup.', sizes: ['50ml'], colors: ['—'], rating: 4.7, stock: 52 },
];

export const products = raw.map((p, index) => {
  const id = index + 1;
  const seed = `product-${id}`;
  const discount = p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;
  return {
    id,
    name: p.name,
    brand: p.brand,
    price: p.price,
    oldPrice: p.oldPrice || 0,
    discount,
    rating: p.rating,
    category: p.category,
    gender: p.gender,
    description: p.desc,
    size: p.sizes,
    color: p.colors,
    stock: p.stock,
    images: gallery(seed),
    thumbnail: `https://picsum.photos/seed/${seed}-0/900/1100`,
    createdAt: new Date(Date.now() - index * 86400000 * 3).toISOString(),
    popularity: Math.round((p.rating / 5) * 100 - index * 0.7),
  };
});

export const getProductById = (id) => products.find((p) => String(p.id) === String(id));

export const getRelatedProducts = (product, limit = 8) =>
  products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit);
