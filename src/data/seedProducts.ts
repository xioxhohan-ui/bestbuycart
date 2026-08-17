import { Product } from '../types/product';

export const SEED_PRODUCTS: Product[] = [
  // --- TECH: HEADPHONES & AUDIO ---
  {
    id: 'prod-1',
    slug: 'sony-wh-1000xm5-wireless-anc',
    name: 'Sony WH-1000XM5 Wireless Noise-Canceling Headphones',
    brand: 'Sony',
    category: 'tech',
    subcategoryId: 'headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    priceUSD: 349.99,
    originalPriceUSD: 399.99,
    isPriceDrop: true,
    dealPercentage: 13,
    rating: 4.8,
    reviewCount: 56243,
    hypeScore: 96,
    worthScore: 94,
    verdictType: 'worth_it',
    verdict: 'Best overall active noise cancellation and travel comfort',
    summary: 'The reigning benchmark for active noise cancellation, lightweight comfort, and multi-device Bluetooth audio clarity.',
    pros: ['Industry-leading dual-processor ANC', 'Ultra-comfortable lightweight fit', '30-hour battery with 3-min quick charge', 'Superb microphone beamforming'],
    cons: ['Does not fold as compactly as XM4', 'Touch controls sensitive in cold rain'],
    features: ['Wireless', 'Noise Canceling', 'Bluetooth 5.2', 'Fast Charge', 'Voice Assistant', 'Multipoint'],
    inStock: true,
    scoreBreakdown: {
      trendVelocity: 97,
      socialBuzz: 95,
      searchGrowth: 96,
      buildQuality: 93,
      valueForMoney: 91,
      featureSet: 98,
      userSatisfaction: 94,
      editorialRating: 95,
    },
    specs: [
      { name: 'Battery Life', value: '30 hours (ANC On)' },
      { name: 'Bluetooth', value: '5.2 with LDAC / Multipoint' },
      { name: 'Weight', value: '250g' },
      { name: 'Driver Size', value: '30mm Carbon Fiber Dome' },
      { name: 'Warranty', value: '2 Years Manufacturer' }
    ],
    offers: [
      {
        productId: 'prod-1',
        retailerId: 'amazon',
        retailerName: 'Amazon',
        priceUSD: 349.99,
        originalPriceUSD: 399.99,
        inStock: true,
        shippingInfo: 'Free 1-day Prime Shipping',
        dealTag: 'Save $50',
        destinationUrl: 'https://amazon.com',
        affiliateUrl: 'https://amazon.com?tag=bestbuycart-20',
        lastUpdated: 'Just now'
      },
      {
        productId: 'prod-1',
        retailerId: 'bestbuy',
        retailerName: 'Best Buy',
        priceUSD: 349.99,
        originalPriceUSD: 399.99,
        inStock: true,
        shippingInfo: 'Free Store Pickup Today',
        destinationUrl: 'https://bestbuy.com',
        affiliateUrl: 'https://bestbuy.com',
        lastUpdated: '10m ago'
      },
      {
        productId: 'prod-1',
        retailerId: 'bhphoto',
        retailerName: 'B&H Photo',
        priceUSD: 348.00,
        originalPriceUSD: 399.99,
        inStock: true,
        shippingInfo: 'Free Expedited Shipping',
        destinationUrl: 'https://bhphotovideo.com',
        affiliateUrl: 'https://bhphotovideo.com',
        lastUpdated: '1h ago'
      }
    ],
    isTrending: true,
    isFeatured: true,
    countryAvailability: ['US', 'UK', 'DE', 'FR', 'CA', 'AU']
  },
  {
    id: 'prod-gem-1',
    slug: 'earfun-air-pro-4-wireless-earbuds',
    name: 'EarFun Air Pro 4 Hi-Res Wireless ANC Earbuds (Snapdragon Sound & LDAC)',
    brand: 'EarFun',
    category: 'tech',
    subcategoryId: 'headphones',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
    priceUSD: 79.99,
    originalPriceUSD: 89.99,
    rating: 4.8,
    reviewCount: 3240,
    hypeScore: 78,
    worthScore: 98,
    verdictType: 'hidden_gem',
    editorialQuote: '"This product delivers audiophile Snapdragon Sound, 52-hour battery, and 50dB adaptive ANC at a third the price of flagship earbuds. It is one of the absolute best values we have ever tested."',
    verdict: 'Beats $250 flagship earbuds in battery, codec support (LDAC + aptX Lossless), and daily reliability',
    summary: 'The audiophile budget champion featuring Qualcomm QCC3091 chipset, Auracast, 52-hour total battery, and wireless charging.',
    pros: ['aptX Lossless & LDAC Hi-Res Wireless certifications', '52-hour total playtime (11h continuous)', 'Multipoint dual device connection', '6-mic cVc 8.0 noise filtering'],
    cons: ['Case finish shows light fingerprints'],
    features: ['Wireless', 'Noise Canceling', 'Bluetooth 5.4', 'Waterproof', 'Wireless Charging', 'Multipoint'],
    inStock: true,
    scoreBreakdown: {
      trendVelocity: 76,
      socialBuzz: 79,
      searchGrowth: 80,
      buildQuality: 94,
      valueForMoney: 99,
      featureSet: 98,
      userSatisfaction: 97,
      editorialRating: 98,
    },
    specs: [
      { name: 'Audio Codecs', value: 'aptX Lossless, LDAC, AAC, SBC, LC3' },
      { name: 'Noise Cancellation', value: 'QuietSmart 3.0 Adaptive (up to 50dB)' },
      { name: 'Playtime', value: '11 hours (52 hours with Wireless Case)' },
      { name: 'Water Resistance', value: 'IPX5 Sweat & Rainproof' }
    ],
    offers: [
      {
        productId: 'prod-gem-1',
        retailerId: 'amazon',
        retailerName: 'Amazon',
        priceUSD: 79.99,
        originalPriceUSD: 89.99,
        inStock: true,
        shippingInfo: 'Free Next-Day Prime',
        dealTag: 'Save $10',
        destinationUrl: 'https://amazon.com',
        affiliateUrl: 'https://amazon.com?tag=bestbuycart-20',
        lastUpdated: '2m ago'
      }
    ],
    isHiddenGem: true,
    countryAvailability: ['US', 'UK', 'DE', 'FR', 'CA', 'AU']
  },
  {
    id: 'prod-tech-anker-q30',
    slug: 'anker-soundcore-life-q30-anc',
    name: 'Anker Soundcore Life Q30 Hybrid ANC Headphones',
    brand: 'Anker',
    category: 'tech',
    subcategoryId: 'headphones',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
    priceUSD: 49.99,
    originalPriceUSD: 59.99,
    rating: 4.7,
    reviewCount: 42100,
    hypeScore: 84,
    worthScore: 92,
    verdictType: 'worth_it',
    verdict: 'The undefeated king of sub-$50 noise canceling over-ear headphones',
    summary: 'Customizable EQ via Soundcore app, 40-hour ANC battery life, and soft protein leather memory foam earcups.',
    pros: ['Phenomenal battery life (up to 60h with ANC off)', 'Companion app EQ customization', 'Extremely comfortable for long flights'],
    cons: ['Plastic headband construction', 'Microphone quality is average in windy conditions'],
    features: ['Wireless', 'Noise Canceling', 'Fast Charge', 'Custom EQ'],
    inStock: true,
    specs: [
      { name: 'Battery Life', value: '40h (ANC On) / 60h (ANC Off)' },
      { name: 'Driver', value: '40mm Silk-diaphragm Drivers' }
    ],
    offers: [
      {
        productId: 'prod-tech-anker-q30',
        retailerId: 'amazon',
        retailerName: 'Amazon',
        priceUSD: 49.99,
        inStock: true,
        shippingInfo: 'Free Prime Shipping',
        destinationUrl: 'https://amazon.com',
        affiliateUrl: 'https://amazon.com?tag=bestbuycart-20',
        lastUpdated: '12m ago'
      }
    ],
    countryAvailability: ['US', 'UK', 'DE', 'FR', 'CA', 'AU']
  },
  {
    id: 'prod-tech-bose-ultra',
    slug: 'bose-quietcomfort-ultra-wireless',
    name: 'Bose QuietComfort Ultra Wireless Noise Canceling Headphones',
    brand: 'Bose',
    category: 'tech',
    subcategoryId: 'headphones',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80',
    priceUSD: 379.00,
    originalPriceUSD: 429.00,
    rating: 4.8,
    reviewCount: 19840,
    hypeScore: 93,
    worthScore: 92,
    verdictType: 'worth_it',
    verdict: 'World-class noise cancellation with breakthrough Bose Immersive Audio',
    summary: 'Spatialized audio positioning, CustomTune sound calibration to your ear canal, and ultra-plush headband cushion.',
    pros: ['Unmatched high-frequency acoustic isolation', 'Immersive spatial audio mode', 'Folds into compact luxury travel case'],
    cons: ['Battery life capped at 24 hours', 'Bose app occasionally requires re-pairing'],
    features: ['Wireless', 'Noise Canceling', 'Spatial Audio', 'Bluetooth 5.3', 'Multipoint', 'Fast Charge'],
    inStock: true,
    specs: [
      { name: 'Battery Life', value: '24 hours (18 hours Immersive Audio)' },
      { name: 'Codecs', value: 'aptX Adaptive, AAC, SBC' }
    ],
    offers: [
      {
        productId: 'prod-tech-bose-ultra',
        retailerId: 'bestbuy',
        retailerName: 'Best Buy',
        priceUSD: 379.00,
        inStock: true,
        shippingInfo: 'Free Next-Day Delivery',
        destinationUrl: 'https://bestbuy.com',
        affiliateUrl: 'https://bestbuy.com',
        lastUpdated: '20m ago'
      }
    ],
    countryAvailability: ['US', 'UK', 'DE', 'FR', 'CA', 'AU']
  },

  // --- TECH: LAPTOPS ---
  {
    id: 'prod-3',
    slug: 'apple-macbook-air-15-m3-chip',
    name: 'Apple MacBook Air 15-inch M3 Chip (16GB, 512GB)',
    brand: 'Apple',
    category: 'tech',
    subcategoryId: 'laptops',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    priceUSD: 1499.00,
    originalPriceUSD: 1699.00,
    isPriceDrop: true,
    dealPercentage: 12,
    rating: 4.9,
    reviewCount: 28940,
    hypeScore: 95,
    worthScore: 97,
    verdictType: 'worth_it',
    verdict: 'The ultimate balance of screen real estate, silent power, and battery life',
    summary: 'Liquid Retina 15.3-inch display, dual external monitor support, MagSafe charging, and up to 18 hours of real battery endurance.',
    pros: ['Silent fanless design with zero throttling under normal workloads', 'Incredible 18-hour real-world battery', 'Stunning Liquid Retina display with 500 nits', 'Six-speaker spatial audio system'],
    cons: ['Base SSD speed on 256GB is slower (recommend 512GB+)', 'Only 2 Thunderbolt ports'],
    features: ['Liquid Retina', 'MagSafe', 'Silent Fanless', 'Apple M3', '18h Battery'],
    inStock: true,
    scoreBreakdown: {
      trendVelocity: 96,
      socialBuzz: 94,
      searchGrowth: 95,
      buildQuality: 99,
      valueForMoney: 94,
      featureSet: 96,
      userSatisfaction: 98,
      editorialRating: 97,
    },
    specs: [
      { name: 'Processor', value: 'Apple M3 8-core CPU / 10-core GPU' },
      { name: 'Memory', value: '16GB Unified Memory' },
      { name: 'Display', value: '15.3-inch Liquid Retina (2880x1864)' },
      { name: 'Weight', value: '1.51 kg (3.3 lbs)' },
      { name: 'Battery', value: '66.5Wh Lithium Polymer (18h)' }
    ],
    offers: [
      {
        productId: 'prod-3',
        retailerId: 'amazon',
        retailerName: 'Amazon',
        priceUSD: 1499.00,
        originalPriceUSD: 1699.00,
        inStock: true,
        shippingInfo: 'Free 1-day Prime Shipping',
        dealTag: 'Save $200',
        destinationUrl: 'https://amazon.com',
        affiliateUrl: 'https://amazon.com?tag=bestbuycart-20',
        lastUpdated: '5m ago'
      },
      {
        productId: 'prod-3',
        retailerId: 'bestbuy',
        retailerName: 'Best Buy',
        priceUSD: 1499.00,
        inStock: true,
        shippingInfo: 'Pickup in 1 Hour',
        destinationUrl: 'https://bestbuy.com',
        affiliateUrl: 'https://bestbuy.com',
        lastUpdated: '15m ago'
      }
    ],
    isTrending: true,
    isFeatured: true,
    countryAvailability: ['US', 'UK', 'DE', 'FR', 'CA', 'AU']
  },

  // --- TECH: ACCESSORIES & POWER ---
  {
    id: 'prod-rising-1',
    slug: 'anker-prime-20000mah-200w-powerbank',
    name: 'Anker Prime 20,000mAh Power Bank (200W Output with Smart Display)',
    brand: 'Anker',
    category: 'tech',
    subcategoryId: 'accessories',
    image: 'https://images.unsplash.com/photo-1609592424368-2bd8d9465a39?w=800&auto=format&fit=crop&q=80',
    priceUSD: 129.99,
    originalPriceUSD: 149.99,
    rating: 4.8,
    reviewCount: 9410,
    hypeScore: 91,
    worthScore: 96,
    verdictType: 'rising_fast',
    growthPercentage: 182,
    whyRising: ['3x searches ↑ this week', '2x verified reviews ↑', 'Viral for dual laptop fast-charging'],
    verdict: 'Can fast-charge two MacBook Pros simultaneously at full speed with real-time watt monitoring',
    summary: 'Compact 200W total output power bank with intelligent smart digital display showing battery health, charging wattage, and time to full.',
    pros: ['Simultaneous 100W + 100W dual USB-C output', 'Smart screen shows real-time wattage per port', 'Rapid 100W recharge time under 75 mins'],
    cons: ['Heavier than single-device power banks (540g)'],
    features: ['Fast Charge', 'Smart Display', '200W Output', 'Multi-port USB-C'],
    inStock: true,
    specs: [
      { name: 'Capacity', value: '20,000mAh (72Wh)' },
      { name: 'Max Total Output', value: '200W (100W + 100W)' },
      { name: 'Ports', value: '2x USB-C + 1x USB-A' }
    ],
    offers: [
      {
        productId: 'prod-rising-1',
        retailerId: 'amazon',
        retailerName: 'Amazon',
        priceUSD: 129.99,
        originalPriceUSD: 149.99,
        inStock: true,
        shippingInfo: 'Free Next-Day Prime',
        dealTag: 'Save $20',
        destinationUrl: 'https://amazon.com',
        affiliateUrl: 'https://amazon.com?tag=bestbuycart-20',
        lastUpdated: '4m ago'
      }
    ],
    isRising: true,
    countryAvailability: ['US', 'UK', 'DE', 'FR', 'CA', 'AU']
  },

  // --- OFFICE: KEYBOARDS ---
  {
    id: 'prod-6',
    slug: 'keychron-q1-pro-wireless-mechanical-keyboard',
    name: 'Keychron Q1 Pro Wireless QMK/VIA Custom Mechanical Keyboard',
    brand: 'Keychron',
    category: 'office',
    subcategoryId: 'keyboards',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    priceUSD: 199.00,
    rating: 4.8,
    reviewCount: 8430,
    hypeScore: 88,
    worthScore: 95,
    verdictType: 'worth_it',
    verdict: 'Full CNC aluminum body, double-gasket acoustic dampening, and Mac/Win hot-swap',
    summary: 'The gold standard for enthusiast typing feel straight out of the box with Bluetooth 5.1 and programmable VIA software.',
    pros: ['Solid CNC 6063 aluminum chassis (1.7kg)', 'Double-gasket acoustic mounting design', 'Hot-swappable PCB supports 3-pin & 5-pin switches'],
    cons: ['Heavy to transport (strictly desk use)'],
    features: ['Wireless', 'Hot-Swappable', 'CNC Aluminum', 'Bluetooth 5.1', 'Mac & Windows Compatible'],
    inStock: true,
    specs: [
      { name: 'Body Material', value: 'Full CNC Machined Aluminum' },
      { name: 'Connectivity', value: 'Bluetooth 5.1 & Type-C Wired' }
    ],
    offers: [
      {
        productId: 'prod-6',
        retailerId: 'amazon',
        retailerName: 'Amazon',
        priceUSD: 199.00,
        inStock: true,
        shippingInfo: 'Free 2-day Prime',
        destinationUrl: 'https://amazon.com',
        affiliateUrl: 'https://amazon.com?tag=bestbuycart-20',
        lastUpdated: '10m ago'
      }
    ],
    isTrending: true,
    countryAvailability: ['US', 'UK', 'DE', 'FR', 'CA', 'AU']
  },

  // --- KITCHEN: ESPRESSO & COFFEE ---
  {
    id: 'prod-2',
    slug: 'breville-barista-touch-impress-espresso',
    name: 'Breville Barista Touch Impress Espresso Machine',
    brand: 'Breville',
    category: 'kitchen',
    subcategoryId: 'espresso',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80',
    priceUSD: 1499.95,
    originalPriceUSD: 1599.95,
    rating: 4.9,
    reviewCount: 14210,
    hypeScore: 94,
    worthScore: 96,
    verdictType: 'worth_it',
    verdict: 'Cafe-quality espresso automated with precision assisted tamping',
    summary: 'Automated touchscreen barista guidance meets precision conical burr grinding and intelligent microfoam texturing.',
    pros: ['Assisted 10kg tamping with 7° barista twist', 'Auto MilQ froth for oat, almond, soy & dairy', 'ThermoJet 3-second rapid heat up'],
    cons: ['Substantial countertop footprint'],
    features: ['ThermoJet 3s', 'Touchscreen Barista Guide', 'Auto MilQ Frothing', 'Assisted Tamping'],
    inStock: true,
    specs: [
      { name: 'Heating System', value: 'ThermoJet (3 sec)' },
      { name: 'Grinder', value: 'European Precision Burr (30 settings)' }
    ],
    offers: [
      {
        productId: 'prod-2',
        retailerId: 'amazon',
        retailerName: 'Amazon',
        priceUSD: 1499.95,
        inStock: true,
        shippingInfo: 'Free 2-day delivery',
        destinationUrl: 'https://amazon.com',
        affiliateUrl: 'https://amazon.com?tag=bestbuycart-20',
        lastUpdated: '12m ago'
      }
    ],
    isTrending: true,
    countryAvailability: ['US', 'UK', 'DE', 'FR', 'CA', 'AU']
  },
  {
    id: 'prod-rising-2',
    slug: 'fellow-ode-gen-2-coffee-grinder',
    name: 'Fellow Ode Gen 2 Brew Coffee Grinder',
    brand: 'Fellow',
    category: 'kitchen',
    subcategoryId: 'grinders',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
    priceUSD: 345.00,
    rating: 4.8,
    reviewCount: 6120,
    hypeScore: 89,
    worthScore: 95,
    verdictType: 'rising_fast',
    growthPercentage: 121,
    whyRising: ['Social buzz ↑ across coffee creators', '4x mentions in Reddit communities'],
    verdict: 'Unrivaled particle consistency for pour-over and drip with anti-static ionizer',
    summary: 'Cafe-grade 64mm stainless steel flat burrs engineered specifically for brew coffee with whisper-quiet auto stop.',
    pros: ['Gen 2 burrs grind finer with superior clarity', 'Integrated anti-static ionizer eliminates mess'],
    cons: ['Filter/pour-over only (not espresso)'],
    features: ['64mm Flat Burrs', 'Anti-Static Ionizer', 'Auto-Stop', 'Single-Dose'],
    inStock: true,
    specs: [
      { name: 'Burrs', value: '64mm Stainless Steel Flat Burrs' },
      { name: 'Settings', value: '31 Stepped Settings' }
    ],
    offers: [
      {
        productId: 'prod-rising-2',
        retailerId: 'amazon',
        retailerName: 'Amazon',
        priceUSD: 345.00,
        inStock: true,
        shippingInfo: 'Free delivery',
        destinationUrl: 'https://amazon.com',
        affiliateUrl: 'https://amazon.com?tag=bestbuycart-20',
        lastUpdated: '16m ago'
      }
    ],
    isRising: true,
    countryAvailability: ['US', 'UK', 'DE', 'FR', 'CA', 'AU']
  },
  {
    id: 'prod-overhyped-2',
    slug: 'beast-power-pro-blender-viral',
    name: 'GlamourBlend Ultra Compact Portable Travel Blender',
    brand: 'GlamourBlend',
    category: 'kitchen',
    subcategoryId: 'blenders',
    image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&auto=format&fit=crop&q=80',
    priceUSD: 149.99,
    rating: 3.8,
    reviewCount: 4200,
    hypeScore: 94,
    worthScore: 61,
    verdictType: 'overhyped',
    overhypedReason: 'Struggles with frozen fruit and ice blocks; battery degrades after 6 months of daily use.',
    verdict: 'Overpriced for what you get. Standard plug-in blenders or Ninja portable models outperform it.',
    summary: 'Cute pastel USB rechargeable portable bottle blender heavily promoted on TikTok that lacks motor torque for dense smoothies.',
    pros: ['Cute aesthetic colors', 'Direct drinking spout on lid'],
    cons: ['Lacks torque for ice or frozen bananas', 'Battery longevity issues reported by verified buyers'],
    features: ['Wireless USB-C', 'Compact Portable'],
    inStock: true,
    specs: [
      { name: 'Motor', value: '45W Portable DC Motor' }
    ],
    offers: [
      {
        productId: 'prod-overhyped-2',
        retailerId: 'amazon',
        retailerName: 'Amazon',
        priceUSD: 149.99,
        inStock: true,
        shippingInfo: 'Standard Delivery',
        destinationUrl: 'https://amazon.com',
        affiliateUrl: 'https://amazon.com?tag=bestbuycart-20',
        lastUpdated: '40m ago'
      }
    ],
    isOverhyped: true,
    countryAvailability: ['US', 'UK', 'DE', 'FR', 'CA', 'AU']
  },

  // --- HOME & LIVING ---
  {
    id: 'prod-5',
    slug: 'roborock-s8-maxv-ultra-robot-vacuum',
    name: 'Roborock S8 MaxV Ultra Robot Vacuum & Mop Combo',
    brand: 'Roborock',
    category: 'home',
    subcategoryId: 'robotic-vacuums',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    priceUSD: 1799.99,
    rating: 4.8,
    reviewCount: 9240,
    hypeScore: 90,
    worthScore: 92,
    verdictType: 'worth_it',
    verdict: 'Corner-to-edge cleaning with 10,000Pa suction and hot water mop washing',
    summary: 'The apex of automated home floor care with FlexiArm side brush, DirTect AI recognition, and built-in voice assistant.',
    pros: ['10,000Pa extreme suction power', 'Automatic 60°C hot water mop self-cleaning & drying'],
    cons: ['Large multi-function dock requires floor clearance'],
    features: ['10000Pa Suction', 'Hot Water Self-Clean', 'Reactive AI Obstacle Avoidance', 'App Control'],
    inStock: true,
    specs: [
      { name: 'Suction', value: '10,000 Pa Extreme Suction' }
    ],
    offers: [
      {
        productId: 'prod-5',
        retailerId: 'amazon',
        retailerName: 'Amazon',
        priceUSD: 1799.99,
        inStock: true,
        shippingInfo: 'Free Delivery',
        destinationUrl: 'https://amazon.com',
        affiliateUrl: 'https://amazon.com?tag=bestbuycart-20',
        lastUpdated: '14m ago'
      }
    ],
    isTrending: true,
    countryAvailability: ['US', 'UK', 'DE', 'FR', 'CA', 'AU']
  },
  {
    id: 'prod-4',
    slug: 'dyson-airwrap-multi-styler-complete-long',
    name: 'Dyson Airwrap Multi-Styler Complete Long',
    brand: 'Dyson',
    category: 'home',
    subcategoryId: 'hair-styling',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
    priceUSD: 599.99,
    rating: 4.7,
    reviewCount: 38400,
    hypeScore: 92,
    worthScore: 89,
    verdictType: 'worth_it',
    verdict: 'Coanda effect aerodynamic airflow styles hair with zero extreme heat damage',
    summary: 'The viral multi-styler engineered for chest-length and longer hair with re-engineered barrels that curl in both directions.',
    pros: ['Zero extreme heat damage', 'Re-engineered multi-directional barrels'],
    cons: ['Steep learning curve initially'],
    features: ['Coanda Airflow', 'No Extreme Heat', 'Intelligent Heat Control'],
    inStock: true,
    specs: [
      { name: 'Wattage', value: '1,300 W' }
    ],
    offers: [
      {
        productId: 'prod-4',
        retailerId: 'amazon',
        retailerName: 'Amazon',
        priceUSD: 599.99,
        inStock: true,
        shippingInfo: 'Free Delivery',
        destinationUrl: 'https://amazon.com',
        affiliateUrl: 'https://amazon.com?tag=bestbuycart-20',
        lastUpdated: '18m ago'
      }
    ],
    isTrending: true,
    countryAvailability: ['US', 'UK', 'DE', 'FR', 'CA', 'AU']
  },
  {
    id: 'prod-overhyped-1',
    slug: 'generic-lifestyle-air-purifier-x',
    name: 'AuraLux Designer Halo Air Purifier & Mood Lamp',
    brand: 'AuraLux',
    category: 'home',
    subcategoryId: 'air-purifiers',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&auto=format&fit=crop&q=80',
    priceUSD: 299.99,
    rating: 3.9,
    reviewCount: 1850,
    hypeScore: 97,
    worthScore: 58,
    verdictType: 'overhyped',
    overhypedReason: 'Massive social media influencer budget, but low CADR filtration rate (only 80 CFM) and expensive $60 proprietary replacement filters.',
    verdict: 'Popular aesthetics, but vastly overpriced for its modest filtration performance.',
    summary: 'A social-media viral cylindrical purifier with RGB ambient lighting that prioritizes aesthetic design over CADR clean air output.',
    pros: ['Attractive cylindrical design & ambient glow'],
    cons: ['Only filters up to 150 sq ft effectively', 'CADR is one-third of true HEPA leaders'],
    features: ['RGB Ambient Light', 'Cylindrical Design'],
    inStock: true,
    specs: [
      { name: 'CADR Rating', value: '80 CFM' }
    ],
    offers: [
      {
        productId: 'prod-overhyped-1',
        retailerId: 'amazon',
        retailerName: 'Amazon',
        priceUSD: 299.99,
        inStock: true,
        shippingInfo: 'Standard shipping',
        destinationUrl: 'https://amazon.com',
        affiliateUrl: 'https://amazon.com?tag=bestbuycart-20',
        lastUpdated: '1h ago'
      }
    ],
    isOverhyped: true,
    countryAvailability: ['US', 'UK', 'DE', 'FR', 'CA', 'AU']
  },

  // --- FITNESS ---
  {
    id: 'prod-7',
    slug: 'ouraring-gen3-horizon-smart-ring',
    name: 'Oura Ring Gen 3 Horizon Smart Titanium Health Tracker',
    brand: 'Oura',
    category: 'fitness',
    subcategoryId: 'smart-rings',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80',
    priceUSD: 349.00,
    rating: 4.6,
    reviewCount: 22150,
    hypeScore: 86,
    worthScore: 88,
    verdictType: 'worth_it',
    verdict: 'Discreet 24/7 sleep tracking, readiness score, and biometric monitoring',
    summary: 'Seamless titanium ring that tracks sleep stages, heart rate variability (HRV), and early sickness signals without a bulky screen.',
    pros: ['Lightweight titanium feels like regular jewelry', 'Superior sleep architecture & HRV tracking'],
    cons: ['Requires $5.99/mo ongoing membership'],
    features: ['Titanium', 'Sleep HRV Tracking', '100m Waterproof', '7-Day Battery'],
    inStock: true,
    specs: [
      { name: 'Material', value: 'Durable Titanium with PVD Coating' }
    ],
    offers: [
      {
        productId: 'prod-7',
        retailerId: 'bestbuy',
        retailerName: 'Best Buy',
        priceUSD: 349.00,
        inStock: true,
        shippingInfo: 'Free Standard Shipping',
        destinationUrl: 'https://bestbuy.com',
        affiliateUrl: 'https://bestbuy.com',
        lastUpdated: '22m ago'
      }
    ],
    isTrending: true,
    countryAvailability: ['US', 'UK', 'DE', 'FR', 'CA', 'AU']
  },
  {
    id: 'prod-rising-4',
    slug: 'theragun-mini-2nd-gen-massage-gun',
    name: 'Therabody Theragun Mini (2nd Gen) Ultra-Portable Percussive Massager',
    brand: 'Therabody',
    category: 'fitness',
    subcategoryId: 'recovery-gear',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80',
    priceUSD: 179.00,
    originalPriceUSD: 199.00,
    rating: 4.7,
    reviewCount: 11200,
    hypeScore: 85,
    worthScore: 92,
    verdictType: 'rising_fast',
    growthPercentage: 87,
    whyRising: ['Pocket-friendly gym recovery', 'Quieter brushless QX35 motor'],
    verdict: 'Deep muscle treatment in a 1 lb package that fits in any gym bag or carry-on',
    summary: '20% smaller and 30% lighter than Gen 1, delivering 12mm amplitude percussive therapy for fast relief on the go.',
    pros: ['12mm amplitude reaches 60% deeper than average vibration massagers', '120-min battery'],
    cons: ['Non-adjustable arm angle'],
    features: ['12mm Amplitude', 'Ultra-Portable 1lb', 'Bluetooth App Sync'],
    inStock: true,
    specs: [
      { name: 'Amplitude', value: '12mm Deep Tissue Relief' }
    ],
    offers: [
      {
        productId: 'prod-rising-4',
        retailerId: 'amazon',
        retailerName: 'Amazon',
        priceUSD: 179.00,
        originalPriceUSD: 199.00,
        inStock: true,
        shippingInfo: 'Free 1-day Prime',
        destinationUrl: 'https://amazon.com',
        affiliateUrl: 'https://amazon.com?tag=bestbuycart-20',
        lastUpdated: '12m ago'
      }
    ],
    isRising: true,
    countryAvailability: ['US', 'UK', 'DE', 'FR', 'CA', 'AU']
  },

  // --- TRAVEL & EDC ---
  {
    id: 'prod-rising-3',
    slug: 'aer-city-pack-pro-cordura',
    name: 'Aer City Pack Pro 24L Tech Backpack (1680D Cordura)',
    brand: 'Aer',
    category: 'travel',
    subcategoryId: 'backpacks',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
    priceUSD: 209.00,
    rating: 4.9,
    reviewCount: 4180,
    hypeScore: 87,
    worthScore: 97,
    verdictType: 'rising_fast',
    growthPercentage: 94,
    whyRising: ['Stand-alone structure goes viral', 'Zero wear reported after 2 yrs'],
    verdict: 'The ultimate daily commuter & travel tech pack that stands upright on its own',
    summary: 'Streamlined everyday carry pack featuring lay-flat clamshell opening, padded 16-inch laptop chamber, and ballistic Cordura weatherproofing.',
    pros: ['Stands completely upright on desk/floor', '1680D Cordura ballistic nylon resists scuffs & rain'],
    cons: ['Side bottle pocket is snug on 32oz bottles'],
    features: ['1680D Cordura', 'Self-Standing Structure', 'Lay-Flat Clamshell', '16" Laptop Suspended Compartment'],
    inStock: true,
    specs: [
      { name: 'Volume', value: '24 Liters' }
    ],
    offers: [
      {
        productId: 'prod-rising-3',
        retailerId: 'bhphoto',
        retailerName: 'B&H Photo',
        priceUSD: 209.00,
        inStock: true,
        shippingInfo: 'Free 2-day shipping',
        destinationUrl: 'https://bhphotovideo.com',
        affiliateUrl: 'https://bhphotovideo.com',
        lastUpdated: '35m ago'
      }
    ],
    isRising: true,
    countryAvailability: ['US', 'UK', 'DE', 'FR', 'CA', 'AU']
  },
  {
    id: 'prod-8',
    slug: 'stanley-quencher-h20-flowstate-tumbler-40oz',
    name: 'Stanley Quencher H2.0 FlowState Stainless Tumbler (40 oz)',
    brand: 'Stanley',
    category: 'travel',
    subcategoryId: 'tumblers',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
    priceUSD: 45.00,
    rating: 4.7,
    reviewCount: 78900,
    hypeScore: 84,
    worthScore: 86,
    verdictType: 'worth_it',
    verdict: 'Insulated vacuum hydration with car cup-holder compatible tapered base',
    summary: 'The internet-famous tumbler made with 90% recycled stainless steel that keeps drinks ice cold for 48 hours.',
    pros: ['Fits standard car cup holders effortlessly', 'Comfortable ergonomic grip handle', 'Dishwasher safe'],
    cons: ['Not 100% leakproof if inverted in a backpack'],
    features: ['Car Cup-Holder Fit', 'Double-Wall Vacuum', 'Dishwasher Safe', '40 oz Capacity'],
    inStock: true,
    specs: [
      { name: 'Capacity', value: '40 oz (1.18 Liters)' }
    ],
    offers: [
      {
        productId: 'prod-8',
        retailerId: 'target',
        retailerName: 'Target',
        priceUSD: 45.00,
        inStock: true,
        shippingInfo: 'Pickup in Store Today',
        destinationUrl: 'https://target.com',
        affiliateUrl: 'https://target.com',
        lastUpdated: '8m ago'
      }
    ],
    isTrending: true,
    countryAvailability: ['US', 'UK', 'DE', 'FR', 'CA', 'AU']
  }
];
