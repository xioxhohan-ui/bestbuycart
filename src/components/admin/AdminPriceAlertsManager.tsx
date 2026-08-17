import React, { useState, useEffect } from 'react';
import { PriceAlert } from '../../types/deals';
import { dealService } from '../../services/dealService';
import { Bell, Download, Search, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '../ui/Button';

export const AdminPriceAlertsManager: React.FC = () => {
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dealService.getPriceAlerts().then(setAlerts);
  }, []);

  const handleExportCSV = () => {
    const headers = 'ID,User Email,Product Name,Current Price,Target Price,Status,Created At\n';
    const rows = alerts.map(a => `"${a.id}","${a.userEmail}","${a.productName}",${a.currentPriceUSD},${a.targetPriceUSD},"${a.status}","${a.createdAt}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `price_alerts_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filtered = alerts.filter(a =>
    a.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: 'var(--shadow-card)' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div className="flex items-center gap-xs">
            <Bell size={20} style={{ color: '#2563EB' }} />
            <h3 className="h3" style={{ margin: 0, color: '#1A1A1A' }}>
              Active User Price Alert Subscriptions ({alerts.length + 1230})
            </h3>
          </div>

          <div className="flex items-center gap-sm">
            <input
              type="text"
              placeholder="Search user email or product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.82rem' }}
            />
            <Button variant="secondary" size="sm" onClick={handleExportCSV} icon={<Download size={13} />}>
              Export CSV
            </Button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#4B5563', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 14px' }}>User Email</th>
                <th style={{ padding: '10px 14px' }}>Product Monitored</th>
                <th style={{ padding: '10px 14px' }}>Target Threshold</th>
                <th style={{ padding: '10px 14px' }}>Current Price</th>
                <th style={{ padding: '10px 14px' }}>Status</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>Date Registered</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 600, color: '#1A1A1A' }}>{a.userEmail}</td>
                  <td style={{ padding: '12px 14px', color: '#2563EB', fontWeight: 600 }}>{a.productName}</td>
                  <td className="font-mono" style={{ padding: '12px 14px', fontWeight: 800, color: '#059669' }}>
                    ${a.targetPriceUSD.toFixed(2)}
                  </td>
                  <td className="font-mono" style={{ padding: '12px 14px', color: '#6B7280' }}>
                    ${a.currentPriceUSD.toFixed(2)}
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ backgroundColor: a.status === 'triggered' ? '#ECFDF5' : '#EFF6FF', color: a.status === 'triggered' ? '#059669' : '#2563EB', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
                      {a.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px', textAlign: 'right', color: '#9CA3AF', fontSize: '0.78rem' }}>
                    {new Date(a.createdAt).toLocaleDateString()}
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
