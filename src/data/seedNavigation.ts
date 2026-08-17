import { NavMenu, NavMenuItem } from '../types/navigation';

export const SEED_NAV_MENUS: NavMenu[] = [
  {
    id: 'menu-main',
    name: 'Main Desktop Navigation Bar',
    location: 'main',
    isActive: true,
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-17T00:00:00Z'
  },
  {
    id: 'menu-mobile',
    name: 'Mobile Navigation Drawer',
    location: 'mobile',
    isActive: true,
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-17T00:00:00Z'
  },
  {
    id: 'menu-footer',
    name: 'Footer Links',
    location: 'footer',
    isActive: true,
    createdAt: '2026-08-01T00:00:00Z',
    updatedAt: '2026-08-17T00:00:00Z'
  }
];

export const SEED_MAIN_MENU_ITEMS: NavMenuItem[] = [
  {
    id: 'item-home',
    menuId: 'menu-main',
    title: 'Home',
    url: '/',
    linkType: 'internal',
    icon: 'home',
    displayOrder: 1,
    isActive: true,
    showFor: 'all'
  },
  {
    id: 'item-categories',
    menuId: 'menu-main',
    title: 'Categories',
    url: '/categories',
    linkType: 'category',
    icon: 'grid',
    displayOrder: 2,
    isActive: true,
    showFor: 'all'
  },
  {
    id: 'item-compare',
    menuId: 'menu-main',
    title: 'Compare',
    url: '/compare',
    linkType: 'internal',
    icon: 'sword',
    displayOrder: 3,
    isActive: true,
    showFor: 'all'
  },
  {
    id: 'item-deals',
    menuId: 'menu-main',
    title: 'Deals',
    url: '/deals',
    linkType: 'internal',
    icon: 'percent',
    displayOrder: 4,
    isActive: true,
    showFor: 'all'
  },
  {
    id: 'item-gift-finder',
    menuId: 'menu-main',
    title: 'Gift Finder',
    url: '/gift-finder',
    linkType: 'internal',
    icon: 'gift',
    displayOrder: 5,
    isActive: true,
    showFor: 'all'
  },
  {
    id: 'item-discover',
    menuId: 'menu-main',
    title: 'Discover',
    url: '/discover/hidden-gems',
    linkType: 'internal',
    icon: 'compass',
    displayOrder: 6,
    isActive: true,
    showFor: 'all',
    children: [
      {
        id: 'item-disc-hidden-gems',
        menuId: 'menu-main',
        parentId: 'item-discover',
        title: 'Hidden Gems',
        url: '/discover/hidden-gems',
        linkType: 'internal',
        icon: 'gem',
        tooltip: 'High value underrated products with high worth scores',
        displayOrder: 1,
        isActive: true,
        showFor: 'all'
      },
      {
        id: 'item-disc-overhyped',
        menuId: 'menu-main',
        parentId: 'item-discover',
        title: 'Overhyped Watch',
        url: '/discover/overhyped',
        linkType: 'internal',
        icon: 'alert-triangle',
        tooltip: 'Products with high social hype but poor price-to-value ratio',
        displayOrder: 2,
        isActive: true,
        showFor: 'all'
      },
      {
        id: 'item-disc-trending',
        menuId: 'menu-main',
        parentId: 'item-discover',
        title: 'Trending Now',
        url: '/trending',
        linkType: 'internal',
        icon: 'flame',
        tooltip: 'Top viral search velocity products this week',
        displayOrder: 3,
        isActive: true,
        showFor: 'all'
      },
      {
        id: 'item-disc-worth',
        menuId: 'menu-main',
        parentId: 'item-discover',
        title: 'Worth the Hype',
        url: '/is-it-worth-it',
        linkType: 'internal',
        icon: 'star',
        tooltip: 'Verified score breakdowns and worth-it badges',
        displayOrder: 4,
        isActive: true,
        showFor: 'all'
      }
    ]
  },
  {
    id: 'item-tools',
    menuId: 'menu-main',
    title: 'Tools',
    url: '/tools',
    linkType: 'internal',
    icon: 'settings',
    displayOrder: 7,
    isActive: true,
    showFor: 'all',
    children: [
      {
        id: 'item-tool-ai-finder',
        menuId: 'menu-main',
        parentId: 'item-tools',
        title: 'AI Product Finder',
        url: '/tools/product-finder',
        linkType: 'internal',
        icon: 'brain',
        tooltip: 'Smart recommendation wizard based on your specs and budget',
        displayOrder: 1,
        isActive: true,
        showFor: 'all'
      },
      {
        id: 'item-tool-gift-finder',
        menuId: 'menu-main',
        parentId: 'item-tools',
        title: 'Gift Finder Wizard',
        url: '/gift-finder',
        linkType: 'internal',
        icon: 'gift',
        tooltip: 'Curated gifts for tech lovers, coffee addicts, and family',
        displayOrder: 2,
        isActive: true,
        showFor: 'all'
      },
      {
        id: 'item-tool-compare',
        menuId: 'menu-main',
        parentId: 'item-tools',
        title: 'Comparison Engine',
        url: '/compare',
        linkType: 'internal',
        icon: 'sword',
        tooltip: 'Side-by-side specification & price breakdown matrix',
        displayOrder: 3,
        isActive: true,
        showFor: 'all'
      },
      {
        id: 'item-tool-price-alert',
        menuId: 'menu-main',
        parentId: 'item-tools',
        title: 'Price Drop Radar',
        url: '/deals/price-drops',
        linkType: 'internal',
        icon: 'bell',
        tooltip: 'Automated 30-minute street price scanner & alerts',
        displayOrder: 4,
        isActive: true,
        showFor: 'all'
      },
      {
        id: 'item-tool-wishlist',
        menuId: 'menu-main',
        parentId: 'item-tools',
        title: 'Share Wishlist',
        url: '/account/wishlist',
        linkType: 'internal',
        icon: 'share',
        tooltip: 'Export and share saved wishlists with friends',
        displayOrder: 5,
        isActive: true,
        showFor: 'all'
      }
    ]
  },
  {
    id: 'item-guides',
    menuId: 'menu-main',
    title: 'Guides',
    url: '/guides',
    linkType: 'internal',
    icon: 'book',
    displayOrder: 8,
    isActive: true,
    showFor: 'all'
  }
];
