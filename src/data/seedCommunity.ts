import { UserProfile, UserActivity } from '../types/user';
import { WishlistItem, WatchlistItem, UserReview, CommunityComment, LoyaltyTier, LoyaltyRule } from '../types/community';

export const SEED_LOYALTY_TIERS: LoyaltyTier[] = [
  {
    id: 'tier-novice',
    name: 'Novice Explorer',
    minPoints: 0,
    maxPoints: 150,
    badgeColor: '#64748B',
    description: 'New member discovering curated deals and worth scores.',
    perks: ['Save up to 20 products in wishlist', 'Track 5 price drop alerts']
  },
  {
    id: 'tier-enthusiast',
    name: 'Enthusiast Reviewer',
    minPoints: 151,
    maxPoints: 500,
    badgeColor: '#2563EB',
    description: 'Active contributor writing authentic product reviews.',
    perks: ['Verified reviewer badge', 'Unlimited wishlist items', 'Track 20 price alerts', 'Early access to flash deals']
  },
  {
    id: 'tier-expert',
    name: 'Expert Critic',
    minPoints: 501,
    maxPoints: 1500,
    badgeColor: '#9333EA',
    description: 'Highly trusted community member with top helpful feedback.',
    perks: ['Expert Critic badge', 'Reviews featured at top of product pages', 'Unlimited price drop alerts', 'Exclusive weekly insider reports']
  },
  {
    id: 'tier-master',
    name: 'Master Curator',
    minPoints: 1501,
    maxPoints: 99999,
    badgeColor: '#D97706',
    description: 'Elite tastemaker and trusted product intelligence authority.',
    perks: ['Master Curator Gold badge', 'Direct invitation to prototype testing', 'Direct editorial collaboration perks', 'VIP concierge support']
  }
];

export const SEED_LOYALTY_RULES: LoyaltyRule[] = [
  {
    id: 'rule-write-review',
    action: 'Write a Verified Product Review',
    pointsAwarded: 50,
    description: 'Awarded when a user posts a detailed review with pros and cons.',
    isEnabled: true
  },
  {
    id: 'rule-helpful-vote',
    action: 'Receive a Helpful Review Vote',
    pointsAwarded: 10,
    description: 'Awarded each time another user marks your review as helpful.',
    isEnabled: true
  },
  {
    id: 'rule-post-comment',
    action: 'Participate in Guide Discussions',
    pointsAwarded: 15,
    description: 'Awarded when contributing insights to buying guides.',
    isEnabled: true
  },
  {
    id: 'rule-create-alert',
    action: 'Set Up a Price Drop Radar',
    pointsAwarded: 20,
    description: 'Awarded when tracking a product for target price drops.',
    isEnabled: true
  },
  {
    id: 'rule-daily-visit',
    action: 'Daily Intelligence Check-in',
    pointsAwarded: 5,
    description: 'Awarded on daily login to browse trending and hidden gems.',
    isEnabled: true
  }
];

