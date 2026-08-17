import React from 'react';
import { Category } from '../../types/category';
import { useNavigation } from '../../context/NavigationContext';
import { CategoryIcon } from '../ui/CategoryIcon';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CategoryGrid14Props {
  categories: Category[];
}

export const CategoryGrid14: React.FC<CategoryGrid14Props> = ({ categories }) => {
  const { navigate } = useNavigation();

  return (
    <div style={{ marginBottom: '48px' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
        <h3 className="h3" style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: '1rem', color: '#1A1A1A' }}>
          All 14 Curated Categories
        </h3>
        <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>
          Select any department to start structured discovery
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '16px'
        }}
      >
        {categories.map((cat) => {
          const isFeatured = cat.stage === 'core';
          const isNew = cat.stage === 'new';

          return (
            <div
              key={cat.id}
              onClick={() => navigate('/category-detail', { categorySlug: cat.slug })}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: isFeatured ? '1.5px solid #BFDBFE' : '1px solid #E5E7EB',
                padding: '24px 16px',
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-card)',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = '#2563EB';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(37, 99, 235, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = isFeatured ? '#BFDBFE' : '#E5E7EB';
                e.currentTarget.style.boxShadow = 'var(--shadow-card)';
              }}
            >
              {/* Badge if featured or new */}
              {isFeatured && (
                <span
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    backgroundColor: '#EFF6FF',
                    color: '#2563EB',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}
                >
                  Featured
                </span>
              )}
              {isNew && (
                <span
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    backgroundColor: '#FEF3C7',
                    color: '#D97706',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}
                >
                  New
                </span>
              )}

              {/* Large 60px SVG Icon Container */}
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  backgroundColor: '#EFF6FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px',
                  border: '1px solid #DBEAFE'
                }}
              >
                <CategoryIcon slugOrId={cat.slug || cat.id} size={28} color="#2563EB" />
              </div>

              {/* Category Name */}
              <h4
                style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#1A1A1A',
                  margin: '0 0 4px',
                  lineHeight: 1.2
                }}
              >
                {cat.name}
              </h4>

              {/* Product Count */}
              <span
                style={{
                  fontSize: '0.8rem',
                  color: '#6B7280',
                  fontWeight: 400
                }}
              >
                {cat.featuredProductCount.toLocaleString()}+ items
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
