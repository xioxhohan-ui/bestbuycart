import React from 'react';
import { Product } from '../../types/product';
import { useCountry } from '../../context/CountryContext';
import { useNavigation } from '../../context/NavigationContext';
import { useAuth } from '../../context/AuthContext';
import { ProductScore } from './ProductScore';
import { Star, GitCompare, ExternalLink, ArrowRight, ShieldCheck, Flame, Heart } from 'lucide-react';
import { Button } from '../ui/Button';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact' | 'featured' | 'horizontal';
  onSelect?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = 'default',
  onSelect
}) => {
  const { formatPrice } = useCountry();
  const { navigate, openCompareWithProduct } = useNavigation();
  const { isInWishlist, toggleWishlist } = useAuth();
  const isSaved = isInWishlist(product.id);

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(product);
    } else {
      navigate('/product-detail', { product });
    }
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openCompareWithProduct(product);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const primaryOffer = product.offers && product.offers.length > 0 ? product.offers[0] : null;

  return (
    <div
      className={`product-card ${variant === 'horizontal' ? 'product-card-horizontal' : ''}`}
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      {/* Image Container with Badges */}
      <div className="product-card-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-image"
          loading="lazy"
        />

        {/* Quick Wishlist Toggle */}
        <button
          onClick={handleWishlistClick}
          title={isSaved ? "Remove from Wishlist" : "Save to Wishlist"}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: isSaved ? '#FEF2F2' : '#FFFFFF',
            border: `1px solid ${isSaved ? '#FECACA' : '#E2E8F0'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isSaved ? '#DC2626' : '#64748B',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            zIndex: 10,
            transition: 'all 0.15s'
          }}
        >
          <Heart size={15} fill={isSaved ? '#DC2626' : 'none'} />
        </button>

        {/* Top Badges Row */}
        <div className="product-card-badge-row" style={{ right: '48px' }}>
          {/* Top Left: Hype Badge */}
          <div
            style={{
              background: 'linear-gradient(135deg, #EA580C 0%, #F97316 100%)',
              color: '#FFFFFF',
              padding: '4px 10px',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 2px 6px rgba(234, 88, 12, 0.35)'
            }}
          >
            <Flame size={12} fill="currentColor" />
            <span>{product.hypeScore}/100</span>
          </div>

          {/* Top Right: Worth It Badge */}
          {product.worthScore >= 88 && (
            <div
              style={{
                backgroundColor: '#059669',
                color: '#FFFFFF',
                padding: '3px 9px',
                borderRadius: '999px',
                fontSize: '0.68rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
                boxShadow: '0 2px 6px rgba(5, 150, 105, 0.3)'
              }}
            >
              <Star size={10} fill="currentColor" />
              <span>Worth It</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="product-card-body">
        {/* Brand & Category */}
        <div className="flex items-center justify-between">
          <span className="product-card-brand">{product.brand}</span>
          {product.dealPercentage && (
            <span
              style={{
                color: '#DC2626',
                fontWeight: 700,
                fontSize: '0.75rem',
                backgroundColor: '#FEF2F2',
                padding: '2px 6px',
                borderRadius: '4px'
              }}
            >
              -{product.dealPercentage}% Off
            </span>
          )}
        </div>

        {/* Title */}
        <h4 className="product-card-title" title={product.name}>
          {product.name}
        </h4>

        {/* Rating */}
        <div className="flex items-center gap-xs" style={{ fontSize: '0.8rem', color: '#4B5563' }}>
          <span className="flex items-center text-warning" style={{ color: '#D97706', fontWeight: 700 }}>
            <Star size={13} fill="#D97706" style={{ marginRight: '3px' }} />
            {product.rating.toFixed(1)}
          </span>
          <span style={{ color: '#9CA3AF' }}>•</span>
          <span style={{ color: '#6B7280', fontSize: '0.75rem' }}>
            ({product.reviewCount.toLocaleString()} reviews)
          </span>
        </div>

        {/* Price Row */}
        <div className="flex items-baseline gap-sm" style={{ marginTop: '2px' }}>
          <span className="product-card-price font-mono">
            {formatPrice(product.priceUSD)}
          </span>
          {product.originalPriceUSD && (
            <span className="product-card-original-price font-mono">
              {formatPrice(product.originalPriceUSD)}
            </span>
          )}
        </div>

        {/* Quick Verdict */}
        <div
          style={{
            fontSize: '0.78rem',
            fontStyle: 'italic',
            color: '#6B7280',
            lineHeight: 1.35,
            minHeight: '2.4em',
            marginTop: '2px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          "{product.verdict}"
        </div>

        {/* Score Component */}
        <div className="product-card-scores">
          <ProductScore
            hypeScore={product.hypeScore}
            worthScore={product.worthScore}
            breakdown={product.scoreBreakdown}
          />
        </div>

        {/* Action Buttons Row */}
        <div className="product-card-footer" style={{ gap: '8px', paddingTop: '10px' }}>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCompareClick}
            icon={<GitCompare size={13} />}
            style={{ flex: 1, padding: '7px 8px', fontSize: '0.75rem' }}
          >
            Compare
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate('/product-detail', { product });
            }}
            icon={<ArrowRight size={13} />}
            iconPosition="right"
            style={{ flex: 1.2, padding: '7px 8px', fontSize: '0.75rem' }}
          >
            See Details
          </Button>
        </div>
      </div>
    </div>
  );
};
