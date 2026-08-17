import React, { useState, useEffect } from 'react';
import { NavMenuItem } from '../../types/navigation';
import { useNavigation, ActiveRoute } from '../../context/NavigationContext';
import { useAuth } from '../../context/AuthContext';
import { menuService } from '../../services/menuService';
import { CategoryIcon } from '../ui/CategoryIcon';
import {
  X,
  ChevronDown,
  ChevronRight,
  User,
  Heart,
  Radar,
  Sparkles,
  Grid2X2,
  Compass,
  Settings,
  Sword,
  Tag,
  Gift,
  Flame,
  Gem,
  AlertTriangle,
  Star,
  Brain,
  Bell,
  BarChart3
} from 'lucide-react';
import { Button } from '../ui/Button';

interface MegaCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  subcategories: { id: string; name: string; slug: string }[];
}

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({ isOpen, onClose }) => {
  const { navigate } = useNavigation();
  const { currentUser, isAuthenticated, wishlistCount, openAuthModal } = useAuth();
  const [categories, setCategories] = useState<MegaCategory[]>([]);
  const [expandedSection, setExpandedSection] = useState<string | null>('categories');

  useEffect(() => {
    if (isOpen) {
      menuService.generateCategoryMegaMenuTree().then(setCategories);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'flex-start'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '320px',
          maxWidth: '85vw',
          backgroundColor: '#FFFFFF',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflowY: 'auto',
          animation: 'slideInLeft 0.2s ease-out'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#0F172A',
            color: '#FFFFFF'
          }}
        >
          <div className="flex items-center gap-xs">
            <Compass size={20} style={{ color: '#2563EB' }} />
            <span style={{ fontWeight: 800, fontSize: '0.95rem', letterSpacing: '-0.02em' }}>
              BEST BUY CART
            </span>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#F8FAFC', cursor: 'pointer', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* User Badge Bar */}
        <div style={{ padding: '16px 20px', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
          {isAuthenticated && currentUser ? (
            <div
              className="flex items-center justify-between"
              onClick={() => {
                navigate('/account');
                onClose();
              }}
              style={{ cursor: 'pointer' }}
            >
              <div className="flex items-center gap-sm">
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.fullName}
                  style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#1A1A1A' }}>{currentUser.fullName}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{currentUser.tierName} • {currentUser.reputationPoints} pts</div>
                </div>
              </div>
              <ChevronRight size={16} style={{ color: '#94A3B8' }} />
            </div>
          ) : (
            <Button
              variant="primary"
              size="sm"
              icon={<User size={14} />}
              onClick={() => {
                openAuthModal('login');
                onClose();
              }}
              style={{ width: '100%', borderRadius: '8px' }}
            >
              Sign In / Create Account
            </Button>
          )}
        </div>

        {/* Nav Accordion List */}
        <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          <button
            onClick={() => {
              navigate('/');
              onClose();
            }}
            className="btn btn-ghost"
            style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.9rem', padding: '10px 12px', gap: '10px', color: '#1A1A1A' }}
          >
            <Compass size={16} style={{ color: '#2563EB' }} /> Home
          </button>

          {/* Categories Accordion */}
          <div>
            <button
              onClick={() => toggleSection('categories')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: expandedSection === 'categories' ? '#EFF6FF' : 'transparent',
                color: expandedSection === 'categories' ? '#2563EB' : '#1A1A1A',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              <span className="flex items-center gap-xs">
                <Grid2X2 size={16} /> Categories
              </span>
              <ChevronDown
                size={16}
                style={{ transform: expandedSection === 'categories' ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}
              />
            </button>

            {expandedSection === 'categories' && (
              <div style={{ paddingLeft: '16px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      navigate('/category-detail', { categorySlug: cat.slug });
                      onClose();
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '8px 10px',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      color: '#475569',
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <CategoryIcon slugOrId={cat.slug} size={14} />
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Discover Accordion */}
          <div>
            <button
              onClick={() => toggleSection('discover')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: expandedSection === 'discover' ? '#EFF6FF' : 'transparent',
                color: expandedSection === 'discover' ? '#2563EB' : '#1A1A1A',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              <span className="flex items-center gap-xs">
                <Sparkles size={16} /> Discover
              </span>
              <ChevronDown
                size={16}
                style={{ transform: expandedSection === 'discover' ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}
              />
            </button>

            {expandedSection === 'discover' && (
              <div style={{ paddingLeft: '16px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <button
                  onClick={() => {
                    navigate('/discover/hidden-gems');
                    onClose();
                  }}
                  style={{ width: '100%', textAlign: 'left', padding: '8px 10px', fontSize: '0.84rem', color: '#059669', fontWeight: 600, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <Gem size={14} /> Hidden Gems
                </button>
                <button
                  onClick={() => {
                    navigate('/discover/overhyped');
                    onClose();
                  }}
                  style={{ width: '100%', textAlign: 'left', padding: '8px 10px', fontSize: '0.84rem', color: '#DC2626', fontWeight: 600, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <AlertTriangle size={14} /> Overhyped Watch
                </button>
                <button
                  onClick={() => {
                    navigate('/trending');
                    onClose();
                  }}
                  style={{ width: '100%', textAlign: 'left', padding: '8px 10px', fontSize: '0.84rem', color: '#EA580C', fontWeight: 600, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <Flame size={14} /> Trending Now
                </button>
              </div>
            )}
          </div>

          {/* Tools Accordion */}
          <div>
            <button
              onClick={() => toggleSection('tools')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: expandedSection === 'tools' ? '#EFF6FF' : 'transparent',
                color: expandedSection === 'tools' ? '#2563EB' : '#1A1A1A',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              <span className="flex items-center gap-xs">
                <Settings size={16} /> Decision Tools
              </span>
              <ChevronDown
                size={16}
                style={{ transform: expandedSection === 'tools' ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}
              />
            </button>

            {expandedSection === 'tools' && (
              <div style={{ paddingLeft: '16px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <button
                  onClick={() => {
                    navigate('/tools/product-finder');
                    onClose();
                  }}
                  style={{ width: '100%', textAlign: 'left', padding: '8px 10px', fontSize: '0.84rem', color: '#9333EA', fontWeight: 600, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <Brain size={14} /> AI Product Finder
                </button>
                <button
                  onClick={() => {
                    navigate('/gift-finder');
                    onClose();
                  }}
                  style={{ width: '100%', textAlign: 'left', padding: '8px 10px', fontSize: '0.84rem', color: '#E11D48', fontWeight: 600, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <Gift size={14} /> Gift Finder Wizard
                </button>
                <button
                  onClick={() => {
                    navigate('/compare');
                    onClose();
                  }}
                  style={{ width: '100%', textAlign: 'left', padding: '8px 10px', fontSize: '0.84rem', color: '#2563EB', fontWeight: 600, border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <Sword size={14} /> Comparison Engine
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              navigate('/compare');
              onClose();
            }}
            className="btn btn-ghost"
            style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.9rem', padding: '10px 12px', gap: '10px', color: '#1A1A1A' }}
          >
            <Sword size={16} style={{ color: '#2563EB' }} /> Compare
          </button>

          <button
            onClick={() => {
              navigate('/deals');
              onClose();
            }}
            className="btn btn-ghost"
            style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.9rem', padding: '10px 12px', gap: '10px', color: '#1A1A1A' }}
          >
            <Tag size={16} style={{ color: '#059669' }} /> Deals & Price Drops
          </button>
        </div>
      </div>
    </div>
  );
};
