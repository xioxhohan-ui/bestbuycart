import React, { useState } from 'react';
import { useCountry } from '../../context/CountryContext';
import { Filter, X, Check, Star, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { Button } from '../ui/Button';

export interface FilterState {
  minPrice: number | '';
  maxPrice: number | '';
  selectedBrands: string[];
  minRating: number;
  inStockOnly: boolean;
  selectedFeatures: string[];
}

interface CategoryFilterSidebarProps {
  availableBrands: { name: string; count: number }[];
  availableFeatures: string[];
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  isMobileDrawerOpen?: boolean;
  onCloseMobileDrawer?: () => void;
}

export const CategoryFilterSidebar: React.FC<CategoryFilterSidebarProps> = ({
  availableBrands,
  availableFeatures,
  filters,
  onFilterChange,
  onResetFilters,
  isMobileDrawerOpen = false,
  onCloseMobileDrawer
}) => {
  const { currentCountry } = useCountry();

  const handleBrandToggle = (brand: string) => {
    const isSelected = filters.selectedBrands.includes(brand);
    const updated = isSelected
      ? filters.selectedBrands.filter((b) => b !== brand)
      : [...filters.selectedBrands, brand];
    onFilterChange({ ...filters, selectedBrands: updated });
  };

  const handleFeatureToggle = (feature: string) => {
    const isSelected = filters.selectedFeatures.includes(feature);
    const updated = isSelected
      ? filters.selectedFeatures.filter((f) => f !== feature)
      : [...filters.selectedFeatures, feature];
    onFilterChange({ ...filters, selectedFeatures: updated });
  };

  const content = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between" style={{ paddingBottom: '14px', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="flex items-center gap-xs">
          <SlidersHorizontal size={16} style={{ color: '#2563EB' }} />
          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1A1A1A' }}>
            Filter Options
          </span>
        </div>

        <button
          onClick={onResetFilters}
          className="btn btn-ghost btn-sm"
          style={{ padding: '4px 8px', fontSize: '0.75rem', color: '#6B7280', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
        >
          <RotateCcw size={12} />
          <span>Clear All</span>
        </button>
      </div>

      {/* 1. Price Range */}
      <div>
        <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '10px' }}>
          Price Range ({currentCountry.currencyCode})
        </label>
        <div className="flex items-center gap-sm">
          <div style={{ position: 'relative', flex: 1 }}>
            <span style={{ position: 'absolute', left: '10px', top: '9px', fontSize: '0.85rem', color: '#9CA3AF' }}>
              {currentCountry.currencySymbol}
            </span>
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => onFilterChange({ ...filters, minPrice: e.target.value === '' ? '' : Number(e.target.value) })}
              placeholder="Min"
              style={{
                width: '100%',
                padding: '8px 8px 8px 24px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                fontSize: '0.88rem',
                outline: 'none',
                backgroundColor: '#F8FAFC'
              }}
            />
          </div>
          <span style={{ color: '#9CA3AF' }}>to</span>
          <div style={{ position: 'relative', flex: 1 }}>
            <span style={{ position: 'absolute', left: '10px', top: '9px', fontSize: '0.85rem', color: '#9CA3AF' }}>
              {currentCountry.currencySymbol}
            </span>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => onFilterChange({ ...filters, maxPrice: e.target.value === '' ? '' : Number(e.target.value) })}
              placeholder="Max"
              style={{
                width: '100%',
                padding: '8px 8px 8px 24px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                fontSize: '0.88rem',
                outline: 'none',
                backgroundColor: '#F8FAFC'
              }}
            />
          </div>
        </div>
      </div>

      {/* 2. Brand Filter */}
      {availableBrands.length > 0 && (
        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '10px' }}>
            Brands
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
            {availableBrands.map((b) => {
              const isChecked = filters.selectedBrands.includes(b.name);
              return (
                <label
                  key={b.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.85rem',
                    color: isChecked ? '#1A1A1A' : '#4B5563',
                    fontWeight: isChecked ? 600 : 400,
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  <div className="flex items-center gap-sm">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleBrandToggle(b.name)}
                      style={{ width: '16px', height: '16px', accentColor: '#2563EB', cursor: 'pointer' }}
                    />
                    <span>{b.name}</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>({b.count})</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Rating Filter */}
      <div>
        <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '10px' }}>
          Customer Rating
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[4, 3].map((rating) => {
            const isSelected = filters.minRating === rating;
            return (
              <button
                key={rating}
                type="button"
                onClick={() => onFilterChange({ ...filters, minRating: isSelected ? 0 : rating })}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  border: `1px solid ${isSelected ? '#2563EB' : '#E5E7EB'}`,
                  backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                  fontSize: '0.82rem',
                  fontWeight: isSelected ? 700 : 500,
                  color: isSelected ? '#2563EB' : '#4B5563',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div className="flex items-center text-warning" style={{ color: '#D97706' }}>
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} size={12} fill="#D97706" />
                  ))}
                </div>
                <span>{rating}+ Stars & Above</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Features Filter Chips */}
      {availableFeatures.length > 0 && (
        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '10px' }}>
            Features & Capabilities
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {availableFeatures.map((feat) => {
              const isSelected = filters.selectedFeatures.includes(feat);
              return (
                <button
                  key={feat}
                  type="button"
                  onClick={() => handleFeatureToggle(feat)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: `1px solid ${isSelected ? '#2563EB' : '#E5E7EB'}`,
                    backgroundColor: isSelected ? '#2563EB' : '#FFFFFF',
                    color: isSelected ? '#FFFFFF' : '#4B5563',
                    fontSize: '0.75rem',
                    fontWeight: isSelected ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {isSelected && <Check size={11} strokeWidth={3} />}
                  <span>{feat}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. In-Stock Filter */}
      <div>
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: '#1A1A1A',
            cursor: 'pointer'
          }}
        >
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onFilterChange({ ...filters, inStockOnly: e.target.checked })}
            style={{ width: '16px', height: '16px', accentColor: '#059669', cursor: 'pointer' }}
          />
          <span>In Stock Items Only</span>
        </label>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside
        className="hide-mobile"
        style={{
          width: '260px',
          flexShrink: 0,
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid var(--border-default)',
          padding: '24px',
          boxShadow: 'var(--shadow-card)',
          height: 'fit-content'
        }}
      >
        {content}
      </aside>

      {/* Mobile Slide-Up Drawer */}
      {isMobileDrawerOpen && (
        <div className="modal-backdrop hide-desktop" onClick={onCloseMobileDrawer}>
          <div
            className="modal-content"
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              width: '100%',
              maxWidth: '100%',
              borderRadius: '24px 24px 0 0',
              padding: '24px',
              maxHeight: '80vh',
              animation: 'modalPop 0.25s ease-out'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between" style={{ marginBottom: '16px' }}>
              <h3 className="h3" style={{ margin: 0 }}>Filter Products</h3>
              <button onClick={onCloseMobileDrawer} className="btn btn-ghost btn-sm">
                <X size={20} />
              </button>
            </div>
            <div style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '4px' }}>
              {content}
            </div>
            <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #E5E7EB' }}>
              <Button
                variant="primary"
                size="md"
                onClick={onCloseMobileDrawer}
                style={{ width: '100%', borderRadius: '10px' }}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
