import React, { useEffect, useState } from 'react';
import { dealService } from '../services/dealService';
import { Deal, SeasonalCampaign } from '../types/deals';
import { DealCard } from '../components/deals/DealCard';
import { CountdownTimer } from '../components/deals/CountdownTimer';
import { useCountry } from '../context/CountryContext';
import { useNavigation } from '../context/NavigationContext';
import { Sparkles, Gift, ChevronRight, Trophy, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { updatePageSEO } from '../utils/seo';

export const SeasonalDealsView: React.FC = () => {
  const [campaigns, setCampaigns] = useState<SeasonalCampaign[]>([]);
  const [activeCampaign, setActiveCampaign] = useState<SeasonalCampaign | null>(null);
  const [deals, setDeals] = useState<Deal[]>([]);
  const { formatPrice } = useCountry();
  const { navigate } = useNavigation();

  useEffect(() => {
    updatePageSEO(
      'Holiday & Seasonal Deals 2026 — Verified Gift Guides and Price Drops',
      'Curated holiday gift collections and seasonal discounts tested against historical price markdowns.'
    );

    dealService.getSeasonalCampaigns().then((camps) => {
      setCampaigns(camps);
      setActiveCampaign(camps[0] || null);
    });

    dealService.getDeals().then(setDeals);
  }, []);

  if (!activeCampaign) return null;

  const featuredDeal = deals.find((d) => d.id === activeCampaign.featuredDealId) || deals[0];

  const giftTiers = [
    { title: 'Gifts for Tech Enthusiasts', budget: 'Under $100', category: 'tech' },
    { title: 'Gifts for Home & Kitchen', budget: 'Under $50', category: 'kitchen' },
    { title: 'Gifts for Wellness & Beauty', budget: 'Under $75', category: 'beauty' },
    { title: 'Stocking Stuffers & Essentials', budget: 'Under $25', category: 'tech' }
  ];

  return (
    <div style={{ padding: '32px 0 80px' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div className="flex items-center gap-xs" style={{ fontSize: '0.8rem', color: '#6B7280', marginBottom: '20px' }}>
          <span onClick={() => navigate('/')} style={{ cursor: 'pointer', color: '#2563EB', fontWeight: 500 }}>
            Home
          </span>
          <ChevronRight size={13} />
          <span onClick={() => navigate('/deals')} style={{ cursor: 'pointer', color: '#2563EB', fontWeight: 500 }}>
            Deals
          </span>
          <ChevronRight size={13} />
          <span style={{ color: '#1A1A1A', fontWeight: 600 }}>Seasonal Campaigns</span>
        </div>

        {/* Campaign Switcher */}
        <div className="flex items-center gap-sm" style={{ marginBottom: '28px' }}>
          {campaigns.map((camp) => (
            <button
              key={camp.id}
              onClick={() => setActiveCampaign(camp)}
              className={`btn btn-sm ${activeCampaign.id === camp.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: '999px', fontSize: '0.82rem' }}
            >
              {camp.name}
            </button>
          ))}
        </div>

        {/* Campaign Header */}
        <div style={{ marginBottom: '36px' }}>
          <div className="flex items-center gap-xs" style={{ marginBottom: '8px' }}>
            <Gift size={26} style={{ color: '#DC2626' }} />
            <h1 className="h1" style={{ margin: 0 }}>
              {activeCampaign.headline}
            </h1>
          </div>
          <p style={{ color: '#4B5563', margin: 0, fontSize: '1.02rem', maxWidth: '720px' }}>
            {activeCampaign.description}
          </p>
        </div>

        {/* 1. Featured Spotlight: Gift of the Day */}
        {featuredDeal && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '2px solid #FECACA',
              padding: '36px',
              boxShadow: 'var(--shadow-card)',
              marginBottom: '48px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '32px',
              alignItems: 'center'
            }}
          >
            <div style={{ backgroundColor: '#FEF2F2', borderRadius: '16px', padding: '24px', textAlign: 'center', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={featuredDeal.image}
                alt={featuredDeal.productName}
                style={{ maxHeight: '240px', maxWidth: '100%', objectFit: 'contain' }}
              />
            </div>

            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#FEF2F2', color: '#DC2626', padding: '4px 10px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px' }}>
                <Sparkles size={12} /> Featured Gift of the Day
              </div>

              <h2 className="h2" style={{ margin: '0 0 12px', color: '#1A1A1A' }}>
                {featuredDeal.productName}
              </h2>

              <div className="flex items-baseline gap-md" style={{ marginBottom: '16px' }}>
                <span className="font-mono" style={{ fontSize: '1.8rem', fontWeight: 900, color: '#059669' }}>
                  {formatPrice(featuredDeal.dealPriceUSD)}
                </span>
                <span className="font-mono" style={{ fontSize: '1.1rem', color: '#9CA3AF', textDecoration: 'line-through' }}>
                  {formatPrice(featuredDeal.originalPriceUSD)}
                </span>
                <span style={{ backgroundColor: '#ECFDF5', color: '#059669', padding: '3px 8px', borderRadius: '6px', fontWeight: 800, fontSize: '0.82rem' }}>
                  Save {featuredDeal.discountPercent}%
                </span>
              </div>

              <div className="flex items-center gap-md" style={{ marginBottom: '24px' }}>
                <CountdownTimer targetDate={featuredDeal.endDate} labelPrefix="Sale Ends in: " />
                <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>Verified in stock on {featuredDeal.retailerName}</span>
              </div>

              <div className="flex items-center gap-sm">
                <a
                  href={featuredDeal.retailerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary btn-lg"
                  style={{ backgroundColor: '#DC2626', borderRadius: '10px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <span>Grab Holiday Deal</span>
                  <ExternalLink size={16} />
                </a>

                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => navigate('/product-detail')}
                  style={{ borderRadius: '10px' }}
                >
                  View Full Lab Specs
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* 2. Recipient Gift Tiers */}
        <div style={{ marginBottom: '48px' }}>
          <h3 className="h3" style={{ margin: '0 0 20px', color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: '1rem' }}>
            Curated Gift Collections
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {giftTiers.map((tier, idx) => (
              <div
                key={idx}
                onClick={() => navigate('/deals')}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #E2E8F0',
                  padding: '20px',
                  boxShadow: 'var(--shadow-card)',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#DC2626';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#DC2626', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {tier.budget}
                </div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 700, margin: '0 0 10px', color: '#1A1A1A' }}>
                  {tier.title}
                </h4>
                <div className="flex items-center gap-2xs" style={{ color: '#2563EB', fontSize: '0.78rem', fontWeight: 700 }}>
                  <span>Browse Category Gifts</span>
                  <ChevronRight size={13} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. All Campaign Deals */}
        <div>
          <h3 className="h3" style={{ margin: '0 0 20px', color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: '1rem' }}>
            All Active Holiday Discounts
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {deals.slice(0, 6).map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
