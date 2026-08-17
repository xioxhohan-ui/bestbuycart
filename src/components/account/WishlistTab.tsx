import React, { useState } from 'react';
import { WishlistItem } from '../../types/community';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '../../context/NavigationContext';
import { useCountry } from '../../context/CountryContext';
import { communityService } from '../../services/communityService';
import {
  Heart,
  Trash2,
  Share2,
  Download,
  ExternalLink,
  ArrowRightLeft,
  Star,
  Search,
  Filter,
  ArrowUpDown,
  ShoppingBag
} from 'lucide-react';
import { Button } from '../ui/Button';

interface WishlistTabProps {
  items: WishlistItem[];
  onRefresh: () => void;
}

export const WishlistTab: React.FC<WishlistTabProps> = ({ items, onRefresh }) => {
  const { currentUser, toggleWishlist } = useAuth();
  const { navigate, openCompareWithProduct } = useNavigation();
  const { formatPrice } = useCountry();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'price_asc' | 'price_desc' | 'worth'>('date');
  const [shareSuccess, setShareSuccess] = useState(false);

  const filteredItems = items
    .filter((item) => {
      if (!item.product) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.product.name.toLowerCase().includes(q) ||
          item.product.brand.toLowerCase().includes(q) ||
          item.product.category.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (!a.product || !b.product) return 0;
      if (sortBy === 'price_asc') return a.product.priceUSD - b.product.priceUSD;
      if (sortBy === 'price_desc') return b.product.priceUSD - a.product.priceUSD;
      if (sortBy === 'worth') return b.product.worthScore - a.product.worthScore;
      return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
    });

  const handleExport = (format: 'json' | 'csv') => {
    const data = communityService.exportWishlist(items, format);
    const blob = new Blob([data], { type: format === 'json' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `best-buy-cart-wishlist-${new Date().toISOString().slice(0, 10)}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    const url = `${window.location.origin}/account/wishlist`;
    navigator.clipboard.writeText(url);
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 2500);
  };

  const handleRemove = async (productId: string) => {
    if (currentUser) {
      await communityService.removeFromWishlist(currentUser.id, productId);
      onRefresh();
    }
  };

  return (
    <div>
      {/* Controls Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
          padding: '16px 20px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid var(--border-default)',
          boxShadow: 'var(--shadow-xs)',
          marginBottom: '24px'
        }}
      >
        {/* Search */}
        <div style={{ position: 'relative', minWidth: '220px', flex: 1 }}>
          <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input
            type="text"
            placeholder="Search saved items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 34px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-xs">
          <ArrowUpDown size={14} style={{ color: '#64748B' }} />
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748B' }}>Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              fontSize: '0.82rem',
              backgroundColor: '#FFFFFF',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="date">Date Added</option>
            <option value="worth">Highest Worth Score</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>

        {/* Export & Share buttons */}
        <div className="flex items-center gap-xs">
          <Button variant="secondary" size="sm" icon={<Share2 size={13} />} onClick={handleShare}>
            {shareSuccess ? 'Copied Link!' : 'Share'}
          </Button>
          <Button variant="secondary" size="sm" icon={<Download size={13} />} onClick={() => handleExport('csv')}>
            Export CSV
          </Button>
        </div>
      </div>

      {/* Grid of Wishlist Items */}
      {filteredItems.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1.5px dashed #CBD5E1'
          }}
        >
          <Heart size={44} style={{ color: '#CBD5E1', margin: '0 auto 14px' }} />
          <h3 style={{ margin: '0 0 8px', color: '#1A1A1A', fontSize: '1.1rem' }}>
            Your Wishlist is Empty
          </h3>
          <p style={{ color: '#64748B', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto 20px' }}>
            Click the heart icon on any product across trending, categories, or comparisons to save them here.
          </p>
          <Button variant="primary" size="md" onClick={() => navigate('/trending')}>
            Explore Trending Products
          </Button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {filteredItems.map((item) => {
            const product = item.product!;
            return (
              <div
                key={item.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid var(--border-default)',
                  boxShadow: 'var(--shadow-card)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.2s'
                }}
              >
                {/* Image + Quick Remove */}
                <div
                  style={{
                    position: 'relative',
                    height: '180px',
                    backgroundColor: '#F8FAFC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px'
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                  />

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(product.id)}
                    title="Remove from wishlist"
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#DC2626',
                      cursor: 'pointer',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
                    }}
                  >
                    <Trash2 size={15} />
                  </button>

                  {/* Worth Score Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '12px',
                      backgroundColor: '#ECFDF5',
                      color: '#059669',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      border: '1px solid #A7F3D0'
                    }}
                  >
                    Worth: {product.worthScore}%
                  </div>
                </div>

                {/* Details */}
                <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '4px' }}>
                    {product.brand}
                  </div>
                  <h4
                    onClick={() => navigate('/product-detail', { product })}
                    style={{
                      margin: '0 0 10px',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      color: '#1A1A1A',
                      cursor: 'pointer',
                      lineHeight: 1.35,
                      flex: 1
                    }}
                  >
                    {product.name}
                  </h4>

                  <div className="flex items-center justify-between" style={{ marginBottom: '14px' }}>
                    <span className="font-mono" style={{ fontSize: '1.2rem', fontWeight: 900, color: '#1A1A1A' }}>
                      {formatPrice(product.priceUSD)}
                    </span>
                    <div className="flex items-center gap-xs" style={{ fontSize: '0.78rem', color: '#D97706', fontWeight: 700 }}>
                      <Star size={12} fill="#D97706" style={{ color: '#D97706' }} />
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  {item.notes && (
                    <div style={{ fontSize: '0.75rem', color: '#64748B', fontStyle: 'italic', backgroundColor: '#F8FAFC', padding: '6px 8px', borderRadius: '6px', marginBottom: '12px' }}>
                      "{item.notes}"
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center gap-xs" style={{ paddingTop: '10px', borderTop: '1px solid #F1F5F9' }}>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate('/product-detail', { product })}
                      style={{ flex: 1, borderRadius: '8px' }}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => openCompareWithProduct(product)}
                      title="Compare with another item"
                      icon={<ArrowRightLeft size={13} />}
                      style={{ borderRadius: '8px', padding: '6px 10px' }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
