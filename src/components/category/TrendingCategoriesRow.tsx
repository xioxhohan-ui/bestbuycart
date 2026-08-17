import React from 'react';
import { Category } from '../../types/category';
import { useNavigation } from '../../context/NavigationContext';
import { TrendingUp, Flame, ArrowRight } from 'lucide-react';

interface TrendingCategoriesRowProps {
  categories: Category[];
}

export const TrendingCategoriesRow: React.FC<TrendingCategoriesRowProps> = ({ categories }) => {
  const { navigate } = useNavigation();

  return (
    <div style={{ marginBottom: '40px' }}>
      <div className="flex items-center gap-xs" style={{ marginBottom: '16px' }}>
        <Flame size={20} style={{ color: '#EA580C' }} />
        <h3 className="h3" style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: '1rem', color: '#1A1A1A' }}>
          Trending Categories Right Now
        </h3>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px'
        }}
      >
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate('/category-detail', { categorySlug: cat.slug })}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1.5px solid #E5E7EB',
              padding: '20px',
              boxShadow: 'var(--shadow-card)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.borderColor = '#2563EB';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(37, 99, 235, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.borderColor = '#E5E7EB';
              e.currentTarget.style.boxShadow = 'var(--shadow-card)';
            }}
          >
            {/* Top row: Emoji & Growth badge */}
            <div className="flex items-center justify-between">
              <span style={{ fontSize: '2rem' }}>{cat.emoji}</span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px',
                  backgroundColor: '#ECFDF5',
                  color: '#059669',
                  padding: '3px 8px',
                  borderRadius: '999px',
                  fontSize: '0.72rem',
                  fontWeight: 800
                }}
              >
                <TrendingUp size={11} strokeWidth={3} />
                ↑ {cat.weeklyGrowth || 25}% this wk
              </span>
            </div>

            {/* Name & Count */}
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 2px', color: '#1A1A1A' }}>
                {cat.name}
              </h4>
              <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>
                {cat.featuredProductCount.toLocaleString()}+ items curated
              </span>
            </div>

            <div
              className="flex items-center gap-xs"
              style={{
                color: '#2563EB',
                fontWeight: 600,
                fontSize: '0.78rem',
                marginTop: 'auto',
                paddingTop: '6px'
              }}
            >
              <span>Explore Category</span>
              <ArrowRight size={13} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
