import React from 'react';
import { ShieldCheck, AlertCircle } from 'lucide-react';

interface PasswordStrengthMeterProps {
  password?: string;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password = '' }) => {
  const calculateStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: 'Empty', color: '#94A3B8' };

    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    switch (score) {
      case 1:
        return { score: 1, label: 'Very Weak', color: '#EF4444' };
      case 2:
        return { score: 2, label: 'Weak', color: '#F97316' };
      case 3:
        return { score: 3, label: 'Medium', color: '#F59E0B' };
      case 4:
        return { score: 4, label: 'Strong', color: '#10B981' };
      case 5:
        return { score: 5, label: 'Very Strong', color: '#059669' };
      default:
        return { score: 0, label: 'Very Weak', color: '#EF4444' };
    }
  };

  const { score, label, color } = calculateStrength(password);
  const percentage = (score / 5) * 100;

  if (!password) return null;

  return (
    <div style={{ marginTop: '8px', marginBottom: '12px' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: '4px', fontSize: '0.74rem', fontWeight: 700 }}>
        <span style={{ color: '#64748B' }}>Password Strength:</span>
        <span style={{ color, fontWeight: 800 }}>{label}</span>
      </div>

      <div style={{ height: '6px', backgroundColor: '#E2E8F0', borderRadius: '999px', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${percentage}%`,
            backgroundColor: color,
            borderRadius: '999px',
            transition: 'all 0.25s ease-out'
          }}
        />
      </div>

      <div style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: '4px' }}>
        Must be at least 8 characters with uppercase, numbers & symbols.
      </div>
    </div>
  );
};
