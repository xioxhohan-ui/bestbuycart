export interface NewsCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  displayOrder: number;
}

export interface NewsTag {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
}

export interface NewsAuthor {
  id: string;
  name: string;
  slug: string;
  bio?: string;
  avatar?: string;
  email?: string;
  website?: string;
  socialLinks?: Record<string, string>;
  isActive: boolean;
}

export interface NewsComment {
  id: string;
  postId: string;
  userId?: string;
  authorName: string;
  parentId?: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  likes: number;
  createdAt: string;
}

export interface NewsPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  featuredImageAlt?: string;
  categoryId?: string;
  categoryName?: string;
  authorId?: string;
  authorName?: string;
  authorAvatar?: string;
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  seoScore?: number;
  noindex?: boolean;
  nofollow?: boolean;
  status: 'draft' | 'published' | 'scheduled';
  isFeatured: boolean;
  publishedAt: string;
  scheduledAt?: string;
  views: number;
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
}
