import React from 'react';
import { Product } from '../../types/product';
import { useCountry } from '../../context/CountryContext';
import { useNavigation } from '../../context/NavigationContext';
import { Diamond, Star, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';

interface HiddenGemsSectionProps {
  products: Product[];
}

export const HiddenGemsSection: React.FC<HiddenGemsSectionProps> = ({ products }) => {
  const { formatPrice } = useCountry();
  const { navigate } = useNavigation();

  if (products.length === 0) return null;
  const gem = products[0]; // Spotlight gem

  return (
    <section id="gems-section" style={{ padding: '60px 0', borderTop: '1px solid var(--border-default)', backgroundColor: '#FAFBFD' }}>
      <div className="container">
        {/* Section Header */}
        <div className="flex items-center justify-between" style={{ marginBottom: '24px' }}>
          <div>
            <div className="flex items-center gap-xs" style={{ marginBottom: '4px' }}>
              <Diamond size={22} style={{ color: '#2563EB' }} />
              <h2 className="h2" style={{ margin: 0 }}>
                HIDDEN GEMS
              </h2>
            </div>
            <p style={{ color: '#4B5563', margin: 0, fontSize: '0.95rem' }}>
              Products people aren't talking about enough — outperforming rivals at a fraction of the cost.
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

        {/* Full Width Spotlight Card */}
        <div
          onClick={() => navigate('/product-detail', { product: gem })}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1.5px solid #DBEAFE',
            boxShadow: 'var(--shadow-card)',
            padding: '32px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            alignItems: 'center'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
            e.currentTarget.style.borderColor = '#93C5FD';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'var(--shadow-card)';
            e.currentTarget.style.borderColor = '#DBEAFE';
          }}
        >
          {/* Left Column: Image & Badges */}
          <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#F8FAFC', padding: '20px', textAlign: 'center' }}>
            <img
              src={gem.image}
              alt={gem.name}
              style={{ maxHeight: '240px', margin: '0 auto', objectFit: 'contain', borderRadius: '12px' }}
            />
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                backgroundColor: '#EFF6FF',
                color: '#2563EB',
                border: '1px solid #BFDBFE',
                borderRadius: '999px',
                padding: '4px 12px',
                fontSize: '0.75rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Diamond size={13} />
              <span>Verified Hidden Gem</span>
            </div>
          </div>

          {/* Right Column: Editorial & Rating */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="flex items-center justify-between flex-wrap gap-sm">
              <div className="flex items-center gap-sm">
                <span className="flex items-center gap-xs" style={{ color: '#D97706', fontWeight: 800, fontSize: '1.1rem' }}>
                  <Star size={16} fill="#D97706" style={{ color: '#D97706' }} />
                  {gem.rating}
                </span>
                <span style={{ color: '#6B7280', fontSize: '0.85rem' }}>
                  ({gem.reviewCount.toLocaleString()} verified reviews)
                </span>
              </div>

              <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1A1A1A' }}>
                {formatPrice(gem.priceUSD)}
              </div>
            </div>

            <h3 className="h3" style={{ margin: 0, color: '#1A1A1A' }}>
              {gem.name}
            </h3>

            {/* Why we think it's underrated */}
            <div
              style={{
                backgroundColor: '#F8FAFC',
                borderLeft: '4px solid #2563EB',
                borderRadius: '0 12px 12px 0',
                padding: '16px',
                marginTop: '4px'
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#2563EB', letterSpacing: '0.04em', marginBottom: '6px' }}>
                Why we think it's underrated:
              </div>
              <p
                style={{
                  margin: 0,
                  fontStyle: 'italic',
                  color: '#374151',
                  fontSize: '0.92rem',
                  lineHeight: 1.6
                }}
              >
                {gem.editorialQuote || `"${gem.summary}"`}
              </p>
            </div>

            {/* Score & CTA Bar */}
            <div className="flex items-center justify-between flex-wrap gap-md" style={{ marginTop: '8px', paddingTop: '12px', borderTop: '1px solid #F0F1F3' }}>
              <div className="flex items-center gap-md">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.7rem', color: '#6B7280', textTransform: 'uppercase', fontWeight: 600 }}>Worth Score</span>
                  <span className="font-mono flex items-center gap-xs" style={{ fontSize: '1.15rem', fontWeight: 800, color: '#059669' }}>
                    <ShieldCheck size={16} />
                    {gem.worthScore}%
                  </span>
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/product-detail', { product: gem });
                }}
                icon={<ArrowRight size={16} />}
                iconPosition="right"
                style={{ backgroundColor: '#2563EB' }}
              >
                Discover this gem
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
