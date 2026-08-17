import React from 'react';
import { Flame, Star, Diamond, Zap, Gift, Compass } from 'lucide-react';
import { useSearch } from '../../context/SearchContext';
import { useNavigation } from '../../context/NavigationContext';

export const QuickIntentChips: React.FC = () => {
  const { openSearch } = useSearch();
  const { navigate } = useNavigation();

  const chips = [
    {
      label: 'Trending Products',
      icon: <Flame size={14} style={{ color: '#EA580C' }} />,
      action: () => {
        const el = document.getElementById('trending-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else navigate('/trending');
      }
    },
    {
      label: 'Worth It Score',
      icon: <Star size={14} style={{ color: '#059669' }} fill="#059669" />,
      action: () => {
        const el = document.getElementById('rising-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else openSearch('worth score > 90');
      }
    },
    {
      label: 'Hidden Gems',
      icon: <Diamond size={14} style={{ color: '#2563EB' }} />,
      action: () => {
        const el = document.getElementById('gems-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else openSearch('hidden gems');
      }
    },
    {
      label: 'Best Under $50',
      icon: <Zap size={14} style={{ color: '#D97706' }} />,
      action: () => openSearch('best under $50')
    },
    {
      label: 'Gift Ideas',
      icon: <Gift size={14} style={{ color: '#9333EA' }} />,
      action: () => navigate('/tools')
    }
  ];

  return (
    <div className="intent-chips-wrap">
      {chips.map((chip, idx) => (
        <button
          key={idx}
          className="intent-chip"
          onClick={chip.action}
          type="button"
        >
          {chip.icon}
          <span>{chip.label}</span>
        </button>
      ))}
    </div>
  );
};
