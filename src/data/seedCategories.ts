import { Category } from '../types/category';

export const SEED_CATEGORIES: Category[] = [
  // --- TOP 4 TRENDING CATEGORIES ---
  {
    id: 'tech',
    name: 'Tech & Electronics',
    slug: 'tech',
    icon: 'Laptop',
    emoji: '💻',
    description: 'The latest innovations, high-performance gear, and smart devices. From wireless earbuds to powerful laptops — we filter the hype.',
    weeklyGrowth: 34,
    isTrendingCat: true,
    stage: 'core',
    featuredProductCount: 1234,
    trendingCount: 28,
    trendInsight: 'Tech: 5 rising fast products (Anker Prime, Keychron Q1 Pro) | Hi-Res LDAC earbuds surging',
    editorPicks: {
      bestOverallId: 'prod-1', // Sony WH-1000XM5
      bestBudgetId: 'prod-gem-1', // EarFun Air Pro 4
      hiddenGemId: 'prod-gem-1',
      overhypedId: 'prod-overhyped-1'
    },
    subcategories: [
      {
        id: 'headphones',
        name: 'Headphones & Audio',
        slug: 'headphones',
        productCount: 142,
        heroHeadline: 'Best Headphones for Every Budget (2026 Guide)',
        heroSubtitle: 'Whether you need noise-canceling for travel or studio-grade sound for work, find the perfect pair without the marketing fluff.',
        topPickId: 'prod-1',
        budgetPickId: 'prod-gem-1',
        premiumPickId: 'prod-1'
      },
      {
        id: 'laptops',
        name: 'Laptops & Mac',
        slug: 'laptops',
        productCount: 98,
        heroHeadline: 'Top Laptops & Ultrabooks for Productivity',
        heroSubtitle: 'Benchmarked for battery endurance, thermal throttling, and real-world multitasking.',
        topPickId: 'prod-3',
        budgetPickId: 'prod-3',
        premiumPickId: 'prod-3'
      },
      { id: 'keyboards', name: 'Keyboards & Mice', slug: 'keyboards', productCount: 64 },
      { id: 'smartphones', name: 'Smartphones & Mobile', slug: 'smartphones', productCount: 88 },
      { id: 'tablets', name: 'Tablets & E-Readers', slug: 'tablets', productCount: 45 },
      { id: 'accessories', name: 'Power Banks & Chargers', slug: 'accessories', productCount: 112 },
      { id: 'wearables', name: 'Smartwatches & Rings', slug: 'wearables', productCount: 52 },
      { id: 'cameras', name: 'Action & Vlog Cameras', slug: 'cameras', productCount: 38 },
      { id: 'gaming', name: 'Gaming Peripherals', slug: 'gaming', productCount: 76 },
      { id: 'audio-dac', name: 'DACs & Amps', slug: 'audio-dac', productCount: 29 }
    ]
  },
  {
    id: 'kitchen',
    name: 'Kitchen & Coffee',
    slug: 'kitchen',
    icon: 'Coffee',
    emoji: '🍳',
    description: 'Precision espresso machines, single-dose burr grinders, smart air fryers, and professional cookware.',
    weeklyGrowth: 28,
    isTrendingCat: true,
    stage: 'core',
    featuredProductCount: 892,
    trendingCount: 19,
    trendInsight: 'Kitchen: High demand for automated assisted-tamp espresso and anti-static grinders',
    editorPicks: {
      bestOverallId: 'prod-2', // Breville Barista Touch
      bestBudgetId: 'prod-rising-2', // Fellow Ode Gen 2
      hiddenGemId: 'prod-rising-2',
      overhypedId: 'prod-overhyped-2'
    },
    subcategories: [
      { id: 'espresso', name: 'Espresso & Coffee', slug: 'espresso', productCount: 118 },
      { id: 'grinders', name: 'Burr Grinders', slug: 'grinders', productCount: 42 },
      { id: 'air-fryers', name: 'Air Fryers & Ovens', slug: 'air-fryers', productCount: 65 },
      { id: 'blenders', name: 'Blenders & Food Processors', slug: 'blenders', productCount: 54 },
      { id: 'cookware', name: 'Cast Iron & Stainless Cookware', slug: 'cookware', productCount: 89 },
      { id: 'knives', name: 'Chef Knives & Sharpeners', slug: 'knives', productCount: 72 },
      { id: 'kettles', name: 'Gooseneck Kettles', slug: 'kettles', productCount: 36 },
      { id: 'sous-vide', name: 'Sous Vide & Precision Cooking', slug: 'sous-vide', productCount: 24 }
    ]
  },
  {
    id: 'home',
    name: 'Smart Home & Living',
    slug: 'home',
    icon: 'Home',
    emoji: '🏠',
    description: 'Automated robotic vacuums, precision air purifiers, Matter-enabled smart lighting, and climate comfort.',
    weeklyGrowth: 22,
    isTrendingCat: true,
    stage: 'core',
    featuredProductCount: 1102,
    trendingCount: 24,
    trendInsight: 'Home: 3 hidden gems in HEPA filtration | Hot-water mop robots trending',
    editorPicks: {
      bestOverallId: 'prod-5', // Roborock S8 MaxV
      bestBudgetId: 'prod-4',
      hiddenGemId: 'prod-5',
      overhypedId: 'prod-overhyped-1' // AuraLux Halo Purifier
    },
    subcategories: [
      { id: 'robotic-vacuums', name: 'Robotic Vacuums & Mops', slug: 'robotic-vacuums', productCount: 68 },
      { id: 'air-purifiers', name: 'HEPA Air Purifiers', slug: 'air-purifiers', productCount: 49 },
      { id: 'smart-lighting', name: 'Smart Lighting & Bulbs', slug: 'smart-lighting', productCount: 84 },
      { id: 'hair-styling', name: 'Hair Care & Styling Tech', slug: 'hair-styling', productCount: 58 },
      { id: 'security', name: 'Smart Locks & Cameras', slug: 'security', productCount: 77 },
      { id: 'thermostats', name: 'Smart Thermostats', slug: 'thermostats', productCount: 31 },
      { id: 'soundbars', name: 'Home Theater & Soundbars', slug: 'soundbars', productCount: 62 }
    ]
  },
  {
    id: 'gifts',
    name: 'Curated Gifts & Finds',
    slug: 'gifts',
    icon: 'Gift',
    emoji: '🎁',
    description: 'Handpicked standout gifts categorized by budget, recipient, and occasion. Zero generic filler.',
    weeklyGrowth: 40,
    isTrendingCat: true,
    stage: 'core',
    featuredProductCount: 654,
    trendingCount: 32,
    trendInsight: 'Gifts: 12 curated standout tech & everyday gifts under $50',
    editorPicks: {
      bestOverallId: 'prod-rising-1',
      bestBudgetId: 'prod-gem-1',
      hiddenGemId: 'prod-8',
      overhypedId: 'prod-overhyped-2'
    },
    subcategories: [
      { id: 'gifts-under-50', name: 'Gifts Under $50', slug: 'under-50', productCount: 145 },
      { id: 'gifts-under-100', name: 'Gifts Under $100', slug: 'under-100', productCount: 118 },
      { id: 'for-him', name: 'Gifts For Him', slug: 'for-him', productCount: 94 },
      { id: 'for-her', name: 'Gifts For Her', slug: 'for-her', productCount: 96 },
      { id: 'tech-enthusiasts', name: 'Tech Enthusiast Gifts', slug: 'tech-enthusiasts', productCount: 82 },
      { id: 'stocking-stuffers', name: 'Everyday Carry Gifts', slug: 'edc-gifts', productCount: 67 }
    ]
  },

  // --- THE REMAINING 10 MASTER CATEGORIES ---
  {
    id: 'beauty',
    name: 'Beauty & Grooming',
    slug: 'beauty',
    icon: 'Sparkles',
    emoji: '💄',
    description: 'Dermatologist-tested skincare tools, ultrasonic cleansers, premium shavers, and restorative hair wellness.',
    stage: 'expanded',
    featuredProductCount: 420,
    trendingCount: 14,
    subcategories: [
      { id: 'skincare-tech', name: 'LED Masks & Facial Tech', slug: 'skincare-tech', productCount: 34 },
      { id: 'shavers', name: 'Electric Shavers & Trimmers', slug: 'shavers', productCount: 46 },
      { id: 'oral-care', name: 'Sonic Toothbrushes & Flossers', slug: 'oral-care', productCount: 39 }
    ]
  },
  {
    id: 'fashion',
    name: 'Fashion & Apparel',
    slug: 'fashion',
    icon: 'Shirt',
    emoji: '👕',
    description: 'Technical outerwear, merino wool essentials, minimalist footwear, and water-repellent urban apparel.',
    stage: 'expanded',
    featuredProductCount: 512,
    trendingCount: 11,
    subcategories: [
      { id: 'outerwear', name: 'Technical Jackets & Shells', slug: 'outerwear', productCount: 56 },
      { id: 'merino', name: 'Merino Wool Basics', slug: 'merino', productCount: 48 },
      { id: 'footwear', name: 'Ergonomic & Trail Footwear', slug: 'footwear', productCount: 62 }
    ]
  },
  {
    id: 'fitness',
    name: 'Fitness & Recovery',
    slug: 'fitness',
    icon: 'Activity',
    emoji: '💪',
    description: 'Smart recovery rings, percussive therapy massagers, adjustable smart dumbbells, and wearable metrics.',
    stage: 'new',
    featuredProductCount: 480,
    trendingCount: 16,
    trendInsight: 'Fitness: Deep tissue mini massage guns and titanium smart rings outperforming traditional bands',
    editorPicks: {
      bestOverallId: 'prod-7', // Oura Ring
      bestBudgetId: 'prod-rising-4', // Theragun Mini
      hiddenGemId: 'prod-rising-4',
      overhypedId: 'prod-7'
    },
    subcategories: [
      { id: 'recovery-gear', name: 'Massage Guns & Percussive', slug: 'recovery-gear', productCount: 41 },
      { id: 'smart-rings', name: 'Smart Rings & Biometrics', slug: 'smart-rings', productCount: 28 },
      { id: 'home-gym', name: 'Smart Dumbbells & Bands', slug: 'home-gym', productCount: 52 },
      { id: 'hydration', name: 'Electrolytes & Shakers', slug: 'hydration', productCount: 34 }
    ]
  },
  {
    id: 'travel',
    name: 'Travel & EDC',
    slug: 'travel',
    icon: 'Compass',
    emoji: '✈️',
    description: 'Ultralight clamshell backpacks, polycarbonate carry-ons, insulated tumblers, and universal travel adapters.',
    stage: 'new',
    featuredProductCount: 620,
    trendingCount: 21,
    trendInsight: 'Travel: Stand-alone structure Cordura backpacks and vacuum tumblers driving record volume',
    editorPicks: {
      bestOverallId: 'prod-rising-3', // Aer City Pack Pro
      bestBudgetId: 'prod-8', // Stanley Tumbler
      hiddenGemId: 'prod-rising-3',
      overhypedId: 'prod-8'
    },
    subcategories: [
      { id: 'backpacks', name: 'Everyday Tech Backpacks', slug: 'backpacks', productCount: 68 },
      { id: 'luggage', name: 'Hard-Shell Carry-On Luggage', slug: 'luggage', productCount: 44 },
      { id: 'tumblers', name: 'Insulated Bottles & Tumblers', slug: 'tumblers', productCount: 52 },
      { id: 'adapters', name: 'GaN Travel Adapters', slug: 'adapters', productCount: 31 }
    ]
  },
  {
    id: 'auto',
    name: 'Automotive & Dash Tech',
    slug: 'auto',
    icon: 'Car',
    emoji: '🚗',
    description: '4K dual dash cams, MagSafe wireless car mounts, portable jump starters, and tire inflators.',
    stage: 'new',
    featuredProductCount: 310,
    trendingCount: 9,
    subcategories: [
      { id: 'dashcams', name: '4K Dash Cameras', slug: 'dashcams', productCount: 38 },
      { id: 'jump-starters', name: 'Portable Jump Starters', slug: 'jump-starters', productCount: 29 },
      { id: 'mounts', name: 'MagSafe Car Mounts', slug: 'mounts', productCount: 41 }
    ]
  },
  {
    id: 'outdoor',
    name: 'Outdoor & Adventure',
    slug: 'outdoor',
    icon: 'Tent',
    emoji: '🏕️',
    description: 'Portable solar generators, weatherproof camping lighting, water filtration systems, and trail gear.',
    stage: 'new',
    featuredProductCount: 390,
    trendingCount: 12,
    subcategories: [
      { id: 'solar-power', name: 'Solar Generators & Power Stations', slug: 'solar-power', productCount: 32 },
      { id: 'camp-lighting', name: 'Headlamps & Lanterns', slug: 'camp-lighting', productCount: 47 },
      { id: 'water-filters', name: 'Trail Water Filtration', slug: 'water-filters', productCount: 26 }
    ]
  },
  {
    id: 'pets',
    name: 'Pet Care & Tech',
    slug: 'pets',
    icon: 'Dog',
    emoji: '🐕',
    description: 'Automatic GPS pet trackers, self-cleaning litter boxes, smart fountain dispensers, and orthopedic pet beds.',
    stage: 'expanded',
    featuredProductCount: 280,
    trendingCount: 8,
    subcategories: [
      { id: 'feeders', name: 'Smart Feeders & Fountains', slug: 'feeders', productCount: 36 },
      { id: 'gps-trackers', name: 'GPS Pet Trackers', slug: 'gps-trackers', productCount: 22 },
      { id: 'grooming', name: 'Low-Noise Grooming Vacuums', slug: 'grooming', productCount: 29 }
    ]
  },
  {
    id: 'kids',
    name: 'Kids & Family',
    slug: 'kids',
    icon: 'Baby',
    emoji: '👶',
    description: 'Smart baby monitors with breathing tracking, STEM educational kits, white noise machines, and stroller accessories.',
    stage: 'expanded',
    featuredProductCount: 340,
    trendingCount: 9,
    subcategories: [
      { id: 'monitors', name: 'Smart Video Baby Monitors', slug: 'monitors', productCount: 31 },
      { id: 'stem-toys', name: 'STEM Robotic Coding Kits', slug: 'stem-toys', productCount: 42 },
      { id: 'sound-machines', name: 'White Noise Sleep Machines', slug: 'sound-machines', productCount: 27 }
    ]
  },
  {
    id: 'office',
    name: 'Workspace & Ergonomics',
    slug: 'office',
    icon: 'Monitor',
    emoji: '🖥️',
    description: 'Electric dual-motor standing desks, mesh ergonomic chairs, mechanical keyboards, and monitor arms.',
    stage: 'core',
    featuredProductCount: 520,
    trendingCount: 17,
    trendInsight: 'Office: Custom CNC aluminum keyboards and lumbar-support mesh chairs leading workspace conversions',
    editorPicks: {
      bestOverallId: 'prod-6', // Keychron Q1 Pro
      bestBudgetId: 'prod-6',
      hiddenGemId: 'prod-6',
      overhypedId: 'prod-rising-1'
    },
    subcategories: [
      { id: 'chairs', name: 'Ergonomic Mesh Chairs', slug: 'chairs', productCount: 44 },
      { id: 'standing-desks', name: 'Electric Standing Desks', slug: 'standing-desks', productCount: 38 },
      { id: 'monitor-arms', name: 'Heavy-Duty Monitor Arms', slug: 'monitor-arms', productCount: 36 },
      { id: 'desk-pads', name: 'Felt & Leather Desk Pads', slug: 'desk-pads', productCount: 48 }
    ]
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle & Wellness',
    slug: 'lifestyle',
    icon: 'Heart',
    emoji: '🌟',
    description: 'Circadian sunrise alarm clocks, ultrasonic aroma diffusers, weighted blankets, and acoustic sleep masks.',
    stage: 'expanded',
    featuredProductCount: 380,
    trendingCount: 13,
    subcategories: [
      { id: 'sunrise-clocks', name: 'Sunrise Alarm Clocks', slug: 'sunrise-clocks', productCount: 29 },
      { id: 'diffusers', name: 'Ultrasonic Essential Diffusers', slug: 'diffusers', productCount: 37 },
      { id: 'weighted-blankets', name: 'Cooling Weighted Blankets', slug: 'weighted-blankets', productCount: 32 }
    ]
  }
];
