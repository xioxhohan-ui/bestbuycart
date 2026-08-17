import React, { useState } from 'react';
import { SEED_RETAILERS } from '../../data/seedRetailers';
import { Link2, Store, Check, ExternalLink, Percent, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';

export const AdminAffiliateManager: React.FC = () => {
  const [retailers, setRetailers] = useState(SEED_RETAILERS);

  return (
    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: 'var(--shadow-card)' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
        <div className="flex items-center gap-xs">
          <Link2 size={20} style={{ color: '#2563EB' }} />
          <h3 className="h3" style={{ margin: 0, color: '#1A1A1A' }}>
            Affiliate Retailer & Tracking Link Management
          </h3>
        </div>
        <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>
          Configures verified retailer destination parameters and affiliate tags
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {retailers.map((r) => (
          <div
            key={r.id}
            style={{
              padding: '18px',
              borderRadius: '12px',
              border: '1px solid #E5E7EB',
              backgroundColor: '#F8FAFC'
            }}
          >
            <div className="flex items-center justify-between" style={{ marginBottom: '8px' }}>
              <div className="flex items-center gap-xs">
                <Store size={18} style={{ color: '#2563EB' }} />
                <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#1A1A1A' }}>{r.name}</span>
              </div>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#059669', backgroundColor: '#ECFDF5', padding: '2px 8px', borderRadius: '4px' }}>
                Active
              </span>
            </div>

            <div style={{ fontSize: '0.8rem', color: '#4B5563', marginBottom: '12px' }}>
              Website: <code>{r.website}</code>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.75rem', color: '#6B7280' }}>
              <div>Tracking Tag: <code>bestbuycart-20</code></div>
              <div>Available in: {r.supportedCountries.join(', ')}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
