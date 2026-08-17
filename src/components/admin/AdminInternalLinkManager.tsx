import React, { useState, useEffect } from 'react';
import { InternalLinkSuggestion } from '../../types/comparison';
import { seoService } from '../../services/seoService';
import { Network, Check, Sparkles, ArrowRight, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';

export const AdminInternalLinkManager: React.FC = () => {
  const [suggestions, setSuggestions] = useState<InternalLinkSuggestion[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    seoService.getInternalLinkSuggestions().then(setSuggestions);
  }, []);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      alert('Internal Linking scan complete: 3 high-authority semantic suggestions generated.');
    }, 1000);
  };

  const handleApply = (id: string) => {
    setSuggestions(suggestions.map((s) => (s.id === id ? { ...s, status: 'applied' } : s)));
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: 'var(--shadow-card)' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div className="flex items-center gap-xs">
          <Network size={20} style={{ color: '#2563EB' }} />
          <h3 className="h3" style={{ margin: 0, color: '#1A1A1A' }}>
            Automated Internal Linking Engine (Topic Clusters)
          </h3>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleScan}
          disabled={isScanning}
          icon={<RefreshCw size={13} />}
        >
          {isScanning ? 'Scanning Cluster Network...' : 'Analyze Page Graph'}
        </Button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#4B5563', fontSize: '0.75rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '10px 14px' }}>Source Page</th>
              <th style={{ padding: '10px 14px' }}>Target Destination</th>
              <th style={{ padding: '10px 14px' }}>Contextual Anchor Text</th>
              <th style={{ padding: '10px 14px' }}>Relevance Score</th>
              <th style={{ padding: '10px 14px' }}>Status</th>
              <th style={{ padding: '10px 14px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suggestions.map((s) => (
              <tr key={s.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 14px', fontWeight: 700, color: '#1A1A1A' }}>
                  {s.sourcePageTitle}
                </td>
                <td style={{ padding: '12px 14px', color: '#2563EB' }}>{s.targetUrl}</td>
                <td style={{ padding: '12px 14px', fontWeight: 600, color: '#4B5563' }}>"{s.suggestedAnchor}"</td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{ backgroundColor: '#ECFDF5', color: '#059669', padding: '2px 8px', borderRadius: '4px', fontWeight: 800, fontSize: '0.78rem' }}>
                    {s.relevanceScore}%
                  </span>
                </td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{ backgroundColor: s.status === 'applied' ? '#EFF6FF' : '#FFFBEB', color: s.status === 'applied' ? '#2563EB' : '#D97706', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>
                    {s.status}
                  </span>
                </td>
                <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                  {s.status === 'pending' ? (
                    <button
                      onClick={() => handleApply(s.id)}
                      className="btn btn-primary btn-sm"
                      style={{ fontSize: '0.75rem', padding: '4px 8px' }}
                    >
                      Apply Link
                    </button>
                  ) : (
                    <span style={{ fontSize: '0.78rem', color: '#059669', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                      <Check size={12} /> Active
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
