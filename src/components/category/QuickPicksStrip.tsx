import React from 'react';
import { Product } from '../../types/product';
import { useNavigation } from '../../context/NavigationContext';
import { useCountry } from '../../context/CountryContext';
import { Trophy, DollarSign, Gem, Sparkles } from 'lucide-react';

interface QuickPicksStripProps {
  topPick?: Product;
  budgetPick?: Product;
  premiumPick?: Product;
}

export const QuickPicksStrip: React.FC<QuickPicksStripProps> = ({
  topPick,
  budgetPick,
  premiumPick
}) => {
  const { navigate } = useNavigation();
  const { formatPrice } = useCountry();

  if (!topPick && !budgetPick && !premiumPick) return null;

  return (
    <div
      style={{
        backgroundColor: '#F8FAFC',
        borderRadius: '16px',
        border: '1.5px solid #DBEAFE',
        padding: '16px 20px',
        marginBottom: '32px',
        boxShadow: 'var(--shadow-xs)'
      }}
    >
      <div className="flex items-center gap-xs" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
        <Sparkles size={13} /> Quick Snapshot: Top 3 Curated Recommendations
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '12px'
        }}
      >
        {topPick && (
          <div
            onClick={() => navigate('/product-detail', { product: topPick })}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#FFFFFF',
              borderRadius: '10px',
              border: '1px solid #A7F3D0',
              padding: '10px 12px',
              cursor: 'pointer'
            }}
          >
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Trophy size={16} style={{ color: '#059669' }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase' }}>
                Top Pick
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1A1A1A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {topPick.name}
              </div>
            </div>
            <div className="font-mono" style={{ fontSize: '0.88rem', fontWeight: 800, color: '#1A1A1A' }}>
              {formatPrice(topPick.priceUSD)}
            </div>
          </div>
        )}

        {budgetPick && (
          <div
            onClick={() => navigate('/product-detail', { product: budgetPick })}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#FFFFFF',
              borderRadius: '10px',
              border: '1px solid #BFDBFE',
              padding: '10px 12px',
              cursor: 'pointer'
            }}
          >
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <DollarSign size={16} style={{ color: '#2563EB' }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#2563EB', textTransform: 'uppercase' }}>
                Best Budget
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1A1A1A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {budgetPick.name}
              </div>
            </div>
            <div className="font-mono" style={{ fontSize: '0.88rem', fontWeight: 800, color: '#1A1A1A' }}>
              {formatPrice(budgetPick.priceUSD)}
            </div>
          </div>
        )}

        {premiumPick && (
          <div
            onClick={() => navigate('/product-detail', { product: premiumPick })}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#FFFFFF',
              borderRadius: '10px',
              border: '1px solid #E9D5FF',
              padding: '10px 12px',
              cursor: 'pointer'
            }}
          >
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#FAF5FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Gem size={16} style={{ color: '#9333EA' }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#9333EA', textTransform: 'uppercase' }}>
                Premium Choice
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1A1A1A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {premiumPick.name}
              </div>
            </div>
            <div className="font-mono" style={{ fontSize: '0.88rem', fontWeight: 800, color: '#1A1A1A' }}>
              {formatPrice(premiumPick.priceUSD)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
