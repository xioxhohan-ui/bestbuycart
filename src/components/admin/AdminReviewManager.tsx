import React, { useState, useEffect } from 'react';
import { UserReview, ReviewStatus } from '../../types/community';
import { communityService } from '../../services/communityService';
import {
  Star,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
  Filter,
  Trash2,
  Award,
  Eye,
  Check
} from 'lucide-react';
import { Button } from '../ui/Button';

export const AdminReviewManager: React.FC = () => {
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [starFilter, setStarFilter] = useState<string>('all');

  const loadReviews = async () => {
    const list = await communityService.getAllReviews();
    setReviews(list);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const filteredReviews = reviews.filter((r) => {
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    if (starFilter !== 'all' && r.rating !== Number(starFilter)) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.productName.toLowerCase().includes(q) ||
        r.userName.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q) ||
        r.content.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleStatusChange = async (reviewId: string, status: ReviewStatus) => {
    await communityService.updateReviewStatus(reviewId, status);
    await loadReviews();
  };

  const handleDelete = async (reviewId: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      await communityService.deleteReview(reviewId);
      await loadReviews();
    }
  };

  const handleApproveAllPending = async () => {
    const pending = reviews.filter((r) => r.status === 'pending');
    for (const p of pending) {
      await communityService.updateReviewStatus(p.id, 'approved');
    }
    await loadReviews();
  };

  const pendingCount = reviews.filter((r) => r.status === 'pending').length;
  const approvedCount = reviews.filter((r) => r.status === 'approved').length;
  const reportedCount = reviews.filter((r) => r.status === 'reported').length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div className="flex items-center gap-xs" style={{ marginBottom: '4px' }}>
            <Award size={22} style={{ color: '#2563EB' }} />
            <h2 className="h2" style={{ margin: 0 }}>
              REVIEW MODERATION QUEUE
            </h2>
          </div>
          <p style={{ color: '#64748B', margin: 0, fontSize: '0.9rem' }}>
            Verify, approve, and moderate member product ratings and detailed evaluations.
          </p>
        </div>

        {pendingCount > 0 && (
          <Button variant="primary" size="md" icon={<Check size={15} />} onClick={handleApproveAllPending}>
            Approve All Pending ({pendingCount})
          </Button>
        )}
      </div>

      {/* 4 Quick Stat KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Total Reviews</div>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 900, color: '#1A1A1A', marginTop: '4px' }}>
            {reviews.length}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Across 14 categories</span>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Pending Moderation</div>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 900, color: '#D97706', marginTop: '4px' }}>
            {pendingCount}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#D97706', fontWeight: 600 }}>Requires review</span>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Live Approved</div>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 900, color: '#059669', marginTop: '4px' }}>
            {approvedCount}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>Publicly visible</span>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Flagged / Reported</div>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 900, color: '#DC2626', marginTop: '4px' }}>
            {reportedCount}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#DC2626', fontWeight: 600 }}>Community reports</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '16px 20px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid var(--border-default)',
          boxShadow: 'var(--shadow-xs)',
          marginBottom: '24px'
        }}
      >
        <div style={{ position: 'relative', minWidth: '240px', flex: 1 }}>
          <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input
            type="text"
            placeholder="Search reviews by product, title, reviewer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '8px 12px 8px 34px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', outline: 'none' }}
          />
        </div>

        <div className="flex items-center gap-xs flex-wrap">
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B' }}>Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.82rem', backgroundColor: '#FFFFFF', outline: 'none' }}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending Approval</option>
            <option value="approved">Approved</option>
            <option value="reported">Reported</option>
          </select>

          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', marginLeft: '6px' }}>Rating:</span>
          <select
            value={starFilter}
            onChange={(e) => setStarFilter(e.target.value)}
            style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.82rem', backgroundColor: '#FFFFFF', outline: 'none' }}
          >
            <option value="all">All Stars</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </div>

      {/* Reviews Table */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid var(--border-default)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-card)'
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                <th style={{ padding: '14px 20px', width: '25%', color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Product
                </th>
                <th style={{ padding: '14px 20px', width: '18%', color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Reviewer
                </th>
                <th style={{ padding: '14px 20px', width: '32%', color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Rating & Excerpt
                </th>
                <th style={{ padding: '14px 20px', width: '12%', color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Status
                </th>
                <th style={{ padding: '14px 20px', width: '13%', textAlign: 'right', color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Moderation Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.map((rev, idx) => (
                <tr
                  key={rev.id}
                  style={{
                    backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC',
                    borderBottom: '1px solid #F1F5F9'
                  }}
                >
                  {/* Product */}
                  <td style={{ padding: '14px 20px' }}>
                    <div className="flex items-center gap-xs">
                      {rev.productImage && (
                        <img
                          src={rev.productImage}
                          alt={rev.productName}
                          style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'contain', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0' }}
                        />
                      )}
                      <div>
                        <div style={{ fontWeight: 700, color: '#1A1A1A', fontSize: '0.85rem' }}>
                          {rev.productName}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                          {rev.isVerifiedPurchase ? '✓ Verified Buyer' : 'Community User'}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Reviewer */}
                  <td style={{ padding: '14px 20px' }}>
                    <div className="flex items-center gap-xs">
                      <img
                        src={rev.userAvatar}
                        alt={rev.userName}
                        style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, color: '#1A1A1A', fontSize: '0.82rem' }}>
                          {rev.userName}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#2563EB', fontWeight: 600 }}>
                          {rev.userTier}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Rating & Excerpt */}
                  <td style={{ padding: '14px 20px' }}>
                    <div className="flex items-center gap-xs" style={{ marginBottom: '4px' }}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={12} fill={s <= rev.rating ? '#D97706' : 'none'} style={{ color: s <= rev.rating ? '#D97706' : '#CBD5E1' }} />
                      ))}
                      <span style={{ fontWeight: 700, fontSize: '0.82rem', color: '#1A1A1A', marginLeft: '4px' }}>
                        "{rev.title}"
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748B', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {rev.content}
                    </p>
                  </td>

                  {/* Status */}
                  <td style={{ padding: '14px 20px' }}>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '999px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        backgroundColor: rev.status === 'approved' ? '#ECFDF5' : rev.status === 'pending' ? '#FEF3C7' : '#FEF2F2',
                        color: rev.status === 'approved' ? '#059669' : rev.status === 'pending' ? '#D97706' : '#DC2626',
                        border: `1px solid ${rev.status === 'approved' ? '#A7F3D0' : rev.status === 'pending' ? '#FDE68A' : '#FECACA'}`
                      }}
                    >
                      {rev.status.toUpperCase()}
                    </span>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                    <div className="flex items-center justify-end gap-xs">
                      {rev.status !== 'approved' && (
                        <button
                          onClick={() => handleStatusChange(rev.id, 'approved')}
                          title="Approve Review"
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '6px',
                            border: '1px solid #A7F3D0',
                            backgroundColor: '#ECFDF5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#059669',
                            cursor: 'pointer'
                          }}
                        >
                          <CheckCircle2 size={14} />
                        </button>
                      )}
                      {rev.status !== 'reported' && (
                        <button
                          onClick={() => handleStatusChange(rev.id, 'reported')}
                          title="Flag as Reported"
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '6px',
                            border: '1px solid #CBD5E1',
                            backgroundColor: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#D97706',
                            cursor: 'pointer'
                          }}
                        >
                          <AlertTriangle size={13} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(rev.id)}
                        title="Delete Review"
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '6px',
                          border: '1px solid #CBD5E1',
                          backgroundColor: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#DC2626',
                          cursor: 'pointer'
                        }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
