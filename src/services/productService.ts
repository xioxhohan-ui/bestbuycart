import { SEED_PRODUCTS } from '../data/seedProducts';
import { Product } from '../types/product';

class ProductService {
  private products: Product[] = SEED_PRODUCTS;

  async getAllProducts(): Promise<Product[]> {
    return [...this.products];
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return this.products.find(p => p.slug === slug);
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.find(p => p.id === id);
  }

  async getTrendingProducts(): Promise<Product[]> {
    return this.products.filter(p => p.isTrending);
  }

  async getRisingProducts(): Promise<Product[]> {
    return this.products.filter(p => p.isRising);
  }

  async getHiddenGems(): Promise<Product[]> {
    return this.products.filter(p => p.isHiddenGem);
  }

  async getOverhypedProducts(): Promise<Product[]> {
    return this.products.filter(p => p.isOverhyped);
  }

  async getDeals(): Promise<Product[]> {
    return this.products.filter(p => p.isPriceDrop || (p.dealPercentage && p.dealPercentage > 0));
  }

  async getProductsByCategory(categorySlug: string): Promise<Product[]> {
    return this.products.filter(p => p.category === categorySlug);
  }

  async getRelatedAlternatives(product: Product): Promise<Product[]> {
    return this.products
      .filter(p => p.id !== product.id && p.category === product.category)
      .slice(0, 3);
  }
}

export const productService = new ProductService();
