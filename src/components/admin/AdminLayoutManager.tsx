import React, { useState, useEffect } from 'react';
import { LayoutSection } from '../../types/admin';
import { supabaseService } from '../../services/supabaseService';
import { Layout, ArrowUp, ArrowDown, Check, Eye, EyeOff, GripVertical, Settings2 } from 'lucide-react';
import { Button } from '../ui/Button';

export const AdminLayoutManager: React.FC = () => {
  const [sections, setSections] = useState<LayoutSection[]>([]);

  const loadSections = () => {
    supabaseService.getLayoutSections().then(setSections);
  };

  useEffect(() => {
    loadSections();
  }, []);

  const handleToggleStatus = async (section: LayoutSection) => {
    const updated: LayoutSection = {
      ...section,
      status: section.status === 'active' ? 'inactive' : 'active'
    };
    await supabaseService.updateLayoutSection(updated);
    loadSections();
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const copy = [...sections];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;

    await supabaseService.reorderLayoutSections(copy);
    loadSections();
  };

  const handleItemCountChange = async (section: LayoutSection, count: number) => {
    const updated = { ...section, itemCount: count };
    await supabaseService.updateLayoutSection(updated);
    loadSections();
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: 'var(--shadow-card)' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
        <div className="flex items-center gap-xs">
          <Layout size={20} style={{ color: '#2563EB' }} />
          <h3 className="h3" style={{ margin: 0, color: '#1A1A1A' }}>
            Homepage Layout & Section Ordering
          </h3>
        </div>
        <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>
          Drag, reorder, or toggle sections to reconfigure the public homepage instantly.
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {sections.map((section, idx) => (
          <div
            key={section.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 18px',
              borderRadius: '12px',
              backgroundColor: section.status === 'active' ? '#FFFFFF' : '#F8FAFC',
              border: `1.5px solid ${section.status === 'active' ? '#E2E8F0' : '#E5E7EB'}`,
              opacity: section.status === 'active' ? 1 : 0.65,
              transition: 'all 0.15s ease'
            }}
          >
            {/* Left: Reorder & Name */}
            <div className="flex items-center gap-md">
              <div className="flex flex-col gap-2xs">
                <button
                  onClick={() => handleMove(idx, 'up')}
                  disabled={idx === 0}
                  style={{ border: 'none', background: 'none', cursor: idx === 0 ? 'not-allowed' : 'pointer', color: '#6B7280', padding: '2px' }}
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  onClick={() => handleMove(idx, 'down')}
                  disabled={idx === sections.length - 1}
                  style={{ border: 'none', background: 'none', cursor: idx === sections.length - 1 ? 'not-allowed' : 'pointer', color: '#6B7280', padding: '2px' }}
                >
                  <ArrowDown size={14} />
                </button>
              </div>

              <div>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#1A1A1A' }}>
                  {idx + 1}. {section.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                  Key: <code>{section.sectionKey}</code> • Type: {section.displayType}
                </div>
              </div>
            </div>

            {/* Right: Item count & Status toggle */}
            <div className="flex items-center gap-md">
              <div className="flex items-center gap-xs" style={{ fontSize: '0.8rem', color: '#4B5563' }}>
                <span>Display:</span>
                <select
                  value={section.itemCount}
                  onChange={(e) => handleItemCountChange(section, Number(e.target.value))}
                  style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.8rem', backgroundColor: '#FFFFFF' }}
                >
                  <option value={1}>1 item</option>
                  <option value={2}>2 items</option>
                  <option value={4}>4 items</option>
                  <option value={8}>8 items</option>
                  <option value={12}>12 items</option>
                </select>
              </div>

              <button
                onClick={() => handleToggleStatus(section)}
                className={`btn btn-sm ${section.status === 'active' ? 'btn-secondary' : 'btn-ghost'}`}
                style={{
                  fontSize: '0.78rem',
                  color: section.status === 'active' ? '#059669' : '#6B7280',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {section.status === 'active' ? <Eye size={14} /> : <EyeOff size={14} />}
                <span>{section.status === 'active' ? 'Active' : 'Hidden'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
