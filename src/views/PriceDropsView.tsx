import React, { useEffect, useState } from 'react';
import { dealService } from '../services/dealService';
import { Deal } from '../types/deals';
import { DealCard } from '../components/deals/DealCard';
import { useNavigation } from '../context/NavigationContext';
import { TrendingDown, ChevronRight, Filter, ArrowUpDown } from 'lucide-react';
import { updatePageSEO } from '../utils/seo';

export const PriceDropsView: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'discount' | 'price_low' | 'price_high'>('discount');
  const { navigate } = useNavigation();

  useEffect(() => {
    updatePageSEO(
      'Price Drop Alerts Radar — Real-Time Product Markdown Tracker',
      'Track the largest percentage price drops across tech, kitchen, and beauty products in real time.'
    );

    dealService.getPriceDrops().then(setDeals);
  }, []);

  const filtered = deals
    .filter((d) => selectedCategory === 'all' || d.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
      if (sortBy === 'price_low') return a.dealPriceUSD - b.dealPriceUSD;
      if (sortBy === 'price_high') return b.dealPriceUSD - a.dealPriceUSD;
      return 0;
    });

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
          <span style={{ color: '#1A1A1A', fontWeight: 600 }}>Price Drop Radar</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div className="flex items-center gap-xs" style={{ marginBottom: '8px' }}>
            <TrendingDown size={26} style={{ color: '#059669' }} />
            <h1 className="h1" style={{ margin: 0 }}>
              Price Drop Alerts Radar
            </h1>
          </div>
          <p style={{ color: '#4B5563', margin: 0, fontSize: '1.02rem', maxWidth: '720px' }}>
            Products that have recently decreased in price across Amazon, Walmart, and Best Buy. Sorted by deepest verified percentage savings.
          </p>
        </div>

        {/* Sorters and Category Filter */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid var(--border-default)',
            padding: '16px 20px',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div className="flex items-center gap-sm">
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#4B5563', textTransform: 'uppercase' }}>
              Category:
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.84rem' }}
            >
              <option value="all">All Departments</option>
              <option value="tech">Tech & Electronics</option>
              <option value="kitchen">Kitchen & Appliances</option>
              <option value="beauty">Beauty & Personal Care</option>
            </select>
          </div>

          <div className="flex items-center gap-sm">
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#4B5563', textTransform: 'uppercase' }}>
              Sort By:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.84rem' }}
            >
              <option value="discount">Largest % Savings</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {filtered.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </div>
    </div>
  );
};
