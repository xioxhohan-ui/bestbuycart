import { RetailerOffer } from './retailer';
import { ScoreBreakdown, ScoreVerdictType } from './score';

export interface ProductSpec {
  name: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  subcategoryId?: string;
  image: string;
  gallery?: string[];
  
  // Pricing (stored in USD base, dynamically formatted per country)
  priceUSD: number;
  originalPriceUSD?: number;
  isPriceDrop?: boolean;
  dealPercentage?: number;

  // Ratings & Social
  rating: number;             // e.g. 4.8
  reviewCount: number;        // e.g. 56243

  // Core Scores (0-100)
  hypeScore: number;          // e.g. 96
  worthScore: number;         // e.g. 92
  scoreBreakdown?: ScoreBreakdown;
  verdictType?: ScoreVerdictType;

  // Editorial metadata
  verdict: string;            // e.g. "Best overall value for high-res audio"
  whyRising?: string[];       // e.g. ["3x searches ↑ this week", "Viral on tech TikTok"]
  growthPercentage?: number;  // e.g. 182 for "▲ 182%"
  editorialQuote?: string;    // e.g. "This product delivers premium features..."
  overhypedReason?: string;   // e.g. "Popular branding, but inferior noise cancelling..."

  features?: string[];        // e.g. ["Wireless", "Noise Canceling", "Bluetooth 5.3", "Waterproof"]
  inStock?: boolean;

  summary: string;
  pros: string[];
  cons: string[];
  specs: ProductSpec[];
  offers: RetailerOffer[];
  
  isTrending?: boolean;
  isRising?: boolean;
  isHiddenGem?: boolean;
  isOverhyped?: boolean;
  isFeatured?: boolean;
  isDeal?: boolean;

  countryAvailability: string[]; // e.g. ['US', 'UK', 'DE', 'FR', 'CA', 'AU']
}
