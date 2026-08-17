import React, { useState, useEffect } from 'react';
import { Product } from '../../types/product';
import { giftService } from '../../services/giftService';
import { ProductCard } from '../product/ProductCard';
import { Sparkles } from 'lucide-react';

interface YouMightAlsoLikeProps {
  currentProduct: Product;
}

export const YouMightAlsoLike: React.FC<YouMightAlsoLikeProps> = ({ currentProduct }) => {
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  useEffect(() => {
    giftService.getRelatedRecommendations(currentProduct).then(setRecommendations);
  }, [currentProduct]);

  if (recommendations.length === 0) return null;

  return (
    <div style={{ marginTop: '48px', marginBottom: '40px' }}>
      <div className="flex items-center gap-xs" style={{ marginBottom: '16px' }}>
        <Sparkles size={18} style={{ color: '#2563EB' }} />
        <h3 className="h3" style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: '1.05rem', color: '#1A1A1A' }}>
          You Might Also Like
        </h3>
      </div>
      <p style={{ color: '#6B7280', fontSize: '0.86rem', margin: '0 0 20px' }}>
        Based on benchmark comparisons, feature overlap, and category similarity.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        {recommendations.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
};
