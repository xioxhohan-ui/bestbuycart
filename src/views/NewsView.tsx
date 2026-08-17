import React, { useEffect, useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { newsService } from '../services/newsService';
import { NewsPost, NewsCategory } from '../types/news';
import { updatePageSEO } from '../utils/seo';
import { Search, Calendar, User, Clock, ArrowRight, Sparkles, Tag, Newspaper, MessageSquare, ChevronRight } from 'lucide-react';
import { EmptyState } from '../components/ui/EmptyState';

export const NewsView: React.FC = () => {
  const { navigate } = useNavigation();
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [featuredPost, setFeaturedPost] = useState<NewsPost | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    updatePageSEO(
      'News & Updates | Best Buy Cart Editorial',
      'Stay informed with the latest consumer tech news, product launches, market insights, and platform updates.'
    );

    const loadData = async () => {
      setLoading(true);
      const [allPosts, allCats, feat] = await Promise.all([
        newsService.getPosts({ status: 'published' }),
        newsService.getCategories(),
        newsService.getFeaturedPost()
      ]);

      setPosts(allPosts);
      setCategories(allCats);
      setFeaturedPost(feat);
      setLoading(false);
    };

    loadData();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesCat = selectedCategory === 'all' || post.categoryId === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div style={{ backgroundColor: '#FAFAF8', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Header Banner */}
      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E5E0', paddingTop: '48px', paddingBottom: '40px' }}>
        <div className="container">
          <div className="flex items-center gap-xs" style={{ fontSize: '0.84rem', color: '#6B7280', marginBottom: '12px' }}>
            <span onClick={() => navigate('/')} style={{ cursor: 'pointer', color: '#2563EB', fontWeight: 600 }}>Home</span>
            <ChevronRight size={13} />
            <span style={{ color: '#1A1A1A', fontWeight: 600 }}>News & Updates</span>
          </div>

          <div style={{ maxWidth: '720px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#EFF6FF', color: '#2563EB', padding: '4px 12px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '12px' }}>
              <Newspaper size={13} />
              <span>EDITORIAL CONTENT HUB</span>
            </div>
            <h1 className="h1" style={{ margin: '0 0 12px 0', fontSize: '2.2rem', color: '#1A1A1A', letterSpacing: '-0.02em' }}>
              News, Trends & Platform Updates
            </h1>
            <p style={{ fontSize: '1rem', color: '#4B5563', margin: 0, lineHeight: 1.6 }}>
              Independent coverage of product launches, global hardware trends, retailer pricing insights, and platform features.
            </p>
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop: '40px' }}>
        {/* Featured Post Hero Card */}
        {featuredPost && selectedCategory === 'all' && !searchQuery && (
          <div
            onClick={() => navigate('/news/detail', { newsPost: featuredPost })}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E5E0',
              borderRadius: '8px',
              overflow: 'hidden',
              marginBottom: '48px',
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              transition: 'box-shadow 0.2s ease, transform 0.2s ease'
            }}
          >
            <div style={{ position: 'relative', minHeight: '320px', backgroundColor: '#F3F4F6' }}>
              <img
                src={featuredPost.featuredImage}
                alt={featuredPost.featuredImageAlt || featuredPost.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: '#2563EB', color: '#FFFFFF', padding: '4px 10px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Featured Announcement
              </div>
            </div>

            <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className="flex items-center gap-sm" style={{ fontSize: '0.8rem', color: '#6B7280', marginBottom: '12px' }}>
                <span style={{ backgroundColor: '#F1F5F9', color: '#334155', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                  {featuredPost.categoryName || 'Announcement'}
                </span>
                <span>•</span>
                <span className="flex items-center gap-xs">
                  <Calendar size={13} /> {new Date(featuredPost.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>

              <h2 className="h2" style={{ margin: '0 0 16px 0', fontSize: '1.5rem', color: '#1A1A1A', lineHeight: 1.3 }}>
                {featuredPost.title}
              </h2>

              <p style={{ color: '#4B5563', fontSize: '0.92rem', margin: '0 0 24px 0', lineHeight: 1.6 }}>
                {featuredPost.excerpt}
              </p>

              <div className="flex items-center justify-between" style={{ borderTop: '1px solid #F1F5F9', paddingTop: '16px', marginTop: 'auto' }}>
                <div className="flex items-center gap-xs" style={{ fontSize: '0.8rem', color: '#4B5563' }}>
                  <img src={featuredPost.authorAvatar} alt={featuredPost.authorName} style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                  <span style={{ fontWeight: 600 }}>{featuredPost.authorName}</span>
                </div>

                <div style={{ color: '#2563EB', fontWeight: 700, fontSize: '0.86rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span>Read Article</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter Controls & Search Bar */}
        <div className="flex items-center justify-between" style={{ gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {/* Category Chips */}
          <div className="flex items-center gap-xs" style={{ overflowX: 'auto', paddingBottom: '4px' }}>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`btn btn-sm ${selectedCategory === 'all' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: '999px', fontSize: '0.82rem', padding: '6px 16px' }}
            >
              All Articles ({posts.length})
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`btn btn-sm ${selectedCategory === cat.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{ borderRadius: '999px', fontSize: '0.82rem', padding: '6px 16px', whiteSpace: 'nowrap' }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search news..."
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: '6px',
                border: '1px solid #D1D5DB',
                fontSize: '0.85rem',
                outline: 'none',
                backgroundColor: '#FFFFFF'
              }}
            />
          </div>
        </div>

        {/* Article Cards Grid */}
        {filteredPosts.length === 0 ? (
          <EmptyState
            title="No News Articles Found"
            description="No editorial articles matched your search query. Check back soon for fresh hardware updates!"
            actionLabel="View All News"
            onAction={() => { setSelectedCategory('all'); setSearchQuery(''); }}
          />
        ) : (
          <div className="grid-products grid-products-3col" style={{ gap: '24px' }}>
            {filteredPosts.map(post => (
              <article
                key={post.id}
                onClick={() => navigate('/news/detail', { newsPost: post })}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E5E0',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.2s ease, transform 0.2s ease'
                }}
              >
                <div style={{ position: 'relative', height: '190px', backgroundColor: '#F3F4F6' }}>
                  <img
                    src={post.featuredImage}
                    alt={post.featuredImageAlt || post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: 'rgba(15, 23, 42, 0.85)', color: '#FFFFFF', padding: '3px 8px', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 600 }}>
                    {post.categoryName || 'News'}
                  </div>
                </div>

                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div className="flex items-center gap-xs" style={{ fontSize: '0.76rem', color: '#6B7280', marginBottom: '8px' }}>
                    <Calendar size={12} />
                    <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span>•</span>
                    <Clock size={12} />
                    <span>4 min read</span>
                  </div>

                  <h3 style={{ margin: '0 0 10px 0', fontSize: '1.05rem', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.4 }}>
                    {post.title}
                  </h3>

                  <p style={{ fontSize: '0.86rem', color: '#4B5563', margin: '0 0 16px 0', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between" style={{ marginTop: 'auto', borderTop: '1px solid #F1F5F9', paddingTop: '12px' }}>
                    <span style={{ fontSize: '0.78rem', color: '#6B7280', fontWeight: 600 }}>
                      By {post.authorName}
                    </span>

                    <span style={{ fontSize: '0.8rem', color: '#2563EB', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                      Read <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
