import { Product } from './product';

export interface GuideSection {
  id: string;
  title: string;
  contentHtml: string;
}

export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  type: 'guide' | 'review' | 'worth_it' | 'comparison' | 'list';
  category: string;
  subcategory?: string;
  authorName: string;
  authorRole: string;
  reviewerName: string;
  publishedDate: string;
  updatedDate: string;
  readTimeMinutes: number;
  featuredImage: string;
  excerpt: string;
  sections: GuideSection[];
  topRecommendations?: {
    tag: 'Best Overall' | 'Best Value' | 'Premium Upgrade' | 'Top Budget';
    productId: string;
    productName: string;
    priceUSD: number;
    rating: number;
    worthScore: number;
    image: string;
    highlight: string;
  }[];
  faqs: ArticleFAQ[];
  relatedArticleSlugs: string[];
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  seoScore: number; // 0-100
  readabilityScore: number; // 0-100
  keywordDensityPercent: number; // e.g. 2.4%
  status: 'published' | 'draft' | 'archived';
  views: number;
  helpfulVotes: number;
}

export interface IsItWorthItData {
  product: Product;
  verdict: {
    verdictType: 'yes' | 'no' | 'conditional';
    headline: string;
    yesConditions: string[];
    noConditions: string[];
  };
  metrics: {
    priceUSD: number;
    rating: number;
    hypeScore: number;
    worthScore: number;
    reviewCount: number;
    bestFor: string;
  };
  pros: string[];
  cons: string[];
  alternativeIds: string[];
}

export interface MethodologyFactor {
  name: string;
  weightPercent: number;
  description: string;
  signals: string[];
}

export interface SearchConsoleMetric {
  totalClicks: number;
  totalImpressions: number;
  ctrPercent: number;
  avgPosition: number;
  topKeywords: {
    keyword: string;
    impressions: number;
    clicks: number;
    ctr: number;
    position: number;
  }[];
  contentOpportunities: {
    keyword: string;
    searchVolume: number;
    difficulty: number;
    suggestedAction: string;
  }[];
}

export interface ContentDecayItem {
  id: string;
  articleTitle: string;
  slug: string;
  lastUpdated: string;
  trafficTrendPercent: number; // e.g. -30
  status: 'urgent_update' | 'needs_refresh' | 'fresh';
  reason: string;
  priority: 'high' | 'medium' | 'low';
}

export interface TopicClusterNode {
  title: string;
  slug: string;
  type: 'pillar' | 'guide' | 'review' | 'comparison';
  status: 'active' | 'draft';
}

export interface TopicCluster {
  id: string;
  topicName: string;
  category: string;
  pillarPage: TopicClusterNode;
  buyingGuides: TopicClusterNode[];
  productReviews: TopicClusterNode[];
  comparisons: TopicClusterNode[];
}
