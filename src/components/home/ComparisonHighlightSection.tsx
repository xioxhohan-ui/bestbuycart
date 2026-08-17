import React from 'react';
import { ProductComparison } from '../../types/comparison';
import { Product } from '../../types/product';
import { useCountry } from '../../context/CountryContext';
import { useNavigation } from '../../context/NavigationContext';
import { ArrowRight, Trophy, Check, X, ArrowRightLeft } from 'lucide-react';
import { Button } from '../ui/Button';

interface ComparisonHighlightSectionProps {
  comparison: ProductComparison;
  productA: Product;
  productB: Product;
}

export const ComparisonHighlightSection: React.FC<ComparisonHighlightSectionProps> = ({
  comparison,
  productA,
  productB
}) => {
  const { formatPrice } = useCountry();
  const { navigate } = useNavigation();

  const specRows = comparison.specRows || [
    { featureName: 'Battery Life', valueA: '30 hours', valueB: '24 hours' },
    { featureName: 'Active Noise Cancellation', valueA: true, valueB: true },
    { featureName: 'Bluetooth Multipoint', valueA: true, valueB: true }
  ];

  return (
    <section style={{ padding: '60px 0', borderTop: '1px solid var(--border-default)', backgroundColor: '#F8FAFC' }}>
      <div className="container">
        {/* Section Header */}
        <div className="flex items-center justify-between" style={{ marginBottom: '28px' }}>
          <div>
            <div className="flex items-center gap-xs" style={{ marginBottom: '4px' }}>
              <ArrowRightLeft size={22} style={{ color: '#2563EB' }} />
              <h2 className="h2" style={{ margin: 0 }}>
                POPULAR COMPARISONS
              </h2>
            </div>
            <p style={{ color: '#4B5563', margin: 0, fontSize: '0.95rem' }}>
              Side-by-side feature and value analysis to help you decide.
            </p>
          </div>

          <button
            onClick={() => navigate('/compare')}
            className="btn btn-ghost btn-sm"
            style={{ color: '#2563EB', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            <span>View All</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Comparison Split Box */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid var(--border-default)',
            boxShadow: 'var(--shadow-card)',
            padding: '28px',
            position: 'relative'
          }}
        >
          {/* Header Split */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              alignItems: 'center',
              gap: '16px',
              paddingBottom: '20px',
              borderBottom: '1px solid var(--border-subtle)',
              textAlign: 'center'
            }}
          >
            {/* Product A */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <img
                src={productA.image}
                alt={productA.name}
                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '10px' }}
              />
              <div>
                <span style={{ fontSize: '0.72rem', color: '#6B7280', textTransform: 'uppercase', fontWeight: 700 }}>
                  {productA.brand}
                </span>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '2px 0 4px', color: '#1A1A1A' }}>
                  {productA.name}
                </h4>
                <div className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 800, color: '#059669' }}>
                  {formatPrice(productA.priceUSD)}
                </div>
              </div>
            </div>

            {/* Centered VS Badge */}
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#EFF6FF',
                color: '#2563EB',
                fontWeight: 800,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #BFDBFE'
              }}
            >
              VS
            </div>

            {/* Product B */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <img
                src={productB.image}
                alt={productB.name}
                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '10px' }}
              />
              <div>
                <span style={{ fontSize: '0.72rem', color: '#6B7280', textTransform: 'uppercase', fontWeight: 700 }}>
                  {productB.brand}
                </span>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '2px 0 4px', color: '#1A1A1A' }}>
                  {productB.name}
                </h4>
                <div className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1A1A1A' }}>
                  {formatPrice(productB.priceUSD)}
                </div>
              </div>
            </div>
          </div>

          {/* Feature Matrix Rows */}
          <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {specRows.slice(0, 4).map((row, idx) => (
              <div
                key={idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 140px 1fr',
                  alignItems: 'center',
                  padding: '10px 12px',
                  backgroundColor: idx % 2 === 0 ? '#F8FAFC' : '#FFFFFF',
                  borderRadius: '8px',
                  fontSize: '0.86rem'
                }}
              >
                <div style={{ fontWeight: 600, color: '#059669' }}>
                  {typeof row.valueA === 'boolean' ? (row.valueA ? 'Included' : 'No') : row.valueA}
                </div>

                <div style={{ textAlign: 'center', fontWeight: 600, color: '#6B7280', fontSize: '0.78rem' }}>
                  {row.featureName}
                </div>

                <div style={{ textAlign: 'right', fontWeight: 600, color: '#4B5563' }}>
                  {typeof row.valueB === 'boolean' ? (row.valueB ? 'Included' : 'No') : row.valueB}
                </div>
              </div>
            ))}
          </div>

          {/* Winner Highlight Box */}
          <div
            style={{
              marginTop: '16px',
              padding: '16px 20px',
              borderRadius: '12px',
              backgroundColor: '#ECFDF5',
              border: '1.5px solid #A7F3D0',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#059669',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Trophy size={18} />
              </div>
              <div>
                <div className="flex items-center gap-xs" style={{ fontWeight: 800, color: '#065F46', fontSize: '0.95rem' }}>
                  <Trophy size={15} /> Our Pick: {productA.name}
                </div>
                <p style={{ margin: 0, color: '#047857', fontSize: '0.82rem', lineHeight: 1.4 }}>
                  {comparison.verdictText}
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/compare', { productA, productB })}
              icon={<ArrowRight size={14} />}
              iconPosition="right"
              style={{ backgroundColor: '#059669' }}
            >
              See Full Comparison
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
