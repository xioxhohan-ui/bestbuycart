import React, { useEffect, useState } from 'react';
import { contentService } from '../services/contentService';
import { IsItWorthItData } from '../types/content';
import { useCountry } from '../context/CountryContext';
import { useNavigation } from '../context/NavigationContext';
import { HelpCircle, CheckCircle2, XCircle, Trophy, ShieldCheck, Flame, ArrowRight, ExternalLink, ChevronRight, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { updatePageSEO } from '../utils/seo';

export const IsItWorthItView: React.FC = () => {
  const [data, setData] = useState<IsItWorthItData | null>(null);
  const { formatPrice } = useCountry();
  const { navigate } = useNavigation();

  useEffect(() => {
    contentService.getIsItWorthItData().then((res: IsItWorthItData) => {
      setData(res);
      updatePageSEO(
        `Is the ${res.product.name} Worth It? (2026 Honest Assessment)`,
        `Data-backed evaluation of the ${res.product.name}. Noise cancellation benchmarks, Worth Score, and smarter budget alternatives.`
      );
    });
  }, []);

  if (!data) return null;

  return (
    <div style={{ padding: '32px 0 80px' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div className="flex items-center gap-xs" style={{ fontSize: '0.8rem', color: '#6B7280', marginBottom: '20px' }}>
          <span onClick={() => navigate('/')} style={{ cursor: 'pointer', color: '#2563EB', fontWeight: 500 }}>
            Home
          </span>
          <ChevronRight size={13} />
          <span onClick={() => navigate('/guides')} style={{ cursor: 'pointer', color: '#2563EB', fontWeight: 500 }}>
            Guides
          </span>
          <ChevronRight size={13} />
          <span style={{ color: '#1A1A1A', fontWeight: 600 }}>Is It Worth It?</span>
        </div>

        {/* Header */}
        <div style={{ maxWidth: '820px', marginBottom: '36px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#EFF6FF', color: '#2563EB', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px' }}>
            <HelpCircle size={13} /> Algorithmic Product Assessment
          </div>
          <h1 className="h1" style={{ margin: '0 0 10px', fontSize: '2.2rem', color: '#1A1A1A' }}>
            Is the {data.product.name} Worth It?
          </h1>
          <p style={{ color: '#4B5563', margin: 0, fontSize: '1.05rem', lineHeight: 1.5 }}>
            An honest, benchmark-backed breakdown of performance, durability, and value for money.
          </p>
        </div>

        {/* 1. Quick Verdict Box */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '2px solid #2563EB',
            padding: '32px',
            boxShadow: 'var(--shadow-card)',
            marginBottom: '40px'
          }}
        >
          <div className="flex items-center gap-xs" style={{ marginBottom: '12px' }}>
            <Trophy size={20} style={{ color: '#2563EB' }} />
            <h3 className="h3" style={{ margin: 0, fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#1A1A1A' }}>
              Quick Algorithmic Verdict
            </h3>
          </div>

          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1A1A1A', marginBottom: '20px', lineHeight: 1.4 }}>
            {data.verdict.headline}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div style={{ backgroundColor: '#ECFDF5', borderRadius: '12px', padding: '16px', border: '1px solid #A7F3D0' }}>
              <div className="flex items-center gap-xs" style={{ fontWeight: 800, fontSize: '0.85rem', color: '#065F46', marginBottom: '8px' }}>
                <CheckCircle2 size={15} /> BUY IT IF:
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.86rem', color: '#065F46', lineHeight: 1.5 }}>
                {data.verdict.yesConditions.map((cond: string, i: number) => (
                  <li key={i} style={{ marginBottom: '4px' }}>{cond}</li>
                ))}
              </ul>
            </div>

            <div style={{ backgroundColor: '#FEF2F2', borderRadius: '12px', padding: '16px', border: '1px solid #FECACA' }}>
              <div className="flex items-center gap-xs" style={{ fontWeight: 800, fontSize: '0.85rem', color: '#991B1B', marginBottom: '8px' }}>
                <XCircle size={15} /> SKIP IT IF:
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.86rem', color: '#991B1B', lineHeight: 1.5 }}>
                {data.verdict.noConditions.map((cond: string, i: number) => (
                  <li key={i} style={{ marginBottom: '4px' }}>{cond}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 2. The Numbers Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '40px' }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Street Price</span>
            <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1A1A1A', marginTop: '4px' }}>
              {formatPrice(data.metrics.priceUSD)}
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Worth Index</span>
            <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 900, color: '#059669', marginTop: '4px' }}>
              {data.metrics.worthScore}%
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Hype Index</span>
            <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 900, color: '#EA580C', marginTop: '4px' }}>
              {data.metrics.hypeScore}%
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>User Rating</span>
            <div className="font-mono flex items-center justify-center gap-xs" style={{ fontSize: '1.5rem', fontWeight: 900, color: '#D97706', marginTop: '4px' }}>
              <Star size={18} fill="#D97706" style={{ color: '#D97706' }} /> {data.metrics.rating}
            </div>
          </div>
        </div>

        {/* 3. Pros & Cons Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', border: '1px solid var(--border-default)', padding: '24px' }}>
            <h4 className="flex items-center gap-xs" style={{ margin: '0 0 16px', fontSize: '1rem', fontWeight: 800, color: '#059669' }}>
              <CheckCircle2 size={16} /> Verified Highlights
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {data.pros.map((p: string, i: number) => (
                <div key={i} className="flex items-start gap-xs" style={{ fontSize: '0.88rem', color: '#374151' }}>
                  <CheckCircle2 size={16} style={{ color: '#059669', flexShrink: 0, marginTop: '2px' }} />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '18px', border: '1px solid var(--border-default)', padding: '24px' }}>
            <h4 className="flex items-center gap-xs" style={{ margin: '0 0 16px', fontSize: '1rem', fontWeight: 800, color: '#DC2626' }}>
              <XCircle size={16} /> Drawbacks & Limitations
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {data.cons.map((c: string, i: number) => (
                <div key={i} className="flex items-start gap-xs" style={{ fontSize: '0.88rem', color: '#374151' }}>
                  <XCircle size={16} style={{ color: '#DC2626', flexShrink: 0, marginTop: '2px' }} />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Action Buttons */}
        <div className="flex items-center gap-md" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" size="lg" onClick={() => navigate('/product-detail')} icon={<ExternalLink size={16} />}>
            View Retailer Live Prices
          </Button>
          <Button variant="secondary" size="lg" onClick={() => navigate('/compare')}>
            Compare with Alternatives
          </Button>
          <Button variant="ghost" size="lg" onClick={() => navigate('/guides/how-to-choose-headphones')}>
            Read Full Lab Guide
          </Button>
        </div>
      </div>
    </div>
  );
};
