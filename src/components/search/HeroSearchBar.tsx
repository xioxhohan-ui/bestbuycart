import React, { useState, useEffect } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { useSearch } from '../../context/SearchContext';

export const HeroSearchBar: React.FC = () => {
  const { openSearch, executeSearch } = useSearch();
  const [localQuery, setLocalQuery] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const placeholderExamples = [
    'best headphones under $100...',
    'espresso machine with automatic milk frother...',
    'lightweight laptop for work and travel...',
    'smart ring for sleep & health tracking...',
    'gifts under $50 for dad or tech lovers...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholderExamples.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      openSearch(localQuery);
    } else {
      openSearch();
    }
  };

  return (
    <div className="hero-search-wrapper">
      <form onSubmit={handleSubmit} className="hero-search-box">
        <Search size={22} style={{ color: '#9CA3AF', marginLeft: '4px', flexShrink: 0 }} />
        
        <input
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder={`Search products... e.g., ${placeholderExamples[placeholderIndex]}`}
          className="hero-search-input"
          aria-label="Search products, scores, and comparisons"
        />

        <button
          type="submit"
          className="btn btn-primary"
          style={{
            borderRadius: '999px',
            padding: '10px 20px',
            fontSize: '0.92rem',
            backgroundColor: '#2563EB',
            color: '#FFFFFF',
            fontWeight: 600,
            flexShrink: 0
          }}
        >
          <span>Search</span>
          <ArrowRight size={16} />
        </button>
      </form>
    </div>
  );
};
