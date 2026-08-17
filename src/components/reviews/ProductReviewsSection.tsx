import React, { useState, useEffect } from 'react';
import { Product } from '../../types/product';
import { UserReview } from '../../types/community';
import { communityService } from '../../services/communityService';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '../../context/NavigationContext';
import { WriteReviewModal } from './WriteReviewModal';
import {
  Star,
  ShieldCheck,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Filter,
  ArrowUpDown,
  Award,
  CheckCircle2,
  XCircle,
  Plus,
  Send
} from 'lucide-react';
import { Button } from '../ui/Button';

interface ProductReviewsSectionProps {
  product: Product;
}

export const ProductReviewsSection: React.FC<ProductReviewsSectionProps> = ({ product }) => {
  const { currentUser, openAuthModal } = useAuth();
  const { navigate } = useNavigation();
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [starFilter, setStarFilter] = useState<number | 'all'>('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'helpful' | 'newest' | 'highest'>('helpful');
  const [replyingReviewId, setReplyingReviewId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const loadReviews = async () => {
    const list = await communityService.getProductReviews(product.id);
    setReviews(list);
  };

  useEffect(() => {
    loadReviews();
  }, [product.id]);

  // Compute rating metrics
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : product.rating.toFixed(1);

  const starCounts = [5, 4, 3, 2, 1].map((s) => {
    const count = reviews.filter((r) => r.rating === s).length;
    const pct = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : s === 5 ? 75 : s === 4 ? 20 : 5;
    return { stars: s, count, pct };
  });

  // Filter & Sort
  const filteredReviews = reviews
    .filter((r) => {
      if (starFilter !== 'all' && r.rating !== starFilter) return false;
      if (verifiedOnly && !r.isVerifiedPurchase) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'helpful') return b.helpfulUpvotes - a.helpfulUpvotes;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return b.rating - a.rating;
    });

  const handleVote = async (reviewId: string, isHelpful: boolean) => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    await communityService.voteReviewHelpful(reviewId, isHelpful);
    await loadReviews();
  };

  const handleSendReply = async (reviewId: string) => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    if (!replyText.trim()) return;

    await communityService.replyToReview(reviewId, currentUser, replyText.trim());
    setReplyText('');
    setReplyingReviewId(null);
    await loadReviews();
  };

  const getTierBadgeStyle = (tier: string) => {
    switch (tier) {
      case 'Master Curator':
        return { bg: '#FEF3C7', color: '#D97706', border: '#FDE68A' };
      case 'Expert Critic':
        return { bg: '#FAF5FF', color: '#9333EA', border: '#E9D5FF' };
      case 'Enthusiast Reviewer':
        return { bg: '#EFF6FF', color: '#2563EB', border: '#BFDBFE' };
      default:
        return { bg: '#F1F5F9', color: '#475569', border: '#E2E8F0' };
    }
  };

  return (
    <section style={{ marginTop: '48px', paddingTop: '40px', borderTop: '1px solid var(--border-default)' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div className="flex items-center gap-xs" style={{ marginBottom: '4px' }}>
            <Award size={20} style={{ color: '#2563EB' }} />
            <h3 className="h3" style={{ margin: 0 }}>
              VERIFIED COMMUNITY REVIEWS
            </h3>
          </div>
          <p style={{ margin: 0, color: '#4B5563', fontSize: '0.9rem' }}>
            Real experiences and long-term durability feedback from registered buyers.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={<Plus size={16} />}
          onClick={() => {
            if (!currentUser) openAuthModal('login');
            else setIsWriteModalOpen(true);
          }}
          style={{ borderRadius: '8px' }}
        >
          Write a Review
        </Button>
      </div>

      {/* Rating Breakdown Banner */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid var(--border-default)',
          boxShadow: 'var(--shadow-card)',
          marginBottom: '32px'
        }}
      >
        {/* Left: Overall Score Card */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '16px', borderRight: '1px solid #F1F5F9' }}>
          <div className="font-mono" style={{ fontSize: '3rem', fontWeight: 900, color: '#1A1A1A', lineHeight: 1 }}>
            {avgRating}
          </div>
          <div className="flex items-center gap-xs" style={{ margin: '8px 0 4px' }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={18}
                fill={i <= Math.round(Number(avgRating)) ? '#D97706' : 'none'}
                style={{ color: i <= Math.round(Number(avgRating)) ? '#D97706' : '#CBD5E1' }}
              />
            ))}
          </div>
          <span style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 600 }}>
            Based on {totalReviews} community reviews
          </span>
        </div>

        {/* Right: Star Distribution Bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center' }}>
          {starCounts.map((row) => (
            <button
              key={row.stars}
              type="button"
              onClick={() => setStarFilter(starFilter === row.stars ? 'all' : row.stars)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '2px 6px',
                borderRadius: '6px',
                backgroundColor: starFilter === row.stars ? '#EFF6FF' : 'transparent'
              }}
            >
              <span style={{ fontSize: '0.78rem', fontWeight: 700, width: '48px', color: '#334155', textAlign: 'left' }}>
                {row.stars} stars
              </span>
              <div style={{ flex: 1, height: '8px', backgroundColor: '#F1F5F9', borderRadius: '999px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${row.pct}%`,
                    backgroundColor: row.stars >= 4 ? '#059669' : row.stars === 3 ? '#D97706' : '#DC2626',
                    borderRadius: '999px'
                  }}
                />
              </div>
              <span className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748B', width: '36px', textAlign: 'right' }}>
                {row.pct}%
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter & Sort Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '12px 16px',
          backgroundColor: '#F8FAFC',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          marginBottom: '24px'
        }}
      >
        <div className="flex items-center gap-xs flex-wrap">
          <span className="flex items-center gap-xs" style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B', marginRight: '6px' }}>
            <Filter size={13} /> Filter:
          </span>
          <button
            onClick={() => setStarFilter('all')}
            className={`btn btn-sm ${starFilter === 'all' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ borderRadius: '999px', fontSize: '0.75rem', padding: '4px 10px' }}
          >
            All ({totalReviews})
          </button>
          <button
            onClick={() => setStarFilter(5)}
            className={`btn btn-sm ${starFilter === 5 ? 'btn-primary' : 'btn-ghost'}`}
            style={{ borderRadius: '999px', fontSize: '0.75rem', padding: '4px 10px' }}
          >
            5 Stars
          </button>
          <button
            onClick={() => setStarFilter(4)}
            className={`btn btn-sm ${starFilter === 4 ? 'btn-primary' : 'btn-ghost'}`}
            style={{ borderRadius: '999px', fontSize: '0.75rem', padding: '4px 10px' }}
          >
            4 Stars
          </button>
          <label className="flex items-center gap-xs" style={{ fontSize: '0.78rem', fontWeight: 600, color: '#334155', cursor: 'pointer', marginLeft: '8px' }}>
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              style={{ accentColor: '#2563EB' }}
            />
            <span>Verified Purchases Only</span>
          </label>
        </div>

        <div className="flex items-center gap-xs">
          <ArrowUpDown size={13} style={{ color: '#64748B' }} />
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#64748B' }}>Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            style={{
              padding: '4px 8px',
              borderRadius: '6px',
              border: '1px solid #CBD5E1',
              fontSize: '0.8rem',
              backgroundColor: '#FFFFFF',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="helpful">Most Helpful</option>
            <option value="newest">Newest First</option>
            <option value="highest">Highest Rating</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      {filteredReviews.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '48px 24px',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px dashed #CBD5E1'
          }}
        >
          <Award size={36} style={{ color: '#94A3B8', margin: '0 auto 12px' }} />
          <h4 style={{ margin: '0 0 6px', color: '#1A1A1A', fontSize: '1rem' }}>No reviews found for these filters</h4>
          <p style={{ margin: '0 0 16px', color: '#64748B', fontSize: '0.85rem' }}>Be the first verified reviewer to share feedback on this product.</p>
          <Button variant="secondary" size="sm" onClick={() => setIsWriteModalOpen(true)}>
            Write a Review
          </Button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredReviews.map((rev) => {
            const tierStyle = getTierBadgeStyle(rev.userTier);
            return (
              <div
                key={rev.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid var(--border-default)',
                  boxShadow: 'var(--shadow-card)'
                }}
              >
                {/* Reviewer Header */}
                <div className="flex items-start justify-between" style={{ marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                  <div
                    className="flex items-center gap-sm"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/user-profile', { username: rev.userId.replace('user-', '') })}
                  >
                    <img
                      src={rev.userAvatar}
                      alt={rev.userName}
                      style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div className="flex items-center gap-xs">
                        <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#1A1A1A' }}>
                          {rev.userName}
                        </span>
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            padding: '2px 6px',
                            borderRadius: '4px',
                            backgroundColor: tierStyle.bg,
                            color: tierStyle.color,
                            border: `1px solid ${tierStyle.border}`
                          }}
                        >
                          {rev.userTier}
                        </span>
                      </div>
                      <div className="flex items-center gap-xs" style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>
                        {rev.isVerifiedPurchase && (
                          <span className="flex items-center gap-xs" style={{ color: '#059669', fontWeight: 600 }}>
                            <ShieldCheck size={12} /> Verified Purchase
                          </span>
                        )}
                        <span>•</span>
                        <span>{new Date(rev.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>

                  {/* Star Rating Badge */}
                  <div className="flex items-center gap-xs">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i <= rev.rating ? '#D97706' : 'none'}
                        style={{ color: i <= rev.rating ? '#D97706' : '#CBD5E1' }}
                      />
                    ))}
                  </div>
                </div>

                {/* Review Title & Content */}
                <h4 style={{ margin: '0 0 8px', fontSize: '1.02rem', fontWeight: 800, color: '#1A1A1A', lineHeight: 1.35 }}>
                  {rev.title}
                </h4>
                <p style={{ margin: '0 0 16px', color: '#334155', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {rev.content}
                </p>

                {/* Pros & Cons Pills */}
                {(rev.pros.length > 0 || rev.cons.length > 0) && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                    {rev.pros.length > 0 && (
                      <div style={{ backgroundColor: '#F0FDF4', padding: '10px 14px', borderRadius: '10px', border: '1px solid #DCFCE7' }}>
                        <div className="flex items-center gap-xs" style={{ fontSize: '0.72rem', fontWeight: 800, color: '#059669', textTransform: 'uppercase', marginBottom: '6px' }}>
                          <CheckCircle2 size={12} /> Pros:
                        </div>
                        <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.82rem', color: '#166534', lineHeight: 1.4 }}>
                          {rev.pros.map((p, i) => (
                            <li key={i}>{p}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {rev.cons.length > 0 && (
                      <div style={{ backgroundColor: '#FEF2F2', padding: '10px 14px', borderRadius: '10px', border: '1px solid #FEE2E2' }}>
                        <div className="flex items-center gap-xs" style={{ fontSize: '0.72rem', fontWeight: 800, color: '#DC2626', textTransform: 'uppercase', marginBottom: '6px' }}>
                          <XCircle size={12} /> Cons:
                        </div>
                        <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.82rem', color: '#991B1B', lineHeight: 1.4 }}>
                          {rev.cons.map((c, i) => (
                            <li key={i}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Helpful Voting Bar */}
                <div
                  className="flex items-center justify-between"
                  style={{
                    paddingTop: '12px',
                    borderTop: '1px solid #F1F5F9',
                    fontSize: '0.8rem',
                    color: '#64748B'
                  }}
                >
                  <div className="flex items-center gap-sm">
                    <span style={{ fontWeight: 600 }}>Was this review helpful?</span>
                    <button
                      onClick={() => handleVote(rev.id, true)}
                      className="btn btn-ghost btn-sm"
                      style={{ padding: '3px 8px', fontSize: '0.78rem', color: '#059669', gap: '4px' }}
                    >
                      <ThumbsUp size={13} />
                      <span>{rev.helpfulUpvotes}</span>
                    </button>
                    <button
                      onClick={() => handleVote(rev.id, false)}
                      className="btn btn-ghost btn-sm"
                      style={{ padding: '3px 8px', fontSize: '0.78rem', color: '#64748B', gap: '4px' }}
                    >
                      <ThumbsDown size={13} />
                      <span>{rev.helpfulDownvotes}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setReplyingReviewId(replyingReviewId === rev.id ? null : rev.id)}
                    className="btn btn-ghost btn-sm"
                    style={{ color: '#2563EB', gap: '4px', fontSize: '0.78rem', fontWeight: 600 }}
                  >
                    <MessageSquare size={13} />
                    <span>Reply ({rev.replies?.length || 0})</span>
                  </button>
                </div>

                {/* Reply Form */}
                {replyingReviewId === rev.id && (
                  <div style={{ marginTop: '14px', padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                    <div className="flex items-center gap-xs">
                      <input
                        type="text"
                        placeholder="Write a helpful reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          borderRadius: '6px',
                          border: '1px solid #CBD5E1',
                          fontSize: '0.82rem',
                          outline: 'none'
                        }}
                      />
                      <Button size="sm" variant="primary" icon={<Send size={12} />} onClick={() => handleSendReply(rev.id)}>
                        Reply
                      </Button>
                    </div>
                  </div>
                )}

                {/* Nested Replies */}
                {rev.replies && rev.replies.length > 0 && (
                  <div style={{ marginTop: '14px', paddingLeft: '16px', borderLeft: '2px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {rev.replies.map((reply) => (
                      <div key={reply.id} style={{ backgroundColor: '#F8FAFC', padding: '10px 14px', borderRadius: '8px' }}>
                        <div className="flex items-center justify-between" style={{ marginBottom: '4px' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1A1A1A' }}>
                            {reply.userName}
                          </span>
                          <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                            {new Date(reply.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.82rem', color: '#475569', lineHeight: 1.4 }}>
                          {reply.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {isWriteModalOpen && (
        <WriteReviewModal
          product={product}
          onClose={() => setIsWriteModalOpen(false)}
          onSubmitted={loadReviews}
        />
      )}
    </section>
  );
};
