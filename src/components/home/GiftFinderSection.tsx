import React, { useState } from 'react';
import { Gift, ChevronDown, Sparkles, ArrowRight, User, Calendar, DollarSign } from 'lucide-react';
import { useSearch } from '../../context/SearchContext';
import { Button } from '../ui/Button';

export const GiftFinderSection: React.FC = () => {
  const { openSearch } = useSearch();
  const [recipient, setRecipient] = useState('Dad');
  const [occasion, setOccasion] = useState('Birthday');
  const [budget, setBudget] = useState('50');

  const handleFindGifts = (e: React.FormEvent) => {
    e.preventDefault();
    openSearch(`gift for ${recipient} under $${budget}`);
  };

  return (
    <section style={{ padding: '60px 0', borderTop: '1px solid var(--border-default)' }}>
      <div className="container">
        <div
          style={{
            background: 'linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 60%, #FDF4FF 100%)',
            borderRadius: '24px',
            border: '1.5px solid #DBEAFE',
            padding: '40px 32px',
            boxShadow: 'var(--shadow-card)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 32px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#FFFFFF',
                color: '#2563EB',
                padding: '4px 14px',
                borderRadius: '999px',
                fontSize: '0.78rem',
                fontWeight: 700,
                border: '1px solid #BFDBFE',
                marginBottom: '12px'
              }}
            >
              <Gift size={14} />
              <span>Smart Gift Intelligence</span>
            </div>

            <h2 className="h2" style={{ margin: '0 0 8px', color: '#1A1A1A' }}>
              Find Something They'll Actually Love
            </h2>
            <p style={{ color: '#4B5563', fontSize: '0.95rem', margin: 0 }}>
              Tailored product recommendations backed by worth scores and verified reliability.
            </p>
          </div>

          {/* 4-Item Selector Bar */}
          <form
            onSubmit={handleFindGifts}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
              backgroundColor: '#FFFFFF',
              padding: '16px',
              borderRadius: '16px',
              border: '1px solid #E5E7EB',
              boxShadow: 'var(--shadow-card)',
              alignItems: 'center'
            }}
          >
            {/* 1. Recipient */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label className="flex items-center gap-xs" style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>
                <User size={12} /> For Who?
              </label>
              <select
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #D1D5DB',
                  backgroundColor: '#F8FAFC',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: '#1A1A1A',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="Dad">Dad</option>
                <option value="Mom">Mom</option>
                <option value="Partner">Partner / Spouse</option>
                <option value="Tech Lover">Tech Enthusiast</option>
                <option value="Friend">Close Friend</option>
                <option value="Student">College Student</option>
              </select>
            </div>

            {/* 2. Occasion */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label className="flex items-center gap-xs" style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>
                <Calendar size={12} /> Occasion
              </label>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #D1D5DB',
                  backgroundColor: '#F8FAFC',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: '#1A1A1A',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="Birthday">Birthday</option>
                <option value="Holiday">Holidays & Christmas</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Just Because">Just Because</option>
                <option value="Housewarming">Housewarming</option>
              </select>
            </div>

            {/* 3. Budget */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label className="flex items-center gap-xs" style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>
                <DollarSign size={12} /> Max Budget
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #D1D5DB',
                  backgroundColor: '#F8FAFC',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: '#1A1A1A',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="25">Under $25</option>
                <option value="50">Under $50</option>
                <option value="100">Under $100</option>
                <option value="250">Under $250</option>
                <option value="500">Under $500</option>
              </select>
            </div>

            {/* 4. Action Button */}
            <div style={{ display: 'flex', alignItems: 'flex-end', height: '100%' }}>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                icon={<Sparkles size={16} />}
                style={{ width: '100%', borderRadius: '8px', height: '44px', backgroundColor: '#2563EB' }}
              >
                Find Gifts
              </Button>
            </div>
          </form>

          {/* Quick Picks Row */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginTop: '24px',
              fontSize: '0.82rem',
              color: '#4B5563'
            }}
          >
            <span className="flex items-center gap-xs" style={{ fontWeight: 600 }}><Sparkles size={13} style={{ color: '#2563EB' }} /> Quick Picks:</span>
            <button
              onClick={() => openSearch('gifts for dad under $50')}
              style={{ color: '#2563EB', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Gifts for Dad
            </button>
            <span>•</span>
            <button
              onClick={() => openSearch('gifts under $50')}
              style={{ color: '#2563EB', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Gifts Under $50
            </button>
            <span>•</span>
            <button
              onClick={() => openSearch('tech gifts for travelers')}
              style={{ color: '#2563EB', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Travel Tech
            </button>
            <span>•</span>
            <button
              onClick={() => openSearch('kitchen gifts for coffee lovers')}
              style={{ color: '#2563EB', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Coffee Enthusiasts
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
