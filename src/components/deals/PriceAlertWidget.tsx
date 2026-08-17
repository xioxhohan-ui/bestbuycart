import React, { useState } from 'react';
import { useCountry } from '../../context/CountryContext';
import { dealService } from '../../services/dealService';
import { Bell, Check, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

interface PriceAlertWidgetProps {
  productId: string;
  productName: string;
  currentPriceUSD: number;
}

export const PriceAlertWidget: React.FC<PriceAlertWidgetProps> = ({
  productId,
  productName,
  currentPriceUSD
}) => {
  const { currentCountry, formatPrice } = useCountry();
  const [email, setEmail] = useState('');
  const [targetPrice, setTargetPrice] = useState(Math.round(currentPriceUSD * 0.85).toString());
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !targetPrice) return;

    await dealService.subscribePriceAlert({
      userEmail: email,
      productId,
      productName,
      currentPriceUSD,
      targetPriceUSD: Number(targetPrice)
    });

    setIsSubmitted(true);
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1.5px solid #BFDBFE',
        padding: '24px',
        boxShadow: 'var(--shadow-card)',
        marginBottom: '32px'
      }}
    >
      <div className="flex items-center gap-xs" style={{ marginBottom: '8px' }}>
        <div style={{ padding: '6px', backgroundColor: '#EFF6FF', borderRadius: '8px', color: '#2563EB' }}>
          <Bell size={16} />
        </div>
        <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#1A1A1A' }}>
          Get Instant Price Drop Alerts
        </h4>
      </div>

      <p style={{ color: '#4B5563', fontSize: '0.84rem', margin: '0 0 16px', lineHeight: 1.4 }}>
        Want to know when <strong>{productName}</strong> drops below your target budget? We monitor major retailers every 6 hours.
      </p>

      {isSubmitted ? (
        <div style={{ backgroundColor: '#ECFDF5', padding: '14px', borderRadius: '12px', color: '#059669', fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Check size={16} style={{ flexShrink: 0 }} />
          <span>
            Alert set! We will email <strong>{email}</strong> the second the price hits {formatPrice(Number(targetPrice))}.
          </span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', alignItems: 'flex-end' }}>
          <div>
            <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>
              Target Price ({currentCountry.currencyCode})
            </label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '10px', top: '8px', color: '#6B7280', fontWeight: 700, fontSize: '0.85rem' }}>
                {currentCountry.currencySymbol}
              </span>
              <input
                type="number"
                required
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                style={{ width: '100%', padding: '8px 12px 8px 26px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.88rem', fontWeight: 600 }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px', textTransform: 'uppercase' }}>
              Your Email Address
            </label>
            <input
              type="email"
              required
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
            />
          </div>

          <div>
            <Button
              type="submit"
              variant="primary"
              size="md"
              style={{ width: '100%', borderRadius: '8px', height: '38px' }}
              icon={<Bell size={14} />}
            >
              Set Price Alert
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
