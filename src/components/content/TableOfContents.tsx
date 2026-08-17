import React from 'react';
import { GuideSection } from '../../types/content';
import { List, ChevronRight } from 'lucide-react';

interface TableOfContentsProps {
  sections: GuideSection[];
  activeSectionId?: string;
  onSelectSection: (id: string) => void;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  sections,
  activeSectionId,
  onSelectSection
}) => {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid var(--border-default)',
        padding: '20px',
        boxShadow: 'var(--shadow-card)',
        position: 'sticky',
        top: '80px'
      }}
    >
      <div className="flex items-center gap-xs" style={{ marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid #F1F5F9' }}>
        <List size={16} style={{ color: '#2563EB' }} />
        <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#1A1A1A' }}>
          Table of Contents
        </span>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {sections.map((sec) => {
          const isActive = activeSectionId === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => onSelectSection(sec.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 10px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: isActive ? '#EFF6FF' : 'transparent',
                color: isActive ? '#2563EB' : '#4B5563',
                fontSize: '0.82rem',
                fontWeight: isActive ? 700 : 500,
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <span>{sec.title}</span>
              {isActive && <ChevronRight size={13} />}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
