import React, { useState, useEffect } from 'react';
import { Article } from '../../types/content';
import { contentService } from '../../services/contentService';
import { BookOpen, Plus, Edit2, Trash2, X, Check, Search, FileText, Sparkles, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';

export const AdminContentManager: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isCreating, setIsCreating] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const [formData, setFormData] = useState<Partial<Article>>({
    title: '',
    slug: '',
    type: 'guide',
    category: 'tech',
    authorName: 'Marcus Vance',
    excerpt: '',
    metaTitle: '',
    metaDescription: '',
    focusKeyword: '',
    status: 'published'
  });

  const loadData = () => {
    contentService.getArticles().then(setArticles);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCreate = () => {
    setIsCreating(true);
    setFormData({
      title: '',
      slug: '',
      type: 'guide',
      category: 'tech',
      authorName: 'Marcus Vance',
      excerpt: '',
      metaTitle: '',
      metaDescription: '',
      focusKeyword: '',
      status: 'published'
    });
  };

  const handleOpenEdit = (art: Article) => {
    setEditingArticle(art);
    setFormData(art);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    await contentService.saveArticle({
      ...formData,
      id: editingArticle?.id,
      title: formData.title
    });

    setIsCreating(false);
    setEditingArticle(null);
    loadData();
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Delete article "${title}"?`)) {
      await contentService.deleteArticle(id);
      loadData();
    }
  };

  const filtered = articles.filter((a) => {
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          a.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || a.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Total Articles</span>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1A1A1A', marginTop: '4px' }}>247</div>
          <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, marginTop: '2px' }}>Comprehensive guides & reviews</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Published Guides</span>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#059669', marginTop: '4px' }}>189</div>
          <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, marginTop: '2px' }}>Indexed on Google SERP</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Drafts in Progress</span>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#D97706', marginTop: '4px' }}>58</div>
          <div style={{ fontSize: '0.72rem', color: '#D97706', fontWeight: 700, marginTop: '2px' }}>Under lab review</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Average SEO Score</span>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#2563EB', marginTop: '4px' }}>84.2%</div>
          <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, marginTop: '2px' }}>Optimal keyword density</div>
        </div>
      </div>

      {/* 2. Content Data Table */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: 'var(--shadow-card)' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div className="flex items-center gap-xs">
            <BookOpen size={20} style={{ color: '#2563EB' }} />
            <h3 className="h3" style={{ margin: 0, color: '#1A1A1A' }}>
              Content Inventory & Editorial Guides ({articles.length})
            </h3>
          </div>

          <div className="flex items-center gap-sm">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.82rem' }}
            />
            <Button variant="primary" size="sm" onClick={handleOpenCreate} icon={<Plus size={14} />}>
              Create New Article
            </Button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#4B5563', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 14px' }}>Article Title</th>
                <th style={{ padding: '10px 14px' }}>Category</th>
                <th style={{ padding: '10px 14px' }}>Type</th>
                <th style={{ padding: '10px 14px' }}>SEO Score</th>
                <th style={{ padding: '10px 14px' }}>Status</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((art) => (
                <tr key={art.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ fontWeight: 700, color: '#1A1A1A' }}>{art.title}</div>
                    <div style={{ fontSize: '0.72rem', color: '#6B7280' }}>Updated: {art.updatedDate} • Author: {art.authorName}</div>
                  </td>
                  <td style={{ padding: '12px 14px', color: '#4B5563', textTransform: 'capitalize' }}>{art.category}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ backgroundColor: '#EFF6FF', color: '#2563EB', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
                      {art.type.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ backgroundColor: art.seoScore >= 85 ? '#ECFDF5' : '#FFFBEB', color: art.seoScore >= 85 ? '#059669' : '#D97706', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>
                      {art.seoScore}%
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ backgroundColor: art.status === 'published' ? '#ECFDF5' : '#FEF2F2', color: art.status === 'published' ? '#059669' : '#DC2626', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
                      {art.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                    <div className="flex items-center justify-end gap-xs">
                      <button onClick={() => handleOpenEdit(art)} className="btn btn-ghost btn-sm" style={{ color: '#4B5563', padding: '4px' }}>
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete(art.id, art.title)} className="btn btn-ghost btn-sm" style={{ color: '#DC2626', padding: '4px' }}>
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

      {/* 3. Add / Edit Article Modal */}
      {(isCreating || editingArticle) && (
        <div className="modal-backdrop" onClick={() => { setIsCreating(false); setEditingArticle(null); }}>
          <div className="modal-content" style={{ maxWidth: '780px', backgroundColor: '#FFFFFF', borderRadius: '16px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="h3" style={{ margin: 0 }}>
                {editingArticle ? 'Edit Article & SEO Content' : 'Create New Editorial Guide'}
              </h3>
              <button onClick={() => { setIsCreating(false); setEditingArticle(null); }} className="btn btn-ghost btn-sm"><X size={18} /></button>
            </div>

            <form onSubmit={handleSave} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Article Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Content Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                  >
                    <option value="guide">Buying Guide</option>
                    <option value="review">Product Review</option>
                    <option value="worth_it">Is It Worth It?</option>
                    <option value="comparison">Comparison Article</option>
                    <option value="list">Curated List</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                  >
                    <option value="tech">Tech & Audio</option>
                    <option value="kitchen">Kitchen & Coffee</option>
                    <option value="home">Home & Comfort</option>
                    <option value="beauty">Beauty & Wellness</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Author Byline</label>
                  <input
                    type="text"
                    value={formData.authorName}
                    onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Article Excerpt / Summary</label>
                <textarea
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.86rem' }}
                />
              </div>

              {/* SEO Meta Box */}
              <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', marginBottom: '10px' }}>
                  SEO Metadata & Keywords
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '10px' }}>
                  <div>
                    <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '3px' }}>Focus Keyword</label>
                    <input
                      type="text"
                      value={formData.focusKeyword}
                      onChange={(e) => setFormData({ ...formData, focusKeyword: e.target.value })}
                      style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.82rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '3px' }}>Meta Title</label>
                    <input
                      type="text"
                      value={formData.metaTitle}
                      onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                      style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.82rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.72rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '3px' }}>Meta Description (120-160 chars)</label>
                  <input
                    type="text"
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.82rem' }}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-sm" style={{ paddingTop: '12px', borderTop: '1px solid #E5E7EB' }}>
                <Button variant="secondary" size="md" onClick={() => { setIsCreating(false); setEditingArticle(null); }}>Cancel</Button>
                <Button variant="primary" size="md" type="submit">Save & Publish Article</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
