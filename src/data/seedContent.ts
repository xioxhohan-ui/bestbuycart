import { Article, IsItWorthItData, MethodologyFactor, SearchConsoleMetric, ContentDecayItem, TopicCluster } from '../types/content';
import { SEED_PRODUCTS } from './seedProducts';

export const SEED_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'How to Choose Headphones: The Complete 2026 Buying Guide',
    slug: 'how-to-choose-headphones',
    type: 'guide',
    category: 'tech',
    subcategory: 'headphones',
    authorName: 'Marcus Vance',
    authorRole: 'Senior Audio & Acoustics Editor',
    reviewerName: 'Elena Rostova',
    publishedDate: '2026-08-10',
    updatedDate: '2026-08-16',
    readTimeMinutes: 8,
    featuredImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop&q=80',
    excerpt: 'Everything you need to know before buying headphones in 2026: ANC benchmarks, codec support, battery life thresholds, and soundstage profiles.',
    sections: [
      {
        id: 'sec-1',
        title: '1. Introduction to Modern Headphone Tech',
        contentHtml: 'Choosing the right headphones in 2026 requires understanding active noise cancellation algorithms, LDAC/aptX Lossless codecs, and acoustic driver designs. With hundreds of options flooding the market, benchmark testing helps separate marketing fluff from genuine acoustic fidelity.'
      },
      {
        id: 'sec-2',
        title: '2. Form Factor: Over-Ear vs In-Ear vs Open-Back',
        contentHtml: 'Over-ear headphones provide the largest soundstage and superior passive isolation for long travel and office work. In-ear true wireless earbuds offer unrivaled pocketability and gym sweat resistance. Open-back headphones remain the undisputed benchmark for critical studio audiophile listening in quiet environments.'
      },
      {
        id: 'sec-3',
        title: '3. Key Acoustic Specs That Actually Matter',
        contentHtml: 'Do not get distracted by inflated frequency response numbers like 4Hz-40kHz. Focus on active noise cancellation attenuation (measured in dB across low and mid frequencies), Bluetooth multipoint reliability, driver materials (e.g. carbon fiber vs graphene), and real-world battery endurance.'
      }
    ],
    topRecommendations: [
      {
        tag: 'Best Overall',
        productId: 'prod-1',
        productName: 'Sony WH-1000XM5',
        priceUSD: 299.00,
        rating: 4.8,
        worthScore: 88,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
        highlight: 'Industry-leading adaptive ANC and ultra-lightweight carbon composite comfort for all-day wear.'
      },
      {
        tag: 'Best Value',
        productId: 'prod-gem-1',
        productName: 'EarFun Air Pro 4',
        priceUSD: 69.99,
        rating: 4.8,
        worthScore: 94,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
        highlight: 'High-res Snapdragon Sound and 52h total playback at less than a third of the price of flagships.'
      },
      {
        tag: 'Premium Upgrade',
        productId: 'prod-comp-1',
        productName: 'Bose QuietComfort Ultra',
        priceUSD: 379.00,
        rating: 4.7,
        worthScore: 84,
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
        highlight: 'Superb spatial immersion audio mode with physical folding hinge design for frequent flyers.'
      }
    ],
    faqs: [
      {
        question: 'What is the difference between open-back and closed-back headphones?',
        answer: 'Closed-back headphones have sealed earcups that prevent sound from leaking out and block ambient noise. Open-back headphones have perforated earcups that allow air and sound to pass freely, creating a significantly wider, more natural soundstage at the expense of zero noise isolation.'
      },
      {
        question: 'Are wireless headphones with LDAC lossless?',
        answer: 'LDAC transmits up to 990 kbps at 24-bit/96kHz, which is near-lossless high-resolution audio. While not bit-for-bit uncompressed FLAC, it delivers substantially higher fidelity than standard AAC and SBC codecs.'
      },
      {
        question: 'How long do lithium headphone batteries typically last?',
        answer: 'Most modern premium headphones deliver 500 to 800 charge cycles before degrading to 80% capacity, translating to 3 to 5 years of daily use.'
      }
    ],
    relatedArticleSlugs: ['sony-wh-1000xm5-worth-it', 'headphones-vs-earbuds-guide'],
    metaTitle: 'How to Choose Headphones: The Complete 2026 Buying Guide',
    metaDescription: 'Expert tested advice on choosing headphones in 2026. Noise cancellation benchmarks, sound quality analysis, and top tested recommendations.',
    focusKeyword: 'how to choose headphones',
    seoScore: 94,
    readabilityScore: 88,
    keywordDensityPercent: 2.3,
    status: 'published',
    views: 18450,
    helpfulVotes: 940
  },
  {
    id: 'art-2',
    title: 'Home Espresso Machine Buying Guide: From Entry to Prosumer',
    slug: 'home-espresso-machine-guide',
    type: 'guide',
    category: 'kitchen',
    subcategory: 'coffee',
    authorName: 'Claire Bennett',
    authorRole: 'Culinary Hardware Specialist',
    reviewerName: 'Marcus Vance',
    publishedDate: '2026-08-05',
    updatedDate: '2026-08-14',
    readTimeMinutes: 10,
    featuredImage: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=1200&auto=format&fit=crop&q=80',
    excerpt: 'ThermoJet vs dual boilers, 54mm vs 58mm portafilters, and assisted tamping systems demystified for home baristas.',
    sections: [
      {
        id: 'sec-201',
        title: '1. Why Espresso Machines Vary Dramatically in Price',
        contentHtml: 'A $150 espresso machine uses pressurized filter baskets and vibration pumps without PID temperature control. Prosumer machines at $1,000+ incorporate PID thermal stability, 9-bar overpressure valves, and rotary pumps.'
      }
    ],
    faqs: [
      {
        question: 'Is a built-in grinder better than a standalone grinder?',
        answer: 'Built-in grinders save kitchen counter space and streamline workflow. Standalone precision grinders (like the Fellow Ode Gen 2) offer larger flat burrs, less heat transfer, and superior grind uniformity for multiple brew methods.'
      }
    ],
    relatedArticleSlugs: ['breville-barista-touch-worth-it'],
    metaTitle: 'Home Espresso Machine Buying Guide 2026 — Best Buy Cart',
    metaDescription: 'Expert testing on home espresso machines. ThermoJet heat-up times, tamping automation, and extraction consistency.',
    focusKeyword: 'espresso machine buying guide',
    seoScore: 91,
    readabilityScore: 86,
    keywordDensityPercent: 2.1,
    status: 'published',
    views: 14200,
    helpfulVotes: 780
  }
];

