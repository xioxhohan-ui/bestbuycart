import React, { useState } from 'react';
import { useCountry } from '../../context/CountryContext';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { CountryModal } from './CountryModal';

export const CountrySelector: React.FC = () => {
  const { currentCountry } = useCountry();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="btn btn-ghost btn-sm"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 10px',
          borderRadius: '8px',
          border: '1px solid var(--border-default)',
          backgroundColor: '#FFFFFF',
          fontSize: '0.82rem',
          fontWeight: 600,
          color: '#1A1A1A'
        }}
        title="Change Country & Currency"
        aria-label="Country and Currency selector"
      >
        <span style={{ fontSize: '1rem' }}>{currentCountry.flag}</span>
        <span className="hide-mobile">{currentCountry.currencyCode}</span>
        <ChevronDown size={13} style={{ color: '#6B7280' }} />
      </button>

      <CountryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
