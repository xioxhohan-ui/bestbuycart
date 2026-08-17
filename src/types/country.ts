export interface CountryConfig {
  code: string;           // 'US' | 'UK' | 'DE' | 'FR' | 'CA' | 'AU'
  name: string;           // 'United States'
  flag: string;           // '🇺🇸'
  currencyCode: string;   // 'USD'
  currencySymbol: string; // '$'
  locale: string;         // 'en-US'
  rateToUSD: number;      // 1.0 (US), 0.79 (UK), 0.92 (DE), 1.36 (CA), 1.52 (AU)
  active: boolean;
}
