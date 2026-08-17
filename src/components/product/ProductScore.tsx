import React, { useState } from 'react';
import { Flame, Star, Info, ShieldCheck, TrendingUp } from 'lucide-react';
import { ScoreBreakdown } from '../../types/score';

interface ProductScoreProps {
  hypeScore: number;
  worthScore: number;
  breakdown?: ScoreBreakdown;
  size?: 'sm' | 'md' | 'lg';
  showBreakdownModal?: boolean;
}

export const ProductScore: React.FC<ProductScoreProps> = ({
  hypeScore,
  worthScore,
  breakdown,
  size = 'md'
}) => {
  const [activeTooltip, setActiveTooltip] = useState<'hype' | 'worth' | null>(null);

  const getHypeColor = (score: number) => {
    if (score >= 90) return { bg: '#FFF7ED', text: '#EA580C', border: '#FFEDD5' };
    if (score >= 80) return { bg: '#FEF3C7', text: '#D97706', border: '#FDE68A' };
    return { bg: '#F1F5F9', text: '#64748B', border: '#E2E8F0' };
  };

  const getWorthColor = (score: number) => {
    if (score >= 90) return { bg: '#ECFDF5', text: '#059669', border: '#A7F3D0' };
    if (score >= 75) return { bg: '#F0FDF4', text: '#16A34A', border: '#DCFCE7' };
    return { bg: '#FEF2F2', text: '#DC2626', border: '#FECACA' };
  };

  const hypeStyle = getHypeColor(hypeScore);
  const worthStyle = getWorthColor(worthScore);

  return (
    <div className="flex items-center gap-xs relative" style={{ flexWrap: 'wrap' }}>
      {/* Hype Score Pill */}
      <div
        className="score-pill"
        style={{
          backgroundColor: hypeStyle.bg,
          color: hypeStyle.text,
          borderColor: hypeStyle.border,
          borderWidth: '1px',
          borderStyle: 'solid'
        }}
        onMouseEnter={() => setActiveTooltip('hype')}
        onMouseLeave={() => setActiveTooltip(null)}
        onClick={(e) => {
          e.stopPropagation();
          setActiveTooltip(activeTooltip === 'hype' ? null : 'hype');
        }}
        title="Click for Hype breakdown"
      >
        <Flame size={13} strokeWidth={2.5} />
        <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Hype</span>
        <span className="score-num font-mono">{hypeScore}</span>
        <span className="score-denom">/100</span>
      </div>

      {/* Worth Score Pill */}
      <div
        className="score-pill"
        style={{
          backgroundColor: worthStyle.bg,
          color: worthStyle.text,
          borderColor: worthStyle.border,
          borderWidth: '1px',
          borderStyle: 'solid'
        }}
        onMouseEnter={() => setActiveTooltip('worth')}
        onMouseLeave={() => setActiveTooltip(null)}
        onClick={(e) => {
          e.stopPropagation();
          setActiveTooltip(activeTooltip === 'worth' ? null : 'worth');
        }}
        title="Click for Worth breakdown"
      >
        <Star size={12} fill="currentColor" />
        <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Worth</span>
        <span className="score-num font-mono">{worthScore}</span>
        <span className="score-denom">/100</span>
      </div>

      {/* Popover Tooltip for Hype */}
      {activeTooltip === 'hype' && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: 0,
            marginBottom: '8px',
            width: '260px',
            backgroundColor: '#1A1A1A',
            color: '#FFFFFF',
            borderRadius: '12px',
            padding: '12px 14px',
            fontSize: '0.78rem',
            lineHeight: 1.4,
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            zIndex: 30,
            pointerEvents: 'none'
          }}
        >
          <div className="flex items-center gap-xs" style={{ color: '#F97316', fontWeight: 700, marginBottom: '4px' }}>
            <TrendingUp size={14} />
            <span>Hype Score ({hypeScore}/100)</span>
          </div>
          <p style={{ color: '#D1D5DB', margin: 0, fontSize: '0.75rem' }}>
            Measures viral search velocity, social discussions, and market momentum across US & European commerce channels.
          </p>
        </div>
      )}

      {/* Popover Tooltip for Worth */}
      {activeTooltip === 'worth' && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: 0,
            marginBottom: '8px',
            width: '260px',
            backgroundColor: '#1A1A1A',
            color: '#FFFFFF',
            borderRadius: '12px',
            padding: '12px 14px',
            fontSize: '0.78rem',
            lineHeight: 1.4,
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            zIndex: 30,
            pointerEvents: 'none'
          }}
        >
          <div className="flex items-center gap-xs" style={{ color: '#34D399', fontWeight: 700, marginBottom: '4px' }}>
            <ShieldCheck size={14} />
            <span>Worth Score ({worthScore}/100)</span>
          </div>
          <p style={{ color: '#D1D5DB', margin: 0, fontSize: '0.75rem' }}>
            Our editorial intelligence score evaluating verified build quality, feature completeness, durability, and true value for money.
          </p>
        </div>
      )}
    </div>
  );
};
