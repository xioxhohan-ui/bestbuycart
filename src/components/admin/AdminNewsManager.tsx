import React, { useEffect, useState } from 'react';
import { Newspaper, Plus, Search, Edit3, Trash2, CheckCircle2, Clock, Eye, Sparkles, FileText, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { newsService } from '../../services/newsService';
import { NewsPost, NewsCategory, NewsAuthor } from '../../types/news';

export const AdminNewsManager: React.FC = () => {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [authors, setAuthors] = useState<NewsAuthor[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingPost, setEditingPost] = useState<Partial<NewsPost> | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [allPosts, allCats, allAuths] = await Promise.all([
      newsService.getPosts({ status: undefined }),
      newsService.getCategories(),
      newsService.getAuthors()
    ]);
    setPosts(allPosts);
    setCategories(allCats);
    setAuthors(allAuths);
  };

  const handleOpenCreateModal = () => {
    setEditingPost({
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      featuredImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      categoryId: categories[0]?.id || 'cat-1',
      authorId: authors[0]?.id || 'auth-1',
      status: 'published',
      isFeatured: false,
      metaTitle: '',
      metaDescription: '',
      focusKeyword: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (post: NewsPost) => {
    setEditingPost({ ...post });
    setIsModalOpen(true);
  };

  const handleDeletePost = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this news post?')) {
      await newsService.deletePost(id);
      loadData();
    }
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost?.title) return;

    await newsService.savePost(editingPost as any);
    setIsModalOpen(false);
    setEditingPost(null);
    loadData();
  };

  const filteredPosts = posts.filter(post => {
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    const matchesSearch = !searchQuery || post.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const publishedCount = posts.filter(p => p.status === 'published').length;
  const draftCount = posts.filter(p => p.status === 'draft').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="h2" style={{ margin: 0, fontSize: '1.4rem', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Newspaper size={20} style={{ color: '#2563EB' }} /> News & Updates Engine
          </h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.86rem', color: '#64748B' }}>
            Manage news posts, platform announcements, editorial guides, and author profiles.
          </p>
        </div>

        <Button onClick={handleOpenCreateModal} variant="primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Plus size={16} /> Add News Post
        </Button>
      </div>

      {/* Quick Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div style={{ backgroundColor: '#FFFFFF', padding: '16px 20px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Total Articles</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>{posts.length}</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '16px 20px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase' }}>Published</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#059669', marginTop: '4px' }}>{publishedCount}</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '16px 20px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#D97706', textTransform: 'uppercase' }}>Drafts</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#D97706', marginTop: '4px' }}>{draftCount}</div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="flex items-center gap-sm">
          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search news titles..."
              style={{ width: '100%', padding: '6px 12px 6px 32px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.84rem' }}
            />
          </div>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.84rem' }}
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* News Posts Table */}
      <div className="table-wrapper">
        <table style={{ backgroundColor: '#FFFFFF' }}>
          <thead>
            <tr style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748B' }}>
              <th style={{ padding: '12px 16px' }}>Title</th>
              <th style={{ padding: '12px 16px' }}>Category</th>
              <th style={{ padding: '12px 16px' }}>Author</th>
              <th style={{ padding: '12px 16px' }}>Views</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: '#94A3B8' }}>
                  No news posts found. Click "Add News Post" to create one.
                </td>
              </tr>
            ) : (
              filteredPosts.map(post => (
                <tr key={post.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0F172A', maxWidth: '320px' }}>
                    <div>{post.title}</div>
                    {post.isFeatured && (
                      <span style={{ backgroundColor: '#EFF6FF', color: '#2563EB', fontSize: '0.68rem', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                        Featured Banner
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '0.84rem', color: '#475569' }}>
                    {post.categoryName || 'General'}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '0.84rem', color: '#475569' }}>
                    {post.authorName}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '0.84rem', color: '#64748B' }}>
                    {post.views}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '999px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        backgroundColor: post.status === 'published' ? '#ECFDF5' : '#FEF3C7',
                        color: post.status === 'published' ? '#059669' : '#D97706'
                      }}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <button
                        onClick={() => handleOpenEditModal(post)}
                        className="btn btn-ghost btn-sm"
                        style={{ padding: '4px 8px', color: '#2563EB' }}
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="btn btn-ghost btn-sm"
                        style={{ padding: '4px 8px', color: '#EF4444' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit/Create Modal */}
      {isModalOpen && editingPost && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', maxWidth: '680px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '24px', position: 'relative' }}>
            <div className="flex items-center justify-between" style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '16px', marginBottom: '20px' }}>
              <h3 className="h3" style={{ margin: 0, fontSize: '1.2rem' }}>
                {editingPost.id ? 'Edit News Post' : 'Create News Post'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSavePost} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingPost.title || ''}
                  onChange={e => setEditingPost({ ...editingPost, title: e.target.value })}
                  placeholder="e.g. Platform Update: New Features Released"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Category
                  </label>
                  <select
                    value={editingPost.categoryId || ''}
                    onChange={e => {
                      const cat = categories.find(c => c.id === e.target.value);
                      setEditingPost({ ...editingPost, categoryId: e.target.value, categoryName: cat?.name });
                    }}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Status
                  </label>
                  <select
                    value={editingPost.status || 'published'}
                    onChange={e => setEditingPost({ ...editingPost, status: e.target.value as any })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Excerpt / Teaser Summary
                </label>
                <textarea
                  rows={2}
                  value={editingPost.excerpt || ''}
                  onChange={e => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Article Content (HTML allowed)
                </label>
                <textarea
                  rows={6}
                  value={editingPost.content || ''}
                  onChange={e => setEditingPost({ ...editingPost, content: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem', fontFamily: 'monospace' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Featured Image URL
                </label>
                <input
                  type="text"
                  value={editingPost.featuredImage || ''}
                  onChange={e => setEditingPost({ ...editingPost, featuredImage: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              </div>

              <div className="flex items-center gap-xs">
                <input
                  type="checkbox"
                  id="feat-checkbox"
                  checked={editingPost.isFeatured || false}
                  onChange={e => setEditingPost({ ...editingPost, isFeatured: e.target.checked })}
                />
                <label htmlFor="feat-checkbox" style={{ fontSize: '0.85rem', color: '#1A1A1A', cursor: 'pointer' }}>
                  Mark as Featured Announcement Banner on News Hub
                </label>
              </div>

              <div className="flex items-center justify-end gap-sm" style={{ borderTop: '1px solid #E2E8F0', paddingTop: '16px', marginTop: '8px' }}>
                <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Save News Post
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
