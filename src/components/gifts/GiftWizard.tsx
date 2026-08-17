import React, { useState, useEffect } from 'react';
import { GiftRecipient, GiftOccasion, GiftBudget, GiftInterest, GiftRecommendationResult } from '../../types/gifts';
import { giftService } from '../../services/giftService';
import { useCountry } from '../../context/CountryContext';
import { useNavigation } from '../../context/NavigationContext';
import {
  Gift,
  User,
  Heart,
  HeartHandshake,
  Users,
  UserCheck,
  UserPlus,
  Smile,
  Briefcase,
  Cake,
  GraduationCap,
  Home,
  Sparkles,
  Trophy,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Star,
  ShieldCheck,
  Check,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { Button } from '../ui/Button';

export const GiftWizard: React.FC = () => {
  const { formatPrice, currentCountry } = useCountry();
  const { navigate } = useNavigation();

  const [step, setStep] = useState(1);
  const [recipients, setRecipients] = useState<GiftRecipient[]>([]);
  const [occasions, setOccasions] = useState<GiftOccasion[]>([]);
  const [budgets, setBudgets] = useState<GiftBudget[]>([]);
  const [interests, setInterests] = useState<GiftInterest[]>([]);

  // Selected Answers
  const [selectedRecipient, setSelectedRecipient] = useState('dad');
  const [selectedAgeRange, setSelectedAgeRange] = useState('35-50');
  const [selectedOccasion, setSelectedOccasion] = useState('birthday');
  const [selectedBudgetMax, setSelectedBudgetMax] = useState(100);
  const [customBudget, setCustomBudget] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['tech']);

  // Results State
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GiftRecommendationResult | null>(null);

  useEffect(() => {
    giftService.getRecipients().then(setRecipients);
    giftService.getOccasions().then(setOccasions);
    giftService.getBudgets().then(setBudgets);
    giftService.getInterests().then(setInterests);
  }, []);

  const handleInterestToggle = (slug: string) => {
    if (selectedInterests.includes(slug)) {
      setSelectedInterests(selectedInterests.filter(i => i !== slug));
    } else {
      if (selectedInterests.length < 3) {
        setSelectedInterests([...selectedInterests, slug]);
      }
    }
  };

  const handleCalculateGifts = async () => {
    setIsLoading(true);
    const budget = customBudget ? Number(customBudget) : selectedBudgetMax;
    const res = await giftService.findGifts({
      recipient: selectedRecipient,
      ageRange: selectedAgeRange,
      occasion: selectedOccasion,
      budgetMaxUSD: budget,
      interests: selectedInterests
    });

    setTimeout(() => {
      setResult(res);
      setIsLoading(false);
      setStep(5);
    }, 600);
  };

  const handleReset = () => {
    setStep(1);
    setResult(null);
    setSelectedRecipient('dad');
    setSelectedOccasion('birthday');
    setSelectedBudgetMax(100);
    setCustomBudget('');
    setSelectedInterests(['tech']);
  };

  // Helper for icon rendering
  const renderRecipientIcon = (slug: string) => {
    switch (slug) {
      case 'dad': return <User size={22} />;
      case 'mom': return <Heart size={22} />;
      case 'partner': return <HeartHandshake size={22} />;
      case 'friend': return <Users size={22} />;
      case 'brother': return <UserCheck size={22} />;
      case 'sister': return <UserPlus size={22} />;
      case 'kids': return <Smile size={22} />;
      case 'coworker': return <Briefcase size={22} />;
      default: return <User size={22} />;
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        border: '1.5px solid var(--border-default)',
        padding: '36px',
        boxShadow: 'var(--shadow-card)',
        marginBottom: '48px'
      }}
    >
      {/* Progress Bar (if step <= 4) */}
      {step <= 4 && (
        <div style={{ marginBottom: '28px' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: '8px', fontSize: '0.8rem', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <span>Step {step} of 4</span>
            <span>{step === 1 ? 'Recipient' : step === 2 ? 'Occasion' : step === 3 ? 'Budget' : 'Interests'}</span>
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: '#F1F5F9', borderRadius: '999px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${(step / 4) * 100}%`,
                height: '100%',
                backgroundColor: '#2563EB',
                borderRadius: '999px',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>
      )}

      {/* STEP 1: WHO IS IT FOR? */}
      {step === 1 && (
        <div>
          <h2 className="h2" style={{ margin: '0 0 8px', color: '#1A1A1A' }}>
            Who are you buying for?
          </h2>
          <p style={{ color: '#4B5563', margin: '0 0 24px', fontSize: '0.94rem' }}>
            Select the recipient persona to tailor comfort, design, and usability criteria.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', marginBottom: '24px' }}>
            {recipients.map((r) => {
              const isSelected = selectedRecipient === r.slug;
              return (
                <div
                  key={r.id}
                  onClick={() => setSelectedRecipient(r.slug)}
                  style={{
                    padding: '16px 12px',
                    borderRadius: '14px',
                    border: `2px solid ${isSelected ? '#2563EB' : '#E2E8F0'}`,
                    backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                    color: isSelected ? '#2563EB' : '#1A1A1A',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <div style={{ color: isSelected ? '#2563EB' : '#64748B' }}>
                    {renderRecipientIcon(r.slug)}
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{r.name}</span>
                </div>
              );
            })}
          </div>

          {/* Age range */}
          <div style={{ marginBottom: '28px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              Age Range (Optional)
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Under 18', '18-24', '25-34', '35-50', '50+'].map((age) => (
                <button
                  key={age}
                  type="button"
                  onClick={() => setSelectedAgeRange(age)}
                  className={`btn btn-sm ${selectedAgeRange === age ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ borderRadius: '999px', fontSize: '0.8rem' }}
                >
                  {age}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="primary" size="lg" onClick={() => setStep(2)} icon={<ArrowRight size={16} />} iconPosition="right">
              Next: Occasion
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2: WHAT'S THE OCCASION? */}
      {step === 2 && (
        <div>
          <h2 className="h2" style={{ margin: '0 0 8px', color: '#1A1A1A' }}>
            What is the occasion?
          </h2>
          <p style={{ color: '#4B5563', margin: '0 0 24px', fontSize: '0.94rem' }}>
            Helps us tune between celebratory, romantic, milestone, or practical daily surprises.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '32px' }}>
            {occasions.map((o) => {
              const isSelected = selectedOccasion === o.slug;
              return (
                <div
                  key={o.id}
                  onClick={() => setSelectedOccasion(o.slug)}
                  style={{
                    padding: '16px',
                    borderRadius: '14px',
                    border: `2px solid ${isSelected ? '#2563EB' : '#E2E8F0'}`,
                    backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                    color: isSelected ? '#2563EB' : '#1A1A1A',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    fontWeight: isSelected ? 800 : 600,
                    fontSize: '0.9rem',
                    textAlign: 'center'
                  }}
                >
                  {o.name}
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center">
            <Button variant="ghost" size="md" onClick={() => setStep(1)} icon={<ArrowLeft size={16} />}>
              Back
            </Button>
            <Button variant="primary" size="lg" onClick={() => setStep(3)} icon={<ArrowRight size={16} />} iconPosition="right">
              Next: Budget
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: WHAT'S YOUR BUDGET? */}
      {step === 3 && (
        <div>
          <h2 className="h2" style={{ margin: '0 0 8px', color: '#1A1A1A' }}>
            What is your budget ceiling?
          </h2>
          <p style={{ color: '#4B5563', margin: '0 0 24px', fontSize: '0.94rem' }}>
            Select a price tier or enter a custom amount in {currentCountry.currencyCode}.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', marginBottom: '24px' }}>
            {budgets.map((b) => {
              const isSelected = !customBudget && selectedBudgetMax === b.maxPriceUSD;
              return (
                <div
                  key={b.id}
                  onClick={() => { setSelectedBudgetMax(b.maxPriceUSD); setCustomBudget(''); }}
                  style={{
                    padding: '16px 12px',
                    borderRadius: '14px',
                    border: `2px solid ${isSelected ? '#2563EB' : '#E2E8F0'}`,
                    backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                    color: isSelected ? '#2563EB' : '#1A1A1A',
                    cursor: 'pointer',
                    textAlign: 'center',
                    fontWeight: isSelected ? 800 : 600,
                    fontSize: '0.9rem'
                  }}
                >
                  {b.label}
                </div>
              );
            })}
          </div>

          {/* Custom Budget Input */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              Or Enter Custom Budget ({currentCountry.currencyCode}):
            </label>
            <div style={{ position: 'relative', maxWidth: '240px' }}>
              <span style={{ position: 'absolute', left: '12px', top: '10px', color: '#6B7280', fontWeight: 700 }}>
                {currentCountry.currencySymbol}
              </span>
              <input
                type="number"
                placeholder="e.g. 75"
                value={customBudget}
                onChange={(e) => setCustomBudget(e.target.value)}
                style={{ width: '100%', padding: '10px 12px 10px 28px', borderRadius: '10px', border: '1px solid #D1D5DB', fontSize: '0.92rem', fontWeight: 700 }}
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Button variant="ghost" size="md" onClick={() => setStep(2)} icon={<ArrowLeft size={16} />}>
              Back
            </Button>
            <Button variant="primary" size="lg" onClick={() => setStep(4)} icon={<ArrowRight size={16} />} iconPosition="right">
              Next: Interests
            </Button>
          </div>
        </div>
      )}

      {/* STEP 4: WHAT ARE THEIR INTERESTS? */}
      {step === 4 && (
        <div>
          <h2 className="h2" style={{ margin: '0 0 8px', color: '#1A1A1A' }}>
            What are their interests & hobbies?
          </h2>
          <p style={{ color: '#4B5563', margin: '0 0 24px', fontSize: '0.94rem' }}>
            Select up to 3 categories to fine-tune product category matching.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '32px' }}>
            {interests.map((i) => {
              const isSelected = selectedInterests.includes(i.category);
              return (
                <div
                  key={i.id}
                  onClick={() => handleInterestToggle(i.category)}
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    border: `2px solid ${isSelected ? '#2563EB' : '#E2E8F0'}`,
                    backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                    color: isSelected ? '#2563EB' : '#1A1A1A',
                    cursor: 'pointer',
                    fontWeight: isSelected ? 800 : 600,
                    fontSize: '0.88rem',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  {isSelected && <Check size={14} style={{ color: '#2563EB' }} />}
                  <span>{i.name}</span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center">
            <Button variant="ghost" size="md" onClick={() => setStep(3)} icon={<ArrowLeft size={16} />}>
              Back
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={handleCalculateGifts}
              disabled={isLoading}
              icon={<Sparkles size={16} />}
            >
              {isLoading ? 'Calculating Gift Affinity...' : 'Generate Gift Recommendations'}
            </Button>
          </div>
        </div>
      )}

      {/* STEP 5: RESULTS SCREEN */}
      {step === 5 && result && (
        <div>
          {/* Results Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#ECFDF5', color: '#059669', padding: '4px 12px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '10px' }}>
              <Gift size={13} /> Tailored Gift Recommendations
            </div>
            <h2 className="h2" style={{ margin: '0 0 6px', color: '#1A1A1A' }}>
              Top Gift for {result.criteriaSummary.recipient}
            </h2>
            <div style={{ fontSize: '0.86rem', color: '#6B7280' }}>
              Occasion: {result.criteriaSummary.occasion} • Budget: {result.criteriaSummary.budget}
            </div>
          </div>

          {/* 1. TOP PICK HERO CARD */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '2px solid #2563EB',
              padding: '32px',
              boxShadow: '0 8px 30px rgba(37, 99, 235, 0.1)',
              marginBottom: '40px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '28px',
              alignItems: 'center'
            }}
          >
            <div style={{ backgroundColor: '#F8FAFC', borderRadius: '16px', padding: '24px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={result.topPick.image}
                alt={result.topPick.name}
                style={{ maxHeight: '220px', maxWidth: '100%', objectFit: 'contain' }}
              />
            </div>

            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#EFF6FF', color: '#2563EB', padding: '3px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
                <Trophy size={12} /> #1 Recommended Gift
              </div>

              <h3 className="h2" style={{ fontSize: '1.25rem', margin: '0 0 10px', color: '#1A1A1A' }}>
                {result.topPick.name}
              </h3>

              <div className="flex items-center gap-md" style={{ marginBottom: '14px', flexWrap: 'wrap' }}>
                <span className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1A1A1A' }}>
                  {formatPrice(result.topPick.priceUSD)}
                </span>
                <span style={{ backgroundColor: '#ECFDF5', color: '#059669', padding: '3px 8px', borderRadius: '6px', fontWeight: 800, fontSize: '0.8rem' }}>
                  Worth Score: {result.topPick.worthScore}%
                </span>
                <span className="flex items-center gap-xs" style={{ fontSize: '0.82rem', color: '#D97706', fontWeight: 700 }}>
                  <Star size={13} fill="#D97706" style={{ color: '#D97706' }} /> {result.topPick.rating}
                </span>
              </div>

              {/* Personalized Reason */}
              <div style={{ padding: '12px 16px', backgroundColor: '#F8FAFC', borderRadius: '12px', borderLeft: '4px solid #2563EB', marginBottom: '20px', fontSize: '0.9rem', color: '#374151', lineHeight: 1.5 }}>
                "{result.personalizedReason}"
              </div>

              <div className="flex items-center gap-sm flex-wrap">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => navigate('/product-detail', { product: result.topPick })}
                  icon={<ShoppingBag size={15} />}
                >
                  View Product Deals
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => navigate('/compare', { productA: result.topPick, productB: result.alternativePicks[0] })}
                >
                  Compare with Alternative
                </Button>
              </div>
            </div>
          </div>

          {/* 2. ALTERNATIVE GIFT PICKS */}
          {result.alternativePicks.length > 0 && (
            <div style={{ marginBottom: '36px' }}>
              <h3 className="h3" style={{ margin: '0 0 16px', color: '#1A1A1A', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                More Great Gift Ideas in this Budget
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                {result.alternativePicks.map((alt) => (
                  <div
                    key={alt.id}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      border: '1px solid #E5E7EB',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}
                  >
                    <div style={{ backgroundColor: '#F8FAFC', borderRadius: '10px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
                      <img src={alt.image} alt={alt.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                    </div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase' }}>{alt.brand}</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1A1A1A', height: '2.4em', overflow: 'hidden' }}>{alt.name}</div>
                    <div className="flex items-center justify-between" style={{ marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid #F1F5F9' }}>
                      <span className="font-mono" style={{ fontSize: '1rem', fontWeight: 800, color: '#1A1A1A' }}>{formatPrice(alt.priceUSD)}</span>
                      <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>Worth {alt.worthScore}%</span>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => navigate('/product-detail', { product: alt })}
                      style={{ width: '100%', borderRadius: '8px', fontSize: '0.78rem' }}
                    >
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Strip */}
          <div className="flex justify-center" style={{ paddingTop: '20px', borderTop: '1px solid #E2E8F0' }}>
            <Button variant="ghost" size="md" onClick={handleReset} icon={<RotateCcw size={15} />}>
              Start Over with New Criteria
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
