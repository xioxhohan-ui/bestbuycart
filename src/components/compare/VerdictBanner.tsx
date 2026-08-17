import React from 'react';
import { Product } from '../../types/product';
import { useNavigation } from '../../context/NavigationContext';
import { Trophy, ArrowRight, ExternalLink, ShoppingBag } from 'lucide-react';
import { Button } from '../ui/Button';

interface VerdictBannerProps {
  winnerProduct: Product;
  productA: Product;
  productB: Product;
  verdictText: string;
  whyWinner: string;
  whenToChooseB: string;
}

export const VerdictBanner: React.FC<VerdictBannerProps> = ({
  winnerProduct,
  productA,
  productB,
  verdictText,
  whyWinner,
  whenToChooseB
}) => {
  const { navigate } = useNavigation();

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '2px solid #059669',
        padding: '32px',
        boxShadow: '0 10px 30px rgba(5, 150, 105, 0.08)',
        marginBottom: '40px'
      }}
    >
      {/* Badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: '#ECFDF5',
          color: '#059669',
          padding: '4px 12px',
          borderRadius: '999px',
          fontSize: '0.78rem',
          fontWeight: 800,
          textTransform: 'uppercase',
          marginBottom: '16px'
        }}
      >
        <Trophy size={14} /> Algorithmic Final Verdict
      </div>

      <h3 className="h3" style={{ margin: '0 0 10px', color: '#1A1A1A' }}>
        BEST OVERALL: {winnerProduct.name}
      </h3>

      <p style={{ color: '#374151', fontSize: '0.98rem', lineHeight: 1.6, margin: '0 0 16px' }}>
        {verdictText}
      </p>

      {/* When to choose B block */}
      <div
        style={{
          padding: '14px 18px',
          backgroundColor: '#F8FAFC',
          borderRadius: '12px',
          borderLeft: '4px solid #2563EB',
          marginBottom: '24px'
        }}
      >
        <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#1E40AF', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
          When to Choose {productB.brand}:
        </div>
        <div style={{ fontSize: '0.88rem', color: '#4B5563', lineHeight: 1.5 }}>
          {whenToChooseB}
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex items-center gap-sm flex-wrap">
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate('/product-detail', { product: productA })}
          style={{ borderRadius: '10px' }}
          icon={<ShoppingBag size={16} />}
        >
          View {productA.brand} Offers
        </Button>

        <Button
          variant="secondary"
          size="lg"
          onClick={() => navigate('/product-detail', { product: productB })}
          style={{ borderRadius: '10px' }}
          icon={<ShoppingBag size={16} />}
        >
          View {productB.brand} Offers
        </Button>

        <Button
          variant="ghost"
          size="lg"
          onClick={() => navigate('/trending')}
          style={{ color: '#2563EB' }}
          icon={<ArrowRight size={16} />}
          iconPosition="right"
        >
          Browse All Category Rankings
        </Button>
      </div>
    </div>
  );
};
