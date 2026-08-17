import { SEED_PRODUCTS } from '../data/seedProducts';
import { SEED_CATEGORIES } from '../data/seedCategories';
import { SearchResults } from '../types/search';
import { parseSearchIntent } from '../utils/intentParser';

class SearchService {
  async search(query: string): Promise<SearchResults> {
    const trimmed = query.trim();
    if (!trimmed) {
      return {
        query: '',
        products: [],
        categories: [],
        totalMatches: 0
      };
    }

    const intent = parseSearchIntent(trimmed);
    const normalized = trimmed.toLowerCase();

    // Match categories
    const matchingCategories = SEED_CATEGORIES.filter(c =>
      c.name.toLowerCase().includes(normalized) ||
      c.description.toLowerCase().includes(normalized) ||
      (intent.category && c.slug === intent.category)
    );

    // Match products
    const matchingProducts = SEED_PRODUCTS.filter(p => {
      // Keyword match
      const textMatch =
        p.name.toLowerCase().includes(normalized) ||
        p.brand.toLowerCase().includes(normalized) ||
        p.summary.toLowerCase().includes(normalized) ||
        p.verdict.toLowerCase().includes(normalized) ||
        p.category.toLowerCase().includes(normalized);

      // Budget filter if specified
      const budgetMatch = intent.maxBudget ? p.priceUSD <= intent.maxBudget : true;

      // Category intent filter
      const categoryIntentMatch = intent.category ? p.category === intent.category : true;

      return (textMatch || categoryIntentMatch) && budgetMatch;
    });

    return {
      query: trimmed,
      parsedIntent: intent,
      products: matchingProducts,
      categories: matchingCategories,
      totalMatches: matchingProducts.length + matchingCategories.length
    };
  }

  async getSuggestions(query: string): Promise<string[]> {
    if (!query.trim()) {
      return [
        'best noise canceling headphones under $200',
        'espresso machine with automatic milk frother',
        'ultralight laptop for travel and work',
        'smart ring for sleep tracking',
        'gifts under $50 for tech enthusiasts'
      ];
    }

    const q = query.toLowerCase();
    const suggestions: string[] = [];

    SEED_PRODUCTS.forEach(p => {
      if (p.name.toLowerCase().includes(q) && !suggestions.includes(p.name)) {
        suggestions.push(p.name);
      }
      if (p.brand.toLowerCase().includes(q) && !suggestions.includes(`Best of ${p.brand}`)) {
        suggestions.push(`Best of ${p.brand}`);
      }
    });

    return suggestions.slice(0, 5);
  }
}

export const searchService = new SearchService();
