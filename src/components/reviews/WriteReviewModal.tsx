import React, { useState } from 'react';
import { Product } from '../../types/product';
import { useAuth } from '../../context/AuthContext';
import { communityService } from '../../services/communityService';
import { Star, X, Plus, CheckCircle2, ShieldCheck, Award, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface WriteReviewModalProps {
  product: Product;
  onClose: () => void;
  onSubmitted: () => void;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({ product, onClose, onSubmitted }) => {
  const { currentUser, openAuthModal } = useAuth();
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [proInput, setProInput] = useState('');
  const [pros, setPros] = useState<string[]>([]);
  const [conInput, setConInput] = useState('');
  const [cons, setCons] = useState<string[]>([]);
  const [isVerified, setIsVerified] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const ratingLabels = ['', 'Poor Experience', 'Below Average', 'Average / Mixed', 'Good & Reliable', 'Outstanding / Best in Class'];

  const handleAddPro = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    if (proInput.trim() && !pros.includes(proInput.trim())) {
      setPros([...pros, proInput.trim()]);
      setProInput('');
    }
  };

  const handleAddCon = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    if (conInput.trim() && !cons.includes(conInput.trim())) {
      setCons([...cons, conInput.trim()]);
      setConInput('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!currentUser) {
      openAuthModal('login');
      return;
    }

    if (!title.trim()) {
      setErrorMsg('Please enter a review summary headline.');
      return;
    }

    if (content.trim().length < 20) {
      setErrorMsg('Please write at least 20 characters of detailed feedback.');
      return;
    }

    setIsSubmitting(true);
    try {
      await communityService.submitReview({
        productId: product.id,
        productName: product.name,
        productSlug: product.id,
        productImage: product.image,
        userId: currentUser.id,
        userName: currentUser.fullName,
        userAvatar: currentUser.avatarUrl,
        userTier: currentUser.tierName,
        rating,
        title: title.trim(),
        content: content.trim(),
        pros,
        cons,
        isVerifiedPurchase: isVerified
      });

      onSubmitted();
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit review.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #E2E8F0',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F8FAFC'
          }}
        >
          <div className="flex items-center gap-xs">
            <Award size={18} style={{ color: '#2563EB' }} />
            <div>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#1A1A1A' }}>
                Write a Verified Product Review
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                Share your authentic real-world experience & earn 50 reputation points
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#64748B',
              padding: '4px',
              borderRadius: '6px'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          {/* Product Mini Banner */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '12px 16px',
              backgroundColor: '#F8FAFC',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              marginBottom: '20px'
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '8px', backgroundColor: '#FFFFFF' }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                {product.brand}
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1A1A1A' }}>
                {product.name}
              </div>
            </div>
          </div>

          {errorMsg && (
            <div
              className="flex items-center gap-xs"
              style={{
                backgroundColor: '#FEF2F2',
                border: '1px solid #FECACA',
                color: '#DC2626',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                marginBottom: '16px'
              }}
            >
              <AlertCircle size={15} style={{ flexShrink: 0 }} />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* 1. Star Rating Selector */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
                Overall Rating *
              </label>
              <div className="flex items-center gap-sm">
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[1, 2, 3, 4, 5].map((star) => {
                    const activeRating = hoverRating !== null ? hoverRating : rating;
                    const isFilled = star <= activeRating;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '2px',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Star
                          size={26}
                          fill={isFilled ? '#D97706' : 'none'}
                          style={{ color: isFilled ? '#D97706' : '#CBD5E1', transition: 'all 0.15s' }}
                        />
                      </button>
                    );
                  })}
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#D97706' }}>
                  {ratingLabels[hoverRating || rating]}
                </span>
              </div>
            </div>

            {/* 2. Review Title */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Review Headline *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Unrivaled ANC for long flights & daily commutes"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* 3. Detailed Review Content */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Detailed Feedback & Experience *
              </label>
              <textarea
                required
                rows={4}
                placeholder="What did you like or dislike? How does it perform in daily real-world use over time?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.88rem',
                  lineHeight: 1.5,
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* 4. Pros Tag Adder */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#059669', marginBottom: '6px' }}>
                Pros (Key Highlights)
              </label>
              <div className="flex items-center gap-xs" style={{ marginBottom: '8px' }}>
                <input
                  type="text"
                  placeholder="e.g. 30-hour battery life, Instant quick charge"
                  value={proInput}
                  onChange={(e) => setProInput(e.target.value)}
                  onKeyDown={handleAddPro}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />
                <Button type="button" variant="secondary" size="sm" onClick={handleAddPro} icon={<Plus size={14} />}>
                  Add
                </Button>
              </div>
              {pros.length > 0 && (
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {pros.map((p, i) => (
                    <span
                      key={i}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        backgroundColor: '#ECFDF5',
                        color: '#065F46',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        border: '1px solid #A7F3D0'
                      }}
                    >
                      <CheckCircle2 size={12} style={{ color: '#059669' }} />
                      <span>{p}</span>
                      <button
                        type="button"
                        onClick={() => setPros(pros.filter((_, idx) => idx !== i))}
                        style={{ background: 'none', border: 'none', color: '#059669', cursor: 'pointer', padding: 0 }}
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* 5. Cons Tag Adder */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#DC2626', marginBottom: '6px' }}>
                Cons (Drawbacks / Trade-offs)
              </label>
              <div className="flex items-center gap-xs" style={{ marginBottom: '8px' }}>
                <input
                  type="text"
                  placeholder="e.g. Case is slightly bulky in backpack"
                  value={conInput}
                  onChange={(e) => setConInput(e.target.value)}
                  onKeyDown={handleAddCon}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />
                <Button type="button" variant="secondary" size="sm" onClick={handleAddCon} icon={<Plus size={14} />}>
                  Add
                </Button>
              </div>
              {cons.length > 0 && (
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {cons.map((c, i) => (
                    <span
                      key={i}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        backgroundColor: '#FEF2F2',
                        color: '#991B1B',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        border: '1px solid #FECACA'
                      }}
                    >
                      <X size={12} style={{ color: '#DC2626' }} />
                      <span>{c}</span>
                      <button
                        type="button"
                        onClick={() => setCons(cons.filter((_, idx) => idx !== i))}
                        style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', padding: 0 }}
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* 6. Verified Purchase Toggle */}
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#334155',
                cursor: 'pointer',
                padding: '8px 12px',
                backgroundColor: '#F8FAFC',
                borderRadius: '8px',
                border: '1px solid #E2E8F0'
              }}
            >
              <input
                type="checkbox"
                checked={isVerified}
                onChange={(e) => setIsVerified(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: '#2563EB' }}
              />
              <span className="flex items-center gap-xs">
                <ShieldCheck size={14} style={{ color: '#059669' }} /> I confirm I own or have personally used this product
              </span>
            </label>

            {/* Actions */}
            <div className="flex items-center justify-end gap-sm" style={{ marginTop: '10px' }}>
              <Button type="button" variant="ghost" size="md" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="md" disabled={isSubmitting}>
                {isSubmitting ? 'Publishing...' : 'Publish Review (+50 Pts)'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
