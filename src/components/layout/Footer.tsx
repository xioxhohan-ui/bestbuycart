import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useCountry } from '../../context/CountryContext';
import { siteConfig } from '../../config/siteConfig';
import { ShoppingCart, ShieldCheck, Heart, ArrowUpRight, Globe, Flame, ShoppingBag, ArrowRight, Percent, Brain, BookOpen, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useNavigation();
  const { currentCountry, availableCountries, setCountry } = useCountry();

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Brand Mission & Value Prop */}
        <div style={{ marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid var(--border-default)' }}>
          <div className="flex items-center gap-sm" style={{ marginBottom: '12px' }}>
            <div className="site-logo-mark" style={{ width: '28px', height: '28px' }}>
              <ShoppingCart size={15} strokeWidth={2.5} />
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1A1A1A' }}>
              {siteConfig.name}
            </span>
          </div>
          <p style={{ maxWidth: '640px', color: '#4B5563', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
            {siteConfig.description} We independently evaluate hype trends, verify build quality, and analyze real pricing data across top retailers in the US and Europe.
          </p>
        </div>

        {/* 8 Structured Content Pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '32px 20px',
            marginBottom: '40px'
          }}
        >
          {/* Column 1: Trending */}
          <div>
            <h5 className="flex items-center gap-xs" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
              <Flame size={14} style={{ color: '#EA580C' }} /> Trending
            </h5>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem', color: '#6B7280' }}>
              <li><a href="#trending" onClick={(e) => { e.preventDefault(); navigate('/trending'); }}>Viral Products</a></li>
              <li><a href="#rising" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Rising Fast</a></li>
              <li><a href="#gems" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Hidden Gems</a></li>
              <li><a href="#bestsellers" onClick={(e) => { e.preventDefault(); navigate('/trending'); }}>Top Worth Scores</a></li>
            </ul>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h5 className="flex items-center gap-xs" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
              <ShoppingBag size={14} style={{ color: '#2563EB' }} /> Categories
            </h5>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem', color: '#6B7280' }}>
              <li><a href="#tech" onClick={(e) => { e.preventDefault(); navigate('/categories'); }}>Tech & Audio</a></li>
              <li><a href="#home" onClick={(e) => { e.preventDefault(); navigate('/categories'); }}>Smart Home</a></li>
              <li><a href="#kitchen" onClick={(e) => { e.preventDefault(); navigate('/categories'); }}>Kitchen & Coffee</a></li>
              <li><a href="#fitness" onClick={(e) => { e.preventDefault(); navigate('/categories'); }}>Fitness & Health</a></li>
              <li><a href="#travel" onClick={(e) => { e.preventDefault(); navigate('/categories'); }}>Travel & EDC</a></li>
            </ul>
          </div>

          {/* Column 3: Compare */}
          <div>
            <h5 className="flex items-center gap-xs" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
              <ArrowRight size={14} style={{ color: '#9333EA' }} /> Compare
            </h5>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem', color: '#6B7280' }}>
              <li><a href="#compare" onClick={(e) => { e.preventDefault(); navigate('/compare'); }}>Head-to-Head</a></li>
              <li><a href="#alternatives" onClick={(e) => { e.preventDefault(); navigate('/compare'); }}>Top Alternatives</a></li>
              <li><a href="#overhyped" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Overhyped Swaps</a></li>
            </ul>
          </div>

          {/* Column 4: Deals */}
          <div>
            <h5 className="flex items-center gap-xs" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
              <Percent size={14} style={{ color: '#059669' }} /> Deals
            </h5>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem', color: '#6B7280' }}>
              <li><a href="#deals" onClick={(e) => { e.preventDefault(); navigate('/deals'); }}>Verified Price Drops</a></li>
              <li><a href="#under50" onClick={(e) => { e.preventDefault(); navigate('/deals'); }}>Picks Under $50</a></li>
              <li><a href="#under100" onClick={(e) => { e.preventDefault(); navigate('/deals'); }}>Picks Under $100</a></li>
            </ul>
          </div>

          {/* Column 5: Tools */}
          <div>
            <h5 className="flex items-center gap-xs" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
              <Brain size={14} style={{ color: '#2563EB' }} /> Tools
            </h5>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem', color: '#6B7280' }}>
              <li><a href="#gift-finder" onClick={(e) => { e.preventDefault(); navigate('/gift-finder'); }}>Smart Gift Finder</a></li>
              <li><a href="#product-finder" onClick={(e) => { e.preventDefault(); navigate('/tools/product-finder'); }}>Product Selector</a></li>
              <li><a href="#is-it-worth-it" onClick={(e) => { e.preventDefault(); navigate('/is-it-worth-it'); }}>Is It Worth It?</a></li>
              <li><a href="#price-tracker" onClick={(e) => { e.preventDefault(); navigate('/deals/price-drops'); }}>Price Drop Radar</a></li>
            </ul>
          </div>

          {/* Column 6: Content */}
          <div>
            <h5 className="flex items-center gap-xs" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
              <BookOpen size={14} style={{ color: '#D97706' }} /> Guides
            </h5>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem', color: '#6B7280' }}>
              <li><a href="#guides" onClick={(e) => { e.preventDefault(); navigate('/guides'); }}>Buying Articles</a></li>
              <li><a href="#featured-guide" onClick={(e) => { e.preventDefault(); navigate('/guides/how-to-choose-headphones'); }}>Headphone Guide</a></li>
              <li><a href="#methodology" onClick={(e) => { e.preventDefault(); navigate('/methodology'); }}>Score Methodology</a></li>
            </ul>
          </div>

          {/* Column 7: Company */}
          <div>
            <h5 className="flex items-center gap-xs" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
              <ShieldCheck size={14} style={{ color: '#059669' }} /> Company
            </h5>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem', color: '#6B7280' }}>
              <li><a href="#about" onClick={(e) => e.preventDefault()}>About Us</a></li>
              <li><a href="#editorial" onClick={(e) => e.preventDefault()}>Editorial Policy</a></li>
              <li><a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Terms</a></li>
            </ul>
          </div>

          {/* Column 8: Contact */}
          <div>
            <h5 className="flex items-center gap-xs" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '12px' }}>
              <Mail size={14} style={{ color: '#2563EB' }} /> Contact
            </h5>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem', color: '#6B7280' }}>
              <li><a href="#contact" onClick={(e) => e.preventDefault()}>Contact Team</a></li>
              <li><a href="#press" onClick={(e) => e.preventDefault()}>Press Kit</a></li>
              <li><a href="#affiliate" onClick={(e) => e.preventDefault()}>Affiliate Info</a></li>
            </ul>
          </div>
        </div>

        {/* Global Multi-Country Quick Selector Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            padding: '16px 20px',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid var(--border-default)',
            marginBottom: '28px'
          }}
        >
          <div className="flex items-center gap-xs" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1A1A1A' }}>
            <Globe size={16} style={{ color: '#2563EB' }} />
            <span>Choose Country & Currency:</span>
          </div>
          <div className="flex items-center gap-xs flex-wrap">
            {availableCountries.map((c) => (
              <button
                key={c.code}
                onClick={() => setCountry(c.code)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '5px 10px',
                  borderRadius: '6px',
                  border: `1px solid ${c.code === currentCountry.code ? '#2563EB' : '#E5E7EB'}`,
                  backgroundColor: c.code === currentCountry.code ? '#EFF6FF' : '#FFFFFF',
                  fontSize: '0.8rem',
                  fontWeight: c.code === currentCountry.code ? 700 : 500,
                  color: c.code === currentCountry.code ? '#2563EB' : '#4B5563',
                  cursor: 'pointer'
                }}
              >
                <span>{c.flag}</span>
                <span>{c.code}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Affiliate Disclosure Box */}
        <div className="footer-disclosure">
          <div className="flex items-center gap-xs" style={{ fontWeight: 700, color: '#1A1A1A', marginBottom: '4px' }}>
            <ShieldCheck size={14} style={{ color: '#059669' }} />
            <span>Affiliate & Commercial Disclosure</span>
          </div>
          <p style={{ margin: 0 }}>
            {siteConfig.affiliateDisclosure}
          </p>
        </div>

        {/* Copyright & Legal */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.8rem',
            color: '#6B7280',
            gap: '12px'
          }}
        >
          <div>
            © {new Date().getFullYear()} {siteConfig.name}. {siteConfig.tagline} All rights reserved.
          </div>
          <div className="flex items-center gap-md">
            <span>Built for global product discovery</span>
            <span>•</span>
            <span className="flex items-center gap-xs">
              Curated with precision
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
