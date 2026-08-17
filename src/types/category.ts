export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  productCount: number;
  heroHeadline?: string;
  heroSubtitle?: string;
  topPickId?: string;
  budgetPickId?: string;
  premiumPickId?: string;
}

export interface CategoryEditorPicks {
  bestOverallId: string;
  bestBudgetId: string;
  hiddenGemId: string;
  overhypedId: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  emoji: string;
  description: string;
  subcategories: Subcategory[];
  featuredProductCount: number;
  trendingCount: number;
  weeklyGrowth?: number; // e.g. 34 for ↑ 34% this wk
  isTrendingCat?: boolean;
  stage?: 'core' | 'new' | 'expanded'; // Launch core, month 3-4 new (🎉), month 5-6 expanded
  trendInsight?: string;
  editorPicks?: CategoryEditorPicks;
}
