import {
  GiftRecipient,
  GiftOccasion,
  GiftBudget,
  GiftInterest,
  GiftRule,
  GiftWizardAnswers,
  GiftRecommendationResult,
  RecommendationSettings,
  RecommendationAnalytics,
  AccessoryBundleItem
} from '../types/gifts';
import { Product } from '../types/product';
import {
  SEED_GIFT_RECIPIENTS,
  SEED_GIFT_OCCASIONS,
  SEED_GIFT_BUDGETS,
  SEED_GIFT_INTERESTS,
  SEED_GIFT_RULES,
  SEED_RECOMMENDATION_SETTINGS,
  SEED_RECOMMENDATION_ANALYTICS
} from '../data/seedGifts';
import { supabaseService } from './supabaseService';

const STORAGE_KEYS = {
  RECIPIENTS: 'bestbuycart_db_recipients',
  OCCASIONS: 'bestbuycart_db_occasions',
  RULES: 'bestbuycart_db_gift_rules',
  SETTINGS: 'bestbuycart_db_rec_settings'
};

class GiftService {
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

  // --- PERSONAS & TAXONOMY ---
  async getRecipients(): Promise<GiftRecipient[]> {
    return this.getStorage<GiftRecipient[]>(STORAGE_KEYS.RECIPIENTS, SEED_GIFT_RECIPIENTS);
  }

  async getOccasions(): Promise<GiftOccasion[]> {
    return this.getStorage<GiftOccasion[]>(STORAGE_KEYS.OCCASIONS, SEED_GIFT_OCCASIONS);
  }

  async getBudgets(): Promise<GiftBudget[]> {
    return SEED_GIFT_BUDGETS;
  }

  async getInterests(): Promise<GiftInterest[]> {
    return SEED_GIFT_INTERESTS;
  }

  // --- RULES CRUD ---
  async getRules(): Promise<GiftRule[]> {
    return this.getStorage<GiftRule[]>(STORAGE_KEYS.RULES, SEED_GIFT_RULES);
  }

  async saveRule(rule: Partial<GiftRule> & { recipientSlug: string; productId: string }): Promise<GiftRule> {
    const rules = await this.getRules();
    const idx = rules.findIndex(r => r.id === rule.id);
    let saved: GiftRule;

    if (idx >= 0) {
      saved = { ...rules[idx], ...rule } as GiftRule;
      rules[idx] = saved;
    } else {
      saved = {
        id: 'rule-' + Date.now(),
        recipientSlug: rule.recipientSlug,
        occasionSlug: rule.occasionSlug || 'birthday',
        budgetMaxUSD: Number(rule.budgetMaxUSD) || 100,
        interestSlug: rule.interestSlug || 'tech',
        productId: rule.productId,
        priority: Number(rule.priority) || 1,
        customQuote: rule.customQuote || 'High rated, dependable gift verified by benchmark analysis.',
        isActive: rule.isActive !== false
      };
      rules.unshift(saved);
    }

    this.setStorage(STORAGE_KEYS.RULES, rules);
    supabaseService.logActivity(`Saved gift rule for recipient: ${saved.recipientSlug}`, 'settings');
    return saved;
  }

  async deleteRule(id: string): Promise<boolean> {
    const rules = await this.getRules();
    const updated = rules.filter(r => r.id !== id);
    this.setStorage(STORAGE_KEYS.RULES, updated);
    supabaseService.logActivity(`Deleted gift rule ID: ${id}`, 'settings');
    return true;
  }

