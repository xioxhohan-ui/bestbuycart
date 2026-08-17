import React, { useEffect, useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useCountry } from '../context/CountryContext';
import { comparisonService } from '../services/comparisonService';
import { productService } from '../services/productService';
import { ProductComparison, BrandComparison } from '../types/comparison';
import { Product } from '../types/product';
import { ComparisonBuilder } from '../components/compare/ComparisonBuilder';
import { SpecificationMatrix } from '../components/compare/SpecificationMatrix';
import { ScorecardBars } from '../components/compare/ScorecardBars';
import { VerdictBanner } from '../components/compare/VerdictBanner';
import { ProductCard } from '../components/product/ProductCard';
import { ArrowRightLeft, Trophy, Flame, ShieldCheck, ChevronRight, Sparkles, ExternalLink, Tag } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { updatePageSEO } from '../utils/seo';

export const CompareView: React.FC = () => {
  const { comparisonProductA, comparisonProductB, navigate } = useNavigation();
  const { formatPrice } = useCountry();

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [popularComparisons, setPopularComparisons] = useState<ProductComparison[]>([]);
  const [brandComparisons, setBrandComparisons] = useState<BrandComparison[]>([]);

  // Active comparison state
  const [activeProductA, setActiveProductA] = useState<Product | null>(null);
  const [activeProductB, setActiveProductB] = useState<Product | null>(null);
  const [activeProductC, setActiveProductC] = useState<Product | undefined>(undefined);
  const [activeComparisonDoc, setActiveComparisonDoc] = useState<ProductComparison | null>(null);

  useEffect(() => {
    productService.getAllProducts().then((products: Product[]) => {
      setAllProducts(products);

      // Default active products if not passed from context
      const pA = comparisonProductA || products[0];
      const pB = comparisonProductB || products.find((p) => p.id !== pA?.id) || products[1];
      setActiveProductA(pA || null);
      setActiveProductB(pB || null);

      if (pA && pB) {
        updatePageSEO(
          `${pA.name} vs ${pB.name} — Full Lab Benchmark & Worth Comparison`,
          `Compare ${pA.name} vs ${pB.name} side-by-side with verified battery life, build quality, and worth scores.`
        );
      }
    });

    comparisonService.getComparisons().then(setPopularComparisons);
    comparisonService.getBrandComparisons().then(setBrandComparisons);
  }, [comparisonProductA, comparisonProductB]);

  const handleCustomCompare = (pA: Product, pB: Product, pC?: Product) => {
    setActiveProductA(pA);
    setActiveProductB(pB);
    setActiveProductC(pC);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleLoadPresetComparison = (comp: ProductComparison) => {
    const pA = allProducts.find((p) => p.id === comp.productAId) || allProducts[0];
    const pB = allProducts.find((p) => p.id === comp.productBId) || allProducts[1];
    setActiveProductA(pA);
    setActiveProductB(pB);
    setActiveProductC(undefined);
    setActiveComparisonDoc(comp);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <div style={{ padding: '32px 0 80px' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div className="flex items-center gap-xs" style={{ fontSize: '0.8rem', color: '#6B7280', marginBottom: '20px' }}>
          <span onClick={() => navigate('/')} style={{ cursor: 'pointer', color: '#2563EB', fontWeight: 500 }}>
            Home
          </span>
          <ChevronRight size={13} />
          <span style={{ color: '#1A1A1A', fontWeight: 600 }}>Product Comparisons</span>
        </div>

        {/* Hub Header */}
        <div style={{ marginBottom: '36px' }}>
          <div className="flex items-center gap-xs" style={{ marginBottom: '8px' }}>
            <ArrowRightLeft size={26} style={{ color: '#2563EB' }} />
            <h1 className="h1" style={{ margin: 0 }}>
              Compare Products Side-by-Side
            </h1>
          </div>
          <p style={{ color: '#4B5563', margin: 0, fontSize: '1.02rem', maxWidth: '720px' }}>
            Data-driven benchmark comparison engine. Eliminate buyer confusion by evaluating verified battery metrics, real-world noise isolation, and worth scores side by side.
          </p>
        </div>

        {/* 1. Interactive Comparison Builder */}
        {allProducts.length > 0 && (
          <ComparisonBuilder
            products={allProducts}
            onCompare={handleCustomCompare}
          />
        )}

        {/* 2. Dynamic Head-to-Head Comparison Matchup */}
        {activeProductA && activeProductB && (
          <div style={{ marginBottom: '56px' }}>
            {/* Top Side-by-Side Cards with VS Badge */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: activeProductC ? 'repeat(auto-fit, minmax(240px, 1fr))' : '1fr auto 1fr',
                gap: '20px',
                alignItems: 'center',
                marginBottom: '32px'
              }}
            >
              {/* Product A Card */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  border: '2px solid #2563EB',
                  padding: '24px',
                  boxShadow: 'var(--shadow-card)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{ backgroundColor: '#F8FAFC', borderRadius: '12px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                  <img src={activeProductA.image} alt={activeProductA.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase' }}>
                  {activeProductA.brand}
                </div>
                <h3 className="h3" style={{ fontSize: '1.05rem', margin: 0, color: '#1A1A1A' }}>
                  {activeProductA.name}
                </h3>
                <div className="flex items-center justify-between" style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid #F1F5F9' }}>
                  <span className="font-mono" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1A1A1A' }}>
                    {formatPrice(activeProductA.priceUSD)}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 700 }}>
                    Worth {activeProductA.worthScore}%
                  </span>
                </div>
              </div>

              {/* VS Badge */}
              {!activeProductC && (
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '999px',
                    backgroundColor: '#1E293B',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: '0.88rem',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
                    margin: '0 auto'
                  }}
                >
                  VS
                </div>
              )}

              {/* Product B Card */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1px solid #E2E8F0',
                  padding: '24px',
                  boxShadow: 'var(--shadow-card)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{ backgroundColor: '#F8FAFC', borderRadius: '12px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                  <img src={activeProductB.image} alt={activeProductB.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase' }}>
                  {activeProductB.brand}
                </div>
                <h3 className="h3" style={{ fontSize: '1.05rem', margin: 0, color: '#1A1A1A' }}>
                  {activeProductB.name}
                </h3>
                <div className="flex items-center justify-between" style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid #F1F5F9' }}>
                  <span className="font-mono" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1A1A1A' }}>
                    {formatPrice(activeProductB.priceUSD)}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 700 }}>
                    Worth {activeProductB.worthScore}%
                  </span>
                </div>
              </div>

              {/* Product C Card (if 3-way) */}
              {activeProductC && (
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px',
                    border: '1px solid #E9D5FF',
                    padding: '24px',
                    boxShadow: 'var(--shadow-card)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}
                >
                  <div style={{ backgroundColor: '#FAF5FF', borderRadius: '12px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                    <img src={activeProductC.image} alt={activeProductC.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#9333EA', textTransform: 'uppercase' }}>
                    {activeProductC.brand}
                  </div>
                  <h3 className="h3" style={{ fontSize: '1.05rem', margin: 0, color: '#1A1A1A' }}>
                    {activeProductC.name}
                  </h3>
                  <div className="flex items-center justify-between" style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid #F1F5F9' }}>
                    <span className="font-mono" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1A1A1A' }}>
                      {formatPrice(activeProductC.priceUSD)}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#9333EA', fontWeight: 700 }}>
                      Worth {activeProductC.worthScore}%
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Specification Matrix */}
            <SpecificationMatrix
              productA={activeProductA}
              productB={activeProductB}
              productC={activeProductC}
              customRows={activeComparisonDoc?.specRows}
            />

            {/* 4. Scorecard Breakdown Bars */}
            <ScorecardBars
              scorecards={
                activeComparisonDoc?.scorecards || [
                  { name: 'Build Quality & Materials', weight: 35, scoreA: 9.3, scoreB: 9.1, winner: 'A' },
                  { name: 'Value for Money', weight: 30, scoreA: 9.6, scoreB: 8.5, winner: 'A' },
                  { name: 'Battery & Daily Reliability', weight: 20, scoreA: 9.5, scoreB: 8.2, winner: 'A' },
                  { name: 'Feature Set & Software', weight: 15, scoreA: 9.2, scoreB: 9.4, winner: 'B' }
                ]
              }
              nameA={activeProductA.brand}
              nameB={activeProductB.brand}
            />

            {/* 5. Algorithmic Final Verdict */}
            <VerdictBanner
              winnerProduct={activeProductA.worthScore >= activeProductB.worthScore ? activeProductA : activeProductB}
              productA={activeProductA}
              productB={activeProductB}
              verdictText={
                activeComparisonDoc?.verdictText ||
                `${activeProductA.name} wins for higher tested value and superior overall satisfaction scores.`
              }
              whyWinner={activeComparisonDoc?.whyWinner || `Superior worth score (${activeProductA.worthScore}% vs ${activeProductB.worthScore}%) and more competitive pricing.`}
              whenToChooseB={activeComparisonDoc?.whenToChooseB || `Choose ${activeProductB.brand} if you strictly require its unique hardware aesthetics or specialized ecosystem features.`}
            />
          </div>
        )}

        {/* 6. Popular Verified Comparisons Grid */}
        <div style={{ marginBottom: '48px' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
            <h3 className="h3" style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: '1rem', color: '#1A1A1A' }}>
              Popular Lab Comparisons
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>
              Over 300+ side-by-side benchmark tests
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {popularComparisons.map((comp) => (
              <div
                key={comp.id}
                onClick={() => handleLoadPresetComparison(comp)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #E5E7EB',
                  padding: '20px',
                  boxShadow: 'var(--shadow-card)',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = '#2563EB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = '#E5E7EB';
                }}
              >
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#2563EB', textTransform: 'uppercase', backgroundColor: '#EFF6FF', padding: '2px 8px', borderRadius: '4px' }}>
                  {comp.category} • {comp.views.toLocaleString()} views
                </span>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '8px 0 6px', color: '#1A1A1A' }}>
                  {comp.title}
                </h4>
                <p style={{ color: '#6B7280', fontSize: '0.82rem', margin: '0 0 12px', lineHeight: 1.4 }}>
                  {comp.verdictText}
                </p>
                <div className="flex items-center gap-2xs" style={{ color: '#2563EB', fontSize: '0.78rem', fontWeight: 700 }}>
                  <span>View Lab Scorecard</span>
                  <ChevronRight size={13} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Brand vs Brand Direct Faceoffs */}
        <div>
          <h3 className="h3" style={{ margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: '1rem', color: '#1A1A1A' }}>
            Brand Ecosystem Faceoffs
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {brandComparisons.map((bc) => (
              <button
                key={bc.id}
                onClick={() => {
                  // Load Brand comparison
                  const pA = allProducts.find((p) => p.brand.toLowerCase() === bc.brandA.toLowerCase()) || allProducts[0];
                  const pB = allProducts.find((p) => p.brand.toLowerCase() === bc.brandB.toLowerCase()) || allProducts[1];
                  setActiveProductA(pA);
                  setActiveProductB(pB);
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                className="btn btn-secondary btn-sm"
                style={{ borderRadius: '999px', padding: '8px 16px', fontSize: '0.85rem' }}
              >
                {bc.brandA} vs {bc.brandB}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
