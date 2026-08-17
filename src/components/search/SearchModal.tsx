import React, { useEffect, useRef } from 'react';
import { useSearch } from '../../context/SearchContext';
import { useNavigation } from '../../context/NavigationContext';
import { useCountry } from '../../context/CountryContext';
import { Search, X, Flame, ArrowRight, Tag, Sparkles, Star } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchModalOpen, closeSearch, searchQuery, executeSearch, searchResults, suggestions, isLoading } = useSearch();
  const { navigate } = useNavigation();
  const { formatPrice } = useCountry();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isSearchModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isSearchModalOpen) closeSearch();
        else executeSearch('');
      }
      if (e.key === 'Escape' && isSearchModalOpen) {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchModalOpen, closeSearch, executeSearch]);

  if (!isSearchModalOpen) return null;

  return (
    <div className="modal-backdrop" onClick={closeSearch}>
      <div
        className="modal-content"
        style={{ maxWidth: '680px', padding: 0, overflow: 'hidden' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-default)',
            backgroundColor: '#FFFFFF',
            gap: '12px'
          }}
        >
          <Search size={22} style={{ color: '#2563EB', flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => executeSearch(e.target.value)}
            placeholder="Search products, scores, categories, or 'headphones under $100'..."
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '1.05rem',
              fontWeight: 500,
              color: '#1A1A1A'
            }}
          />
          {searchQuery && (
            <button
              onClick={() => executeSearch('')}
              style={{ color: '#9CA3AF', padding: '4px', cursor: 'pointer' }}
              aria-label="Clear query"
            >
              <X size={18} />
            </button>
          )}
          <button
            onClick={closeSearch}
            className="btn btn-ghost btn-sm"
            style={{ padding: '6px 10px', fontSize: '0.75rem', borderRadius: '6px' }}
          >
            ESC
          </button>
        </div>

        {/* Structured Intent Analysis Tag */}
        {searchResults?.parsedIntent && (searchResults.parsedIntent.category || searchResults.parsedIntent.maxBudget || searchResults.parsedIntent.recipient) && (
          <div
            style={{
              padding: '8px 20px',
              backgroundColor: '#EFF6FF',
              borderBottom: '1px solid #DBEAFE',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.78rem',
              color: '#1E40AF'
            }}
          >
            <Sparkles size={14} style={{ color: '#2563EB' }} />
            <span>AI Intent Detected:</span>
            {searchResults.parsedIntent.category && (
              <span style={{ backgroundColor: '#FFFFFF', padding: '2px 8px', borderRadius: '4px', fontWeight: 600, border: '1px solid #BFDBFE' }}>
                Category: {searchResults.parsedIntent.category}
              </span>
            )}
            {searchResults.parsedIntent.maxBudget && (
              <span style={{ backgroundColor: '#FFFFFF', padding: '2px 8px', borderRadius: '4px', fontWeight: 600, border: '1px solid #BFDBFE' }}>
                Budget: ≤ ${searchResults.parsedIntent.maxBudget}
              </span>
            )}
            {searchResults.parsedIntent.recipient && (
              <span style={{ backgroundColor: '#FFFFFF', padding: '2px 8px', borderRadius: '4px', fontWeight: 600, border: '1px solid #BFDBFE' }}>
                Recipient: For {searchResults.parsedIntent.recipient}
              </span>
            )}
          </div>
        )}

        {/* Results Body */}
        <div style={{ maxHeight: '60vh', overflowY: 'auto', padding: '16px 20px' }}>
          {isLoading ? (
            <div style={{ padding: '24px 0', textAlign: 'center', color: '#6B7280' }}>
              <div className="skeleton" style={{ height: '30px', marginBottom: '12px' }} />
              <div className="skeleton" style={{ height: '50px', marginBottom: '12px' }} />
              <div className="skeleton" style={{ height: '50px' }} />
            </div>
          ) : searchResults && searchResults.totalMatches > 0 ? (
            <div>
              {/* Product Matches */}
              {searchResults.products.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                    Matching Products ({searchResults.products.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {searchResults.products.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          closeSearch();
                          navigate('/product-detail', { product });
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '14px',
                          padding: '10px',
                          borderRadius: '12px',
                          border: '1px solid #F0F1F3',
                          backgroundColor: '#FFFFFF',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#2563EB';
                          e.currentTarget.style.backgroundColor = '#F8FAFC';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#F0F1F3';
                          e.currentTarget.style.backgroundColor = '#FFFFFF';
                        }}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>
                              {product.brand}
                            </span>
                            <span style={{ fontSize: '0.7rem', color: '#9CA3AF' }}>•</span>
                            <span style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 600 }}>
                              Worth: {product.worthScore}/100
                            </span>
                          </div>
                          <h5 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1A1A1A', margin: '2px 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {product.name}
                          </h5>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <div className="font-mono" style={{ fontWeight: 700, color: '#1A1A1A', fontSize: '0.95rem' }}>
                            {formatPrice(product.priceUSD)}
                          </div>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '0.7rem', color: '#EA580C', fontWeight: 700 }}>
                            <Flame size={11} fill="currentColor" />
                            <span>{product.hypeScore}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Category Matches */}
              {searchResults.categories.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                    Categories
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {searchResults.categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          closeSearch();
                          navigate('/category-detail', { categorySlug: cat.slug });
                        }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 14px',
                          borderRadius: '999px',
                          border: '1px solid #E5E7EB',
                          backgroundColor: '#F8FAFC',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          color: '#1A1A1A',
                          cursor: 'pointer'
                        }}
                      >
                        <Tag size={13} style={{ color: '#2563EB' }} />
                        <span>{cat.name}</span>
                        <ArrowRight size={12} style={{ color: '#9CA3AF' }} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : searchQuery ? (
            <div style={{ padding: '36px 0', textAlign: 'center' }}>
              <p style={{ color: '#1A1A1A', fontWeight: 600, margin: '0 0 6px' }}>No exact products found for "{searchQuery}"</p>
              <p style={{ color: '#6B7280', fontSize: '0.85rem', margin: 0 }}>Try searching for "headphones", "coffee", "laptop", or "gifts under $50".</p>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                Popular Searches
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {suggestions.map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => executeSearch(sug)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: 'transparent',
                      textAlign: 'left',
                      color: '#4B5563',
                      fontSize: '0.88rem',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#EFF6FF';
                      e.currentTarget.style.color = '#2563EB';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#4B5563';
                    }}
                  >
                    <Search size={14} style={{ color: '#9CA3AF' }} />
                    <span>{sug}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
