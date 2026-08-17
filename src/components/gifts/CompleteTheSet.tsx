import React, { useState } from 'react';
import { Product } from '../../types/product';
import { AccessoryBundleItem } from '../../types/gifts';
import { giftService } from '../../services/giftService';
import { useCountry } from '../../context/CountryContext';
import { Layers, Plus, Check, ShoppingCart } from 'lucide-react';
import { Button } from '../ui/Button';

interface CompleteTheSetProps {
  product: Product;
}

export const CompleteTheSet: React.FC<CompleteTheSetProps> = ({ product }) => {
  const { formatPrice } = useCountry();
  const [accessories, setAccessories] = useState<AccessoryBundleItem[]>(() =>
    giftService.getAccessoryBundle(product)
  );
  const [isAdded, setIsAdded] = useState(false);

  const toggleItem = (id: string) => {
    setAccessories(
      accessories.map((acc) => (acc.id === id ? { ...acc, selected: !acc.selected } : acc))
    );
  };

  const selectedAccessories = accessories.filter((a) => a.selected);
  const accessoriesTotal = selectedAccessories.reduce((sum, a) => sum + a.priceUSD, 0);
  const grandTotal = product.priceUSD + accessoriesTotal;
  const bundleDiscountedTotal = grandTotal * 0.92; // 8% bundle savings

  const handleAddBundle = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 3000);
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1.5px solid var(--border-default)',
        padding: '24px',
        boxShadow: 'var(--shadow-card)',
        marginBottom: '40px'
      }}
    >
      <div className="flex items-center gap-xs" style={{ marginBottom: '6px' }}>
        <Layers size={18} style={{ color: '#2563EB' }} />
        <h4 style={{ margin: 0, fontSize: '0.96rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#1A1A1A' }}>
          Complete the Set & Save 8%
        </h4>
      </div>
      <p style={{ color: '#6B7280', fontSize: '0.84rem', margin: '0 0 20px' }}>
        Customers who researched the <strong>{product.name}</strong> frequently bundled these verified companion accessories:
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
        {/* Base Product Item */}
        <div style={{ padding: '12px', borderRadius: '12px', border: '2px solid #2563EB', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={product.image} alt={product.name} style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase' }}>This Product</div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1A1A1A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</div>
            <div className="font-mono" style={{ fontSize: '0.86rem', fontWeight: 800, color: '#1A1A1A' }}>{formatPrice(product.priceUSD)}</div>
          </div>
        </div>

        {/* Companion Accessories */}
        {accessories.map((acc) => (
          <div
            key={acc.id}
            onClick={() => toggleItem(acc.id)}
            style={{
              padding: '12px',
              borderRadius: '12px',
              border: `2px solid ${acc.selected ? '#2563EB' : '#E2E8F0'}`,
              backgroundColor: acc.selected ? '#F8FAFC' : '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.15s ease'
            }}
          >
            <input
              type="checkbox"
              checked={acc.selected}
              onChange={() => {}}
              style={{ width: '16px', height: '16px', accentColor: '#2563EB', cursor: 'pointer' }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1A1A1A', lineHeight: 1.3 }}>{acc.name}</div>
              <div className="font-mono" style={{ fontSize: '0.86rem', fontWeight: 800, color: '#059669' }}>+ {formatPrice(acc.priceUSD)}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Bundle Action Footer */}
      <div
        className="flex items-center justify-between"
        style={{
          paddingTop: '16px',
          borderTop: '1px solid #F1F5F9',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <span style={{ fontSize: '0.78rem', color: '#6B7280' }}>Bundle Price ({1 + selectedAccessories.length} items): </span>
          <span className="font-mono" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#059669', marginLeft: '6px' }}>
            {formatPrice(bundleDiscountedTotal)}
          </span>
          <span className="font-mono" style={{ fontSize: '0.85rem', color: '#9CA3AF', textDecoration: 'line-through', marginLeft: '8px' }}>
            {formatPrice(grandTotal)}
          </span>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handleAddBundle}
          icon={isAdded ? <Check size={16} /> : <ShoppingCart size={16} />}
        >
          {isAdded ? 'Bundle Saved to Cart!' : 'Bundle Selected Items'}
        </Button>
      </div>
    </div>
  );
};