export const SEED_IS_IT_WORTH_IT: IsItWorthItData = {
  product: SEED_PRODUCTS[0], // Sony WH-1000XM5
  verdict: {
    verdictType: 'yes',
    headline: 'YES — If you value best-in-class active noise cancelling and plush all-day comfort.',
    yesConditions: [
      'Frequent travelers, commuters, and hybrid office workers needing silence',
      'Users who prioritize lightweight 250g headband ergonomics',
      'Audiophiles who utilize LDAC high-res streaming on Android or DAP devices'
    ],
    noConditions: [
      'Gym enthusiasts requiring IPX4+ sweat and water resistance',
      'Frequent backpackers who insist on a physical folding hinge headband',
      'Shoppers with a strict budget ceiling under $150 (consider EarFun or Anker)'
    ]
  },
  metrics: {
    priceUSD: 299.00,
    rating: 4.8,
    hypeScore: 96,
    worthScore: 88,
    reviewCount: 4210,
    bestFor: 'Frequent Flyers & Hybrid Office Focus'
  },
  pros: [
    'Best-in-class multi-microphone active noise cancellation',
    'Exceptional 30-hour battery life with 3-minute quick charge',
    'Ultra-lightweight 250g headband with plush soft-fit leatherette',
    'Seamless dual-device Bluetooth multipoint switching'
  ],
  cons: [
    'Earcups do not fold inwards for ultra-compact storage',
    'No official IPX water or sweat resistance rating',
    'Touch control gestures can be sensitive in cold weather'
  ],
  alternativeIds: ['prod-comp-1', 'prod-gem-1', 'prod-4']
};

export const SEED_METHODOLOGY_FACTORS: MethodologyFactor[] = [
  {
    name: 'Price-to-Feature Ratio',
    weightPercent: 30,
    description: 'Calculates the deliverable feature set per dollar against category median pricing.',
    signals: ['Market MSRP variance', 'Hardware component grade', 'Included accessory bundle value']
  },
  {
    name: 'Verified User Sentiment',
    weightPercent: 25,
    description: 'Aggregates long-term verified owner satisfaction and durability complaints.',
    signals: ['10,000+ review sentiment analysis', 'Long-term 6-month failure rate tracking', 'Return rate signals']
  },
  {
    name: 'Lab & Benchmark Testing',
    weightPercent: 20,
    description: 'Empirical hardware measurements across acoustic, thermal, and efficiency metrics.',
    signals: ['Frequency response neutrality', 'ANC attenuation in dB', 'Real-world battery drain tests']
  },
  {
    name: 'Durability & Repairability',
    weightPercent: 15,
    description: 'Assessment of structural materials, replaceable components, and warranty support.',
    signals: ['Hinge & casing stress tests', 'Battery replacement accessibility', 'Manufacturer warranty terms']
  },
  {
    name: 'Brand Reputation & Transparency',
    weightPercent: 10,
    description: 'Tracks customer support responsiveness, firmware update cadence, and ethical practices.',
    signals: ['Firmware update history', 'Customer service response times', 'Recall history transparency']
  }
];

