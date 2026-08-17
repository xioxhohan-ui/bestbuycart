import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useNavigation } from '../../context/NavigationContext';
import { categoryService } from '../../services/categoryService';
import { Category } from '../../types/category';
import { AdminDashboardOverview } from '../../components/admin/AdminDashboardOverview';
import { AdminProductList } from '../../components/admin/AdminProductList';
import { AdminContentManager } from '../../components/admin/AdminContentManager';
import { AdminSEOIntelligence } from '../../components/admin/AdminSEOIntelligence';
import { AdminContentRefreshManager } from '../../components/admin/AdminContentRefreshManager';
import { AdminKnowledgeGraphManager } from '../../components/admin/AdminKnowledgeGraphManager';
import { AdminComparisonManager } from '../../components/admin/AdminComparisonManager';
import { AdminDealsManager } from '../../components/admin/AdminDealsManager';
import { AdminPriceTrackingManager } from '../../components/admin/AdminPriceTrackingManager';
import { AdminPriceAlertsManager } from '../../components/admin/AdminPriceAlertsManager';
import { AdminSeasonalManager } from '../../components/admin/AdminSeasonalManager';
import { AdminNewsletterManager } from '../../components/admin/AdminNewsletterManager';
import { AdminGiftFinderManager } from '../../components/admin/AdminGiftFinderManager';
import { AdminGiftRulesManager } from '../../components/admin/AdminGiftRulesManager';
import { AdminRecommendationSettings } from '../../components/admin/AdminRecommendationSettings';
import { AdminRecommendationAnalytics } from '../../components/admin/AdminRecommendationAnalytics';
import { AdminDiscoveryManager } from '../../components/admin/AdminDiscoveryManager';
import { AdminBacklinkManager } from '../../components/admin/AdminBacklinkManager';
import { AdminInternalLinkManager } from '../../components/admin/AdminInternalLinkManager';
import { AdminLayoutManager } from '../../components/admin/AdminLayoutManager';
import { AdminPagesManager } from '../../components/admin/AdminPagesManager';
import { AdminAffiliateManager } from '../../components/admin/AdminAffiliateManager';
import { AdminSettingsView } from '../../components/admin/AdminSettingsView';
import { AdminUserManager } from '../../components/admin/AdminUserManager';
import { AdminReviewManager } from '../../components/admin/AdminReviewManager';
import { AdminCommentManager } from '../../components/admin/AdminCommentManager';
import { AdminLoyaltyManager } from '../../components/admin/AdminLoyaltyManager';
import { AdminMenuManager } from '../../components/admin/AdminMenuManager';
import { AdminBulkImporter } from '../../components/admin/AdminBulkImporter';
import {
  LayoutDashboard,
  Package,
  Compass,
  Layout,
  FileText,
  Link2,
  Settings,
  LogOut,
  ExternalLink,
  Shield,
  ChevronRight,
  ArrowRightLeft,
  Share2,
  Network,
  Tag,
  Radar,
  Bell,
  Gift,
  Mail,
  Split,
  Sliders,
  BarChart3,
  BookOpen,
  Search,
  RefreshCw,
  Users,
  MessageSquare,
  Award,
  Upload,
  Menu as MenuIcon
} from 'lucide-react';

type AdminTab =
  | 'dashboard'
  | 'products'
  | 'importer'
  | 'menu'
  | 'users'
  | 'reviews'
  | 'comments'
  | 'loyalty'
  | 'content'
  | 'seointelligence'
  | 'contentrefresh'
  | 'knowledgegraph'
  | 'deals'
  | 'pricetracking'
  | 'pricealerts'
  | 'giftfinder'
  | 'giftrules'
  | 'airecommendations'
  | 'recanalytics'
  | 'comparisons'
  | 'discovery'
  | 'seasonal'
  | 'newsletter'
  | 'backlinks'
  | 'internallinks'
  | 'layout'
  | 'pages'
  | 'affiliates'
  | 'settings';

