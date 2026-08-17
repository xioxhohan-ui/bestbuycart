import { NewsPost, NewsCategory, NewsTag, NewsAuthor, NewsComment } from '../types/news';

const STORAGE_KEYS = {
  POSTS: 'hype_news_posts',
  CATEGORIES: 'hype_news_categories',
  TAGS: 'hype_news_tags',
  AUTHORS: 'hype_news_authors',
  COMMENTS: 'hype_news_comments'
};

const SEED_CATEGORIES: NewsCategory[] = [
  { id: 'cat-1', name: 'Product Updates', slug: 'product-updates', description: 'Latest product launches, software releases, and hardware updates.', isActive: true, displayOrder: 1 },
  { id: 'cat-2', name: 'Industry News', slug: 'industry-news', description: 'Global tech trends, consumer market shifts, and ecommerce intelligence.', isActive: true, displayOrder: 2 },
  { id: 'cat-3', name: 'Buying Guides', slug: 'guides', description: 'Expert advice, methodology explainers, and shopping cheat sheets.', isActive: true, displayOrder: 3 },
  { id: 'cat-4', name: 'Platform Announcements', slug: 'announcements', description: 'New features and improvements on Best Buy Cart.', isActive: true, displayOrder: 4 }
];

const SEED_AUTHORS: NewsAuthor[] = [
  {
    id: 'auth-1',
    name: 'Marcus Vance',
    slug: 'marcus-vance',
    bio: 'Senior Technology Analyst specializing in personal electronics and smart home ecosystems.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    email: 'marcus@bestbuycart.com',
    isActive: true
  },
  {
    id: 'auth-2',
    name: 'Elena Rostova',
    slug: 'elena-rostova',
    bio: 'Lead Commerce Editor covering global deals, retailer price intelligence, and market trends.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    email: 'elena@bestbuycart.com',
    isActive: true
  }
];

