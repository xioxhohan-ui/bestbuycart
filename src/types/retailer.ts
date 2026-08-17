export interface Retailer {
  id: string;
  name: string;
  slug: string;
  logo: string;
  website: string;
  affiliateEnabled: boolean;
  supportedCountries: string[];
}

export interface RetailerOffer {
  productId: string;
  retailerId: string;
  retailerName: string;
  retailerLogo?: string;
  priceUSD: number;
  originalPriceUSD?: number;
  inStock: boolean;
  shippingInfo?: string;
  dealTag?: string;
  destinationUrl: string;
  affiliateUrl: string;
  lastUpdated: string;
}
