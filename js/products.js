/**
 * ZENVORA - Product Catalog Data
 * Premium Pakistani Women's Fashion Brand
 */

const ZENVORA_PRODUCTS = [
  // -------------------------------------------------------------
  // NEW ARRIVALS (Core Collection)
  // -------------------------------------------------------------
  {
    id: "zen-001",
    name: "Lavender Luxe Co-Ord Set",
    category: "coord",
    categoryName: "Co-Ord Sets",
    price: 4999,
    originalPrice: null,
    badge: "NEW",
    rating: 4.9,
    reviewsCount: 38,
    image: "assets/images/hero_model.jpg",
    gallery: [
      "assets/images/hero_model.jpg",
      "assets/images/cat_coord.jpg",
      "assets/images/outfit_mauve_coord.jpg"
    ],
    colors: [
      { name: "Lavender Lilac", hex: "#9B72AA" },
      { name: "Deep Royal Purple", hex: "#5B2A86" },
      { name: "Soft Ivory", hex: "#FAF8F5" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "An effortlessly regal 2-piece co-ord set crafted from breathable premium cotton-silk blend. Features delicate neckline embroidery, scalloped cuffs, and matching fluid wide-leg trousers for modern modest luxury.",
    fabric: "80% Cotton Silk, 20% Fine Viscose",
    care: "Dry clean recommended or gentle cold hand wash. Iron inside out at low temperature.",
    inStock: true,
    isNewArrival: true,
    isBestseller: false,
    isSale: false,
    isInspo: false
  },
  {
    id: "zen-002",
    name: "Purple Serenity Co-Ord Set",
    category: "coord",
    categoryName: "Co-Ord Sets",
    price: 5499,
    originalPrice: null,
    badge: "NEW",
    rating: 5.0,
    reviewsCount: 42,
    image: "assets/images/cat_coord.jpg",
    gallery: [
      "assets/images/cat_coord.jpg",
      "assets/images/hero_model.jpg",
      "assets/images/outfit_marble_purple.jpg"
    ],
    colors: [
      { name: "Royal Purple", hex: "#5B2A86" },
      { name: "Plum Dusk", hex: "#4A1E5C" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Imbued with subtle ethnic geometry, the Purple Serenity Co-Ord boasts hand-block inspired motifs on a sleek silhouette, complemented by structured straight trousers.",
    fabric: "Premium Lawn Silk",
    care: "Gentle machine wash with mild detergent. Do not bleach. Line dry in shade.",
    inStock: true,
    isNewArrival: true,
    isBestseller: true,
    isSale: false,
    isInspo: false
  },
  {
    id: "zen-003",
    name: "Ivory Grace Maxi Dress",
    category: "dresses",
    categoryName: "Dresses",
    price: 5999,
    originalPrice: null,
    badge: "NEW",
    rating: 4.8,
    reviewsCount: 29,
    image: "assets/images/cat_dresses.jpg",
    gallery: [
      "assets/images/cat_dresses.jpg",
      "assets/images/outfit_ivory_burgundy.jpg"
    ],
    colors: [
      { name: "Ivory Cream", hex: "#FDFBF7" },
      { name: "Soft Lavender Bloom", hex: "#E9DDF2" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Flowing elegance redefined. Tailored in an ethereal ivory georgette with fine thread-work blossoms cascading along the bodice and hemline. Includes tonal slip.",
    fabric: "Fine Georgette Chiffon with Soft Viscose Lining",
    care: "Dry clean only to maintain embellishment luster.",
    inStock: true,
    isNewArrival: true,
    isBestseller: false,
    isSale: false,
    isInspo: false
  },
  {
    id: "zen-004",
    name: "Royal Bloom Printed Dress",
    category: "dresses",
    categoryName: "Dresses",
    price: 4799,
    originalPrice: null,
    badge: "NEW",
    rating: 4.7,
    reviewsCount: 31,
    image: "assets/images/promo_banner.jpg",
    gallery: [
      "assets/images/promo_banner.jpg",
      "assets/images/cat_dresses.jpg"
    ],
    colors: [
      { name: "Royal Purple", hex: "#5B2A86" },
      { name: "Midnight Violet", hex: "#3A1A56" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "A commanding presence for evening dinners and festive soirees. Dramatic flair with golden zari accents on rich purple chiffon drape.",
    fabric: "Textured Chiffon with Zari Borders",
    care: "Dry clean recommended.",
    inStock: true,
    isNewArrival: true,
    isBestseller: false,
    isSale: false,
    isInspo: false
  },
  {
    id: "zen-005",
    name: "Classic White Relaxed Shirt",
    category: "tops",
    categoryName: "Tops",
    price: 2999,
    originalPrice: null,
    badge: "NEW",
    rating: 4.9,
    reviewsCount: 56,
    image: "assets/images/cat_tops.jpg",
    gallery: [
      "assets/images/cat_tops.jpg",
      "assets/images/outfit_sage_coord.jpg"
    ],
    colors: [
      { name: "Crisp White", hex: "#FFFFFF" },
      { name: "Pale Lilac Accent", hex: "#EFE6F7" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "An everyday wardrobe essential with modern resort collar, lavender micro-embroidered placket, and breezy drop-shoulder silhouette.",
    fabric: "100% Breathable Egyptian Cotton",
    care: "Machine wash cold with like colors. Warm iron.",
    inStock: true,
    isNewArrival: true,
    isBestseller: true,
    isSale: false,
    isInspo: false
  },
  {
    id: "zen-006",
    name: "Lavender Oversized Shirt",
    category: "tops",
    categoryName: "Tops",
    price: 3299,
    originalPrice: null,
    badge: "NEW",
    rating: 4.8,
    reviewsCount: 27,
    image: "assets/images/outfit_mauve_coord.jpg",
    gallery: [
      "assets/images/outfit_mauve_coord.jpg",
      "assets/images/cat_tops.jpg"
    ],
    colors: [
      { name: "Dusty Lavender", hex: "#BDA0CB" },
      { name: "Lilac Mist", hex: "#D7C5E0" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Relaxed, effortless, and flattering. Cutwork embroidered side slits and sleeves make this oversized tunic a versatile day-to-night piece.",
    fabric: "Premium Slub Lawn",
    care: "Hand wash or gentle cycle in cold water.",
    inStock: true,
    isNewArrival: true,
    isBestseller: false,
    isSale: false,
    isInspo: false
  },
  {
    id: "zen-007",
    name: "Elegant Wide-Leg Trousers",
    category: "bottoms",
    categoryName: "Bottoms",
    price: 3499,
    originalPrice: null,
    badge: "NEW",
    rating: 4.9,
    reviewsCount: 44,
    image: "assets/images/cat_bottoms.jpg",
    gallery: [
      "assets/images/cat_bottoms.jpg",
      "assets/images/hero_model.jpg"
    ],
    colors: [
      { name: "Imperial Purple & Lavender", hex: "#5B2A86" },
      { name: "Off White", hex: "#F7F5F0" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Statement wide-leg palazzo pants with signature dual-tone paneling and intricate tilla border hem. Elasticated back waistband ensures bespoke comfort.",
    fabric: "High-Grade Raw Silk",
    care: "Dry clean only to maintain crisp pleat alignment.",
    inStock: true,
    isNewArrival: true,
    isBestseller: false,
    isSale: false,
    isInspo: false
  },
  {
    id: "zen-008",
    name: "Purple Comfort Pants",
    category: "bottoms",
    categoryName: "Bottoms",
    price: 2999,
    originalPrice: null,
    badge: "NEW",
    rating: 4.8,
    reviewsCount: 39,
    image: "assets/images/outfit_marble_purple.jpg",
    gallery: [
      "assets/images/outfit_marble_purple.jpg",
      "assets/images/cat_bottoms.jpg"
    ],
    colors: [
      { name: "Deep Plum", hex: "#4A1E5C" },
      { name: "Royal Purple", hex: "#5B2A86" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Ultra-comfortable tapered stretch trousers designed for 14-hour daily wear. Tailored with deep functional side pockets and minimal bottom slit.",
    fabric: "Cotton Lycra Stretch Blend",
    care: "Machine wash cold. Do not tumble dry.",
    inStock: true,
    isNewArrival: true,
    isBestseller: true,
    isSale: false,
    isInspo: false
  },

  // -------------------------------------------------------------
  // NEWLY ADDED EXCLUSIVE OUTFITS & STYLE INSPO (User Uploaded)
  // -------------------------------------------------------------
  {
    id: "zen-017",
    name: "Maroon Tunic & Farshi Shalwar Set",
    category: "coord",
    categoryName: "Co-Ord Sets",
    price: 5499,
    originalPrice: 6999,
    badge: "STYLE INSPO",
    rating: 5.0,
    reviewsCount: 48,
    image: "assets/images/outfit_maroon_farshi.jpg",
    gallery: [
      "assets/images/outfit_maroon_farshi.jpg",
      "assets/images/outfit_burgundy_festive.jpg"
    ],
    colors: [
      { name: "Deep Maroon & Pearl White", hex: "#6B1D2F" },
      { name: "Royal Purple", hex: "#5B2A86" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Complete 4-piece curated look: Rich maroon A-line short frock with delicate neck tassel tie and lace scalloped hem, matched with an ultra-flared white Farshi shalwar, sheer dupatta, and matching embroidered khussa.",
    fabric: "Pure Lawn Kurti, Cotton Viscose Farshi Shalwar & Chiffon Dupatta",
    care: "Hand wash cold or gentle machine cycle. Low iron.",
    inStock: true,
    isNewArrival: true,
    isBestseller: true,
    isSale: false,
    isInspo: true
  },
  {
    id: "zen-018",
    name: "Fuchsia Berry Relaxed Tee & Denims",
    category: "tops",
    categoryName: "Tops",
    price: 3199,
    originalPrice: null,
    badge: "CASUAL CHIC",
    rating: 4.9,
    reviewsCount: 34,
    image: "assets/images/outfit_magenta_casual.jpg",
    gallery: [
      "assets/images/outfit_magenta_casual.jpg",
      "assets/images/outfit_blush_bow_tee.jpg"
    ],
    colors: [
      { name: "Berry Magenta", hex: "#B8255F" },
      { name: "Lilac Violet", hex: "#9B72AA" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "'Simple is Beautiful' — Premium heavyweight oversized combed cotton tee in rich fuchsia berry paired with fluid wide-leg light blue denim trousers and canvas tote aesthetic.",
    fabric: "100% Organic Combed Cotton (220 GSM)",
    care: "Machine wash cold inside out. Tumble dry low.",
    inStock: true,
    isNewArrival: true,
    isBestseller: false,
    isSale: false,
    isInspo: true
  },
  {
    id: "zen-019",
    name: "Blossom Angrakha Peplum Co-Ord",
    category: "coord",
    categoryName: "Co-Ord Sets",
    price: 4899,
    originalPrice: 5999,
    badge: "MUST HAVE",
    rating: 4.9,
    reviewsCount: 52,
    image: "assets/images/outfit_pink_angrakha.jpg",
    gallery: [
      "assets/images/outfit_pink_angrakha.jpg",
      "assets/images/outfit_mauve_coord.jpg"
    ],
    colors: [
      { name: "Blossom Rose & Teal", hex: "#E898AC" },
      { name: "Lavender Floral", hex: "#C7B2DE" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Yeh wala outfit miss mat karna! A breathtaking crossover Angrakha peplum with ethnic floral block print, tie-up waist bow, geometric teal borders, and flared matching printed trousers.",
    fabric: "Superfine Cotton Lawn",
    care: "Gentle machine wash with like colors.",
    inStock: true,
    isNewArrival: true,
    isBestseller: true,
    isSale: false,
    isInspo: true
  },
  {
    id: "zen-020",
    name: "Blush Bow Embroidered Tee & Wide Jeans",
    category: "tops",
    categoryName: "Tops",
    price: 2899,
    originalPrice: null,
    badge: "TRENDING",
    rating: 4.8,
    reviewsCount: 29,
    image: "assets/images/outfit_blush_bow_tee.jpg",
    gallery: [
      "assets/images/outfit_blush_bow_tee.jpg",
      "assets/images/outfit_magenta_casual.jpg"
    ],
    colors: [
      { name: "Dusty Blush Pink", hex: "#C47C8C" },
      { name: "Pale Lavender", hex: "#E9DDF2" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Delicate aesthetic minimalism. Soft dusty rose drop-shoulder top with subtle black bow satin thread embroidery on the pocket, styled with relaxed high-waisted denim.",
    fabric: "100% Breathable Compact Cotton",
    care: "Machine wash cold with mild detergent.",
    inStock: true,
    isNewArrival: true,
    isBestseller: false,
    isSale: false,
    isInspo: true
  },
  {
    id: "zen-021",
    name: "Plum Royale Gota Pret Ensemble",
    category: "coord",
    categoryName: "Co-Ord Sets",
    price: 5999,
    originalPrice: 7499,
    badge: "FESTIVE LUXE",
    rating: 5.0,
    reviewsCount: 67,
    image: "assets/images/outfit_burgundy_festive.jpg",
    gallery: [
      "assets/images/outfit_burgundy_festive.jpg",
      "assets/images/outfit_maroon_farshi.jpg"
    ],
    colors: [
      { name: "Deep Plum Wine", hex: "#4E1A2D" },
      { name: "Royal Purple", hex: "#5B2A86" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Opulent celebratory pret set crafted from rich lustrous plum silk. Features exquisite golden gota patti running down the front V-neck and split bell cuffs, completed with matching wide-leg trousers.",
    fabric: "High-Grade Raw Silk with Metallic Gota Trims",
    care: "Dry clean only to maintain fabric sheen and gota embroidery.",
    inStock: true,
    isNewArrival: true,
    isBestseller: true,
    isSale: false,
    isInspo: true
  },

  // -------------------------------------------------------------
  // BESTSELLERS (Curated Favorites)
  // -------------------------------------------------------------
  {
    id: "zen-009",
    name: "Signature Purple Co-Ord Set",
    category: "coord",
    categoryName: "Co-Ord Sets",
    price: 5499,
    originalPrice: null,
    badge: "BESTSELLER",
    rating: 5.0,
    reviewsCount: 89,
    image: "assets/images/cat_coord.jpg",
    gallery: [
      "assets/images/cat_coord.jpg",
      "assets/images/hero_model.jpg"
    ],
    colors: [
      { name: "Zenvora Purple", hex: "#5B2A86" },
      { name: "Lavender Haze", hex: "#C7B2DE" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Our #1 most coveted design across Pakistan. Features artful neckline cut-out with lustrous mother-of-pearl buttons and matching tailored palazzo.",
    fabric: "Luxury Cotton Satin",
    care: "Gentle cold hand wash.",
    inStock: true,
    isNewArrival: false,
    isBestseller: true,
    isSale: false,
    isInspo: false
  },
  {
    id: "zen-010",
    name: "Everyday Elegance Dress",
    category: "dresses",
    categoryName: "Dresses",
    price: 4999,
    originalPrice: null,
    badge: "BESTSELLER",
    rating: 4.9,
    reviewsCount: 74,
    image: "assets/images/outfit_black_embroidered.jpg",
    gallery: [
      "assets/images/outfit_black_embroidered.jpg",
      "assets/images/cat_dresses.jpg"
    ],
    colors: [
      { name: "Noir Black & Ivory", hex: "#1B1B1B" },
      { name: "Deep Amethyst", hex: "#4C2468" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "A showstopping flared peplum silhouette with dramatic bell sleeves and pearl-studded V-neckline paired with botanical embroidered trousers.",
    fabric: "Georgette with Embroidered Organza Borders",
    care: "Dry clean only.",
    inStock: true,
    isNewArrival: false,
    isBestseller: true,
    isSale: false,
    isInspo: false
  },
  {
    id: "zen-011",
    name: "Essential White Shirt",
    category: "tops",
    categoryName: "Tops",
    price: 2999,
    originalPrice: null,
    badge: "BESTSELLER",
    rating: 4.9,
    reviewsCount: 112,
    image: "assets/images/cat_tops.jpg",
    gallery: [
      "assets/images/cat_tops.jpg"
    ],
    colors: [
      { name: "Ivory White", hex: "#FFFFFF" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "The quintessential crisp white shirt elevated with purple heirloom embroidery on collar tips. Crisp, lightweight, and opaque.",
    fabric: "100% Giza Cotton",
    care: "Machine wash cold.",
    inStock: true,
    isNewArrival: false,
    isBestseller: true,
    isSale: false,
    isInspo: false
  },
  {
    id: "zen-012",
    name: "Comfort Wide-Leg Pants",
    category: "bottoms",
    categoryName: "Bottoms",
    price: 3499,
    originalPrice: null,
    badge: "BESTSELLER",
    rating: 4.9,
    reviewsCount: 68,
    image: "assets/images/cat_bottoms.jpg",
    gallery: [
      "assets/images/cat_bottoms.jpg"
    ],
    colors: [
      { name: "Lavender Mist", hex: "#9B72AA" },
      { name: "Charcoal Slate", hex: "#2C2C2C" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "High-waisted wide leg silhouette with flawless drape. Pair with tops or tunics for an instant elongated aesthetic.",
    fabric: "Heavyweight Poly-Viscose Crepe",
    care: "Machine wash gentle.",
    inStock: true,
    isNewArrival: false,
    isBestseller: true,
    isSale: false,
    isInspo: false
  },

  // -------------------------------------------------------------
  // SALE SPECIALS
  // -------------------------------------------------------------
  {
    id: "zen-013",
    name: "Sage Meadow Embroidered Co-Ord",
    category: "coord",
    categoryName: "Co-Ord Sets",
    price: 3999,
    originalPrice: 5999,
    discountPercent: 33,
    badge: "-33% SALE",
    rating: 4.9,
    reviewsCount: 47,
    image: "assets/images/outfit_sage_coord.jpg",
    gallery: [
      "assets/images/outfit_sage_coord.jpg",
      "assets/images/hero_model.jpg"
    ],
    colors: [
      { name: "Pistachio Sage", hex: "#8DA792" },
      { name: "Dusty Lavender", hex: "#BDA0CB" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "A serene pastel sage co-ord ensemble highlighted by 3D organza floral embroidery on the shoulder and matching tie-belt wide trousers.",
    fabric: "Pure Linen Slub",
    care: "Hand wash cold.",
    inStock: true,
    isNewArrival: false,
    isBestseller: false,
    isSale: true,
    isInspo: false
  },
  {
    id: "zen-014",
    name: "Burgundy Motif Kurti & Palazzo",
    category: "dresses",
    categoryName: "Dresses",
    price: 4199,
    originalPrice: 5899,
    discountPercent: 29,
    badge: "-29% SALE",
    rating: 4.8,
    reviewsCount: 35,
    image: "assets/images/outfit_ivory_burgundy.jpg",
    gallery: [
      "assets/images/outfit_ivory_burgundy.jpg",
      "assets/images/cat_dresses.jpg"
    ],
    colors: [
      { name: "Ivory & Plum", hex: "#632A4C" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Traditional block-printed geometry on fine ivory lawn, bordered with laser-cut lace trim. Perfect for summer afternoons.",
    fabric: "Premium Lawn",
    care: "Gentle machine wash.",
    inStock: true,
    isNewArrival: false,
    isBestseller: false,
    isSale: true,
    isInspo: false
  },
  {
    id: "zen-015",
    name: "Plum Agate High-Low Tunic",
    category: "tops",
    categoryName: "Tops",
    price: 2799,
    originalPrice: 4299,
    discountPercent: 35,
    badge: "-35% SALE",
    rating: 4.7,
    reviewsCount: 22,
    image: "assets/images/outfit_marble_purple.jpg",
    gallery: [
      "assets/images/outfit_marble_purple.jpg"
    ],
    colors: [
      { name: "Agate Marble Purple", hex: "#5C2B66" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Contemporary digital marble print in mineral purple and warm gold tones. High-low hemline pairs effortlessly with straight trousers.",
    fabric: "Soft Silk Chiffon",
    care: "Dry clean recommended.",
    inStock: true,
    isNewArrival: false,
    isBestseller: false,
    isSale: true,
    isInspo: false
  },
  {
    id: "zen-016",
    name: "Mauve Cutwork Tunic & Culottes",
    category: "coord",
    categoryName: "Co-Ord Sets",
    price: 3699,
    originalPrice: 4999,
    discountPercent: 26,
    badge: "-26% SALE",
    rating: 4.9,
    reviewsCount: 63,
    image: "assets/images/outfit_mauve_coord.jpg",
    gallery: [
      "assets/images/outfit_mauve_coord.jpg",
      "assets/images/cat_coord.jpg"
    ],
    colors: [
      { name: "Dusty Mauve", hex: "#A37A8C" },
      { name: "Pure Ivory", hex: "#FFFFFF" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Chic everyday pret set featuring side ties, delicate laser cutwork hem, and flared off-white culottes.",
    fabric: "100% Combed Cotton",
    care: "Machine wash cold.",
    inStock: true,
    isNewArrival: false,
    isBestseller: false,
    isSale: true,
    isInspo: false
  }
];

const getProductsByCategory = (cat) => {
  if (!cat || cat === 'all') return ZENVORA_PRODUCTS;
  if (cat === 'sale') return ZENVORA_PRODUCTS.filter(p => p.isSale);
  if (cat === 'new') return ZENVORA_PRODUCTS.filter(p => p.isNewArrival);
  if (cat === 'bestseller') return ZENVORA_PRODUCTS.filter(p => p.isBestseller);
  if (cat === 'inspo') return ZENVORA_PRODUCTS.filter(p => p.isInspo);
  return ZENVORA_PRODUCTS.filter(p => p.category === cat);
};

const getProductById = (id) => ZENVORA_PRODUCTS.find(p => p.id === id);

const formatPKR = (amount) => `PKR ${Number(amount).toLocaleString('en-PK')}`;