const SEED_POSTS: NewsPost[] = [
  {
    id: 'post-1',
    title: 'Platform Update: New AI Product Comparison Engine Launches',
    slug: 'platform-update-new-ai-comparison-engine-launches',
    excerpt: "We're excited to announce our new AI-powered comparison tool that analyzes thousands of verified retailer signals to help you pick what's actually worth your money.",
    content: `
      <h2>Next-Generation Product Comparison Engine</h2>
      <p>Today we are rolling out a major update to Best Buy Cart: our custom AI-Powered Side-by-Side Comparison Engine. This tool calculates real-time Worth Scores and Price-to-Feature Ratios across tech, home, and kitchen electronics.</p>
      
      <h3>Key Capabilities</h3>
      <ul>
        <li><strong>Multi-Factor Sentiment Analysis:</strong> Aggregates thousands of verified buyer reviews to filter out sponsored hype.</li>
        <li><strong>Price Drop Velocity Radar:</strong> Tracks historical discounts across Amazon, Best Buy, and Walmart.</li>
        <li><strong>Spec Matrix Normalization:</strong> Automatically maps hardware specifications into a unified comparison grid.</li>
      </ul>

      <h3>How to Get Started</h3>
      <p>Simply navigate to the <strong>Comparisons</strong> tab in the main navigation menu or click "Compare" on any product card on the platform.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    featuredImageAlt: 'AI Product Comparison Engine Interface',
    categoryId: 'cat-4',
    categoryName: 'Platform Announcements',
    authorId: 'auth-1',
    authorName: 'Marcus Vance',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    tags: ['AI', 'Comparison', 'Platform', 'Worth Score'],
    metaTitle: 'New AI Product Comparison Engine Launches | Best Buy Cart',
    metaDescription: 'Discover how the new Best Buy Cart AI comparison tool evaluates tech and home products using real-time market data.',
    focusKeyword: 'AI comparison engine',
    seoScore: 92,
    status: 'published',
    isFeatured: true,
    publishedAt: '2026-12-15T10:00:00Z',
    views: 1420,
    commentsCount: 3,
    createdAt: '2026-12-15T09:30:00Z',
    updatedAt: '2026-12-15T10:00:00Z'
  },
  {
    id: 'post-2',
    title: 'Consumer Tech Trends 2027: What Is Worth Buying Next Year?',
    slug: 'consumer-tech-trends-2027-what-is-worth-buying',
    excerpt: 'An in-depth editorial preview analyzing noise-canceling headphones, smart home robotics, and high-refresh OLED displays.',
    content: `
      <h2>2027 Consumer Hardware Preview</h2>
      <p>As retail sales transition towards integrated AI hardware, consumer expectations have shifted dramatically from raw performance to battery efficiency and real-world durability.</p>

      <h3>1. Active Noise Cancellation & Spatial Audio</h3>
      <p>Headphones with adaptive ANC are seeing a 34% drop in price premiums while increasing battery life past 40 hours continuous playback.</p>

      <h3>2. OLED Display Price Parity</h3>
      <p>Monitor and laptop panels featuring high-refresh OLED technology have reached price parity with traditional IPS panels for the first time.</p>
    `,
    featuredImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    featuredImageAlt: 'Consumer Tech Trends 2027',
    categoryId: 'cat-2',
    categoryName: 'Industry News',
    authorId: 'auth-2',
    authorName: 'Elena Rostova',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    tags: ['Tech Trends', 'Audio', 'OLED', '2027'],
    metaTitle: 'Consumer Tech Trends 2027 Preview | Best Buy Cart',
    metaDescription: 'Read our expert breakdown of upcoming consumer electronics trends and smart buying advice.',
    focusKeyword: 'tech trends 2027',
    seoScore: 88,
    status: 'published',
    isFeatured: false,
    publishedAt: '2026-12-14T14:20:00Z',
    views: 890,
    commentsCount: 1,
    createdAt: '2026-12-14T12:00:00Z',
    updatedAt: '2026-12-14T14:20:00Z'
  }
];

class NewsService {
  private getStorage<T>(key: string, fallback: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  }

  private setStorage<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage quota exceeded:', e);
    }
  }

  // --- POSTS ---
  async getPosts(filter?: { categoryId?: string; tag?: string; status?: string; search?: string }): Promise<NewsPost[]> {
    let posts = this.getStorage<NewsPost[]>(STORAGE_KEYS.POSTS, SEED_POSTS);

    if (filter?.status) {
      posts = posts.filter(p => p.status === filter.status);
    } else {
      posts = posts.filter(p => p.status === 'published');
    }

    if (filter?.categoryId) {
      posts = posts.filter(p => p.categoryId === filter.categoryId);
    }

    if (filter?.tag) {
      const targetTag = filter.tag;
      posts = posts.filter(p => p.tags?.includes(targetTag));
    }

    if (filter?.search) {
      const q = filter.search.toLowerCase();
      posts = posts.filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));
    }

    return posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  async getFeaturedPost(): Promise<NewsPost | undefined> {
    const posts = await this.getPosts({ status: 'published' });
    return posts.find(p => p.isFeatured) || posts[0];
  }

  async getPostBySlug(slug: string): Promise<NewsPost | undefined> {
    const posts = this.getStorage<NewsPost[]>(STORAGE_KEYS.POSTS, SEED_POSTS);
    return posts.find(p => p.slug === slug);
  }

  async savePost(post: Partial<NewsPost> & { title: string }): Promise<NewsPost> {
    const posts = this.getStorage<NewsPost[]>(STORAGE_KEYS.POSTS, SEED_POSTS);
    const existingIndex = posts.findIndex(p => p.id === post.id);

    let saved: NewsPost;
    if (existingIndex >= 0) {
      saved = { ...posts[existingIndex], ...post, updatedAt: new Date().toISOString() } as NewsPost;
      posts[existingIndex] = saved;
    } else {
      const newId = post.id || 'news-' + Date.now();
      const slug = post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      saved = {
        id: newId,
        title: post.title,
        slug,
        content: post.content || '',
        excerpt: post.excerpt || '',
        featuredImage: post.featuredImage || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
        featuredImageAlt: post.featuredImageAlt || post.title,
        categoryId: post.categoryId || 'cat-1',
        categoryName: post.categoryName || 'Product Updates',
        authorId: post.authorId || 'auth-1',
        authorName: post.authorName || 'Marcus Vance',
        authorAvatar: post.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        tags: post.tags || ['Update'],
        metaTitle: post.metaTitle || post.title + ' | Best Buy Cart',
        metaDescription: post.metaDescription || post.excerpt,
        focusKeyword: post.focusKeyword || '',
        seoScore: post.seoScore || 85,
        status: post.status || 'published',
        isFeatured: post.isFeatured || false,
        publishedAt: post.publishedAt || new Date().toISOString(),
        views: post.views || 0,
        commentsCount: post.commentsCount || 0,
        createdAt: post.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      posts.unshift(saved);
    }

    this.setStorage(STORAGE_KEYS.POSTS, posts);
    return saved;
  }

  async deletePost(id: string): Promise<boolean> {
    const posts = this.getStorage<NewsPost[]>(STORAGE_KEYS.POSTS, SEED_POSTS);
    const filtered = posts.filter(p => p.id !== id);
    this.setStorage(STORAGE_KEYS.POSTS, filtered);
    return true;
  }

  // --- CATEGORIES ---
  async getCategories(): Promise<NewsCategory[]> {
    return this.getStorage<NewsCategory[]>(STORAGE_KEYS.CATEGORIES, SEED_CATEGORIES);
  }

  async saveCategory(category: Partial<NewsCategory> & { name: string; slug: string }): Promise<NewsCategory> {
    const cats = await this.getCategories();
    const existingIndex = cats.findIndex(c => c.slug === category.slug);
    let saved: NewsCategory;
    if (existingIndex >= 0) {
      saved = { ...cats[existingIndex], ...category } as NewsCategory;
      cats[existingIndex] = saved;
    } else {
      saved = {
        id: category.id || 'cat-' + Date.now(),
        name: category.name,
        slug: category.slug,
        description: category.description || '',
        isActive: category.isActive ?? true,
        displayOrder: category.displayOrder || cats.length + 1
      };
      cats.push(saved);
    }
    this.setStorage(STORAGE_KEYS.CATEGORIES, cats);
    return saved;
  }

  // --- AUTHORS ---
  async getAuthors(): Promise<NewsAuthor[]> {
    return this.getStorage<NewsAuthor[]>(STORAGE_KEYS.AUTHORS, SEED_AUTHORS);
  }

  // --- COMMENTS ---
  async getCommentsByPostId(postId: string): Promise<NewsComment[]> {
    const comments = this.getStorage<NewsComment[]>(STORAGE_KEYS.COMMENTS, [
      {
        id: 'comm-1',
        postId: 'post-1',
        authorName: 'Sarah Jenkins',
        content: 'This AI comparison engine is super helpful! Saved me $120 on headphones yesterday.',
        status: 'approved',
        likes: 12,
        createdAt: '2026-12-15T11:30:00Z'
      }
    ]);
    return comments.filter(c => c.postId === postId && c.status === 'approved');
  }

  async addComment(postId: string, authorName: string, content: string): Promise<NewsComment> {
    const comments = this.getStorage<NewsComment[]>(STORAGE_KEYS.COMMENTS, []);
    const newComment: NewsComment = {
      id: 'comm-' + Date.now(),
      postId,
      authorName,
      content,
      status: 'approved',
      likes: 0,
      createdAt: new Date().toISOString()
    };
    comments.push(newComment);
    this.setStorage(STORAGE_KEYS.COMMENTS, comments);

    // Update post comments count
    const posts = this.getStorage<NewsPost[]>(STORAGE_KEYS.POSTS, SEED_POSTS);
    const post = posts.find(p => p.id === postId);
    if (post) {
      post.commentsCount = (post.commentsCount || 0) + 1;
      this.setStorage(STORAGE_KEYS.POSTS, posts);
    }

    return newComment;
  }
}

export const newsService = new NewsService();
