import { GiftRecipient, GiftOccasion, GiftBudget, GiftInterest, GiftRule, RecommendationSettings, RecommendationAnalytics } from '../types/gifts';

export const SEED_GIFT_RECIPIENTS: GiftRecipient[] = [
  { id: 'rec-1', name: 'Dad', slug: 'dad', iconName: 'User', description: 'For fathers, grandfathers, and father figures', ageRanges: ['35-50', '50+'], isActive: true, displayOrder: 1, productCount: 234 },
  { id: 'rec-2', name: 'Mom', slug: 'mom', iconName: 'Heart', description: 'For mothers, grandmothers, and mother figures', ageRanges: ['35-50', '50+'], isActive: true, displayOrder: 2, productCount: 189 },
  { id: 'rec-3', name: 'Partner', slug: 'partner', iconName: 'HeartHandshake', description: 'For spouses, boyfriends, and girlfriends', ageRanges: ['18-24', '25-34', '35-50', '50+'], isActive: true, displayOrder: 3, productCount: 156 },
  { id: 'rec-4', name: 'Friend', slug: 'friend', iconName: 'Users', description: 'For close friends, roommates, and besties', ageRanges: ['18-24', '25-34', '35-50'], isActive: true, displayOrder: 4, productCount: 201 },
  { id: 'rec-5', name: 'Brother', slug: 'brother', iconName: 'UserCheck', description: 'For brothers, sons, and teen guys', ageRanges: ['13-17', '18-24', '25-34'], isActive: true, displayOrder: 5, productCount: 145 },
  { id: 'rec-6', name: 'Sister', slug: 'sister', iconName: 'UserPlus', description: 'For sisters, daughters, and teen girls', ageRanges: ['13-17', '18-24', '25-34'], isActive: true, displayOrder: 6, productCount: 168 },
  { id: 'rec-7', name: 'Kids', slug: 'kids', iconName: 'Smile', description: 'For children and young teens', ageRanges: ['Under 12', '13-17'], isActive: true, displayOrder: 7, productCount: 120 },
  { id: 'rec-8', name: 'Coworker', slug: 'coworker', iconName: 'Briefcase', description: 'For colleagues, team members, and bosses', ageRanges: ['25-34', '35-50'], isActive: true, displayOrder: 8, productCount: 94 }
];

export const SEED_GIFT_OCCASIONS: GiftOccasion[] = [
  { id: 'occ-1', name: 'Birthday', slug: 'birthday', iconName: 'Cake', description: 'Annual birthday celebrations', isActive: true, displayOrder: 1, productCount: 412 },
  { id: 'occ-2', name: 'Christmas / Holiday', slug: 'christmas', iconName: 'Gift', description: 'Holiday gifting and stocking stuffers', season: 'Winter', isActive: true, displayOrder: 2, productCount: 356 },
  { id: 'occ-3', name: 'Anniversary', slug: 'anniversary', iconName: 'Heart', description: 'Relationship and wedding milestones', isActive: true, displayOrder: 3, productCount: 180 },
  { id: 'occ-4', name: 'Graduation', slug: 'graduation', iconName: 'GraduationCap', description: 'High school and college grads', isActive: true, displayOrder: 4, productCount: 140 },
  { id: 'occ-5', name: 'Valentine\'s Day', slug: 'valentines', iconName: 'HeartHandshake', description: 'Romantic gifts and surprises', season: 'Winter', isActive: true, displayOrder: 5, productCount: 165 },
  { id: 'occ-6', name: 'Father\'s Day', slug: 'fathers-day', iconName: 'UserCheck', description: 'Dad appreciation day', season: 'Summer', isActive: true, displayOrder: 6, productCount: 195 },
  { id: 'occ-7', name: 'Mother\'s Day', slug: 'mothers-day', iconName: 'Heart', description: 'Mom appreciation day', season: 'Spring', isActive: true, displayOrder: 7, productCount: 210 },
  { id: 'occ-8', name: 'Housewarming', slug: 'housewarming', iconName: 'Home', description: 'New apartment or home upgrades', isActive: true, displayOrder: 8, productCount: 130 },
  { id: 'occ-9', name: 'Just Because', slug: 'just-because', iconName: 'Sparkles', description: 'Spontaneous surprises with no reason needed', isActive: true, displayOrder: 9, productCount: 220 }
];

