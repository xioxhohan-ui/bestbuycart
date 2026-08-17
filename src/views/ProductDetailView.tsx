import React, { useEffect, useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useCountry } from '../context/CountryContext';
import { productService } from '../services/productService';
import { Product } from '../types/product';
import { RetailerOffersTable } from '../components/product/RetailerOffersTable';
import { ProductCard } from '../components/product/ProductCard';
import { PriceHistoryChart } from '../components/deals/PriceHistoryChart';
import { PriceAlertWidget } from '../components/deals/PriceAlertWidget';
import { ProductReviewsSection } from '../components/reviews/ProductReviewsSection';
import { CompleteTheSet } from '../components/gifts/CompleteTheSet';
import { YouMightAlsoLike } from '../components/gifts/YouMightAlsoLike';
import {
  Flame,
  Star,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRightLeft,
  ArrowLeft,
  Share2,
  Sparkles,
  TrendingUp,
  Info,
  Compass
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { updatePageSEO } from '../utils/seo';

export const ProductDetailView: React.FC = () => {
  const { selectedProduct, navigate, openCompareWithProduct } = useNavigation();
  const { formatPrice } = useCountry();
  const [product, setProduct] = useState<Product | null>(selectedProduct);
  const [alternatives, setAlternatives] = useState<Product[]>([]);

  useEffect(() => {
    if (selectedProduct) {
      setProduct(selectedProduct);
      updatePageSEO(`${selectedProduct.name} Review & Score Breakdown`, selectedProduct.summary);
      productService.getRelatedAlternatives(selectedProduct).then(setAlternatives);
    } else {
      // Fallback to first product
      productService.getAllProducts().then((all) => {
        if (all.length > 0) {
          setProduct(all[0]);
          updatePageSEO(`${all[0].name} Review & Score Breakdown`, all[0].summary);
          productService.getRelatedAlternatives(all[0]).then(setAlternatives);
        }
      });
    }
  }, [selectedProduct]);

  if (!product) return null;

  return (
    <div style={{ padding: '32px 0 80px' }}>
      <div className="container">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between" style={{ marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <button
            onClick={() => navigate('/')}
            className="btn btn-ghost btn-sm"
            style={{ padding: 0, color: '#6B7280', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <ArrowLeft size={16} />
            <span>Back to Discovery</span>
          </button>

          <div className="flex items-center gap-xs">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('/alternatives', { product })}
              icon={<Compass size={14} />}
            >
              View Tested Alternatives
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => openCompareWithProduct(product)}
              icon={<ArrowRightLeft size={14} />}
            >
              Compare with Competitor
            </Button>
          </div>
        </div>

        {/* Top Product Hero Card */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px',
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid var(--border-default)',
            padding: '36px',
            boxShadow: 'var(--shadow-card)',
            marginBottom: '40px'
          }}
        >
          {/* Left Column: Image */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                borderRadius: '16px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E5E7EB',
                padding: '24px',
                textAlign: 'center',
                overflow: 'hidden'
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', maxHeight: '340px', objectFit: 'contain', margin: '0 auto' }}
              />
            </div>
          </div>

          {/* Right Column: Title, Scores, Verdict, Primary CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div className="flex items-center justify-between" style={{ marginBottom: '6px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {product.brand} • {product.category.toUpperCase()}
                </span>
                <span className="flex items-center gap-xs" style={{ color: '#D97706', fontWeight: 700, fontSize: '0.9rem' }}>
                  <Star size={15} fill="#D97706" style={{ color: '#D97706' }} />
                  {product.rating} ({product.reviewCount.toLocaleString()} reviews)
                </span>
              </div>

              <h1 className="h2" style={{ margin: 0, color: '#1A1A1A', lineHeight: 1.25 }}>
                {product.name}
              </h1>
            </div>

            {/* Price & Badge */}
            <div className="flex items-baseline gap-sm">
              <span className="font-mono" style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1A1A1A' }}>
                {formatPrice(product.priceUSD)}
              </span>
              {product.originalPriceUSD && (
                <span className="font-mono" style={{ fontSize: '1.05rem', color: '#9CA3AF', textDecoration: 'line-through' }}>
                  {formatPrice(product.originalPriceUSD)}
                </span>
              )}
            </div>

            {/* Verdict Box */}
            <div
              style={{
                backgroundColor: '#EFF6FF',
                border: '1px solid #BFDBFE',
                borderRadius: '12px',
                padding: '14px 16px'
              }}
            >
              <div className="flex items-center gap-xs" style={{ fontSize: '0.72rem', fontWeight: 700, color: '#2563EB', textTransform: 'uppercase', marginBottom: '4px' }}>
                <Sparkles size={12} /> Editorial Verdict:
              </div>
              <p style={{ margin: 0, color: '#1E40AF', fontWeight: 600, fontSize: '0.92rem', lineHeight: 1.45 }}>
                "{product.verdict}"
              </p>
            </div>

            {/* Dual Score Metric Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '4px' }}>
              <div
                style={{
                  backgroundColor: '#FFF7ED',
                  border: '1px solid #FFEDD5',
                  borderRadius: '12px',
                  padding: '12px 16px'
                }}
              >
                <div className="flex items-center gap-2xs" style={{ color: '#EA580C', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  <Flame size={14} />
                  <span>Hype Score</span>
                </div>
                <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#EA580C', marginTop: '2px' }}>
                  {product.hypeScore} <span style={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.7 }}>/100</span>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#9A3412' }}>Viral search & social velocity</span>
              </div>

              <div
                style={{
                  backgroundColor: '#ECFDF5',
                  border: '1.5px solid #A7F3D0',
                  borderRadius: '12px',
                  padding: '12px 16px'
                }}
              >
                <div className="flex items-center gap-2xs" style={{ color: '#059669', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  <ShieldCheck size={14} />
                  <span>Worth Score</span>
                </div>
                <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#059669', marginTop: '2px' }}>
                  {product.worthScore} <span style={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.7 }}>/100</span>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#065F46' }}>Verified build & value ratio</span>
              </div>
            </div>

            <p style={{ color: '#4B5563', fontSize: '0.92rem', lineHeight: 1.6, margin: '8px 0 0' }}>
              {product.summary}
            </p>
          </div>
        </div>

        {/* 30-Day Price History Radar & Price Drop Alert Widget */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          <PriceHistoryChart productId={product.id} currentPriceUSD={product.priceUSD} />
          <PriceAlertWidget productId={product.id} productName={product.name} currentPriceUSD={product.priceUSD} />
        </div>

        {/* Retailer Price Comparison Matrix */}
        <div style={{ marginBottom: '40px' }}>
          <RetailerOffersTable offers={product.offers} />
        </div>

        {/* Complete the Set - Upsell Companion Accessories */}
        <CompleteTheSet product={product} />

        {/* Pros & Cons and Detailed Specifications */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
            marginBottom: '48px'
          }}
        >
          {/* Pros & Cons Box */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid var(--border-default)',
              padding: '28px',
              boxShadow: 'var(--shadow-card)'
            }}
          >
            <h3 className="h3" style={{ margin: '0 0 18px', color: '#1A1A1A' }}>
              Pros & Considerations
            </h3>

            <div style={{ marginBottom: '20px' }}>
              <div className="flex items-center gap-xs" style={{ fontWeight: 700, fontSize: '0.85rem', color: '#059669', marginBottom: '8px' }}>
                <CheckCircle2 size={15} /> What We Like:
              </div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {product.pros.map((pro, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.88rem', color: '#374151' }}>
                    <CheckCircle2 size={16} style={{ color: '#059669', flexShrink: 0, marginTop: '2px' }} />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-xs" style={{ fontWeight: 700, fontSize: '0.85rem', color: '#DC2626', marginBottom: '8px' }}>
                <XCircle size={15} /> Things to Consider:
              </div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {product.cons.map((con, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.88rem', color: '#374151' }}>
                    <XCircle size={16} style={{ color: '#DC2626', flexShrink: 0, marginTop: '2px' }} />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Technical Specifications */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid var(--border-default)',
              padding: '28px',
              boxShadow: 'var(--shadow-card)'
            }}
          >
            <h3 className="h3" style={{ margin: '0 0 18px', color: '#1A1A1A' }}>
              Technical Specifications
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {product.specs.map((spec, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    backgroundColor: i % 2 === 0 ? '#F8FAFC' : '#FFFFFF',
                    borderRadius: '8px',
                    fontSize: '0.88rem'
                  }}
                >
                  <span style={{ fontWeight: 600, color: '#6B7280' }}>{spec.name}</span>
                  <span style={{ fontWeight: 700, color: '#1A1A1A' }}>{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Verified Community Reviews Section */}
        <ProductReviewsSection product={product} />

        {/* You Might Also Like - Cross-Sell Component */}
        <YouMightAlsoLike currentProduct={product} />

        {/* Related Alternatives */}
        {alternatives.length > 0 && (
          <div style={{ marginTop: '48px', paddingTop: '40px', borderTop: '1px solid var(--border-default)' }}>
            <h3 className="h2" style={{ marginBottom: '24px', color: '#1A1A1A' }}>
              Top Alternatives in this Category
            </h3>
            <div className="grid-products">
              {alternatives.map((alt) => (
                <ProductCard key={alt.id} product={alt} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
