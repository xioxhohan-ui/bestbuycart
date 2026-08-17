import React from 'react';
import { NavMenuItem } from '../../types/navigation';
import { useNavigation, ActiveRoute } from '../../context/NavigationContext';
import {
  Gem,
  AlertTriangle,
  Flame,
  Rocket,
  Star,
  Brain,
  Gift,
  Sword,
  Bell,
  BarChart3,
  Share2,
  BookOpen,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface NavDropdownProps {
  isOpen: boolean;
  items: NavMenuItem[];
  onClose: () => void;
}

export const NavDropdown: React.FC<NavDropdownProps> = ({ isOpen, items, onClose }) => {
  const { navigate } = useNavigation();

  if (!isOpen || items.length === 0) return null;

  const renderIcon = (iconName?: string) => {
    switch (iconName) {
      case 'gem':
        return <Gem size={16} style={{ color: '#059669' }} />;
      case 'alert-triangle':
        return <AlertTriangle size={16} style={{ color: '#DC2626' }} />;
      case 'flame':
        return <Flame size={16} style={{ color: '#EA580C' }} />;
      case 'rocket':
        return <Rocket size={16} style={{ color: '#2563EB' }} />;
      case 'star':
        return <Star size={16} style={{ color: '#D97706' }} />;
      case 'brain':
        return <Brain size={16} style={{ color: '#9333EA' }} />;
      case 'gift':
        return <Gift size={16} style={{ color: '#E11D48' }} />;
      case 'sword':
        return <Sword size={16} style={{ color: '#2563EB' }} />;
      case 'bell':
        return <Bell size={16} style={{ color: '#2563EB' }} />;
      case 'bar-chart':
        return <BarChart3 size={16} style={{ color: '#059669' }} />;
      case 'share':
        return <Share2 size={16} style={{ color: '#2563EB' }} />;
      default:
        return <Sparkles size={16} style={{ color: '#2563EB' }} />;
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        border: '1px solid #E2E8F0',
        width: '320px',
        padding: '10px',
        zIndex: 9999,
        animation: 'fadeInScale 0.15s ease-out'
      }}
      onMouseLeave={onClose}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              navigate(item.url as ActiveRoute);
              onClose();
            }}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '10px 12px',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'background-color 0.15s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#F1F5F9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '2px'
              }}
            >
              {renderIcon(item.icon)}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '0.86rem', color: '#1A1A1A', lineHeight: 1.3 }}>
                {item.title}
              </div>
              {item.tooltip && (
                <div style={{ fontSize: '0.74rem', color: '#64748B', lineHeight: 1.35, marginTop: '2px' }}>
                  {item.tooltip}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
