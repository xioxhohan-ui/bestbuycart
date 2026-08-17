import { Product } from './product';

export interface FinderAnswers {
  category: string;
  budgetCeiling: number;
  priorities: ('price' | 'quality' | 'performance' | 'design' | 'durability')[];
}

export interface FinderMatchResult {
  bestMatch: Product;
  bestValue: Product;
  premiumChoice: Product;
  matchScore: number;
}

export interface DualScoreFactor {
  label: string;
  value: string;
  type: 'search' | 'social' | 'reviews' | 'value';
}
