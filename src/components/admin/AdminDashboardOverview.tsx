import React, { useState, useEffect } from 'react';
import { supabaseService } from '../../services/supabaseService';
import { Product } from '../../types/product';
import { AdminActivityLog } from '../../types/admin';
import { Users, DollarSign, TrendingUp, ShieldCheck, AlertCircle, ArrowUpRight, Clock, CheckCircle2 } from 'lucide-react';

export const AdminDashboardOverview: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [logs, setLogs] = useState<AdminActivityLog[]>([]);

  useEffect(() => {
    supabaseService.getProducts().then(setProducts);
    supabaseService.getActivityLogs().then(setLogs);
  }, []);

  const topProducts = [...products].sort((a, b) => b.hypeScore - a.hypeScore).slice(0, 5);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* 1. Metric Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}
      >
        <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: '8px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Monthly Visitors</span>
            <div style={{ padding: '6px', backgroundColor: '#EFF6FF', borderRadius: '8px', color: '#2563EB' }}><Users size={16} /></div>
          </div>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1A1A1A' }}>124,500</div>
          <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700, marginTop: '4px' }}>↑ 18.4% vs last month</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: '8px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Estimated Revenue</span>
            <div style={{ padding: '6px', backgroundColor: '#ECFDF5', borderRadius: '8px', color: '#059669' }}><DollarSign size={16} /></div>
          </div>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1A1A1A' }}>$4,230.50</div>
          <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700, marginTop: '4px' }}>↑ 12.1% affiliate conversions</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: '8px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Trending Velocity</span>
            <div style={{ padding: '6px', backgroundColor: '#FFF7ED', borderRadius: '8px', color: '#EA580C' }}><TrendingUp size={16} /></div>
          </div>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1A1A1A' }}>+34.2%</div>
          <div style={{ fontSize: '0.75rem', color: '#EA580C', fontWeight: 700, marginTop: '4px' }}>42 items surging</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: '8px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Average Worth Score</span>
            <div style={{ padding: '6px', backgroundColor: '#FAF5FF', borderRadius: '8px', color: '#9333EA' }}><ShieldCheck size={16} /></div>
          </div>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1A1A1A' }}>89.4%</div>
          <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700, marginTop: '4px' }}>Lab verified benchmark</div>
        </div>
      </div>

      {/* 2. Top Products & Pending Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Top CTR Products */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '20px', boxShadow: 'var(--shadow-card)' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: '14px' }}>
            <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 700, color: '#1A1A1A' }}>Top Performing Products (CTR)</h4>
            <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>Real-time</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {topProducts.map((p, idx) => (
              <div key={p.id} className="flex items-center justify-between" style={{ fontSize: '0.84rem', padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}>
                <div className="flex items-center gap-xs">
                  <span style={{ color: '#9CA3AF', fontWeight: 700, width: '18px' }}>{idx + 1}.</span>
                  <span style={{ fontWeight: 600, color: '#1A1A1A' }}>{p.name.slice(0, 28)}...</span>
                </div>
                <div className="flex items-center gap-sm">
                  <span style={{ color: '#2563EB', fontWeight: 700 }}>{(12.4 - idx * 0.8).toFixed(1)}% CTR</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Actions & System Health */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '20px', boxShadow: 'var(--shadow-card)' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: '14px' }}>
            <h4 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 700, color: '#1A1A1A' }}>Pending Review & System Tasks</h4>
            <span style={{ fontSize: '0.72rem', backgroundColor: '#FEF3C7', color: '#D97706', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>3 Pending</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem' }}>
            <div className="flex items-center gap-sm" style={{ padding: '8px 12px', backgroundColor: '#F8FAFC', borderRadius: '8px', color: '#374151' }}>
              <AlertCircle size={15} style={{ color: '#D97706', flexShrink: 0 }} />
              <span>5 new price drops detected across Amazon and Best Buy.</span>
            </div>
            <div className="flex items-center gap-sm" style={{ padding: '8px 12px', backgroundColor: '#F8FAFC', borderRadius: '8px', color: '#374151' }}>
              <CheckCircle2 size={15} style={{ color: '#059669', flexShrink: 0 }} />
              <span>All 14 category sitemaps synced and indexable.</span>
            </div>
            <div className="flex items-center gap-sm" style={{ padding: '8px 12px', backgroundColor: '#F8FAFC', borderRadius: '8px', color: '#374151' }}>
              <Clock size={15} style={{ color: '#2563EB', flexShrink: 0 }} />
              <span>Weekly Hype Drop newsletter scheduled for Friday 9:00 AM EST.</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Recent Activity Feed */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '20px', boxShadow: 'var(--shadow-card)' }}>
        <h4 style={{ margin: '0 0 12px', fontSize: '0.92rem', fontWeight: 700, color: '#1A1A1A' }}>Recent Activity Stream</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {logs.slice(0, 4).map((log) => (
            <div key={log.id} className="flex items-center justify-between" style={{ fontSize: '0.82rem', padding: '6px 0', borderBottom: '1px solid #F1F5F9' }}>
              <div className="flex items-center gap-sm">
                <span style={{ backgroundColor: '#EFF6FF', color: '#2563EB', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700 }}>
                  {log.entityType.toUpperCase()}
                </span>
                <span style={{ color: '#1A1A1A', fontWeight: 500 }}>{log.action}</span>
              </div>
              <span style={{ color: '#9CA3AF', fontSize: '0.75rem' }}>{new Date(log.timestamp).toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
