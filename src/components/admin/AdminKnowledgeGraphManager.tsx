import React, { useState, useEffect } from 'react';
import { TopicCluster } from '../../types/content';
import { contentService } from '../../services/contentService';
import { Network, Layers, BookOpen, Star, ArrowRightLeft, ExternalLink } from 'lucide-react';

export const AdminKnowledgeGraphManager: React.FC = () => {
  const [clusters, setClusters] = useState<TopicCluster[]>([]);

  useEffect(() => {
    contentService.getTopicClusters().then(setClusters);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: 'var(--shadow-card)' }}>
        <div className="flex items-center gap-xs" style={{ marginBottom: '8px' }}>
          <Network size={20} style={{ color: '#2563EB' }} />
          <h3 className="h3" style={{ margin: 0, color: '#1A1A1A' }}>
            Knowledge Graph Topic Clusters & Pillar Page Hierarchy
          </h3>
        </div>
        <p style={{ color: '#6B7280', fontSize: '0.86rem', margin: '0 0 24px' }}>
          Visualize semantic search topical authority clusters, internal link paths, and supporting sub-articles.
        </p>

        {clusters.map((cluster) => (
          <div
            key={cluster.id}
            style={{
              backgroundColor: '#F8FAFC',
              borderRadius: '16px',
              border: '1.5px solid #E2E8F0',
              padding: '24px',
              marginBottom: '20px'
            }}
          >
            {/* 1. Pillar Page Node */}
            <div style={{ padding: '14px 18px', backgroundColor: '#2563EB', color: '#FFFFFF', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div className="flex items-center gap-xs">
                <Layers size={18} />
                <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>Pillar Topic: {cluster.topicName}</span>
              </div>
              <span style={{ backgroundColor: '#1D4ED8', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
                {cluster.pillarPage.slug}
              </span>
            </div>

            {/* 2. Sub Clusters Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              {/* Buying Guides Cluster */}
              <div style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <div className="flex items-center gap-xs" style={{ marginBottom: '10px', color: '#2563EB', fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase' }}>
                  <BookOpen size={14} />
                  <span>Cluster 1: Buying Guides</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {cluster.buyingGuides.map((guide, idx) => (
                    <div key={idx} style={{ padding: '8px 10px', backgroundColor: '#F8FAFC', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>
                      • {guide.title}
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Reviews Cluster */}
              <div style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <div className="flex items-center gap-xs" style={{ marginBottom: '10px', color: '#059669', fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase' }}>
                  <Star size={14} />
                  <span>Cluster 2: Lab Reviews</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {cluster.productReviews.map((rev, idx) => (
                    <div key={idx} style={{ padding: '8px 10px', backgroundColor: '#F8FAFC', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>
                      • {rev.title}
                    </div>
                  ))}
                </div>
              </div>

              {/* Comparisons Cluster */}
              <div style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                <div className="flex items-center gap-xs" style={{ marginBottom: '10px', color: '#9333EA', fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase' }}>
                  <ArrowRightLeft size={14} />
                  <span>Cluster 3: Comparisons</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {cluster.comparisons.map((comp, idx) => (
                    <div key={idx} style={{ padding: '8px 10px', backgroundColor: '#F8FAFC', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>
                      • {comp.title}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
