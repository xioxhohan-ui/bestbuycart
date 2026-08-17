import React, { useState, useEffect } from 'react';
import { GiftFinderSection } from '../components/home/GiftFinderSection';
import { Sparkles, Sliders, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useSearch } from '../context/SearchContext';
import { updatePageSEO } from '../utils/seo';

export const ToolsView: React.FC = () => {
  const { openSearch } = useSearch();
  const [useCase, setUseCase] = useState('remote-work');
  const [priority, setPriority] = useState('battery');
  const [budget, setBudget] = useState('200');

  useEffect(() => {
    updatePageSEO('Shopping Intelligence & Gift Discovery Tools', 'Interactive tools to find the exact product matching your lifestyle and budget.');
  }, []);

  const handleMatch = (e: React.FormEvent) => {
    e.preventDefault();
    openSearch(`best ${useCase} with ${priority} under $${budget}`);
  };

  return (
    <div style={{ padding: '40px 0 80px' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '36px', textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px' }}>
          <div className="flex items-center justify-center gap-xs" style={{ marginBottom: '8px' }}>
            <Sparkles size={24} style={{ color: '#2563EB' }} />
            <h1 className="h1" style={{ margin: 0 }}>
              Shopping Intelligence Tools
            </h1>
          </div>
          <p style={{ color: '#4B5563', margin: 0, fontSize: '0.95rem' }}>
            Interactive decision helpers built to eliminate buyer remorse and save you hours of research.
          </p>
        </div>

        {/* 1. Smart Gift Finder */}
        <div style={{ marginBottom: '48px' }}>
          <GiftFinderSection />
        </div>

        {/* 2. Product Matcher Wizard */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1.5px solid var(--border-default)',
            padding: '36px',
            boxShadow: 'var(--shadow-card)'
          }}
        >
          <div className="flex items-center gap-xs" style={{ marginBottom: '6px' }}>
            <Sliders size={20} style={{ color: '#2563EB' }} />
            <h2 className="h2" style={{ margin: 0 }}>
              Personalized Product Match Wizard
            </h2>
          </div>
          <p style={{ color: '#4B5563', fontSize: '0.92rem', marginBottom: '24px' }}>
            Tell us your primary need and our engine will filter top Worth Score products for you.
          </p>

          <form onSubmit={handleMatch} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', alignItems: 'flex-end' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                Primary Use Case
              </label>
              <select
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: '1px solid #D1D5DB',
                  backgroundColor: '#F8FAFC',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              >
                <option value="travel headphones">Travel & Commuting Audio</option>
                <option value="home espresso">Home Barista Coffee</option>
                <option value="ergonomic desk setup">Ergonomic Remote Work</option>
                <option value="fitness recovery">Fitness & Muscle Recovery</option>
                <option value="automated home cleaning">Automated Home Cleaning</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                Top Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: '1px solid #D1D5DB',
                  backgroundColor: '#F8FAFC',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              >
                <option value="maximum battery">Longest Battery Life</option>
                <option value="highest build quality">Premium Build & Durability</option>
                <option value="best value for money">Maximum Value for Money</option>
                <option value="compact and portable">Ultra Lightweight & Compact</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                Budget Ceiling
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: '1px solid #D1D5DB',
                  backgroundColor: '#F8FAFC',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              >
                <option value="100">Under $100</option>
                <option value="250">Under $250</option>
                <option value="500">Under $500</option>
                <option value="1500">Under $1,500</option>
              </select>
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                style={{ width: '100%', height: '44px', borderRadius: '10px', backgroundColor: '#2563EB' }}
                icon={<ArrowRight size={16} />}
                iconPosition="right"
              >
                Find Best Match
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
