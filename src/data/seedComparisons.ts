import { ProductComparison, BrandComparison } from '../types/comparison';

export const SEED_COMPARISONS: ProductComparison[] = [
  {
    id: 'comp-1',
    slug: 'sony-wh-1000xm5-vs-bose-qc-ultra',
    title: 'Sony WH-1000XM5 vs Bose QuietComfort Ultra',
    type: 'pvp',
    productAId: 'prod-1', // Sony WH-1000XM5
    productBId: 'prod-tech-bose-ultra', // Bose QC Ultra
    category: 'tech',
    views: 12450,
    winnerId: 'prod-1',
    verdictText: 'Sony WH-1000XM5 wins for best overall value, lighter long-term comfort, and superior 30-hour battery life.',
    whyWinner: 'Better battery life (30 hrs vs 24 hrs), superior app EQ flexibility, and lower price ($349 vs $379).',
    whenToChooseB: 'Choose Bose QC Ultra if you require spatial Immersive Audio calibration and tighter ear cup acoustic isolation in loud airplanes.',
    scorecards: [
      { name: 'Sound Quality & Codecs', weight: 35, scoreA: 9.4, scoreB: 9.2, winner: 'A', note: 'Sony includes Hi-Res LDAC; Bose includes aptX Adaptive' },
      { name: 'Active Noise Cancellation', weight: 25, scoreA: 9.6, scoreB: 9.7, winner: 'B', note: 'Bose slightly edges out high-frequency jet drone' },
      { name: 'Battery Endurance', weight: 20, scoreA: 9.8, scoreB: 8.0, winner: 'A', note: 'Sony delivers 30 hrs vs Bose 24 hrs' },
      { name: 'Travel Ergonomics', weight: 10, scoreA: 9.2, scoreB: 9.4, winner: 'B', note: 'Bose folds into a smaller travel footprint' },
      { name: 'Value for Money', weight: 10, scoreA: 9.3, scoreB: 8.4, winner: 'A', note: 'Sony costs $30 less with better overall longevity' }
    ],
    specRows: [
      { featureName: 'Weight', valueA: '250g', valueB: '252g' },
      { featureName: 'Battery Life (ANC On)', valueA: '30 hours', valueB: '24 hours', highlightDifference: true },
      { featureName: 'Active Noise Cancellation', valueA: true, valueB: true },
      { featureName: 'Bluetooth Multipoint', valueA: true, valueB: true },
      { featureName: 'Hi-Res Wireless Codec', valueA: 'LDAC (990 kbps)', valueB: 'aptX Adaptive', highlightDifference: true },
      { featureName: 'Spatial Audio Mode', valueA: '360 Reality Audio', valueB: 'Bose Immersive Audio', highlightDifference: true },
      { featureName: 'Foldable Travel Hinge', valueA: false, valueB: true, highlightDifference: true },
      { featureName: 'Fast Charging', valueA: '3 min = 3 hrs', valueB: '15 min = 2 hrs', highlightDifference: true },
      { featureName: 'Warranty', valueA: '2 Years Manufacturer', valueB: '1 Year Manufacturer' }
    ],
    alternativeProductIds: ['prod-gem-1', 'prod-tech-anker-q30', 'prod-3'],
    seo: {
      metaTitle: 'Sony WH-1000XM5 vs Bose QC Ultra: Which Is Worth It in 2026?',
      metaDescription: 'Side-by-side technical comparison of Sony WH-1000XM5 vs Bose QuietComfort Ultra. Compare battery, ANC, microphones, and verified worth scores.',
      focusKeyword: 'sony wh-1000xm5 vs bose qc ultra',
      slug: 'sony-wh-1000xm5-vs-bose-qc-ultra',
      seoScore: 94,
      keywordDensity: 2.4,
      readabilityScore: 88,
      ogTitle: 'Sony WH-1000XM5 vs Bose QC Ultra — Real Benchmark Test',
      ogDescription: 'Which premium wireless ANC headphone is truly worth your money? Full head-to-head lab comparison.',
      indexable: true,
      inSitemap: true
    },
    createdAt: '2026-01-15T00:00:00.000Z',
    updatedAt: '2026-08-16T12:00:00.000Z'
  },
  {
    id: 'comp-2',
    slug: 'earfun-air-pro-4-vs-anker-life-q30',
    title: 'EarFun Air Pro 4 vs Anker Soundcore Life Q30',
    type: 'pvp',
    productAId: 'prod-gem-1',
    productBId: 'prod-tech-anker-q30',
    category: 'tech',
    views: 8720,
    winnerId: 'prod-gem-1',
    verdictText: 'EarFun Air Pro 4 wins for audiophile Qualcomm Snapdragon Sound, superior IPX5 water resistance, and pocket portability.',
    whyWinner: 'Lossless aptX + LDAC codec support, IPX5 weatherproofing, and 52-hour wireless case in an ultra-compact form factor.',
    whenToChooseB: 'Choose Anker Q30 if you strictly prefer over-ear earcups for long 8-hour office shifts.',
    scorecards: [
      { name: 'Portability & Form Factor', weight: 30, scoreA: 9.8, scoreB: 7.2, winner: 'A', note: 'Earbuds fit in coin pocket' },
      { name: 'Codec Support & Clarity', weight: 30, scoreA: 9.7, scoreB: 8.4, winner: 'A', note: 'EarFun includes Snapdragon Sound & LDAC' },
      { name: 'Battery Total', weight: 20, scoreA: 9.6, scoreB: 9.5, winner: 'A', note: '52 hrs (EarFun) vs 40 hrs (Anker)' },
      { name: 'Value per Dollar', weight: 20, scoreA: 9.9, scoreB: 9.6, winner: 'A', note: 'Both represent unbeatable sub-$80 value' }
    ],
    specRows: [
      { featureName: 'Type', valueA: 'In-Ear TWS Earbuds', valueB: 'Over-Ear Headphones', highlightDifference: true },
      { featureName: 'Price', valueA: '$79.99', valueB: '$49.99', highlightDifference: true },
      { featureName: 'Codecs', valueA: 'aptX Lossless, LDAC, LC3', valueB: 'AAC, SBC', highlightDifference: true },
      { featureName: 'Water Resistance', valueA: 'IPX5 Sweatproof', valueB: 'None (Indoor only)', highlightDifference: true }
    ],
    alternativeProductIds: ['prod-1', 'prod-tech-bose-ultra'],
    seo: {
      metaTitle: 'EarFun Air Pro 4 vs Anker Soundcore Q30: Budget Audio Faceoff',
      metaDescription: 'Compare EarFun Air Pro 4 wireless earbuds vs Anker Soundcore Life Q30 headphones. Which budget audio champion is better?',
      focusKeyword: 'earfun air pro 4 vs anker q30',
      slug: 'earfun-air-pro-4-vs-anker-life-q30',
      seoScore: 91,
      keywordDensity: 2.1,
      readabilityScore: 90,
      indexable: true,
      inSitemap: true
    },
    createdAt: '2026-02-10T00:00:00.000Z',
    updatedAt: '2026-08-16T12:00:00.000Z'
  },
  {
    id: 'comp-3',
    slug: 'breville-barista-touch-vs-fellow-ode-gen-2',
    title: 'Breville Barista Touch Impress vs Fellow Ode Gen 2',
    type: 'pvp',
    productAId: 'prod-2',
    productBId: 'prod-rising-2',
    category: 'kitchen',
    views: 6540,
    winnerId: 'prod-2',
    verdictText: 'Breville Barista Touch Impress wins for all-in-one automated espresso and microfoam texturing.',
    whyWinner: 'Complete cafe solution with automated assisted tamping, touchscreen guidance, and milk texturing in a single machine.',
    whenToChooseB: 'Choose Fellow Ode Gen 2 if you already have a brew bar and want the absolute best filter/pour-over consistency on the market.',
    scorecards: [
      { name: 'Versatility', weight: 40, scoreA: 9.8, scoreB: 7.5, winner: 'A', note: 'Espresso, Americano, Latte vs Filter only' },
      { name: 'Grind Consistency', weight: 30, scoreA: 8.8, scoreB: 9.8, winner: 'B', note: 'Fellow 64mm flat burrs excel at drip coffee' },
      { name: 'Ease of Use', weight: 20, scoreA: 9.6, scoreB: 9.4, winner: 'A', note: 'Breville guided assisted tamping eliminates errors' },
      { name: 'Countertop Footprint', weight: 10, scoreA: 7.8, scoreB: 9.5, winner: 'B', note: 'Fellow is compact and single-dose' }
    ],
    seo: {
      metaTitle: 'Breville Barista Touch Impress vs Fellow Ode Gen 2: Coffee Guide',
      metaDescription: 'Espresso all-in-one machine vs precision flat-burr grinder. Which kitchen coffee investment matches your routine?',
      focusKeyword: 'breville vs fellow coffee',
      slug: 'breville-barista-touch-vs-fellow-ode-gen-2',
      seoScore: 89,
      keywordDensity: 1.9,
      readabilityScore: 86,
      indexable: true,
      inSitemap: true
    },
    createdAt: '2026-03-01T00:00:00.000Z',
    updatedAt: '2026-08-16T12:00:00.000Z'
  }
];

