import React, { useState } from 'react';
import { WatchlistItem } from '../../types/community';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '../../context/NavigationContext';
import { useCountry } from '../../context/CountryContext';
import { communityService } from '../../services/communityService';
import {
  Radar,
  Bell,
  Trash2,
  Edit2,
  TrendingDown,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  DollarSign
} from 'lucide-react';
import { Button } from '../ui/Button';

interface WatchlistTabProps {
  items: WatchlistItem[];
  onRefresh: () => void;
}

export const WatchlistTab: React.FC<WatchlistTabProps> = ({ items, onRefresh }) => {
  const { currentUser } = useAuth();
  const { navigate } = useNavigation();
  const { formatPrice } = useCountry();
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [newTargetPrice, setNewTargetPrice] = useState<number>(0);

  const handleRemove = async (productId: string) => {
    if (currentUser) {
      await communityService.removeFromWatchlist(currentUser.id, productId);
      onRefresh();
    }
  };

  const handleSaveTargetPrice = async (item: WatchlistItem) => {
    if (currentUser && item.product) {
      await communityService.addToWatchlist(currentUser.id, item.product, newTargetPrice);
      setEditingItemId(null);
      onRefresh();
    }
  };

  return (
    <div>
      {/* Header Info Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '16px 20px',
          backgroundColor: '#EFF6FF',
          borderRadius: '16px',
          border: '1.5px solid #BFDBFE',
          marginBottom: '24px'
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            backgroundColor: '#2563EB',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <Radar size={22} />
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ margin: '0 0 2px', fontSize: '0.95rem', fontWeight: 800, color: '#1E40AF' }}>
            Automated Price Drop Radar Active
          </h4>
          <p style={{ margin: 0, fontSize: '0.82rem', color: '#3B82F6', lineHeight: 1.4 }}>
            Our pricing engine scans verified retailers every 30 minutes. You'll receive instant notification as soon as street price drops below your target.
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1.5px dashed #CBD5E1'
          }}
        >
          <Bell size={44} style={{ color: '#CBD5E1', margin: '0 auto 14px' }} />
          <h3 style={{ margin: '0 0 8px', color: '#1A1A1A', fontSize: '1.1rem' }}>
            No Active Price Radar Alerts
          </h3>
          <p style={{ color: '#64748B', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto 20px' }}>
            Set a target price on any product page or flash deal to get notified the second it drops.
          </p>
          <Button variant="primary" size="md" onClick={() => navigate('/deals')}>
            Browse Live Price Drops
          </Button>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid var(--border-default)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-card)'
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  <th style={{ padding: '14px 20px', width: '38%', color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Tracked Product
                  </th>
                  <th style={{ padding: '14px 20px', width: '18%', color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Current Street Price
                  </th>
                  <th style={{ padding: '14px 20px', width: '18%', color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Your Target Price
                  </th>
                  <th style={{ padding: '14px 20px', width: '16%', color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Radar Status
                  </th>
                  <th style={{ padding: '14px 20px', width: '10%', textAlign: 'right', color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => {
                  const product = item.product;
                  const isEditing = editingItemId === item.id;
                  const isTriggered = item.alertTriggered;

                  return (
                    <tr
                      key={item.id}
                      style={{
                        backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC',
                        borderBottom: '1px solid #F1F5F9'
                      }}
                    >
                      {/* Product Column */}
                      <td style={{ padding: '14px 20px' }}>
                        <div className="flex items-center gap-sm">
                          <img
                            src={product?.image || 'https://via.placeholder.com/60'}
                            alt={product?.name || 'Product'}
                            style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '8px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0' }}
                          />
                          <div>
                            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                              {product?.brand}
                            </div>
                            <div
                              onClick={() => product && navigate('/product-detail', { product })}
                              style={{ fontWeight: 700, color: '#1A1A1A', fontSize: '0.88rem', cursor: 'pointer', lineHeight: 1.3 }}
                            >
                              {product?.name || 'Loading product...'}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Current Price */}
                      <td style={{ padding: '14px 20px' }}>
                        <div className="font-mono" style={{ fontSize: '1.05rem', fontWeight: 900, color: '#1A1A1A' }}>
                          {formatPrice(item.currentPriceUSD)}
                        </div>
                        {product?.originalPriceUSD && (
                          <div style={{ fontSize: '0.75rem', color: '#94A3B8', textDecoration: 'line-through' }}>
                            {formatPrice(product.originalPriceUSD)}
                          </div>
                        )}
                      </td>

                      {/* Target Price */}
                      <td style={{ padding: '14px 20px' }}>
                        {isEditing ? (
                          <div className="flex items-center gap-xs">
                            <input
                              type="number"
                              value={newTargetPrice}
                              onChange={(e) => setNewTargetPrice(Number(e.target.value))}
                              style={{
                                width: '80px',
                                padding: '4px 6px',
                                borderRadius: '6px',
                                border: '1.5px solid #2563EB',
                                fontSize: '0.88rem',
                                outline: 'none'
                              }}
                            />
                            <Button size="sm" variant="primary" onClick={() => handleSaveTargetPrice(item)}>
                              Save
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-xs">
                            <span className="font-mono" style={{ fontSize: '1.05rem', fontWeight: 800, color: '#2563EB' }}>
                              {formatPrice(item.targetPriceUSD)}
                            </span>
                            <button
                              onClick={() => {
                                setEditingItemId(item.id);
                                setNewTargetPrice(item.targetPriceUSD);
                              }}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: '2px' }}
                              title="Edit target price"
                            >
                              <Edit2 size={12} />
                            </button>
                          </div>
                        )}
                      </td>

                      {/* Status */}
                      <td style={{ padding: '14px 20px' }}>
                        {isTriggered ? (
                          <span
                            className="flex items-center gap-xs"
                            style={{
                              display: 'inline-flex',
                              backgroundColor: '#ECFDF5',
                              color: '#059669',
                              padding: '4px 10px',
                              borderRadius: '999px',
                              fontSize: '0.75rem',
                              fontWeight: 800,
                              border: '1px solid #A7F3D0'
                            }}
                          >
                            <TrendingDown size={13} /> Triggered!
                          </span>
                        ) : (
                          <span
                            className="flex items-center gap-xs"
                            style={{
                              display: 'inline-flex',
                              backgroundColor: '#EFF6FF',
                              color: '#2563EB',
                              padding: '4px 10px',
                              borderRadius: '999px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              border: '1px solid #BFDBFE'
                            }}
                          >
                            <Radar size={13} /> Active Scanning
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                        <div className="flex items-center justify-end gap-xs">
                          {product && (
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => navigate('/product-detail', { product })}
                              title="View product"
                              icon={<ExternalLink size={13} />}
                              style={{ padding: '5px 8px' }}
                            />
                          )}
                          <button
                            onClick={() => handleRemove(item.productId)}
                            title="Delete alert"
                            style={{
                              width: '30px',
                              height: '30px',
                              borderRadius: '6px',
                              border: '1px solid #CBD5E1',
                              backgroundColor: '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#DC2626',
                              cursor: 'pointer'
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
