import React, { useState, useEffect } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { menuService } from '../../services/menuService';
import { CategoryIcon } from '../ui/CategoryIcon';
import { Grid2X2, ChevronRight } from 'lucide-react';

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
        boxShadow: '0 20px 35px -10px rgba(15, 23, 42, 0.2)',
        borderTop: '1px solid #E2E8F0',
        borderBottom: '2px solid #2563EB',
        zIndex: 9990,
        maxHeight: '70vh',
        overflowY: 'auto',
        animation: 'fadeInScale 0.15s ease-out'
      }}
      onMouseLeave={onClose}
    >
      <div className="container" style={{ padding: '16px 24px' }}>
        {/* Compact Header Bar */}
        <div
          className="flex items-center justify-between"
          style={{
            paddingBottom: '10px',
            marginBottom: '14px',
            borderBottom: '1px solid #F1F5F9'
          }}
        >
          <div className="flex items-center gap-xs">
            <Grid2X2 size={15} style={{ color: '#2563EB' }} />
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.01em' }}>
              BROWSE CATEGORIES (14 HUBS)
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
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px'
            }}
          >
            <span>View All Categories</span>
            <ChevronRight size={13} />
          </button>
        </div>

        {/* 5-Column Compact Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
          {categories.map((cat) => (
            <div
              key={cat.id}
              style={{
                padding: '8px 10px',
                borderRadius: '8px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #F1F5F9',
                transition: 'all 0.12s'
              }}
            >
              {/* Category Title Header */}
              <div
                onClick={() => {
                  navigate('/category-detail', { categorySlug: cat.slug });
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  marginBottom: '6px'
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#2563EB',
                    flexShrink: 0
                  }}
                >
                  <CategoryIcon slugOrId={cat.slug} size={13} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {cat.name}
                  </div>
                </div>
              </div>

              {/* Compact Subcategory Links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingLeft: '30px' }}>
                {cat.subcategories.slice(0, 3).map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => {
                      navigate('/category-detail', { categorySlug: cat.slug, subcategorySlug: sub.slug });
                      onClose();
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '1px 0',
                      fontSize: '0.74rem',
                      color: '#64748B',
                      fontWeight: 500,
                      cursor: 'pointer',
                      textAlign: 'left',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      transition: 'color 0.12s'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#2563EB')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#64748B')}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
