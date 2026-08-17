import { ProductComparison, BrandComparison } from '../types/comparison';
import { Product } from '../types/product';
import { SEED_COMPARISONS, SEED_BRAND_COMPARISONS } from '../data/seedComparisons';
import { supabaseService } from './supabaseService';

const STORAGE_KEY_COMPARISONS = 'bestbuycart_db_comparisons';

class ComparisonService {
  async getComparisons(): Promise<ProductComparison[]> {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_COMPARISONS);
      return stored ? JSON.parse(stored) : SEED_COMPARISONS;
    } catch {
      return SEED_COMPARISONS;
    }
  }

  async getComparisonBySlug(slug: string): Promise<ProductComparison | undefined> {
    const list = await this.getComparisons();
    return list.find(c => c.slug === slug || c.id === slug);
  }

  async getBrandComparisons(): Promise<BrandComparison[]> {
    return SEED_BRAND_COMPARISONS;
  }

  async getBrandComparisonBySlug(slug: string): Promise<BrandComparison | undefined> {
    return SEED_BRAND_COMPARISONS.find(b => b.slug === slug || b.id === slug);
  }

  async getAlternativesForProduct(productId: string): Promise<{
    targetProduct: Product | undefined;
    bestAlternative?: Product;
    cheaperAlternative?: Product;
    higherPerformance?: Product;
  }> {
    const all = await supabaseService.getProducts();
    const target = all.find(p => p.id === productId || p.slug === productId);
    if (!target) {
      return { targetProduct: all[0], bestAlternative: all[1], cheaperAlternative: all[2], higherPerformance: all[3] };
    }

    const sameCategory = all.filter(p => p.category === target.category && p.id !== target.id);
    const bestAlternative = sameCategory.sort((a, b) => b.worthScore - a.worthScore)[0] || all.find(p => p.id !== target.id);
    const cheaperAlternative = sameCategory.filter(p => p.priceUSD < target.priceUSD).sort((a, b) => b.worthScore - a.worthScore)[0] ||
                               all.find(p => p.priceUSD < target.priceUSD && p.id !== target.id);
    const higherPerformance = sameCategory.filter(p => p.priceUSD >= target.priceUSD).sort((a, b) => b.rating - a.rating)[0] ||
                              all.find(p => p.rating > target.rating && p.id !== target.id);

    return {
      targetProduct: target,
      bestAlternative,
      cheaperAlternative,
      higherPerformance
    };
  }

  async saveComparison(comparison: Partial<ProductComparison> & { title: string }): Promise<ProductComparison> {
    const list = await this.getComparisons();
    const idx = list.findIndex(c => c.id === comparison.id);
    let saved: ProductComparison;

    if (idx >= 0) {
      saved = { ...list[idx], ...comparison, updatedAt: new Date().toISOString() } as ProductComparison;
      list[idx] = saved;
      supabaseService.logActivity('Updated comparison: ' + saved.title, 'settings');
    } else {
      const newId = comparison.id || 'comp-' + Date.now();
      const slug = comparison.slug || comparison.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      saved = {
        id: newId,
        slug,
        title: comparison.title,
        type: comparison.type || 'pvp',
        productAId: comparison.productAId || 'prod-1',
        productBId: comparison.productBId || 'prod-tech-bose-ultra',
        category: comparison.category || 'tech',
        views: 120,
        winnerId: comparison.winnerId || comparison.productAId || 'prod-1',
        verdictText: comparison.verdictText || 'Superior balance of performance, battery endurance, and value.',
        whyWinner: comparison.whyWinner || 'Higher verified worth score and better price point.',
        whenToChooseB: comparison.whenToChooseB || 'Choose Product B if you prefer specialized hardware features.',
        scorecards: comparison.scorecards || [
          { name: 'Build Quality', weight: 40, scoreA: 9.2, scoreB: 8.8, winner: 'A' },
          { name: 'Value for Money', weight: 30, scoreA: 9.5, scoreB: 8.2, winner: 'A' },
          { name: 'Battery Endurance', weight: 30, scoreA: 9.4, scoreB: 8.0, winner: 'A' }
        ],
        seo: comparison.seo || {
          metaTitle: `${comparison.title} — Head-to-Head Comparison (2026)`,
          metaDescription: `Compare ${comparison.title} side-by-side with verified worth scores, specs, and battery ratings.`,
          focusKeyword: comparison.title.toLowerCase(),
          slug,
          seoScore: 92,
          keywordDensity: 2.2,
          readabilityScore: 88,
          indexable: true,
          inSitemap: true
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      list.unshift(saved);
      supabaseService.logActivity('Created new comparison: ' + saved.title, 'settings');
    }

    localStorage.setItem(STORAGE_KEY_COMPARISONS, JSON.stringify(list));
    return saved;
  }

  async deleteComparison(id: string): Promise<boolean> {
    const list = await this.getComparisons();
    const updated = list.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEY_COMPARISONS, JSON.stringify(updated));
    supabaseService.logActivity('Deleted comparison ID: ' + id, 'settings');
    return true;
  }
}

export const comparisonService = new ComparisonService();
