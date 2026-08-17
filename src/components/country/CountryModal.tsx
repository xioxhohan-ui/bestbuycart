import React from 'react';
import { Modal } from '../ui/Modal';
import { useCountry } from '../../context/CountryContext';
import { Check, Globe } from 'lucide-react';

interface CountryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CountryModal: React.FC<CountryModalProps> = ({ isOpen, onClose }) => {
  const { currentCountry, availableCountries, setCountry } = useCountry();

  const handleSelectCountry = (code: string) => {
    setCountry(code);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Select Your Country & Currency" maxWidth="520px">
      <p style={{ fontSize: '0.85rem', color: '#6B7280', marginTop: 0, marginBottom: '20px' }}>
        Product availability, retailer offers, and live prices will instantly update to match your selected region.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {availableCountries.map((country) => {
          const isSelected = country.code === currentCountry.code;
          return (
            <div
              key={country.code}
              onClick={() => handleSelectCountry(country.code)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '12px',
                border: `1.5px solid ${isSelected ? '#2563EB' : '#E5E7EB'}`,
                backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.5rem' }}>{country.flag}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem', color: '#1A1A1A' }}>
                    {country.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                    Currency: {country.currencyCode} ({country.currencySymbol})
                  </div>
                </div>
              </div>

              {isSelected && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#2563EB',
                    color: '#FFFFFF'
                  }}
                >
                  <Check size={14} strokeWidth={3} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Modal>
  );
};
