import React, { useState, useEffect } from 'react';
import { Product } from '../../types/product';
import { supabaseService } from '../../services/supabaseService';
import { Gem, AlertTriangle, Check, ArrowRightLeft, ShieldCheck, Flame, Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';

export const AdminDiscoveryManager: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [hiddenGems, setHiddenGems] = useState<Product[]>([]);
  const [overhypedProducts, setOverhypedProducts] = useState<Product[]>([]);
  const [selectedProductForGem, setSelectedProductForGem] = useState('');
  const [selectedProductForOverhyped, setSelectedProductForOverhyped] = useState('');

  const loadData = () => {
    supabaseService.getProducts().then((products) => {
      setAllProducts(products);
      setHiddenGems(products.filter((p) => p.isHiddenGem));
      setOverhypedProducts(products.filter((p) => p.isOverhyped));
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleHiddenGem = async (product: Product, isGem: boolean) => {
    await supabaseService.saveProduct({ ...product, isHiddenGem: isGem });
    loadData();
  };

  const handleToggleOverhyped = async (product: Product, isOverhyped: boolean) => {
    await supabaseService.saveProduct({ ...product, isOverhyped: isOverhyped });
    loadData();
  };

  const handleAddGem = async () => {
    const product = allProducts.find((p) => p.id === selectedProductForGem);
    if (product) {
      await supabaseService.saveProduct({ ...product, isHiddenGem: true });
      setSelectedProductForGem('');
      loadData();
    }
  };

  const handleAddOverhyped = async () => {
    const product = allProducts.find((p) => p.id === selectedProductForOverhyped);
    if (product) {
      await supabaseService.saveProduct({
        ...product,
        isOverhyped: true,
        overhypedReason: 'High viral marketing budget, but inferior durability and component reliability.'
      });
      setSelectedProductForOverhyped('');
      loadData();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
      {/* 1. Hidden Gems Section */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: 'var(--shadow-card)' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: '16px' }}>
          <div className="flex items-center gap-xs">
            <Gem size={20} style={{ color: '#9333EA' }} />
            <h3 className="h3" style={{ margin: 0, color: '#1A1A1A' }}>
              Hidden Gems Engine (High Worth &gt; 90%, Low Noise)
            </h3>
          </div>
          <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>
            {hiddenGems.length} items active in `/discover/hidden-gems`
          </span>
        </div>

        {/* Add Product to Hidden Gems */}
        <div className="flex items-center gap-sm" style={{ marginBottom: '20px' }}>
          <select
            value={selectedProductForGem}
            onChange={(e) => setSelectedProductForGem(e.target.value)}
            style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.88rem', backgroundColor: '#FFFFFF' }}
          >
            <option value="">Select a product to promote to Hidden Gems...</option>
            {allProducts
              .filter((p) => !p.isHiddenGem)
              .map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (Worth: {p.worthScore}%, Hype: {p.hypeScore}%)
                </option>
              ))}
          </select>
          <Button variant="primary" size="md" onClick={handleAddGem} disabled={!selectedProductForGem} style={{ backgroundColor: '#9333EA' }}>
            <Plus size={15} /> Add to Gems
          </Button>
        </div>

        {/* Gems List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {hiddenGems.map((gem) => (
            <div
              key={gem.id}
              className="flex items-center justify-between"
              style={{ padding: '12px 16px', borderRadius: '10px', backgroundColor: '#FAF5FF', border: '1px solid #E9D5FF' }}
            >
              <div className="flex items-center gap-sm">
                <img src={gem.image} alt={gem.name} style={{ width: '36px', height: '36px', objectFit: 'contain', borderRadius: '6px' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1A1A1A' }}>{gem.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#9333EA', fontWeight: 600 }}>Worth: {gem.worthScore}% • Hype: {gem.hypeScore}%</div>
                </div>
              </div>

              <button
                onClick={() => handleToggleHiddenGem(gem, false)}
                className="btn btn-ghost btn-sm"
                style={{ color: '#DC2626', fontSize: '0.78rem' }}
              >
                <Trash2 size={14} /> Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Overhyped Watch Section */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: 'var(--shadow-card)' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: '16px' }}>
          <div className="flex items-center gap-xs">
            <AlertTriangle size={20} style={{ color: '#DC2626' }} />
            <h3 className="h3" style={{ margin: 0, color: '#1A1A1A' }}>
              Overhyped Watch (Value Gap Warnings)
            </h3>
          </div>
          <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>
            {overhypedProducts.length} items flagged in `/discover/overhyped`
          </span>
        </div>

        {/* Add Product to Overhyped */}
        <div className="flex items-center gap-sm" style={{ marginBottom: '20px' }}>
          <select
            value={selectedProductForOverhyped}
            onChange={(e) => setSelectedProductForOverhyped(e.target.value)}
            style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.88rem', backgroundColor: '#FFFFFF' }}
          >
            <option value="">Select a viral product to flag in Overhyped Watch...</option>
            {allProducts
              .filter((p) => !p.isOverhyped)
              .map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (Hype: {p.hypeScore}%, Worth: {p.worthScore}%)
                </option>
              ))}
          </select>
          <Button variant="primary" size="md" onClick={handleAddOverhyped} disabled={!selectedProductForOverhyped} style={{ backgroundColor: '#DC2626' }}>
            <Plus size={15} /> Flag Item
          </Button>
        </div>

        {/* Overhyped List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {overhypedProducts.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between"
              style={{ padding: '12px 16px', borderRadius: '10px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA' }}
            >
              <div className="flex items-center gap-sm">
                <img src={item.image} alt={item.name} style={{ width: '36px', height: '36px', objectFit: 'contain', borderRadius: '6px' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1A1A1A' }}>{item.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#DC2626', fontWeight: 600 }}>
                    Reason: {item.overhypedReason || 'Value gap detected'}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleToggleOverhyped(item, false)}
                className="btn btn-ghost btn-sm"
                style={{ color: '#6B7280', fontSize: '0.78rem' }}
              >
                <Trash2 size={14} /> Clear Flag
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