export const SEED_USERS: UserProfile[] = [
  {
    id: 'user-john-doe',
    email: 'john@email.com',
    username: 'johndoe',
    fullName: 'John Doe',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    bio: 'Tech enthusiast, mechanical keyboard builder, and espresso aficionado. Living in New York.',
    location: 'New York, USA',
    website: 'https://johndoe.dev',
    role: 'user',
    status: 'active',
    memberSince: 'January 2026',
    lastActive: 'Just now',
    reputationPoints: 450,
    tierId: 'tier-enthusiast',
    tierName: 'Enthusiast Reviewer',
    stats: {
      reviewsCount: 12,
      helpfulVotesCount: 234,
      wishlistCount: 6,
      watchlistCount: 4,
      commentsCount: 8
    }
  },
  {
    id: 'user-sarah-jenkins',
    email: 'sarah@email.com',
    username: 'sarahj',
    fullName: 'Sarah Jenkins',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    bio: 'Audio engineer and remote worker based in London. Testing ANC headphones and desk setups.',
    location: 'London, UK',
    website: 'https://sarahaudio.co.uk',
    role: 'editor',
    status: 'active',
    memberSince: 'February 2026',
    lastActive: '2 hours ago',
    reputationPoints: 1240,
    tierId: 'tier-expert',
    tierName: 'Expert Critic',
    stats: {
      reviewsCount: 28,
      helpfulVotesCount: 890,
      wishlistCount: 14,
      watchlistCount: 7,
      commentsCount: 35
    }
  },
  {
    id: 'user-mike-reynolds',
    email: 'mike@email.com',
    username: 'mikereynolds',
    fullName: 'Mike Reynolds',
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
    bio: 'Outdoor photographer, gravel cyclist, and gadget tester from Vancouver.',
    location: 'Vancouver, Canada',
    role: 'user',
    status: 'active',
    memberSince: 'March 2026',
    lastActive: '1 day ago',
    reputationPoints: 620,
    tierId: 'tier-expert',
    tierName: 'Expert Critic',
    stats: {
      reviewsCount: 15,
      helpfulVotesCount: 310,
      wishlistCount: 9,
      watchlistCount: 5,
      commentsCount: 12
    }
  },
  {
    id: 'user-emma-watson',
    email: 'emma.w@email.com',
    username: 'emmawatson',
    fullName: 'Emma Watson',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    bio: 'Smart home optimizer and barista hobbyist. Testing air quality monitors and automated grinders.',
    location: 'Berlin, Germany',
    role: 'user',
    status: 'active',
    memberSince: 'April 2026',
    lastActive: '3 days ago',
    reputationPoints: 210,
    tierId: 'tier-enthusiast',
    tierName: 'Enthusiast Reviewer',
    stats: {
      reviewsCount: 5,
      helpfulVotesCount: 85,
      wishlistCount: 4,
      watchlistCount: 3,
      commentsCount: 6
    }
  },
  {
    id: 'user-david-kim',
    email: 'david.k@email.com',
    username: 'davidkim',
    fullName: 'David Kim',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    bio: 'EDC minimalist and ultralight traveler. Checking every gram and USB-C port.',
    location: 'Seoul / Austin, TX',
    role: 'user',
    status: 'suspended',
    memberSince: 'May 2026',
    lastActive: '1 week ago',
    reputationPoints: 80,
    tierId: 'tier-novice',
    tierName: 'Novice Explorer',
    stats: {
      reviewsCount: 2,
      helpfulVotesCount: 12,
      wishlistCount: 3,
      watchlistCount: 2,
      commentsCount: 1
    }
  }
];

export const SEED_ACTIVITIES: UserActivity[] = [
  {
    id: 'act-1',
    userId: 'user-john-doe',
    action: 'Added product to wishlist',
    targetTitle: 'Sony WH-1000XM5 Noise Canceling Headphones',
    targetUrl: '/product-detail',
    type: 'wishlist',
    timestamp: '2 hours ago'
  },
  {
    id: 'act-2',
    userId: 'user-john-doe',
    action: 'Price drop alert triggered at $249.99 (Target: $250.00)',
    targetTitle: 'Anker Prime 27,650mAh Power Bank (250W)',
    targetUrl: '/deals/price-drops',
    type: 'alert',
    timestamp: 'Yesterday at 4:15 PM'
  },
  {
    id: 'act-3',
    userId: 'user-john-doe',
    action: 'Published verified review with Worth Score breakdown',
    targetTitle: 'Breville Barista Touch Espresso Machine',
    targetUrl: '/product-detail',
    type: 'review',
    timestamp: 'August 14, 2026'
  },
  {
    id: 'act-4',
    userId: 'user-john-doe',
    action: 'Set price drop radar for target price $549.00',
    targetTitle: 'Dyson V15 Detect Cordless Vacuum',
    targetUrl: '/deals/price-drops',
    type: 'watchlist',
    timestamp: 'August 12, 2026'
  }
];

export const SEED_WISHLISTS: WishlistItem[] = [
  {
    id: 'wish-1',
    userId: 'user-john-doe',
    productId: 'prod-1', // Sony WH-1000XM5
    addedAt: '2026-08-16T14:30:00Z',
    priority: 'high',
    notes: 'Waiting for Black Friday or price drop under $280'
  },
  {
    id: 'wish-2',
    userId: 'user-john-doe',
    productId: 'prod-2', // Breville Barista Touch
    addedAt: '2026-08-14T10:15:00Z',
    priority: 'medium',
    notes: 'For the home coffee bar upgrade'
  },
  {
    id: 'wish-3',
    userId: 'user-john-doe',
    productId: 'prod-3', // Dyson V15
    addedAt: '2026-08-10T18:00:00Z',
    priority: 'high',
    notes: 'Laser detect feature seems worth it'
  },
  {
    id: 'wish-4',
    userId: 'user-john-doe',
    productId: 'prod-rising-1', // Anker Prime
    addedAt: '2026-08-08T09:20:00Z',
    priority: 'low'
  }
];

