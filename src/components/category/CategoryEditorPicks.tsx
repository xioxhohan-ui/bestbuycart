import React from 'react';
import { Product } from '../../types/product';
import { useNavigation } from '../../context/NavigationContext';
import { useCountry } from '../../context/CountryContext';
import { Trophy, DollarSign, Diamond, AlertTriangle, ArrowRight, Star, Sparkles } from 'lucide-react';

interface CategoryEditorPicksProps {
  categoryName: string;
  picks: {
    bestOverall?: Product;
    bestBudget?: Product;
    hiddenGem?: Product;
    overhyped?: Product;
  };
}

export const CategoryEditorPicks: React.FC<CategoryEditorPicksProps> = ({ categoryName, picks }) => {
  const { navigate } = useNavigation();
  const { formatPrice } = useCountry();

  const items = [
    {
      badge: '1. Best Overall',
      icon: <Trophy size={14} style={{ color: '#059669' }} />,
      bg: '#ECFDF5',
      border: '#A7F3D0',
      text: '#065F46',
      product: picks.bestOverall
    },
    {
      badge: '2. Best Budget Value',
      icon: <DollarSign size={14} style={{ color: '#2563EB' }} />,
      bg: '#EFF6FF',
      border: '#BFDBFE',
      text: '#1E40AF',
      product: picks.bestBudget
    },
    {
      badge: '3. Hidden Gem',
      icon: <Diamond size={14} style={{ color: '#9333EA' }} />,
      bg: '#FAF5FF',
      border: '#E9D5FF',
      text: '#6B21A8',
      product: picks.hiddenGem
    },
    {
      badge: '4. Overhyped Caution',
      icon: <AlertTriangle size={14} style={{ color: '#DC2626' }} />,
      bg: '#FEF2F2',
      border: '#FECACA',
      text: '#991B1B',
      product: picks.overhyped
    }
  ];

  return (
    <div style={{ marginTop: '56px', paddingTop: '40px', borderTop: '1px solid var(--border-default)' }}>
      <div className="flex items-center gap-xs" style={{ marginBottom: '18px' }}>
        <Sparkles size={20} style={{ color: '#2563EB' }} />
        <h3 className="h3" style={{ margin: 0, color: '#1A1A1A' }}>
          Editor's Picks for {categoryName}
        </h3>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px'
        }}
      >
        {items.map((item, idx) => {
          if (!item.product) return null;
          return (
            <div
              key={idx}
              onClick={() => navigate('/product-detail', { product: item.product })}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                border: `1.5px solid ${item.border}`,
                padding: '16px',
                boxShadow: 'var(--shadow-card)',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
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
              {/* Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: item.bg,
                  color: item.text,
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  width: 'fit-content'
                }}
              >
                {item.icon}
                <span>{item.badge}</span>
              </div>

              {/* Product Info */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0, backgroundColor: '#F8FAFC' }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h5 style={{ fontSize: '0.88rem', fontWeight: 700, margin: '0 0 2px', color: '#1A1A1A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.product.name}
                  </h5>
                  <div className="flex items-center justify-between">
                    <span className="font-mono" style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1A1A1A' }}>
                      {formatPrice(item.product.priceUSD)}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700 }}>
                      Worth {item.product.worthScore}/100
                    </span>
                  </div>
                </div>
              </div>

              {/* Short verdict */}
              <div style={{ fontSize: '0.75rem', fontStyle: 'italic', color: '#6B7280', marginTop: 'auto', paddingTop: '4px', borderTop: '1px solid #F0F1F3' }}>
                "{item.product.verdict}"
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
