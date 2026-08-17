import { CountryConfig } from '../types/country';

export const COUNTRIES: CountryConfig[] = [
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    currencyCode: 'USD',
    currencySymbol: '$',
    locale: 'en-US',
    rateToUSD: 1.0,
    active: true,
  },
  {
    code: 'UK',
    name: 'United Kingdom',
    flag: '🇬🇧',
    currencyCode: 'GBP',
    currencySymbol: '£',
    locale: 'en-GB',
    rateToUSD: 0.79,
    active: true,
  },
  {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    currencyCode: 'EUR',
    currencySymbol: '€',
    locale: 'de-DE',
    rateToUSD: 0.92,
    active: true,
  },
  {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    currencyCode: 'EUR',
    currencySymbol: '€',
    locale: 'fr-FR',
    rateToUSD: 0.92,
    active: true,
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    currencyCode: 'CAD',
    currencySymbol: '$',
    locale: 'en-CA',
    rateToUSD: 1.36,
    active: true,
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    currencyCode: 'AUD',
    currencySymbol: '$',
    locale: 'en-AU',
    rateToUSD: 1.52,
    active: true,
  }
];

export const DEFAULT_COUNTRY = COUNTRIES[0];
