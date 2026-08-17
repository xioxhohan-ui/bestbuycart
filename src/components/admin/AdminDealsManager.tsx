import React, { useState, useEffect } from 'react';
import { Deal } from '../../types/deals';
import { Product } from '../../types/product';
import { dealService } from '../../services/dealService';
import { supabaseService } from '../../services/supabaseService';
import { Tag, Plus, Edit2, Trash2, ExternalLink, Clock, DollarSign, TrendingDown, X, Check } from 'lucide-react';
import { Button } from '../ui/Button';

export const AdminDealsManager: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [formData, setFormData] = useState<Partial<Deal>>({
    productName: '',
    productId: '',
    brand: '',
    category: 'tech',
    dealType: 'price_drop',
    originalPriceUSD: 199,
    dealPriceUSD: 149,
    retailerName: 'Amazon',
    retailerUrl: 'https://amazon.com',
    showCountdown: true,
    status: 'active'
  });

  const loadData = () => {
    dealService.getDeals().then(setDeals);
    supabaseService.getProducts().then(setProducts);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCreate = () => {
    setIsCreatingNew(true);
    const p = products[0];
    setFormData({
      productId: p?.id || '',
      productName: p?.name || 'New Deal Product',
      brand: p?.brand || 'Generic',
      category: p?.category || 'tech',
      image: p?.image || '',
      dealType: 'price_drop',
      originalPriceUSD: p?.priceUSD ? Math.round(p.priceUSD * 1.25) : 199,
      dealPriceUSD: p?.priceUSD || 149,
      retailerName: 'Amazon',
      retailerUrl: 'https://amazon.com',
      showCountdown: true,
      status: 'active'
    });
  };

  const handleOpenEdit = (deal: Deal) => {
    setEditingDeal(deal);
    setFormData(deal);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.productName || !formData.dealPriceUSD) return;

    await dealService.saveDeal({
      ...formData,
      id: editingDeal?.id,
      productName: formData.productName,
      dealPriceUSD: Number(formData.dealPriceUSD),
      originalPriceUSD: Number(formData.originalPriceUSD)
    });

    setIsCreatingNew(false);
    setEditingDeal(null);
    loadData();
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Delete deal for "${name}"?`)) {
      await dealService.deleteDeal(id);
      loadData();
    }
  };

  const filtered = deals.filter((d) => {
    const matchesSearch = d.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* 1. Quick Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px'
        }}
      >
        <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Active Deals</span>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#059669', marginTop: '4px' }}>
            {deals.filter(d => d.status === 'active').length + 42}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, marginTop: '2px' }}>Verified lowest price</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Expiring in 24h</span>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#DC2626', marginTop: '4px' }}>
            8
          </div>
          <div style={{ fontSize: '0.72rem', color: '#DC2626', fontWeight: 700, marginTop: '2px' }}>Urgent flash promotions</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Total Deal Clicks</span>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#2563EB', marginTop: '4px' }}>
            12,450
          </div>
          <div style={{ fontSize: '0.72rem', color: '#2563EB', fontWeight: 700, marginTop: '2px' }}>High buying intent</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Affiliate Deal Rev</span>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1A1A1A', marginTop: '4px' }}>
            $4,230.50
          </div>
          <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, marginTop: '2px' }}>↑ 18.2% conversion rate</div>
        </div>
      </div>

      {/* 2. Deals Data Table */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: 'var(--shadow-card)' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div className="flex items-center gap-xs">
            <Tag size={20} style={{ color: '#059669' }} />
            <h3 className="h3" style={{ margin: 0, color: '#1A1A1A' }}>
              Promotional Deals Inventory ({deals.length})
            </h3>
          </div>

          <div className="flex items-center gap-sm">
            <input
              type="text"
              placeholder="Search deals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.82rem' }}
            />
            <Button variant="primary" size="sm" onClick={handleOpenCreate} icon={<Plus size={14} />}>
              Create New Deal
            </Button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#4B5563', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 14px' }}>Product</th>
                <th style={{ padding: '10px 14px' }}>Retailer</th>
                <th style={{ padding: '10px 14px' }}>Original</th>
                <th style={{ padding: '10px 14px' }}>Deal Price</th>
                <th style={{ padding: '10px 14px' }}>Discount</th>
                <th style={{ padding: '10px 14px' }}>Status</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ fontWeight: 700, color: '#1A1A1A' }}>{d.productName.slice(0, 38)}...</div>
                    <div style={{ fontSize: '0.72rem', color: '#6B7280' }}>Type: {d.dealType}</div>
                  </td>
                  <td style={{ padding: '12px 14px', color: '#4B5563' }}>{d.retailerName}</td>
                  <td className="font-mono" style={{ padding: '12px 14px', color: '#9CA3AF', textDecoration: 'line-through' }}>
                    ${d.originalPriceUSD.toFixed(2)}
                  </td>
                  <td className="font-mono" style={{ padding: '12px 14px', fontWeight: 800, color: '#059669' }}>
                    ${d.dealPriceUSD.toFixed(2)}
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ backgroundColor: '#ECFDF5', color: '#059669', padding: '2px 8px', borderRadius: '4px', fontWeight: 800, fontSize: '0.78rem' }}>
                      ↓ {d.discountPercent}%
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ backgroundColor: d.status === 'active' ? '#EFF6FF' : '#FEF2F2', color: d.status === 'active' ? '#2563EB' : '#DC2626', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>
                      {d.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                    <div className="flex items-center justify-end gap-xs">
                      <button onClick={() => handleOpenEdit(d)} className="btn btn-ghost btn-sm" style={{ color: '#4B5563', padding: '4px' }}>
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete(d.id, d.productName)} className="btn btn-ghost btn-sm" style={{ color: '#DC2626', padding: '4px' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Add / Edit Deal Modal */}
      {(isCreatingNew || editingDeal) && (
        <div className="modal-backdrop" onClick={() => { setIsCreatingNew(false); setEditingDeal(null); }}>
          <div className="modal-content" style={{ maxWidth: '720px', backgroundColor: '#FFFFFF', borderRadius: '16px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="h3" style={{ margin: 0 }}>
                {editingDeal ? 'Edit Promotional Deal' : 'Create New Deal'}
              </h3>
              <button onClick={() => { setIsCreatingNew(false); setEditingDeal(null); }} className="btn btn-ghost btn-sm">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Product Name *</label>
                <input
                  type="text"
                  required
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Deal Type</label>
                  <select
                    value={formData.dealType}
                    onChange={(e) => setFormData({ ...formData, dealType: e.target.value as any })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                  >
                    <option value="price_drop">Price Drop</option>
                    <option value="flash_sale">Flash Sale</option>
                    <option value="seasonal">Seasonal Discount</option>
                    <option value="clearance">Clearance</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Original Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.originalPriceUSD}
                    onChange={(e) => setFormData({ ...formData, originalPriceUSD: Number(e.target.value) })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Deal Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.dealPriceUSD}
                    onChange={(e) => setFormData({ ...formData, dealPriceUSD: Number(e.target.value) })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Retailer Name</label>
                  <input
                    type="text"
                    value={formData.retailerName}
                    onChange={(e) => setFormData({ ...formData, retailerName: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Retailer Destination URL</label>
                  <input
                    type="url"
                    value={formData.retailerUrl}
                    onChange={(e) => setFormData({ ...formData, retailerUrl: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-xl" style={{ paddingTop: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.showCountdown}
                    onChange={(e) => setFormData({ ...formData, showCountdown: e.target.checked })}
                    style={{ width: '16px', height: '16px', accentColor: '#2563EB' }}
                  />
                  <span>Show Ticking Countdown Timer on Public Store</span>
                </label>
              </div>

              <div className="flex justify-end gap-sm" style={{ paddingTop: '16px', borderTop: '1px solid #E5E7EB' }}>
                <Button variant="secondary" size="md" onClick={() => { setIsCreatingNew(false); setEditingDeal(null); }}>
                  Cancel
                </Button>
                <Button variant="primary" size="md" type="submit">
                  Save Promotional Deal
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
