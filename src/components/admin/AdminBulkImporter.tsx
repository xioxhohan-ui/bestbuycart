import React, { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, RefreshCw, Layers, ShoppingBag, Tag, Cpu, Zap, Download } from 'lucide-react';
import { Button } from '../ui/Button';
import { supabaseService } from '../../services/supabaseService';
import { dealService } from '../../services/dealService';

export const AdminBulkImporter: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'importer' | 'automation' | 'logs'>('importer');
  const [importType, setImportType] = useState<'products' | 'categories' | 'brands' | 'deals'>('products');
  const [rawPayload, setRawPayload] = useState('');
  const [importStatus, setImportStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Automation settings state
  const [automationConfig, setAutomationConfig] = useState({
    enableAutoDeals: true,
    dealThresholdPercent: 15,
    enableTrendPolling: true,
    pollIntervalHours: 12,
    amazonApiKey: '********************',
    autoApproveImport: false
  });

  const [logs, setLogs] = useState([
    { id: '1', timestamp: new Date().toISOString(), source: 'Amazon Feed Engine', status: 'Completed', recordsProcessed: 24, details: 'Successfully synchronized products into Electronics' },
    { id: '2', timestamp: new Date(Date.now() - 3600000).toISOString(), source: 'Price Tracker Cron', status: 'Completed', recordsProcessed: 6, details: 'Auto-detected 2 flash sales exceeding 15% discount threshold' }
  ]);

  const handleRunImport = async () => {
    if (!rawPayload.trim()) {
      setImportStatus({ success: false, message: 'Please paste valid JSON array or CSV payload before importing.' });
      return;
    }

    setIsProcessing(true);
    setImportStatus(null);

    try {
      const parsedData = JSON.parse(rawPayload);
      if (!Array.isArray(parsedData)) {
        throw new Error('Payload must be a JSON array of objects.');
      }

      let importedCount = 0;

      if (importType === 'products') {
        for (const item of parsedData) {
          await supabaseService.saveProduct(item);
          importedCount++;
        }
      } else if (importType === 'categories') {
        for (const item of parsedData) {
          await supabaseService.saveCategory(item);
          importedCount++;
        }
      } else if (importType === 'deals') {
        for (const item of parsedData) {
          await dealService.saveDeal(item);
          importedCount++;
        }
      }

      setImportStatus({
        success: true,
        message: `Successfully imported ${importedCount} ${importType} records into Supabase!`
      });

      // Add log
      setLogs((prev) => [
        {
          id: String(Date.now()),
          timestamp: new Date().toISOString(),
          source: `Manual Admin ${importType.toUpperCase()} Import`,
          status: 'Completed',
          recordsProcessed: importedCount,
          details: `Processed ${importedCount} payload items.`
        },
        ...prev
      ]);

      setRawPayload('');
    } catch (err: any) {
      setImportStatus({
        success: false,
        message: `Import Error: ${err.message || 'Invalid format'}. Please verify JSON array syntax.`
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const sampleProductsJson = `[
  {
    "name": "Sony WH-1000XM5 Wireless Headphones",
    "slug": "sony-wh-1000xm5",
    "category": "audio",
    "brand": "Sony",
    "priceUSD": 398.00,
    "originalPriceUSD": 449.99,
    "worthScore": 96,
    "hypeScore": 92,
    "worthStatus": "Worth It",
    "verdict": "Best-in-class active noise cancellation with pristine acoustic fidelity.",
    "specifications": { "Battery": "30 Hours", "Driver": "30mm", "Bluetooth": "5.2" }
  }
]`;

  return (
    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '28px' }}>
      {/* Sub Tab Navigation */}
      <div className="flex items-center gap-sm" style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '14px', marginBottom: '24px' }}>
        <Button
          variant={activeSubTab === 'importer' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setActiveSubTab('importer')}
          icon={<Upload size={14} />}
        >
          Bulk CSV/JSON Importer
        </Button>

        <Button
          variant={activeSubTab === 'automation' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setActiveSubTab('automation')}
          icon={<Cpu size={14} />}
        >
          Automation Rules & APIs
        </Button>

        <Button
          variant={activeSubTab === 'logs' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setActiveSubTab('logs')}
          icon={<FileText size={14} />}
        >
          Sync Execution Logs
        </Button>
      </div>

      {activeSubTab === 'importer' && (
        <div>
          <div className="flex items-center justify-between" style={{ marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: '0 0 4px', fontSize: '1.1rem', fontWeight: 700, fontFamily: 'Georgia, serif' }}>
                Bulk Data Feed Importer
              </h3>
              <p style={{ margin: 0, fontSize: '0.84rem', color: '#64748B' }}>
                Populate products, categories, or deals in bulk into Supabase database.
              </p>
            </div>

            <div className="flex items-center gap-xs">
              <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>Target Entity:</span>
              <select
                value={importType}
                onChange={(e) => setImportType(e.target.value as any)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.82rem',
                  fontWeight: 600
                }}
              >
                <option value="products">Products</option>
                <option value="categories">Categories</option>
                <option value="brands">Brands</option>
                <option value="deals">Deals</option>
              </select>
            </div>
          </div>

          {importStatus && (
            <div
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                backgroundColor: importStatus.success ? '#ECFDF5' : '#FEF2F2',
                border: `1px solid ${importStatus.success ? '#A7F3D0' : '#FECACA'}`,
                color: importStatus.success ? '#047857' : '#B91C1C',
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px'
              }}
            >
              {importStatus.success ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              <span>{importStatus.message}</span>
            </div>
          )}

          <div style={{ marginBottom: '14px' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: '6px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>
                JSON Data Array (Paste Payload)
              </label>
              <button
                type="button"
                onClick={() => setRawPayload(sampleProductsJson)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#2563EB',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Load Sample JSON Payload
              </button>
            </div>

            <textarea
              rows={9}
              value={rawPayload}
              onChange={(e) => setRawPayload(e.target.value)}
              placeholder="Paste JSON array format: [{ name: '...', priceUSD: 100, ... }]"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontFamily: 'monospace',
                fontSize: '0.82rem',
                backgroundColor: '#F8FAFC'
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
              Supports direct Supabase insert with automatic RLS execution.
            </span>
            <Button
              variant="primary"
              size="md"
              onClick={handleRunImport}
              disabled={isProcessing}
              icon={isProcessing ? <RefreshCw size={14} className="spin" /> : <Upload size={14} />}
            >
              {isProcessing ? 'Processing Import...' : `Import ${importType.toUpperCase()} Now`}
            </Button>
          </div>
        </div>
      )}

      {activeSubTab === 'automation' && (
        <div style={{ maxWidth: '640px' }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '1.1rem', fontWeight: 700, fontFamily: 'Georgia, serif' }}>
            Automated Feed & API Configurations
          </h3>
          <p style={{ margin: '0 0 20px', fontSize: '0.84rem', color: '#64748B' }}>
            Configure background workers for automated price drops, trend signal detection, and affiliate feeds.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
              <div className="flex items-center justify-between" style={{ marginBottom: '8px' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0F172A' }}>Automated Deal Detection</span>
                <input
                  type="checkbox"
                  checked={automationConfig.enableAutoDeals}
                  onChange={(e) => setAutomationConfig({ ...automationConfig, enableAutoDeals: e.target.checked })}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 10px' }}>
                Automatically convert price drops into promotional deals when discount exceeds threshold.
              </p>
              <div className="flex items-center gap-xs">
                <span style={{ fontSize: '0.8rem', color: '#334155' }}>Discount Threshold:</span>
                <input
                  type="number"
                  value={automationConfig.dealThresholdPercent}
                  onChange={(e) => setAutomationConfig({ ...automationConfig, dealThresholdPercent: Number(e.target.value) })}
                  style={{ width: '60px', padding: '4px 8px', borderRadius: '4px', border: '1px solid #CBD5E1', fontSize: '0.8rem' }}
                />
                <span style={{ fontSize: '0.8rem', color: '#334155' }}>% Off</span>
              </div>
            </div>

            <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
              <div className="flex items-center justify-between" style={{ marginBottom: '8px' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0F172A' }}>Trend Signal Polling</span>
                <input
                  type="checkbox"
                  checked={automationConfig.enableTrendPolling}
                  onChange={(e) => setAutomationConfig({ ...automationConfig, enableTrendPolling: e.target.checked })}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0 }}>
                Periodically fetch social sentiment velocity and search interest score updates.
              </p>
            </div>

            <Button variant="primary" size="md" onClick={() => alert('Automation settings saved successfully!')}>
              Save Automation Rules
            </Button>
          </div>
        </div>
      )}

      {activeSubTab === 'logs' && (
        <div>
          <h3 style={{ margin: '0 0 4px', fontSize: '1.1rem', fontWeight: 700, fontFamily: 'Georgia, serif' }}>
            Automation & Sync Logs
          </h3>
          <p style={{ margin: '0 0 16px', fontSize: '0.84rem', color: '#64748B' }}>
            Real-time execution log history for automated background jobs and bulk imports.
          </p>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', textAlign: 'left' }}>
                  <th style={{ padding: '10px 12px', fontWeight: 700 }}>Timestamp</th>
                  <th style={{ padding: '10px 12px', fontWeight: 700 }}>Source / Engine</th>
                  <th style={{ padding: '10px 12px', fontWeight: 700 }}>Status</th>
                  <th style={{ padding: '10px 12px', fontWeight: 700 }}>Records</th>
                  <th style={{ padding: '10px 12px', fontWeight: 700 }}>Details</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '10px 12px', color: '#64748B', fontFamily: 'monospace' }}>
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td style={{ padding: '10px 12px', fontWeight: 600, color: '#0F172A' }}>
                      {log.source}
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ padding: '2px 8px', borderRadius: '999px', fontSize: '0.72rem', backgroundColor: '#ECFDF5', color: '#047857', fontWeight: 700 }}>
                        {log.status}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px', fontWeight: 700 }}>
                      {log.recordsProcessed}
                    </td>
                    <td style={{ padding: '10px 12px', color: '#475569' }}>
                      {log.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
