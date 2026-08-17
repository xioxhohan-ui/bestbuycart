import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/product';
import { NewsPost } from '../types/news';

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
  | '/news'
  | '/news/detail'
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
  | '/login'
  | '/signup'
  | '/forgot-password'
  | '/verify-email'
  | '/reset-password'
  | '/shohan';

interface NavigationOptions {
  categorySlug?: string;
  subcategorySlug?: string;
  underPricePreset?: number;
  product?: Product;
  productA?: Product;
  productB?: Product;
  newsPost?: NewsPost;
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
  selectedNewsPost: NewsPost | null;
  selectedUsername: string | null;
  selectedAccountTab: string | null;
  navigate: (route: ActiveRoute, options?: NavigationOptions) => void;
  openCompareWithProduct: (product: Product) => void;
  clearCategoryFilters: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

const getInitialRoute = (): ActiveRoute => {
  if (typeof window === 'undefined') return '/';
  const path = window.location.pathname;
  if (path.startsWith('/shohan')) return '/shohan';
  if (path.startsWith('/news/detail')) return '/news/detail';
  if (path.startsWith('/news')) return '/news';
  if (path.startsWith('/account')) return '/account';
  if (path.startsWith('/login')) return '/login';
  if (path.startsWith('/signup')) return '/signup';
  return (path as ActiveRoute) || '/';
};

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<ActiveRoute>(getInitialRoute);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [selectedSubcategorySlug, setSelectedSubcategorySlug] = useState<string | null>(null);
  const [selectedUnderPricePreset, setSelectedUnderPricePreset] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [comparisonProductA, setComparisonProductA] = useState<Product | null>(null);
  const [comparisonProductB, setComparisonProductB] = useState<Product | null>(null);
  const [selectedNewsPost, setSelectedNewsPost] = useState<NewsPost | null>(null);
  const [selectedUsername, setSelectedUsername] = useState<string | null>(null);
  const [selectedAccountTab, setSelectedAccountTab] = useState<string | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith('/shohan')) setCurrentRoute('/shohan');
      else if (path.startsWith('/news/detail')) setCurrentRoute('/news/detail');
      else if (path.startsWith('/news')) setCurrentRoute('/news');
      else setCurrentRoute((path as ActiveRoute) || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route: ActiveRoute, options?: NavigationOptions) => {
    setCurrentRoute(route);
    if (typeof window !== 'undefined' && window.location.pathname !== route) {
      window.history.pushState(null, '', route);
    }
    if (options?.categorySlug !== undefined) setSelectedCategorySlug(options.categorySlug);
    if (options?.subcategorySlug !== undefined) setSelectedSubcategorySlug(options.subcategorySlug);
    else if (options?.categorySlug && options?.subcategorySlug === undefined) setSelectedSubcategorySlug(null);

    if (options?.underPricePreset !== undefined) setSelectedUnderPricePreset(options.underPricePreset);
    else if (options?.categorySlug) setSelectedUnderPricePreset(null);

    if (options?.product !== undefined) setSelectedProduct(options.product);
    if (options?.productA !== undefined) setComparisonProductA(options.productA);
    if (options?.productB !== undefined) setComparisonProductB(options.productB);
    if (options?.newsPost !== undefined) setSelectedNewsPost(options.newsPost);
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
        selectedNewsPost,
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
