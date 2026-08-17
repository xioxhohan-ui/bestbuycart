import React, { useState, useEffect } from 'react';
import { Product } from '../../types/product';
import { Category } from '../../types/category';
import { supabaseService } from '../../services/supabaseService';
import { X, Check, Trash2, Plus, UploadCloud, Flame, ShieldCheck, Tag, Gem, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';

interface AdminProductFormModalProps {
  product?: Product | null;
  categories: Category[];
  allProducts: Product[];
  onClose: () => void;
  onSaved: (savedProduct: Product) => void;
}

export const AdminProductFormModal: React.FC<AdminProductFormModalProps> = ({
  product,
  categories,
  allProducts,
  onClose,
  onSaved
}) => {
  const isEditing = !!product;

  const [formData, setFormData] = useState<Partial<Product>>({
    name: product?.name || '',
    slug: product?.slug || '',
    brand: product?.brand || 'Sony',
    category: product?.category || 'tech',
    subcategoryId: product?.subcategoryId || 'headphones',
    priceUSD: product?.priceUSD || 99,
    rating: product?.rating || 4.8,
    reviewCount: product?.reviewCount || 1200,
    hypeScore: product?.hypeScore || 85,
    worthScore: product?.worthScore || 90,
    verdict: product?.verdict || '',
    summary: product?.summary || '',
    image: product?.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    inStock: product?.inStock !== false,
    isHiddenGem: product?.isHiddenGem || false,
    isOverhyped: product?.isOverhyped || false,
    overhypedReason: product?.overhypedReason || '',
    editorialQuote: product?.editorialQuote || '',
    pros: product?.pros || ['High build quality', 'Reliable performance'],
    cons: product?.cons || ['Premium price point'],
    specs: product?.specs || [
      { name: 'Connectivity', value: 'Bluetooth 5.3' },
      { name: 'Warranty', value: '1 Year Manufacturer' }
    ]
  });

  const activeCategory = categories.find((c) => c.slug === formData.category);

  const handleNameChange = (name: string) => {
    const autoSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setFormData((prev) => ({
      ...prev,
      name,
      slug: isEditing ? prev.slug : autoSlug
    }));
  };

  const handleSpecChange = (index: number, field: 'name' | 'value', val: string) => {
    const updated = [...(formData.specs || [])];
    updated[index] = { ...updated[index], [field]: val };
    setFormData({ ...formData, specs: updated });
  };

  const handleAddSpec = () => {
    setFormData({
      ...formData,
      specs: [...(formData.specs || []), { name: 'Feature', value: 'Detail' }]
    });
  };

  const handleRemoveSpec = (index: number) => {
    setFormData({
      ...formData,
      specs: (formData.specs || []).filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.category) return;
    const saved = await supabaseService.saveProduct({
      ...formData,
      id: product?.id,
      name: formData.name,
      category: formData.category
    });
    onSaved(saved);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        style={{
          maxWidth: '840px',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div>
            <h3 className="h3" style={{ margin: 0, color: '#1A1A1A' }}>
              {isEditing ? 'Edit Product: ' + product.name : 'Add New Product to Database'}
            </h3>
            <span style={{ fontSize: '0.78rem', color: '#6B7280' }}>
              Changes will instantly update public discovery feeds and algorithms.
            </span>
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-sm">
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Section 1: General Info */}
          <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <h4 style={{ margin: '0 0 12px', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: '#2563EB' }}>
              1. General Information
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Slug (URL key)</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Brand</label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.88rem', backgroundColor: '#FFFFFF' }}
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Pricing & Scores */}
          <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <h4 style={{ margin: '0 0 12px', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: '#059669' }}>
              2. Pricing, Scores & Verdict
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Price (USD $)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.priceUSD}
                  onChange={(e) => setFormData({ ...formData, priceUSD: Number(e.target.value) })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Hype Score (0-100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.hypeScore}
                  onChange={(e) => setFormData({ ...formData, hypeScore: Number(e.target.value) })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Worth Score (0-100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.worthScore}
                  onChange={(e) => setFormData({ ...formData, worthScore: Number(e.target.value) })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Rating (0-5.0)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Verdict Summary</label>
              <input
                type="text"
                value={formData.verdict}
                onChange={(e) => setFormData({ ...formData, verdict: e.target.value })}
                placeholder="e.g. Best overall noise cancellation and travel ergonomics"
                style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
              />
            </div>
          </div>

          {/* Section 3: Media & Discovery Flags */}
          <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <h4 style={{ margin: '0 0 12px', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: '#9333EA' }}>
              3. Image URL & Discovery Engine Flags
            </h4>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Product Image URL</label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
              />
            </div>

            <div className="flex items-center gap-xl" style={{ marginBottom: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', color: '#9333EA' }}>
                <input
                  type="checkbox"
                  checked={formData.isHiddenGem}
                  onChange={(e) => setFormData({ ...formData, isHiddenGem: e.target.checked })}
                  style={{ width: '16px', height: '16px', accentColor: '#9333EA' }}
                />
                <span className="flex items-center gap-xs"><Gem size={14} /> Feature in Hidden Gems</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', color: '#DC2626' }}>
                <input
                  type="checkbox"
                  checked={formData.isOverhyped}
                  onChange={(e) => setFormData({ ...formData, isOverhyped: e.target.checked })}
                  style={{ width: '16px', height: '16px', accentColor: '#DC2626' }}
                />
                <span className="flex items-center gap-xs"><AlertTriangle size={14} /> Flag in Overhyped Watch</span>
              </label>
            </div>

            {formData.isOverhyped && (
              <div style={{ marginTop: '8px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#DC2626', display: 'block', marginBottom: '4px' }}>Overhyped Caution Reason</label>
                <input
                  type="text"
                  value={formData.overhypedReason}
                  onChange={(e) => setFormData({ ...formData, overhypedReason: e.target.value })}
                  placeholder="e.g. Low CADR filtration rate with expensive filter replacements"
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #FECACA', backgroundColor: '#FEF2F2', fontSize: '0.88rem' }}
                />
              </div>
            )}
          </div>

          {/* Section 4: Specifications */}
          <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: '10px' }}>
              <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: '#4B5563' }}>
                4. Key-Value Specifications
              </h4>
              <button type="button" onClick={handleAddSpec} className="btn btn-secondary btn-sm" style={{ padding: '4px 8px', fontSize: '0.75rem' }}>
                <Plus size={12} /> Add Spec
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {(formData.specs || []).map((spec, i) => (
                <div key={i} className="flex items-center gap-sm">
                  <input
                    type="text"
                    value={spec.name}
                    onChange={(e) => handleSpecChange(i, 'name', e.target.value)}
                    placeholder="Spec Name"
                    style={{ flex: 1, padding: '6px 8px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.82rem' }}
                  />
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) => handleSpecChange(i, 'value', e.target.value)}
                    placeholder="Spec Value"
                    style={{ flex: 2, padding: '6px 8px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.82rem' }}
                  />
                  <button type="button" onClick={() => handleRemoveSpec(i)} style={{ color: '#EF4444', padding: '4px', cursor: 'pointer' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-sm" style={{ paddingTop: '12px', borderTop: '1px solid #E5E7EB' }}>
            <Button variant="secondary" size="md" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="md" type="submit">
              {isEditing ? 'Save Changes' : 'Create Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
