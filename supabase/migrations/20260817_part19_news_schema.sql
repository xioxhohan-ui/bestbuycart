-- ============================================
-- PART 19: NEWS & UPDATES ENGINE SCHEMA
-- ============================================

-- News Categories Table
CREATE TABLE IF NOT EXISTS public.news_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- News Tags Table
CREATE TABLE IF NOT EXISTS public.news_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- News Authors Table
CREATE TABLE IF NOT EXISTS public.news_authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  bio TEXT,
  avatar TEXT,
  email TEXT,
  website TEXT,
  social_links JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- News Posts Table
CREATE TABLE IF NOT EXISTS public.news_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  featured_image TEXT,
  featured_image_alt TEXT,
  
  category_id UUID REFERENCES public.news_categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES public.news_authors(id) ON DELETE SET NULL,
  tags TEXT[],
  
  meta_title TEXT,
  meta_description TEXT,
  focus_keyword TEXT,
  seo_score INTEGER DEFAULT 0,
  noindex BOOLEAN DEFAULT false,
  nofollow BOOLEAN DEFAULT false,
  
  status TEXT DEFAULT 'draft',
  is_featured BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  scheduled_at TIMESTAMPTZ,
  
  views INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- News Comments Table
CREATE TABLE IF NOT EXISTS public.news_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES public.news_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  author_name TEXT,
  parent_id UUID REFERENCES public.news_comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'approved',
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_news_posts_category ON public.news_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_news_posts_author ON public.news_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_news_posts_slug ON public.news_posts(slug);
CREATE INDEX IF NOT EXISTS idx_news_posts_status ON public.news_posts(status);
CREATE INDEX IF NOT EXISTS idx_news_posts_published ON public.news_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_news_posts_featured ON public.news_posts(is_featured);
CREATE INDEX IF NOT EXISTS idx_news_comments_post ON public.news_comments(post_id);

-- Row Level Security (RLS)
ALTER TABLE public.news_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_comments ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Public read news_categories" ON public.news_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public read news_tags" ON public.news_tags FOR SELECT USING (is_active = true);
CREATE POLICY "Public read news_authors" ON public.news_authors FOR SELECT USING (is_active = true);
CREATE POLICY "Public read news_posts" ON public.news_posts FOR SELECT USING (status = 'published' AND deleted_at IS NULL);
CREATE POLICY "Public read news_comments" ON public.news_comments FOR SELECT USING (status = 'approved');

-- Admin Full Access Policies
CREATE POLICY "Admin full news_categories" ON public.news_categories FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full news_tags" ON public.news_tags FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full news_authors" ON public.news_authors FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full news_posts" ON public.news_posts FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full news_comments" ON public.news_comments FOR ALL USING (public.is_admin());
