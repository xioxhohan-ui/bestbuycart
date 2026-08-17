import React from 'react';
import { Subcategory } from '../../types/category';

interface SubcategoryPillBarProps {
  categorySlug: string;
  subcategories: Subcategory[];
  activeSubcategorySlug: string | null;
  onSelectSubcategory: (slug: string | null) => void;
  totalProductCount: number;
}

export const SubcategoryPillBar: React.FC<SubcategoryPillBarProps> = ({
  categorySlug,
  subcategories,
  activeSubcategorySlug,
  onSelectSubcategory,
  totalProductCount
}) => {
  return (
    <div style={{ marginBottom: '16px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          overflowX: 'auto',
          paddingBottom: '4px',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none'
        }}
      >
        {/* 'All' pill */}
        <button
          onClick={() => onSelectSubcategory(null)}
          className={`btn btn-sm ${activeSubcategorySlug === null ? 'btn-primary' : 'btn-secondary'}`}
          style={{
            borderRadius: '999px',
            fontSize: '0.78rem',
            padding: '5px 12px',
            flexShrink: 0,
            fontWeight: activeSubcategorySlug === null ? 700 : 500
          }}
        >
          All {categorySlug.toUpperCase()} ({totalProductCount})
        </button>

        {subcategories.map((sub) => {
          const isActive = activeSubcategorySlug === sub.slug;
          return (
            <button
              key={sub.id}
              onClick={() => onSelectSubcategory(sub.slug)}
              className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                borderRadius: '999px',
                fontSize: '0.78rem',
                padding: '5px 12px',
                flexShrink: 0,
                fontWeight: isActive ? 700 : 500,
                borderColor: isActive ? 'var(--accent-primary)' : 'var(--border-default)'
              }}
            >
              <span>{sub.name}</span>
              <span style={{ fontSize: '0.7rem', opacity: isActive ? 0.9 : 0.6, marginLeft: '4px' }}>
                ({sub.productCount})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
