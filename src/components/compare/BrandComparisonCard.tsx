import React from 'react';
import { BrandComparison } from '../../types/comparison';
import { Trophy, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface BrandComparisonCardProps {
  comparison: BrandComparison;
}

export const BrandComparisonCard: React.FC<BrandComparisonCardProps> = ({ comparison }) => {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        border: '1.5px solid var(--border-default)',
        padding: '36px',
        boxShadow: 'var(--shadow-card)',
        marginBottom: '48px'
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#EFF6FF', color: '#2563EB', padding: '4px 12px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px' }}>
          Brand Ecosystem Faceoff
        </div>
        <h1 className="h1" style={{ margin: '0 0 10px', color: '#1A1A1A' }}>
          {comparison.brandA} vs {comparison.brandB}
        </h1>
        <p style={{ color: '#4B5563', fontSize: '0.98rem', maxWidth: '680px', margin: '0 auto' }}>
          {comparison.summary}
        </p>
      </div>

      {/* 1. Brand Scorecard */}
      <div style={{ backgroundColor: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', marginBottom: '36px' }}>
        <h3 className="h3" style={{ margin: '0 0 16px', color: '#1A1A1A', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Brand-Level Scorecard
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {comparison.scorecards.map((sc, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between" style={{ fontSize: '0.86rem', marginBottom: '4px' }}>
                <span style={{ fontWeight: 700, color: '#1A1A1A' }}>{sc.name}</span>
                <span style={{ fontWeight: 800, color: sc.winner === 'A' ? '#2563EB' : '#1A1A1A' }}>
                  {sc.winner === 'A' ? `${comparison.brandA} (+${(sc.scoreA - sc.scoreB).toFixed(1)})` : `${comparison.brandB} (+${(sc.scoreB - sc.scoreA).toFixed(1)})`}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '6px', height: '8px' }}>
                <div style={{ flex: sc.scoreA, backgroundColor: '#2563EB', borderRadius: '4px' }} />
                <div style={{ flex: sc.scoreB, backgroundColor: '#94A3B8', borderRadius: '4px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Product Lineup Table */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', fontWeight: 800, fontSize: '0.9rem', color: '#1A1A1A' }}>
          Direct Category Lineup Head-to-Head
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #E2E8F0', color: '#6B7280', fontSize: '0.75rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '12px 16px' }}>Category</th>
              <th style={{ padding: '12px 16px', color: '#2563EB' }}>{comparison.brandA} Champion</th>
              <th style={{ padding: '12px 16px' }}>{comparison.brandB} Champion</th>
              <th style={{ padding: '12px 16px' }}>Winner</th>
            </tr>
          </thead>
          <tbody>
            {comparison.lineup.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 16px', fontWeight: 700, color: '#1A1A1A' }}>{item.category}</td>
                <td style={{ padding: '12px 16px', color: '#2563EB', fontWeight: 600 }}>{item.brandABest}</td>
                <td style={{ padding: '12px 16px', color: '#4B5563', fontWeight: 600 }}>{item.brandBBest}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ backgroundColor: '#ECFDF5', color: '#059669', padding: '3px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                    {item.winner}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
