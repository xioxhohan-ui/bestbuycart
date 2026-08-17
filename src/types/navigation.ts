export type MenuLocation = 'main' | 'footer' | 'mobile';

export type LinkType = 'internal' | 'external' | 'category' | 'custom';

export interface NavMenu {
  id: string;
  name: string;
  location: MenuLocation;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NavMenuItem {
  id: string;
  menuId: string;
  parentId?: string | null;
  title: string;
  slug?: string;
  url: string;
  linkType: LinkType;
  icon?: string;
  targetBlank?: boolean;
  nofollow?: boolean;
  displayOrder: number;
  isActive: boolean;
  showFor?: 'all' | 'logged_in' | 'logged_out' | 'admin';
  tooltip?: string;
  children?: NavMenuItem[];
  categoryId?: string;
}

export interface CategoryMenuItem {
  id: string;
  menuItemId: string;
  categoryId: string;
  displayOrder: number;
}