export const SEED_WATCHLISTS: WatchlistItem[] = [
  {
    id: 'watch-1',
    userId: 'user-john-doe',
    productId: 'prod-1',
    initialPriceUSD: 399.99,
    currentPriceUSD: 298.00,
    targetPriceUSD: 280.00,
    alertTriggered: false,
    alertEnabled: true,
    createdAt: '2026-08-10T12:00:00Z'
  },
  {
    id: 'watch-2',
    userId: 'user-john-doe',
    productId: 'prod-rising-1',
    initialPriceUSD: 179.99,
    currentPriceUSD: 129.99,
    targetPriceUSD: 135.00,
    alertTriggered: true,
    alertEnabled: true,
    createdAt: '2026-08-05T08:00:00Z',
    lastTriggeredAt: '2026-08-15T16:20:00Z'
  },
  {
    id: 'watch-3',
    userId: 'user-john-doe',
    productId: 'prod-3',
    initialPriceUSD: 749.99,
    currentPriceUSD: 599.99,
    targetPriceUSD: 550.00,
    alertTriggered: false,
    alertEnabled: true,
    createdAt: '2026-08-12T14:10:00Z'
  }
];

export const SEED_REVIEWS: UserReview[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    productName: 'Sony WH-1000XM5 Wireless Headphones',
    productSlug: 'sony-wh-1000xm5',
    productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80',
    userId: 'user-sarah-jenkins',
    userName: 'Sarah Jenkins',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    userTier: 'Expert Critic',
    rating: 5,
    title: 'Unrivaled ANC for long flights & daily London subway commutes',
    content: 'After testing both the Bose QC Ultra and the XM5 for 6 months across 4 international flights, the XM5 microphone array and adaptive noise canceling clearly win. Call quality is crystal clear even in noisy coffee shops. Comfort over 6+ hours is superb with zero headband hotspotting.',
    pros: ['Class-leading ANC and wind reduction', 'Exceptional 8-mic beamforming for calls', '30-hour real battery life with USB-PD quick charge'],
    cons: ['Earcups do not fold inward like XM4', 'Auto-ANC optimizer cannot be manually set to full max'],
    isVerifiedPurchase: true,
    helpfulUpvotes: 248,
    helpfulDownvotes: 12,
    status: 'approved',
    createdAt: '2026-08-14T11:20:00Z',
    replies: [
      {
        id: 'reply-1',
        reviewId: 'rev-1',
        userId: 'user-john-doe',
        userName: 'John Doe',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        content: 'Spot on review. The microphone upgrade over the XM4 alone justified the purchase for Zoom calls.',
        createdAt: '2026-08-15T09:10:00Z'
      }
    ]
  },
  {
    id: 'rev-2',
    productId: 'prod-1',
    productName: 'Sony WH-1000XM5 Wireless Headphones',
    productSlug: 'sony-wh-1000xm5',
    productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80',
    userId: 'user-mike-reynolds',
    userName: 'Mike Reynolds',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
    userTier: 'Expert Critic',
    rating: 4,
    title: 'Outstanding sound profile, but case is noticeably bulkier',
    content: 'The soundstage and LDAC high-resolution fidelity are top tier. However, if you pack light for backpacking, the larger non-folding hard case takes up significantly more bag space compared to the older XM4.',
    pros: ['Punchy sub-bass without muddiness', 'Multipoint Bluetooth 5.2 works flawlessly between Mac & iPhone'],
    cons: ['Case is significantly larger in backpack'],
    isVerifiedPurchase: true,
    helpfulUpvotes: 94,
    helpfulDownvotes: 5,
    status: 'approved',
    createdAt: '2026-08-10T16:45:00Z'
  },
  {
    id: 'rev-3',
    productId: 'prod-2',
    productName: 'Breville Barista Touch Espresso Machine',
    productSlug: 'breville-barista-touch',
    productImage: 'https://images.unsplash.com/photo-1587080413959-06b859fb107d?auto=format&fit=crop&w=300&q=80',
    userId: 'user-john-doe',
    userName: 'John Doe',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    userTier: 'Enthusiast Reviewer',
    rating: 5,
    title: 'ThermoJet 3-second heat up changes busy mornings completely',
    content: 'Went from paying $6.50 daily for flat whites to pulling cafe-quality espresso in under 90 seconds. The automatic micro-foam milk texturing produces silky latte art quality foam with zero guesswork.',
    pros: ['Instant 3-second ready time', 'Automated milk steaming with temperature sensor', 'Intuitive touchscreen recipe memory'],
    cons: ['Hopper retention requires regular cleaning'],
    isVerifiedPurchase: true,
    helpfulUpvotes: 182,
    helpfulDownvotes: 7,
    status: 'approved',
    createdAt: '2026-08-08T14:30:00Z'
  },
  {
    id: 'rev-4',
    productId: 'prod-rising-1',
    productName: 'Anker Prime 27,650mAh Power Bank (250W)',
    productSlug: 'anker-prime-27650mah',
    productImage: 'https://images.unsplash.com/photo-1609592426815-1815858cf09f?auto=format&fit=crop&w=300&q=80',
    userId: 'user-emma-watson',
    userName: 'Emma Watson',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    userTier: 'Enthusiast Reviewer',
    rating: 5,
    title: 'Charges my 16" M3 Max MacBook Pro at full 140W speed on trains',
    content: 'The digital screen showing real-time wattages on each USB-C port is surprisingly useful. Airline TSA compliant at 99.54Wh. Fast recharges itself back to 100% in just 37 minutes with dual 140W input.',
    pros: ['Full 140W single-port output', 'Informative color OLED telemetry display', 'Sub-40 minute fast recharge'],
    cons: ['Heavy at 665 grams'],
    isVerifiedPurchase: true,
    helpfulUpvotes: 138,
    helpfulDownvotes: 3,
    status: 'approved',
    createdAt: '2026-08-12T09:00:00Z'
  },
  {
    id: 'rev-5',
    productId: 'prod-3',
    productName: 'Dyson V15 Detect Cordless Vacuum',
    productSlug: 'dyson-v15-detect',
    productImage: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=300&q=80',
    userId: 'user-david-kim',
    userName: 'David Kim',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    userTier: 'Novice Explorer',
    rating: 3,
    title: 'Green laser reveals everything, but battery drains quick on Boost',
    content: 'The green optical laser fluff head is shocking on dark hardwood floors. You will see dust you never knew existed. However, on high Boost mode battery only lasts 8-10 minutes.',
    pros: ['Laser reveals microscopic dust', 'Auto piezo particle sensor works well'],
    cons: ['Heavy in hand on stairs', 'High price tag'],
    isVerifiedPurchase: false,
    helpfulUpvotes: 42,
    helpfulDownvotes: 15,
    status: 'pending',
    createdAt: '2026-08-16T12:00:00Z'
  }
];

