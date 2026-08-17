import React from 'react';
import { Product } from '../../types/product';
import { Flame, ShieldCheck, TrendingUp, Users, Search, HelpCircle } from 'lucide-react';

interface DualScoreBreakdownProps {
  product: Product;
  detailed?: boolean;
}

export const DualScoreBreakdown: React.FC<DualScoreBreakdownProps> = ({
  product,
  detailed = true
}) => {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid var(--border-default)',
        padding: '24px',
        boxShadow: 'var(--shadow-card)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}
    >
      {/* 1. Dual Index Progress Meters */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}
      >
        {/* Hype Index */}
        <div
          style={{
            backgroundColor: '#FFF7ED',
            borderRadius: '12px',
            border: '1px solid #FFEDD5',
            padding: '16px'
          }}
        >
          <div className="flex items-center justify-between" style={{ marginBottom: '8px' }}>
            <div className="flex items-center gap-2xs">
              <Flame size={16} style={{ color: '#EA580C' }} />
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#9A3412', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Hype Index
              </span>
            </div>
            <span className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#EA580C' }}>
              {product.hypeScore}%
            </span>
          </div>

          {/* Meter Bar */}
          <div style={{ height: '8px', backgroundColor: '#FED7AA', borderRadius: '999px', overflow: 'hidden', marginBottom: '8px' }}>
            <div
              style={{
                width: `${product.hypeScore}%`,
                height: '100%',
                backgroundColor: '#EA580C',
                borderRadius: '999px',
                transition: 'width 0.6s ease'
              }}
            />
          </div>

          <div style={{ fontSize: '0.72rem', color: '#9A3412', lineHeight: 1.4 }}>
            Based on: Market demand velocity, social mentions, and 30-day search volume.
          </div>
        </div>

        {/* Worth Index */}
        <div
          style={{
            backgroundColor: '#ECFDF5',
            borderRadius: '12px',
            border: '1px solid #A7F3D0',
            padding: '16px'
          }}
        >
          <div className="flex items-center justify-between" style={{ marginBottom: '8px' }}>
            <div className="flex items-center gap-2xs">
              <ShieldCheck size={16} style={{ color: '#059669' }} />
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#065F46', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Worth Index
              </span>
            </div>
            <span className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#059669' }}>
              {product.worthScore}%
            </span>
          </div>

          {/* Meter Bar */}
          <div style={{ height: '8px', backgroundColor: '#BBF7D0', borderRadius: '999px', overflow: 'hidden', marginBottom: '8px' }}>
            <div
              style={{
                width: `${product.worthScore}%`,
                height: '100%',
                backgroundColor: '#059669',
                borderRadius: '999px',
                transition: 'width 0.6s ease'
              }}
            />
          </div>

          <div style={{ fontSize: '0.72rem', color: '#065F46', lineHeight: 1.4 }}>
            Based on: Price-to-spec ratio, lab durability benchmarks, and verified owner sentiment.
          </div>
        </div>
      </div>

      {/* 2. Verdict Banner */}
      <div
        style={{
          padding: '16px',
          borderRadius: '10px',
          backgroundColor: product.worthScore >= 88 ? '#F0FDF4' : product.isOverhyped ? '#FEF2F2' : '#F8FAFC',
          borderLeft: `4px solid ${product.worthScore >= 88 ? '#059669' : product.isOverhyped ? '#DC2626' : '#2563EB'}`
        }}
      >
        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
          VERDICT: {product.worthScore >= 88 ? 'WORTH THE HYPE' : product.isOverhyped ? 'VALUE GAP DETECTED' : 'SOLID CHOICE'}
        </div>
        <p style={{ margin: 0, fontSize: '0.88rem', color: '#374151', lineHeight: 1.5 }}>
          {product.verdict}
        </p>
      </div>

      {/* 3. Trending Factors & Data Signals (Only in Detailed Mode) */}
      {detailed && (
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '10px' }}>
            Algorithmic Market Factors
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
            <div className="flex items-center gap-xs" style={{ fontSize: '0.8rem', color: '#4B5563' }}>
              <Search size={14} style={{ color: '#2563EB' }} />
              <span>Search volume: <strong>+120% (30d)</strong></span>
            </div>
            <div className="flex items-center gap-xs" style={{ fontSize: '0.8rem', color: '#4B5563' }}>
              <Users size={14} style={{ color: '#059669' }} />
              <span>Community sentiment: <strong>94% Positive</strong></span>
            </div>
            <div className="flex items-center gap-xs" style={{ fontSize: '0.8rem', color: '#4B5563' }}>
              <TrendingUp size={14} style={{ color: '#D97706' }} />
              <span>Review velocity: <strong>2.5x normal</strong></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