export const SEED_BRAND_COMPARISONS: BrandComparison[] = [
  {
    id: 'brand-comp-1',
    slug: 'sony-vs-bose',
    brandA: 'Sony',
    brandB: 'Bose',
    overallWinner: 'Sony (Best Overall Value & Codecs)',
    summary: 'Sony dominates in high-resolution codec support (LDAC), battery life, and smart EQ app customization, while Bose leads in active noise isolation and plush headband comfort.',
    scorecards: [
      { name: 'Product Quality & Sound', weight: 30, scoreA: 9.4, scoreB: 9.2, winner: 'A' },
      { name: 'Noise Cancellation Depth', weight: 30, scoreA: 9.5, scoreB: 9.7, winner: 'B' },
      { name: 'Value for Money', weight: 20, scoreA: 9.2, scoreB: 8.3, winner: 'A' },
      { name: 'App Ecosystem & Codecs', weight: 20, scoreA: 9.6, scoreB: 8.5, winner: 'A' }
    ],
    lineup: [
      { category: 'Over-Ear Headphones', brandABest: 'Sony WH-1000XM5 ($349)', brandBBest: 'Bose QC Ultra ($379)', winner: 'Sony (Battery & Codecs)', reason: '30h battery vs 24h battery' },
      { category: 'Earbuds', brandABest: 'Sony WF-1000XM5 ($279)', brandBBest: 'Bose QC Earbuds Ultra ($299)', winner: 'Bose (Fit & Stability)', reason: 'More secure ear stability bands' },
      { category: 'Travel Speakers', brandABest: 'Sony ULT Field 1 ($129)', brandBBest: 'Bose SoundLink Flex ($149)', winner: 'Bose (Waterproof Acoustics)', reason: 'Clearer vocal staging outdoors' },
      { category: 'Soundbars', brandABest: 'Sony Bravia Theater Bar 8 ($849)', brandBBest: 'Bose Smart Ultra Soundbar ($799)', winner: 'Sony (Dolby Atmos Spatial)', reason: 'Better HDMI 2.1 passthrough' }
    ],
    seo: {
      metaTitle: 'Sony vs Bose (2026 Brand Comparison): Which Audio Giant Wins?',
      metaDescription: 'Complete brand analysis of Sony vs Bose across headphones, earbuds, speakers, and soundbars with verified worth scores.',
      focusKeyword: 'sony vs bose',
      slug: 'sony-vs-bose',
      seoScore: 95,
      keywordDensity: 2.3,
      readabilityScore: 89,
      indexable: true,
      inSitemap: true
    }
  },
  {
    id: 'brand-comp-2',
    slug: 'apple-vs-samsung',
    brandA: 'Apple',
    brandB: 'Samsung',
    overallWinner: 'Apple (Ecosystem Synergy & Battery Endurance)',
    summary: 'Apple provides industry-leading chip efficiency, build longevity, and resale value, while Samsung offers broader customization, foldable form factors, and open hardware options.',
    scorecards: [
      { name: 'Chip Performance & Battery', weight: 35, scoreA: 9.8, scoreB: 9.1, winner: 'A' },
      { name: 'Hardware Diversity', weight: 25, scoreA: 8.2, scoreB: 9.8, winner: 'B' },
      { name: 'Display Innovation', weight: 20, scoreA: 9.3, scoreB: 9.6, winner: 'B' },
      { name: 'Long-term Resale Value', weight: 20, scoreA: 9.7, scoreB: 7.9, winner: 'A' }
    ],
    lineup: [
      { category: 'Laptops', brandABest: 'MacBook Air 15 M3 ($1,499)', brandBBest: 'Galaxy Book4 Pro ($1,449)', winner: 'Apple (Silent 18h Battery)', reason: 'Fanless thermal efficiency' },
      { category: 'Smartphones', brandABest: 'iPhone 16 Pro Max ($1,199)', brandBBest: 'Galaxy S25 Ultra ($1,299)', winner: 'Tie (OS Preference)', reason: 'iOS vs OneUI ecosystem' },
      { category: 'Smartwatches', brandABest: 'Apple Watch Series 10 ($399)', brandBBest: 'Galaxy Watch Ultra ($649)', winner: 'Apple (Heart & Sensor Accuracy)', reason: 'Class-leading ECG sensor' }
    ],
    seo: {
      metaTitle: 'Apple vs Samsung (2026 Ecosystem Faceoff): Full Comparison',
      metaDescription: 'Detailed brand comparison of Apple vs Samsung devices. Compare laptops, smartphones, wearables, and ecosystem value.',
      focusKeyword: 'apple vs samsung',
      slug: 'apple-vs-samsung',
      seoScore: 92,
      keywordDensity: 2.0,
      readabilityScore: 88,
      indexable: true,
      inSitemap: true
    }
  }
];

