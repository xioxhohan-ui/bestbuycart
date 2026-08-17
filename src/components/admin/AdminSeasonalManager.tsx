import React, { useState, useEffect } from 'react';
import { SeasonalCampaign } from '../../types/deals';
import { dealService } from '../../services/dealService';
import { Gift, Plus, TrendingUp, DollarSign, MousePointer, X } from 'lucide-react';
import { Button } from '../ui/Button';

export const AdminSeasonalManager: React.FC = () => {
  const [campaigns, setCampaigns] = useState<SeasonalCampaign[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<SeasonalCampaign>>({
    name: '',
    season: 'Holiday 2026',
    headline: '',
    description: '',
    status: 'active'
  });

  const loadData = () => {
    dealService.getSeasonalCampaigns().then(setCampaigns);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    await dealService.saveSeasonalCampaign({
      ...formData,
      name: formData.name
    });
    setIsCreating(false);
    loadData();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Campaign Analytics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Campaign Clicks</span>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#2563EB', marginTop: '4px' }}>14,250</div>
          <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, marginTop: '2px' }}>↑ 22% seasonal spike</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Affiliate Conversions</span>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#059669', marginTop: '4px' }}>2,410</div>
          <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, marginTop: '2px' }}>16.9% conversion rate</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Seasonal Revenue</span>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1A1A1A', marginTop: '4px' }}>$24,500</div>
          <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, marginTop: '2px' }}>Attributed commissions</div>
        </div>
      </div>

      {/* 2. Active Campaigns Table */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: 'var(--shadow-card)' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
          <div className="flex items-center gap-xs">
            <Gift size={20} style={{ color: '#DC2626' }} />
            <h3 className="h3" style={{ margin: 0, color: '#1A1A1A' }}>
              Seasonal Deals & Holiday Guides
            </h3>
          </div>

          <Button variant="primary" size="sm" onClick={() => setIsCreating(true)} icon={<Plus size={14} />}>
            New Campaign
          </Button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#4B5563', fontSize: '0.75rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '10px 14px' }}>Campaign Name</th>
              <th style={{ padding: '10px 14px' }}>Season</th>
              <th style={{ padding: '10px 14px' }}>Deals Linked</th>
              <th style={{ padding: '10px 14px' }}>Status</th>
              <th style={{ padding: '10px 14px', textAlign: 'right' }}>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 14px', fontWeight: 700, color: '#1A1A1A' }}>{c.name}</td>
                <td style={{ padding: '12px 14px', color: '#6B7280' }}>{c.season}</td>
                <td style={{ padding: '12px 14px', color: '#2563EB', fontWeight: 600 }}>{c.dealIds.length} deals</td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{ backgroundColor: c.status === 'active' ? '#ECFDF5' : '#FFFBEB', color: c.status === 'active' ? '#059669' : '#D97706', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
                    {c.status.toUpperCase()}
                  </span>
                </td>
                <td className="font-mono" style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 800, color: '#059669' }}>
                  ${c.revenueUSD.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 3. New Campaign Modal */}
      {isCreating && (
        <div className="modal-backdrop" onClick={() => setIsCreating(false)}>
          <div className="modal-content" style={{ maxWidth: '640px', backgroundColor: '#FFFFFF', borderRadius: '16px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="h3" style={{ margin: 0 }}>Create Seasonal Campaign</h3>
              <button onClick={() => setIsCreating(false)} className="btn btn-ghost btn-sm"><X size={18} /></button>
            </div>
            <form onSubmit={handleSave} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Campaign Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Black Friday 2026 Sneak Peek"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Headline Copy</label>
                <input
                  type="text"
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Description Copy</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                />
              </div>

              <div className="flex justify-end gap-sm" style={{ paddingTop: '12px', borderTop: '1px solid #E5E7EB' }}>
                <Button variant="secondary" size="md" onClick={() => setIsCreating(false)}>Cancel</Button>
                <Button variant="primary" size="md" type="submit">Create Campaign</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
