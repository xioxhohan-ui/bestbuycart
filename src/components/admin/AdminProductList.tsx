import React, { useState, useEffect } from 'react';
import { Product } from '../../types/product';
import { Category } from '../../types/category';
import { supabaseService } from '../../services/supabaseService';
import { AdminProductFormModal } from './AdminProductFormModal';
import { useNavigation } from '../../context/NavigationContext';
import { Search, Plus, Edit2, Eye, Trash2, ArrowUpDown, Filter, CheckCircle2, Flame, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';

interface AdminProductListProps {
  categories: Category[];
}

export const AdminProductList: React.FC<AdminProductListProps> = ({ categories }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const { navigate } = useNavigation();

  const loadProducts = () => {
    supabaseService.getProducts().then(setProducts);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      await supabaseService.deleteProduct(id);
      loadProducts();
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div>
      {/* Action Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '24px',
          flexWrap: 'wrap'
        }}
      >
        <div className="flex items-center gap-sm flex-1" style={{ minWidth: '280px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: '#9CA3AF' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by title or brand..."
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                fontSize: '0.88rem',
                outline: 'none',
                backgroundColor: '#FFFFFF'
              }}
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #D1D5DB',
              fontSize: '0.88rem',
              backgroundColor: '#FFFFFF',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setIsCreatingNew(true)}
          icon={<Plus size={16} />}
        >
          Add New Product
        </Button>
      </div>

      {/* Product Table */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-card)'
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#4B5563', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <th style={{ padding: '12px 16px', width: '40px' }}>#</th>
              <th style={{ padding: '12px 16px', width: '60px' }}>Image</th>
              <th style={{ padding: '12px 16px' }}>Product Title</th>
              <th style={{ padding: '12px 16px' }}>Category</th>
              <th style={{ padding: '12px 16px' }}>Price (USD)</th>
              <th style={{ padding: '12px 16px' }}>Hype Score</th>
              <th style={{ padding: '12px 16px' }}>Worth Score</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, idx) => (
              <tr
                key={product.id}
                style={{
                  borderBottom: '1px solid #F1F5F9',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <td style={{ padding: '12px 16px', color: '#9CA3AF' }}>{idx + 1}</td>
                <td style={{ padding: '12px 16px' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '6px', backgroundColor: '#F8FAFC' }}
                  />
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ fontWeight: 700, color: '#1A1A1A' }}>{product.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Brand: {product.brand}</div>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ backgroundColor: '#EFF6FF', color: '#2563EB', padding: '2px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase' }}>
                    {product.category}
                  </span>
                </td>
                <td className="font-mono" style={{ padding: '12px 16px', fontWeight: 700, color: '#1A1A1A' }}>
                  ${product.priceUSD.toFixed(2)}
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', color: '#EA580C', fontWeight: 800 }}>
                    <Flame size={13} /> {product.hypeScore}%
                  </span>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', color: '#059669', fontWeight: 800 }}>
                    <ShieldCheck size={13} /> {product.worthScore}%
                  </span>
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                  <div className="flex items-center justify-end gap-xs">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="btn btn-ghost btn-sm"
                      style={{ padding: '4px 6px', color: '#2563EB' }}
                      title="Edit Product"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => navigate('/product-detail', { product })}
                      className="btn btn-ghost btn-sm"
                      style={{ padding: '4px 6px', color: '#4B5563' }}
                      title="View Public Page"
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className="btn btn-ghost btn-sm"
                      style={{ padding: '4px 6px', color: '#DC2626' }}
                      title="Delete Product"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      {(isCreatingNew || editingProduct) && (
        <AdminProductFormModal
          product={editingProduct}
          categories={categories}
          allProducts={products}
          onClose={() => {
            setIsCreatingNew(false);
            setEditingProduct(null);
          }}
          onSaved={() => {
            setIsCreatingNew(false);
            setEditingProduct(null);
            loadProducts();
          }}
        />
      )}
    </div>
  );
};
