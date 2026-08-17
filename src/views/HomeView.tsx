import React, { useEffect, useState } from 'react';
import { HeroSearchBar } from '../components/search/HeroSearchBar';
import { QuickIntentChips } from '../components/search/QuickIntentChips';
import { ProductCard } from '../components/product/ProductCard';
import { RisingFastSection } from '../components/home/RisingFastSection';
import { HiddenGemsSection } from '../components/home/HiddenGemsSection';
import { OverhypedSection } from '../components/home/OverhypedSection';
import { ComparisonHighlightSection } from '../components/home/ComparisonHighlightSection';
import { GiftFinderSection } from '../components/home/GiftFinderSection';
import { EditorialGuidesSection } from '../components/home/EditorialGuidesSection';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { productService } from '../services/productService';
import { categoryService } from '../services/categoryService';
import { SEED_COMPARISONS } from '../data/seedComparisons';
import { SEED_GUIDES } from '../data/seedGuides';
import { Product } from '../types/product';
import { Category } from '../types/category';
import { useNavigation } from '../context/NavigationContext';
import { Flame, ShieldCheck, ArrowRight, Grid, Sparkles, CheckCircle2, TrendingUp } from 'lucide-react';
import { CategoryIcon } from '../components/ui/CategoryIcon';
import { updatePageSEO } from '../utils/seo';

