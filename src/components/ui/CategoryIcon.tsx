import React from 'react';
import {
  Laptop,
  Utensils,
  Home,
  Gift,
  Sparkles,
  Shirt,
  Dumbbell,
  Plane,
  Car,
  Tent,
  PawPrint,
  Baby,
  Monitor,
  Target,
  ShoppingBag,
  Flame,
  Star,
  Gem,
  Tag,
  HelpCircle,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle
} from 'lucide-react';

interface CategoryIconProps {
  slugOrId: string;
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  slugOrId,
  size = 24,
  color = '#2563EB',
  className = '',
  style = {}
}) => {
  const normalized = (slugOrId || '').toLowerCase().trim();

  switch (normalized) {
    case 'tech':
    case 'electronics':
    case 'laptop':
    case 'headphones':
      return <Laptop size={size} color={color} className={className} style={style} />;
    case 'kitchen':
    case 'coffee':
    case 'utensils':
      return <Utensils size={size} color={color} className={className} style={style} />;
    case 'home':
    case 'smart-home':
      return <Home size={size} color={color} className={className} style={style} />;
    case 'gifts':
    case 'gift':
      return <Gift size={size} color={color} className={className} style={style} />;
    case 'beauty':
    case 'wellness':
      return <Sparkles size={size} color={color} className={className} style={style} />;
    case 'fashion':
    case 'apparel':
    case 'shirt':
      return <Shirt size={size} color={color} className={className} style={style} />;
    case 'fitness':
    case 'health':
    case 'gym':
      return <Dumbbell size={size} color={color} className={className} style={style} />;
    case 'travel':
    case 'edc':
    case 'plane':
      return <Plane size={size} color={color} className={className} style={style} />;
    case 'auto':
    case 'car':
      return <Car size={size} color={color} className={className} style={style} />;
    case 'outdoor':
    case 'camping':
    case 'tent':
      return <Tent size={size} color={color} className={className} style={style} />;
    case 'pets':
    case 'dog':
    case 'pawprint':
      return <PawPrint size={size} color={color} className={className} style={style} />;
    case 'kids':
    case 'baby':
      return <Baby size={size} color={color} className={className} style={style} />;
    case 'office':
    case 'workspace':
    case 'monitor':
      return <Monitor size={size} color={color} className={className} style={style} />;
    case 'lifestyle':
    case 'target':
      return <Target size={size} color={color} className={className} style={style} />;
    case 'trending':
    case 'flame':
      return <Flame size={size} color={color} className={className} style={style} />;
    case 'deals':
    case 'tag':
      return <Tag size={size} color={color} className={className} style={style} />;
    default:
      return <ShoppingBag size={size} color={color} className={className} style={style} />;
  }
};
