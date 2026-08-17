import React, { useEffect, useState } from 'react';
import { comparisonService } from '../services/comparisonService';
import { BrandComparison } from '../types/comparison';
import { BrandComparisonCard } from '../components/compare/BrandComparisonCard';
import { useNavigation } from '../context/NavigationContext';
import { ArrowRightLeft, ChevronRight } from 'lucide-react';
import { updatePageSEO } from '../utils/seo';

export const BrandCompareView: React.FC = () => {
  const { navigate } = useNavigation();
  const [allBrands, setAllBrands] = useState<BrandComparison[]>([]);
  const [activeComparison, setActiveComparison] = useState<BrandComparison | null>(null);

  useEffect(() => {
    comparisonService.getBrandComparisons().then((brands) => {
      setAllBrands(brands);
      setActiveComparison(brands[0] || null);
      if (brands[0]) {
        updatePageSEO(
          `${brands[0].brandA} vs ${brands[0].brandB} — Full Brand Ecosystem Faceoff`,
          brands[0].summary
        );
      }
    });
  }, []);

  if (!activeComparison) return null;

  return (
    <div style={{ padding: '32px 0 80px' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div className="flex items-center gap-xs" style={{ fontSize: '0.8rem', color: '#6B7280', marginBottom: '20px' }}>
          <span onClick={() => navigate('/')} style={{ cursor: 'pointer', color: '#2563EB', fontWeight: 500 }}>
            Home
          </span>
          <ChevronRight size={13} />
          <span onClick={() => navigate('/compare')} style={{ cursor: 'pointer', color: '#2563EB', fontWeight: 500 }}>
            Comparisons
          </span>
          <ChevronRight size={13} />
          <span style={{ color: '#1A1A1A', fontWeight: 600 }}>Brand Faceoffs</span>
        </div>

        {/* Switcher Bar */}
        <div className="flex items-center gap-sm" style={{ marginBottom: '32px' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#4B5563', textTransform: 'uppercase' }}>
            Select Brand Matchup:
          </span>
          {allBrands.map((b) => (
            <button
              key={b.id}
              onClick={() => setActiveComparison(b)}
              className={`btn btn-sm ${activeComparison.id === b.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: '999px', fontSize: '0.82rem' }}
            >
              {b.brandA} vs {b.brandB}
            </button>
          ))}
        </div>

        {/* Brand Comparison Card */}
        <BrandComparisonCard comparison={activeComparison} />
      </div>
    </div>
  );
};
