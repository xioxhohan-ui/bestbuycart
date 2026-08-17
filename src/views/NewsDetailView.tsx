import React, { useEffect, useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { newsService } from '../services/newsService';
import { NewsPost, NewsComment } from '../types/news';
import { updatePageSEO } from '../utils/seo';
import { Calendar, User, Clock, ChevronRight, Share2, Twitter, Facebook, Linkedin, Link2, MessageSquare, ArrowLeft, Send, Check } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NewsDetailView: React.FC = () => {
  const { navigate, selectedNewsPost } = useNavigation();
  const [post, setPost] = useState<NewsPost | null>(null);
  const [comments, setComments] = useState<NewsComment[]>([]);
  const [relatedPosts, setRelatedPosts] = useState<NewsPost[]>([]);
  const [commentName, setCommentName] = useState<string>('');
  const [commentText, setCommentText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const loadPostData = async () => {
      let targetPost = selectedNewsPost;
      if (!targetPost) {
        const posts = await newsService.getPosts();
        targetPost = posts[0];
      }

      if (targetPost) {
        setPost(targetPost);
        updatePageSEO(targetPost.metaTitle || targetPost.title, targetPost.metaDescription || targetPost.excerpt);

        const [comms, allPosts] = await Promise.all([
          newsService.getCommentsByPostId(targetPost.id),
          newsService.getPosts()
        ]);
        setComments(comms);
        setRelatedPosts(allPosts.filter(p => p.id !== targetPost?.id).slice(0, 3));
      }
    };

    loadPostData();
  }, [selectedNewsPost]);

  if (!post) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2>Article Not Found</h2>
        <Button onClick={() => navigate('/news')} variant="primary" style={{ marginTop: '16px' }}>
          Back to News Hub
        </Button>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const author = commentName.trim() || 'Verified Reader';
    const newComm = await newsService.addComment(post.id, author, commentText);
    setComments(prev => [...prev, newComm]);
    setCommentText('');
    setCommentName('');
  };

  return (
    <div style={{ backgroundColor: '#FAFAF8', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Breadcrumb Header */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E5E0', padding: '16px 0' }}>
        <div className="container">
          <div className="flex items-center gap-xs" style={{ fontSize: '0.84rem', color: '#6B7280' }}>
            <span onClick={() => navigate('/')} style={{ cursor: 'pointer', color: '#2563EB', fontWeight: 600 }}>Home</span>
            <ChevronRight size={13} />
            <span onClick={() => navigate('/news')} style={{ cursor: 'pointer', color: '#2563EB', fontWeight: 600 }}>News</span>
            <ChevronRight size={13} />
            <span style={{ color: '#1A1A1A', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px' }}>
              {post.title}
            </span>
          </div>
        </div>
      </div>

      {/* Main Article Container */}
      <div className="container" style={{ maxWidth: '800px', marginTop: '40px' }}>
        <button
          onClick={() => navigate('/news')}
          className="btn btn-ghost btn-sm"
          style={{ color: '#6B7280', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '20px', padding: 0 }}
        >
          <ArrowLeft size={15} />
          <span>Back to News Hub</span>
        </button>

        <header style={{ marginBottom: '32px' }}>
          <div className="flex items-center gap-sm" style={{ marginBottom: '16px' }}>
            <span style={{ backgroundColor: '#2563EB', color: '#FFFFFF', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {post.categoryName || 'Announcement'}
            </span>
            <span style={{ fontSize: '0.82rem', color: '#6B7280' }}>
              Published {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          <h1 className="h1" style={{ margin: '0 0 20px 0', fontSize: '2.2rem', color: '#1A1A1A', lineHeight: 1.35, letterSpacing: '-0.02em' }}>
            {post.title}
          </h1>

          {/* Author Card */}
          <div className="flex items-center justify-between" style={{ borderTop: '1px solid #E5E5E0', borderBottom: '1px solid #E5E5E0', padding: '16px 0' }}>
            <div className="flex items-center gap-sm">
              <img src={post.authorAvatar} alt={post.authorName} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1A1A1A' }}>{post.authorName}</div>
                <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>Editorial Writer • 5 min read</div>
              </div>
            </div>

            {/* Social Share Strip */}
            <div className="flex items-center gap-xs">
              <button onClick={handleCopyLink} title="Copy Link" className="btn btn-secondary btn-sm" style={{ padding: '6px 10px', borderRadius: '6px' }}>
                {copied ? <Check size={14} style={{ color: '#059669' }} /> : <Link2 size={14} />}
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div style={{ marginBottom: '40px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #E5E5E0' }}>
          <img src={post.featuredImage} alt={post.featuredImageAlt || post.title} style={{ width: '100%', maxHeight: '420px', objectFit: 'cover' }} />
        </div>

        {/* Rich Article Body */}
        <article
          style={{
            backgroundColor: '#FFFFFF',
            padding: '36px',
            borderRadius: '8px',
            border: '1px solid #E5E5E0',
            fontSize: '1.02rem',
            lineHeight: 1.8,
            color: '#334155',
            marginBottom: '48px'
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex items-center gap-xs" style={{ marginBottom: '48px' }}>
            <span style={{ fontSize: '0.82rem', color: '#6B7280', fontWeight: 600 }}>Tags:</span>
            {post.tags.map((tag, idx) => (
              <span key={idx} style={{ backgroundColor: '#E2E8F0', color: '#334155', padding: '3px 10px', borderRadius: '999px', fontSize: '0.76rem', fontWeight: 600 }}>
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Comments Section */}
        <section style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '8px', border: '1px solid #E5E5E0', marginBottom: '48px' }}>
          <div className="flex items-center gap-xs" style={{ marginBottom: '24px' }}>
            <MessageSquare size={18} style={{ color: '#2563EB' }} />
            <h3 className="h3" style={{ margin: 0, fontSize: '1.15rem' }}>
              Reader Discussion ({comments.length})
            </h3>
          </div>

          {/* Comment Input */}
          <form onSubmit={handleAddComment} style={{ marginBottom: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px', marginBottom: '12px' }}>
              <input
                type="text"
                value={commentName}
                onChange={e => setCommentName(e.target.value)}
                placeholder="Your Name (Optional)"
                style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.85rem' }}
              />
            </div>
            <textarea
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              placeholder="Join the conversation..."
              rows={3}
              required
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.88rem', marginBottom: '12px' }}
            />
            <Button type="submit" variant="primary" size="sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Send size={13} /> Post Comment
            </Button>
          </form>

          {/* Comments List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {comments.length === 0 ? (
              <p style={{ color: '#9CA3AF', fontSize: '0.88rem', margin: 0 }}>Be the first to leave a comment on this article!</p>
            ) : (
              comments.map(c => (
                <div key={c.id} style={{ padding: '14px', borderRadius: '6px', backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.86rem', color: '#1A1A1A' }}>{c.authorName}</span>
                    <span style={{ fontSize: '0.74rem', color: '#94A3B8' }}>{new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>{c.content}</p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div>
            <h3 className="h3" style={{ marginBottom: '20px', fontSize: '1.15rem' }}>Related News Articles</h3>
            <div className="grid-products grid-products-3col" style={{ gap: '20px' }}>
              {relatedPosts.map(rel => (
                <article
                  key={rel.id}
                  onClick={() => navigate('/news/detail', { newsPost: rel })}
                  style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E0', borderRadius: '6px', overflow: 'hidden', cursor: 'pointer' }}
                >
                  <img src={rel.featuredImage} alt={rel.title} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                  <div style={{ padding: '14px' }}>
                    <h4 style={{ fontSize: '0.88rem', fontWeight: 700, margin: '0 0 6px 0', color: '#1A1A1A', lineHeight: 1.3 }}>{rel.title}</h4>
                    <span style={{ fontSize: '0.76rem', color: '#2563EB', fontWeight: 600 }}>Read More →</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