export const AdminDashboardView: React.FC = () => {
  const { logout } = useAdminAuth();
  const { navigate } = useNavigation();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    categoryService.getCategories().then(setCategories);
  }, []);

  const navItems: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Overview Dashboard', icon: <LayoutDashboard size={17} /> },
    { id: 'products', label: 'Products & Scores', icon: <Package size={17} /> },
    { id: 'importer', label: 'Bulk Feed & Automation', icon: <Upload size={17} /> },
    { id: 'menu', label: 'Mega Navigation Builder', icon: <MenuIcon size={17} /> },
    { id: 'users', label: 'User Management', icon: <Users size={17} /> },
    { id: 'reviews', label: 'Review Moderation', icon: <Award size={17} /> },
    { id: 'comments', label: 'Comment Discussions', icon: <MessageSquare size={17} /> },
    { id: 'loyalty', label: 'Loyalty & Reputation', icon: <Award size={17} /> },
    { id: 'content', label: 'Content Engine', icon: <BookOpen size={17} /> },
    { id: 'seointelligence', label: 'SEO Intelligence', icon: <Search size={17} /> },
    { id: 'contentrefresh', label: 'Content Refresh Engine', icon: <RefreshCw size={17} /> },
    { id: 'knowledgegraph', label: 'Topic Clusters & Graph', icon: <Network size={17} /> },
    { id: 'deals', label: 'Deals & Savings', icon: <Tag size={17} /> },
    { id: 'pricetracking', label: 'Price Tracker Scanner', icon: <Radar size={17} /> },
    { id: 'pricealerts', label: 'User Price Alerts', icon: <Bell size={17} /> },
    { id: 'giftfinder', label: 'Gift Finder Personas', icon: <Gift size={17} /> },
    { id: 'giftrules', label: 'Gift Recommendation Rules', icon: <Split size={17} /> },
    { id: 'airecommendations', label: 'AI Similarity Weights', icon: <Sliders size={17} /> },
    { id: 'recanalytics', label: 'Recommendation Analytics', icon: <BarChart3 size={17} /> },
    { id: 'comparisons', label: 'Comparison Engine', icon: <ArrowRightLeft size={17} /> },
    { id: 'discovery', label: 'Discovery Engine', icon: <Compass size={17} /> },
    { id: 'seasonal', label: 'Seasonal Campaigns', icon: <Gift size={17} /> },
    { id: 'newsletter', label: 'Email Newsletter', icon: <Mail size={17} /> },
    { id: 'backlinks', label: 'Backlink Portfolio', icon: <Share2 size={17} /> },
    { id: 'internallinks', label: 'Internal Links Engine', icon: <Network size={17} /> },
    { id: 'layout', label: 'Homepage Layout', icon: <Layout size={17} /> },
    { id: 'pages', label: 'Pages & SEO Meta', icon: <FileText size={17} /> },
    { id: 'affiliates', label: 'Affiliate Links', icon: <Link2 size={17} /> },
    { id: 'settings', label: 'System Settings', icon: <Settings size={17} /> },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      {/* Fixed 280px Dark Sidebar (cPanel Style) */}
      <aside
        style={{
          width: '280px',
          backgroundColor: '#0F172A',
          color: '#F8FAFC',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          borderRight: '1px solid #1E293B',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 40
        }}
      >
        {/* Sidebar Brand Header */}
        <div style={{ padding: '20px', borderBottom: '1px solid #1E293B' }}>
          <div className="flex items-center gap-xs" style={{ marginBottom: '4px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 800, fontSize: '0.85rem' }}>
              BC
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.02em', color: '#FFFFFF' }}>
              BEST BUY CART
            </span>
          </div>
          <div style={{ fontSize: '0.72rem', color: '#94A3B8', paddingLeft: '34px' }}>
            Master Administration CMS
          </div>
        </div>

        {/* Sidebar Navigation Links */}
        <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: '2px', overflowY: 'auto' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748B', padding: '6px 12px 2px' }}>
            Control Modules
          </div>

          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '7px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: isActive ? '#2563EB' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#94A3B8',
                  fontSize: '0.81rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div style={{ padding: '12px 10px', borderTop: '1px solid #1E293B', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <button
            onClick={() => navigate('/')}
            className="btn btn-ghost btn-sm"
            style={{ color: '#94A3B8', justifyContent: 'flex-start', gap: '10px', fontSize: '0.8rem', padding: '6px 12px' }}
          >
            <ExternalLink size={14} />
            <span>View Public Website</span>
          </button>

          <button
            onClick={logout}
            className="btn btn-ghost btn-sm"
            style={{ color: '#F87171', justifyContent: 'flex-start', gap: '10px', fontSize: '0.8rem', padding: '6px 12px' }}
          >
            <LogOut size={14} />
            <span>Sign Out (/shohan)</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Header Bar */}
        <header
          style={{
            height: '60px',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            position: 'sticky',
            top: 0,
            zIndex: 30
          }}
        >
          <div className="flex items-center gap-xs" style={{ fontSize: '0.84rem', color: '#6B7280' }}>
            <span>Admin</span>
            <ChevronRight size={13} />
            <span style={{ color: '#1A1A1A', fontWeight: 700, textTransform: 'capitalize' }}>
              {activeTab}
            </span>
          </div>

          <div className="flex items-center gap-md">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#ECFDF5', color: '#059669', padding: '3px 10px', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700 }}>
              <Shield size={12} /> Supabase RLS Protected
            </span>

            <button
              onClick={() => navigate('/')}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <ExternalLink size={13} />
              <span>Public Storefront</span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main style={{ flex: 1, padding: '32px', maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
          {activeTab === 'dashboard' && <AdminDashboardOverview />}
          {activeTab === 'products' && <AdminProductList categories={categories} />}
          {activeTab === 'importer' && <AdminBulkImporter />}
          {activeTab === 'menu' && <AdminMenuManager />}
          {activeTab === 'users' && <AdminUserManager />}
          {activeTab === 'reviews' && <AdminReviewManager />}
          {activeTab === 'comments' && <AdminCommentManager />}
          {activeTab === 'loyalty' && <AdminLoyaltyManager />}
          {activeTab === 'content' && <AdminContentManager />}
          {activeTab === 'seointelligence' && <AdminSEOIntelligence />}
          {activeTab === 'contentrefresh' && <AdminContentRefreshManager />}
          {activeTab === 'knowledgegraph' && <AdminKnowledgeGraphManager />}
          {activeTab === 'deals' && <AdminDealsManager />}
          {activeTab === 'pricetracking' && <AdminPriceTrackingManager />}
          {activeTab === 'pricealerts' && <AdminPriceAlertsManager />}
          {activeTab === 'giftfinder' && <AdminGiftFinderManager />}
          {activeTab === 'giftrules' && <AdminGiftRulesManager />}
          {activeTab === 'airecommendations' && <AdminRecommendationSettings />}
          {activeTab === 'recanalytics' && <AdminRecommendationAnalytics />}
          {activeTab === 'comparisons' && <AdminComparisonManager />}
          {activeTab === 'discovery' && <AdminDiscoveryManager />}
          {activeTab === 'seasonal' && <AdminSeasonalManager />}
          {activeTab === 'newsletter' && <AdminNewsletterManager />}
          {activeTab === 'backlinks' && <AdminBacklinkManager />}
          {activeTab === 'internallinks' && <AdminInternalLinkManager />}
          {activeTab === 'layout' && <AdminLayoutManager />}
          {activeTab === 'pages' && <AdminPagesManager />}
          {activeTab === 'affiliates' && <AdminAffiliateManager />}
          {activeTab === 'settings' && <AdminSettingsView />}
        </main>
      </div>
    </div>
  );
};
