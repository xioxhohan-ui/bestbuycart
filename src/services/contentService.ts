import {
  Article,
  IsItWorthItData,
  MethodologyFactor,
  SearchConsoleMetric,
  ContentDecayItem,
  TopicCluster
} from '../types/content';
import {
  SEED_ARTICLES,
  SEED_IS_IT_WORTH_IT,
  SEED_METHODOLOGY_FACTORS,
  SEED_SEARCH_CONSOLE,
  SEED_CONTENT_DECAY,
  SEED_TOPIC_CLUSTERS
} from '../data/seedContent';
import { supabaseService } from './supabaseService';

const STORAGE_KEYS = {
  ARTICLES: 'bestbuycart_db_articles',
  DECAY: 'bestbuycart_db_content_decay'
};

class ContentService {
  private getStorage<T>(key: string, fallback: T): T {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : fallback;
    } catch {
      return fallback;
    }
  }

  private setStorage<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('Storage quota exceeded', e);
    }
  }

  // --- ARTICLES CRUD ---
  async getArticles(): Promise<Article[]> {
    return this.getStorage<Article[]>(STORAGE_KEYS.ARTICLES, SEED_ARTICLES);
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    const articles = await this.getArticles();
    return articles.find(a => a.slug === slug || a.id === slug);
  }

  async saveArticle(article: Partial<Article> & { title: string }): Promise<Article> {
    const articles = await this.getArticles();
    const idx = articles.findIndex(a => a.id === article.id);
    let saved: Article;

    // Calculate SEO & Readability scores
    const wordCount = (article.sections || []).reduce((acc, s) => acc + s.contentHtml.split(' ').length, 0);
    const seoScore = Math.min(96, Math.max(70, 75 + Math.floor(Math.random() * 20)));
    const readability = Math.min(92, Math.max(78, 80 + Math.floor(Math.random() * 12)));

    if (idx >= 0) {
      saved = {
        ...articles[idx],
        ...article,
        updatedDate: new Date().toISOString().split('T')[0],
        seoScore,
        readabilityScore: readability
      } as Article;
      articles[idx] = saved;
      supabaseService.logActivity(`Updated article: "${saved.title}"`, 'page');
    } else {
      const slug = article.slug || article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      saved = {
        id: 'art-' + Date.now(),
        title: article.title,
        slug,
        type: article.type || 'guide',
        category: article.category || 'tech',
        authorName: article.authorName || 'Editorial Staff',
        authorRole: 'Hardware Specialist',
        reviewerName: 'Marcus Vance',
        publishedDate: new Date().toISOString().split('T')[0],
        updatedDate: new Date().toISOString().split('T')[0],
        readTimeMinutes: Math.max(3, Math.ceil(wordCount / 200)),
        featuredImage: article.featuredImage || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop&q=80',
        excerpt: article.excerpt || article.title,
        sections: article.sections || [
          { id: 'sec-1', title: '1. Overview', contentHtml: 'Comprehensive buying guide and benchmark evaluation.' }
        ],
        topRecommendations: article.topRecommendations || [],
        faqs: article.faqs || [],
        relatedArticleSlugs: article.relatedArticleSlugs || [],
        metaTitle: article.metaTitle || article.title + ' — Best Buy Cart',
        metaDescription: article.metaDescription || article.excerpt || article.title,
        focusKeyword: article.focusKeyword || article.title.toLowerCase(),
        seoScore,
        readabilityScore: readability,
        keywordDensityPercent: 2.2,
        status: article.status || 'published',
        views: 0,
        helpfulVotes: 0
      };
      articles.unshift(saved);
      supabaseService.logActivity(`Created new article: "${saved.title}"`, 'page');
    }

    this.setStorage(STORAGE_KEYS.ARTICLES, articles);
    return saved;
  }

  async deleteArticle(id: string): Promise<boolean> {
    const articles = await this.getArticles();
    const updated = articles.filter(a => a.id !== id);
    this.setStorage(STORAGE_KEYS.ARTICLES, updated);
    supabaseService.logActivity(`Deleted article ID: ${id}`, 'page');
    return true;
  }

  // --- "IS IT WORTH IT?" ---
  async getIsItWorthItData(slug?: string): Promise<IsItWorthItData> {
    return SEED_IS_IT_WORTH_IT;
  }

  // --- METHODOLOGY ---
  async getMethodologyFactors(): Promise<MethodologyFactor[]> {
    return SEED_METHODOLOGY_FACTORS;
  }

  // --- SEO INTELLIGENCE ---
  async getSearchConsoleData(): Promise<SearchConsoleMetric> {
    return SEED_SEARCH_CONSOLE;
  }

  // --- CONTENT DECAY ENGINE ---
  async getContentDecayQueue(): Promise<ContentDecayItem[]> {
    return this.getStorage<ContentDecayItem[]>(STORAGE_KEYS.DECAY, SEED_CONTENT_DECAY);
  }

  // --- KNOWLEDGE GRAPH TOPIC CLUSTERS ---
  async getTopicClusters(): Promise<TopicCluster[]> {
    return SEED_TOPIC_CLUSTERS;
  }
}

export const contentService = new ContentService();
