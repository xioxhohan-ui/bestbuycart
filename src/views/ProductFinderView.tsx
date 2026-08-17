import React, { useEffect } from 'react';
import { AIFinderWizard } from '../components/discovery/AIFinderWizard';
import { Sparkles, ChevronRight, CheckCircle2, ShieldCheck, Database } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { updatePageSEO } from '../utils/seo';

export const ProductFinderView: React.FC = () => {
  const { navigate } = useNavigation();

  useEffect(() => {
    updatePageSEO(
      'AI Product Match Wizard — Find Your Perfect Match',
      'Interactive multi-dimensional product finder powered by verified lab benchmarks, battery testing, and price-to-spec algorithms.'
    );
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
          <span onClick={() => navigate('/tools')} style={{ cursor: 'pointer', color: '#2563EB', fontWeight: 500 }}>
            Tools
          </span>
          <ChevronRight size={13} />
          <span style={{ color: '#1A1A1A', fontWeight: 600 }}>AI Product Matcher</span>
        </div>

        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px' }}>
          <div className="flex items-center justify-center gap-xs" style={{ marginBottom: '8px' }}>
            <Sparkles size={24} style={{ color: '#2563EB' }} />
            <h1 className="h1" style={{ margin: 0 }}>
              Find Your Perfect Product
            </h1>
          </div>
          <p style={{ color: '#4B5563', margin: 0, fontSize: '0.98rem' }}>
            Tell us your target category and budget, and our model will match you with the top 3 options based on thousands of verified data points.
          </p>
        </div>

        {/* Interactive Wizard */}
        <AIFinderWizard />
      </div>
    </div>
  );
};
