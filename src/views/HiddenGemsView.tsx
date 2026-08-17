import React, { useEffect, useState } from 'react';
import { discoveryService } from '../services/discoveryService';
import { Product } from '../types/product';
import { ProductCard } from '../components/product/ProductCard';
import { useNavigation } from '../context/NavigationContext';
import { useCountry } from '../context/CountryContext';
import { Gem, ShieldCheck, Sparkles, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { updatePageSEO } from '../utils/seo';

export const HiddenGemsView: React.FC = () => {
  const [featuredGem, setFeaturedGem] = useState<Product | null>(null);
  const [gemsList, setGemsList] = useState<Product[]>([]);
  const { navigate } = useNavigation();
  const { formatPrice } = useCountry();

  useEffect(() => {
    updatePageSEO(
      'Hidden Gems — High Worth Products Discovered by Lab Analysis',
      'Discover underrated, high-scoring products with exceptional build quality and performance without the luxury brand markup.'
    );

    discoveryService.getHiddenGems().then((res: { featured: Product | null; gems: Product[] }) => {
      setFeaturedGem(res.featured);
      setGemsList(res.gems);
    });
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
          <span style={{ color: '#1A1A1A', fontWeight: 600 }}>Hidden Gems</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: '36px' }}>
          <div className="flex items-center gap-xs" style={{ marginBottom: '8px' }}>
            <Gem size={26} style={{ color: '#9333EA' }} />
            <h1 className="h1" style={{ margin: 0 }}>
              Hidden Gems
            </h1>
          </div>
          <p style={{ color: '#4B5563', margin: 0, fontSize: '1.02rem', maxWidth: '720px' }}>
            Products gaining recognition for exceptional value — discovered through our comprehensive benchmark analysis. Low marketing noise, maximum worth.
          </p>
        </div>

        {/* 1. Featured Discovery Spotlight */}
        {featuredGem && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '2px solid #E9D5FF',
              padding: '36px',
              boxShadow: 'var(--shadow-card)',
              marginBottom: '48px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '32px',
              alignItems: 'center'
            }}
          >
            <div style={{ backgroundColor: '#FAF5FF', borderRadius: '16px', padding: '24px', textAlign: 'center', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={featuredGem.image}
                alt={featuredGem.name}
                style={{ maxHeight: '240px', maxWidth: '100%', objectFit: 'contain' }}
              />
            </div>

            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#FAF5FF', color: '#9333EA', padding: '4px 10px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px' }}>
                <Sparkles size={12} /> Featured Discovery of the Week
              </div>

              <h2 className="h2" style={{ margin: '0 0 12px', color: '#1A1A1A' }}>
                {featuredGem.name}
              </h2>

              <div className="flex items-center gap-md" style={{ marginBottom: '16px', flexWrap: 'wrap' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#ECFDF5', color: '#059669', padding: '4px 10px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 800 }}>
                  <ShieldCheck size={14} /> Worth Index: {featuredGem.worthScore}%
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#FFF7ED', color: '#EA580C', padding: '4px 10px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700 }}>
                  Hype Index: {featuredGem.hypeScore}%
                </div>
                <span className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1A1A1A' }}>
                  {formatPrice(featuredGem.priceUSD)}
                </span>
              </div>

              <p style={{ color: '#4B5563', fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 24px' }}>
                {featuredGem.editorialQuote || featuredGem.verdict}
              </p>

              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/product-detail', { product: featuredGem })}
                style={{ backgroundColor: '#9333EA', borderRadius: '10px' }}
                icon={<ArrowRight size={16} />}
                iconPosition="right"
              >
                Discover This Product
              </Button>
            </div>
          </div>
        )}

        {/* 2. All Hidden Gems Grid */}
        <div style={{ marginBottom: '24px' }}>
          <h3 className="h3" style={{ margin: '0 0 16px', color: '#1A1A1A' }}>
            More High-Worth Discoveries
          </h3>
          <div className="grid-products grid-products-4col">
            {gemsList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
