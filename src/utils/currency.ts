import { CountryConfig } from '../types/country';

/**
 * Converts a base USD price to the target country's currency and formats it with proper locale standards.
 */
export function formatCurrency(priceUSD: number, country: CountryConfig): string {
  const converted = priceUSD * country.rateToUSD;

  try {
    return new Intl.NumberFormat(country.locale, {
      style: 'currency',
      currency: country.currencyCode,
      minimumFractionDigits: converted % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(converted);
  } catch {
    return `${country.currencySymbol}${converted.toFixed(2)}`;
  }
}
