import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'pill' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  const variantClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    pill: 'btn-primary btn-pill',
    outline: 'btn-secondary'
  }[variant];

  const sizeClass = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg'
  }[size];

  return (
    <button className={`btn ${variantClass} ${sizeClass} ${className}`} {...props}>
      {icon && iconPosition === 'left' && <span className="btn-icon-wrapper">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="btn-icon-wrapper">{icon}</span>}
    </button>
  );
};
