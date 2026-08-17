import { NavMenu, NavMenuItem, MenuLocation } from '../types/navigation';
import { SEED_NAV_MENUS, SEED_MAIN_MENU_ITEMS } from '../data/seedNavigation';
import { categoryService } from './categoryService';

const NAV_MENUS_KEY = 'hype_nav_menus_v1';
const NAV_ITEMS_KEY = 'hype_nav_items_v1';

class MenuService {
  private menus: NavMenu[] = [];
  private items: NavMenuItem[] = [];

  constructor() {
    this.initData();
  }

  private initData() {
    const savedMenus = localStorage.getItem(NAV_MENUS_KEY);
    this.menus = savedMenus ? JSON.parse(savedMenus) : [...SEED_NAV_MENUS];

    const savedItems = localStorage.getItem(NAV_ITEMS_KEY);
    if (savedItems) {
      try {
        this.items = JSON.parse(savedItems);
      } catch (e) {
        this.items = [...SEED_MAIN_MENU_ITEMS];
      }
    } else {
      this.items = [...SEED_MAIN_MENU_ITEMS];
      this.saveItems();
    }
  }

  private saveMenus() {
    localStorage.setItem(NAV_MENUS_KEY, JSON.stringify(this.menus));
  }

  private saveItems() {
    localStorage.setItem(NAV_ITEMS_KEY, JSON.stringify(this.items));
  }

  public async getMenu(location: MenuLocation = 'main'): Promise<NavMenuItem[]> {
    this.initData();
    const menu = this.menus.find((m) => m.location === location && m.isActive);
    if (!menu) return [];

    const menuItems = this.items
      .filter((i) => i.menuId === menu.id && i.isActive)
      .sort((a, b) => a.displayOrder - b.displayOrder);

    // Build hierarchical tree
    return this.buildTree(menuItems);
  }

  public async getAllRawItems(location: MenuLocation = 'main'): Promise<NavMenuItem[]> {
    this.initData();
    const menu = this.menus.find((m) => m.location === location);
    if (!menu) return [];

    return this.items
      .filter((i) => i.menuId === menu.id)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }

  private buildTree(items: NavMenuItem[], parentId: string | null = null): NavMenuItem[] {
    const result: NavMenuItem[] = [];
    const children = items.filter((item) => (parentId ? item.parentId === parentId : !item.parentId));

    for (const child of children) {
      const grandChildren = this.buildTree(items, child.id);
      result.push({
        ...child,
        children: grandChildren.length > 0 ? grandChildren : child.children
      });
    }

    return result;
  }

  // ==========================================
  // DYNAMIC CATEGORY MEGA MENU TREE GENERATOR
  // ==========================================

  public async generateCategoryMegaMenuTree() {
    const categories = await categoryService.getCategories();
    const topLevel = categories.slice(0, 14); // All 14 main categories

    return topLevel.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      icon: cat.icon,
      itemCount: cat.featuredProductCount || 0,
      subcategories: cat.subcategories || []
    }));
  }

  // ==========================================
  // ADMIN CRUD OPERATIONS
  // ==========================================

  public async addMenuItem(params: Omit<NavMenuItem, 'id'>): Promise<NavMenuItem> {
    this.initData();
    const newItem: NavMenuItem = {
      ...params,
      id: `item-${Date.now()}`
    };

    this.items.push(newItem);
    this.saveItems();
    return newItem;
  }

  public async updateMenuItem(id: string, updates: Partial<NavMenuItem>): Promise<NavMenuItem> {
    this.initData();
    const idx = this.items.findIndex((i) => i.id === id);
    if (idx === -1) throw new Error('Menu item not found');

    this.items[idx] = { ...this.items[idx], ...updates };
    this.saveItems();
    return this.items[idx];
  }

  public async deleteMenuItem(id: string): Promise<void> {
    this.initData();
    // Delete item and all its children recursively
    const idsToDelete = [id];
    const findChildren = (parentId: string) => {
      const children = this.items.filter((i) => i.parentId === parentId);
      for (const child of children) {
        idsToDelete.push(child.id);
        findChildren(child.id);
      }
    };
    findChildren(id);

    this.items = this.items.filter((i) => !idsToDelete.includes(i.id));
    this.saveItems();
  }

  public async toggleItemActive(id: string): Promise<boolean> {
    this.initData();
    const item = this.items.find((i) => i.id === id);
    if (!item) return false;

    item.isActive = !item.isActive;
    this.saveItems();
    return item.isActive;
  }

  public async reorderMenuItems(reorderedItems: { id: string; displayOrder: number }[]): Promise<void> {
    this.initData();
    reorderedItems.forEach((r) => {
      const item = this.items.find((i) => i.id === r.id);
      if (item) {
        item.displayOrder = r.displayOrder;
      }
    });
    this.saveItems();
  }

  public async resetToDefault(): Promise<NavMenuItem[]> {
    this.items = [...SEED_MAIN_MENU_ITEMS];
    this.saveItems();
    return this.getMenu('main');
  }

  public exportMenuJSON(): string {
    this.initData();
    return JSON.stringify(
      {
        menus: this.menus,
        items: this.items,
        exportedAt: new Date().toISOString()
      },
      null,
      2
    );
  }

  public importMenuJSON(jsonContent: string): boolean {
    try {
      const parsed = JSON.parse(jsonContent);
      if (parsed.items && Array.isArray(parsed.items)) {
        this.items = parsed.items;
        this.saveItems();
        if (parsed.menus && Array.isArray(parsed.menus)) {
          this.menus = parsed.menus;
          this.saveMenus();
        }
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
}

export const menuService = new MenuService();
