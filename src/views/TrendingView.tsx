import React, { useEffect, useState } from 'react';
import { Product } from '../types/product';
import { productService } from '../services/productService';
import { ProductCard } from '../components/product/ProductCard';
import { Flame, Filter, SlidersHorizontal, ArrowUpDown, Star, TrendingUp, Gem } from 'lucide-react';
import { updatePageSEO } from '../utils/seo';

export const TrendingView: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filterType, setFilterType] = useState<'all' | 'worth_it' | 'rising' | 'hidden_gems'>('all');
  const [sortBy, setSortBy] = useState<'hype' | 'worth' | 'price_asc' | 'price_desc'>('hype');

  useEffect(() => {
    updatePageSEO('Trending Products & Viral Shopping Intelligence', 'Explore products with the highest hype and worth scores across the US and Europe.');
    productService.getAllProducts().then(setProducts);
  }, []);

  const filteredProducts = products.filter((p) => {
    if (filterType === 'worth_it') return p.worthScore >= 90;
    if (filterType === 'rising') return p.isRising;
    if (filterType === 'hidden_gems') return p.isHiddenGem;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'hype') return b.hypeScore - a.hypeScore;
    if (sortBy === 'worth') return b.worthScore - a.worthScore;
    if (sortBy === 'price_asc') return a.priceUSD - b.priceUSD;
    if (sortBy === 'price_desc') return b.priceUSD - a.priceUSD;
    return 0;
  });

  return (
    <div style={{ padding: '40px 0 80px' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div className="flex items-center gap-xs" style={{ marginBottom: '8px' }}>
            <Flame size={24} style={{ color: '#EA580C' }} />
            <h1 className="h1" style={{ margin: 0 }}>
              Trending Discovery Feed
            </h1>
          </div>
          <p style={{ color: '#4B5563', margin: 0, fontSize: '1rem', maxWidth: '680px' }}>
            Real-time market velocity tracking viral discussions, consumer search momentum, and editorial worth rankings.
          </p>
        </div>

        {/* Filter & Sort Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            padding: '16px 20px',
            backgroundColor: '#FFFFFF',
            borderRadius: '14px',
            border: '1px solid var(--border-default)',
            marginBottom: '32px',
            boxShadow: 'var(--shadow-xs)'
          }}
        >
          {/* Quick Filter Buttons */}
          <div className="flex items-center gap-xs flex-wrap">
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6B7280', marginRight: '6px' }}>
              Filter:
            </span>
            <button
              onClick={() => setFilterType('all')}
              className={`btn btn-sm ${filterType === 'all' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ borderRadius: '999px', fontSize: '0.78rem' }}
            >
              All Items ({products.length})
            </button>
            <button
              onClick={() => setFilterType('worth_it')}
              className={`btn btn-sm ${filterType === 'worth_it' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ borderRadius: '999px', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <Star size={13} style={{ color: filterType === 'worth_it' ? '#FFFFFF' : '#D97706' }} /> High Worth (&gt;90)
            </button>
            <button
              onClick={() => setFilterType('rising')}
              className={`btn btn-sm ${filterType === 'rising' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ borderRadius: '999px', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <TrendingUp size={13} style={{ color: filterType === 'rising' ? '#FFFFFF' : '#D97706' }} /> Rising Fast
            </button>
            <button
              onClick={() => setFilterType('hidden_gems')}
              className={`btn btn-sm ${filterType === 'hidden_gems' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ borderRadius: '999px', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <Gem size={13} style={{ color: filterType === 'hidden_gems' ? '#FFFFFF' : '#9333EA' }} /> Hidden Gems
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-xs">
            <ArrowUpDown size={14} style={{ color: '#6B7280' }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6B7280' }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                backgroundColor: '#F8FAFC',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#1A1A1A',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="hype">Highest Hype Score</option>
              <option value="worth">Highest Worth Score</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid-products grid-products-4col">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
