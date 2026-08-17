import { Deal, PriceHistoryPoint, PriceAlert, SeasonalCampaign, EmailCampaign, PriceTrackingSetting } from '../types/deals';
import { SEED_DEALS, SEED_PRICE_ALERTS, SEED_SEASONAL_CAMPAIGNS, SEED_EMAIL_CAMPAIGNS } from '../data/seedDeals';
import { supabaseService } from './supabaseService';

const STORAGE_KEYS = {
  DEALS: 'bestbuycart_db_deals',
  ALERTS: 'bestbuycart_db_price_alerts',
  SEASONAL: 'bestbuycart_db_seasonal',
  NEWSLETTER: 'bestbuycart_db_newsletter'
};

class DealService {
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
      console.warn('Storage quota exceeded or unavailable', e);
    }
  }

  // --- DEALS CRUD ---
  async getDeals(): Promise<Deal[]> {
    return this.getStorage<Deal[]>(STORAGE_KEYS.DEALS, SEED_DEALS);
  }

  async getDealById(id: string): Promise<Deal | undefined> {
    const deals = await this.getDeals();
    return deals.find(d => d.id === id || d.slug === id);
  }

  async getTopDeals(): Promise<Deal[]> {
    const deals = await this.getDeals();
    return deals.filter(d => d.status === 'active' && d.isTopDeal);
  }

  async getPriceDrops(): Promise<Deal[]> {
    const deals = await this.getDeals();
    return deals.filter(d => d.status === 'active' && (d.dealType === 'price_drop' || d.isPriceDrop));
  }

  async getUnder25Deals(): Promise<Deal[]> {
    const deals = await this.getDeals();
    return deals.filter(d => d.status === 'active' && (d.dealPriceUSD <= 25 || d.isUnder25));
  }

  async saveDeal(deal: Partial<Deal> & { productName: string; dealPriceUSD: number }): Promise<Deal> {
    const deals = await this.getDeals();
    const idx = deals.findIndex(d => d.id === deal.id);
    let saved: Deal;

    const original = deal.originalPriceUSD || deal.dealPriceUSD * 1.25;
    const discount = Math.round(((original - deal.dealPriceUSD) / original) * 100);

    if (idx >= 0) {
      saved = {
        ...deals[idx],
        ...deal,
        discountPercent: discount,
        originalPriceUSD: original
      } as Deal;
      deals[idx] = saved;
      supabaseService.logActivity('Updated deal: ' + saved.productName, 'settings');
    } else {
      const newId = deal.id || 'deal-' + Date.now();
      const slug = deal.slug || deal.productName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      saved = {
        id: newId,
        productId: deal.productId || 'prod-custom',
        productName: deal.productName,
        brand: deal.brand || 'Generic',
        category: deal.category || 'tech',
        image: deal.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
        dealType: deal.dealType || 'price_drop',
        originalPriceUSD: original,
        dealPriceUSD: deal.dealPriceUSD,
        discountPercent: discount,
        retailerName: deal.retailerName || 'Amazon',
        retailerUrl: deal.retailerUrl || 'https://amazon.com',
        startDate: deal.startDate || new Date().toISOString(),
        endDate: deal.endDate || new Date(Date.now() + 7 * 86400000).toISOString(),
        timezone: deal.timezone || 'America/New_York',
        showCountdown: deal.showCountdown ?? true,
        status: deal.status || 'active',
        countries: deal.countries || ['US', 'UK', 'DE', 'FR', 'CA', 'AU'],
        slug,
        views: 0,
        clicks: 0,
        isTopDeal: deal.isTopDeal ?? true,
        isPriceDrop: true
      };
      deals.unshift(saved);
      supabaseService.logActivity('Created new deal: ' + saved.productName, 'settings');
    }

    this.setStorage(STORAGE_KEYS.DEALS, deals);
    return saved;
  }

  async deleteDeal(id: string): Promise<boolean> {
    const deals = await this.getDeals();
    const updated = deals.filter(d => d.id !== id);
    this.setStorage(STORAGE_KEYS.DEALS, updated);
    supabaseService.logActivity('Deleted deal ID: ' + id, 'settings');
    return true;
  }

  // --- 30-DAY PRICE HISTORY GENERATOR ---
  getPriceHistory(productId: string, currentPriceUSD: number): {
    history: PriceHistoryPoint[];
    lowest30d: number;
    highest30d: number;
    average30d: number;
  } {
    const points: PriceHistoryPoint[] = [];
    const high = Math.round(currentPriceUSD * 1.18);
    const mid = Math.round(currentPriceUSD * 1.08);
    const low = currentPriceUSD;

    const days = [30, 24, 18, 12, 6, 1];
    const prices = [high, high, mid, mid, low, low];

    days.forEach((dayAgo, i) => {
      const d = new Date();
      d.setDate(d.getDate() - dayAgo);
      points.push({
        date: d.toISOString().split('T')[0],
        dayLabel: `Day ${31 - dayAgo}`,
        priceUSD: prices[i],
        retailer: i % 2 === 0 ? 'Amazon' : 'Best Buy'
      });
    });

    return {
      history: points,
      lowest30d: low,
      highest30d: high,
      average30d: Math.round((high + mid + low) / 3)
    };
  }

  // --- USER PRICE ALERTS ---
  async getPriceAlerts(): Promise<PriceAlert[]> {
    return this.getStorage<PriceAlert[]>(STORAGE_KEYS.ALERTS, SEED_PRICE_ALERTS);
  }

  async subscribePriceAlert(alert: { userEmail: string; productId: string; productName: string; currentPriceUSD: number; targetPriceUSD: number }): Promise<PriceAlert> {
    const alerts = await this.getPriceAlerts();
    const newAlert: PriceAlert = {
      id: 'alert-' + Date.now(),
      userEmail: alert.userEmail,
      productId: alert.productId,
      productName: alert.productName,
      currentPriceUSD: alert.currentPriceUSD,
      targetPriceUSD: alert.targetPriceUSD,
      status: 'active',
      createdAt: new Date().toISOString()
    };
    alerts.unshift(newAlert);
    this.setStorage(STORAGE_KEYS.ALERTS, alerts);
    supabaseService.logActivity(`Subscribed price alert for ${alert.productName} by ${alert.userEmail}`, 'settings');
    return newAlert;
  }

  // --- SEASONAL CAMPAIGNS ---
  async getSeasonalCampaigns(): Promise<SeasonalCampaign[]> {
    return this.getStorage<SeasonalCampaign[]>(STORAGE_KEYS.SEASONAL, SEED_SEASONAL_CAMPAIGNS);
  }

  async saveSeasonalCampaign(campaign: Partial<SeasonalCampaign> & { name: string }): Promise<SeasonalCampaign> {
    const campaigns = await this.getSeasonalCampaigns();
    const idx = campaigns.findIndex(c => c.id === campaign.id);
    let saved: SeasonalCampaign;

    if (idx >= 0) {
      saved = { ...campaigns[idx], ...campaign } as SeasonalCampaign;
      campaigns[idx] = saved;
    } else {
      saved = {
        id: 'season-' + Date.now(),
        name: campaign.name,
        season: campaign.season || 'Seasonal 2026',
        slug: campaign.slug || campaign.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        headline: campaign.headline || 'Exclusive Seasonal Discounts',
        description: campaign.description || 'Verified price drops for this season.',
        dealIds: campaign.dealIds || ['deal-1', 'deal-2'],
        status: campaign.status || 'active',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
        clicks: 0,
        conversions: 0,
        revenueUSD: 0
      };
      campaigns.unshift(saved);
    }
    this.setStorage(STORAGE_KEYS.SEASONAL, campaigns);
    supabaseService.logActivity('Saved seasonal campaign: ' + saved.name, 'settings');
    return saved;
  }

  // --- EMAIL NEWSLETTER CAMPAIGNS ---
  async getEmailCampaigns(): Promise<EmailCampaign[]> {
    return this.getStorage<EmailCampaign[]>(STORAGE_KEYS.NEWSLETTER, SEED_EMAIL_CAMPAIGNS);
  }

  async saveEmailCampaign(campaign: Partial<EmailCampaign> & { name: string; subject: string }): Promise<EmailCampaign> {
    const campaigns = await this.getEmailCampaigns();
    const idx = campaigns.findIndex(c => c.id === campaign.id);
    let saved: EmailCampaign;

    if (idx >= 0) {
      saved = { ...campaigns[idx], ...campaign } as EmailCampaign;
      campaigns[idx] = saved;
    } else {
      saved = {
        id: 'email-' + Date.now(),
        name: campaign.name,
        subject: campaign.subject,
        template: campaign.template || 'price_drop_alert',
        dealIds: campaign.dealIds || ['deal-1', 'deal-2'],
        sendDate: campaign.sendDate || new Date().toISOString(),
        status: campaign.status || 'scheduled',
        subscribersCount: 5780,
        opensCount: 0,
        clicksCount: 0
      };
      campaigns.unshift(saved);
    }
    this.setStorage(STORAGE_KEYS.NEWSLETTER, campaigns);
    supabaseService.logActivity('Saved newsletter campaign: ' + saved.name, 'settings');
    return saved;
  }

  // --- PRICE TRACKING SCANNER SIMULATION ---
  async runPriceTrackingScan(): Promise<{ detectedDrops: number; checkedCount: number; timestamp: string }> {
    const deals = await this.getDeals();
    supabaseService.logActivity(`Price tracking engine scanned 234 products across Amazon, Walmart, Best Buy, and Target.`, 'settings');
    return {
      detectedDrops: 4,
      checkedCount: 234,
      timestamp: new Date().toLocaleTimeString()
    };
  }
}

export const dealService = new DealService();
