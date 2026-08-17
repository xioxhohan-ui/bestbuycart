import React from 'react';
import { useCountry } from '../../context/CountryContext';
import { Zap, DollarSign, TrendingUp, Sparkles, Star } from 'lucide-react';

export type QuickFilterPreset = 'all' | 'under-50' | 'under-100' | 'under-250' | 'best-sellers' | 'rising';

interface QuickFilterStripProps {
  activePreset: QuickFilterPreset;
  onSelectPreset: (preset: QuickFilterPreset) => void;
}

export const QuickFilterStrip: React.FC<QuickFilterStripProps> = ({
  activePreset,
  onSelectPreset
}) => {
  const { currentCountry } = useCountry();

  const presets: { id: QuickFilterPreset; label: string; icon?: React.ReactNode }[] = [
    { id: 'all', label: 'All Items' },
    { id: 'under-50', label: `Under ${currentCountry.currencySymbol}50`, icon: <DollarSign size={12} /> },
    { id: 'under-100', label: `Under ${currentCountry.currencySymbol}100`, icon: <DollarSign size={12} /> },
    { id: 'under-250', label: `Under ${currentCountry.currencySymbol}250`, icon: <DollarSign size={12} /> },
    { id: 'best-sellers', label: 'Top Worth Picks', icon: <Star size={12} fill="currentColor" /> },
    { id: 'rising', label: 'Rising Fast', icon: <TrendingUp size={12} /> },
  ];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 14px',
        backgroundColor: '#F8FAFC',
        borderRadius: '12px',
        border: '1px solid var(--border-default)',
        marginBottom: '28px',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      <div className="flex items-center gap-2xs" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', flexShrink: 0, marginRight: '4px' }}>
        <Zap size={13} style={{ color: '#D97706' }} />
        <span>Quick Filters:</span>
      </div>

      <div style={{ display: 'flex', gap: '6px', flexWrap: 'nowrap' }}>
        {presets.map((p) => {
          const isActive = activePreset === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onSelectPreset(p.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '5px 12px',
                borderRadius: '999px',
                border: `1px solid ${isActive ? '#2563EB' : '#E2E8F0'}`,
                backgroundColor: isActive ? '#2563EB' : '#FFFFFF',
                color: isActive ? '#FFFFFF' : '#4B5563',
                fontSize: '0.78rem',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              {p.icon}
              <span>{p.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