export const HomeView: React.FC = () => {
  const { navigate } = useNavigation();
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [risingProducts, setRisingProducts] = useState<Product[]>([]);
  const [hiddenGems, setHiddenGems] = useState<Product[]>([]);
  const [overhypedProducts, setOverhypedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [productA, setProductA] = useState<Product | null>(null);
  const [productB, setProductB] = useState<Product | null>(null);

  useEffect(() => {
    updatePageSEO(
      "What's Worth Buying Right Now?",
      'Discover trending products, compare options, and find what is actually worth your money with real-time intelligence and verified retailer prices.'
    );

    const loadData = async () => {
      const [trending, rising, gems, overhyped, cats] = await Promise.all([
        productService.getTrendingProducts(),
        productService.getRisingProducts(),
        productService.getHiddenGems(),
        productService.getOverhypedProducts(),
        categoryService.getCategories()
      ]);

      setTrendingProducts(trending);
      setRisingProducts(rising);
      setHiddenGems(gems);
      setOverhypedProducts(overhyped);
      setCategories(cats);

      // Comparison products
      const pA = await productService.getProductById(SEED_COMPARISONS[0].productAId);
      const pB = await productService.getProductById(SEED_COMPARISONS[0].productBId);
      if (pA) setProductA(pA);
      if (pB) setProductB(pB);
    };

    loadData();
  }, []);

  return (
    <div>
      {/* =========================================================================
          SECTION 1: HERO SECTION — WHAT'S WORTH BUYING RIGHT NOW?
          ========================================================================= */}
      <section
        style={{
          background: 'var(--hero-gradient)',
          paddingTop: '64px',
          paddingBottom: '56px',
          borderBottom: '1px solid var(--border-default)',
          textAlign: 'center'
        }}
      >
        <div className="container-narrow">
          {/* Eyebrow badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #BFDBFE',
              color: '#2563EB',
              padding: '5px 16px',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: 700,
              boxShadow: 'var(--shadow-xs)',
              marginBottom: '20px'
            }}
          >
            <Sparkles size={14} />
            <span>GLOBAL PRODUCT INTELLIGENCE & DISCOVERY</span>
          </div>

          {/* Main Headline */}
          <h1
            className="display"
            style={{
              fontSize: 'var(--font-size-hero-title)',
              color: '#1A1A1A',
              margin: '0 0 16px',
              letterSpacing: '-0.03em'
            }}
          >
            What's Worth Buying Right Now?
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'var(--font-size-hero-sub)',
              color: '#4B5563',
              maxWidth: '620px',
              margin: '0 auto 32px',
              lineHeight: 1.6
            }}
          >
            Discover trending products, compare verified specs and retailer prices, and find what is actually worth your hard-earned money.
          </p>

          {/* Primary Search Bar */}
          <HeroSearchBar />

          {/* Quick Intent Chips (Micro CTAs) */}
          <QuickIntentChips />

          {/* Trust Signals Row */}
          <div className="trust-row">
            <div className="trust-item">
              <ShieldCheck size={16} style={{ color: '#059669' }} />
              <span>Independent Worth Scores</span>
            </div>
            <div className="trust-item">
              <TrendingUp size={16} style={{ color: '#2563EB' }} />
              <span>Real-Time Market Velocity</span>
            </div>
            <div className="trust-item">
              <CheckCircle2 size={16} style={{ color: '#059669' }} />
              <span>Multi-Retailer Price Comparison</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: TRENDING RIGHT NOW (GRID PATTERN)
          ========================================================================= */}
      <section id="trending-section" style={{ padding: '64px 0' }}>
        <div className="container">
          <div className="flex items-center justify-between" style={{ marginBottom: '32px' }}>
            <div>
              <div className="flex items-center gap-xs" style={{ marginBottom: '4px' }}>
                <Flame size={24} style={{ color: '#EA580C' }} />
                <h2 className="h2" style={{ margin: 0 }}>
                  TRENDING RIGHT NOW
                </h2>
              </div>
              <p style={{ color: '#4B5563', margin: 0, fontSize: '0.95rem' }}>
                What shoppers and creators across the US & Europe are discovering this week.
              </p>
            </div>

            <button
              onClick={() => navigate('/trending')}
              className="btn btn-ghost btn-sm"
              style={{ color: '#2563EB', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <span>View All ({trendingProducts.length})</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* 4-Column Product Grid */}
          <div className="grid-products grid-products-4col">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: RISING FAST (UPWARD TRAJECTORY)
          ========================================================================= */}
      <RisingFastSection products={risingProducts} />

      {/* =========================================================================
          SECTION 4: HIDDEN GEMS (UNDER-RATED DISCOVERY)
          ========================================================================= */}
      <HiddenGemsSection products={hiddenGems} />

      {/* =========================================================================
          SECTION 5: OVERHYPED? (HONEST ASSESSMENT)
          ========================================================================= */}
      <OverhypedSection products={overhypedProducts} />

      {/* =========================================================================
          SECTION 6: COMPARISON HIGHLIGHTS (HEAD-TO-HEAD)
          ========================================================================= */}
      {productA && productB && (
        <ComparisonHighlightSection
          comparison={SEED_COMPARISONS[0]}
          productA={productA}
          productB={productB}
        />
      )}

      {/* =========================================================================
          CATEGORY EXPLORER TILES
          ========================================================================= */}
      <section style={{ padding: '60px 0', borderTop: '1px solid var(--border-default)' }}>
        <div className="container">
          <div className="flex items-center justify-between" style={{ marginBottom: '28px' }}>
            <div>
              <div className="flex items-center gap-xs" style={{ marginBottom: '4px' }}>
                <Grid size={22} style={{ color: '#2563EB' }} />
                <h2 className="h2" style={{ margin: 0 }}>
                  EXPLORE BY CATEGORY
                </h2>
              </div>
              <p style={{ color: '#4B5563', margin: 0, fontSize: '0.95rem' }}>
                Browse curated collections with categorized hype and worth scores.
              </p>
            </div>

            <button
              onClick={() => navigate('/categories')}
              className="btn btn-ghost btn-sm"
              style={{ color: '#2563EB', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <span>All Categories</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid-categories">
            {categories.slice(0, 6).map((cat) => (
              <div
                key={cat.id}
                onClick={() => navigate('/category-detail', { categorySlug: cat.slug })}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '14px',
                  border: '1px solid #E5E7EB',
                  padding: '20px 16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-xs)',
                  transition: 'all 0.18s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = '#2563EB';
                  e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
                }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                  <CategoryIcon slugOrId={cat.slug || cat.id} size={24} color="#2563EB" />
                </div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, margin: '0 0 4px', color: '#1A1A1A' }}>
                  {cat.name}
                </h4>
                <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                  {cat.featuredProductCount} Curated Items
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: GIFT FINDER QUICK ENTRY
          ========================================================================= */}
      <GiftFinderSection />

      {/* =========================================================================
          SECTION 8: CONTENT & BUYING GUIDES
          ========================================================================= */}
      <EditorialGuidesSection guides={SEED_GUIDES} />

      {/* =========================================================================
          SECTION 9: NEWSLETTER SIGN-UP (THE HYPE DROP)
          ========================================================================= */}
      <NewsletterSection />
    </div>
  );
};
