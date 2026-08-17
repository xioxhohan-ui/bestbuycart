import React from 'react';
import { useCountry } from '../../context/CountryContext';

interface PriceProps {
  amount: number;
  currency?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  style?: React.CSSProperties;
}

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg font-semibold',
  xl: 'text-2xl font-bold',
};

export const Price: React.FC<PriceProps> = ({
  amount,
  currency,
  className = '',
  size = 'md',
  style
}) => {
  const { formatPrice } = useCountry();
  const formatted = formatPrice(amount);

  return (
    <span className={`${sizeClasses[size]} tracking-tight ${className}`} style={style}>
      {formatted}
    </span>
  );
};
