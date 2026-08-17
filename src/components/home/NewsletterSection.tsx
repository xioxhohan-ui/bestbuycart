import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2, Flame, Diamond, DollarSign, AlertTriangle, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubscribed(true);
    }
  };

  return (
    <section style={{ padding: '60px 0', borderTop: '1px solid var(--border-default)' }}>
      <div className="container">
        <div
          style={{
            backgroundColor: '#1A1A1A',
            color: '#FFFFFF',
            borderRadius: '24px',
            padding: '48px 32px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-elevated)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle Accent Glow */}
          <div
            style={{
              position: 'absolute',
              top: '-100px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '400px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(37,99,235,0.35) 0%, rgba(37,99,235,0) 70%)',
              pointerEvents: 'none'
            }}
          />

          <div style={{ maxWidth: '620px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            {/* Header Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '4px 14px',
                borderRadius: '999px',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: '#93C5FD',
                marginBottom: '16px'
              }}
            >
              <Mail size={14} />
              <span>THE HYPE DROP • WEEKLY DISPATCH</span>
            </div>

            <h2 className="h2" style={{ color: '#FFFFFF', margin: '0 0 10px' }}>
              Get the Week's Best Products, Deals & Hidden Gems
            </h2>

            <p style={{ color: '#9CA3AF', fontSize: '0.95rem', margin: '0 0 28px', lineHeight: 1.5 }}>
              Delivered every Thursday. Curated product intelligence without marketing fluff.
            </p>

            {/* Subscription Form */}
            {isSubscribed ? (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: 'rgba(5, 150, 105, 0.2)',
                  border: '1px solid #059669',
                  color: '#34D399',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontWeight: 600,
                  fontSize: '0.92rem'
                }}
              >
                <CheckCircle2 size={18} />
                <span>You're subscribed! Check your inbox this Thursday for The Hype Drop.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: 'flex',
                  maxWidth: '480px',
                  margin: '0 auto 24px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '999px',
                  padding: '5px 6px 5px 18px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.35)'
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    fontSize: '0.92rem',
                    color: '#1A1A1A'
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    borderRadius: '999px',
                    padding: '10px 20px',
                    fontSize: '0.88rem',
                    backgroundColor: '#2563EB'
                  }}
                >
                  <span>Subscribe</span>
                  <ArrowRight size={15} />
                </button>
              </form>
            )}

            {/* Newsletter Content Preview Badges */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '18px'
              }}
            >
              <span className="flex items-center gap-xs" style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', color: '#E5E7EB' }}>
                <Flame size={12} style={{ color: '#EA580C' }} /> 5 trending products
              </span>
              <span className="flex items-center gap-xs" style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', color: '#E5E7EB' }}>
                <Diamond size={12} style={{ color: '#93C5FD' }} /> 3 hidden gems
              </span>
              <span className="flex items-center gap-xs" style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', color: '#E5E7EB' }}>
                <DollarSign size={12} style={{ color: '#34D399' }} /> 5 price drops
              </span>
              <span className="flex items-center gap-xs" style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', color: '#E5E7EB' }}>
                <AlertTriangle size={12} style={{ color: '#F87171' }} /> 2 overhyped products
              </span>
              <span className="flex items-center gap-xs" style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', color: '#E5E7EB' }}>
                <Sparkles size={12} style={{ color: '#FBBF24' }} /> 5 new discoveries
              </span>
            </div>

            <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
              No spam. Zero sponsored bias. Unsubscribe with 1-click anytime.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
