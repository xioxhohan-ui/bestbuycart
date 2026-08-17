import { Product } from './product';

export interface ScorecardCategory {
  name: string;
  weight: number; // e.g. 40%
  scoreA: number; // 0-10
  scoreB: number; // 0-10
  scoreC?: number;
  winner: 'A' | 'B' | 'C' | 'tie';
  note?: string;
}

export interface SpecComparisonRow {
  featureName: string;
  valueA: string | boolean;
  valueB: string | boolean;
  valueC?: string | boolean;
  highlightDifference?: boolean;
}

export interface ComparisonSEO {
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  slug: string;
  seoScore: number; // 0-100
  keywordDensity: number; // e.g. 2.4%
  readabilityScore: number; // e.g. 85%
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  indexable: boolean;
  inSitemap: boolean;
}

export interface ProductComparison {
  id: string;
  slug: string;
  title: string;
  type: 'pvp' | 'brand' | 'alternatives';
  productAId: string;
  productBId: string;
  productCId?: string;
  category: string;
  views: number;
  winnerId: string;
  verdictText: string;
  whyWinner: string;
  whenToChooseB: string;
  scorecards: ScorecardCategory[];
  specRows?: SpecComparisonRow[];
  seo: ComparisonSEO;
  alternativeProductIds?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BrandLineupItem {
  category: string;
  brandABest: string;
  brandBBest: string;
  winner: string;
  reason: string;
}

export interface BrandComparison {
  id: string;
  slug: string;
  brandA: string;
  brandB: string;
  logoA?: string;
  logoB?: string;
  scorecards: ScorecardCategory[];
  lineup: BrandLineupItem[];
  overallWinner: string;
  summary: string;
  seo: ComparisonSEO;
}

export interface BacklinkItem {
  id: string;
  sourceUrl: string;
  targetUrl: string;
  anchorText: string;
  domainAuthority: number; // 0-100
  status: 'active' | 'pending' | 'lost';
  discoveredDate: string;
  lastChecked: string;
}

export interface InternalLinkSuggestion {
  id: string;
  sourcePageTitle: string;
  sourceUrl: string;
  targetUrl: string;
  suggestedAnchor: string;
  relevanceScore: number;
  status: 'applied' | 'pending';
}