  // --- GIFT MATCHING ALGORITHM ---
  async findGifts(answers: GiftWizardAnswers): Promise<GiftRecommendationResult> {
    const allProducts = await supabaseService.getProducts();
    const rules = await this.getRules();

    // 1. Check if an active rule matches
    const matchedRule = rules.find(r =>
      r.isActive &&
      r.recipientSlug === answers.recipient &&
      (!r.interestSlug || answers.interests.includes(r.interestSlug)) &&
      r.budgetMaxUSD >= answers.budgetMaxUSD * 0.8
    );

    let topPick: Product | undefined;
    let customReason: string | undefined;

    if (matchedRule) {
      topPick = allProducts.find(p => p.id === matchedRule.productId);
      customReason = matchedRule.customQuote;
    }

    // 2. Algorithmic fallback match
    if (!topPick) {
      let filtered = allProducts.filter(p => p.priceUSD <= answers.budgetMaxUSD * 1.1);
      if (answers.interests.length > 0) {
        const categoryMatches = filtered.filter(p => answers.interests.includes(p.category));
        if (categoryMatches.length > 0) {
          filtered = categoryMatches;
        }
      }
      topPick = filtered.sort((a, b) => b.worthScore - a.worthScore)[0] || allProducts[0];
    }

    const alternatives = allProducts
      .filter(p => p.id !== topPick?.id && p.priceUSD <= answers.budgetMaxUSD * 1.2)
      .sort((a, b) => b.worthScore - a.worthScore)
      .slice(0, 4);

    const recipientLabel = answers.recipient.charAt(0).toUpperCase() + answers.recipient.slice(1);
    const occasionLabel = answers.occasion.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

    const reason = customReason ||
      `Top match for ${recipientLabel}'s ${occasionLabel}. Features a ${topPick.worthScore}% Worth Index rating, exceptional durability, and high user satisfaction in this price range.`;

    return {
      topPick,
      personalizedReason: reason,
      alternativePicks: alternatives,
      criteriaSummary: {
        recipient: recipientLabel,
        occasion: occasionLabel,
        budget: `Under $${answers.budgetMaxUSD}`,
        interests: answers.interests
      }
    };
  }

  // --- CROSS-SELL "YOU MIGHT ALSO LIKE" ---
  async getRelatedRecommendations(product: Product): Promise<Product[]> {
    const all = await supabaseService.getProducts();
    return all
      .filter(p => p.id !== product.id && p.category === product.category)
      .sort((a, b) => b.hypeScore - a.hypeScore)
      .slice(0, 4);
  }

  // --- UPSELL "COMPLETE THE SET" BUNDLE ---
  getAccessoryBundle(product: Product): AccessoryBundleItem[] {
    if (product.category === 'tech') {
      return [
        { id: 'acc-1', name: 'Hard Shell Travel Storage Case', priceUSD: 24.99, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&auto=format&fit=crop&q=80', selected: true },
        { id: 'acc-2', name: 'USB-C Fast Charging Braided Cable (2m)', priceUSD: 14.99, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&auto=format&fit=crop&q=80', selected: true },
        { id: 'acc-3', name: 'Compact Magnetic Desktop Stand', priceUSD: 29.99, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&auto=format&fit=crop&q=80', selected: false }
      ];
    } else if (product.category === 'kitchen') {
      return [
        { id: 'acc-4', name: 'Double-Walled Espresso Glasses (Set of 2)', priceUSD: 19.99, image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&auto=format&fit=crop&q=80', selected: true },
        { id: 'acc-5', name: 'Precision Coffee Scale with Timer', priceUSD: 34.99, image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&auto=format&fit=crop&q=80', selected: true },
        { id: 'acc-6', name: 'Microfiber Barista Cleaning Towels', priceUSD: 12.99, image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=400&auto=format&fit=crop&q=80', selected: false }
      ];
    }
    return [
      { id: 'acc-7', name: 'Protective Travel Sleeve', priceUSD: 19.99, image: product.image, selected: true },
      { id: 'acc-8', name: 'Extended 2-Year Protection Plan', priceUSD: 29.99, image: product.image, selected: true }
    ];
  }

  // --- SETTINGS & ANALYTICS ---
  async getRecommendationSettings(): Promise<RecommendationSettings> {
    return this.getStorage<RecommendationSettings>(STORAGE_KEYS.SETTINGS, SEED_RECOMMENDATION_SETTINGS);
  }

  async updateRecommendationSettings(settings: Partial<RecommendationSettings>): Promise<RecommendationSettings> {
    const current = await this.getRecommendationSettings();
    const updated = { ...current, ...settings };
    this.setStorage(STORAGE_KEYS.SETTINGS, updated);
    supabaseService.logActivity('Updated AI recommendation similarity weights', 'settings');
    return updated;
  }

  async getRecommendationAnalytics(): Promise<RecommendationAnalytics> {
    return SEED_RECOMMENDATION_ANALYTICS;
  }
}

export const giftService = new GiftService();
