export interface Deal {
  id: string;
  productId: string;
  productName: string;
  brand: string;
  category: string;
  image: string;
  dealType: 'price_drop' | 'flash_sale' | 'seasonal' | 'clearance';
  originalPriceUSD: number;
  dealPriceUSD: number;
  discountPercent: number; // e.g. 28%
  retailerName: string;
  retailerUrl: string;
  startDate: string;
  endDate: string;
  timezone: string;
  showCountdown: boolean;
  status: 'active' | 'expired' | 'draft';
  countries: string[];
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  views: number;
  clicks: number;
  isTopDeal?: boolean;
  isPriceDrop?: boolean;
  isUnder25?: boolean;
}

export interface PriceHistoryPoint {
  date: string; // e.g. '2026-07-18'
  dayLabel: string; // e.g. 'Day 1', 'Day 7'
  priceUSD: number;
  retailer: string;
}

export interface PriceAlert {
  id: string;
  userEmail: string;
  productId: string;
  productName: string;
  currentPriceUSD: number;
  targetPriceUSD: number;
  status: 'active' | 'triggered' | 'cancelled';
  createdAt: string;
  triggeredAt?: string;
}

export interface SeasonalCampaign {
  id: string;
  name: string;
  season: string; // e.g. 'Holiday 2026', 'Black Friday', 'Summer Sale'
  slug: string;
  headline: string;
  description: string;
  bannerImage?: string;
  featuredDealId?: string;
  dealIds: string[];
  status: 'active' | 'draft' | 'ended';
  startDate: string;
  endDate: string;
  clicks: number;
  conversions: number;
  revenueUSD: number;
}

export interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  template: 'price_drop_alert' | 'weekly_roundup' | 'flash_sale';
  dealIds: string[];
  sendDate: string;
  status: 'draft' | 'scheduled' | 'sent';
  subscribersCount: number;
  opensCount: number;
  clicksCount: number;
}

export interface PriceTrackingSetting {
  frequencyHours: number; // e.g. 6
  retailers: string[];
  minDiscountPercent: number; // e.g. 10
  autoPublishDeals: boolean;
  lastRunTimestamp: string;
}
