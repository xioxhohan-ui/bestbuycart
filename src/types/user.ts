export type UserRole = 'user' | 'editor' | 'moderator' | 'admin';

export type UserStatus = 'active' | 'suspended' | 'banned';

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  fullName: string;
  avatarUrl: string;
  bio?: string;
  location?: string;
  website?: string;
  role: UserRole;
  status: UserStatus;
  memberSince: string;
  lastActive?: string;
  reputationPoints: number;
  tierId: string;
  tierName: string;
  stats: {
    reviewsCount: number;
    helpfulVotesCount: number;
    wishlistCount: number;
    watchlistCount: number;
    commentsCount: number;
  };
}

export type ActivityType = 'wishlist' | 'watchlist' | 'review' | 'comment' | 'alert' | 'login';

export interface UserActivity {
  id: string;
  userId: string;
  action: string;
  targetTitle: string;
  targetUrl?: string;
  type: ActivityType;
  timestamp: string;
}
