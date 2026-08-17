import { Product } from './product';

export interface GiftRecipient {
  id: string;
  name: string; // e.g. 'Dad', 'Mom', 'Partner', 'Friend'
  slug: string;
  iconName: string;
  description: string;
  ageRanges: string[];
  isActive: boolean;
  displayOrder: number;
  productCount: number;
}

export interface GiftOccasion {
  id: string;
  name: string; // e.g. 'Birthday', 'Christmas', 'Anniversary'
  slug: string;
  iconName: string;
  description: string;
  season?: string;
  isActive: boolean;
  displayOrder: number;
  productCount: number;
}

export interface GiftBudget {
  id: string;
  label: string; // e.g. 'Under $25', 'Under $50', 'Under $100', 'Under $200', 'No Limit'
  maxPriceUSD: number;
  minPriceUSD: number;
}

export interface GiftInterest {
  id: string;
  name: string; // e.g. 'Tech', 'Kitchen', 'Home', 'Fitness', 'Gaming', 'Travel'
  slug: string;
  category: string;
}

export interface GiftRule {
  id: string;
  recipientSlug: string;
  occasionSlug: string;
  budgetMaxUSD: number;
  interestSlug?: string;
  productId: string;
  priority: number; // 1 = highest
  customQuote?: string;
  isActive: boolean;
}

export interface GiftWizardAnswers {
  recipient: string;
  ageRange?: string;
  occasion: string;
  budgetMaxUSD: number;
  interests: string[];
}

export interface GiftRecommendationResult {
  topPick: Product;
  personalizedReason: string;
  alternativePicks: Product[];
  criteriaSummary: {
    recipient: string;
    occasion: string;
    budget: string;
    interests: string[];
  };
}

export interface RecommendationSettings {
  categorySimilarityWeight: number; // 0-100 (e.g. 80%)
  priceSimilarityWeight: number; // 0-100 (e.g. 60%)
  brandSimilarityWeight: number; // 0-100 (e.g. 50%)
  featureOverlapWeight: number; // 0-100 (e.g. 85%)
  userBehaviorWeight: number; // 0-100 (e.g. 70%)
  personalizationLevel: number; // 0-100 (e.g. 60%)
  maxItemsPerCrossSell: number; // e.g. 4
  minDiscountForUpsell: number; // e.g. 10%
  showRelatedOnCart: boolean;
  showCompleteTheSet: boolean;
}

export interface RecommendationAnalytics {
  totalImpressions: number;
  ctrPercent: number;
  conversionRatePercent: number;
  revenueGeneratedUSD: number;
  topProducts: {
    productId: string;
    name: string;
    impressions: number;
    clicks: number;
    ctr: number;
    salesCount: number;
  }[];
}

export interface AccessoryBundleItem {
  id: string;
  name: string;
  priceUSD: number;
  image: string;
  selected: boolean;
}
