import React, { createContext, useContext, useState } from 'react';
import { Product } from '../types/product';

export type ActiveRoute =
  | '/'
  | '/trending'
  | '/categories'
  | '/category-detail'
  | '/product-detail'
  | '/compare'
  | '/compare/brands'
  | '/alternatives'
  | '/deals'
  | '/deals/price-drops'
  | '/deals/seasonal'
  | '/gift-finder'
  | '/guides'
  | '/guides/how-to-choose-headphones'
  | '/is-it-worth-it'
  | '/methodology'
  | '/tools'
  | '/discover/hidden-gems'
  | '/discover/overhyped'
  | '/tools/product-finder'
  | '/account'
  | '/account/wishlist'
  | '/account/watchlist'
  | '/account/reviews'
  | '/user-profile'
  | '/shohan';

interface NavigationOptions {
  categorySlug?: string;
  subcategorySlug?: string;
  underPricePreset?: number;
  product?: Product;
  productA?: Product;
  productB?: Product;
  username?: string;
  accountTab?: string;
}

interface NavigationContextType {
  currentRoute: ActiveRoute;
  selectedCategorySlug: string | null;
  selectedSubcategorySlug: string | null;
  selectedUnderPricePreset: number | null;
  selectedProduct: Product | null;
  comparisonProductA: Product | null;
  comparisonProductB: Product | null;
  selectedUsername: string | null;
  selectedAccountTab: string | null;
  navigate: (route: ActiveRoute, options?: NavigationOptions) => void;
  openCompareWithProduct: (product: Product) => void;
  clearCategoryFilters: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<ActiveRoute>('/');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [selectedSubcategorySlug, setSelectedSubcategorySlug] = useState<string | null>(null);
  const [selectedUnderPricePreset, setSelectedUnderPricePreset] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [comparisonProductA, setComparisonProductA] = useState<Product | null>(null);
  const [comparisonProductB, setComparisonProductB] = useState<Product | null>(null);
  const [selectedUsername, setSelectedUsername] = useState<string | null>(null);
  const [selectedAccountTab, setSelectedAccountTab] = useState<string | null>(null);

  const navigate = (route: ActiveRoute, options?: NavigationOptions) => {
    setCurrentRoute(route);
    if (options?.categorySlug !== undefined) setSelectedCategorySlug(options.categorySlug);
    if (options?.subcategorySlug !== undefined) setSelectedSubcategorySlug(options.subcategorySlug);
    else if (options?.categorySlug && options?.subcategorySlug === undefined) setSelectedSubcategorySlug(null);

    if (options?.underPricePreset !== undefined) setSelectedUnderPricePreset(options.underPricePreset);
    else if (options?.categorySlug) setSelectedUnderPricePreset(null);

    if (options?.product !== undefined) setSelectedProduct(options.product);
    if (options?.productA !== undefined) setComparisonProductA(options.productA);
    if (options?.productB !== undefined) setComparisonProductB(options.productB);
    if (options?.username !== undefined) setSelectedUsername(options.username);
    if (options?.accountTab !== undefined) setSelectedAccountTab(options.accountTab);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCompareWithProduct = (product: Product) => {
    setComparisonProductA(product);
    setCurrentRoute('/compare');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearCategoryFilters = () => {
    setSelectedSubcategorySlug(null);
    setSelectedUnderPricePreset(null);
  };

  return (
    <NavigationContext.Provider
      value={{
        currentRoute,
        selectedCategorySlug,
        selectedSubcategorySlug,
        selectedUnderPricePreset,
        selectedProduct,
        comparisonProductA,
        comparisonProductB,
        selectedUsername,
        selectedAccountTab,
        navigate,
        openCompareWithProduct,
        clearCategoryFilters,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
