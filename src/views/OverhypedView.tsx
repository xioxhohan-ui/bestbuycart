import React, { useEffect, useState } from 'react';
import { discoveryService } from '../services/discoveryService';
import { Product } from '../types/product';
import { ProductCard } from '../components/product/ProductCard';
import { useNavigation } from '../context/NavigationContext';
import { useCountry } from '../context/CountryContext';
import { AlertTriangle, ShieldAlert, ArrowRight, CheckCircle2, ChevronRight, HelpCircle, ArrowRightLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { updatePageSEO } from '../utils/seo';

export const OverhypedView: React.FC = () => {
  const [featuredAlert, setFeaturedAlert] = useState<Product | null>(null);
  const [alternative, setAlternative] = useState<Product | null>(null);
  const [overhypedList, setOverhypedList] = useState<Product[]>([]);
  const { navigate } = useNavigation();
  const { formatPrice } = useCountry();

  useEffect(() => {
    updatePageSEO(
      'Overhyped Watch — Transparent Product Analysis & Value Gap Warnings',
      'Viral products assessed against lab benchmarks and verified longevity to protect your budget.'
    );

    discoveryService.getOverhypedWithAlternatives().then((res: { featuredAlert: Product | null; alternative: Product | null; overhypedList: Product[] }) => {
      setFeaturedAlert(res.featuredAlert);
      setAlternative(res.alternative);
      setOverhypedList(res.overhypedList);
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
          <span style={{ color: '#1A1A1A', fontWeight: 600 }}>Overhyped Watch</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: '36px' }}>
          <div className="flex items-center gap-xs" style={{ marginBottom: '8px' }}>
            <AlertTriangle size={26} style={{ color: '#DC2626' }} />
            <h1 className="h1" style={{ margin: 0 }}>
              Overhyped Watch
            </h1>
          </div>
          <p style={{ color: '#4B5563', margin: 0, fontSize: '1.02rem', maxWidth: '720px' }}>
            Popular products assessed against actual performance metrics. When social media virality doesn't match durability and real-world specs, we flag the value gap.
          </p>
        </div>

        {/* 1. Alert: Value Gap Detected Banner */}
        {featuredAlert && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              border: '2px solid #FECACA',
              padding: '36px',
              boxShadow: '0 8px 24px rgba(220, 38, 38, 0.08)',
              marginBottom: '48px'
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#FEF2F2', color: '#DC2626', padding: '4px 12px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '16px' }}>
              <ShieldAlert size={13} /> Value Gap Alert Detected
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', alignItems: 'center' }}>
              <div style={{ backgroundColor: '#FEF2F2', borderRadius: '16px', padding: '24px', textAlign: 'center', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={featuredAlert.image}
                  alt={featuredAlert.name}
                  style={{ maxHeight: '220px', maxWidth: '100%', objectFit: 'contain' }}
                />
              </div>

              <div>
                <h2 className="h2" style={{ margin: '0 0 12px', color: '#1A1A1A' }}>
                  {featuredAlert.name}
                </h2>

                <div className="flex items-center gap-md" style={{ marginBottom: '16px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#FFF7ED', color: '#EA580C', padding: '4px 10px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 800 }}>
                    Hype Index: {featuredAlert.hypeScore}%
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#FEF2F2', color: '#DC2626', padding: '4px 10px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 800 }}>
                    Worth Index: {featuredAlert.worthScore}%
                  </div>
                  <span className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1A1A1A' }}>
                    {formatPrice(featuredAlert.priceUSD)}
                  </span>
                </div>

                <p style={{ color: '#4B5563', fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 24px' }}>
                  {featuredAlert.overhypedReason || featuredAlert.verdict}
                </p>

                {alternative ? (
                  <div className="flex items-center gap-sm flex-wrap">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => navigate('/compare', { productA: featuredAlert, productB: alternative })}
                      style={{ backgroundColor: '#059669', borderRadius: '10px' }}
                      icon={<ArrowRightLeft size={16} />}
                    >
                      Compare with Smarter Alternative ({alternative.name.slice(0, 24)}...)
                    </Button>
                    <Button
                      variant="secondary"
                      size="lg"
                      onClick={() => navigate('/product-detail', { product: alternative })}
                      style={{ borderRadius: '10px' }}
                    >
                      View Alternative Details
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => navigate('/categories')}
                    style={{ borderRadius: '10px' }}
                  >
                    Explore Alternative Brands
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 2. Overhyped Grid */}
        {overhypedList.length > 0 && (
          <div style={{ marginBottom: '48px' }}>
            <h3 className="h3" style={{ margin: '0 0 16px', color: '#1A1A1A' }}>
              Additional Items Under Caution Review
            </h3>
            <div className="grid-products grid-products-4col">
              {overhypedList.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* 3. Methodology Proof */}
        <div
          style={{
            backgroundColor: '#F8FAFC',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            flexWrap: 'wrap'
          }}
        >
          <div>
            <h4 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 700, color: '#1A1A1A' }}>
              How Does Our Overhyped Detection Algorithm Work?
            </h4>
            <p style={{ margin: 0, fontSize: '0.86rem', color: '#4B5563', maxWidth: '640px' }}>
              We track the statistical delta between social marketing expenditure and verified long-term durability tests. If marketing outpaces real-world reliability by &gt; 35%, a value caution is triggered.
            </p>
          </div>

          <Button variant="secondary" size="md" onClick={() => navigate('/guides')}>
            Read Methodology Paper
          </Button>
        </div>
      </div>
    </div>
  );
};
