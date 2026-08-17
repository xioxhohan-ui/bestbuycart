import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '../context/NavigationContext';
import { useCountry } from '../context/CountryContext';
import { communityService } from '../services/communityService';
import { productService } from '../services/productService';
import { UserActivity } from '../types/user';
import { UserReview } from '../types/community';
import { Product } from '../types/product';
import { WishlistTab } from '../components/account/WishlistTab';
import { WatchlistTab } from '../components/account/WatchlistTab';
import { ProductCard } from '../components/product/ProductCard';
import {
  User,
  Heart,
  Radar,
  Star,
  Bell,
  Award,
  ShieldCheck,
  Clock,
  Sparkles,
  Settings,
  LogOut,
  CheckCircle2,
  ExternalLink,
  Edit3,
  MapPin,
  Globe,
  Share2,
  ChevronRight
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { updatePageSEO } from '../utils/seo';

type AccountTab = 'overview' | 'wishlist' | 'watchlist' | 'reviews' | 'settings';

export const AccountView: React.FC = () => {
  const { currentUser, isAuthenticated, logout, updateProfile, wishlistItems, watchlistItems, refreshUserData, openAuthModal } = useAuth();
  const { navigate, selectedAccountTab } = useNavigation();
  const { formatPrice } = useCountry();
  const [activeTab, setActiveTab] = useState<AccountTab>((selectedAccountTab as AccountTab) || 'overview');
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [userReviews, setUserReviews] = useState<UserReview[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState({
    fullName: '',
    username: '',
    bio: '',
    location: '',
    website: ''
  });

  useEffect(() => {
    updatePageSEO('My Account & Community Hub | Best Buy Cart', 'Manage your profile, wishlist, price drop alerts, and verified reviews.');
    if (selectedAccountTab) {
      setActiveTab(selectedAccountTab as AccountTab);
    }
  }, [selectedAccountTab]);

  useEffect(() => {
    if (currentUser) {
      setSettingsForm({
        fullName: currentUser.fullName || '',
        username: currentUser.username || '',
        bio: currentUser.bio || '',
        location: currentUser.location || '',
        website: currentUser.website || ''
      });

      communityService.getUserActivities(currentUser.id).then(setActivities);
      communityService.getUserReviews(currentUser.id).then(setUserReviews);
    }

    productService.getAllProducts().then((all) => {
      // Pick top worth score items as recommendations
      const recs = all.filter((p) => p.worthScore >= 88).slice(0, 4);
      setRecommendedProducts(recs);
    });
  }, [currentUser]);

  if (!isAuthenticated || !currentUser) {
    return (
      <div className="section-spacing container" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <User size={56} style={{ color: '#94A3B8', margin: '0 auto 16px' }} />
        <h2 className="h2" style={{ margin: '0 0 8px', color: '#1A1A1A' }}>
          Sign In to Access Your Account
        </h2>
        <p style={{ color: '#64748B', maxWidth: '440px', margin: '0 auto 24px', fontSize: '0.95rem' }}>
          Create an account or sign in to save products to your wishlist, track price drop radars, and write verified reviews.
        </p>
        <Button variant="primary" size="lg" onClick={() => openAuthModal('login')}>
          Sign In / Create Account
        </Button>
      </div>
    );
  }

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    setSaveSuccessMsg(null);
    try {
      await updateProfile(settingsForm);
      setSaveSuccessMsg('Profile updated successfully!');
      setTimeout(() => setSaveSuccessMsg(null), 3000);
    } finally {
      setIsSavingSettings(false);
    }
  };

  const nextTierPoints = currentUser.reputationPoints < 150 ? 150 : currentUser.reputationPoints < 500 ? 500 : currentUser.reputationPoints < 1500 ? 1500 : 5000;
  const progressPercent = Math.min(100, Math.round((currentUser.reputationPoints / nextTierPoints) * 100));

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '85vh', padding: '36px 0 80px' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div className="flex items-center gap-xs" style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '24px' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Home</span>
          <ChevronRight size={13} />
          <span style={{ color: '#1A1A1A', fontWeight: 600 }}>My Account</span>
          {activeTab !== 'overview' && (
            <>
              <ChevronRight size={13} />
              <span style={{ color: '#2563EB', fontWeight: 700, textTransform: 'capitalize' }}>{activeTab}</span>
            </>
          )}
        </div>

        {/* Profile Header Hero Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid var(--border-default)',
            padding: '32px',
            boxShadow: 'var(--shadow-card)',
            marginBottom: '28px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '6px',
              background: 'linear-gradient(90deg, #2563EB 0%, #9333EA 50%, #D97706 100%)'
            }}
          />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.fullName}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid #EFF6FF',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#059669',
                    border: '2px solid #FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF'
                  }}
                  title="Active Member"
                >
                  <ShieldCheck size={13} />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-sm flex-wrap">
                  <h1 className="h2" style={{ margin: 0, color: '#1A1A1A' }}>
                    {currentUser.fullName}
                  </h1>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      backgroundColor: '#EFF6FF',
                      color: '#2563EB',
                      padding: '3px 10px',
                      borderRadius: '999px',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      border: '1px solid #BFDBFE'
                    }}
                  >
                    <Award size={12} /> {currentUser.tierName}
                  </span>
                </div>

                <div className="flex items-center gap-md flex-wrap" style={{ fontSize: '0.82rem', color: '#64748B', marginTop: '6px' }}>
                  <span>@{currentUser.username}</span>
                  <span>•</span>
                  <span>{currentUser.email}</span>
                  <span>•</span>
                  <span>Member since {currentUser.memberSince}</span>
                  {currentUser.location && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-xs"><MapPin size={12} /> {currentUser.location}</span>
                    </>
                  )}
                </div>

                {currentUser.bio && (
                  <p style={{ margin: '8px 0 0', color: '#334155', fontSize: '0.88rem', maxWidth: '600px', lineHeight: 1.4 }}>
                    "{currentUser.bio}"
                  </p>
                )}
              </div>
            </div>

            {/* Right Side: Reputation Points & Level Progress */}
            <div
              style={{
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                padding: '16px 20px',
                minWidth: '240px'
              }}
            >
              <div className="flex items-center justify-between" style={{ marginBottom: '6px' }}>
                <span className="flex items-center gap-xs" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                  <Sparkles size={13} style={{ color: '#D97706' }} /> Reputation Points
                </span>
                <span className="font-mono" style={{ fontSize: '1.2rem', fontWeight: 900, color: '#D97706' }}>
                  {currentUser.reputationPoints} pts
                </span>
              </div>
              <div style={{ height: '6px', backgroundColor: '#E2E8F0', borderRadius: '999px', overflow: 'hidden', marginBottom: '6px' }}>
                <div style={{ width: `${progressPercent}%`, height: '100%', backgroundColor: '#2563EB', borderRadius: '999px' }} />
              </div>
              <div className="flex items-center justify-between" style={{ fontSize: '0.7rem', color: '#94A3B8' }}>
                <span>Current Tier</span>
                <span>Next Tier at {nextTierPoints} pts</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Stat KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          <div
            onClick={() => setActiveTab('wishlist')}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '20px',
              border: `1.5px solid ${activeTab === 'wishlist' ? '#2563EB' : 'var(--border-default)'}`,
              boxShadow: 'var(--shadow-card)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              transition: 'all 0.15s'
            }}
          >
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#FEF2F2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Heart size={22} fill="#DC2626" />
            </div>
            <div>
              <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1A1A1A' }}>
                {wishlistItems.length}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>
                Wishlist Items
              </div>
            </div>
          </div>

          <div
            onClick={() => setActiveTab('watchlist')}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '20px',
              border: `1.5px solid ${activeTab === 'watchlist' ? '#2563EB' : 'var(--border-default)'}`,
              boxShadow: 'var(--shadow-card)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              transition: 'all 0.15s'
            }}
          >
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Radar size={22} />
            </div>
            <div>
              <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1A1A1A' }}>
                {watchlistItems.length}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>
                Price Radars Active
              </div>
            </div>
          </div>

          <div
            onClick={() => setActiveTab('reviews')}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '20px',
              border: `1.5px solid ${activeTab === 'reviews' ? '#2563EB' : 'var(--border-default)'}`,
              boxShadow: 'var(--shadow-card)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              transition: 'all 0.15s'
            }}
          >
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Star size={22} fill="#D97706" />
            </div>
            <div>
              <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1A1A1A' }}>
                {currentUser.stats.reviewsCount}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>
                Verified Reviews
              </div>
            </div>
          </div>

          <div
            onClick={() => setActiveTab('overview')}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '20px',
              border: `1.5px solid ${activeTab === 'overview' ? '#2563EB' : 'var(--border-default)'}`,
              boxShadow: 'var(--shadow-card)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              transition: 'all 0.15s'
            }}
          >
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={22} />
            </div>
            <div>
              <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1A1A1A' }}>
                {currentUser.stats.helpfulVotesCount}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>
                Helpful Upvotes Earned
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation Navigation Strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderBottom: '1px solid #E2E8F0',
            marginBottom: '28px',
            overflowX: 'auto',
            paddingBottom: '2px'
          }}
        >
          {[
            { id: 'overview', label: 'Overview & Activity', icon: <User size={15} /> },
            { id: 'wishlist', label: `Wishlist (${wishlistItems.length})`, icon: <Heart size={15} /> },
            { id: 'watchlist', label: `Watchlist & Alerts (${watchlistItems.length})`, icon: <Radar size={15} /> },
            { id: 'reviews', label: `My Reviews (${userReviews.length})`, icon: <Star size={15} /> },
            { id: 'settings', label: 'Account Settings', icon: <Settings size={15} /> },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AccountTab)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 18px',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? '#2563EB' : '#64748B',
                  backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '3px solid #2563EB' : '3px solid transparent',
                  borderRadius: isActive ? '8px 8px 0 0' : '0',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            {/* Recent Activity Timeline */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid var(--border-default)',
                boxShadow: 'var(--shadow-card)',
                marginBottom: '36px'
              }}
            >
              <div className="flex items-center gap-xs" style={{ marginBottom: '18px' }}>
                <Clock size={18} style={{ color: '#2563EB' }} />
                <h3 className="h3" style={{ margin: 0 }}>
                  RECENT ACTIVITY & AUDIT TRAIL
                </h3>
              </div>

              {activities.length === 0 ? (
                <p style={{ color: '#64748B', fontSize: '0.88rem' }}>No recent activity recorded.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {activities.map((act) => (
                    <div
                      key={act.id}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        padding: '12px 16px',
                        backgroundColor: '#F8FAFC',
                        borderRadius: '10px',
                        border: '1px solid #F1F5F9'
                      }}
                    >
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          backgroundColor: act.type === 'wishlist' ? '#FEF2F2' : act.type === 'alert' ? '#EFF6FF' : '#FEF3C7',
                          color: act.type === 'wishlist' ? '#DC2626' : act.type === 'alert' ? '#2563EB' : '#D97706',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: '2px'
                        }}
                      >
                        {act.type === 'wishlist' ? <Heart size={14} /> : act.type === 'alert' ? <Radar size={14} /> : <Star size={14} />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, color: '#1A1A1A', fontSize: '0.88rem' }}>
                          {act.action}
                        </div>
                        <div style={{ color: '#2563EB', fontSize: '0.82rem', fontWeight: 600 }}>
                          {act.targetTitle}
                        </div>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#94A3B8', whiteSpace: 'nowrap' }}>
                        {act.timestamp}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recommended For You Cross-sell Section */}
            <div>
              <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
                <div className="flex items-center gap-xs">
                  <Sparkles size={20} style={{ color: '#2563EB' }} />
                  <h3 className="h3" style={{ margin: 0 }}>
                    RECOMMENDED FOR YOU
                  </h3>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate('/trending')}>
                  View More
                </Button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
                {recommendedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: WISHLIST */}
        {activeTab === 'wishlist' && (
          <WishlistTab items={wishlistItems} onRefresh={refreshUserData} />
        )}

        {/* TAB 3: WATCHLIST */}
        {activeTab === 'watchlist' && (
          <WatchlistTab items={watchlistItems} onRefresh={refreshUserData} />
        )}

        {/* TAB 4: MY REVIEWS */}
        {activeTab === 'reviews' && (
          <div>
            <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
              <h3 className="h3" style={{ margin: 0 }}>
                MY PUBLISHED REVIEWS ({userReviews.length})
              </h3>
            </div>

            {userReviews.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px dashed #CBD5E1' }}>
                <Star size={44} style={{ color: '#CBD5E1', margin: '0 auto 12px' }} />
                <h4 style={{ margin: '0 0 6px', color: '#1A1A1A' }}>You haven't written any reviews yet</h4>
                <p style={{ color: '#64748B', fontSize: '0.88rem', margin: '0 0 16px' }}>Earn 50 reputation points for every authentic verified review you publish.</p>
                <Button variant="primary" size="md" onClick={() => navigate('/trending')}>
                  Find a Product to Review
                </Button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {userReviews.map((rev) => (
                  <div
                    key={rev.id}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      padding: '24px',
                      border: '1px solid var(--border-default)',
                      boxShadow: 'var(--shadow-card)'
                    }}
                  >
                    <div className="flex items-start justify-between" style={{ marginBottom: '10px' }}>
                      <div>
                        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#2563EB', textTransform: 'uppercase' }}>
                          {rev.productName}
                        </div>
                        <h4 style={{ margin: '2px 0 6px', fontSize: '1rem', fontWeight: 800, color: '#1A1A1A' }}>
                          {rev.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-xs">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={13} fill={s <= rev.rating ? '#D97706' : 'none'} style={{ color: s <= rev.rating ? '#D97706' : '#CBD5E1' }} />
                        ))}
                      </div>
                    </div>

                    <p style={{ margin: '0 0 12px', fontSize: '0.88rem', color: '#334155', lineHeight: 1.5 }}>
                      {rev.content}
                    </p>

                    <div className="flex items-center gap-md" style={{ fontSize: '0.75rem', color: '#64748B', paddingTop: '10px', borderTop: '1px solid #F1F5F9' }}>
                      <span>Published {new Date(rev.createdAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span style={{ color: '#059669', fontWeight: 700 }}>{rev.helpfulUpvotes} helpful votes</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: ACCOUNT SETTINGS */}
        {activeTab === 'settings' && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '32px',
              border: '1px solid var(--border-default)',
              boxShadow: 'var(--shadow-card)',
              maxWidth: '640px'
            }}
          >
            <h3 className="h3" style={{ margin: '0 0 6px' }}>
              Account & Profile Settings
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.88rem', margin: '0 0 24px' }}>
              Update your public bio, username, and community details.
            </p>

            {saveSuccessMsg && (
              <div className="flex items-center gap-xs" style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', color: '#059669', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '20px' }}>
                <CheckCircle2 size={16} />
                <span>{saveSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={settingsForm.fullName}
                  onChange={(e) => setSettingsForm({ ...settingsForm, fullName: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Username
                </label>
                <input
                  type="text"
                  required
                  value={settingsForm.username}
                  onChange={(e) => setSettingsForm({ ...settingsForm, username: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. London, UK or New York, USA"
                  value={settingsForm.location}
                  onChange={(e) => setSettingsForm({ ...settingsForm, location: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Website / Portfolio Link
                </label>
                <input
                  type="url"
                  placeholder="https://yourwebsite.com"
                  value={settingsForm.website}
                  onChange={(e) => setSettingsForm({ ...settingsForm, website: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Bio & Interests
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell the community what gadgets and gear you enjoy testing..."
                  value={settingsForm.bio}
                  onChange={(e) => setSettingsForm({ ...settingsForm, bio: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <div className="flex items-center justify-between" style={{ marginTop: '12px', paddingTop: '16px', borderTop: '1px solid #F1F5F9' }}>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  icon={<LogOut size={14} />}
                  style={{ color: '#DC2626' }}
                >
                  Sign Out
                </Button>
                <Button type="submit" variant="primary" size="md" disabled={isSavingSettings}>
                  {isSavingSettings ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
