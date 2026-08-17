import React, { useEffect, useState } from 'react';
import { dealService } from '../services/dealService';
import { Deal } from '../types/deals';
import { DealCard } from '../components/deals/DealCard';
import { useCountry } from '../context/CountryContext';
import { useNavigation } from '../context/NavigationContext';
import { Tag, TrendingDown, Clock, ShieldCheck, Flame, ChevronRight, ArrowRight, ExternalLink, Gift, DollarSign } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { updatePageSEO } from '../utils/seo';

type DealFilter = 'all' | 'top' | 'price_drops' | 'under25' | 'under50' | 'under100' | 'tech' | 'kitchen' | 'beauty';

export const DealsView: React.FC = () => {
  const [allDeals, setAllDeals] = useState<Deal[]>([]);
  const [activeFilter, setActiveFilter] = useState<DealFilter>('all');
  const { formatPrice } = useCountry();
  const { navigate } = useNavigation();

  useEffect(() => {
    updatePageSEO(
      'Deals & Real-Time Price Drops — Verified Discounts Across Major Retailers',
      'Discover active flash sales and multi-retailer price drops. Every deal is verified against 30-day price history.'
    );

    dealService.getDeals().then(setAllDeals);
  }, []);

  const topDeals = allDeals.filter((d) => d.isTopDeal && d.status === 'active');
  const priceDrops = allDeals.filter((d) => d.dealType === 'price_drop' || d.isPriceDrop);
  const under25Deals = allDeals.filter((d) => d.dealPriceUSD <= 25 || d.isUnder25);

  const filteredDeals = allDeals.filter((d) => {
    if (activeFilter === 'top') return d.isTopDeal;
    if (activeFilter === 'price_drops') return d.dealType === 'price_drop' || d.isPriceDrop;
    if (activeFilter === 'under25') return d.dealPriceUSD <= 25;
    if (activeFilter === 'under50') return d.dealPriceUSD <= 50;
    if (activeFilter === 'under100') return d.dealPriceUSD <= 100;
    if (activeFilter === 'tech' || activeFilter === 'kitchen' || activeFilter === 'beauty') {
      return d.category === activeFilter;
    }
    return true;
  });

  const filterButtons: { id: DealFilter; label: string }[] = [
    { id: 'all', label: 'All Deals' },
    { id: 'top', label: "Today's Top Deals" },
    { id: 'price_drops', label: 'Price Drops' },
    { id: 'under25', label: 'Under $25' },
    { id: 'under50', label: 'Under $50' },
    { id: 'under100', label: 'Under $100' },
    { id: 'tech', label: 'Tech & Audio' },
    { id: 'kitchen', label: 'Kitchen & Home' },
    { id: 'beauty', label: 'Beauty & Wellness' }
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
          <span style={{ color: '#1A1A1A', fontWeight: 600 }}>Deals & Price Drops</span>
        </div>

        {/* Hub Header */}
        <div style={{ marginBottom: '32px' }}>
          <div className="flex items-center gap-xs" style={{ marginBottom: '8px' }}>
            <Tag size={26} style={{ color: '#059669' }} />
            <h1 className="h1" style={{ margin: 0 }}>
              Deals & Real-Time Price Drops
            </h1>
          </div>
          <p style={{ color: '#4B5563', margin: 0, fontSize: '1.02rem', maxWidth: '720px' }}>
            Find the best verified discounts across Amazon, Best Buy, and Walmart. We monitor prices every 6 hours and track 30-day historical lows.
          </p>
        </div>

        {/* Quick Filter Strip */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '36px' }}>
          {filterButtons.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`btn btn-sm ${activeFilter === f.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                borderRadius: '999px',
                padding: '6px 14px',
                fontSize: '0.82rem',
                whiteSpace: 'nowrap'
              }}
            >
              {f.label}
            </button>
          ))}

          <button
            onClick={() => navigate('/deals/seasonal')}
            className="btn btn-secondary btn-sm"
            style={{
              borderRadius: '999px',
              padding: '6px 14px',
              fontSize: '0.82rem',
              whiteSpace: 'nowrap',
              color: '#9333EA',
              borderColor: '#E9D5FF',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Gift size={13} /> Seasonal Campaigns
          </button>
        </div>

        {/* 1. Today's Top Deals Grid or Empty State */}
        {topDeals.length === 0 ? (
          <EmptyState
            title="No Active Deals at the Moment"
            description="Our automated price radar is actively monitoring retailer price drops across Amazon, Best Buy, and Walmart. Check back soon!"
            actionLabel="Discover Trending Products"
            onAction={() => navigate('/trending')}
          />
        ) : (
          activeFilter === 'all' && (
            <div style={{ marginBottom: '56px' }}>
              <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
                <div className="flex items-center gap-xs">
                  <Flame size={20} style={{ color: '#EA580C' }} />
                  <h3 className="h3" style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: '1rem', color: '#1A1A1A' }}>
                    Today's Top Flash Deals & Drops
                  </h3>
                </div>
                <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>Limited-time prices</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                {topDeals.map((deal) => (
                  <DealCard key={deal.id} deal={deal} />
                ))}
              </div>
            </div>
          )
        )}

        {/* 2. Recent Price Drops Table */}
        {activeFilter === 'all' && (
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1px solid var(--border-default)', padding: '28px', boxShadow: 'var(--shadow-card)', marginBottom: '56px' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: '18px' }}>
              <div className="flex items-center gap-xs">
                <TrendingDown size={20} style={{ color: '#059669' }} />
                <h3 className="h3" style={{ margin: 0, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#1A1A1A' }}>
                  Recent Price Drops (Lowest in 30 Days)
                </h3>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/deals/price-drops')} style={{ color: '#2563EB' }}>
                <span>View Full Radar</span>
                <ArrowRight size={14} />
              </Button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#4B5563', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                    <th style={{ padding: '10px 14px' }}>Product Name</th>
                    <th style={{ padding: '10px 14px' }}>Retailer</th>
                    <th style={{ padding: '10px 14px' }}>Old Price</th>
                    <th style={{ padding: '10px 14px' }}>New Price</th>
                    <th style={{ padding: '10px 14px' }}>Price Drop</th>
                    <th style={{ padding: '10px 14px', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {priceDrops.map((d) => (
                    <tr key={d.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 700, color: '#1A1A1A' }}>
                        {d.productName}
                      </td>
                      <td style={{ padding: '12px 14px', color: '#6B7280' }}>{d.retailerName}</td>
                      <td className="font-mono" style={{ padding: '12px 14px', color: '#9CA3AF', textDecoration: 'line-through' }}>
                        {formatPrice(d.originalPriceUSD)}
                      </td>
                      <td className="font-mono" style={{ padding: '12px 14px', fontWeight: 800, color: '#059669' }}>
                        {formatPrice(d.dealPriceUSD)}
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <span style={{ backgroundColor: '#ECFDF5', color: '#059669', padding: '2px 8px', borderRadius: '4px', fontWeight: 800, fontSize: '0.78rem' }}>
                          ↓ {d.discountPercent}%
                        </span>
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                        <a
                          href={d.retailerUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-primary btn-sm"
                          style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                        >
                          View Deal
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. Under $25 Budget Essentials Strip */}
        {activeFilter === 'all' && (
          <div style={{ marginBottom: '48px' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
              <div className="flex items-center gap-xs">
                <DollarSign size={18} style={{ color: '#2563EB' }} />
                <h3 className="h3" style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: '1rem', color: '#1A1A1A' }}>
                  Top Picks Under $25
                </h3>
              </div>
              <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>Everyday high-value budget essentials</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              {under25Deals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
          </div>
        )}

        {/* Filtered Results if Active Filter is not 'all' */}
        {activeFilter !== 'all' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              {filteredDeals.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
