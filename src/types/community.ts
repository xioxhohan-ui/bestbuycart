import { Product } from './product';

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  product?: Product;
  addedAt: string;
  notes?: string;
  priority?: 'high' | 'medium' | 'low';
}

export interface WatchlistItem {
  id: string;
  userId: string;
  productId: string;
  product?: Product;
  initialPriceUSD: number;
  currentPriceUSD: number;
  targetPriceUSD: number;
  alertTriggered: boolean;
  alertEnabled: boolean;
  createdAt: string;
  lastTriggeredAt?: string;
}

export type ReviewStatus = 'approved' | 'pending' | 'reported';

export interface ReviewReply {
  id: string;
  reviewId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userRole?: string;
  content: string;
  createdAt: string;
}

export interface UserReview {
  id: string;
  productId: string;
  productName: string;
  productSlug: string;
  productImage?: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userTier: string;
  rating: number; // 1 to 5
  title: string;
  content: string;
  pros: string[];
  cons: string[];
  isVerifiedPurchase: boolean;
  helpfulUpvotes: number;
  helpfulDownvotes: number;
  status: ReviewStatus;
  createdAt: string;
  replies?: ReviewReply[];
}

export type CommentStatus = 'approved' | 'pending' | 'reported';

export interface CommunityComment {
  id: string;
  targetType: 'guide' | 'product';
  targetId: string;
  targetTitle: string;
  targetUrl: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  status: CommentStatus;
  createdAt: string;
  upvotes: number;
  parentId?: string;
  replies?: CommunityComment[];
}

export interface LoyaltyTier {
  id: string;
  name: string;
  minPoints: number;
  maxPoints: number;
  badgeColor: string;
  description: string;
  perks: string[];
}

export interface LoyaltyRule {
  id: string;
  action: string;
  pointsAwarded: number;
  description: string;
  isEnabled: boolean;
}

export interface LoyaltyTransaction {
  id: string;
  userId: string;
  ruleId?: string;
  actionName: string;
  points: number;
  timestamp: string;
}
