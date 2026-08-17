import React, { useState, useEffect } from 'react';
import { SearchConsoleMetric } from '../../types/content';
import { contentService } from '../../services/contentService';
import { Search, TrendingUp, Compass, Sparkles, ArrowUpRight, BarChart2 } from 'lucide-react';
import { Button } from '../ui/Button';

export const AdminSEOIntelligence: React.FC = () => {
  const [metrics, setMetrics] = useState<SearchConsoleMetric | null>(null);

  useEffect(() => {
    contentService.getSearchConsoleData().then(setMetrics);
  }, []);

  if (!metrics) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Search Console Performance KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Total Organic Clicks</span>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#2563EB', marginTop: '4px' }}>
            {metrics.totalClicks.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, marginTop: '2px' }}>↑ 14.8% past 30 days</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>SERP Impressions</span>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1A1A1A', marginTop: '4px' }}>
            {metrics.totalImpressions.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, marginTop: '2px' }}>Google search visibility</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Average CTR</span>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#059669', marginTop: '4px' }}>
            {metrics.ctrPercent}%
          </div>
          <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, marginTop: '2px' }}>Strong snippet engagement</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Avg SERP Rank</span>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#D97706', marginTop: '4px' }}>
            {metrics.avgPosition}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, marginTop: '2px' }}>Top 1-2 Google page</div>
        </div>
      </div>

      {/* 2. Top Ranking Keywords */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: 'var(--shadow-card)' }}>
        <div className="flex items-center gap-xs" style={{ marginBottom: '20px' }}>
          <Search size={20} style={{ color: '#2563EB' }} />
          <h3 className="h3" style={{ margin: 0, color: '#1A1A1A' }}>
            Top Performing Search Queries
          </h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#4B5563', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 14px' }}>Search Keyword</th>
                <th style={{ padding: '10px 14px' }}>Impressions</th>
                <th style={{ padding: '10px 14px' }}>Clicks</th>
                <th style={{ padding: '10px 14px' }}>CTR</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>Google Rank</th>
              </tr>
            </thead>
            <tbody>
              {metrics.topKeywords.map((k, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#1A1A1A' }}>{k.keyword}</td>
                  <td className="font-mono" style={{ padding: '12px 14px', color: '#4B5563' }}>{k.impressions.toLocaleString()}</td>
                  <td className="font-mono" style={{ padding: '12px 14px', color: '#2563EB', fontWeight: 600 }}>{k.clicks.toLocaleString()}</td>
                  <td className="font-mono" style={{ padding: '12px 14px', color: '#059669', fontWeight: 800 }}>{k.ctr}%</td>
                  <td className="font-mono" style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 800, color: '#2563EB' }}>
                    #{k.position}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Content Gap & High Intent Opportunities */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: 'var(--shadow-card)' }}>
        <div className="flex items-center gap-xs" style={{ marginBottom: '20px' }}>
          <Sparkles size={20} style={{ color: '#059669' }} />
          <h3 className="h3" style={{ margin: 0, color: '#1A1A1A' }}>
            High-Volume Content Gap Opportunities
          </h3>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#4B5563', fontSize: '0.75rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '10px 14px' }}>Target Keyword</th>
              <th style={{ padding: '10px 14px' }}>Search Vol / Mo</th>
              <th style={{ padding: '10px 14px' }}>Keyword Difficulty</th>
              <th style={{ padding: '10px 14px', textAlign: 'right' }}>Recommended Action</th>
            </tr>
          </thead>
          <tbody>
            {metrics.contentOpportunities.map((opp, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 14px', fontWeight: 700, color: '#1A1A1A' }}>{opp.keyword}</td>
                <td className="font-mono" style={{ padding: '12px 14px', color: '#2563EB', fontWeight: 600 }}>{opp.searchVolume.toLocaleString()}</td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{ backgroundColor: opp.difficulty < 40 ? '#ECFDF5' : '#FFFBEB', color: opp.difficulty < 40 ? '#059669' : '#D97706', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                    {opp.difficulty} / 100
                  </span>
                </td>
                <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                  <span style={{ backgroundColor: '#EFF6FF', color: '#2563EB', padding: '3px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                    {opp.suggestedAction}
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
