import React from 'react';
import { ScorecardCategory } from '../../types/comparison';
import { Award } from 'lucide-react';

interface ScorecardBarsProps {
  scorecards: ScorecardCategory[];
  nameA: string;
  nameB: string;
}

export const ScorecardBars: React.FC<ScorecardBarsProps> = ({ scorecards, nameA, nameB }) => {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid var(--border-default)',
        padding: '24px',
        boxShadow: 'var(--shadow-card)',
        marginBottom: '36px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #E2E8F0' }}>
        <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#1A1A1A' }}>
          Lab Scorecard & Dimension Breakdown
        </h4>
        <div className="flex items-center gap-md" style={{ fontSize: '0.78rem' }}>
          <span style={{ color: '#2563EB', fontWeight: 700 }}>■ {nameA}</span>
          <span style={{ color: '#64748B', fontWeight: 700 }}>■ {nameB}</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {scorecards.map((sc, idx) => {
          const percentA = (sc.scoreA / 10) * 100;
          const percentB = (sc.scoreB / 10) * 100;
          const isAWinner = sc.winner === 'A';

          return (
            <div key={idx}>
              <div className="flex items-center justify-between" style={{ marginBottom: '6px', fontSize: '0.86rem' }}>
                <span style={{ fontWeight: 700, color: '#1A1A1A' }}>
                  {sc.name} <span style={{ fontSize: '0.72rem', color: '#9CA3AF', fontWeight: 500 }}>({sc.weight}% weight)</span>
                </span>
                <div className="flex items-center gap-md" style={{ fontSize: '0.82rem', fontWeight: 800 }}>
                  <span style={{ color: isAWinner ? '#2563EB' : '#4B5563' }}>{sc.scoreA.toFixed(1)}/10</span>
                  <span style={{ color: '#9CA3AF' }}>vs</span>
                  <span style={{ color: !isAWinner ? '#2563EB' : '#4B5563' }}>{sc.scoreB.toFixed(1)}/10</span>
                </div>
              </div>

              {/* Progress Dual Bar */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div style={{ flex: 1, height: '8px', backgroundColor: '#EFF6FF', borderRadius: '999px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${percentA}%`,
                      height: '100%',
                      backgroundColor: '#2563EB',
                      borderRadius: '999px'
                    }}
                  />
                </div>
                <div style={{ flex: 1, height: '8px', backgroundColor: '#F1F5F9', borderRadius: '999px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${percentB}%`,
                      height: '100%',
                      backgroundColor: '#64748B',
                      borderRadius: '999px'
                    }}
                  />
                </div>
              </div>

              {sc.note && (
                <div style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '4px', fontStyle: 'italic' }}>
                  {sc.note}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
