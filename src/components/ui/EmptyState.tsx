import React from 'react';
import { PackageOpen, ArrowRight } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  compact?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  compact = false
}) => {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: compact ? '12px' : '16px',
        border: '1px border-dashed #CBD5E1',
        padding: compact ? '28px 20px' : '48px 24px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: compact ? '480px' : '640px',
        margin: '0 auto',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}
    >
      <div
        style={{
          width: compact ? '44px' : '56px',
          height: compact ? '44px' : '56px',
          borderRadius: '50%',
          backgroundColor: '#F1F5F9',
          color: '#64748B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: compact ? '12px' : '16px'
        }}
      >
        {icon || <PackageOpen size={compact ? 22 : 28} />}
      </div>

      <h3
        style={{
          fontSize: compact ? '1.05rem' : '1.25rem',
          fontWeight: 700,
          color: '#0F172A',
          margin: '0 0 6px',
          fontFamily: 'Georgia, serif'
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: compact ? '0.82rem' : '0.9rem',
          color: '#64748B',
          maxWidth: '420px',
          margin: '0 0 16px',
          lineHeight: 1.5
        }}
      >
        {description}
      </p>

      {actionLabel && onAction && (
        <Button
          variant="secondary"
          size={compact ? 'sm' : 'md'}
          onClick={onAction}
          icon={<ArrowRight size={14} />}
          style={{ fontSize: '0.82rem' }}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
