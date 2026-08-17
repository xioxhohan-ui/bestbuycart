import { CountryConfig } from '../types/country';

export interface CurrencyDetail {
  symbol: string;
  code: string;
  locale: string;
  name: string;
}

export const CURRENCIES: Record<string, CurrencyDetail> = {
  USD: { symbol: '$', code: 'USD', locale: 'en-US', name: 'US Dollar' },
  GBP: { symbol: '£', code: 'GBP', locale: 'en-GB', name: 'British Pound' },
  EUR: { symbol: '€', code: 'EUR', locale: 'de-DE', name: 'Euro' },
  CAD: { symbol: 'C$', code: 'CAD', locale: 'en-CA', name: 'Canadian Dollar' },
  AUD: { symbol: 'A$', code: 'AUD', locale: 'en-AU', name: 'Australian Dollar' },
};

export const COUNTRY_CURRENCY_MAP: Record<string, string> = {
  US: 'USD',
  GB: 'GBP',
  UK: 'GBP',
  DE: 'EUR',
  FR: 'EUR',
  IT: 'EUR',
  ES: 'EUR',
  CA: 'CAD',
  AU: 'AUD',
};

export function getCurrencyForCountry(countryCode: string): string {
  return COUNTRY_CURRENCY_MAP[countryCode.toUpperCase()] || 'USD';
}

export function formatPrice(
  amount: number,
  currencyCode: string = 'USD',
  locale?: string
): string {
  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const targetLocale = locale || currency.locale;

  try {
    return new Intl.NumberFormat(targetLocale, {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency.symbol}${amount.toFixed(2)}`;
  }
}

export function formatPriceSimple(
  amount: number,
  currencyCode: string = 'USD'
): string {
  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD;
  return `${currency.symbol}${amount.toFixed(2)}`;
}

/**
 * Converts a base USD price to the target country's currency and formats it with proper locale standards.
 */
export function formatCurrency(priceUSD: number, country: CountryConfig): string {
  const converted = priceUSD * country.rateToUSD;
  return formatPrice(converted, country.currencyCode, country.locale);
}
