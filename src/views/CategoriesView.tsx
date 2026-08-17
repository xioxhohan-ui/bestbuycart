import React, { useEffect, useState } from 'react';
import { categoryService } from '../services/categoryService';
import { Category } from '../types/category';
import { useNavigation } from '../context/NavigationContext';
import { TrendingCategoriesRow } from '../components/category/TrendingCategoriesRow';
import { CategoryGrid14 } from '../components/category/CategoryGrid14';
import { ShoppingBag, ChevronRight, BarChart2, Sparkles, ArrowRight } from 'lucide-react';
import { updatePageSEO } from '../utils/seo';

export const CategoriesView: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [trendingCategories, setTrendingCategories] = useState<Category[]>([]);
  const { navigate } = useNavigation();

  useEffect(() => {
    updatePageSEO(
      'Shop All Categories — Global Product Discovery Hub',
      'Explore thousands of products across 14 curated categories with verified hype scores, worth metrics, and buying guides.'
    );

    categoryService.getCategories().then((all) => {
      setCategories(all);
      setTrendingCategories(all.filter((c) => c.isTrendingCat));
    });
  }, []);

  return (
    <div style={{ padding: '32px 0 80px' }}>
      <div className="container">
        {/* Breadcrumb Bar */}
        <div
          className="flex items-center gap-xs"
          style={{ fontSize: '0.8rem', color: '#6B7280', marginBottom: '20px' }}
        >
          <span
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer', color: '#2563EB', fontWeight: 500 }}
          >
            Home
          </span>
          <ChevronRight size={13} />
          <span style={{ color: '#1A1A1A', fontWeight: 600 }}>Categories</span>
        </div>

        {/* Master Category Hub Header */}
        <div style={{ marginBottom: '40px' }}>
          <div className="flex items-center gap-xs" style={{ marginBottom: '8px' }}>
            <ShoppingBag size={28} style={{ color: '#2563EB' }} />
            <h1 className="h1" style={{ margin: 0 }}>
              Shop All Categories
            </h1>
          </div>
          <p style={{ color: '#4B5563', margin: 0, fontSize: '1.05rem', maxWidth: '680px' }}>
            Explore thousands of products across 14 curated categories. Structured discovery designed to help you find what is worth buying in under 3 clicks.
          </p>
        </div>

        {/* 1. Trending Categories Right Now (Top 4) */}
        {trendingCategories.length > 0 && (
          <TrendingCategoriesRow categories={trendingCategories} />
        )}

        {/* 2. All 14 Categories Responsive Grid (7x2) */}
        {categories.length > 0 && (
          <CategoryGrid14 categories={categories} />
        )}

        {/* 3. Trend Insights by Category Banner */}
        <div
          style={{
            backgroundColor: '#1E293B',
            color: '#FFFFFF',
            borderRadius: '16px',
            padding: '24px 28px',
            boxShadow: 'var(--shadow-card)',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap'
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              backgroundColor: 'rgba(37, 99, 235, 0.25)',
              color: '#60A5FA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <BarChart2 size={22} />
          </div>

          <div style={{ flex: 1, minWidth: '240px' }}>
            <div className="flex items-center gap-xs" style={{ fontWeight: 700, fontSize: '0.92rem', color: '#93C5FD', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
              <BarChart2 size={15} /> Category Trend Insights & Velocity
            </div>
            <div style={{ fontSize: '0.86rem', color: '#E2E8F0', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <span><strong>Tech:</strong> 5 rising fast products (Anker Prime, Keychron)</span>
              <span>•</span>
              <span><strong>Home:</strong> 3 hidden gems in HEPA filtration</span>
              <span>•</span>
              <span><strong>Kitchen:</strong> High demand for assisted espresso</span>
              <span>•</span>
              <span><strong>Gifts:</strong> 12 curated standout picks under $50</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
