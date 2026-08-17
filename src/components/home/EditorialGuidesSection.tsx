import React from 'react';
import { BuyingGuide } from '../../types/guide';
import { useNavigation } from '../../context/NavigationContext';
import { BookOpen, ArrowRight, Clock, User, BarChart3 } from 'lucide-react';

interface EditorialGuidesSectionProps {
  guides: BuyingGuide[];
}

export const EditorialGuidesSection: React.FC<EditorialGuidesSectionProps> = ({ guides }) => {
  const { navigate } = useNavigation();

  return (
    <section style={{ padding: '60px 0', borderTop: '1px solid var(--border-default)' }}>
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between" style={{ marginBottom: '28px' }}>
          <div>
            <div className="flex items-center gap-xs" style={{ marginBottom: '4px' }}>
              <BookOpen size={22} style={{ color: '#2563EB' }} />
              <h2 className="h2" style={{ margin: 0 }}>
                INSIGHTS & GUIDES
              </h2>
            </div>
            <p style={{ color: '#4B5563', margin: 0, fontSize: '0.95rem' }}>
              Make informed decisions with our research-backed buying guides.
            </p>
          </div>

          <button
            onClick={() => navigate('/guides')}
            className="btn btn-ghost btn-sm"
            style={{ color: '#2563EB', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            <span>View All Guides</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 3-Card Guides Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '32px'
          }}
        >
          {guides.map((guide) => (
            <div
              key={guide.id}
              onClick={() => navigate('/guides')}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E5E7EB',
                boxShadow: 'var(--shadow-card)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                e.currentTarget.style.borderColor = '#2563EB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                e.currentTarget.style.borderColor = '#E5E7EB';
              }}
            >
              <div className="flex items-center justify-between" style={{ marginBottom: '12px' }}>
                <span
                  style={{
                    backgroundColor: '#EFF6FF',
                    color: '#2563EB',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase'
                  }}
                >
                  {guide.category}
                </span>

                <div className="flex items-center gap-xs" style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                  <Clock size={12} />
                  <span>{guide.readTime}</span>
                </div>
              </div>

              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.4, margin: '0 0 10px' }}>
                {guide.title}
              </h4>

              <p style={{ color: '#4B5563', fontSize: '0.85rem', lineHeight: 1.5, margin: '0 0 16px', flex: 1 }}>
                {guide.summary}
              </p>

              <div
                className="flex items-center justify-between"
                style={{
                  paddingTop: '12px',
                  borderTop: '1px solid #F0F1F3',
                  fontSize: '0.78rem',
                  color: '#6B7280'
                }}
              >
                <span>By {guide.author.name}</span>
                <span style={{ color: '#2563EB', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                  Read Guide <ArrowRight size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Data Proof Banner */}
        <div
          style={{
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap'
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: '#EFF6FF',
              color: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <BarChart3 size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="flex items-center gap-xs" style={{ fontWeight: 700, color: '#1A1A1A', fontSize: '0.92rem' }}>
              <BarChart3 size={15} style={{ color: '#2563EB' }} /> What Our Data Intelligence Shows
            </div>
            <p style={{ margin: 0, color: '#4B5563', fontSize: '0.85rem', lineHeight: 1.4 }}>
              "We analyzed historical pricing curves and verified user feedback across 50,000+ consumer items to establish real worth scores."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