export const SEED_SEARCH_CONSOLE: SearchConsoleMetric = {
  totalClicks: 12450,
  totalImpressions: 234500,
  ctrPercent: 5.3,
  avgPosition: 12.4,
  topKeywords: [
    { keyword: 'best headphones 2026', impressions: 14200, clicks: 1020, ctr: 7.2, position: 3.4 },
    { keyword: 'sony wh-1000xm5 review', impressions: 9800, clicks: 680, ctr: 6.9, position: 4.1 },
    { keyword: 'how to choose headphones', impressions: 7200, clicks: 490, ctr: 6.8, position: 2.8 },
    { keyword: 'espresso machine buying guide', impressions: 6400, clicks: 390, ctr: 6.1, position: 5.2 },
    { keyword: 'earfun air pro 4 vs anker', impressions: 5100, clicks: 340, ctr: 6.7, position: 3.1 }
  ],
  contentOpportunities: [
    { keyword: 'best noise cancelling headphones for flying', searchVolume: 4800, difficulty: 45, suggestedAction: 'Create Targeted Guide' },
    { keyword: 'espresso machine with milk frother under $500', searchVolume: 3200, difficulty: 38, suggestedAction: 'Create Programmatic Comparison' },
    { keyword: 'power bank for macbook air 2026', searchVolume: 2900, difficulty: 32, suggestedAction: 'Create Product Round-up' }
  ]
};

export const SEED_CONTENT_DECAY: ContentDecayItem[] = [
  {
    id: 'decay-1',
    articleTitle: 'Best Tech Gadgets 2025: The Complete Buyer List',
    slug: 'best-tech-2025',
    lastUpdated: '8 months ago',
    trafficTrendPercent: -32,
    status: 'urgent_update',
    reason: 'Year suffix outdated; traffic declined 32% over past 90 days',
    priority: 'high'
  },
  {
    id: 'decay-2',
    articleTitle: 'Air Fryer vs Toaster Oven: 2025 Comparison',
    slug: 'air-fryer-vs-toaster-oven',
    lastUpdated: '6 months ago',
    trafficTrendPercent: -24,
    status: 'needs_refresh',
    reason: 'New models launched from Ninja and Breville requiring price updates',
    priority: 'medium'
  },
  {
    id: 'decay-3',
    articleTitle: 'How to Choose Headphones: The Complete 2026 Buying Guide',
    slug: 'how-to-choose-headphones',
    lastUpdated: '2 days ago',
    trafficTrendPercent: 18,
    status: 'fresh',
    reason: 'Recently refreshed with 2026 benchmarks; traffic up 18%',
    priority: 'low'
  }
];

export const SEED_TOPIC_CLUSTERS: TopicCluster[] = [
  {
    id: 'cluster-headphones',
    topicName: 'Headphones & Audio Ecosystem',
    category: 'tech',
    pillarPage: { title: 'Headphones Taxonomy Hub', slug: '/categories', type: 'pillar', status: 'active' },
    buyingGuides: [
      { title: 'How to Choose Headphones 2026', slug: '/guides/how-to-choose-headphones', type: 'guide', status: 'active' },
      { title: 'Over-Ear vs In-Ear Earbuds', slug: '/guides/over-ear-vs-in-ear', type: 'guide', status: 'active' }
    ],
    productReviews: [
      { title: 'Sony WH-1000XM5 Lab Review', slug: '/product-detail', type: 'review', status: 'active' },
      { title: 'EarFun Air Pro 4 Benchmark Test', slug: '/product-detail', type: 'review', status: 'active' }
    ],
    comparisons: [
      { title: 'Sony WH-1000XM5 vs Bose QC Ultra', slug: '/compare', type: 'comparison', status: 'active' },
      { title: 'EarFun Air Pro 4 vs Anker Space One', slug: '/compare', type: 'comparison', status: 'active' }
    ]
  }
];
