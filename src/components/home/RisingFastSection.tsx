import React from 'react';
import { Product } from '../../types/product';
import { useCountry } from '../../context/CountryContext';
import { useNavigation } from '../../context/NavigationContext';
import { TrendingUp, ArrowRight, Star, Flame, Check } from 'lucide-react';
import { Button } from '../ui/Button';

interface RisingFastSectionProps {
  products: Product[];
}

export const RisingFastSection: React.FC<RisingFastSectionProps> = ({ products }) => {
  const { formatPrice } = useCountry();
  const { navigate } = useNavigation();

  return (
    <section id="rising-section" style={{ padding: '60px 0', borderTop: '1px solid var(--border-default)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="flex items-center justify-between" style={{ marginBottom: '28px' }}>
          <div>
            <div className="flex items-center gap-xs" style={{ marginBottom: '4px' }}>
              <TrendingUp size={22} style={{ color: '#D97706' }} />
              <h2 className="h2" style={{ margin: 0 }}>
                RISING FAST
              </h2>
            </div>
            <p style={{ color: '#4B5563', margin: 0, fontSize: '0.95rem' }}>
              Products gaining momentum — catch the trend early.
            </p>
          </div>

          <button
            onClick={() => navigate('/trending')}
            className="btn btn-ghost btn-sm"
            style={{ color: '#2563EB', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            <span>View All</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 2-Column Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '20px'
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate('/product-detail', { product })}
              style={{
                display: 'flex',
                borderRadius: '16px',
                border: '1px solid #E5E7EB',
                borderLeft: '4px solid #D97706',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F7FF 100%)',
                boxShadow: 'var(--shadow-card)',
                padding: '16px',
                gap: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'var(--shadow-card)';
              }}
            >
              {/* Product Image */}
              <div
                style={{
                  width: '120px',
                  height: '130px',
                  borderRadius: '12px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  overflow: 'hidden'
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Product Details */}
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                {/* Growth Badge & Brand */}
                <div className="flex items-center justify-between" style={{ marginBottom: '4px' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '3px',
                      backgroundColor: '#FEF3C7',
                      color: '#B45309',
                      padding: '2px 8px',
                      borderRadius: '999px',
                      fontSize: '0.72rem',
                      fontWeight: 800
                    }}
                  >
                    <TrendingUp size={11} strokeWidth={3} />
                    ▲ {product.growthPercentage || 120}%
                  </span>

                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase' }}>
                    {product.brand}
                  </span>
                </div>

                {/* Name */}
                <h4
                  style={{
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    color: '#1A1A1A',
                    lineHeight: 1.3,
                    margin: '0 0 6px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                  title={product.name}
                >
                  {product.name}
                </h4>

                {/* Rating & Price */}
                <div className="flex items-center justify-between" style={{ marginBottom: '8px' }}>
                  <div className="flex items-center gap-xs" style={{ fontSize: '0.78rem', color: '#4B5563' }}>
                    <Star size={12} fill="#D97706" style={{ color: '#D97706' }} />
                    <span style={{ fontWeight: 700, color: '#1A1A1A' }}>{product.rating}</span>
                  </div>

                  <div className="font-mono" style={{ fontSize: '1rem', fontWeight: 800, color: '#1A1A1A' }}>
                    {formatPrice(product.priceUSD)}
                  </div>
                </div>

                {/* Why it's rising bullet points */}
                {product.whyRising && product.whyRising.length > 0 && (
                  <div
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      borderRadius: '8px',
                      padding: '6px 8px',
                      fontSize: '0.74rem',
                      color: '#4B5563',
                      marginBottom: '10px'
                    }}
                  >
                    <div style={{ fontWeight: 700, color: '#D97706', marginBottom: '2px', fontSize: '0.7rem' }}>
                      Why it's rising:
                    </div>
                    {product.whyRising.slice(0, 2).map((bullet, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px', lineHeight: 1.3 }}>
                        <span style={{ color: '#059669' }}>•</span>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Discover CTA Button */}
                <div style={{ marginTop: 'auto' }}>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/product-detail', { product });
                    }}
                    style={{ width: '100%', padding: '6px', fontSize: '0.75rem', borderRadius: '8px' }}
                  >
                    <span>Discover</span>
                    <ArrowRight size={12} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
