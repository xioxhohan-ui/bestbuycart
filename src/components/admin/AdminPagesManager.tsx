import React, { useState, useEffect } from 'react';
import { SitePage } from '../../types/admin';
import { supabaseService } from '../../services/supabaseService';
import { FileText, Plus, Edit2, Trash2, CheckCircle2, Search, X } from 'lucide-react';
import { Button } from '../ui/Button';

export const AdminPagesManager: React.FC = () => {
  const [pages, setPages] = useState<SitePage[]>([]);
  const [editingPage, setEditingPage] = useState<SitePage | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState<Partial<SitePage>>({
    title: '',
    slug: '',
    content: '',
    metaTitle: '',
    metaDescription: '',
    focusKeyword: '',
    status: 'published',
    showInNavigation: false,
    indexable: true
  });

  const loadPages = () => {
    supabaseService.getPages().then(setPages);
  };

  useEffect(() => {
    loadPages();
  }, []);

  const handleOpenEdit = (page: SitePage) => {
    setEditingPage(page);
    setFormData(page);
  };

  const handleOpenCreate = () => {
    setIsCreating(true);
    setFormData({
      title: '',
      slug: '',
      content: '',
      metaTitle: '',
      metaDescription: '',
      focusKeyword: '',
      status: 'published',
      showInNavigation: false,
      indexable: true
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;
    await supabaseService.savePage({
      ...formData,
      id: editingPage?.id,
      title: formData.title
    });
    setEditingPage(null);
    setIsCreating(false);
    loadPages();
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Delete page "${title}"?`)) {
      await supabaseService.deletePage(id);
      loadPages();
    }
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: 'var(--shadow-card)' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
        <div className="flex items-center gap-xs">
          <FileText size={20} style={{ color: '#2563EB' }} />
          <h3 className="h3" style={{ margin: 0, color: '#1A1A1A' }}>
            Pages & SEO Content Management
          </h3>
        </div>
        <Button variant="primary" size="md" onClick={handleOpenCreate} icon={<Plus size={15} />}>
          Add New Page
        </Button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#4B5563', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '12px 16px' }}>Page Title</th>
              <th style={{ padding: '12px 16px' }}>Slug</th>
              <th style={{ padding: '12px 16px' }}>Focus Keyword</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
              <th style={{ padding: '12px 16px' }}>SEO Indexable</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 16px', fontWeight: 700, color: '#1A1A1A' }}>{page.title}</td>
                <td style={{ padding: '12px 16px', color: '#6B7280' }}>/{page.slug}</td>
                <td style={{ padding: '12px 16px', color: '#2563EB' }}>{page.focusKeyword || '—'}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ backgroundColor: page.status === 'published' ? '#ECFDF5' : '#F3F4F6', color: page.status === 'published' ? '#059669' : '#6B7280', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>
                    {page.status}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', color: page.indexable ? '#059669' : '#DC2626', fontWeight: 600 }}>
                  {page.indexable ? 'Index (Yes)' : 'No-Index'}
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                  <div className="flex items-center justify-end gap-xs">
                    <button onClick={() => handleOpenEdit(page)} className="btn btn-ghost btn-sm" style={{ color: '#2563EB', padding: '4px' }}>
                      <Edit2 size={15} />
                    </button>
                    <button onClick={() => handleDelete(page.id, page.title)} className="btn btn-ghost btn-sm" style={{ color: '#DC2626', padding: '4px' }}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      {(isCreating || editingPage) && (
        <div className="modal-backdrop" onClick={() => { setIsCreating(false); setEditingPage(null); }}>
          <div className="modal-content" style={{ maxWidth: '680px', backgroundColor: '#FFFFFF', borderRadius: '16px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="h3" style={{ margin: 0 }}>
                {editingPage ? 'Edit Page' : 'Create New Page'}
              </h3>
              <button onClick={() => { setIsCreating(false); setEditingPage(null); }} className="btn btn-ghost btn-sm">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Page Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                  required
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Slug (URL path)</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>SEO Meta Title</label>
                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>SEO Meta Description</label>
                <textarea
                  rows={3}
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Page Content (Markdown / HTML)</label>
                <textarea
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB', fontFamily: 'monospace' }}
                />
              </div>

              <div className="flex justify-end gap-sm" style={{ paddingTop: '12px', borderTop: '1px solid #E5E7EB' }}>
                <Button variant="secondary" size="md" onClick={() => { setIsCreating(false); setEditingPage(null); }}>
                  Cancel
                </Button>
                <Button variant="primary" size="md" type="submit">
                  Save Page
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