export const SEED_GIFT_BUDGETS: GiftBudget[] = [
  { id: 'b-1', label: 'Under $25', minPriceUSD: 0, maxPriceUSD: 25 },
  { id: 'b-2', label: 'Under $50', minPriceUSD: 0, maxPriceUSD: 50 },
  { id: 'b-3', label: 'Under $100', minPriceUSD: 0, maxPriceUSD: 100 },
  { id: 'b-4', label: 'Under $200', minPriceUSD: 0, maxPriceUSD: 200 },
  { id: 'b-5', label: 'No Limit ($200+)', minPriceUSD: 200, maxPriceUSD: 9999 }
];

export const SEED_GIFT_INTERESTS: GiftInterest[] = [
  { id: 'int-1', name: 'Tech & Gadgets', slug: 'tech', category: 'tech' },
  { id: 'int-2', name: 'Coffee & Kitchen', slug: 'kitchen', category: 'kitchen' },
  { id: 'int-3', name: 'Home & Comfort', slug: 'home', category: 'home' },
  { id: 'int-4', name: 'Beauty & Grooming', slug: 'beauty', category: 'beauty' },
  { id: 'int-5', name: 'Fitness & Health', slug: 'fitness', category: 'fitness' },
  { id: 'int-6', name: 'Travel & Commute', slug: 'travel', category: 'travel' },
  { id: 'int-7', name: 'Gaming & PC', slug: 'gaming', category: 'gaming' },
  { id: 'int-8', name: 'Outdoor & Adventure', slug: 'outdoor', category: 'outdoor' }
];

export const SEED_GIFT_RULES: GiftRule[] = [
  {
    id: 'rule-1',
    recipientSlug: 'dad',
    occasionSlug: 'birthday',
    budgetMaxUSD: 100,
    interestSlug: 'tech',
    productId: 'prod-4', // Anker Prime Power Bank
    priority: 1,
    customQuote: 'Perfect for active dads who love high-performance tech. Rapidly charges laptops and phones with real-time smart display.',
    isActive: true
  },
  {
    id: 'rule-2',
    recipientSlug: 'mom',
    occasionSlug: 'mothers-day',
    budgetMaxUSD: 200,
    interestSlug: 'kitchen',
    productId: 'prod-rising-2', // Fellow Ode Gen 2
    priority: 1,
    customQuote: 'Quiet, mess-free morning coffee ritual with cafe-grade precision burrs.',
    isActive: true
  },
  {
    id: 'rule-3',
    recipientSlug: 'partner',
    occasionSlug: 'valentines',
    budgetMaxUSD: 500,
    interestSlug: 'beauty',
    productId: 'prod-3', // Dyson Airwrap
    priority: 1,
    customQuote: 'The gold standard in luxury hair styling using aerodynamic air flow without extreme heat damage.',
    isActive: true
  },
  {
    id: 'rule-4',
    recipientSlug: 'friend',
    occasionSlug: 'just-because',
    budgetMaxUSD: 50,
    interestSlug: 'tech',
    productId: 'prod-gem-1', // EarFun Air Pro 4
    priority: 1,
    customQuote: 'Remarkable audiophile sound quality, active noise cancelling, and 52h battery life under $80.',
    isActive: true
  }
];

export const SEED_RECOMMENDATION_SETTINGS: RecommendationSettings = {
  categorySimilarityWeight: 80,
  priceSimilarityWeight: 60,
  brandSimilarityWeight: 50,
  featureOverlapWeight: 85,
  userBehaviorWeight: 70,
  personalizationLevel: 60,
  maxItemsPerCrossSell: 4,
  minDiscountForUpsell: 10,
  showRelatedOnCart: true,
  showCompleteTheSet: true
};

export const SEED_RECOMMENDATION_ANALYTICS: RecommendationAnalytics = {
  totalImpressions: 234500,
  ctrPercent: 18.4,
  conversionRatePercent: 8.2,
  revenueGeneratedUSD: 34230,
  topProducts: [
    { productId: 'prod-1', name: 'Sony WH-1000XM5', impressions: 12450, clicks: 2340, ctr: 18.8, salesCount: 178 },
    { productId: 'prod-gem-1', name: 'EarFun Air Pro 4', impressions: 10200, clicks: 1800, ctr: 17.6, salesCount: 145 },
    { productId: 'prod-4', name: 'Anker Prime 200W Power Bank', impressions: 8900, clicks: 1650, ctr: 18.5, salesCount: 132 },
    { productId: 'prod-2', name: 'Breville Barista Touch Impress', impressions: 6400, clicks: 980, ctr: 15.3, salesCount: 48 }
  ]
};
