import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { Compass, ArrowRight, ExternalLink } from 'lucide-react';

interface CategoryTopicClusterProps {
  categoryName: string;
  categorySlug: string;
}

export const CategoryTopicCluster: React.FC<CategoryTopicClusterProps> = ({
  categoryName,
  categorySlug
}) => {
  const { navigate } = useNavigation();

  return (
    <div
      style={{
        marginTop: '56px',
        padding: '28px',
        borderRadius: '16px',
        backgroundColor: '#F8FAFC',
        border: '1px solid #E2E8F0'
      }}
    >
      <div className="flex items-center gap-xs" style={{ marginBottom: '14px' }}>
        <Compass size={18} style={{ color: '#2563EB' }} />
        <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#1A1A1A' }}>
          Explore More in {categoryName} (Topic Cluster)
        </h4>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '12px',
          fontSize: '0.84rem'
        }}
      >
        <button
          onClick={() => navigate('/category-detail', { categorySlug, underPricePreset: 50 })}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            border: '1px solid #E5E7EB',
            color: '#2563EB',
            fontWeight: 600,
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          <span>Best {categoryName} Under $50</span>
          <ArrowRight size={13} />
        </button>

        <button
          onClick={() => navigate('/compare')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            border: '1px solid #E5E7EB',
            color: '#2563EB',
            fontWeight: 600,
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          <span>{categoryName} Head-to-Head Comparisons</span>
          <ArrowRight size={13} />
        </button>

        <button
          onClick={() => navigate('/tools')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            border: '1px solid #E5E7EB',
            color: '#2563EB',
            fontWeight: 600,
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          <span>Top {categoryName} Gifts for 2026</span>
          <ArrowRight size={13} />
        </button>

        <button
          onClick={() => navigate('/deals')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            backgroundColor: '#FFFFFF',
            borderRadius: '8px',
            border: '1px solid #E5E7EB',
            color: '#2563EB',
            fontWeight: 600,
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          <span>Verified {categoryName} Deals</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
};
