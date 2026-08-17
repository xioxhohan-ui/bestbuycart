import React, { useState, useEffect } from 'react';
import { NavMenuItem, MenuLocation } from '../../types/navigation';
import { menuService } from '../../services/menuService';
import { AdminMenuItemModal } from './AdminMenuItemModal';
import {
  Layers,
  Plus,
  Eye,
  EyeOff,
  Edit2,
  Trash2,
  MoveUp,
  MoveDown,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Button } from '../ui/Button';

export const AdminMenuManager: React.FC = () => {
  const [activeLocation, setActiveLocation] = useState<MenuLocation>('main');
  const [menuItems, setMenuItems] = useState<NavMenuItem[]>([]);
  const [rawItems, setRawItems] = useState<NavMenuItem[]>([]);
  const [editingItem, setEditingItem] = useState<NavMenuItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [noticeMsg, setNoticeMsg] = useState<string | null>(null);

  const loadData = async () => {
    const tree = await menuService.getMenu(activeLocation);
    const raw = await menuService.getAllRawItems(activeLocation);
    setMenuItems(tree);
    setRawItems(raw);
  };

  useEffect(() => {
    loadData();
  }, [activeLocation]);

  const handleToggleActive = async (id: string) => {
    await menuService.toggleItemActive(id);
    await loadData();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this menu item and its sub-items?')) {
      await menuService.deleteMenuItem(id);
      await loadData();
    }
  };

  const handleMoveOrder = async (item: NavMenuItem, direction: 'up' | 'down') => {
    const siblings = rawItems
      .filter((i) => (item.parentId ? i.parentId === item.parentId : !i.parentId))
      .sort((a, b) => a.displayOrder - b.displayOrder);

    const index = siblings.findIndex((i) => i.id === item.id);
    if (index === -1) return;

    if (direction === 'up' && index > 0) {
      const prev = siblings[index - 1];
      const tempOrder = item.displayOrder;
      await menuService.updateMenuItem(item.id, { displayOrder: prev.displayOrder });
      await menuService.updateMenuItem(prev.id, { displayOrder: tempOrder });
    } else if (direction === 'down' && index < siblings.length - 1) {
      const next = siblings[index + 1];
      const tempOrder = item.displayOrder;
      await menuService.updateMenuItem(item.id, { displayOrder: next.displayOrder });
      await menuService.updateMenuItem(next.id, { displayOrder: tempOrder });
    }

    await loadData();
  };

  const handleSaveModal = async (data: any) => {
    if (data.id) {
      await menuService.updateMenuItem(data.id, data);
      setNoticeMsg('Menu item updated successfully.');
    } else {
      await menuService.addMenuItem(data);
      setNoticeMsg('New menu item added successfully.');
    }
    setTimeout(() => setNoticeMsg(null), 3000);
    await loadData();
  };

  const handleResetDefault = async () => {
    if (confirm('Reset menu structure to factory defaults?')) {
      await menuService.resetToDefault();
      setNoticeMsg('Reset menu structure to default presets.');
      setTimeout(() => setNoticeMsg(null), 3000);
      await loadData();
    }
  };

  const handleExportJSON = () => {
    const jsonStr = menuService.exportMenuJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `best-buy-cart-menu-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (evt) => {
        const content = evt.target?.result as string;
        const success = menuService.importMenuJSON(content);
        if (success) {
          setNoticeMsg('Imported menu configuration successfully.');
          await loadData();
        } else {
          alert('Invalid menu JSON file structure.');
        }
      };
      reader.readAsText(file);
    }
  };

  // Render tree node
  const renderTreeNodes = (nodes: NavMenuItem[], depth = 0) => {
    return nodes.map((node) => (
      <React.Fragment key={node.id}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            paddingLeft: `${16 + depth * 28}px`,
            backgroundColor: depth === 0 ? '#FFFFFF' : '#F8FAFC',
            borderBottom: '1px solid #F1F5F9',
            borderLeft: depth > 0 ? '3px solid #CBD5E1' : 'none'
          }}
        >
          <div className="flex items-center gap-sm">
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#94A3B8', fontFamily: 'monospace' }}>
              #{node.displayOrder}
            </span>
            <div style={{ fontWeight: 800, fontSize: '0.9rem', color: node.isActive ? '#1A1A1A' : '#94A3B8' }}>
              {depth > 0 && <span style={{ color: '#94A3B8', marginRight: '4px' }}>↳</span>}
              {node.title}
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748B', fontFamily: 'monospace', backgroundColor: '#F1F5F9', padding: '2px 6px', borderRadius: '4px' }}>
              {node.url}
            </span>
            {node.linkType === 'category' && (
              <span style={{ fontSize: '0.68rem', fontWeight: 700, backgroundColor: '#ECFDF5', color: '#059669', padding: '2px 6px', borderRadius: '4px' }}>
                Mega Category
              </span>
            )}
          </div>

          <div className="flex items-center gap-xs">
            {/* Position Order Up/Down */}
            <button
              onClick={() => handleMoveOrder(node, 'up')}
              style={{ background: 'none', border: '1px solid #E2E8F0', borderRadius: '4px', padding: '3px', cursor: 'pointer', color: '#64748B' }}
              title="Move Up"
            >
              <MoveUp size={12} />
            </button>
            <button
              onClick={() => handleMoveOrder(node, 'down')}
              style={{ background: 'none', border: '1px solid #E2E8F0', borderRadius: '4px', padding: '3px', cursor: 'pointer', color: '#64748B' }}
              title="Move Down"
            >
              <MoveDown size={12} />
            </button>

            {/* Visibility toggle */}
            <button
              onClick={() => handleToggleActive(node.id)}
              style={{
                background: 'none',
                border: `1px solid ${node.isActive ? '#A7F3D0' : '#FECACA'}`,
                borderRadius: '4px',
                padding: '3px 8px',
                cursor: 'pointer',
                color: node.isActive ? '#059669' : '#DC2626',
                fontSize: '0.72rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px'
              }}
            >
              {node.isActive ? <Eye size={12} /> : <EyeOff size={12} />}
              <span>{node.isActive ? 'Active' : 'Hidden'}</span>
            </button>

            {/* Edit */}
            <button
              onClick={() => setEditingItem(node)}
              style={{ background: 'none', border: '1px solid #CBD5E1', borderRadius: '4px', padding: '3px 8px', cursor: 'pointer', color: '#2563EB', fontSize: '0.75rem', fontWeight: 600 }}
              title="Edit Item"
            >
              <Edit2 size={12} />
            </button>

            {/* Delete */}
            <button
              onClick={() => handleDelete(node.id)}
              style={{ background: 'none', border: '1px solid #CBD5E1', borderRadius: '4px', padding: '3px', cursor: 'pointer', color: '#DC2626' }}
              title="Delete Item"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>

        {node.children && node.children.length > 0 && renderTreeNodes(node.children, depth + 1)}
      </React.Fragment>
    ));
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div className="flex items-center gap-xs" style={{ marginBottom: '4px' }}>
            <Layers size={22} style={{ color: '#2563EB' }} />
            <h2 className="h2" style={{ margin: 0 }}>
              NAVIGATION & MEGA MENU BUILDER
            </h2>
          </div>
          <p style={{ color: '#64748B', margin: 0, fontSize: '0.9rem' }}>
            Drag-and-drop hierarchy builder, custom link types, dynamic category tree sync, and visibility controls.
          </p>
        </div>

        <div className="flex items-center gap-xs">
          <Button variant="primary" size="md" icon={<Plus size={15} />} onClick={() => setIsAddModalOpen(true)}>
            Add Menu Item
          </Button>
        </div>
      </div>

      {noticeMsg && (
        <div className="flex items-center gap-xs" style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', color: '#059669', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '20px' }}>
          <CheckCircle2 size={16} />
          <span>{noticeMsg}</span>
        </div>
      )}

      {/* Menu Location Switcher Tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 16px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid var(--border-default)',
          boxShadow: 'var(--shadow-xs)',
          marginBottom: '24px'
        }}
      >
        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', marginRight: '8px', textTransform: 'uppercase' }}>
          Menu Location:
        </span>

        {[
          { location: 'main' as MenuLocation, label: 'Main Desktop Navigation Bar' },
          { location: 'mobile' as MenuLocation, label: 'Mobile Drawer Menu' },
          { location: 'footer' as MenuLocation, label: 'Footer Links' },
        ].map((tab) => {
          const isActive = activeLocation === tab.location;
          return (
            <button
              key={tab.location}
              onClick={() => setActiveLocation(tab.location)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: isActive ? 800 : 600,
                backgroundColor: isActive ? '#EFF6FF' : 'transparent',
                color: isActive ? '#2563EB' : '#64748B',
                border: `1px solid ${isActive ? '#BFDBFE' : 'transparent'}`,
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Hierarchical Tree Container */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid var(--border-default)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-card)',
          marginBottom: '24px'
        }}
      >
        <div style={{ padding: '14px 20px', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
          <span>Hierarchy & Menu Label</span>
          <span>Position & Actions</span>
        </div>

        <div>{renderTreeNodes(menuItems)}</div>
      </div>

      {/* Bottom Actions Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '16px 20px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid var(--border-default)',
          boxShadow: 'var(--shadow-xs)'
        }}
      >
        <div className="flex items-center gap-xs">
          <Button variant="secondary" size="sm" icon={<Download size={14} />} onClick={handleExportJSON}>
            Export Menu JSON
          </Button>

          <label className="btn btn-secondary btn-sm" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Upload size={14} />
            <span>Import JSON</span>
            <input type="file" accept=".json" onChange={handleImportJSON} style={{ display: 'none' }} />
          </label>
        </div>

        <Button variant="ghost" size="sm" icon={<RotateCcw size={14} />} onClick={handleResetDefault} style={{ color: '#DC2626' }}>
          Reset to Factory Presets
        </Button>
      </div>

      {/* Modal for Edit */}
      {editingItem && (
        <AdminMenuItemModal
          item={editingItem}
          parentItems={rawItems.filter((i) => !i.parentId)}
          location={activeLocation}
          onClose={() => setEditingItem(null)}
          onSave={handleSaveModal}
        />
      )}

      {/* Modal for Add */}
      {isAddModalOpen && (
        <AdminMenuItemModal
          item={null}
          parentItems={rawItems.filter((i) => !i.parentId)}
          location={activeLocation}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveModal}
        />
      )}
    </div>
  );
};
