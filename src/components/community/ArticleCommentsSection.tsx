import React, { useState, useEffect } from 'react';
import { CommunityComment } from '../../types/community';
import { communityService } from '../../services/communityService';
import { useAuth } from '../../context/AuthContext';
import { MessageSquare, ThumbsUp, Send, User, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

interface ArticleCommentsSectionProps {
  targetType: 'guide' | 'product';
  targetId: string;
  targetTitle: string;
  targetUrl: string;
}

export const ArticleCommentsSection: React.FC<ArticleCommentsSectionProps> = ({
  targetType,
  targetId,
  targetTitle,
  targetUrl
}) => {
  const { currentUser, openAuthModal } = useAuth();
  const [comments, setComments] = useState<CommunityComment[]>([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadComments = async () => {
    const list = await communityService.getComments(targetType, targetId);
    setComments(list);
  };

  useEffect(() => {
    loadComments();
  }, [targetId, targetType]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    if (!newCommentText.trim()) return;

    setIsSubmitting(true);
    try {
      await communityService.addComment({
        targetType,
        targetId,
        targetTitle,
        targetUrl,
        user: currentUser,
        content: newCommentText.trim()
      });
      setNewCommentText('');
      await loadComments();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReplySubmit = async (parentId: string) => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    if (!replyText.trim()) return;

    await communityService.addComment({
      targetType,
      targetId,
      targetTitle,
      targetUrl,
      user: currentUser,
      content: replyText.trim(),
      parentId
    });
    setReplyText('');
    setReplyToId(null);
    await loadComments();
  };

  const handleUpvote = async (commentId: string) => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    await communityService.upvoteComment(commentId);
    await loadComments();
  };

  return (
    <section style={{ marginTop: '48px', paddingTop: '36px', borderTop: '1px solid var(--border-default)' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: '24px' }}>
        <div className="flex items-center gap-xs">
          <MessageSquare size={20} style={{ color: '#2563EB' }} />
          <h3 className="h3" style={{ margin: 0 }}>
            COMMUNITY DISCUSSION ({comments.length})
          </h3>
        </div>
        <span style={{ fontSize: '0.8rem', color: '#64748B', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <Sparkles size={12} style={{ color: '#D97706' }} /> Earn 15 pts per contribution
        </span>
      </div>

      {/* New Comment Input Box */}
      <form
        onSubmit={handleAddComment}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid #E2E8F0',
          padding: '16px',
          boxShadow: 'var(--shadow-card)',
          marginBottom: '28px'
        }}
      >
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          {currentUser ? (
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.fullName}
              style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
            />
          ) : (
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#64748B' }}>
              <User size={18} />
            </div>
          )}

          <div style={{ flex: 1 }}>
            <textarea
              rows={3}
              placeholder={currentUser ? "Share your experience or ask a question..." : "Sign in to join the discussion and earn reputation points..."}
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              onClick={() => {
                if (!currentUser) openAuthModal('login');
              }}
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                fontSize: '0.88rem',
                lineHeight: 1.5,
                resize: 'none',
                color: '#1A1A1A'
              }}
            />
            <div className="flex items-center justify-between" style={{ paddingTop: '8px', borderTop: '1px solid #F1F5F9' }}>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                Markdown supported • Be civil & helpful
              </span>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={isSubmitting || !newCommentText.trim()}
                icon={<Send size={13} />}
                style={{ borderRadius: '6px' }}
              >
                Post Comment
              </Button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      {comments.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '32px', color: '#64748B', fontSize: '0.88rem' }}>
          No comments yet. Start the conversation!
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {comments.map((comm) => (
            <div
              key={comm.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                padding: '16px 20px',
                boxShadow: 'var(--shadow-xs)'
              }}
            >
              <div className="flex items-center justify-between" style={{ marginBottom: '8px' }}>
                <div className="flex items-center gap-xs">
                  <img
                    src={comm.userAvatar}
                    alt={comm.userName}
                    style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1A1A1A' }}>
                    {comm.userName}
                  </span>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                  {new Date(comm.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
              </div>

              <p style={{ margin: '0 0 12px', fontSize: '0.86rem', color: '#334155', lineHeight: 1.5 }}>
                {comm.content}
              </p>

              <div className="flex items-center gap-md" style={{ fontSize: '0.78rem' }}>
                <button
                  onClick={() => handleUpvote(comm.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'none',
                    border: 'none',
                    color: '#64748B',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  <ThumbsUp size={12} style={{ color: '#059669' }} />
                  <span>{comm.upvotes} Upvotes</span>
                </button>
                <button
                  onClick={() => setReplyToId(replyToId === comm.id ? null : comm.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'none',
                    border: 'none',
                    color: '#2563EB',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  <MessageSquare size={12} />
                  <span>Reply</span>
                </button>
              </div>

              {/* Reply Form */}
              {replyToId === comm.id && (
                <div style={{ marginTop: '12px', padding: '10px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <div className="flex items-center gap-xs">
                    <input
                      type="text"
                      placeholder="Write a reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '6px 10px',
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.82rem',
                        outline: 'none'
                      }}
                    />
                    <Button size="sm" variant="primary" onClick={() => handleReplySubmit(comm.id)}>
                      Reply
                    </Button>
                  </div>
                </div>
              )}

              {/* Nested Replies */}
              {comm.replies && comm.replies.length > 0 && (
                <div style={{ marginTop: '12px', paddingLeft: '14px', borderLeft: '2px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {comm.replies.map((reply) => (
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
          ))}
        </div>
      )}
    </section>
  );
};
