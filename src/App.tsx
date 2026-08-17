import React from 'react';
import { CountryProvider } from './context/CountryContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { SearchProvider } from './context/SearchContext';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/search/SearchModal';
import { AuthModal } from './components/auth/AuthModal';
import { HomeView } from './views/HomeView';
import { TrendingView } from './views/TrendingView';
import { CategoriesView } from './views/CategoriesView';
import { CategoryDetailView } from './views/CategoryDetailView';
import { ProductDetailView } from './views/ProductDetailView';
import { CompareView } from './views/CompareView';
import { BrandCompareView } from './views/BrandCompareView';
import { AlternativesView } from './views/AlternativesView';
import { DealsView } from './views/DealsView';
import { PriceDropsView } from './views/PriceDropsView';
import { SeasonalDealsView } from './views/SeasonalDealsView';
import { GiftFinderView } from './views/GiftFinderView';
import { GuidesView } from './views/GuidesView';
import { GuideDetailView } from './views/GuideDetailView';
import { IsItWorthItView } from './views/IsItWorthItView';
import { MethodologyView } from './views/MethodologyView';
import { ToolsView } from './views/ToolsView';
import { HiddenGemsView } from './views/HiddenGemsView';
import { OverhypedView } from './views/OverhypedView';
import { ProductFinderView } from './views/ProductFinderView';
import { AccountView } from './views/AccountView';
import { UserProfileView } from './views/UserProfileView';
import { LoginView } from './views/auth/LoginView';
import { SignupView } from './views/auth/SignupView';
import { ForgotPasswordView } from './views/auth/ForgotPasswordView';
import { VerifyEmailView } from './views/auth/VerifyEmailView';
import { ResetPasswordView } from './views/auth/ResetPasswordView';
import { AdminLoginView } from './views/admin/AdminLoginView';
import { AdminDashboardView } from './views/admin/AdminDashboardView';

const MainRouter: React.FC = () => {
  const { currentRoute } = useNavigation();
  const { isAuthenticated } = useAdminAuth();

  // If on admin route /shohan, render dedicated CMS shell
  if (currentRoute === '/shohan') {
    return isAuthenticated ? <AdminDashboardView /> : <AdminLoginView />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        {currentRoute === '/' && <HomeView />}
        {currentRoute === '/trending' && <TrendingView />}
        {currentRoute === '/categories' && <CategoriesView />}
        {currentRoute === '/category-detail' && <CategoryDetailView />}
        {currentRoute === '/product-detail' && <ProductDetailView />}
        {currentRoute === '/compare' && <CompareView />}
        {currentRoute === '/compare/brands' && <BrandCompareView />}
        {currentRoute === '/alternatives' && <AlternativesView />}
        {currentRoute === '/deals' && <DealsView />}
        {currentRoute === '/deals/price-drops' && <PriceDropsView />}
        {currentRoute === '/deals/seasonal' && <SeasonalDealsView />}
        {currentRoute === '/gift-finder' && <GiftFinderView />}
        {currentRoute === '/guides' && <GuidesView />}
        {currentRoute === '/guides/how-to-choose-headphones' && <GuideDetailView />}
        {currentRoute === '/is-it-worth-it' && <IsItWorthItView />}
        {currentRoute === '/methodology' && <MethodologyView />}
        {currentRoute === '/tools' && <ToolsView />}
        {currentRoute === '/discover/hidden-gems' && <HiddenGemsView />}
        {currentRoute === '/discover/overhyped' && <OverhypedView />}
        {currentRoute === '/tools/product-finder' && <ProductFinderView />}
        {(currentRoute === '/account' || currentRoute === '/account/wishlist' || currentRoute === '/account/watchlist' || currentRoute === '/account/reviews') && <AccountView />}
        {currentRoute === '/user-profile' && <UserProfileView />}
        {currentRoute === '/login' && <LoginView />}
        {currentRoute === '/signup' && <SignupView />}
        {currentRoute === '/forgot-password' && <ForgotPasswordView />}
        {currentRoute === '/verify-email' && <VerifyEmailView />}
        {currentRoute === '/reset-password' && <ResetPasswordView />}
      </main>
      <Footer />
      <SearchModal />
      <AuthModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CountryProvider>
      <NavigationProvider>
        <AuthProvider>
          <SearchProvider>
            <AdminAuthProvider>
              <MainRouter />
            </AdminAuthProvider>
          </SearchProvider>
        </AuthProvider>
      </NavigationProvider>
    </CountryProvider>
  );
};

export default App;
