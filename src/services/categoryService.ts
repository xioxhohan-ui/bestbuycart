import { SEED_CATEGORIES } from '../data/seedCategories';
import { SEED_PRODUCTS } from '../data/seedProducts';
import { Category, Subcategory } from '../types/category';
import { Product } from '../types/product';

class CategoryService {
  private categories: Category[] = SEED_CATEGORIES;

  async getCategories(): Promise<Category[]> {
    return [...this.categories];
  }

  async getTrendingCategories(): Promise<Category[]> {
    return this.categories.filter(c => c.isTrendingCat);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return this.categories.find(c => c.slug === slug);
  }

  async getSubcategory(categorySlug: string, subcategorySlug: string): Promise<Subcategory | undefined> {
    const cat = await this.getCategoryBySlug(categorySlug);
    if (!cat) return undefined;
    return cat.subcategories.find(s => s.slug === subcategorySlug);
  }

  async getEditorPicksForCategory(categorySlug: string): Promise<{
    bestOverall?: Product;
    bestBudget?: Product;
    hiddenGem?: Product;
    overhyped?: Product;
  }> {
    const cat = await this.getCategoryBySlug(categorySlug);
    if (!cat || !cat.editorPicks) {
      // Fallback
      const categoryProducts = SEED_PRODUCTS.filter(p => p.category === categorySlug);
      return {
        bestOverall: categoryProducts[0],
        bestBudget: categoryProducts.find(p => p.priceUSD < 100) || categoryProducts[0],
        hiddenGem: categoryProducts.find(p => p.isHiddenGem),
        overhyped: categoryProducts.find(p => p.isOverhyped)
      };
    }

    const { bestOverallId, bestBudgetId, hiddenGemId, overhypedId } = cat.editorPicks;
    return {
      bestOverall: SEED_PRODUCTS.find(p => p.id === bestOverallId),
      bestBudget: SEED_PRODUCTS.find(p => p.id === bestBudgetId),
      hiddenGem: SEED_PRODUCTS.find(p => p.id === hiddenGemId),
      overhyped: SEED_PRODUCTS.find(p => p.id === overhypedId)
    };
  }

  async getUnderXProducts(categorySlug: string, maxPriceUSD: number): Promise<Product[]> {
    return SEED_PRODUCTS.filter(
      p => p.category === categorySlug && p.priceUSD <= maxPriceUSD
    );
  }
}

export const categoryService = new CategoryService();
