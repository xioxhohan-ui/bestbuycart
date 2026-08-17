import React, { useState, useEffect } from 'react';
import { GiftRule } from '../../types/gifts';
import { Product } from '../../types/product';
import { giftService } from '../../services/giftService';
import { supabaseService } from '../../services/supabaseService';
import { Split, Plus, Edit2, Trash2, X, Check, Search } from 'lucide-react';
import { Button } from '../ui/Button';

export const AdminGiftRulesManager: React.FC = () => {
  const [rules, setRules] = useState<GiftRule[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingRule, setEditingRule] = useState<GiftRule | null>(null);

  const [formData, setFormData] = useState<Partial<GiftRule>>({
    recipientSlug: 'dad',
    occasionSlug: 'birthday',
    budgetMaxUSD: 100,
    interestSlug: 'tech',
    productId: 'prod-4',
    priority: 1,
    customQuote: '',
    isActive: true
  });

  const loadData = () => {
    giftService.getRules().then(setRules);
    supabaseService.getProducts().then(setProducts);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCreate = () => {
    setIsCreating(true);
    setFormData({
      recipientSlug: 'dad',
      occasionSlug: 'birthday',
      budgetMaxUSD: 100,
      interestSlug: 'tech',
      productId: products[0]?.id || 'prod-1',
      priority: 1,
      customQuote: '',
      isActive: true
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.recipientSlug || !formData.productId) return;

    await giftService.saveRule({
      ...formData,
      id: editingRule?.id,
      recipientSlug: formData.recipientSlug,
      productId: formData.productId
    });

    setIsCreating(false);
    setEditingRule(null);
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this gift recommendation rule?')) {
      await giftService.deleteRule(id);
      loadData();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: 'var(--shadow-card)' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div className="flex items-center gap-xs">
            <Split size={20} style={{ color: '#2563EB' }} />
            <h3 className="h3" style={{ margin: 0, color: '#1A1A1A' }}>
              Curated Recommendation Rules ({rules.length} Active Rules)
            </h3>
          </div>

          <Button variant="primary" size="sm" onClick={handleOpenCreate} icon={<Plus size={14} />}>
            Create Recommendation Rule
          </Button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#4B5563', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 14px' }}>Recipient</th>
                <th style={{ padding: '10px 14px' }}>Occasion</th>
                <th style={{ padding: '10px 14px' }}>Budget Ceil</th>
                <th style={{ padding: '10px 14px' }}>Assigned Product</th>
                <th style={{ padding: '10px 14px' }}>Priority</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((rule) => {
                const prod = products.find(p => p.id === rule.productId);
                return (
                  <tr key={rule.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 700, color: '#1A1A1A', textTransform: 'capitalize' }}>
                      {rule.recipientSlug}
                    </td>
                    <td style={{ padding: '12px 14px', color: '#4B5563', textTransform: 'capitalize' }}>
                      {rule.occasionSlug.replace('-', ' ')}
                    </td>
                    <td className="font-mono" style={{ padding: '12px 14px', fontWeight: 700, color: '#059669' }}>
                      Under ${rule.budgetMaxUSD}
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ fontWeight: 600, color: '#2563EB' }}>{prod?.name || rule.productId}</div>
                      {rule.customQuote && (
                        <div style={{ fontSize: '0.72rem', color: '#6B7280', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          "{rule.customQuote}"
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ backgroundColor: '#EFF6FF', color: '#2563EB', padding: '2px 8px', borderRadius: '4px', fontWeight: 800, fontSize: '0.75rem' }}>
                        Priority #{rule.priority}
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                      <button onClick={() => handleDelete(rule.id)} className="btn btn-ghost btn-sm" style={{ color: '#DC2626', padding: '4px' }}>
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Rule Modal */}
      {(isCreating || editingRule) && (
        <div className="modal-backdrop" onClick={() => { setIsCreating(false); setEditingRule(null); }}>
          <div className="modal-content" style={{ maxWidth: '640px', backgroundColor: '#FFFFFF', borderRadius: '16px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="h3" style={{ margin: 0 }}>Create Gift Recommendation Rule</h3>
              <button onClick={() => { setIsCreating(false); setEditingRule(null); }} className="btn btn-ghost btn-sm"><X size={18} /></button>
            </div>

            <form onSubmit={handleSave} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Recipient Type</label>
                  <select
                    value={formData.recipientSlug}
                    onChange={(e) => setFormData({ ...formData, recipientSlug: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                  >
                    <option value="dad">Dad</option>
                    <option value="mom">Mom</option>
                    <option value="partner">Partner</option>
                    <option value="friend">Friend</option>
                    <option value="brother">Brother</option>
                    <option value="sister">Sister</option>
                    <option value="kids">Kids</option>
                    <option value="coworker">Coworker</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Occasion</label>
                  <select
                    value={formData.occasionSlug}
                    onChange={(e) => setFormData({ ...formData, occasionSlug: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                  >
                    <option value="birthday">Birthday</option>
                    <option value="christmas">Christmas / Holiday</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="graduation">Graduation</option>
                    <option value="valentines">Valentine's</option>
                    <option value="fathers-day">Father's Day</option>
                    <option value="mothers-day">Mother's Day</option>
                    <option value="just-because">Just Because</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Budget Ceiling ($)</label>
                  <input
                    type="number"
                    value={formData.budgetMaxUSD}
                    onChange={(e) => setFormData({ ...formData, budgetMaxUSD: Number(e.target.value) })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Priority (1 = Highest)</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: Number(e.target.value) })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Assigned Top Product *</label>
                <select
                  value={formData.productId}
                  onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (${p.priceUSD} • Worth: {p.worthScore}%)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Personalized Editorial Reason Quote</label>
                <textarea
                  rows={3}
                  placeholder="Explain why this product is ideal for this persona and occasion..."
                  value={formData.customQuote}
                  onChange={(e) => setFormData({ ...formData, customQuote: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.86rem' }}
                />
              </div>

              <div className="flex justify-end gap-sm" style={{ paddingTop: '12px', borderTop: '1px solid #E5E7EB' }}>
                <Button variant="secondary" size="md" onClick={() => { setIsCreating(false); setEditingRule(null); }}>Cancel</Button>
                <Button variant="primary" size="md" type="submit">Save Rule</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
