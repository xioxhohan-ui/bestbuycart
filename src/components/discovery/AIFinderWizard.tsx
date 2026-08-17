import React, { useState } from 'react';
import { discoveryService } from '../../services/discoveryService';
import { FinderAnswers, FinderMatchResult } from '../../types/discovery';
import { useNavigation } from '../../context/NavigationContext';
import { useCountry } from '../../context/CountryContext';
import { Sparkles, ArrowRight, ArrowLeft, Check, Trophy, DollarSign, Crown, RefreshCw, Sliders } from 'lucide-react';
import { CategoryIcon } from '../ui/CategoryIcon';
import { Button } from '../ui/Button';

export const AIFinderWizard: React.FC = () => {
  const { navigate } = useNavigation();
  const { currentCountry, formatPrice } = useCountry();

  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<FinderAnswers>({
    category: 'tech',
    budgetCeiling: 100,
    priorities: ['quality', 'price']
  });

  const [results, setResults] = useState<FinderMatchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { id: 'tech', label: 'Tech & Audio' },
    { id: 'home', label: 'Smart Home' },
    { id: 'kitchen', label: 'Kitchen & Coffee' },
    { id: 'fashion', label: 'Fashion & Wear' },
    { id: 'fitness', label: 'Fitness & Health' },
    { id: 'travel', label: 'Travel & EDC' },
    { id: 'auto', label: 'Auto & Dash' },
    { id: 'outdoor', label: 'Outdoor Gear' },
    { id: 'gifts', label: 'Gifts & Finds' },
    { id: 'all', label: 'Any Category' }
  ];

  const budgetOptions = [
    { value: 25, label: `Under ${currentCountry.currencySymbol}25` },
    { value: 50, label: `Under ${currentCountry.currencySymbol}50` },
    { value: 100, label: `Under ${currentCountry.currencySymbol}100` },
    { value: 250, label: `Under ${currentCountry.currencySymbol}250` },
    { value: 500, label: `${currentCountry.currencySymbol}500+` },
    { value: 0, label: 'No Limit' }
  ];

  const priorityOptions: { id: FinderAnswers['priorities'][number]; label: string; desc: string }[] = [
    { id: 'price', label: 'Maximum Value', desc: 'Highest worth score per dollar' },
    { id: 'quality', label: 'Premium Build', desc: 'Superior materials & durability' },
    { id: 'performance', label: 'Top Performance', desc: 'Highest verified rating & speed' },
    { id: 'durability', label: 'Long-term Reliability', desc: '2+ year longevity metrics' },
    { id: 'design', label: 'Aesthetics & Ergonomics', desc: 'Minimalist form & comfort' }
  ];

  const handlePriorityToggle = (p: FinderAnswers['priorities'][number]) => {
    const isSelected = answers.priorities.includes(p);
    const updated = isSelected
      ? answers.priorities.filter((item) => item !== p)
      : [...answers.priorities, p];
    setAnswers({ ...answers, priorities: updated });
  };

  const handleFindMatches = async () => {
    setIsLoading(true);
    const match = await discoveryService.matchProducts(answers);
    setResults(match);
    setIsLoading(false);
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setResults(null);
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        border: '1px solid var(--border-default)',
        padding: '36px',
        boxShadow: 'var(--shadow-card)',
        maxWidth: '780px',
        margin: '0 auto'
      }}
    >
      {/* Progress Steps Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: '28px', paddingBottom: '16px', borderBottom: '1px solid #F0F1F3' }}>
        <div className="flex items-center gap-xs">
          <Sparkles size={20} style={{ color: '#2563EB' }} />
          <span style={{ fontWeight: 800, fontSize: '1rem', color: '#1A1A1A' }}>
            AI Product Match Algorithm
          </span>
        </div>

        <div className="flex items-center gap-xs" style={{ fontSize: '0.78rem', color: '#6B7280', fontWeight: 600 }}>
          <span>Step {step} of 4</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  width: '20px',
                  height: '4px',
                  borderRadius: '2px',
                  backgroundColor: i <= step ? '#2563EB' : '#E5E7EB'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* STEP 1: CATEGORY SELECTION */}
      {step === 1 && (
        <div>
          <h2 className="h2" style={{ margin: '0 0 6px', color: '#1A1A1A' }}>
            1. What department are you shopping for?
          </h2>
          <p style={{ color: '#4B5563', fontSize: '0.92rem', marginBottom: '24px' }}>
            Select your target category so our model filters the appropriate feature dimensions.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '12px', marginBottom: '32px' }}>
            {categories.map((c) => {
              const isSelected = answers.category === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setAnswers({ ...answers, category: c.id })}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '16px 10px',
                    borderRadius: '12px',
                    border: `1.5px solid ${isSelected ? '#2563EB' : '#E5E7EB'}`,
                    backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <CategoryIcon slugOrId={c.id} size={28} color={isSelected ? '#2563EB' : '#4B5563'} />
                  <span style={{ fontSize: '0.82rem', fontWeight: isSelected ? 700 : 500, color: isSelected ? '#2563EB' : '#1A1A1A' }}>
                    {c.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end">
            <Button
              variant="primary"
              size="md"
              onClick={() => setStep(2)}
              icon={<ArrowRight size={15} />}
              iconPosition="right"
            >
              Continue to Budget
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2: BUDGET CEILING */}
      {step === 2 && (
        <div>
          <h2 className="h2" style={{ margin: '0 0 6px', color: '#1A1A1A' }}>
            2. What is your budget ceiling?
          </h2>
          <p style={{ color: '#4B5563', fontSize: '0.92rem', marginBottom: '24px' }}>
            We will only match products that fall strictly inside your maximum spend threshold.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '32px' }}>
            {budgetOptions.map((b) => {
              const isSelected = answers.budgetCeiling === b.value;
              return (
                <button
                  key={b.value}
                  onClick={() => setAnswers({ ...answers, budgetCeiling: b.value })}
                  style={{
                    padding: '16px 12px',
                    borderRadius: '12px',
                    border: `1.5px solid ${isSelected ? '#2563EB' : '#E5E7EB'}`,
                    backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                    color: isSelected ? '#2563EB' : '#1A1A1A',
                    fontWeight: isSelected ? 700 : 600,
                    fontSize: '0.92rem',
                    cursor: 'pointer'
                  }}
                >
                  {b.label}
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-center">
            <Button variant="ghost" size="md" onClick={() => setStep(1)} icon={<ArrowLeft size={15} />}>
              Back
            </Button>
            <Button variant="primary" size="md" onClick={() => setStep(3)} icon={<ArrowRight size={15} />} iconPosition="right">
              Continue to Priorities
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: PRIORITIES & WEIGHTING */}
      {step === 3 && (
        <div>
          <h2 className="h2" style={{ margin: '0 0 6px', color: '#1A1A1A' }}>
            3. What matters most to you?
          </h2>
          <p style={{ color: '#4B5563', fontSize: '0.92rem', marginBottom: '24px' }}>
            Select one or more criteria to adjust our multi-dimensional matching weights.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
            {priorityOptions.map((p) => {
              const isSelected = answers.priorities.includes(p.id);
              return (
                <div
                  key={p.id}
                  onClick={() => handlePriorityToggle(p.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    borderRadius: '12px',
                    border: `1.5px solid ${isSelected ? '#2563EB' : '#E5E7EB'}`,
                    backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                    cursor: 'pointer'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: isSelected ? '#2563EB' : '#1A1A1A' }}>
                      {p.label}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>{p.desc}</div>
                  </div>

                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '6px',
                      border: `1.5px solid ${isSelected ? '#2563EB' : '#D1D5DB'}`,
                      backgroundColor: isSelected ? '#2563EB' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF'
                    }}
                  >
                    {isSelected && <Check size={14} strokeWidth={3} />}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center">
            <Button variant="ghost" size="md" onClick={() => setStep(2)} icon={<ArrowLeft size={15} />}>
              Back
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleFindMatches}
              disabled={isLoading || answers.priorities.length === 0}
              icon={<Sparkles size={15} />}
              iconPosition="right"
            >
              {isLoading ? 'Analyzing Models...' : 'Calculate Best Matches'}
            </Button>
          </div>
        </div>
      )}

      {/* STEP 4: YOUR BEST MATCHES RESULTS */}
      {step === 4 && results && (
        <div>
          <div className="flex items-center justify-between" style={{ marginBottom: '6px' }}>
            <h2 className="h2" style={{ margin: 0, color: '#1A1A1A' }}>
              Your Top 3 Algorithmic Matches
            </h2>
            <button
              onClick={handleReset}
              className="btn btn-ghost btn-sm"
              style={{ fontSize: '0.78rem', color: '#2563EB', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <RefreshCw size={12} />
              <span>Start Over</span>
            </button>
          </div>
          <p style={{ color: '#4B5563', fontSize: '0.92rem', marginBottom: '28px' }}>
            Calculated against thousands of benchmark data points matching your budget and priority weights.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            {/* 1. BEST OVERALL MATCH */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '2px solid #2563EB',
                padding: '20px',
                boxShadow: '0 8px 24px rgba(37, 99, 235, 0.12)',
                display: 'flex',
                gap: '20px',
                alignItems: 'center',
                flexWrap: 'wrap'
              }}
            >
              <img
                src={results.bestMatch.image}
                alt={results.bestMatch.name}
                style={{ width: '90px', height: '90px', objectFit: 'contain', borderRadius: '12px', backgroundColor: '#F8FAFC' }}
              />
              <div style={{ flex: 1, minWidth: '220px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#EFF6FF', color: '#2563EB', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
                  <Trophy size={12} /> Best Match (9/10 Criteria)
                </span>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 4px', color: '#1A1A1A' }}>
                  {results.bestMatch.name}
                </h4>
                <div className="flex items-center gap-md" style={{ fontSize: '0.82rem', color: '#6B7280' }}>
                  <span className="font-mono" style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1A1A1A' }}>
                    {formatPrice(results.bestMatch.priceUSD)}
                  </span>
                  <span>•</span>
                  <span style={{ color: '#059669', fontWeight: 700 }}>Worth: {results.bestMatch.worthScore}%</span>
                  <span>•</span>
                  <span>Hype: {results.bestMatch.hypeScore}%</span>
                </div>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/product-detail', { product: results.bestMatch })}
                style={{ borderRadius: '8px' }}
              >
                View Details
              </Button>
            </div>

            {/* 2. BEST VALUE */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1.5px solid #A7F3D0',
                padding: '16px 20px',
                boxShadow: 'var(--shadow-card)',
                display: 'flex',
                gap: '20px',
                alignItems: 'center',
                flexWrap: 'wrap'
              }}
            >
              <img
                src={results.bestValue.image}
                alt={results.bestValue.name}
                style={{ width: '70px', height: '70px', objectFit: 'contain', borderRadius: '10px', backgroundColor: '#F8FAFC' }}
              />
              <div style={{ flex: 1, minWidth: '220px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#ECFDF5', color: '#059669', padding: '2px 8px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>
                  <DollarSign size={11} /> ● Best Value for Money
                </span>
                <h5 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 2px', color: '#1A1A1A' }}>
                  {results.bestValue.name}
                </h5>
                <div className="flex items-center gap-md" style={{ fontSize: '0.8rem', color: '#6B7280' }}>
                  <span className="font-mono" style={{ fontWeight: 800, color: '#1A1A1A' }}>
                    {formatPrice(results.bestValue.priceUSD)}
                  </span>
                  <span>•</span>
                  <span style={{ color: '#059669', fontWeight: 700 }}>Worth: {results.bestValue.worthScore}%</span>
                </div>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate('/product-detail', { product: results.bestValue })}
              >
                View Details
              </Button>
            </div>

            {/* 3. PREMIUM CHOICE */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1.5px solid #E9D5FF',
                padding: '16px 20px',
                boxShadow: 'var(--shadow-card)',
                display: 'flex',
                gap: '20px',
                alignItems: 'center',
                flexWrap: 'wrap'
              }}
            >
              <img
                src={results.premiumChoice.image}
                alt={results.premiumChoice.name}
                style={{ width: '70px', height: '70px', objectFit: 'contain', borderRadius: '10px', backgroundColor: '#F8FAFC' }}
              />
              <div style={{ flex: 1, minWidth: '220px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#FAF5FF', color: '#9333EA', padding: '2px 8px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>
                  <Crown size={11} /> Premium Choice
                </span>
                <h5 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 2px', color: '#1A1A1A' }}>
                  {results.premiumChoice.name}
                </h5>
                <div className="flex items-center gap-md" style={{ fontSize: '0.8rem', color: '#6B7280' }}>
                  <span className="font-mono" style={{ fontWeight: 800, color: '#1A1A1A' }}>
                    {formatPrice(results.premiumChoice.priceUSD)}
                  </span>
                  <span>•</span>
                  <span style={{ color: '#9333EA', fontWeight: 700 }}>Worth: {results.premiumChoice.worthScore}%</span>
                </div>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate('/product-detail', { product: results.premiumChoice })}
              >
                View Details
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                navigate('/compare', { productA: results.bestMatch, productB: results.bestValue });
              }}
              style={{ borderRadius: '10px' }}
            >
              Compare Best Match vs Best Value
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
