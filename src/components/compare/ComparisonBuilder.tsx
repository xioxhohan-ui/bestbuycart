import React, { useState } from 'react';
import { Product } from '../../types/product';
import { ArrowRightLeft, Search, Plus, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

interface ComparisonBuilderProps {
  products: Product[];
  onCompare: (productA: Product, productB: Product, productC?: Product) => void;
}

export const ComparisonBuilder: React.FC<ComparisonBuilderProps> = ({ products, onCompare }) => {
  const [productAId, setProductAId] = useState(products[0]?.id || '');
  const [productBId, setProductBId] = useState(products[1]?.id || '');
  const [productCId, setProductCId] = useState('');
  const [showProductC, setShowProductC] = useState(false);

  const handleStartCompare = () => {
    const pA = products.find((p) => p.id === productAId) || products[0];
    const pB = products.find((p) => p.id === productBId) || products[1];
    const pC = productCId ? products.find((p) => p.id === productCId) : undefined;
    onCompare(pA, pB, pC);
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1.5px solid var(--border-default)',
        padding: '28px',
        boxShadow: 'var(--shadow-card)',
        marginBottom: '40px'
      }}
    >
      <div className="flex items-center justify-between" style={{ marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
        <div className="flex items-center gap-xs">
          <ArrowRightLeft size={20} style={{ color: '#2563EB' }} />
          <h3 className="h3" style={{ margin: 0, color: '#1A1A1A' }}>
            Build Your Custom Comparison
          </h3>
        </div>
        {!showProductC && (
          <button
            onClick={() => setShowProductC(true)}
            className="btn btn-ghost btn-sm"
            style={{ fontSize: '0.78rem', color: '#2563EB', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            <Plus size={13} />
            <span>Add 3rd Product (3-Way Compare)</span>
          </button>
        )}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: showProductC ? 'repeat(auto-fit, minmax(200px, 1fr))' : '1fr 1fr',
          gap: '16px',
          marginBottom: '20px'
        }}
      >
        {/* Product A */}
        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '6px' }}>
            Product A
          </label>
          <select
            value={productAId}
            onChange={(e) => setProductAId(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '10px',
              border: '1px solid #D1D5DB',
              backgroundColor: '#F8FAFC',
              fontSize: '0.88rem',
              fontWeight: 600,
              color: '#1A1A1A',
              outline: 'none'
            }}
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.brand}: {p.name.slice(0, 38)}...
              </option>
            ))}
          </select>
        </div>

        {/* Product B */}
        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '6px' }}>
            Product B
          </label>
          <select
            value={productBId}
            onChange={(e) => setProductBId(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '10px',
              border: '1px solid #D1D5DB',
              backgroundColor: '#F8FAFC',
              fontSize: '0.88rem',
              fontWeight: 600,
              color: '#1A1A1A',
              outline: 'none'
            }}
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.brand}: {p.name.slice(0, 38)}...
              </option>
            ))}
          </select>
        </div>

        {/* Optional Product C */}
        {showProductC && (
          <div>
            <div className="flex items-center justify-between" style={{ marginBottom: '6px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Product C (Optional)
              </label>
              <button
                onClick={() => { setShowProductC(false); setProductCId(''); }}
                style={{ fontSize: '0.7rem', color: '#DC2626', border: 'none', background: 'none', cursor: 'pointer' }}
              >
                Remove
              </button>
            </div>
            <select
              value={productCId}
              onChange={(e) => setProductCId(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '10px',
                border: '1px solid #D1D5DB',
                backgroundColor: '#F8FAFC',
                fontSize: '0.88rem',
                fontWeight: 600,
                color: '#1A1A1A',
                outline: 'none'
              }}
            >
              <option value="">Select 3rd Product...</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.brand}: {p.name.slice(0, 38)}...
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <Button
        variant="primary"
        size="lg"
        onClick={handleStartCompare}
        style={{ width: '100%', borderRadius: '10px', height: '46px' }}
        icon={<ArrowRightLeft size={16} />}
      >
        Run Side-by-Side Lab Comparison
      </Button>
    </div>
  );
};
