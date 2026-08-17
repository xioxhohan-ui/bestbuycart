import { Product } from '../types/product';
import { Category } from '../types/category';
import { LayoutSection, SitePage, SiteSettings, AdminActivityLog } from '../types/admin';
import { SEED_PRODUCTS } from '../data/seedProducts';
import { SEED_CATEGORIES } from '../data/seedCategories';

const STORAGE_KEYS = {
  PRODUCTS: 'bestbuycart_db_products',
  CATEGORIES: 'bestbuycart_db_categories',
  LAYOUT: 'bestbuycart_db_layout',
  PAGES: 'bestbuycart_db_pages',
  SETTINGS: 'bestbuycart_db_settings',
  LOGS: 'bestbuycart_db_logs'
};

const DEFAULT_LAYOUT_SECTIONS: LayoutSection[] = [
  { id: 'sec-1', name: 'Hero Spotlight & Search', sectionKey: 'hero', displayType: 'spotlight', itemCount: 1, sourceType: 'auto', status: 'active', displayOrder: 1 },
  { id: 'sec-2', name: 'Trending Right Now', sectionKey: 'trending', displayType: 'grid', itemCount: 8, sourceType: 'auto', status: 'active', displayOrder: 2 },
  { id: 'sec-3', name: 'Rising Fast (Velocity)', sectionKey: 'rising', displayType: 'grid', itemCount: 4, sourceType: 'auto', status: 'active', displayOrder: 3 },
  { id: 'sec-4', name: 'Hidden Gems Discovery', sectionKey: 'hidden_gems', displayType: 'spotlight', itemCount: 1, sourceType: 'manual', status: 'active', displayOrder: 4 },
  { id: 'sec-5', name: 'Overhyped Watch', sectionKey: 'overhyped', displayType: 'split', itemCount: 2, sourceType: 'manual', status: 'active', displayOrder: 5 },
  { id: 'sec-6', name: 'Popular Comparisons', sectionKey: 'compare', displayType: 'split', itemCount: 2, sourceType: 'auto', status: 'active', displayOrder: 6 },
  { id: 'sec-7', name: 'Gift Finder Wizard', sectionKey: 'gift_finder', displayType: 'grid', itemCount: 3, sourceType: 'auto', status: 'active', displayOrder: 7 },
  { id: 'sec-8', name: 'Editorial Buying Guides', sectionKey: 'guides', displayType: 'grid', itemCount: 3, sourceType: 'auto', status: 'active', displayOrder: 8 },
  { id: 'sec-9', name: 'The Hype Drop Newsletter', sectionKey: 'newsletter', displayType: 'spotlight', itemCount: 1, sourceType: 'auto', status: 'active', displayOrder: 9 }
];

const DEFAULT_PAGES: SitePage[] = [
  {
    id: 'page-1',
    title: 'About Our Scoring Methodology',
    slug: 'scoring-methodology',
    content: 'We combine real-time search volume signals, multi-platform sentiment velocity, and independent laboratory benchmark data to calculate Hype Scores and Worth Scores.',
    metaTitle: 'How We Calculate Hype & Worth Scores — Best Buy Cart',
    metaDescription: 'Discover how our proprietary dual-score algorithm filters out marketing noise to reveal what is truly worth buying.',
    focusKeyword: 'product scoring methodology',
    status: 'published',
    showInNavigation: true,
    indexable: true,
    template: 'narrow',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'page-2',
    title: 'Editorial Standards & Testing Policy',
    slug: 'editorial-standards',
    content: 'Our review team evaluates products without manufacturer sponsorship or biased affiliate placements. Every rating is verified through independent hands-on testing.',
    metaTitle: 'Editorial Standards & Lab Testing Policy — Best Buy Cart',
    metaDescription: 'Learn about our rigorous hands-on product evaluation standards and affiliate transparency policies.',
    focusKeyword: 'editorial standards',
    status: 'published',
    showInNavigation: true,
    indexable: true,
    template: 'narrow',
    updatedAt: new Date().toISOString()
  }
];

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: 'Best Buy Cart',
  tagline: 'Discover. Compare. Decide.',
  defaultCurrency: 'USD',
  affiliateDisclosureText: 'Best Buy Cart is an independent product discovery engine. When you purchase through links on our site, we may earn an affiliate commission at no extra cost to you. Scores and recommendations are 100% algorithmically and editorially independent.',
  maintenanceMode: false,
  enableAiFinder: true,
  enableRealtimeSync: true
};

