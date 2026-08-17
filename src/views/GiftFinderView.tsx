import React, { useEffect, useState } from 'react';
import { GiftWizard } from '../components/gifts/GiftWizard';
import { giftService } from '../services/giftService';
import { GiftRecipient, GiftOccasion } from '../types/gifts';
import { useNavigation } from '../context/NavigationContext';
import { useCountry } from '../context/CountryContext';
import { Gift, Sparkles, ChevronRight, User, Heart, HeartHandshake, Users, ArrowRight } from 'lucide-react';
import { updatePageSEO } from '../utils/seo';

export const GiftFinderView: React.FC = () => {
  const [recipients, setRecipients] = useState<GiftRecipient[]>([]);
  const [occasions, setOccasions] = useState<GiftOccasion[]>([]);
  const { navigate } = useNavigation();
  const { formatPrice } = useCountry();

  useEffect(() => {
    updatePageSEO(
      'AI Gift Finder & Personal Recommendation Engine — Best Buy Cart',
      'Discover personalized gift recommendations tailored by recipient, occasion, budget, and interests.'
    );

    giftService.getRecipients().then(setRecipients);
    giftService.getOccasions().then(setOccasions);
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
          <span style={{ color: '#1A1A1A', fontWeight: 600 }}>Gift Finder & Recommendation Engine</span>
        </div>

        {/* Hub Header */}
        <div style={{ marginBottom: '36px' }}>
          <div className="flex items-center gap-xs" style={{ marginBottom: '8px' }}>
            <Gift size={26} style={{ color: '#2563EB' }} />
            <h1 className="h1" style={{ margin: 0 }}>
              AI Gift Finder & Personal Recommendation Engine
            </h1>
          </div>
          <p style={{ color: '#4B5563', margin: 0, fontSize: '1.02rem', maxWidth: '720px' }}>
            Find the perfect gift in seconds. Just answer 4 simple questions and get algorithmically matched recommendations backed by real benchmark scores.
          </p>
        </div>

        {/* 1. Quick Recipient & Occasion Shortcuts */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid var(--border-default)',
            padding: '24px',
            boxShadow: 'var(--shadow-card)',
            marginBottom: '36px'
          }}
        >
          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
            Who are you buying for?
          </div>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '20px' }}>
            {recipients.map((r) => (
              <button
                key={r.id}
                onClick={() => {}}
                className="btn btn-secondary btn-sm"
                style={{ borderRadius: '999px', fontSize: '0.82rem', whiteSpace: 'nowrap', padding: '6px 14px' }}
              >
                {r.name}
              </button>
            ))}
          </div>

          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
            Popular Occasion Quick Picks
          </div>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {occasions.map((o) => (
              <button
                key={o.id}
                onClick={() => {}}
                className="btn btn-secondary btn-sm"
                style={{ borderRadius: '999px', fontSize: '0.82rem', whiteSpace: 'nowrap', padding: '6px 14px' }}
              >
                {o.name}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Full 4-Step Interactive Wizard */}
        <GiftWizard />

        {/* 3. Popular Gifts Right Now */}
        <div style={{ marginTop: '56px' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
            <div>
              <h3 className="h3" style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: '1.05rem', color: '#1A1A1A' }}>
                Popular Gifts Right Now
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>Verified highest satisfaction gift picks</span>
            </div>
            <button onClick={() => navigate('/deals')} className="btn btn-ghost btn-sm" style={{ color: '#2563EB' }}>
              <span>View All Deals</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div
              style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '20px', cursor: 'pointer' }}
              onClick={() => navigate('/deals')}
            >
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase' }}>For Tech Dads</div>
              <h4 style={{ fontSize: '0.96rem', fontWeight: 700, margin: '6px 0 10px', color: '#1A1A1A' }}>Anker Prime 200W Power Bank</h4>
              <div className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 800, color: '#059669' }}>{formatPrice(89.99)}</div>
            </div>

            <div
              style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '20px', cursor: 'pointer' }}
              onClick={() => navigate('/deals')}
            >
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase' }}>For Coffee Lovers</div>
              <h4 style={{ fontSize: '0.96rem', fontWeight: 700, margin: '6px 0 10px', color: '#1A1A1A' }}>Fellow Ode Gen 2 Coffee Grinder</h4>
              <div className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 800, color: '#059669' }}>{formatPrice(345.00)}</div>
            </div>

            <div
              style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '20px', cursor: 'pointer' }}
              onClick={() => navigate('/deals')}
            >
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase' }}>Budget Tech Under $70</div>
              <h4 style={{ fontSize: '0.96rem', fontWeight: 700, margin: '6px 0 10px', color: '#1A1A1A' }}>EarFun Air Pro 4 Hi-Res Earbuds</h4>
              <div className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 800, color: '#059669' }}>{formatPrice(69.99)}</div>
            </div>

            <div
              style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '20px', cursor: 'pointer' }}
              onClick={() => navigate('/deals')}
            >
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase' }}>Stocking Stuffers Under $15</div>
              <h4 style={{ fontSize: '0.96rem', fontWeight: 700, margin: '6px 0 10px', color: '#1A1A1A' }}>Anker Braided Fast Charging Cable</h4>
              <div className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 800, color: '#059669' }}>{formatPrice(12.99)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
