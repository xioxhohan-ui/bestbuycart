import React from 'react';
import { RetailerOffer } from '../../types/retailer';
import { useCountry } from '../../context/CountryContext';
import { ExternalLink, CheckCircle2, AlertCircle, ShoppingBag, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';

interface RetailerOffersTableProps {
  offers: RetailerOffer[];
}

export const RetailerOffersTable: React.FC<RetailerOffersTableProps> = ({ offers }) => {
  const { formatPrice } = useCountry();

  if (!offers || offers.length === 0) {
    return (
      <div style={{ padding: '20px', backgroundColor: '#F8FAFC', borderRadius: '12px', textAlign: 'center', color: '#6B7280', fontSize: '0.85rem' }}>
        No direct retailer links available for this item in your selected region.
      </div>
    );
  }

  // Sort lowest price first
  const sortedOffers = [...offers].sort((a, b) => a.priceUSD - b.priceUSD);

  return (
    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid var(--border-default)', overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
      {/* Table Header */}
      <div style={{ padding: '16px 20px', backgroundColor: '#F8FAFC', borderBottom: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="flex items-center gap-xs">
          <ShoppingBag size={16} style={{ color: '#2563EB' }} />
          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1A1A1A' }}>
            Verified Retailer Pricing & Availability
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
          Updated in real-time
        </span>
      </div>

      {/* Offers List */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {sortedOffers.map((offer, index) => {
          const isBestPrice = index === 0 && sortedOffers.length > 1;
          return (
            <div
              key={offer.retailerId}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderBottom: index !== sortedOffers.length - 1 ? '1px solid #F0F1F3' : 'none',
                backgroundColor: isBestPrice ? '#F0FDF4' : '#FFFFFF',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              {/* Retailer Name & Delivery Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '180px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E5E7EB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    color: '#2563EB'
                  }}
                >
                  {offer.retailerName.slice(0, 2).toUpperCase()}
                </div>

                <div>
                  <div className="flex items-center gap-xs">
                    <span style={{ fontWeight: 700, fontSize: '0.92rem', color: '#1A1A1A' }}>
                      {offer.retailerName}
                    </span>
                    {isBestPrice && (
                      <span
                        style={{
                          backgroundColor: '#DCFCE7',
                          color: '#15803D',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          padding: '1px 6px',
                          borderRadius: '4px',
                          textTransform: 'uppercase'
                        }}
                      >
                        Lowest Price
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {offer.inStock ? (
                      <span className="flex items-center gap-2xs" style={{ color: '#059669' }}>
                        <CheckCircle2 size={11} /> In Stock
                      </span>
                    ) : (
                      <span className="flex items-center gap-2xs" style={{ color: '#DC2626' }}>
                        <AlertCircle size={11} /> Low Stock
                      </span>
                    )}
                    {offer.shippingInfo && <span>• {offer.shippingInfo}</span>}
                  </div>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="flex items-center gap-md" style={{ marginLeft: 'auto' }}>
                <div style={{ textAlign: 'right' }}>
                  <div className="font-mono" style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1A1A1A' }}>
                    {formatPrice(offer.priceUSD)}
                  </div>
                  {offer.originalPriceUSD && (
                    <div className="font-mono" style={{ fontSize: '0.75rem', color: '#9CA3AF', textDecoration: 'line-through' }}>
                      {formatPrice(offer.originalPriceUSD)}
                    </div>
                  )}
                </div>

                <a
                  href={offer.affiliateUrl || offer.destinationUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="btn btn-primary btn-sm"
                  style={{
                    backgroundColor: isBestPrice ? '#059669' : '#2563EB',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    textDecoration: 'none'
                  }}
                >
                  <span>Check Price</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
