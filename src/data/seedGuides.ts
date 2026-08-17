import { BuyingGuide } from '../types/guide';

export const SEED_GUIDES: BuyingGuide[] = [
  {
    id: 'guide-1',
    slug: 'how-to-choose-a-coffee-maker',
    title: 'How to Choose a Coffee Maker in 2026: Manual vs. Super-Automatic',
    category: 'Kitchen',
    readTime: '6 min read',
    date: 'Aug 14, 2026',
    summary: 'From ThermoJet espresso precision to single-dose burr grinders, here is how to pick the setup that matches your daily routine without overpaying.',
    author: {
      name: 'Julian Vance',
      role: 'Head of Kitchen Intelligence'
    },
    productIds: ['prod-2', 'prod-rising-2']
  },
  {
    id: 'guide-2',
    slug: 'buying-guide-for-air-purifiers-and-hepa',
    title: 'Air Purifier Buying Guide: Why CADR & Replacement Filter Costs Matter Most',
    category: 'Smart Home',
    readTime: '5 min read',
    date: 'Aug 11, 2026',
    summary: 'Avoid aesthetic viral traps with low airflow. Learn how to calculate Clean Air Delivery Rate (CADR) for your room square footage.',
    author: {
      name: 'Dr. Elena Rostova',
      role: 'Environmental Tech Analyst'
    },
    productIds: ['prod-overhyped-1']
  },
  {
    id: 'guide-3',
    slug: 'best-time-to-buy-tech-products',
    title: 'The Best Time to Buy Tech Products: Annual Pricing Cycles & Hidden Deals',
    category: 'Shopping Advice',
    readTime: '8 min read',
    date: 'Aug 08, 2026',
    summary: 'We analyzed historical price trends across 50,000+ consumer items. Here is the calendar blueprint for laptops, audio gear, and appliances.',
    author: {
      name: 'Marcus Sterling',
      role: 'Chief Commerce Editor'
    },
    productIds: ['prod-1', 'prod-3']
  }
];
