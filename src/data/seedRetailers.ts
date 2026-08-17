import { Retailer } from '../types/retailer';

export const SEED_RETAILERS: Retailer[] = [
  {
    id: 'amazon',
    name: 'Amazon',
    slug: 'amazon',
    logo: 'https://images.unsplash.com/photo-1523474253246-72fb9c27030d?w=100&auto=format&fit=crop&q=80',
    website: 'https://amazon.com',
    affiliateEnabled: true,
    supportedCountries: ['US', 'UK', 'DE', 'FR', 'CA', 'AU'],
  },
  {
    id: 'bestbuy',
    name: 'Best Buy',
    slug: 'bestbuy',
    logo: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=100&auto=format&fit=crop&q=80',
    website: 'https://bestbuy.com',
    affiliateEnabled: true,
    supportedCountries: ['US', 'CA'],
  },
  {
    id: 'walmart',
    name: 'Walmart',
    slug: 'walmart',
    logo: 'https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?w=100&auto=format&fit=crop&q=80',
    website: 'https://walmart.com',
    affiliateEnabled: true,
    supportedCountries: ['US', 'CA'],
  },
  {
    id: 'target',
    name: 'Target',
    slug: 'target',
    logo: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=100&auto=format&fit=crop&q=80',
    website: 'https://target.com',
    affiliateEnabled: true,
    supportedCountries: ['US'],
  },
  {
    id: 'bhphoto',
    name: 'B&H Photo',
    slug: 'bhphoto',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80',
    website: 'https://bhphotovideo.com',
    affiliateEnabled: true,
    supportedCountries: ['US', 'UK', 'DE', 'FR', 'CA', 'AU'],
  }
];
