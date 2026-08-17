import React, { useEffect, useState } from 'react';
import { contentService } from '../services/contentService';
import { Article } from '../types/content';
import { useNavigation } from '../context/NavigationContext';
import { BookOpen, Clock, User, ArrowRight, Sparkles, Scale, HelpCircle, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { updatePageSEO } from '../utils/seo';

export const GuidesView: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { navigate } = useNavigation();

  useEffect(() => {
    updatePageSEO(
      'Editorial Buying Guides & In-Depth Hardware Reviews — Best Buy Cart',
      'Expert-tested buying advice, acoustic and performance benchmarks, and decision frameworks.'
    );

    contentService.getArticles().then(setArticles);
  }, []);

  const featuredArticle = articles[0];
  const filteredArticles = articles.filter(
    (a) => selectedCategory === 'all' || a.category === selectedCategory
  );

  return (
    <div style={{ padding: '32px 0 80px' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div className="flex items-center gap-xs" style={{ fontSize: '0.8rem', color: '#6B7280', marginBottom: '20px' }}>
          <span onClick={() => navigate('/')} style={{ cursor: 'pointer', color: '#2563EB', fontWeight: 500 }}>
            Home
          </span>
          <ChevronRight size={13} />
          <span style={{ color: '#1A1A1A', fontWeight: 600 }}>Buying Guides</span>
        </div>

        {/* Hub Header */}
        <div style={{ marginBottom: '32px' }}>
          <div className="flex items-center gap-xs" style={{ marginBottom: '8px' }}>
            <BookOpen size={26} style={{ color: '#2563EB' }} />
            <h1 className="h1" style={{ margin: 0 }}>
              Buying Guides & Editorial Lab Reviews
            </h1>
          </div>
          <p style={{ color: '#4B5563', margin: 0, fontSize: '1.02rem', maxWidth: '720px' }}>
            Expert-tested advice to help you cut through the marketing noise and make confident purchase decisions.
          </p>
        </div>

        {/* Top Shortcuts Bar */}
        <div className="flex items-center gap-sm" style={{ marginBottom: '32px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`btn btn-sm ${selectedCategory === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: '999px', fontSize: '0.82rem' }}
          >
            All Guides
          </button>
          <button
            onClick={() => setSelectedCategory('tech')}
            className={`btn btn-sm ${selectedCategory === 'tech' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: '999px', fontSize: '0.82rem' }}
          >
            Tech & Audio
          </button>
          <button
            onClick={() => setSelectedCategory('kitchen')}
            className={`btn btn-sm ${selectedCategory === 'kitchen' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: '999px', fontSize: '0.82rem' }}
          >
            Kitchen & Coffee
          </button>
          <button
            onClick={() => navigate('/is-it-worth-it')}
            className="btn btn-secondary btn-sm"
            style={{ borderRadius: '999px', fontSize: '0.78rem', color: '#D97706', borderColor: '#FDE68A', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            <HelpCircle size={13} /> "Is It Worth It?" Portal
          </button>
          <button
            onClick={() => navigate('/methodology')}
            className="btn btn-secondary btn-sm"
            style={{ borderRadius: '999px', fontSize: '0.78rem', color: '#059669', borderColor: '#A7F3D0', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            <Scale size={13} /> Scoring Methodology
          </button>
        </div>

        {/* 1. Featured Guide Hero Spotlight */}
        {featuredArticle && selectedCategory === 'all' && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '1.5px solid var(--border-default)',
              padding: '36px',
              boxShadow: 'var(--shadow-card)',
              marginBottom: '48px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px',
              alignItems: 'center'
            }}
          >
            <div style={{ borderRadius: '16px', overflow: 'hidden', height: '240px' }}>
              <img
                src={featuredArticle.featuredImage}
                alt={featuredArticle.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#EFF6FF', color: '#2563EB', padding: '3px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px' }}>
                <Sparkles size={12} /> Featured 2026 Buying Guide
              </div>

              <h2 className="h2" style={{ margin: '0 0 12px', fontSize: '1.5rem', color: '#1A1A1A' }}>
                {featuredArticle.title}
              </h2>

              <p style={{ color: '#4B5563', fontSize: '0.94rem', lineHeight: 1.6, margin: '0 0 20px' }}>
                {featuredArticle.excerpt}
              </p>

              <div className="flex items-center gap-md" style={{ marginBottom: '20px', fontSize: '0.8rem', color: '#6B7280' }}>
                <span>By <strong>{featuredArticle.authorName}</strong></span>
                <span>•</span>
                <span>Updated: {featuredArticle.updatedDate}</span>
                <span>•</span>
                <span>{featuredArticle.readTimeMinutes} min read</span>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/guides/how-to-choose-headphones')}
                icon={<ArrowRight size={15} />}
                iconPosition="right"
              >
                Read Full Guide
              </Button>
            </div>
          </div>
        )}

        {/* 2. All Guides Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                border: '1px solid var(--border-default)',
                padding: '24px',
                boxShadow: 'var(--shadow-card)',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onClick={() => navigate('/guides/how-to-choose-headphones')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = '#2563EB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = 'var(--border-default)';
              }}
            >
              <div style={{ borderRadius: '12px', overflow: 'hidden', height: '160px', marginBottom: '16px' }}>
                <img src={art.featuredImage} alt={art.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <div className="flex items-center justify-between" style={{ marginBottom: '8px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase' }}>
                  {art.category}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                  {art.readTimeMinutes} min read
                </span>
              </div>

              <h3 className="h3" style={{ margin: '0 0 10px', fontSize: '1.1rem', color: '#1A1A1A', lineHeight: 1.3 }}>
                {art.title}
              </h3>

              <p style={{ color: '#4B5563', fontSize: '0.88rem', lineHeight: 1.5, margin: '0 0 20px', flex: 1 }}>
                {art.excerpt}
              </p>

              <div className="flex items-center justify-between" style={{ paddingTop: '14px', borderTop: '1px solid #F1F5F9', fontSize: '0.78rem', color: '#6B7280' }}>
                <span>Updated: {art.updatedDate}</span>
                <span style={{ color: '#2563EB', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Read Guide <ArrowRight size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