export const SEED_BACKLINKS = [
  {
    id: 'bl-1',
    sourceUrl: 'https://techradar.com/audio/best-noise-cancelling-headphones',
    targetUrl: '/compare/sony-wh-1000xm5-vs-bose-qc-ultra',
    anchorText: 'Sony vs Bose full lab comparison',
    domainAuthority: 89,
    status: 'active' as const,
    discoveredDate: '2026-02-15',
    lastChecked: '2026-08-16'
  },
  {
    id: 'bl-2',
    sourceUrl: 'https://theverge.com/reviews/headphones-earbuds-roundup',
    targetUrl: '/discover/hidden-gems',
    anchorText: 'Best Buy Cart hidden gems discovery',
    domainAuthority: 91,
    status: 'active' as const,
    discoveredDate: '2026-03-01',
    lastChecked: '2026-08-16'
  },
  {
    id: 'bl-3',
    sourceUrl: 'https://wirecutter.nytimes.com/electronics/earbuds',
    targetUrl: '/compare/earfun-air-pro-4-vs-anker-life-q30',
    anchorText: 'EarFun Air Pro 4 testing benchmarks',
    domainAuthority: 94,
    status: 'active' as const,
    discoveredDate: '2026-04-12',
    lastChecked: '2026-08-16'
  },
  {
    id: 'bl-4',
    sourceUrl: 'https://cnet.com/tech/mobile/best-power-banks-for-travel',
    targetUrl: '/trending',
    anchorText: 'Anker Prime 200W trending velocity',
    domainAuthority: 88,
    status: 'active' as const,
    discoveredDate: '2026-05-18',
    lastChecked: '2026-08-16'
  },
  {
    id: 'bl-5',
    sourceUrl: 'https://medium.com/gadget-insider/overrated-tech-products',
    targetUrl: '/discover/overhyped',
    anchorText: 'Overhyped watch value gap analysis',
    domainAuthority: 74,
    status: 'active' as const,
    discoveredDate: '2026-06-20',
    lastChecked: '2026-08-16'
  }
];
