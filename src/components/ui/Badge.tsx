import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'trending' | 'worth' | 'deal' | 'warning';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
  icon
}) => {
  const variantClass = {
    default: 'badge-default',
    accent: 'badge-accent',
    trending: 'badge-trending',
    worth: 'badge-worth',
    deal: 'badge-deal',
    warning: 'badge-default'
  }[variant];

  return (
    <span className={`badge ${variantClass} ${className}`}>
      {icon && <span className="badge-icon">{icon}</span>}
      {children}
    </span>
  );
};
