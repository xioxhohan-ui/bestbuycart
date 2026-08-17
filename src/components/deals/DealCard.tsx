import React from 'react';
import { Deal } from '../../types/deals';
import { useCountry } from '../../context/CountryContext';
import { useNavigation } from '../../context/NavigationContext';
import { CountdownTimer } from './CountdownTimer';
import { Tag, ExternalLink, ArrowRight, TrendingDown } from 'lucide-react';
import { Button } from '../ui/Button';

interface DealCardProps {
  deal: Deal;
}

export const DealCard: React.FC<DealCardProps> = ({ deal }) => {
  const { formatPrice } = useCountry();
  const { navigate } = useNavigation();

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '18px',
        border: '1px solid var(--border-default)',
        padding: '20px',
        boxShadow: 'var(--shadow-card)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        position: 'relative',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
        e.currentTarget.style.borderColor = '#2563EB';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = 'var(--shadow-card)';
        e.currentTarget.style.borderColor = 'var(--border-default)';
      }}
    >
      {/* Top Badges */}
      <div className="flex items-center justify-between">
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3px',
            backgroundColor: '#ECFDF5',
            color: '#059669',
            padding: '3px 8px',
            borderRadius: '6px',
            fontSize: '0.75rem',
            fontWeight: 800
          }}
        >
          <TrendingDown size={13} />
          <span>Save {deal.discountPercent}%</span>
        </span>

        {deal.showCountdown && <CountdownTimer targetDate={deal.endDate} />}
      </div>

      {/* Product Image */}
      <div
        style={{
          backgroundColor: '#F8FAFC',
          borderRadius: '12px',
          height: '160px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          cursor: 'pointer'
        }}
        onClick={() => navigate('/product-detail')}
      >
        <img
          src={deal.image}
          alt={deal.productName}
          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
        />
      </div>

      {/* Brand & Title */}
      <div>
        <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase' }}>
          {deal.brand} • {deal.retailerName}
        </div>
        <h4
          style={{
            fontSize: '0.94rem',
            fontWeight: 700,
            margin: '4px 0 8px',
            color: '#1A1A1A',
            lineHeight: 1.3,
            height: '2.6em',
            overflow: 'hidden',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/product-detail')}
        >
          {deal.productName}
        </h4>
      </div>

      {/* Price Block */}
      <div className="flex items-baseline gap-xs" style={{ marginTop: 'auto', flexWrap: 'wrap' }}>
        <span className="font-mono" style={{ fontSize: '1.3rem', fontWeight: 900, color: '#059669', whiteSpace: 'nowrap' }}>
          {formatPrice(deal.dealPriceUSD)}
        </span>
        <span className="font-mono" style={{ fontSize: '0.88rem', color: '#9CA3AF', textDecoration: 'line-through', whiteSpace: 'nowrap' }}>
          {formatPrice(deal.originalPriceUSD)}
        </span>
      </div>

      {/* Action CTA */}
      <a
        href={deal.retailerUrl}
        target="_blank"
        rel="noreferrer"
        className="btn btn-primary btn-sm"
        style={{
          width: '100%',
          borderRadius: '8px',
          fontSize: '0.82rem',
          justifyContent: 'center',
          gap: '6px'
        }}
      >
        <span>Grab Deal on {deal.retailerName}</span>
        <ExternalLink size={13} />
      </a>
    </div>
  );
};