class SupabaseService {
  private getStorage<T>(key: string, defaultData: T): T {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultData;
    } catch {
      return defaultData;
    }
  }

  private setStorage<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('Storage quota exceeded or unavailable', e);
    }
  }

  // --- PRODUCTS CRUD ---
  async getProducts(): Promise<Product[]> {
    return this.getStorage<Product[]>(STORAGE_KEYS.PRODUCTS, SEED_PRODUCTS);
  }

  async getProductById(id: string): Promise<Product | undefined> {
    const products = await this.getProducts();
    return products.find(p => p.id === id);
  }

  async saveProduct(product: Partial<Product> & { name: string; category: string }): Promise<Product> {
    const products = await this.getProducts();
    const existingIndex = products.findIndex(p => p.id === product.id);

    let savedProduct: Product;
    if (existingIndex >= 0) {
      savedProduct = { ...products[existingIndex], ...product } as Product;
      products[existingIndex] = savedProduct;
      this.logActivity('Updated product: ' + savedProduct.name, 'product', savedProduct.id);
    } else {
      const newId = product.id || 'prod-' + Date.now();
      const slug = product.slug || product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const defaultProduct: Product = {
        id: newId,
        slug,
        name: product.name,
        brand: product.brand || 'Generic',
        category: product.category,
        subcategoryId: product.subcategoryId,
        image: product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
        priceUSD: Number(product.priceUSD) || 99,
        rating: Number(product.rating) || 4.5,
        reviewCount: Number(product.reviewCount) || 120,
        hypeScore: Number(product.hypeScore) || 75,
        worthScore: Number(product.worthScore) || 85,
        verdict: product.verdict || 'High build quality and dependable daily performance',
        summary: product.summary || product.verdict || '',
        pros: product.pros || ['Great build quality', 'Reliable performance'],
        cons: product.cons || ['Standard accessories only'],
        specs: product.specs || [{ name: 'Warranty', value: '1 Year Manufacturer' }],
        offers: product.offers || [],
        inStock: product.inStock !== false,
        features: product.features || ['High Quality'],
        countryAvailability: product.countryAvailability || ['US', 'UK', 'DE', 'FR', 'CA', 'AU']
      };
      savedProduct = { ...defaultProduct, ...product };
      products.unshift(savedProduct);
      this.logActivity('Created new product: ' + savedProduct.name, 'product', savedProduct.id);
    }

    this.setStorage(STORAGE_KEYS.PRODUCTS, products);
    return savedProduct;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const products = await this.getProducts();
    const product = products.find(p => p.id === id);
    const updated = products.filter(p => p.id !== id);
    this.setStorage(STORAGE_KEYS.PRODUCTS, updated);
    if (product) {
      this.logActivity('Deleted product: ' + product.name, 'product', id);
    }
    return true;
  }

  // --- DISCOVERY CRUD ---
  async getHiddenGems(): Promise<Product[]> {
    const products = await this.getProducts();
    return products.filter(p => p.isHiddenGem || (p.worthScore >= 90 && p.hypeScore < 85));
  }

  async getOverhypedProducts(): Promise<Product[]> {
    const products = await this.getProducts();
    return products.filter(p => p.isOverhyped || (p.hypeScore >= 90 && p.worthScore <= 70));
  }

  // --- LAYOUT SECTIONS CRUD ---
  async getLayoutSections(): Promise<LayoutSection[]> {
    const sections = this.getStorage<LayoutSection[]>(STORAGE_KEYS.LAYOUT, DEFAULT_LAYOUT_SECTIONS);
    return sections.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async updateLayoutSection(section: LayoutSection): Promise<LayoutSection> {
    const sections = await this.getLayoutSections();
    const idx = sections.findIndex(s => s.id === section.id);
    if (idx >= 0) {
      sections[idx] = section;
      this.setStorage(STORAGE_KEYS.LAYOUT, sections);
      this.logActivity('Updated layout section: ' + section.name, 'layout', section.id);
    }
    return section;
  }

  async reorderLayoutSections(reordered: LayoutSection[]): Promise<LayoutSection[]> {
    const updated = reordered.map((s, index) => ({ ...s, displayOrder: index + 1 }));
    this.setStorage(STORAGE_KEYS.LAYOUT, updated);
    this.logActivity('Reordered homepage sections', 'layout');
    return updated;
  }

  // --- CATEGORIES CRUD ---
  async getCategories(): Promise<Category[]> {
    return this.getStorage<Category[]>(STORAGE_KEYS.CATEGORIES, SEED_CATEGORIES);
  }

  async saveCategory(category: Partial<Category> & { name: string; slug: string }): Promise<Category> {
    const categories = await this.getCategories();
    const existingIndex = categories.findIndex(c => c.slug === category.slug);
    let savedCategory: Category;
    if (existingIndex >= 0) {
      savedCategory = { ...categories[existingIndex], ...category } as Category;
      categories[existingIndex] = savedCategory;
      this.logActivity('Updated category: ' + savedCategory.name, 'category', savedCategory.id);
    } else {
      const newId = category.id || 'cat-' + Date.now();
      savedCategory = {
        id: newId,
        icon: 'tag',
        emoji: '',
        description: '',
        subcategories: [],
        featuredProductCount: 0,
        trendingCount: 0,
        ...category
      } as Category;
      categories.push(savedCategory);
      this.logActivity('Created category: ' + savedCategory.name, 'category', newId);
    }
    this.setStorage(STORAGE_KEYS.CATEGORIES, categories);
    return savedCategory;
  }

  // --- PAGES CRUD ---
  async getPages(): Promise<SitePage[]> {
    return this.getStorage<SitePage[]>(STORAGE_KEYS.PAGES, DEFAULT_PAGES);
  }

  async savePage(page: Partial<SitePage> & { title: string }): Promise<SitePage> {
    const pages = await this.getPages();
    const idx = pages.findIndex(p => p.id === page.id);
    let saved: SitePage;
    if (idx >= 0) {
      saved = { ...pages[idx], ...page, updatedAt: new Date().toISOString() } as SitePage;
      pages[idx] = saved;
      this.logActivity('Updated page: ' + saved.title, 'page', saved.id);
    } else {
      const newId = page.id || 'page-' + Date.now();
      const slug = page.slug || page.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      saved = {
        id: newId,
        title: page.title,
        slug,
        content: page.content || '',
        metaTitle: page.metaTitle || page.title,
        metaDescription: page.metaDescription || '',
        focusKeyword: page.focusKeyword || '',
        status: page.status || 'published',
        showInNavigation: page.showInNavigation ?? false,
        indexable: page.indexable ?? true,
        template: page.template || 'default',
        updatedAt: new Date().toISOString()
      };
      pages.push(saved);
      this.logActivity('Created new page: ' + saved.title, 'page', saved.id);
    }
    this.setStorage(STORAGE_KEYS.PAGES, pages);
    return saved;
  }

  async deletePage(id: string): Promise<boolean> {
    const pages = await this.getPages();
    const updated = pages.filter(p => p.id !== id);
    this.setStorage(STORAGE_KEYS.PAGES, updated);
    this.logActivity('Deleted page ID: ' + id, 'page', id);
    return true;
  }

  // --- SETTINGS CRUD ---
  async getSettings(): Promise<SiteSettings> {
    return this.getStorage<SiteSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  }

  async updateSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    const current = await this.getSettings();
    const updated = { ...current, ...settings };
    this.setStorage(STORAGE_KEYS.SETTINGS, updated);
    this.logActivity('Updated site settings', 'settings');
    return updated;
  }

  // --- ACTIVITY LOGS ---
  async getActivityLogs(): Promise<AdminActivityLog[]> {
    return this.getStorage<AdminActivityLog[]>(STORAGE_KEYS.LOGS, [
      { id: 'log-1', action: 'System Initialized', entityType: 'settings', details: 'Best Buy Cart CMS started', timestamp: new Date().toISOString() }
    ]);
  }

  logActivity(action: string, entityType: AdminActivityLog['entityType'], entityId?: string): void {
    const logs = this.getStorage<AdminActivityLog[]>(STORAGE_KEYS.LOGS, []);
    const newLog: AdminActivityLog = {
      id: 'log-' + Date.now(),
      action,
      entityType,
      entityId,
      details: action,
      timestamp: new Date().toISOString()
    };
    logs.unshift(newLog);
    this.setStorage(STORAGE_KEYS.LOGS, logs.slice(0, 100));
  }
}

export const supabaseService = new SupabaseService();
