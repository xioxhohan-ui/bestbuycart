import React, { createContext, useContext, useState, useEffect } from 'react';
import { CountryConfig } from '../types/country';
import { COUNTRIES, DEFAULT_COUNTRY } from '../data/seedCountries';
import { formatCurrency as formatCurrencyUtil } from '../utils/currency';

interface CountryContextType {
  currentCountry: CountryConfig;
  availableCountries: CountryConfig[];
  setCountry: (code: string) => void;
  formatPrice: (priceUSD: number) => string;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const CountryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCountry, setCurrentCountryState] = useState<CountryConfig>(() => {
    const saved = localStorage.getItem('bestbuycart_country');
    if (saved) {
      const found = COUNTRIES.find(c => c.code === saved);
      if (found) return found;
    }
    return DEFAULT_COUNTRY;
  });

  const setCountry = (code: string) => {
    const found = COUNTRIES.find(c => c.code === code);
    if (found) {
      setCurrentCountryState(found);
      localStorage.setItem('bestbuycart_country', code);
    }
  };

  const formatPrice = (priceUSD: number) => {
    return formatCurrencyUtil(priceUSD, currentCountry);
  };

  return (
    <CountryContext.Provider
      value={{
        currentCountry,
        availableCountries: COUNTRIES,
        setCountry,
        formatPrice,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = (): CountryContextType => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
};
