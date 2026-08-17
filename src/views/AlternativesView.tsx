import React, { useEffect, useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useCountry } from '../context/CountryContext';
import { comparisonService } from '../services/comparisonService';
import { Product } from '../types/product';
import { Trophy, DollarSign, Crown, ArrowRight, ArrowRightLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { updatePageSEO } from '../utils/seo';

export const AlternativesView: React.FC = () => {
  const { selectedProduct, navigate } = useNavigation();
  const { formatPrice } = useCountry();

  const [targetProduct, setTargetProduct] = useState<Product | null>(null);
  const [bestAlternative, setBestAlternative] = useState<Product | null>(null);
  const [cheaperAlternative, setCheaperAlternative] = useState<Product | null>(null);
  const [higherPerformance, setHigherPerformance] = useState<Product | null>(null);

  useEffect(() => {
    const targetId = selectedProduct?.id || 'prod-1';
    comparisonService.getAlternativesForProduct(targetId).then((res) => {
      setTargetProduct(res.targetProduct || null);
      setBestAlternative(res.bestAlternative || null);
      setCheaperAlternative(res.cheaperAlternative || null);
      setHigherPerformance(res.higherPerformance || null);

      if (res.targetProduct) {
        updatePageSEO(
          `Best Alternatives to ${res.targetProduct.name} (2026 Tested Guide)`,
          `Looking for alternatives to ${res.targetProduct.name}? Compare top budget, high-performance, and value replacements.`
        );
      }
    });
  }, [selectedProduct]);

  if (!targetProduct) return null;

  return (
    <div style={{ padding: '32px 0 80px' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div className="flex items-center gap-xs" style={{ fontSize: '0.8rem', color: '#6B7280', marginBottom: '20px' }}>
          <span onClick={() => navigate('/')} style={{ cursor: 'pointer', color: '#2563EB', fontWeight: 500 }}>
            Home
          </span>
          <ChevronRight size={13} />
          <span onClick={() => navigate('/trending')} style={{ cursor: 'pointer', color: '#2563EB', fontWeight: 500 }}>
            Products
          </span>
          <ChevronRight size={13} />
          <span style={{ color: '#1A1A1A', fontWeight: 600 }}>Alternatives</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: '36px' }}>
          <h1 className="h1" style={{ margin: '0 0 8px', color: '#1A1A1A' }}>
            Alternatives to {targetProduct.name}
          </h1>
          <p style={{ color: '#4B5563', margin: 0, fontSize: '1rem', maxWidth: '720px' }}>
            Products worth considering instead. Benchmarked for similar form factor, durability, and feature parity across three distinct budget tiers.
          </p>
        </div>

        {/* Target Reference Card */}
        <div
          style={{
            backgroundColor: '#F8FAFC',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '20px 24px',
            marginBottom: '36px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap'
          }}
        >
          <img
            src={targetProduct.image}
            alt={targetProduct.name}
            style={{ width: '60px', height: '60px', objectFit: 'contain', borderRadius: '10px', backgroundColor: '#FFFFFF' }}
          />
          <div style={{ flex: 1, minWidth: '240px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase' }}>
              Base Reference Product
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#1A1A1A' }}>
              {targetProduct.name}
            </div>
          </div>
          <div className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1A1A1A' }}>
            {formatPrice(targetProduct.priceUSD)}
          </div>
        </div>

        {/* Alternative Tiers */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* 1. Best Alternative */}
          {bestAlternative && (
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                border: '2px solid #2563EB',
                padding: '28px',
                boxShadow: '0 8px 24px rgba(37, 99, 235, 0.08)',
                display: 'flex',
                gap: '24px',
                alignItems: 'center',
                flexWrap: 'wrap'
              }}
            >
              <img
                src={bestAlternative.image}
                alt={bestAlternative.name}
                style={{ width: '90px', height: '90px', objectFit: 'contain', borderRadius: '12px', backgroundColor: '#F8FAFC' }}
              />
              <div style={{ flex: 1, minWidth: '260px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#EFF6FF', color: '#2563EB', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
                  <Trophy size={12} /> 1. Best Overall Alternative
                </span>
                <h3 className="h3" style={{ fontSize: '1.1rem', margin: '0 0 6px', color: '#1A1A1A' }}>
                  {bestAlternative.name}
                </h3>
                <p style={{ color: '#4B5563', fontSize: '0.86rem', margin: '0 0 10px', lineHeight: 1.4 }}>
                  {bestAlternative.verdict}
                </p>
                <div className="flex items-center gap-md" style={{ fontSize: '0.82rem' }}>
                  <span className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1A1A1A' }}>
                    {formatPrice(bestAlternative.priceUSD)}
                  </span>
                  <span style={{ color: '#059669', fontWeight: 700 }}>Worth: {bestAlternative.worthScore}%</span>
                </div>
              </div>
              <div className="flex items-center gap-sm">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => navigate('/compare', { productA: targetProduct, productB: bestAlternative })}
                  icon={<ArrowRightLeft size={14} />}
                >
                  Compare Head-to-Head
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => navigate('/product-detail', { product: bestAlternative })}
                >
                  View Details
                </Button>
              </div>
            </div>
          )}

          {/* 2. Cheaper Alternative */}
          {cheaperAlternative && (
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                border: '1.5px solid #A7F3D0',
                padding: '28px',
                boxShadow: 'var(--shadow-card)',
                display: 'flex',
                gap: '24px',
                alignItems: 'center',
                flexWrap: 'wrap'
              }}
            >
              <img
                src={cheaperAlternative.image}
                alt={cheaperAlternative.name}
                style={{ width: '90px', height: '90px', objectFit: 'contain', borderRadius: '12px', backgroundColor: '#F8FAFC' }}
              />
              <div style={{ flex: 1, minWidth: '260px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#ECFDF5', color: '#059669', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
                  <DollarSign size={12} /> 2. Cheaper Budget Champion
                </span>
                <h3 className="h3" style={{ fontSize: '1.1rem', margin: '0 0 6px', color: '#1A1A1A' }}>
                  {cheaperAlternative.name}
                </h3>
                <p style={{ color: '#4B5563', fontSize: '0.86rem', margin: '0 0 10px', lineHeight: 1.4 }}>
                  85% of the performance at a fraction of the price. {cheaperAlternative.verdict}
                </p>
                <div className="flex items-center gap-md" style={{ fontSize: '0.82rem' }}>
                  <span className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1A1A1A' }}>
                    {formatPrice(cheaperAlternative.priceUSD)}
                  </span>
                  <span style={{ color: '#059669', fontWeight: 700 }}>Worth: {cheaperAlternative.worthScore}%</span>
                </div>
              </div>
              <div className="flex items-center gap-sm">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => navigate('/compare', { productA: targetProduct, productB: cheaperAlternative })}
                  style={{ backgroundColor: '#059669' }}
                  icon={<ArrowRightLeft size={14} />}
                >
                  Compare Head-to-Head
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => navigate('/product-detail', { product: cheaperAlternative })}
                >
                  View Details
                </Button>
              </div>
            </div>
          )}

          {/* 3. Higher Performance Alternative */}
          {higherPerformance && (
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                border: '1.5px solid #E9D5FF',
                padding: '28px',
                boxShadow: 'var(--shadow-card)',
                display: 'flex',
                gap: '24px',
                alignItems: 'center',
                flexWrap: 'wrap'
              }}
            >
              <img
                src={higherPerformance.image}
                alt={higherPerformance.name}
                style={{ width: '90px', height: '90px', objectFit: 'contain', borderRadius: '12px', backgroundColor: '#F8FAFC' }}
              />
              <div style={{ flex: 1, minWidth: '260px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#FAF5FF', color: '#9333EA', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
                  <Crown size={12} /> ⭐ 3. Premium Upgrade Alternative
                </span>
                <h3 className="h3" style={{ fontSize: '1.1rem', margin: '0 0 6px', color: '#1A1A1A' }}>
                  {higherPerformance.name}
                </h3>
                <p style={{ color: '#4B5563', fontSize: '0.86rem', margin: '0 0 10px', lineHeight: 1.4 }}>
                  Maximum build quality and class-leading specs. {higherPerformance.verdict}
                </p>
                <div className="flex items-center gap-md" style={{ fontSize: '0.82rem' }}>
                  <span className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1A1A1A' }}>
                    {formatPrice(higherPerformance.priceUSD)}
                  </span>
                  <span style={{ color: '#9333EA', fontWeight: 700 }}>Worth: {higherPerformance.worthScore}%</span>
                </div>
              </div>
              <div className="flex items-center gap-sm">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => navigate('/compare', { productA: targetProduct, productB: higherPerformance })}
                  style={{ backgroundColor: '#9333EA' }}
                  icon={<ArrowRightLeft size={14} />}
                >
                  Compare Head-to-Head
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => navigate('/product-detail', { product: higherPerformance })}
                >
                  View Details
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
