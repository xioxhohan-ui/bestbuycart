import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useSearch } from '../../context/SearchContext';
import { useAuth } from '../../context/AuthContext';
import { menuService } from '../../services/menuService';
import { NavMenuItem } from '../../types/navigation';
import { CategoriesMegaMenu } from '../navigation/CategoriesMegaMenu';
import { NavDropdown } from '../navigation/NavDropdown';
import { MobileMenuDrawer } from '../navigation/MobileMenuDrawer';
import { CountrySelector } from '../country/CountrySelector';
import {
  Compass,
  Flame,
  Grid2X2,
  ArrowRightLeft,
  Tag,
  BookOpen,
  Sparkles,
  Search,
  Menu,
  X,
  Gem,
  AlertTriangle,
  Heart,
  Radar,
  User,
  LogOut,
  Award,
  ChevronDown,
  Settings
} from 'lucide-react';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const { currentRoute, navigate } = useNavigation();
  const { openSearch } = useSearch();
  const { currentUser, isAuthenticated, logout, wishlistCount, watchlistCount, openAuthModal } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'discover' | 'tools' | null>(null);
  const [menuItems, setMenuItems] = useState<NavMenuItem[]>([]);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    menuService.getMenu('main').then(setMenuItems);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const discoverItem = menuItems.find((i) => i.title.toLowerCase() === 'discover');
  const toolsItem = menuItems.find((i) => i.title.toLowerCase() === 'tools');

  return (
    <header className="site-header" style={{ position: 'relative' }}>
      <div className="container site-header-inner">
        {/* 1. Left: Brand Logo */}
        <div
          onClick={() => navigate('/')}
          className="site-logo"
          style={{ cursor: 'pointer' }}
        >
          <div className="site-logo-mark">
            <Compass size={22} strokeWidth={2.4} />
          </div>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>
              BEST BUY CART
            </div>
            <div style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
              DISCOVER. COMPARE. DECIDE.
            </div>
          </div>
        </div>

        {/* 2. Middle: Desktop Navigation Links with Mega Menu & Dropdowns */}
        <nav className="nav-links hide-mobile">
          <button
            onClick={() => navigate('/')}
            className={`nav-link ${currentRoute === '/' ? 'active' : ''}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
          >
            <Compass size={15} />
            <span>Home</span>
          </button>

          {/* Categories Mega Menu Trigger */}
          <div style={{ position: 'relative' }} onMouseEnter={() => setIsMegaMenuOpen(true)}>
            <button
              onClick={() => navigate('/categories')}
              className={`nav-link ${currentRoute === '/categories' || currentRoute === '/category-detail' ? 'active' : ''}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
            >
              <Grid2X2 size={15} />
              <span>Categories</span>
              <ChevronDown size={12} />
            </button>
          </div>

          <button
            onClick={() => navigate('/compare')}
            className={`nav-link ${currentRoute === '/compare' ? 'active' : ''}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
          >
            <ArrowRightLeft size={15} />
            <span>Compare</span>
          </button>

          <button
            onClick={() => navigate('/deals')}
            className={`nav-link ${currentRoute === '/deals' || currentRoute === '/deals/price-drops' ? 'active' : ''}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
          >
            <Tag size={15} />
            <span>Deals</span>
          </button>

          <button
            onClick={() => navigate('/gift-finder')}
            className={`nav-link ${currentRoute === '/gift-finder' ? 'active' : ''}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
          >
            <Sparkles size={15} />
            <span>Gift Finder</span>
          </button>

          {/* Discover Dropdown Trigger */}
          <div style={{ position: 'relative' }} onMouseEnter={() => setActiveDropdown('discover')}>
            <button
              onClick={() => navigate('/discover/hidden-gems')}
              className={`nav-link ${currentRoute.startsWith('/discover') || currentRoute === '/trending' ? 'active' : ''}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
            >
              <Compass size={15} />
              <span>Discover</span>
              <ChevronDown size={12} />
            </button>
            <NavDropdown
              isOpen={activeDropdown === 'discover'}
              items={discoverItem?.children || []}
              onClose={() => setActiveDropdown(null)}
            />
          </div>

          {/* Tools Dropdown Trigger */}
          <div style={{ position: 'relative' }} onMouseEnter={() => setActiveDropdown('tools')}>
            <button
              onClick={() => navigate('/tools/product-finder')}
              className={`nav-link ${currentRoute.startsWith('/tools') ? 'active' : ''}`}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
            >
              <Settings size={15} />
              <span>Tools</span>
              <ChevronDown size={12} />
            </button>
            <NavDropdown
              isOpen={activeDropdown === 'tools'}
              items={toolsItem?.children || []}
              onClose={() => setActiveDropdown(null)}
            />
          </div>

          <button
            onClick={() => navigate('/guides')}
            className={`nav-link ${currentRoute.startsWith('/guides') ? 'active' : ''}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
          >
            <BookOpen size={15} />
            <span>Guides</span>
          </button>
        </nav>

        {/* 3. Right: Search Trigger, Wishlist, User Profile & Country Selector */}
        <div className="flex items-center gap-sm">
          {/* Search Spotlight button */}
          <button
            onClick={() => openSearch()}
            className="btn btn-secondary btn-sm"
            style={{
              borderRadius: 'var(--radius-pill)',
              padding: '6px 12px',
              color: 'var(--text-secondary)'
            }}
            title="Search products (Cmd+K)"
          >
            <Search size={15} />
            <span className="hide-mobile" style={{ fontSize: '0.8rem' }}>Search</span>
            <kbd
              className="hide-mobile font-mono"
              style={{
                fontSize: '0.65rem',
                padding: '1px 5px',
                backgroundColor: '#F1F5F9',
                borderRadius: '4px',
                color: '#64748B',
                border: '1px solid #E2E8F0'
              }}
            >
              ⌘K
            </kbd>
          </button>

          {/* Quick Wishlist Button */}
          <button
            onClick={() => navigate('/account', { accountTab: 'wishlist' })}
            className="btn btn-secondary btn-sm"
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-pill)',
              padding: '6px 10px',
              color: wishlistCount > 0 ? '#DC2626' : 'var(--text-secondary)'
            }}
            title="My Saved Wishlist"
          >
            <Heart size={16} fill={wishlistCount > 0 ? '#DC2626' : 'none'} />
            {wishlistCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  backgroundColor: '#DC2626',
                  color: '#FFFFFF',
                  fontSize: '0.62rem',
                  fontWeight: 800,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #FFFFFF'
                }}
              >
                {wishlistCount}
              </span>
            )}
          </button>

          {/* User Account Trigger */}
          {isAuthenticated && currentUser ? (
            <div style={{ position: 'relative' }} ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 10px 4px 4px',
                  borderRadius: '999px',
                  border: '1px solid #E2E8F0',
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer'
                }}
              >
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.fullName}
                  style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <span className="hide-mobile" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1A1A1A' }}>
                  {currentUser.fullName.split(' ')[0]}
                </span>
                <ChevronDown size={13} style={{ color: '#64748B' }} />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #E2E8F0',
                    width: '240px',
                    padding: '8px',
                    zIndex: 9999,
                    animation: 'fadeInScale 0.15s ease-out'
                  }}
                >
                  <div style={{ padding: '10px 12px', borderBottom: '1px solid #F1F5F9' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#1A1A1A' }}>{currentUser.fullName}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B' }}>@{currentUser.username} • {currentUser.tierName}</div>
                    <div className="flex items-center gap-xs" style={{ marginTop: '4px', fontSize: '0.72rem', color: '#D97706', fontWeight: 700 }}>
                      <Sparkles size={11} /> {currentUser.reputationPoints} Reputation Pts
                    </div>
                  </div>

                  <div style={{ padding: '4px 0', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <button
                      onClick={() => {
                        navigate('/account', { accountTab: 'overview' });
                        setIsUserMenuOpen(false);
                      }}
                      className="btn btn-ghost btn-sm"
                      style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.82rem', padding: '8px 12px', gap: '8px' }}
                    >
                      <User size={14} /> My Dashboard
                    </button>
                    <button
                      onClick={() => {
                        navigate('/account', { accountTab: 'wishlist' });
                        setIsUserMenuOpen(false);
                      }}
                      className="btn btn-ghost btn-sm"
                      style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.82rem', padding: '8px 12px', gap: '8px' }}
                    >
                      <Heart size={14} /> Wishlist ({wishlistCount})
                    </button>
                    <button
                      onClick={() => {
                        navigate('/account', { accountTab: 'watchlist' });
                        setIsUserMenuOpen(false);
                      }}
                      className="btn btn-ghost btn-sm"
                      style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.82rem', padding: '8px 12px', gap: '8px' }}
                    >
                      <Radar size={14} /> Price Drop Radars ({watchlistCount})
                    </button>
                    <button
                      onClick={() => {
                        navigate('/account', { accountTab: 'reviews' });
                        setIsUserMenuOpen(false);
                      }}
                      className="btn btn-ghost btn-sm"
                      style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.82rem', padding: '8px 12px', gap: '8px' }}
                    >
                      <Award size={14} /> My Reviews
                    </button>
                    <button
                      onClick={() => {
                        navigate('/account', { accountTab: 'settings' });
                        setIsUserMenuOpen(false);
                      }}
                      className="btn btn-ghost btn-sm"
                      style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.82rem', padding: '8px 12px', gap: '8px' }}
                    >
                      <Settings size={14} /> Account Settings
                    </button>
                  </div>

                  <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '4px' }}>
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="btn btn-ghost btn-sm"
                      style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.82rem', padding: '8px 12px', gap: '8px', color: '#DC2626' }}
                    >
                      <LogOut size={14} /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Button
              variant="primary"
              size="sm"
              icon={<User size={14} />}
              onClick={() => openAuthModal('login')}
              style={{ borderRadius: 'var(--radius-pill)', fontSize: '0.8rem', padding: '6px 14px' }}
            >
              Sign In
            </Button>
          )}

          {/* Country Selector */}
          <CountrySelector />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="btn btn-ghost btn-sm hide-desktop"
            style={{ padding: '6px' }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Categories Mega Menu */}
      <CategoriesMegaMenu
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
      />

      {/* Mobile Navigation Drawer */}
      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};
