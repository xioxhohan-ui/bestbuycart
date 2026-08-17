import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string;
  labelPrefix?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, labelPrefix = '' }) => {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    const calculateTime = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      if (difference <= 0) {
        setTimeLeft(null);
        return;
      }
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      setTimeLeft({ hours, minutes, seconds });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return (
      <span style={{ fontSize: '0.75rem', color: '#DC2626', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
        <Clock size={12} /> Expired
      </span>
    );
  }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '0.75rem',
        fontWeight: 700,
        color: '#DC2626',
        backgroundColor: '#FEF2F2',
        padding: '2px 8px',
        borderRadius: '6px'
      }}
    >
      <Clock size={12} />
      <span>
        {labelPrefix}
        {timeLeft.hours > 24 ? `${Math.floor(timeLeft.hours / 24)}d ${timeLeft.hours % 24}h` : `${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
      </span>
    </span>
  );
};
