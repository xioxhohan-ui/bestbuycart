import React, { useState, useEffect } from 'react';
import { CommunityComment, CommentStatus } from '../../types/community';
import { communityService } from '../../services/communityService';
import {
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  Search,
  Check,
  ExternalLink,
  BookOpen,
  Package
} from 'lucide-react';
import { Button } from '../ui/Button';

export const AdminCommentManager: React.FC = () => {
  const [comments, setComments] = useState<CommunityComment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const loadComments = async () => {
    const list = await communityService.getAllComments();
    setComments(list);
  };

  useEffect(() => {
    loadComments();
  }, []);

  const filteredComments = comments.filter((c) => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (typeFilter !== 'all' && c.targetType !== typeFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.content.toLowerCase().includes(q) ||
        c.userName.toLowerCase().includes(q) ||
        c.targetTitle.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleStatusChange = async (commentId: string, status: CommentStatus) => {
    await communityService.updateCommentStatus(commentId, status);
    await loadComments();
  };

  const handleDelete = async (commentId: string) => {
    if (confirm('Are you sure you want to delete this comment?')) {
      await communityService.deleteComment(commentId);
      await loadComments();
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div className="flex items-center gap-xs" style={{ marginBottom: '4px' }}>
            <MessageSquare size={22} style={{ color: '#2563EB' }} />
            <h2 className="h2" style={{ margin: 0 }}>
              COMMUNITY COMMENT MODERATION
            </h2>
          </div>
          <p style={{ color: '#64748B', margin: 0, fontSize: '0.9rem' }}>
            Moderate discussions across buying guides, reviews, and editorial teardowns.
          </p>
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
            placeholder="Search comment content, user, article..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '8px 12px 8px 34px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', outline: 'none' }}
          />
        </div>

        <div className="flex items-center gap-xs flex-wrap">
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B' }}>Target Type:</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.82rem', backgroundColor: '#FFFFFF', outline: 'none' }}
          >
            <option value="all">All Content</option>
            <option value="guide">Buying Guides</option>
            <option value="product">Product Pages</option>
          </select>

          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', marginLeft: '6px' }}>Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.82rem', backgroundColor: '#FFFFFF', outline: 'none' }}
          >
            <option value="all">All Statuses</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="reported">Reported</option>
          </select>
        </div>
      </div>

      {/* Comments Table */}
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
                <th style={{ padding: '14px 20px', width: '38%', color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Comment Text
                </th>
                <th style={{ padding: '14px 20px', width: '18%', color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  User
                </th>
                <th style={{ padding: '14px 20px', width: '22%', color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Page Target
                </th>
                <th style={{ padding: '14px 20px', width: '10%', color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Status
                </th>
                <th style={{ padding: '14px 20px', width: '12%', textAlign: 'right', color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredComments.map((comm, idx) => (
                <tr
                  key={comm.id}
                  style={{
                    backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC',
                    borderBottom: '1px solid #F1F5F9'
                  }}
                >
                  <td style={{ padding: '14px 20px' }}>
                    <p style={{ margin: '0 0 4px', fontSize: '0.88rem', color: '#1A1A1A', lineHeight: 1.4 }}>
                      "{comm.content}"
                    </p>
                    <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 600 }}>
                      {comm.upvotes} community upvotes
                    </span>
                  </td>

                  <td style={{ padding: '14px 20px' }}>
                    <div className="flex items-center gap-xs">
                      <img
                        src={comm.userAvatar}
                        alt={comm.userName}
                        style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <span style={{ fontWeight: 700, color: '#1A1A1A', fontSize: '0.82rem' }}>
                        {comm.userName}
                      </span>
                    </div>
                  </td>

                  <td style={{ padding: '14px 20px' }}>
                    <div className="flex items-center gap-xs" style={{ fontSize: '0.82rem', color: '#2563EB', fontWeight: 600 }}>
                      {comm.targetType === 'guide' ? <BookOpen size={13} /> : <Package size={13} />}
                      <span style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {comm.targetTitle}
                      </span>
                    </div>
                  </td>

                  <td style={{ padding: '14px 20px' }}>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '999px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        backgroundColor: comm.status === 'approved' ? '#ECFDF5' : '#FEF3C7',
                        color: comm.status === 'approved' ? '#059669' : '#D97706'
                      }}
                    >
                      {comm.status.toUpperCase()}
                    </span>
                  </td>

                  <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                    <div className="flex items-center justify-end gap-xs">
                      {comm.status !== 'approved' && (
                        <button
                          onClick={() => handleStatusChange(comm.id, 'approved')}
                          title="Approve Comment"
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
                      <button
                        onClick={() => handleDelete(comm.id)}
                        title="Delete Comment"
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
