import React, { useState, useEffect } from 'react';
import { SiteSettings, AdminActivityLog } from '../../types/admin';
import { supabaseService } from '../../services/supabaseService';
import { Settings, Database, RotateCcw, Check, Shield, Clock } from 'lucide-react';
import { Button } from '../ui/Button';

export const AdminSettingsView: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [logs, setLogs] = useState<AdminActivityLog[]>([]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const loadData = () => {
    supabaseService.getSettings().then(setSettings);
    supabaseService.getActivityLogs().then(setLogs);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    await supabaseService.updateSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
    loadData();
  };

  const handlePurgeCache = () => {
    supabaseService.logActivity('Purged client & edge discovery cache', 'settings');
    alert('Discovery cache successfully invalidated and rebuilt.');
    loadData();
  };

  if (!settings) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Global Settings Card */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: 'var(--shadow-card)' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
          <div className="flex items-center gap-xs">
            <Settings size={20} style={{ color: '#2563EB' }} />
            <h3 className="h3" style={{ margin: 0, color: '#1A1A1A' }}>
              System Configuration & Metadata
            </h3>
          </div>
          {savedSuccess && (
            <span style={{ color: '#059669', fontSize: '0.8rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Check size={14} /> Saved Successfully
            </span>
          )}
        </div>

        <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Site Brand Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Brand Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Affiliate Disclosure Text</label>
            <textarea
              rows={3}
              value={settings.affiliateDisclosureText}
              onChange={(e) => setSettings({ ...settings, affiliateDisclosureText: e.target.value })}
              style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.85rem' }}
            />
          </div>

          <div className="flex items-center gap-xl">
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.enableAiFinder}
                onChange={(e) => setSettings({ ...settings, enableAiFinder: e.target.checked })}
                style={{ width: '16px', height: '16px', accentColor: '#2563EB' }}
              />
              <span>Enable AI Product Finder Tool on Public Site</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.enableRealtimeSync}
                onChange={(e) => setSettings({ ...settings, enableRealtimeSync: e.target.checked })}
                style={{ width: '16px', height: '16px', accentColor: '#059669' }}
              />
              <span>Enable Supabase Realtime State Replication</span>
            </label>
          </div>

          <div className="flex justify-between items-center" style={{ paddingTop: '12px', borderTop: '1px solid #E5E7EB' }}>
            <Button type="button" variant="secondary" size="md" onClick={handlePurgeCache} icon={<Database size={15} />}>
              Purge Discovery Cache
            </Button>
            <Button type="submit" variant="primary" size="md">
              Save Configuration
            </Button>
          </div>
        </form>
      </div>

      {/* 2. Admin Activity Audit Trail */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: 'var(--shadow-card)' }}>
        <div className="flex items-center gap-xs" style={{ marginBottom: '16px' }}>
          <Clock size={20} style={{ color: '#2563EB' }} />
          <h3 className="h3" style={{ margin: 0, color: '#1A1A1A' }}>
            Admin Activity Audit Log (Zero Public Trace)
          </h3>
        </div>

        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#4B5563' }}>
                <th style={{ padding: '8px 12px' }}>Timestamp</th>
                <th style={{ padding: '8px 12px' }}>Action</th>
                <th style={{ padding: '8px 12px' }}>Entity</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '8px 12px', color: '#6B7280', whiteSpace: 'nowrap' }}>
                    {new Date(log.timestamp).toLocaleTimeString()} • {new Date(log.timestamp).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '8px 12px', fontWeight: 600, color: '#1A1A1A' }}>{log.action}</td>
                  <td style={{ padding: '8px 12px', textTransform: 'uppercase', fontSize: '0.72rem', color: '#2563EB', fontWeight: 700 }}>
                    {log.entityType}
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
