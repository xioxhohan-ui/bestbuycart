import { WishlistItem, WatchlistItem, UserReview, CommunityComment, LoyaltyTier, LoyaltyRule } from '../types/community';
import { UserActivity, UserProfile } from '../types/user';
import { Product } from '../types/product';
import { productService } from './productService';
import {
  SEED_WISHLISTS,
  SEED_WATCHLISTS,
  SEED_REVIEWS,
  SEED_COMMENTS,
  SEED_ACTIVITIES,
  SEED_LOYALTY_TIERS,
  SEED_LOYALTY_RULES
} from '../data/seedCommunity';
import { authService } from './authService';

const WISHLIST_STORAGE_KEY = 'hype_wishlists_v1';
const WATCHLIST_STORAGE_KEY = 'hype_watchlists_v1';
const REVIEWS_STORAGE_KEY = 'hype_reviews_v1';
const COMMENTS_STORAGE_KEY = 'hype_comments_v1';
const ACTIVITIES_STORAGE_KEY = 'hype_activities_v1';
const LOYALTY_RULES_STORAGE_KEY = 'hype_loyalty_rules_v1';

class CommunityService {
  private wishlists: WishlistItem[] = [];
  private watchlists: WatchlistItem[] = [];
  private reviews: UserReview[] = [];
  private comments: CommunityComment[] = [];
  private activities: UserActivity[] = [];
  private loyaltyRules: LoyaltyRule[] = [];

  constructor() {
    this.initData();
  }

  private initData() {
    // 1. Wishlists
    const savedWish = localStorage.getItem(WISHLIST_STORAGE_KEY);
    this.wishlists = savedWish ? JSON.parse(savedWish) : [...SEED_WISHLISTS];

    // 2. Watchlists
    const savedWatch = localStorage.getItem(WATCHLIST_STORAGE_KEY);
    this.watchlists = savedWatch ? JSON.parse(savedWatch) : [...SEED_WATCHLISTS];

    // 3. Reviews
    const savedRev = localStorage.getItem(REVIEWS_STORAGE_KEY);
    this.reviews = savedRev ? JSON.parse(savedRev) : [...SEED_REVIEWS];

    // 4. Comments
    const savedComm = localStorage.getItem(COMMENTS_STORAGE_KEY);
    this.comments = savedComm ? JSON.parse(savedComm) : [...SEED_COMMENTS];

    // 5. Activities
    const savedAct = localStorage.getItem(ACTIVITIES_STORAGE_KEY);
    this.activities = savedAct ? JSON.parse(savedAct) : [...SEED_ACTIVITIES];

    // 6. Loyalty Rules
    const savedRules = localStorage.getItem(LOYALTY_RULES_STORAGE_KEY);
    this.loyaltyRules = savedRules ? JSON.parse(savedRules) : [...SEED_LOYALTY_RULES];
  }

