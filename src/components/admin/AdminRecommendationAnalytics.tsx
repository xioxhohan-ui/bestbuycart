import React, { useState, useEffect } from 'react';
import { RecommendationAnalytics } from '../../types/gifts';
import { giftService } from '../../services/giftService';
import { BarChart3, TrendingUp, DollarSign, MousePointer, Award } from 'lucide-react';

export const AdminRecommendationAnalytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<RecommendationAnalytics | null>(null);

  useEffect(() => {
    giftService.getRecommendationAnalytics().then(setAnalytics);
  }, []);

  if (!analytics) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Analytics KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Total Impressions</span>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1A1A1A', marginTop: '4px' }}>
            {analytics.totalImpressions.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, marginTop: '2px' }}>Across Gift & Cross-Sell widgets</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Click-Through Rate</span>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#2563EB', marginTop: '4px' }}>
            {analytics.ctrPercent}%
          </div>
          <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, marginTop: '2px' }}>↑ 3.2% vs standard store grids</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Conversion Rate</span>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#059669', marginTop: '4px' }}>
            {analytics.conversionRatePercent}%
          </div>
          <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, marginTop: '2px' }}>High buyer intent</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Attributed Revenue</span>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1A1A1A', marginTop: '4px' }}>
            ${analytics.revenueGeneratedUSD.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, marginTop: '2px' }}>Direct recommendation sales</div>
        </div>
      </div>

      {/* 2. Top Performing Recommendations Leaderboard */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: 'var(--shadow-card)' }}>
        <div className="flex items-center gap-xs" style={{ marginBottom: '20px' }}>
          <Award size={20} style={{ color: '#D97706' }} />
          <h3 className="h3" style={{ margin: 0, color: '#1A1A1A' }}>
            Top Recommending Product Performance Leaderboard
          </h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#4B5563', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 14px' }}>Product Name</th>
                <th style={{ padding: '10px 14px' }}>Impressions</th>
                <th style={{ padding: '10px 14px' }}>Clicks</th>
                <th style={{ padding: '10px 14px' }}>CTR</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>Direct Sales</th>
              </tr>
            </thead>
            <tbody>
              {analytics.topProducts.map((p, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#1A1A1A' }}>{p.name}</td>
                  <td className="font-mono" style={{ padding: '12px 14px', color: '#4B5563' }}>{p.impressions.toLocaleString()}</td>
                  <td className="font-mono" style={{ padding: '12px 14px', color: '#2563EB', fontWeight: 600 }}>{p.clicks.toLocaleString()}</td>
                  <td className="font-mono" style={{ padding: '12px 14px', color: '#059669', fontWeight: 800 }}>{p.ctr}%</td>
                  <td className="font-mono" style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 800, color: '#1A1A1A' }}>
                    {p.salesCount} units
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
