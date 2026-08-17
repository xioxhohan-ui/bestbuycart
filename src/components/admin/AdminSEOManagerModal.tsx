import React, { useState, useEffect } from 'react';
import { ComparisonSEO, ProductComparison } from '../../types/comparison';
import { seoService, SEOAuditResult } from '../../services/seoService';
import { Search, Globe, Share2, Code2, Shield, Check, AlertCircle, RefreshCw, X, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';

interface AdminSEOManagerModalProps {
  comparison: ProductComparison;
  onClose: () => void;
  onSaved: (updatedSEO: ComparisonSEO) => void;
}

export const AdminSEOManagerModal: React.FC<AdminSEOManagerModalProps> = ({
  comparison,
  onClose,
  onSaved
}) => {
  const [activeTab, setActiveTab] = useState<'meta' | 'opengraph' | 'schema' | 'indexing'>('meta');

  const [seoState, setSeoState] = useState<ComparisonSEO>({
    metaTitle: comparison.seo.metaTitle || comparison.title,
    metaDescription: comparison.seo.metaDescription || '',
    focusKeyword: comparison.seo.focusKeyword || '',
    slug: comparison.seo.slug || comparison.slug,
    seoScore: comparison.seo.seoScore || 85,
    keywordDensity: comparison.seo.keywordDensity || 2.4,
    readabilityScore: comparison.seo.readabilityScore || 88,
    ogTitle: comparison.seo.ogTitle || comparison.title,
    ogDescription: comparison.seo.ogDescription || comparison.seo.metaDescription || '',
    canonicalUrl: comparison.seo.canonicalUrl || `https://bestbuycart.com/compare/${comparison.slug}`,
    indexable: comparison.seo.indexable !== false,
    inSitemap: comparison.seo.inSitemap !== false
  });

  const [auditResult, setAuditResult] = useState<SEOAuditResult>(() =>
    seoService.calculateSEOScore(seoState.metaTitle, seoState.metaDescription, seoState.focusKeyword, comparison.verdictText)
  );

  useEffect(() => {
    const result = seoService.calculateSEOScore(
      seoState.metaTitle,
      seoState.metaDescription,
      seoState.focusKeyword,
      comparison.verdictText
    );
    setAuditResult(result);
    setSeoState((prev) => ({
      ...prev,
      seoScore: result.score,
      keywordDensity: result.density,
      readabilityScore: result.readability
    }));
  }, [seoState.metaTitle, seoState.metaDescription, seoState.focusKeyword]);

  const jsonLdPreview = seoService.generateComparisonSchema(comparison, seoState.canonicalUrl || '');

  const handleSave = () => {
    onSaved(seoState);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        style={{
          maxWidth: '820px',
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div>
            <div className="flex items-center gap-xs" style={{ marginBottom: '4px' }}>
              <Globe size={18} style={{ color: '#2563EB' }} />
              <h3 className="h3" style={{ margin: 0, color: '#1A1A1A' }}>
                SEO & Schema Markup Control: {comparison.title}
              </h3>
            </div>
            <span style={{ fontSize: '0.78rem', color: '#6B7280' }}>
              WordPress-grade on-page metadata, rich snippets, and social graph manager.
            </span>
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-sm">
            <X size={20} />
          </button>
        </div>

        {/* SEO Score Bar */}
        <div
          style={{
            padding: '12px 24px',
            backgroundColor: auditResult.score >= 80 ? '#F0FDF4' : '#FFFBEB',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div className="flex items-center gap-md">
            <div className="flex items-center gap-xs">
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#4B5563' }}>SEO Score:</span>
              <span
                style={{
                  fontWeight: 900,
                  fontSize: '1rem',
                  color: auditResult.score >= 80 ? '#059669' : '#D97706'
                }}
              >
                {auditResult.score}/100
              </span>
            </div>
            <div className="flex items-center gap-xs" style={{ fontSize: '0.78rem', color: '#4B5563' }}>
              <span>Keyword Density: <strong>{auditResult.density}%</strong></span>
              <span>•</span>
              <span>Readability: <strong>{auditResult.readability}%</strong></span>
            </div>
          </div>

          <span className="flex items-center gap-xs" style={{ fontSize: '0.75rem', fontWeight: 700, color: auditResult.score >= 80 ? '#059669' : '#D97706' }}>
            {auditResult.score >= 80 ? <CheckCircle2 size={13} /> : <AlertTriangle size={13} />}
            {auditResult.score >= 80 ? 'Ready to Index' : 'Optimizations Recommended'}
          </span>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', padding: '0 24px', backgroundColor: '#F8FAFC' }}>
          {[
            { id: 'meta', label: 'Meta Tags', icon: <Search size={14} /> },
            { id: 'opengraph', label: 'OpenGraph & Social', icon: <Share2 size={14} /> },
            { id: 'schema', label: 'JSON-LD Schema', icon: <Code2 size={14} /> },
            { id: 'indexing', label: 'Indexing & Robots', icon: <Shield size={14} /> }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '12px 16px',
                border: 'none',
                borderBottom: `2px solid ${activeTab === t.id ? '#2563EB' : 'transparent'}`,
                backgroundColor: 'transparent',
                color: activeTab === t.id ? '#2563EB' : '#6B7280',
                fontSize: '0.84rem',
                fontWeight: activeTab === t.id ? 700 : 500,
                cursor: 'pointer'
              }}
            >
              {t.icon}
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* TAB 1: META TAGS */}
          {activeTab === 'meta' && (
            <>
              <div>
                <div className="flex items-center justify-between" style={{ marginBottom: '4px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563' }}>SEO Title ({seoState.metaTitle.length}/60 chars)</label>
                  <span style={{ fontSize: '0.7rem', color: seoState.metaTitle.length <= 60 ? '#059669' : '#DC2626' }}>
                    {seoState.metaTitle.length <= 60 ? 'Optimal' : 'Too Long'}
                  </span>
                </div>
                <input
                  type="text"
                  value={seoState.metaTitle}
                  onChange={(e) => setSeoState({ ...seoState, metaTitle: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <div className="flex items-center justify-between" style={{ marginBottom: '4px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563' }}>Meta Description ({seoState.metaDescription.length}/160 chars)</label>
                  <span style={{ fontSize: '0.7rem', color: seoState.metaDescription.length <= 160 ? '#059669' : '#DC2626' }}>
                    {seoState.metaDescription.length <= 160 ? 'Optimal' : 'Too Long'}
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={seoState.metaDescription}
                  onChange={(e) => setSeoState({ ...seoState, metaDescription: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.86rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Focus Keyword</label>
                <input
                  type="text"
                  value={seoState.focusKeyword}
                  onChange={(e) => setSeoState({ ...seoState, focusKeyword: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                />
              </div>

              {/* SERP Search Preview */}
              <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Google Search Snippet Preview
                </div>
                <div style={{ fontSize: '0.8rem', color: '#1A0DAB', textDecoration: 'underline', fontWeight: 700, marginBottom: '2px' }}>
                  {seoState.metaTitle}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#006621', marginBottom: '4px' }}>
                  https://bestbuycart.com/compare/{seoState.slug}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#4D5156', lineHeight: 1.4 }}>
                  {seoState.metaDescription || 'No description provided.'}
                </div>
              </div>
            </>
          )}

          {/* TAB 2: OPENGRAPH */}
          {activeTab === 'opengraph' && (
            <>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>OG Social Title</label>
                <input
                  type="text"
                  value={seoState.ogTitle}
                  onChange={(e) => setSeoState({ ...seoState, ogTitle: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>OG Social Description</label>
                <textarea
                  rows={3}
                  value={seoState.ogDescription}
                  onChange={(e) => setSeoState({ ...seoState, ogDescription: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.86rem' }}
                />
              </div>
            </>
          )}

          {/* TAB 3: SCHEMA MARKUP */}
          {activeTab === 'schema' && (
            <div>
              <div className="flex items-center justify-between" style={{ marginBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563' }}>Auto-Generated JSON-LD Schema (ComparisonPage)</span>
                <span className="flex items-center gap-xs" style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700 }}>
                  <CheckCircle2 size={12} /> Valid Schema.org Structured Data
                </span>
              </div>
              <textarea
                readOnly
                rows={12}
                value={jsonLdPreview}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: '#0F172A',
                  color: '#38BDF8',
                  fontFamily: 'monospace',
                  fontSize: '0.78rem',
                  border: '1px solid #334155'
                }}
              />
            </div>
          )}

          {/* TAB 4: INDEXING */}
          {activeTab === 'indexing' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={seoState.indexable}
                  onChange={(e) => setSeoState({ ...seoState, indexable: e.target.checked })}
                  style={{ width: '16px', height: '16px', accentColor: '#2563EB' }}
                />
                <span>Allow Search Engines to Index this Comparison (index, follow)</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={seoState.inSitemap}
                  onChange={(e) => setSeoState({ ...seoState, inSitemap: e.target.checked })}
                  style={{ width: '16px', height: '16px', accentColor: '#059669' }}
                />
                <span>Include in XML Sitemaps</span>
              </label>

              <div style={{ marginTop: '10px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Canonical URL</label>
                <input
                  type="text"
                  value={seoState.canonicalUrl}
                  onChange={(e) => setSeoState({ ...seoState, canonicalUrl: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-sm" style={{ padding: '16px 24px', borderTop: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
          <Button variant="secondary" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="md" onClick={handleSave}>
            Save SEO Metadata
          </Button>
        </div>
      </div>
    </div>
  );
};