export const SEED_COMMENTS: CommunityComment[] = [
  {
    id: 'comm-1',
    targetType: 'guide',
    targetId: 'guide-1',
    targetTitle: 'How to Choose the Best Noise-Canceling Headphones in 2026',
    targetUrl: '/guides/how-to-choose-headphones',
    userId: 'user-mike-reynolds',
    userName: 'Mike Reynolds',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
    content: 'Great comparison between ANC attenuation curves and real-world cabin pressure. Did you test battery degradation after 200 cycles?',
    status: 'approved',
    createdAt: '2026-08-15T15:30:00Z',
    upvotes: 24,
    replies: [
      {
        id: 'comm-reply-1',
        targetType: 'guide',
        targetId: 'guide-1',
        targetTitle: 'How to Choose the Best Noise-Canceling Headphones in 2026',
        targetUrl: '/guides/how-to-choose-headphones',
        userId: 'user-sarah-jenkins',
        userName: 'Sarah Jenkins (Editorial)',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        content: 'Yes! Sony retained 91% capacity in accelerated lab testing, while Bose retained 88%. Both feature battery protection cutoff at 80% if enabled in the companion app.',
        status: 'approved',
        createdAt: '2026-08-15T16:10:00Z',
        upvotes: 18,
        parentId: 'comm-1'
      }
    ]
  },
  {
    id: 'comm-2',
    targetType: 'guide',
    targetId: 'guide-1',
    targetTitle: 'How to Choose the Best Noise-Canceling Headphones in 2026',
    targetUrl: '/guides/how-to-choose-headphones',
    userId: 'user-emma-watson',
    userName: 'Emma Watson',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    content: 'The section on ear cushion heat buildup is so true for people working in warm home offices. Glad you mentioned velour aftermarket pads.',
    status: 'approved',
    createdAt: '2026-08-14T18:45:00Z',
    upvotes: 15
  },
  {
    id: 'comm-3',
    targetType: 'product',
    targetId: 'prod-1',
    targetTitle: 'Sony WH-1000XM5 Wireless Headphones',
    targetUrl: '/product-detail',
    userId: 'user-john-doe',
    userName: 'John Doe',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    content: 'Does anyone know if the USB-C audio passthrough supports 24-bit 96kHz lossless without turning Bluetooth on?',
    status: 'approved',
    createdAt: '2026-08-16T10:15:00Z',
    upvotes: 8
  }
];
