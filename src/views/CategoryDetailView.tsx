import React, { useEffect, useState, useMemo } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useCountry } from '../context/CountryContext';
import { categoryService } from '../services/categoryService';
import { productService } from '../services/productService';
import { Category, Subcategory } from '../types/category';
import { Product } from '../types/product';
import { ProductCard } from '../components/product/ProductCard';
import { SubcategoryPillBar } from '../components/category/SubcategoryPillBar';
import { QuickFilterStrip, QuickFilterPreset } from '../components/category/QuickFilterStrip';
import { CategoryFilterSidebar, FilterState } from '../components/category/CategoryFilterSidebar';
import { CategoryEditorPicks } from '../components/category/CategoryEditorPicks';
import { QuickPicksStrip } from '../components/category/QuickPicksStrip';
import { CategoryTopicCluster } from '../components/category/CategoryTopicCluster';
import { SEED_GUIDES } from '../data/seedGuides';
import {
  ChevronRight,
  SlidersHorizontal,
  LayoutGrid,
  List,
  ArrowUpDown,
  BookOpen,
  Sparkles,
  ArrowRight,
  Compass,
  AlertCircle
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { CategoryIcon } from '../components/ui/CategoryIcon';
import { updatePageSEO } from '../utils/seo';

export const CategoryDetailView: React.FC = () => {
  const {
    selectedCategorySlug,
    selectedSubcategorySlug,
    selectedUnderPricePreset,
    navigate,
    clearCategoryFilters
  } = useNavigation();
  const { currentCountry, formatPrice } = useCountry();

  const [category, setCategory] = useState<Category | null>(null);
  const [allCategoryProducts, setAllCategoryProducts] = useState<Product[]>([]);
  const [editorPicks, setEditorPicks] = useState<{
    bestOverall?: Product;
    bestBudget?: Product;
    hiddenGem?: Product;
    overhyped?: Product;
  }>({});

  // View state
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'relevance' | 'price_asc' | 'price_desc' | 'rating' | 'hype' | 'worth'>('relevance');
  const [quickFilter, setQuickFilter] = useState<QuickFilterPreset>('all');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Faceted Filter State
  const [filters, setFilters] = useState<FilterState>({
    minPrice: '',
    maxPrice: selectedUnderPricePreset || '',
    selectedBrands: [],
    minRating: 0,
    inStockOnly: false,
    selectedFeatures: []
  });

  const activeCategorySlug = selectedCategorySlug || 'tech';

  useEffect(() => {
    categoryService.getCategoryBySlug(activeCategorySlug).then((cat) => {
      if (cat) {
        setCategory(cat);
        const pageTitle = selectedUnderPricePreset
          ? `Best ${cat.name} Under $${selectedUnderPricePreset}`
          : selectedSubcategorySlug
          ? `${selectedSubcategorySlug.toUpperCase()} — ${cat.name}`
          : `${cat.name} Products — Best Picks & Reviews`;
        updatePageSEO(pageTitle, cat.description);
      }
    });

    productService.getProductsByCategory(activeCategorySlug).then(setAllCategoryProducts);
    categoryService.getEditorPicksForCategory(activeCategorySlug).then(setEditorPicks);
  }, [activeCategorySlug, selectedSubcategorySlug, selectedUnderPricePreset]);

  // Sync quick filter preset with under price preset
  useEffect(() => {
    if (selectedUnderPricePreset) {
      if (selectedUnderPricePreset === 50) setQuickFilter('under-50');
      else if (selectedUnderPricePreset === 100) setQuickFilter('under-100');
      else if (selectedUnderPricePreset === 250) setQuickFilter('under-250');
      setFilters((prev) => ({ ...prev, maxPrice: selectedUnderPricePreset }));
    }
  }, [selectedUnderPricePreset]);

  // Derived available brands and features
  const availableBrands = useMemo(() => {
    const brandMap = new Map<string, number>();
    allCategoryProducts.forEach((p) => {
      brandMap.set(p.brand, (brandMap.get(p.brand) || 0) + 1);
    });
    return Array.from(brandMap.entries()).map(([name, count]) => ({ name, count }));
  }, [allCategoryProducts]);

  const availableFeatures = useMemo(() => {
    const featureSet = new Set<string>();
    allCategoryProducts.forEach((p) => {
      p.features?.forEach((f) => featureSet.add(f));
    });
    return Array.from(featureSet);
  }, [allCategoryProducts]);

  // Active subcategory details if selected
  const activeSubcategory = useMemo(() => {
    if (!category || !selectedSubcategorySlug) return null;
    return category.subcategories.find((s) => s.slug === selectedSubcategorySlug) || null;
  }, [category, selectedSubcategorySlug]);

  // Quick picks for active subcategory
  const subcategoryPicks = useMemo(() => {
    if (!activeSubcategory) return null;
    return {
      topPick: allCategoryProducts.find((p) => p.id === activeSubcategory.topPickId) || allCategoryProducts[0],
      budgetPick: allCategoryProducts.find((p) => p.id === activeSubcategory.budgetPickId) || allCategoryProducts[1],
      premiumPick: allCategoryProducts.find((p) => p.id === activeSubcategory.premiumPickId) || allCategoryProducts[2],
    };
  }, [activeSubcategory, allCategoryProducts]);

  // Handle quick filter change
  const handleQuickFilterChange = (preset: QuickFilterPreset) => {
    setQuickFilter(preset);
    if (preset === 'all') {
      setFilters((prev) => ({ ...prev, minPrice: '', maxPrice: '' }));
      navigate('/category-detail', { categorySlug: activeCategorySlug, subcategorySlug: selectedSubcategorySlug || undefined });
    } else if (preset === 'under-50') {
      setFilters((prev) => ({ ...prev, maxPrice: 50 }));
      navigate('/category-detail', { categorySlug: activeCategorySlug, underPricePreset: 50 });
    } else if (preset === 'under-100') {
      setFilters((prev) => ({ ...prev, maxPrice: 100 }));
      navigate('/category-detail', { categorySlug: activeCategorySlug, underPricePreset: 100 });
    } else if (preset === 'under-250') {
      setFilters((prev) => ({ ...prev, maxPrice: 250 }));
      navigate('/category-detail', { categorySlug: activeCategorySlug, underPricePreset: 250 });
    } else if (preset === 'best-sellers') {
      setFilters((prev) => ({ ...prev, minRating: 4 }));
    }
  };

  const handleResetFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      selectedBrands: [],
      minRating: 0,
      inStockOnly: false,
      selectedFeatures: []
    });
    setQuickFilter('all');
    clearCategoryFilters();
  };

  // Filtered & Sorted Products computation
  const filteredProducts = useMemo(() => {
    return allCategoryProducts.filter((p) => {
      // Subcategory filter
      if (selectedSubcategorySlug && p.subcategoryId !== selectedSubcategorySlug) {
        return false;
      }

      // Price filter
      const convertedPrice = p.priceUSD * currentCountry.rateToUSD;
      if (filters.minPrice !== '' && convertedPrice < Number(filters.minPrice)) return false;
      if (filters.maxPrice !== '' && convertedPrice > Number(filters.maxPrice)) return false;

      // Brand filter
      if (filters.selectedBrands.length > 0 && !filters.selectedBrands.includes(p.brand)) {
        return false;
      }

      // Rating filter
      if (filters.minRating > 0 && p.rating < filters.minRating) {
        return false;
      }

      // In-stock filter
      if (filters.inStockOnly && p.inStock === false) {
        return false;
      }

      // Features filter
      if (filters.selectedFeatures.length > 0) {
        const hasFeature = filters.selectedFeatures.some((f) => p.features?.includes(f));
        if (!hasFeature) return false;
      }

      // Quick filter preset overrides
      if (quickFilter === 'rising' && !p.isRising) return false;

      return true;
    });
  }, [allCategoryProducts, selectedSubcategorySlug, filters, quickFilter, currentCountry]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price_asc') list.sort((a, b) => a.priceUSD - b.priceUSD);
    else if (sortBy === 'price_desc') list.sort((a, b) => b.priceUSD - a.priceUSD);
    else if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'hype') list.sort((a, b) => b.hypeScore - a.hypeScore);
    else if (sortBy === 'worth') list.sort((a, b) => b.worthScore - a.worthScore);
    return list;
  }, [filteredProducts, sortBy]);

  // Contextual guides for category
  const categoryGuides = SEED_GUIDES.filter(
    (g) => g.category.toLowerCase().includes(activeCategorySlug) || activeCategorySlug === 'tech'
  );

  return (
    <div style={{ padding: '32px 0 80px' }}>
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div
          className="flex items-center gap-xs"
          style={{ fontSize: '0.8rem', color: '#6B7280', marginBottom: '20px', flexWrap: 'wrap' }}
        >
          <span
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer', color: '#2563EB', fontWeight: 500 }}
          >
            Home
          </span>
          <ChevronRight size={13} />
          <span
            onClick={() => navigate('/categories')}
            style={{ cursor: 'pointer', color: '#2563EB', fontWeight: 500 }}
          >
            Categories
          </span>
          <ChevronRight size={13} />
          <span
            onClick={() => {
              clearCategoryFilters();
              navigate('/category-detail', { categorySlug: activeCategorySlug });
            }}
            style={{
              cursor: selectedSubcategorySlug ? 'pointer' : 'default',
              color: selectedSubcategorySlug ? '#2563EB' : '#1A1A1A',
              fontWeight: 600
            }}
          >
            {category?.name || activeCategorySlug.toUpperCase()}
          </span>
          {activeSubcategory && (
            <>
              <ChevronRight size={13} />
              <span style={{ color: '#1A1A1A', fontWeight: 700 }}>
                {activeSubcategory.name}
              </span>
            </>
          )}
          {selectedUnderPricePreset && (
            <>
              <ChevronRight size={13} />
              <span style={{ color: '#2563EB', fontWeight: 700 }}>
                Under ${selectedUnderPricePreset}
              </span>
            </>
          )}
        </div>

        {/* 1. Category Header / Programmatic Under-X Banner */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid var(--border-default)',
            padding: '32px',
            boxShadow: 'var(--shadow-card)',
            marginBottom: '32px'
          }}
        >
          <div className="flex items-start gap-md flex-wrap">
            <div style={{ width: '60px', height: '60px', borderRadius: '16px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1.5px solid #BFDBFE' }}>
              <CategoryIcon slugOrId={category?.slug || category?.id || 'tech'} size={32} color="#2563EB" />
            </div>

            <div style={{ flex: 1, minWidth: '260px' }}>
              {/* Dynamic H1 Headline */}
              <h1 className="h1" style={{ margin: '0 0 6px', color: '#1A1A1A' }}>
                {selectedUnderPricePreset
                  ? `Best ${category?.name} Under $${selectedUnderPricePreset}`
                  : activeSubcategory?.heroHeadline || `${category?.name || 'Category'} — Best Picks & Reviews`}
              </h1>

              <p style={{ color: '#4B5563', margin: 0, fontSize: '0.95rem', lineHeight: 1.5, maxWidth: '780px' }}>
                {selectedUnderPricePreset
                  ? `High-quality ${category?.name.toLowerCase()} that won't break the bank. Evaluated for build quality and real-world durability.`
                  : activeSubcategory?.heroSubtitle || category?.description}
              </p>
            </div>
          </div>

          {/* Compare Price Ranges Bar (Under-X System) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '20px',
              paddingTop: '16px',
              borderTop: '1px solid #F0F1F3',
              fontSize: '0.8rem',
              color: '#6B7280',
              flexWrap: 'wrap'
            }}
          >
            <span style={{ fontWeight: 600 }}>Compare Price Ranges:</span>
            {[25, 50, 100, 250].map((bracket) => (
              <button
                key={bracket}
                onClick={() => handleQuickFilterChange(`under-${bracket}` as any)}
                style={{
                  padding: '3px 10px',
                  borderRadius: '999px',
                  border: `1px solid ${selectedUnderPricePreset === bracket ? '#2563EB' : '#E5E7EB'}`,
                  backgroundColor: selectedUnderPricePreset === bracket ? '#EFF6FF' : '#FFFFFF',
                  color: selectedUnderPricePreset === bracket ? '#2563EB' : '#4B5563',
                  fontSize: '0.75rem',
                  fontWeight: selectedUnderPricePreset === bracket ? 700 : 500,
                  cursor: 'pointer'
                }}
              >
                Under ${bracket}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Subcategory Navigation Carousel */}
        {category && category.subcategories.length > 0 && (
          <SubcategoryPillBar
            categorySlug={category.slug}
            subcategories={category.subcategories}
            activeSubcategorySlug={selectedSubcategorySlug}
            onSelectSubcategory={(subSlug) => {
              navigate('/category-detail', {
                categorySlug: activeCategorySlug,
                subcategorySlug: subSlug || undefined
              });
            }}
            totalProductCount={allCategoryProducts.length}
          />
        )}

        {/* 3. Subcategory Top 3 Quick Picks (if active subcategory) */}
        {activeSubcategory && subcategoryPicks && (
          <QuickPicksStrip
            topPick={subcategoryPicks.topPick}
            budgetPick={subcategoryPicks.budgetPick}
            premiumPick={subcategoryPicks.premiumPick}
          />
        )}

        {/* 4. Quick Filters Strip (Above the fold) */}
        <QuickFilterStrip
          activePreset={quickFilter}
          onSelectPreset={handleQuickFilterChange}
        />

        {/* 5. Main Content Area: Sidebar + Grid */}
        <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
          {/* Left Faceted Navigation Sidebar (Desktop) */}
          <CategoryFilterSidebar
            availableBrands={availableBrands}
            availableFeatures={availableFeatures}
            filters={filters}
            onFilterChange={setFilters}
            onResetFilters={handleResetFilters}
            isMobileDrawerOpen={isMobileDrawerOpen}
            onCloseMobileDrawer={() => setIsMobileDrawerOpen(false)}
          />

          {/* Right Product Grid Column */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Top Toolbar (Item Count, Sort, View Toggle, Mobile Filter Trigger) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                paddingBottom: '16px',
                marginBottom: '20px',
                borderBottom: '1px solid var(--border-default)',
                flexWrap: 'wrap'
              }}
            >
              {/* Count & Active Filters Indicator */}
              <div style={{ fontSize: '0.88rem', color: '#4B5563' }}>
                Showing <strong style={{ color: '#1A1A1A' }}>{sortedProducts.length}</strong> products
                {filters.selectedBrands.length > 0 && ` across ${filters.selectedBrands.join(', ')}`}
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-sm">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setIsMobileDrawerOpen(true)}
                  className="btn btn-secondary btn-sm hide-desktop"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <SlidersHorizontal size={14} />
                  <span>Filters</span>
                </button>

                {/* Sort Selector */}
                <div className="flex items-center gap-xs">
                  <ArrowUpDown size={13} style={{ color: '#6B7280' }} />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    style={{
                      padding: '6px 10px',
                      borderRadius: '8px',
                      border: '1px solid #D1D5DB',
                      backgroundColor: '#FFFFFF',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#1A1A1A',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="relevance">Sort: Relevance</option>
                    <option value="worth">Highest Worth Score</option>
                    <option value="hype">Highest Hype Score</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                  </select>
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-2xs hide-mobile" style={{ border: '1px solid #E5E7EB', borderRadius: '8px', padding: '2px', backgroundColor: '#F8FAFC' }}>
                  <button
                    onClick={() => setViewMode('grid')}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: viewMode === 'grid' ? '#FFFFFF' : 'transparent',
                      color: viewMode === 'grid' ? '#2563EB' : '#6B7280',
                      boxShadow: viewMode === 'grid' ? 'var(--shadow-xs)' : 'none',
                      cursor: 'pointer'
                    }}
                    title="Grid View"
                  >
                    <LayoutGrid size={15} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: viewMode === 'list' ? '#FFFFFF' : 'transparent',
                      color: viewMode === 'list' ? '#2563EB' : '#6B7280',
                      boxShadow: viewMode === 'list' ? 'var(--shadow-xs)' : 'none',
                      cursor: 'pointer'
                    }}
                    title="List View"
                  >
                    <List size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Cards Container */}
            {sortedProducts.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid-products' : 'flex flex-col gap-md'}>
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    variant={viewMode === 'list' ? 'horizontal' : 'default'}
                  />
                ))}
              </div>
            ) : (
              /* Thin Content Guardrail */
              <div
                style={{
                  textAlign: 'center',
                  padding: '60px 32px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1.5px dashed #CBD5E1'
                }}
              >
                <AlertCircle size={36} style={{ color: '#2563EB', margin: '0 auto 12px' }} />
                <h3 className="h3" style={{ margin: '0 0 8px', color: '#1A1A1A' }}>
                  We're Curating the Best {category?.name || 'Category'} Picks
                </h3>
                <p style={{ color: '#4B5563', fontSize: '0.92rem', maxWidth: '480px', margin: '0 auto 20px', lineHeight: 1.5 }}>
                  Our editorial team is currently testing products in this price bracket and subcategory with verified lab benchmarks and score models.
                </p>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleResetFilters}
                  icon={<ArrowRight size={14} />}
                  iconPosition="right"
                >
                  View All {category?.name} Products
                </Button>
              </div>
            )}

            {/* 6. Editor's Picks Strip (Bottom) */}
            {category && (
              <CategoryEditorPicks
                categoryName={category.name}
                picks={editorPicks}
              />
            )}

            {/* 7. Category Buying Guides */}
            {categoryGuides.length > 0 && (
              <div style={{ marginTop: '56px', paddingTop: '40px', borderTop: '1px solid var(--border-default)' }}>
                <div className="flex items-center gap-xs" style={{ marginBottom: '18px' }}>
                  <BookOpen size={18} style={{ color: '#2563EB' }} />
                  <h3 className="h3" style={{ margin: 0, color: '#1A1A1A' }}>
                    {category?.name} Buying Guides & Advice
                  </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                  {categoryGuides.map((guide) => (
                    <div
                      key={guide.id}
                      onClick={() => navigate('/guides')}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '12px',
                        border: '1px solid #E5E7EB',
                        padding: '18px',
                        boxShadow: 'var(--shadow-card)',
                        cursor: 'pointer'
                      }}
                    >
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#2563EB', textTransform: 'uppercase' }}>
                        {guide.category} • {guide.readTime}
                      </span>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '6px 0 8px', color: '#1A1A1A' }}>
                        {guide.title}
                      </h4>
                      <p style={{ color: '#4B5563', fontSize: '0.82rem', margin: 0, lineHeight: 1.4 }}>
                        {guide.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. SEO Topic Cluster Internal Linking */}
            {category && (
              <CategoryTopicCluster
                categoryName={category.name}
                categorySlug={category.slug}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
