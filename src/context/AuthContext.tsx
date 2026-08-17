import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types/user';
import { WishlistItem, WatchlistItem } from '../types/community';
import { Product } from '../types/product';
import { authService } from '../services/authService';
import { communityService } from '../services/communityService';

interface AuthContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<UserProfile>;
  loginWithEmail: (email: string, password?: string) => Promise<UserProfile>;
  signUp: (fullName: string, email: string, password?: string) => Promise<UserProfile>;
  register: (fullName: string, email: string, username: string) => Promise<UserProfile>;
  socialLogin: (provider: 'google' | 'apple' | 'github') => Promise<UserProfile>;
  loginWithSocial: (provider: 'google' | 'apple' | 'github') => Promise<UserProfile>;
  resetPassword: (email: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => Promise<UserProfile>;
  wishlistItems: WishlistItem[];
  wishlistCount: number;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product, notes?: string) => Promise<boolean>;
  watchlistItems: WatchlistItem[];
  watchlistCount: number;
  isWatching: (productId: string) => boolean;
  toggleWatchlist: (product: Product, targetPriceUSD: number) => Promise<boolean>;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [watchlistItems, setWatchlistItems] = useState<WatchlistItem[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  const refreshUserData = async () => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);

    if (user) {
      const [wishes, watches] = await Promise.all([
        communityService.getUserWishlist(user.id),
        communityService.getUserWatchlist(user.id)
      ]);
      setWishlistItems(wishes);
      setWatchlistItems(watches);
    } else {
      setWishlistItems([]);
      setWatchlistItems([]);
    }
  };

  useEffect(() => {
    refreshUserData();
  }, []);

  const login = async (email: string, password?: string): Promise<UserProfile> => {
    const user = await authService.loginWithEmail(email, password);
    setCurrentUser(user);
    await refreshUserData();
    return user;
  };

  const loginWithEmail = async (email: string, password?: string): Promise<UserProfile> => {
    return login(email, password);
  };

  const signUp = async (fullName: string, email: string, password?: string): Promise<UserProfile> => {
    const user = await authService.signUp(fullName, email, password);
    setCurrentUser(user);
    await refreshUserData();
    return user;
  };

  const register = async (fullName: string, email: string, username: string): Promise<UserProfile> => {
    return signUp(fullName, email);
  };

  const socialLogin = async (provider: 'google' | 'apple' | 'github'): Promise<UserProfile> => {
    const user = await authService.loginWithSocial(provider);
    setCurrentUser(user);
    await refreshUserData();
    return user;
  };

  const loginWithSocial = async (provider: 'google' | 'apple' | 'github'): Promise<UserProfile> => {
    return socialLogin(provider);
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    return authService.resetPassword(email);
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
    setWishlistItems([]);
    setWatchlistItems([]);
  };

  const updateProfile = async (updates: Partial<UserProfile>): Promise<UserProfile> => {
    if (!currentUser) throw new Error('Not authenticated');
    const updated = await authService.updateProfile(currentUser.id, updates);
    setCurrentUser(updated);
    return updated;
  };

  const isInWishlist = (productId: string): boolean => {
    return wishlistItems.some((w) => w.productId === productId);
  };

  const toggleWishlist = async (product: Product, notes?: string): Promise<boolean> => {
    if (!currentUser) {
      openAuthModal('login');
      return false;
    }
    const added = await communityService.toggleWishlist(currentUser.id, product, notes);
    await refreshUserData();
    return added;
  };

  const isWatching = (productId: string): boolean => {
    return watchlistItems.some((w) => w.productId === productId);
  };

  const toggleWatchlist = async (product: Product, targetPriceUSD: number): Promise<boolean> => {
    if (!currentUser) {
      openAuthModal('login');
      return false;
    }
    const added = await communityService.toggleWatchlist(currentUser.id, product, targetPriceUSD);
    await refreshUserData();
    return added;
  };

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        loginWithEmail,
        signUp,
        register,
        socialLogin,
        loginWithSocial,
        resetPassword,
        logout,
        updateProfile,
        wishlistItems,
        wishlistCount: wishlistItems.length,
        isInWishlist,
        toggleWishlist,
        watchlistItems,
        watchlistCount: watchlistItems.length,
        isWatching,
        toggleWatchlist,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        refreshUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
