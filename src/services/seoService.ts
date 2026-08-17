import { ComparisonSEO, BacklinkItem, InternalLinkSuggestion, ProductComparison } from '../types/comparison';
import { SEED_BACKLINKS } from '../data/seedComparisons';
import { supabaseService } from './supabaseService';

export interface SEOAuditResult {
  score: number; // 0-100
  titleScore: number;
  descriptionScore: number;
  keywordScore: number;
  density: number;
  readability: number;
  issues: string[];
  suggestions: string[];
}

const STORAGE_KEY_BACKLINKS = 'bestbuycart_db_backlinks';

class SEOService {
  // --- SEO AUDIT ALGORITHM ---
  calculateSEOScore(
    title: string,
    description: string,
    focusKeyword: string,
    content: string = ''
  ): SEOAuditResult {
    let score = 100;
    const issues: string[] = [];
    const suggestions: string[] = [];

    const kw = focusKeyword.trim().toLowerCase();

    // 1. Title Audit
    let titleScore = 100;
    if (!title || title.length < 30) {
      titleScore -= 40;
      issues.push('Title is too short (< 30 characters). Optimal length: 50-60 characters.');
    } else if (title.length > 65) {
      titleScore -= 20;
      issues.push('Title is too long (> 65 characters) and may be truncated by search engines.');
    }
    if (kw && !title.toLowerCase().includes(kw)) {
      titleScore -= 30;
      issues.push(`Focus keyword "${focusKeyword}" is missing from Title.`);
    }

    // 2. Description Audit
    let descriptionScore = 100;
    if (!description || description.length < 70) {
      descriptionScore -= 40;
      issues.push('Meta Description is too short (< 70 characters). Optimal length: 120-160 characters.');
    } else if (description.length > 165) {
      descriptionScore -= 20;
      issues.push('Meta Description is too long (> 165 characters).');
    }
    if (kw && !description.toLowerCase().includes(kw)) {
      descriptionScore -= 30;
      issues.push(`Focus keyword "${focusKeyword}" is missing from Meta Description.`);
    }

    // 3. Keyword Density & Readability
    let keywordScore = 100;
    const wordCount = content.split(/\s+/).filter(Boolean).length || 100;
    const kwOccurrences = kw ? (content.toLowerCase().match(new RegExp(kw, 'g')) || []).length : 2;
    const density = Math.min(5.0, Number(((kwOccurrences / wordCount) * 100).toFixed(1))) || 2.4;

    if (density < 1.0) {
      keywordScore -= 20;
      suggestions.push('Keyword density is below 1.0%. Consider mentioning your focus keyword more naturally.');
    } else if (density > 3.5) {
      keywordScore -= 25;
      issues.push('Keyword density exceeds 3.5% (potential over-optimization/stuffing risk).');
    }

    const readability = Math.min(100, Math.max(65, Math.round(92 - (description.length / 20))));

    // Composite Score
    score = Math.round((titleScore * 0.4) + (descriptionScore * 0.4) + (keywordScore * 0.2));
    score = Math.max(10, Math.min(100, score));

    return {
      score,
      titleScore,
      descriptionScore,
      keywordScore,
      density,
      readability,
      issues,
      suggestions
    };
  }

  // --- JSON-LD SCHEMA GENERATOR ---
  generateComparisonSchema(comparison: ProductComparison, url: string): string {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'ComparisonPage',
      'name': comparison.title,
      'description': comparison.seo.metaDescription,
      'url': url,
      'mainEntity': [
        {
          '@type': 'Product',
          'name': comparison.title.split(' vs ')[0] || 'Product A'
        },
        {
          '@type': 'Product',
          'name': comparison.title.split(' vs ')[1] || 'Product B'
        }
      ],
      'review': {
        '@type': 'Review',
        'reviewRating': {
          '@type': 'Rating',
          'ratingValue': '4.8',
          'bestRating': '5'
        },
        'author': {
          '@type': 'Organization',
          'name': 'Best Buy Cart Editorial Lab'
        },
        'reviewBody': comparison.verdictText
      }
    };
    return JSON.stringify(schema, null, 2);
  }

  // --- BACKLINK MANAGEMENT CRUD ---
  async getBacklinks(): Promise<BacklinkItem[]> {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_BACKLINKS);
      return stored ? JSON.parse(stored) : SEED_BACKLINKS;
    } catch {
      return SEED_BACKLINKS;
    }
  }

  async saveBacklink(backlink: Partial<BacklinkItem> & { sourceUrl: string; targetUrl: string }): Promise<BacklinkItem> {
    const list = await this.getBacklinks();
    const idx = list.findIndex(b => b.id === backlink.id);
    let saved: BacklinkItem;
    if (idx >= 0) {
      saved = { ...list[idx], ...backlink, lastChecked: new Date().toISOString().split('T')[0] };
      list[idx] = saved;
      supabaseService.logActivity('Updated backlink: ' + saved.sourceUrl, 'settings');
    } else {
      saved = {
        id: 'bl-' + Date.now(),
        sourceUrl: backlink.sourceUrl,
        targetUrl: backlink.targetUrl,
        anchorText: backlink.anchorText || 'Product review',
        domainAuthority: Number(backlink.domainAuthority) || 50,
        status: backlink.status || 'active',
        discoveredDate: new Date().toISOString().split('T')[0],
        lastChecked: new Date().toISOString().split('T')[0]
      };
      list.unshift(saved);
      supabaseService.logActivity('Added new backlink: ' + saved.sourceUrl, 'settings');
    }
    localStorage.setItem(STORAGE_KEY_BACKLINKS, JSON.stringify(list));
    return saved;
  }

  async deleteBacklink(id: string): Promise<boolean> {
    const list = await this.getBacklinks();
    const updated = list.filter(b => b.id !== id);
    localStorage.setItem(STORAGE_KEY_BACKLINKS, JSON.stringify(updated));
    supabaseService.logActivity('Deleted backlink ID: ' + id, 'settings');
    return true;
  }

  // --- INTERNAL LINKING AUTOMATION ---
  async getInternalLinkSuggestions(): Promise<InternalLinkSuggestion[]> {
    return [
      {
        id: 'il-1',
        sourcePageTitle: 'Tech & Electronics Hub',
        sourceUrl: '/categories/tech',
        targetUrl: '/compare/sony-wh-1000xm5-vs-bose-qc-ultra',
        suggestedAnchor: 'Sony WH-1000XM5 vs Bose QC Ultra comparison',
        relevanceScore: 98,
        status: 'applied'
      },
      {
        id: 'il-2',
        sourcePageTitle: 'Best Headphones Under $100',
        sourceUrl: '/categories/tech/under-100',
        targetUrl: '/compare/earfun-air-pro-4-vs-anker-life-q30',
        suggestedAnchor: 'EarFun Air Pro 4 vs Anker Q30',
        relevanceScore: 94,
        status: 'pending'
      },
      {
        id: 'il-3',
        sourcePageTitle: 'Overhyped Watch',
        sourceUrl: '/discover/overhyped',
        targetUrl: '/compare',
        suggestedAnchor: 'head-to-head lab comparisons',
        relevanceScore: 89,
        status: 'applied'
      }
    ];
  }
}

export const seoService = new SEOService();