  private saveWishlists() {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(this.wishlists));
  }

  private saveWatchlists() {
    localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(this.watchlists));
  }

  private saveReviews() {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(this.reviews));
  }

  private saveComments() {
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(this.comments));
  }

  private saveActivities() {
    localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(this.activities));
  }

  private saveLoyaltyRules() {
    localStorage.setItem(LOYALTY_RULES_STORAGE_KEY, JSON.stringify(this.loyaltyRules));
  }

  // ==========================================
  // 1. WISHLIST OPERATIONS
  // ==========================================

  public async getUserWishlist(userId: string): Promise<WishlistItem[]> {
    this.initData();
    const userItems = this.wishlists.filter((w) => w.userId === userId);
    const allProducts = await productService.getAllProducts();

    return userItems.map((item) => {
      const prod = allProducts.find((p) => p.id === item.productId);
      return {
        ...item,
        product: prod
      };
    });
  }

  public async addToWishlist(userId: string, product: Product, notes?: string): Promise<WishlistItem> {
    this.initData();
    const existing = this.wishlists.find((w) => w.userId === userId && w.productId === product.id);
    if (existing) return existing;

    const newItem: WishlistItem = {
      id: `wish-${Date.now()}`,
      userId,
      productId: product.id,
      product,
      addedAt: new Date().toISOString(),
      notes,
      priority: 'high'
    };

    this.wishlists.unshift(newItem);
    this.saveWishlists();

    this.logActivity(userId, 'Added to wishlist', product.name, '/product-detail', 'wishlist');
    this.updateUserStats(userId, { wishlistChange: 1 });

    return newItem;
  }

  public async removeFromWishlist(userId: string, productId: string): Promise<void> {
    this.initData();
    this.wishlists = this.wishlists.filter((w) => !(w.userId === userId && w.productId === productId));
    this.saveWishlists();
    this.updateUserStats(userId, { wishlistChange: -1 });
  }

  public async toggleWishlist(userId: string, product: Product, notes?: string): Promise<boolean> {
    const isSaved = await this.isProductInWishlist(userId, product.id);
    if (isSaved) {
      await this.removeFromWishlist(userId, product.id);
      return false;
    } else {
      await this.addToWishlist(userId, product, notes);
      return true;
    }
  }

  public exportWishlist(items: WishlistItem[], format: 'json' | 'csv'): string {
    if (format === 'json') {
      return JSON.stringify(items, null, 2);
    }
    const header = 'Product Name,Brand,Price USD,Worth Score,Rating,Added At\n';
    const rows = items
      .map((i) => `"${i.product?.name || 'Unknown'}","${i.product?.brand || ''}",${i.product?.priceUSD || 0},${i.product?.worthScore || 0},${i.product?.rating || 0},"${i.addedAt}"`)
      .join('\n');
    return header + rows;
  }

  // ==========================================
  // 2. WATCHLIST & PRICE ALERTS
  // ==========================================

  public async getUserWatchlist(userId: string): Promise<WatchlistItem[]> {
    this.initData();
    const userItems = this.watchlists.filter((w) => w.userId === userId);
    const allProducts = await productService.getAllProducts();

    return userItems.map((item) => {
      const prod = allProducts.find((p) => p.id === item.productId);
      const currentPrice = prod ? prod.priceUSD : item.currentPriceUSD;
      const isTriggered = currentPrice <= item.targetPriceUSD;
      return {
        ...item,
        currentPriceUSD: currentPrice,
        alertTriggered: isTriggered,
        product: prod
      };
    });
  }

  public async addToWatchlist(userId: string, product: Product, targetPriceUSD: number): Promise<WatchlistItem> {
    this.initData();
    const existingIndex = this.watchlists.findIndex((w) => w.userId === userId && w.productId === product.id);

    if (existingIndex >= 0) {
      this.watchlists[existingIndex].targetPriceUSD = targetPriceUSD;
      this.watchlists[existingIndex].alertTriggered = product.priceUSD <= targetPriceUSD;
      this.saveWatchlists();
      return this.watchlists[existingIndex];
    }

    const newItem: WatchlistItem = {
      id: `watch-${Date.now()}`,
      userId,
      productId: product.id,
      product,
      initialPriceUSD: product.priceUSD,
      currentPriceUSD: product.priceUSD,
      targetPriceUSD,
      alertTriggered: product.priceUSD <= targetPriceUSD,
      alertEnabled: true,
      createdAt: new Date().toISOString()
    };

    this.watchlists.unshift(newItem);
    this.saveWatchlists();

    this.logActivity(userId, `Created price drop radar target $${targetPriceUSD}`, product.name, '/deals/price-drops', 'alert');
    this.awardPoints(userId, 20, 'Set Up Price Drop Radar');
    this.updateUserStats(userId, { watchlistChange: 1 });

    return newItem;
  }

  public async isProductInWishlist(userId: string, productId: string): Promise<boolean> {
    this.initData();
    return this.wishlists.some((w) => w.userId === userId && w.productId === productId);
  }

  public async removeFromWatchlist(userId: string, productId: string): Promise<void> {
    this.initData();
    this.watchlists = this.watchlists.filter((w) => !(w.userId === userId && w.productId === productId));
    this.saveWatchlists();
    this.updateUserStats(userId, { watchlistChange: -1 });
  }

  public async isProductInWatchlist(userId: string, productId: string): Promise<boolean> {
    this.initData();
    return this.watchlists.some((w) => w.userId === userId && w.productId === productId);
  }

  public async toggleWatchlist(userId: string, product: Product, targetPriceUSD: number): Promise<boolean> {
    const isWatching = await this.isProductInWatchlist(userId, product.id);
    if (isWatching) {
      await this.removeFromWatchlist(userId, product.id);
      return false;
    } else {
      await this.addToWatchlist(userId, product, targetPriceUSD);
      return true;
    }
  }

  // ==========================================
  // 3. REVIEWS & RATINGS OPERATIONS
  // ==========================================

  public async getProductReviews(productId: string): Promise<UserReview[]> {
    this.initData();
    return this.reviews.filter((r) => r.productId === productId && r.status === 'approved');
  }

  public async getAllReviews(): Promise<UserReview[]> {
    this.initData();
    return [...this.reviews];
  }

  public async getUserReviews(userId: string): Promise<UserReview[]> {
    this.initData();
    return this.reviews.filter((r) => r.userId === userId);
  }

  public async submitReview(params: {
    productId: string;
    productName: string;
    productSlug: string;
    productImage?: string;
    userId: string;
    userName: string;
    userAvatar: string;
    userTier?: string;
    rating: number;
    title: string;
    content: string;
    pros: string[];
    cons: string[];
    isVerifiedPurchase: boolean;
  }): Promise<UserReview> {
    this.initData();

    const newReview: UserReview = {
      id: `rev-${Date.now()}`,
      productId: params.productId,
      productName: params.productName,
      productSlug: params.productSlug,
      productImage: params.productImage,
      userId: params.userId,
      userName: params.userName,
      userAvatar: params.userAvatar,
      userTier: params.userTier || 'Enthusiast Reviewer',
      rating: params.rating,
      title: params.title,
      content: params.content,
      pros: params.pros,
      cons: params.cons,
      isVerifiedPurchase: params.isVerifiedPurchase,
      helpfulUpvotes: 0,
      helpfulDownvotes: 0,
      status: 'approved', // Auto-approved for verified members
      createdAt: new Date().toISOString(),
      replies: []
    };

    this.reviews.unshift(newReview);
    this.saveReviews();

    this.logActivity(params.userId, `Published ${params.rating}-star review`, params.productName, '/product-detail', 'review');
    this.awardPoints(params.userId, 50, 'Write a Verified Product Review');
    this.updateUserStats(params.userId, { reviewsChange: 1 });

    return newReview;
  }

  public async voteReviewHelpful(reviewId: string, isHelpful: boolean): Promise<UserReview> {
    this.initData();
    const rev = this.reviews.find((r) => r.id === reviewId);
    if (!rev) throw new Error('Review not found');

    if (isHelpful) {
      rev.helpfulUpvotes += 1;
      this.awardPoints(rev.userId, 10, 'Received a Helpful Review Vote');
      this.updateUserStats(rev.userId, { helpfulVotesChange: 1 });
    } else {
      rev.helpfulDownvotes += 1;
    }

    this.saveReviews();
    return rev;
  }

  public async replyToReview(reviewId: string, user: UserProfile, content: string): Promise<UserReview> {
    this.initData();
    const rev = this.reviews.find((r) => r.id === reviewId);
    if (!rev) throw new Error('Review not found');

    if (!rev.replies) rev.replies = [];
    rev.replies.push({
      id: `reply-${Date.now()}`,
      reviewId,
      userId: user.id,
      userName: user.fullName,
      userAvatar: user.avatarUrl,
      userRole: user.role,
      content,
      createdAt: new Date().toISOString()
    });

    this.saveReviews();
    return rev;
  }

  public async updateReviewStatus(reviewId: string, status: 'approved' | 'pending' | 'reported'): Promise<void> {
    this.initData();
    const rev = this.reviews.find((r) => r.id === reviewId);
    if (rev) {
      rev.status = status;
      this.saveReviews();
    }
  }

  public async deleteReview(reviewId: string): Promise<void> {
    this.initData();
    this.reviews = this.reviews.filter((r) => r.id !== reviewId);
    this.saveReviews();
  }

  // ==========================================
  // 4. COMMENTS OPERATIONS
  // ==========================================

  public async getComments(targetType: 'guide' | 'product', targetId: string): Promise<CommunityComment[]> {
    this.initData();
    return this.comments.filter((c) => c.targetType === targetType && c.targetId === targetId && c.status === 'approved');
  }

  public async getAllComments(): Promise<CommunityComment[]> {
    this.initData();
    return [...this.comments];
  }

  public async addComment(params: {
    targetType: 'guide' | 'product';
    targetId: string;
    targetTitle: string;
    targetUrl: string;
    user: UserProfile;
    content: string;
    parentId?: string;
  }): Promise<CommunityComment> {
    this.initData();

    const newComment: CommunityComment = {
      id: `comm-${Date.now()}`,
      targetType: params.targetType,
      targetId: params.targetId,
      targetTitle: params.targetTitle,
      targetUrl: params.targetUrl,
      userId: params.user.id,
      userName: params.user.fullName,
      userAvatar: params.user.avatarUrl,
      content: params.content,
      status: 'approved',
      createdAt: new Date().toISOString(),
      upvotes: 0,
      parentId: params.parentId
    };

    if (params.parentId) {
      const parent = this.comments.find((c) => c.id === params.parentId);
      if (parent) {
        if (!parent.replies) parent.replies = [];
        parent.replies.push(newComment);
      }
    }

    this.comments.unshift(newComment);
    this.saveComments();

    this.logActivity(params.user.id, 'Joined discussion', params.targetTitle, params.targetUrl, 'comment');
    this.awardPoints(params.user.id, 15, 'Participated in Guide Discussion');
    this.updateUserStats(params.user.id, { commentsChange: 1 });

    return newComment;
  }

  public async upvoteComment(commentId: string): Promise<void> {
    this.initData();
    const comm = this.comments.find((c) => c.id === commentId);
    if (comm) {
      comm.upvotes += 1;
      this.saveComments();
    }
  }

  public async updateCommentStatus(commentId: string, status: 'approved' | 'pending' | 'reported'): Promise<void> {
    this.initData();
    const comm = this.comments.find((c) => c.id === commentId);
    if (comm) {
      comm.status = status;
      this.saveComments();
    }
  }

  public async deleteComment(commentId: string): Promise<void> {
    this.initData();
    this.comments = this.comments.filter((c) => c.id !== commentId);
    this.saveComments();
  }

  // ==========================================
  // 5. LOYALTY & REPUTATION ENGINE
  // ==========================================

  public getLoyaltyTiers(): LoyaltyTier[] {
    return SEED_LOYALTY_TIERS;
  }

  public async getLoyaltyRules(): Promise<LoyaltyRule[]> {
    this.initData();
    return [...this.loyaltyRules];
  }

  public async updateLoyaltyRule(ruleId: string, pointsAwarded: number, isEnabled: boolean): Promise<void> {
    this.initData();
    const rule = this.loyaltyRules.find((r) => r.id === ruleId);
    if (rule) {
      rule.pointsAwarded = pointsAwarded;
      rule.isEnabled = isEnabled;
      this.saveLoyaltyRules();
    }
  }

  public async awardPoints(userId: string, points: number, _actionName: string): Promise<void> {
    const user = await authService.getUserById(userId);
    if (!user) return;

    const newPoints = user.reputationPoints + points;
    const newTier = this.calculateTier(newPoints);

    await authService.updateProfile(userId, {
      reputationPoints: newPoints,
      tierId: newTier.id,
      tierName: newTier.name
    });
  }

  private calculateTier(points: number): LoyaltyTier {
    for (let i = SEED_LOYALTY_TIERS.length - 1; i >= 0; i--) {
      if (points >= SEED_LOYALTY_TIERS[i].minPoints) {
        return SEED_LOYALTY_TIERS[i];
      }
    }
    return SEED_LOYALTY_TIERS[0];
  }

  // ==========================================
  // 6. USER ACTIVITIES & STATS
  // ==========================================

  public async getUserActivities(userId: string): Promise<UserActivity[]> {
    this.initData();
    return this.activities.filter((a) => a.userId === userId);
  }

  public logActivity(userId: string, action: string, targetTitle: string, targetUrl: string, type: UserActivity['type']) {
    const newAct: UserActivity = {
      id: `act-${Date.now()}`,
      userId,
      action,
      targetTitle,
      targetUrl,
      type,
      timestamp: 'Just now'
    };
    this.activities.unshift(newAct);
    if (this.activities.length > 50) this.activities.pop();
    this.saveActivities();
  }

  private async updateUserStats(
    userId: string,
    changes: {
      reviewsChange?: number;
      helpfulVotesChange?: number;
      wishlistChange?: number;
      watchlistChange?: number;
      commentsChange?: number;
    }
  ) {
    const user = await authService.getUserById(userId);
    if (!user) return;

    const stats = { ...user.stats };
    if (changes.reviewsChange) stats.reviewsCount = Math.max(0, stats.reviewsCount + changes.reviewsChange);
    if (changes.helpfulVotesChange) stats.helpfulVotesCount = Math.max(0, stats.helpfulVotesCount + changes.helpfulVotesChange);
    if (changes.wishlistChange) stats.wishlistCount = Math.max(0, stats.wishlistCount + changes.wishlistChange);
    if (changes.watchlistChange) stats.watchlistCount = Math.max(0, stats.watchlistCount + changes.watchlistChange);
    if (changes.commentsChange) stats.commentsCount = Math.max(0, stats.commentsCount + changes.commentsChange);

    await authService.updateProfile(userId, { stats });
  }
}

export const communityService = new CommunityService();
