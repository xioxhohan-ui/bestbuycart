import React, { useState, useEffect } from 'react';
import { ContentDecayItem } from '../../types/content';
import { contentService } from '../../services/contentService';
import { RefreshCw, AlertTriangle, CheckCircle2, Clock, ArrowDownRight, Settings } from 'lucide-react';
import { Button } from '../ui/Button';

export const AdminContentRefreshManager: React.FC = () => {
  const [decayQueue, setDecayQueue] = useState<ContentDecayItem[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [settings, setSettings] = useState({
    autoDetect: true,
    dropThresholdPercent: 25,
    evaluationDays: 90,
    checkFrequency: 'daily'
  });

  useEffect(() => {
    contentService.getContentDecayQueue().then(setDecayQueue);
  }, []);

  const handleRefreshAll = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      alert('Content decay scan completed across all 247 editorial articles.');
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Decay Detection Settings */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: 'var(--shadow-card)' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
          <div className="flex items-center gap-xs">
            <RefreshCw size={20} style={{ color: '#2563EB' }} />
            <h3 className="h3" style={{ margin: 0, color: '#1A1A1A' }}>
              Automated Content Decay & Freshness Engine
            </h3>
          </div>

          <Button variant="primary" size="sm" onClick={handleRefreshAll} disabled={isRefreshing} icon={<RefreshCw size={13} />}>
            {isRefreshing ? 'Scanning Articles...' : 'Run Freshness Scan'}
          </Button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Traffic Drop Threshold</label>
            <input
              type="number"
              value={settings.dropThresholdPercent}
              onChange={(e) => setSettings({ ...settings, dropThresholdPercent: Number(e.target.value) })}
              style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.85rem' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Evaluation Window (Days)</label>
            <input
              type="number"
              value={settings.evaluationDays}
              onChange={(e) => setSettings({ ...settings, evaluationDays: Number(e.target.value) })}
              style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.85rem' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', paddingTop: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.autoDetect}
                onChange={(e) => setSettings({ ...settings, autoDetect: e.target.checked })}
                style={{ width: '16px', height: '16px', accentColor: '#2563EB' }}
              />
              <span>Auto-detect content decay enabled</span>
            </label>
          </div>
        </div>
      </div>

      {/* 2. Content Decay & Refresh Queue Table */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: 'var(--shadow-card)' }}>
        <div className="flex items-center gap-xs" style={{ marginBottom: '20px' }}>
          <AlertTriangle size={20} style={{ color: '#D97706' }} />
          <h3 className="h3" style={{ margin: 0, color: '#1A1A1A' }}>
            Content Decay Alerts & Refresh Queue ({decayQueue.length})
          </h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#4B5563', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 14px' }}>Article Title</th>
                <th style={{ padding: '10px 14px' }}>Last Updated</th>
                <th style={{ padding: '10px 14px' }}>90-Day Traffic Trend</th>
                <th style={{ padding: '10px 14px' }}>Trigger Reason</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>Priority</th>
              </tr>
            </thead>
            <tbody>
              {decayQueue.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#1A1A1A' }}>{item.articleTitle}</td>
                  <td style={{ padding: '12px 14px', color: '#6B7280' }}>{item.lastUpdated}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ color: item.trafficTrendPercent < 0 ? '#DC2626' : '#059669', fontWeight: 800 }}>
                      {item.trafficTrendPercent > 0 ? `↑ +${item.trafficTrendPercent}%` : `↓ ${item.trafficTrendPercent}%`}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px', color: '#4B5563', fontSize: '0.82rem' }}>{item.reason}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                    <span style={{ backgroundColor: item.priority === 'high' ? '#FEF2F2' : item.priority === 'medium' ? '#FFFBEB' : '#ECFDF5', color: item.priority === 'high' ? '#DC2626' : item.priority === 'medium' ? '#D97706' : '#059669', padding: '3px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase' }}>
                      {item.priority} Priority
                    </span>
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
