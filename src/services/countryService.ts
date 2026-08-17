import { COUNTRIES, DEFAULT_COUNTRY } from '../data/seedCountries';
import { CountryConfig } from '../types/country';

class CountryService {
  private countries: CountryConfig[] = COUNTRIES;
  private currentCountry: CountryConfig = DEFAULT_COUNTRY;

  getAvailableCountries(): CountryConfig[] {
    return [...this.countries];
  }

  getCurrentCountry(): CountryConfig {
    return this.currentCountry;
  }

  setCountry(code: string): CountryConfig {
    const found = this.countries.find(c => c.code === code);
    if (found) {
      this.currentCountry = found;
    }
    return this.currentCountry;
  }
}

export const countryService = new CountryService();
