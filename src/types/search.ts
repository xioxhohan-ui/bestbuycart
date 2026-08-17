import { Product } from './product';
import { Category } from './category';

export interface ParsedSearchIntent {
  rawQuery: string;
  category?: string;
  maxBudget?: number;
  recipient?: string;
  intent?: 'best' | 'trending' | 'cheap' | 'gift' | 'compare' | 'general';
}

export interface SearchResults {
  query: string;
  parsedIntent?: ParsedSearchIntent;
  products: Product[];
  categories: Category[];
  totalMatches: number;
}
