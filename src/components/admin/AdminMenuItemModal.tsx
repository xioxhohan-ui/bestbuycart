import React, { useState } from 'react';
import { NavMenuItem, MenuLocation, LinkType } from '../../types/navigation';
import { X, Layers, Link2, Eye, ShieldCheck, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface AdminMenuItemModalProps {
  item?: NavMenuItem | null;
  parentItems: NavMenuItem[];
  location: MenuLocation;
  onClose: () => void;
  onSave: (data: Omit<NavMenuItem, 'id'> | Partial<NavMenuItem>) => void;
}

export const AdminMenuItemModal: React.FC<AdminMenuItemModalProps> = ({
  item,
  parentItems,
  location,
  onClose,
  onSave
}) => {
  const [title, setTitle] = useState(item?.title || '');
  const [url, setUrl] = useState(item?.url || '');
  const [linkType, setLinkType] = useState<LinkType>(item?.linkType || 'internal');
  const [icon, setIcon] = useState(item?.icon || 'compass');
  const [parentId, setParentId] = useState<string | undefined>(item?.parentId || undefined);
  const [displayOrder, setDisplayOrder] = useState<number>(item?.displayOrder || 1);
  const [targetBlank, setTargetBlank] = useState<boolean>(item?.targetBlank || false);
  const [nofollow, setNofollow] = useState<boolean>(item?.nofollow || false);
  const [isActive, setIsActive] = useState<boolean>(item?.isActive ?? true);
  const [showFor, setShowFor] = useState<'all' | 'logged_in' | 'logged_out' | 'admin'>(item?.showFor || 'all');
  const [tooltip, setTooltip] = useState(item?.tooltip || '');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const iconPresets = [
    { name: 'home', label: 'Home' },
    { name: 'grid', label: 'Categories' },
    { name: 'compass', label: 'Discover' },
    { name: 'sword', label: 'Compare' },
    { name: 'percent', label: 'Deals' },
    { name: 'gift', label: 'Gift Finder' },
    { name: 'gem', label: 'Hidden Gems' },
    { name: 'alert-triangle', label: 'Overhyped' },
    { name: 'flame', label: 'Trending' },
    { name: 'star', label: 'Worth It' },
    { name: 'brain', label: 'AI Finder' },
    { name: 'bell', label: 'Price Alert' },
    { name: 'bar-chart', label: 'Tracker' },
    { name: 'settings', label: 'Tools' },
    { name: 'book', label: 'Guides' },
    { name: 'share', label: 'Share' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) {
      setErrorMsg('Please provide a menu title and URL link.');
      return;
    }

    onSave({
      ...(item ? { id: item.id } : {}),
      menuId: `menu-${location}`,
      parentId: parentId || undefined,
      title: title.trim(),
      url: url.trim(),
      linkType,
      icon,
      displayOrder: Number(displayOrder),
      targetBlank,
      nofollow,
      isActive,
      showFor,
      tooltip: tooltip.trim() || undefined
    });

    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          maxWidth: '620px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #E2E8F0',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F8FAFC'
          }}
        >
          <div className="flex items-center gap-xs">
            <Layers size={18} style={{ color: '#2563EB' }} />
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#1A1A1A' }}>
              {item ? `Edit Menu Item: ${item.title}` : `Add New Menu Item (${location.toUpperCase()} MENU)`}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', padding: '4px', borderRadius: '6px' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {errorMsg && (
            <div className="flex items-center gap-xs" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '10px 14px', borderRadius: '8px', fontSize: '0.82rem' }}>
              <AlertCircle size={15} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Section 1: Basic Information */}
          <div style={{ paddingBottom: '14px', borderBottom: '1px solid #F1F5F9' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', marginBottom: '10px' }}>
              BASIC INFORMATION
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', marginBottom: '4px' }}>
                  Menu Item Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hidden Gems"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', marginBottom: '4px' }}>
                  Lucide Icon Preset
                </label>
                <select
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none', backgroundColor: '#FFFFFF' }}
                >
                  {iconPresets.map((p) => (
                    <option key={p.name} value={p.name}>
                      {p.label} ({p.name})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', marginBottom: '4px' }}>
                  URL / Target Link *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. /discover/hidden-gems or https://..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', marginBottom: '4px' }}>
                  Link Type
                </label>
                <select
                  value={linkType}
                  onChange={(e) => setLinkType(e.target.value as LinkType)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none', backgroundColor: '#FFFFFF' }}
                >
                  <option value="internal">Internal URL</option>
                  <option value="external">External Link</option>
                  <option value="category">Category Hub</option>
                  <option value="custom">Custom Link</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Hierarchy & Position */}
          <div style={{ paddingBottom: '14px', borderBottom: '1px solid #F1F5F9' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', marginBottom: '10px' }}>
              PARENT & POSITIONING
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', marginBottom: '4px' }}>
                  Parent Item (Submenu level)
                </label>
                <select
                  value={parentId || ''}
                  onChange={(e) => setParentId(e.target.value || undefined)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none', backgroundColor: '#FFFFFF' }}
                >
                  <option value="">None (Top Level Root Item)</option>
                  {parentItems
                    .filter((p) => p.id !== item?.id)
                    .map((p) => (
                      <option key={p.id} value={p.id}>
                        ↳ {p.title}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', marginBottom: '4px' }}>
                  Display Order
                </label>
                <input
                  type="number"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(Number(e.target.value))}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Visibility & Targeting */}
          <div style={{ paddingBottom: '14px', borderBottom: '1px solid #F1F5F9' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', marginBottom: '10px' }}>
              VISIBILITY & TARGETING
            </div>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '10px' }}>
              <label className="flex items-center gap-xs" style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  style={{ accentColor: '#2563EB', width: '16px', height: '16px' }}
                />
                <span>Active (Visible on frontend)</span>
              </label>

              <label className="flex items-center gap-xs" style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={targetBlank}
                  onChange={(e) => setTargetBlank(e.target.checked)}
                  style={{ accentColor: '#2563EB', width: '16px', height: '16px' }}
                />
                <span>Open in new tab (`target="_blank"`)</span>
              </label>

              <label className="flex items-center gap-xs" style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={nofollow}
                  onChange={(e) => setNofollow(e.target.checked)}
                  style={{ accentColor: '#2563EB', width: '16px', height: '16px' }}
                />
                <span>Add `rel="nofollow"`</span>
              </label>
            </div>
          </div>

          {/* Section 4: Advanced SEO */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', marginBottom: '6px' }}>
              ADVANCED SEO TOOLTIP
            </div>
            <input
              type="text"
              placeholder="e.g. High value underrated products with high worth scores"
              value={tooltip}
              onChange={(e) => setTooltip(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', outline: 'none' }}
            />
          </div>

          <div className="flex items-center justify-end gap-sm" style={{ marginTop: '10px', paddingTop: '16px', borderTop: '1px solid #F1F5F9' }}>
            <Button type="button" variant="ghost" size="md" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              {item ? 'Save Item Changes' : 'Add Menu Item'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
