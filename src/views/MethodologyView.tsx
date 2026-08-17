import React, { useEffect, useState } from 'react';
import { contentService } from '../services/contentService';
import { MethodologyFactor } from '../types/content';
import { useNavigation } from '../context/NavigationContext';
import { ShieldCheck, Flame, Scale, Award, Info, ChevronRight, Check } from 'lucide-react';
import { updatePageSEO } from '../utils/seo';

export const MethodologyView: React.FC = () => {
  const [factors, setFactors] = useState<MethodologyFactor[]>([]);
  const { navigate } = useNavigation();

  useEffect(() => {
    updatePageSEO(
      'Our Testing Methodology & Scoring Algorithms — Best Buy Cart',
      'Learn how Best Buy Cart calculates Worth The Hype scores, Hype velocity index, and maintains transparent editorial objectivity.'
    );

    contentService.getMethodologyFactors().then((res: MethodologyFactor[]) => setFactors(res));
  }, []);

  return (
    <div style={{ padding: '32px 0 80px' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div className="flex items-center gap-xs" style={{ fontSize: '0.8rem', color: '#6B7280', marginBottom: '20px' }}>
          <span onClick={() => navigate('/')} style={{ cursor: 'pointer', color: '#2563EB', fontWeight: 500 }}>
            Home
          </span>
          <ChevronRight size={13} />
          <span style={{ color: '#1A1A1A', fontWeight: 600 }}>Testing Methodology</span>
        </div>

        {/* Header */}
        <div style={{ maxWidth: '820px', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#EFF6FF', color: '#2563EB', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px' }}>
            <Scale size={13} /> Editorial Integrity & Objectivity
          </div>
          <h1 className="h1" style={{ margin: '0 0 12px', fontSize: '2.4rem', color: '#1A1A1A' }}>
            Our Testing Methodology & Scoring Standards
          </h1>
          <p style={{ color: '#4B5563', margin: 0, fontSize: '1.08rem', lineHeight: 1.6 }}>
            Every product recommended on <strong>Best Buy Cart</strong> is scored by automated multi-source telemetry and empirical benchmark testing. We do not accept paid placements or sponsored ranking slots.
          </p>
        </div>

        {/* 1. WORTH THE HYPE SCORE FORMULA */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1.5px solid var(--border-default)',
            padding: '36px',
            boxShadow: 'var(--shadow-card)',
            marginBottom: '48px'
          }}
        >
          <div className="flex items-center gap-xs" style={{ marginBottom: '12px' }}>
            <ShieldCheck size={24} style={{ color: '#059669' }} />
            <h2 className="h2" style={{ margin: 0, fontSize: '1.4rem', color: '#1A1A1A' }}>
              Worth The Hype Score™ (0–100%)
            </h2>
          </div>
          <p style={{ color: '#4B5563', fontSize: '0.94rem', margin: '0 0 24px', lineHeight: 1.5 }}>
            Our proprietary index assessing whether a viral or popular product genuinely delivers long-term value, build quality, and user satisfaction proportional to its retail price.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {factors.map((factor, idx: number) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: '14px',
                  border: '1px solid #E2E8F0',
                  padding: '18px 20px',
                  display: 'grid',
                  gridTemplateColumns: '80px minmax(0, 1fr)',
                  gap: '20px',
                  alignItems: 'center'
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 900, color: '#059669' }}>
                    {factor.weightPercent}%
                  </div>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Weight</span>
                </div>

                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '1rem', color: '#1A1A1A', fontWeight: 800 }}>
                    {factor.name}
                  </h4>
                  <p style={{ margin: '0 0 8px', fontSize: '0.86rem', color: '#4B5563', lineHeight: 1.4 }}>
                    {factor.description}
                  </p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {factor.signals.map((sig: string, sIdx: number) => (
                      <span key={sIdx} style={{ backgroundColor: '#FFFFFF', border: '1px solid #CBD5E1', padding: '2px 8px', borderRadius: '4px', fontSize: '0.74rem', color: '#334155', fontWeight: 600 }}>
                        {sig}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. HYPE SCORE SIGNALS */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1.5px solid var(--border-default)',
            padding: '36px',
            boxShadow: 'var(--shadow-card)',
            marginBottom: '48px'
          }}
        >
          <div className="flex items-center gap-xs" style={{ marginBottom: '12px' }}>
            <Flame size={24} style={{ color: '#EA580C' }} />
            <h2 className="h2" style={{ margin: 0, fontSize: '1.4rem', color: '#1A1A1A' }}>
              Hype Velocity Index™ (0–100%)
            </h2>
          </div>
          <p style={{ color: '#4B5563', fontSize: '0.94rem', margin: '0 0 24px', lineHeight: 1.5 }}>
            Measures current viral velocity and public interest across global web and social platforms:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div style={{ backgroundColor: '#FFF7ED', padding: '18px', borderRadius: '12px', border: '1px solid #FFEDD5' }}>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#C2410C', marginBottom: '6px' }}>
                1. Search Trend Surge
              </div>
              <p style={{ margin: 0, fontSize: '0.84rem', color: '#9A3412', lineHeight: 1.4 }}>
                Real-time tracking of organic Google Trends search volume spikes across US and European territories.
              </p>
            </div>

            <div style={{ backgroundColor: '#FFF7ED', padding: '18px', borderRadius: '12px', border: '1px solid #FFEDD5' }}>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#C2410C', marginBottom: '6px' }}>
                2. Social Mention Velocity
              </div>
              <p style={{ margin: 0, fontSize: '0.84rem', color: '#9A3412', lineHeight: 1.4 }}>
                Aggregated sentiment and video mention spikes across TikTok, Instagram, and Reddit enthusiast communities.
              </p>
            </div>

            <div style={{ backgroundColor: '#FFF7ED', padding: '18px', borderRadius: '12px', border: '1px solid #FFEDD5' }}>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#C2410C', marginBottom: '6px' }}>
                3. Retail Velocity
              </div>
              <p style={{ margin: 0, fontSize: '0.84rem', color: '#9A3412', lineHeight: 1.4 }}>
                Real-time tracking of Best-Seller category climb velocity across Amazon, Walmart, and Best Buy.
              </p>
            </div>
          </div>
        </div>

        {/* 3. AFFILIATE & ETHICS DISCLOSURE */}
        <div
          style={{
            backgroundColor: '#F8FAFC',
            borderRadius: '20px',
            border: '1px solid #E2E8F0',
            padding: '32px'
          }}
        >
          <div className="flex items-center gap-xs" style={{ marginBottom: '10px' }}>
            <Info size={18} style={{ color: '#2563EB' }} />
            <h3 className="h3" style={{ margin: 0, fontSize: '1.05rem', color: '#1A1A1A' }}>
              FTC & International Affiliate Transparency Statement
            </h3>
          </div>
          <p style={{ color: '#4B5563', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
            Best Buy Cart is an independent editorial product discovery platform. When you click on links to retailers and make a qualifying purchase, we may earn an affiliate commission at no additional cost to you. Our rankings, Worth Scores, and editorial conclusions are strictly algorithmic and independent of merchant relationships.
          </p>
        </div>
      </div>
    </div>
  );
};
