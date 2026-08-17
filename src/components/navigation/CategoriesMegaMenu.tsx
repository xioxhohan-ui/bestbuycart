import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { menuService } from '../../services/menuService';
import { CategoryIcon } from '../ui/CategoryIcon';
import { Grid2X2, ChevronRight, Sparkles, ArrowRight, Star, ShieldCheck } from 'lucide-react';

interface MegaCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  itemCount: number;
  subcategories: { id: string; name: string; slug: string }[];
}

interface CategoriesMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CategoriesMegaMenu: React.FC<CategoriesMegaMenuProps> = ({ isOpen, onClose }) => {
  const { navigate } = useNavigation();
  const [categories, setCategories] = useState<MegaCategory[]>([]);

  useEffect(() => {
    if (isOpen) {
      menuService.generateCategoryMegaMenuTree().then(setCategories);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
        borderTop: '1px solid #E2E8F0',
        borderBottom: '2px solid #2563EB',
        zIndex: 9990,
        animation: 'fadeInScale 0.15s ease-out'
      }}
      onMouseLeave={onClose}
    >
      <div className="container" style={{ padding: '28px 24px' }}>
        {/* Header Bar inside Mega Menu */}
        <div
          className="flex items-center justify-between"
          style={{
            paddingBottom: '16px',
            marginBottom: '20px',
            borderBottom: '1px solid #F1F5F9'
          }}
        >
          <div className="flex items-center gap-xs">
            <Grid2X2 size={18} style={{ color: '#2563EB' }} />
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1A1A1A', letterSpacing: '-0.01em' }}>
              BROWSE ALL 14 CATEGORY HUBS
            </span>
            <span style={{ fontSize: '0.75rem', color: '#64748B', marginLeft: '6px' }}>
              • Over 1,200+ verified products with Worth & Hype Scores
            </span>
          </div>

          <button
            onClick={() => {
              navigate('/categories');
              onClose();
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#2563EB',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>View All Categories Hub</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* 4-Column Grid of Categories & Subcategories */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {categories.map((cat) => (
            <div
              key={cat.id}
              style={{
                padding: '12px 14px',
                borderRadius: '12px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #F1F5F9',
                transition: 'all 0.15s'
              }}
            >
              {/* Main Category Header */}
              <div
                onClick={() => {
                  navigate('/category-detail', { categorySlug: cat.slug });
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  marginBottom: '10px'
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#2563EB',
                    flexShrink: 0
                  }}
                >
                  <CategoryIcon slugOrId={cat.slug} size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#1A1A1A', lineHeight: 1.2 }}>
                    {cat.name}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>
                    {cat.itemCount} items
                  </div>
                </div>
              </div>

              {/* Subcategories List */}
              <ul style={{ margin: 0, paddingLeft: '42px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {cat.subcategories.slice(0, 4).map((sub) => (
                  <li key={sub.id}>
                    <button
                      onClick={() => {
                        navigate('/category-detail', { categorySlug: cat.slug, subcategorySlug: sub.slug });
                        onClose();
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: '2px 0',
                        fontSize: '0.8rem',
                        color: '#475569',
                        fontWeight: 500,
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'color 0.15s'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#2563EB')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#475569')}
                    >
                      {sub.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
