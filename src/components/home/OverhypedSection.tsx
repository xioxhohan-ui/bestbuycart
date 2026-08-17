import React from 'react';
import { Product } from '../../types/product';
import { useCountry } from '../../context/CountryContext';
import { useNavigation } from '../../context/NavigationContext';
import { AlertTriangle, Flame, ArrowRight, XCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface OverhypedSectionProps {
  products: Product[];
}

export const OverhypedSection: React.FC<OverhypedSectionProps> = ({ products }) => {
  const { formatPrice } = useCountry();
  const { navigate } = useNavigation();

  return (
    <section style={{ padding: '60px 0', borderTop: '1px solid var(--border-default)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="flex items-center justify-between" style={{ marginBottom: '28px' }}>
          <div>
            <div className="flex items-center gap-xs" style={{ marginBottom: '4px' }}>
              <AlertTriangle size={22} style={{ color: '#DC2626' }} />
              <h2 className="h2" style={{ margin: 0 }}>
                OVERHYPED WATCH
              </h2>
            </div>
            <p style={{ color: '#4B5563', margin: 0, fontSize: '0.95rem' }}>
              Popular ≠ Good. Here's what's trending on social media that might NOT be worth your money.
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

        {/* Two-Column Layout Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px'
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1.5px solid #FEE2E2',
                boxShadow: 'var(--shadow-card)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                position: 'relative'
              }}
            >
              {/* Top Warning Ribbon */}
              <div className="flex items-center justify-between">
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    backgroundColor: '#FEF2F2',
                    color: '#DC2626',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    border: '1px solid #FECACA'
                  }}
                >
                  <AlertTriangle size={12} />
                  <span>Caution: Low Value Ratio</span>
                </div>

                <span className="font-mono" style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1A1A1A' }}>
                  {formatPrice(product.priceUSD)}
                </span>
              </div>

              {/* Product Info Row */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '88px', height: '88px', objectFit: 'cover', borderRadius: '10px', backgroundColor: '#F8FAFC', flexShrink: 0 }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>
                    {product.brand}
                  </div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1A1A1A', margin: '3px 0 6px', lineHeight: 1.3 }}>
                    {product.name}
                  </h4>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                    Rating: {product.rating} / 5.0 ({product.reviewCount.toLocaleString()} reviews)
                  </div>
                </div>
              </div>

              {/* Hype vs Worth Comparison Bars */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                  backgroundColor: '#FAFBFD',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #F0F1F3'
                }}
              >
                <div>
                  <div className="flex items-center gap-xs" style={{ fontSize: '0.68rem', color: '#EA580C', fontWeight: 700, textTransform: 'uppercase' }}>
                    <Flame size={12} /> Hype Score
                  </div>
                  <div className="font-mono" style={{ fontSize: '1.15rem', fontWeight: 800, color: '#EA580C' }}>
                    {product.hypeScore}/100
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-xs" style={{ fontSize: '0.68rem', color: '#DC2626', fontWeight: 700, textTransform: 'uppercase' }}>
                    <AlertTriangle size={12} /> Worth Score
                  </div>
                  <div className="font-mono" style={{ fontSize: '1.15rem', fontWeight: 800, color: '#DC2626' }}>
                    {product.worthScore}/100
                  </div>
                </div>
              </div>

              {/* Honest Verdict Statement */}
              <div
                style={{
                  fontSize: '0.82rem',
                  color: '#4B5563',
                  lineHeight: 1.45,
                  backgroundColor: '#FFF5F5',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  borderLeft: '3px solid #DC2626'
                }}
              >
                <strong style={{ color: '#DC2626' }}>Our Honest Take: </strong>
                {product.overhypedReason || product.verdict}
              </div>

              {/* CTA to See Alternatives */}
              <div style={{ marginTop: 'auto', paddingTop: '4px' }}>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => navigate('/compare', { product })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderColor: '#2563EB',
                    color: '#2563EB',
                    fontWeight: 600
                  }}
                  icon={<ArrowRight size={14} />}
                  iconPosition="right"
                >
                  See Smarter Alternatives
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
