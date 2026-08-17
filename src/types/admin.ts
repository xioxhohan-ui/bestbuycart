export type AdminRole = 'admin' | 'editor';

export interface AdminSession {
  isAuthenticated: boolean;
  role: AdminRole;
  loginTime: string;
}

export interface LayoutSection {
  id: string;
  name: string;
  sectionKey: string;
  displayType: 'grid' | 'carousel' | 'split' | 'spotlight';
  itemCount: number;
  sourceType: 'auto' | 'manual';
  status: 'active' | 'inactive';
  displayOrder: number;
  pinnedProductIds?: string[];
}

export interface SitePage {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  status: 'published' | 'draft';
  showInNavigation: boolean;
  indexable: boolean;
  template: 'default' | 'narrow' | 'landing';
  updatedAt: string;
}

export interface AdminActivityLog {
  id: string;
  action: string;
  entityType: 'product' | 'category' | 'page' | 'layout' | 'settings' | 'auth';
  entityId?: string;
  details: string;
  timestamp: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  defaultCurrency: string;
  affiliateDisclosureText: string;
  maintenanceMode: boolean;
  enableAiFinder: boolean;
  enableRealtimeSync: boolean;
}
