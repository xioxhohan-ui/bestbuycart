import React, { useState, useEffect } from 'react';
import { GiftRecipient, GiftOccasion, GiftBudget } from '../../types/gifts';
import { giftService } from '../../services/giftService';
import { Gift, Plus, Edit2, Trash2, Check, X, Users, Calendar } from 'lucide-react';
import { Button } from '../ui/Button';

export const AdminGiftFinderManager: React.FC = () => {
  const [recipients, setRecipients] = useState<GiftRecipient[]>([]);
  const [occasions, setOccasions] = useState<GiftOccasion[]>([]);
  const [budgets, setBudgets] = useState<GiftBudget[]>([]);

  const [isAddingRecipient, setIsAddingRecipient] = useState(false);
  const [newRecipientName, setNewRecipientName] = useState('');

  const loadData = () => {
    giftService.getRecipients().then(setRecipients);
    giftService.getOccasions().then(setOccasions);
    giftService.getBudgets().then(setBudgets);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddRecipient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecipientName) return;
    const newR: GiftRecipient = {
      id: 'rec-' + Date.now(),
      name: newRecipientName,
      slug: newRecipientName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      iconName: 'User',
      description: `Gifts tailored for ${newRecipientName}`,
      ageRanges: ['18-24', '25-34', '35-50'],
      isActive: true,
      displayOrder: recipients.length + 1,
      productCount: 110
    };
    setRecipients([...recipients, newR]);
    setNewRecipientName('');
    setIsAddingRecipient(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Recipient Personas Management */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: 'var(--shadow-card)' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
          <div className="flex items-center gap-xs">
            <Users size={20} style={{ color: '#2563EB' }} />
            <h3 className="h3" style={{ margin: 0, color: '#1A1A1A' }}>
              Gift Recipient Types ({recipients.length})
            </h3>
          </div>
          <Button variant="primary" size="sm" onClick={() => setIsAddingRecipient(true)} icon={<Plus size={14} />}>
            Add Recipient Type
          </Button>
        </div>

        {isAddingRecipient && (
          <form onSubmit={handleAddRecipient} style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '12px', marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Recipient name (e.g. Boss, Gamer Friend)..."
              value={newRecipientName}
              onChange={(e) => setNewRecipientName(e.target.value)}
              style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.86rem' }}
            />
            <Button type="submit" variant="primary" size="sm">Save</Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsAddingRecipient(false)}>Cancel</Button>
          </form>
        )}

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#4B5563', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 14px' }}>Recipient Name</th>
                <th style={{ padding: '10px 14px' }}>Slug</th>
                <th style={{ padding: '10px 14px' }}>Age Groups</th>
                <th style={{ padding: '10px 14px' }}>Active Products</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recipients.map((r) => (
                <tr key={r.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#1A1A1A' }}>{r.name}</td>
                  <td style={{ padding: '12px 14px', color: '#6B7280', fontFamily: 'monospace' }}>{r.slug}</td>
                  <td style={{ padding: '12px 14px', color: '#4B5563' }}>{r.ageRanges.join(', ')}</td>
                  <td style={{ padding: '12px 14px', color: '#2563EB', fontWeight: 600 }}>{r.productCount} products</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                    <span style={{ backgroundColor: '#ECFDF5', color: '#059669', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
                      ACTIVE
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Occasions Management */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: 'var(--shadow-card)' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
          <div className="flex items-center gap-xs">
            <Calendar size={20} style={{ color: '#059669' }} />
            <h3 className="h3" style={{ margin: 0, color: '#1A1A1A' }}>
              Gift Occasion Events ({occasions.length})
            </h3>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#4B5563', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 14px' }}>Occasion</th>
                <th style={{ padding: '10px 14px' }}>Slug</th>
                <th style={{ padding: '10px 14px' }}>Season</th>
                <th style={{ padding: '10px 14px' }}>Curated Products</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {occasions.map((o) => (
                <tr key={o.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#1A1A1A' }}>{o.name}</td>
                  <td style={{ padding: '12px 14px', color: '#6B7280', fontFamily: 'monospace' }}>{o.slug}</td>
                  <td style={{ padding: '12px 14px', color: '#4B5563' }}>{o.season || 'All Year'}</td>
                  <td style={{ padding: '12px 14px', color: '#2563EB', fontWeight: 600 }}>{o.productCount} items</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                    <span style={{ backgroundColor: '#ECFDF5', color: '#059669', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
                      ACTIVE
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Budget Ranges */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: 'var(--shadow-card)' }}>
        <h4 style={{ margin: '0 0 16px', fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#1A1A1A' }}>
          Configured Budget Brackets
        </h4>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {budgets.map((b) => (
            <div key={b.id} style={{ padding: '10px 16px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', fontSize: '0.86rem', fontWeight: 700, color: '#1A1A1A' }}>
              {b.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
