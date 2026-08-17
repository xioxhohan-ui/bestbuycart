import React, { useState } from 'react';
import { dealService } from '../../services/dealService';
import { Radar, RefreshCw, CheckCircle2, Store, Clock, ArrowDownRight, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';

export const AdminPriceTrackingManager: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanResult, setLastScanResult] = useState<{ detectedDrops: number; checkedCount: number; timestamp: string } | null>(null);

  const [settings, setSettings] = useState({
    frequencyHours: 6,
    retailers: ['Amazon', 'Walmart', 'Best Buy', 'Target'],
    minDiscountPercent: 10,
    autoPublishDeals: true
  });

  const trackedProducts = [
    { name: 'Sony WH-1000XM5', category: 'Tech', currentPrice: '$299.00', bestPrice: '$299.00 (Amazon)', lastCheck: '3 min ago', status: 'Optimal' },
    { name: 'Breville Barista Touch Impress', category: 'Kitchen', currentPrice: '$1,199.95', bestPrice: '$1,199.95 (Best Buy)', lastCheck: '3 min ago', status: 'Optimal' },
    { name: 'Dyson Airwrap Complete Long', category: 'Beauty', currentPrice: '$499.99', bestPrice: '$499.99 (Walmart)', lastCheck: '3 min ago', status: 'Optimal' },
    { name: 'Anker Prime 200W Power Bank', category: 'Tech', currentPrice: '$89.99', bestPrice: '$89.99 (Amazon)', lastCheck: '3 min ago', status: 'Optimal' },
    { name: 'Fellow Ode Gen 2 Grinder', category: 'Kitchen', currentPrice: '$345.00', bestPrice: '$345.00 (Fellow Direct)', lastCheck: '8 min ago', status: 'Monitored' }
  ];

  const priceLogs = [
    { product: 'Sony WH-1000XM5', date: 'Today 10:15 AM', oldPrice: '$349.00', newPrice: '$299.00', action: 'Auto-created Deal (15% drop)' },
    { product: 'Anker Prime 200W', date: 'Today 08:30 AM', oldPrice: '$129.99', newPrice: '$89.99', action: 'Auto-created Flash Sale (31% drop)' },
    { product: 'Dyson Airwrap', date: 'Yesterday 04:00 PM', oldPrice: '$599.99', newPrice: '$499.99', action: 'Price Alert Triggered to 14 Users' }
  ];

  const handleRunScan = async () => {
    setIsScanning(true);
    const res = await dealService.runPriceTrackingScan();
    setTimeout(() => {
      setIsScanning(false);
      setLastScanResult(res);
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Tracker Settings Box */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: 'var(--shadow-card)' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div className="flex items-center gap-xs">
            <Radar size={20} style={{ color: '#2563EB' }} />
            <h3 className="h3" style={{ margin: 0, color: '#1A1A1A' }}>
              Automated Price Monitoring Engine
            </h3>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={handleRunScan}
            disabled={isScanning}
            icon={<RefreshCw size={13} />}
          >
            {isScanning ? 'Scanning Retailer APIs...' : 'Check Prices Now'}
          </Button>
        </div>

        {lastScanResult && (
          <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', padding: '12px 16px', borderRadius: '10px', color: '#065F46', fontSize: '0.85rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={16} />
            <span>
              Real-time check completed at {lastScanResult.timestamp}: Scanned {lastScanResult.checkedCount} SKUs across Amazon, Walmart, Best Buy, and Target. {lastScanResult.detectedDrops} price drops detected.
            </span>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Scan Frequency</label>
            <select
              value={settings.frequencyHours}
              onChange={(e) => setSettings({ ...settings, frequencyHours: Number(e.target.value) })}
              style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.85rem' }}
            >
              <option value="1">Every 1 Hour (Aggressive)</option>
              <option value="6">Every 6 Hours (Standard)</option>
              <option value="12">Every 12 Hours</option>
              <option value="24">Once Daily</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Min Discount % for Deals</label>
            <input
              type="number"
              value={settings.minDiscountPercent}
              onChange={(e) => setSettings({ ...settings, minDiscountPercent: Number(e.target.value) })}
              style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.85rem' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', paddingTop: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', fontWeight: 600, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.autoPublishDeals}
                onChange={(e) => setSettings({ ...settings, autoPublishDeals: e.target.checked })}
                style={{ width: '16px', height: '16px', accentColor: '#059669' }}
              />
              <span>Auto-publish deals when price drops are verified</span>
            </label>
          </div>
        </div>
      </div>

      {/* 2. Tracked Products Table */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: 'var(--shadow-card)' }}>
        <h4 style={{ margin: '0 0 16px', fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#1A1A1A' }}>
          Active Tracked Products (234 SKUs)
        </h4>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#4B5563', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 14px' }}>Product</th>
                <th style={{ padding: '10px 14px' }}>Category</th>
                <th style={{ padding: '10px 14px' }}>Current Price</th>
                <th style={{ padding: '10px 14px' }}>Best Verified Price</th>
                <th style={{ padding: '10px 14px' }}>Last Check</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {trackedProducts.map((p, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#1A1A1A' }}>{p.name}</td>
                  <td style={{ padding: '12px 14px', color: '#6B7280' }}>{p.category}</td>
                  <td className="font-mono" style={{ padding: '12px 14px', fontWeight: 700, color: '#1A1A1A' }}>{p.currentPrice}</td>
                  <td className="font-mono" style={{ padding: '12px 14px', color: '#059669', fontWeight: 800 }}>{p.bestPrice}</td>
                  <td style={{ padding: '12px 14px', color: '#9CA3AF' }}>{p.lastCheck}</td>
                  <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                    <span style={{ backgroundColor: '#ECFDF5', color: '#059669', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Price History Log */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: 'var(--shadow-card)' }}>
        <h4 style={{ margin: '0 0 16px', fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#1A1A1A' }}>
          Recent Price Movement Log
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {priceLogs.map((log, idx) => (
            <div key={idx} className="flex items-center justify-between" style={{ padding: '10px 14px', backgroundColor: '#F8FAFC', borderRadius: '8px', fontSize: '0.84rem' }}>
              <div className="flex items-center gap-md">
                <span style={{ fontWeight: 700, color: '#1A1A1A' }}>{log.product}</span>
                <span style={{ color: '#9CA3AF' }}>•</span>
                <span style={{ color: '#6B7280' }}>{log.date}</span>
                <span style={{ color: '#9CA3AF' }}>•</span>
                <span style={{ color: '#DC2626', textDecoration: 'line-through' }}>{log.oldPrice}</span>
                <span>→</span>
                <span style={{ color: '#059669', fontWeight: 800 }}>{log.newPrice}</span>
              </div>
              <span style={{ backgroundColor: '#EFF6FF', color: '#2563EB', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
                {log.action}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
