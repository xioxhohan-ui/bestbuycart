import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useCountry } from '../context/CountryContext';
import { authService } from '../services/authService';
import { communityService } from '../services/communityService';
import { UserProfile } from '../types/user';
import { UserReview } from '../types/community';
import {
  User,
  Star,
  ShieldCheck,
  Award,
  ThumbsUp,
  MapPin,
  Globe,
  MessageSquare,
  UserPlus,
  Check,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { updatePageSEO } from '../utils/seo';

export const UserProfileView: React.FC = () => {
  const { selectedUsername, navigate } = useNavigation();
  const { formatPrice } = useCountry();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      const username = selectedUsername || 'johndoe';
      const user = await authService.getUserByUsername(username);

      if (user) {
        setProfile(user);
        updatePageSEO(`${user.fullName} (@${user.username}) | Best Buy Cart Member`, `${user.bio || 'Verified reviewer and gadget enthusiast.'}`);
        const userRevs = await communityService.getUserReviews(user.id);
        setReviews(userRevs);
      }
      setIsLoading(false);
    };

    loadProfile();
  }, [selectedUsername]);

  if (isLoading) {
    return (
      <div className="section-spacing container" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <p style={{ color: '#64748B' }}>Loading user profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="section-spacing container" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <User size={56} style={{ color: '#94A3B8', margin: '0 auto 16px' }} />
        <h2 className="h2" style={{ margin: '0 0 8px', color: '#1A1A1A' }}>
          User Profile Not Found
        </h2>
        <p style={{ color: '#64748B', maxWidth: '400px', margin: '0 auto 20px' }}>
          The requested member account does not exist or has been removed.
        </p>
        <Button variant="primary" size="md" onClick={() => navigate('/')}>
          Return Home
        </Button>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '85vh', padding: '36px 0 80px' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div className="flex items-center gap-xs" style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '24px' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Home</span>
          <ChevronRight size={13} />
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/account')}>Community</span>
          <ChevronRight size={13} />
          <span style={{ color: '#1A1A1A', fontWeight: 600 }}>@{profile.username}</span>
        </div>

        {/* Public Profile Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid var(--border-default)',
            padding: '36px',
            boxShadow: 'var(--shadow-card)',
            marginBottom: '32px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <img
                src={profile.avatarUrl}
                alt={profile.fullName}
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid #EFF6FF',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.08)'
                }}
              />

              <div>
                <div className="flex items-center gap-sm flex-wrap">
                  <h1 className="h2" style={{ margin: 0, color: '#1A1A1A' }}>
                    {profile.fullName}
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
                    <Award size={12} /> {profile.tierName}
                  </span>
                </div>

                <div className="flex items-center gap-md flex-wrap" style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '6px' }}>
                  <span>@{profile.username}</span>
                  <span>•</span>
                  <span>Member since {profile.memberSince}</span>
                  {profile.location && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-xs"><MapPin size={13} /> {profile.location}</span>
                    </>
                  )}
                  {profile.website && (
                    <>
                      <span>•</span>
                      <a href={profile.website} target="_blank" rel="noreferrer" className="flex items-center gap-xs" style={{ color: '#2563EB', textDecoration: 'none' }}>
                        <Globe size={13} /> Website
                      </a>
                    </>
                  )}
                </div>

                {profile.bio && (
                  <p style={{ margin: '12px 0 0', color: '#334155', fontSize: '0.92rem', maxWidth: '640px', lineHeight: 1.5 }}>
                    "{profile.bio}"
                  </p>
                )}
              </div>
            </div>

            {/* Follow / Contact Buttons */}
            <div className="flex items-center gap-sm">
              <Button
                variant={isFollowing ? "secondary" : "primary"}
                size="md"
                icon={isFollowing ? <Check size={14} /> : <UserPlus size={14} />}
                onClick={() => setIsFollowing(!isFollowing)}
                style={{ borderRadius: '8px' }}
              >
                {isFollowing ? 'Following' : 'Follow Member'}
              </Button>
            </div>
          </div>

          {/* 4 Public Stats Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '16px',
              marginTop: '28px',
              paddingTop: '24px',
              borderTop: '1px solid #F1F5F9'
            }}
          >
            <div style={{ backgroundColor: '#F8FAFC', padding: '14px 18px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Reviews Published</div>
              <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 900, color: '#1A1A1A', marginTop: '2px' }}>
                {profile.stats.reviewsCount}
              </div>
            </div>

            <div style={{ backgroundColor: '#F8FAFC', padding: '14px 18px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Helpful Votes</div>
              <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 900, color: '#059669', marginTop: '2px' }}>
                {profile.stats.helpfulVotesCount}
              </div>
            </div>

            <div style={{ backgroundColor: '#F8FAFC', padding: '14px 18px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Reputation Points</div>
              <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 900, color: '#D97706', marginTop: '2px' }}>
                {profile.reputationPoints}
              </div>
            </div>

            <div style={{ backgroundColor: '#F8FAFC', padding: '14px 18px', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Discussions Joined</div>
              <div className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 900, color: '#2563EB', marginTop: '2px' }}>
                {profile.stats.commentsCount}
              </div>
            </div>
          </div>
        </div>

        {/* Public Reviews Section */}
        <div>
          <h3 className="h3" style={{ margin: '0 0 20px' }}>
            VERIFIED REVIEWS BY {profile.fullName.toUpperCase()} ({reviews.length})
          </h3>

          {reviews.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px dashed #CBD5E1' }}>
              <p style={{ color: '#64748B', margin: 0 }}>This member has not published any public reviews yet.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {reviews.map((rev) => (
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
                  <div className="flex items-start justify-between" style={{ marginBottom: '12px' }}>
                    <div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#2563EB', textTransform: 'uppercase' }}>
                        {rev.productName}
                      </span>
                      <h4 style={{ margin: '2px 0 4px', fontSize: '1.05rem', fontWeight: 800, color: '#1A1A1A' }}>
                        {rev.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-xs">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={14} fill={s <= rev.rating ? '#D97706' : 'none'} style={{ color: s <= rev.rating ? '#D97706' : '#CBD5E1' }} />
                      ))}
                    </div>
                  </div>

                  <p style={{ margin: '0 0 14px', color: '#334155', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {rev.content}
                  </p>

                  <div className="flex items-center justify-between" style={{ paddingTop: '12px', borderTop: '1px solid #F1F5F9', fontSize: '0.8rem', color: '#64748B' }}>
                    <div className="flex items-center gap-xs" style={{ color: '#059669', fontWeight: 600 }}>
                      <ThumbsUp size={13} /> {rev.helpfulUpvotes} people found this review helpful
                    </div>
                    <span>{new Date(rev.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
