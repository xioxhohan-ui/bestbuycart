import React, { useState, useEffect } from 'react';
import { ProductComparison, ComparisonSEO } from '../../types/comparison';
import { Product } from '../../types/product';
import { comparisonService } from '../../services/comparisonService';
import { supabaseService } from '../../services/supabaseService';
import { AdminSEOManagerModal } from './AdminSEOManagerModal';
import { ArrowRightLeft, Plus, Edit2, Globe, Trash2, Trophy, Eye, Search, X } from 'lucide-react';
import { Button } from '../ui/Button';

export const AdminComparisonManager: React.FC = () => {
  const [comparisons, setComparisons] = useState<ProductComparison[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [editingComparison, setEditingComparison] = useState<ProductComparison | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [seoTargetComparison, setSeoTargetComparison] = useState<ProductComparison | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<ProductComparison>>({
    title: '',
    type: 'pvp',
    productAId: '',
    productBId: '',
    category: 'tech',
    winnerId: '',
    verdictText: '',
    whyWinner: '',
    whenToChooseB: ''
  });

  const loadData = () => {
    comparisonService.getComparisons().then(setComparisons);
    supabaseService.getProducts().then(setAllProducts);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCreate = () => {
    setIsCreatingNew(true);
    setFormData({
      title: '',
      type: 'pvp',
      productAId: allProducts[0]?.id || '',
      productBId: allProducts[1]?.id || '',
      category: 'tech',
      winnerId: allProducts[0]?.id || '',
      verdictText: 'Superior overall balance of price, battery, and lab performance.',
      whyWinner: 'Higher verified worth score and more dependable durability.',
      whenToChooseB: 'Choose Product B if you prefer specialized hardware features.'
    });
  };

  const handleOpenEdit = (comp: ProductComparison) => {
    setEditingComparison(comp);
    setFormData(comp);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const pA = allProducts.find((p) => p.id === formData.productAId) || allProducts[0];
    const pB = allProducts.find((p) => p.id === formData.productBId) || allProducts[1];
    const title = formData.title || `${pA?.name.slice(0, 20)} vs ${pB?.name.slice(0, 20)}`;

    await comparisonService.saveComparison({
      ...formData,
      id: editingComparison?.id,
      title,
      productAId: pA.id,
      productBId: pB.id,
      winnerId: formData.winnerId || pA.id
    });

    setIsCreatingNew(false);
    setEditingComparison(null);
    loadData();
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Delete comparison "${title}"?`)) {
      await comparisonService.deleteComparison(id);
      loadData();
    }
  };

  const handleSaveSEO = async (updatedSEO: ComparisonSEO) => {
    if (seoTargetComparison) {
      await comparisonService.saveComparison({
        ...seoTargetComparison,
        seo: updatedSEO,
        title: seoTargetComparison.title
      });
      setSeoTargetComparison(null);
      loadData();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Action Bar */}
      <div className="flex items-center justify-between" style={{ flexWrap: 'wrap', gap: '12px' }}>
        <div className="flex items-center gap-xs">
          <ArrowRightLeft size={22} style={{ color: '#2563EB' }} />
          <h3 className="h3" style={{ margin: 0, color: '#1A1A1A' }}>
            Comparison Engine CMS ({comparisons.length} Matchups)
          </h3>
        </div>

        <Button variant="primary" size="md" onClick={handleOpenCreate} icon={<Plus size={15} />}>
          Create New Comparison
        </Button>
      </div>

      {/* Comparisons Table */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#4B5563', fontSize: '0.75rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '12px 16px' }}>Type</th>
              <th style={{ padding: '12px 16px' }}>Products Compared</th>
              <th style={{ padding: '12px 16px' }}>Views</th>
              <th style={{ padding: '12px 16px' }}>SEO Score</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {comparisons.map((comp) => (
              <tr key={comp.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ backgroundColor: '#EFF6FF', color: '#2563EB', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase' }}>
                    {comp.type}
                  </span>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ fontWeight: 700, color: '#1A1A1A' }}>{comp.title}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Slug: /compare/{comp.slug}</div>
                </td>
                <td className="font-mono" style={{ padding: '12px 16px', color: '#4B5563' }}>
                  {comp.views.toLocaleString()}
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ backgroundColor: '#ECFDF5', color: '#059669', padding: '2px 8px', borderRadius: '6px', fontWeight: 800, fontSize: '0.78rem' }}>
                    {comp.seo?.seoScore || 90}/100
                  </span>
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                  <div className="flex items-center justify-end gap-xs">
                    <button
                      onClick={() => setSeoTargetComparison(comp)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '4px 8px', fontSize: '0.75rem', color: '#2563EB', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      title="Manage SEO & Schemas"
                    >
                      <Globe size={13} />
                      <span>SEO</span>
                    </button>

                    <button
                      onClick={() => handleOpenEdit(comp)}
                      className="btn btn-ghost btn-sm"
                      style={{ color: '#4B5563', padding: '4px' }}
                      title="Edit Comparison"
                    >
                      <Edit2 size={15} />
                    </button>

                    <button
                      onClick={() => handleDelete(comp.id, comp.title)}
                      className="btn btn-ghost btn-sm"
                      style={{ color: '#DC2626', padding: '4px' }}
                      title="Delete Comparison"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Comparison Modal */}
      {(isCreatingNew || editingComparison) && (
        <div className="modal-backdrop" onClick={() => { setIsCreatingNew(false); setEditingComparison(null); }}>
          <div className="modal-content" style={{ maxWidth: '780px', backgroundColor: '#FFFFFF', borderRadius: '16px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="h3" style={{ margin: 0 }}>
                {editingComparison ? 'Edit Comparison' : 'Create New Comparison'}
              </h3>
              <button onClick={() => { setIsCreatingNew(false); setEditingComparison(null); }} className="btn btn-ghost btn-sm">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Comparison Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Sony WH-1000XM5 vs Bose QC Ultra"
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Select Product A</label>
                  <select
                    value={formData.productAId}
                    onChange={(e) => setFormData({ ...formData, productAId: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                  >
                    {allProducts.map((p) => (
                      <option key={p.id} value={p.id}>{p.brand}: {p.name.slice(0, 32)}...</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Select Product B</label>
                  <select
                    value={formData.productBId}
                    onChange={(e) => setFormData({ ...formData, productBId: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                  >
                    {allProducts.map((p) => (
                      <option key={p.id} value={p.id}>{p.brand}: {p.name.slice(0, 32)}...</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Final Verdict Summary Text</label>
                <textarea
                  rows={2}
                  value={formData.verdictText}
                  onChange={(e) => setFormData({ ...formData, verdictText: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>When to choose Product B instead</label>
                <input
                  type="text"
                  value={formData.whenToChooseB}
                  onChange={(e) => setFormData({ ...formData, whenToChooseB: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                />
              </div>

              <div className="flex justify-end gap-sm" style={{ paddingTop: '12px', borderTop: '1px solid #E5E7EB' }}>
                <Button variant="secondary" size="md" onClick={() => { setIsCreatingNew(false); setEditingComparison(null); }}>
                  Cancel
                </Button>
                <Button variant="primary" size="md" type="submit">
                  Save Comparison
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SEO Manager Modal */}
      {seoTargetComparison && (
        <AdminSEOManagerModal
          comparison={seoTargetComparison}
          onClose={() => setSeoTargetComparison(null)}
          onSaved={handleSaveSEO}
        />
      )}
    </div>
  );
};
