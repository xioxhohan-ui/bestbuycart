import React, { useState } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useAuth } from '../../context/AuthContext';
import { Compass, Mail, CheckCircle2, RefreshCw, ArrowRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const VerifyEmailView: React.FC = () => {
  const { navigate } = useNavigation();
  const { currentUser } = useAuth();
  const [isResending, setIsResending] = useState(false);
  const [resendNotice, setResendNotice] = useState<string | null>(null);

  const handleResend = () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      setResendNotice('Verification email resent successfully! Please check your inbox.');
      setTimeout(() => setResendNotice(null), 4000);
    }, 1000);
  };

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 16px',
        backgroundColor: '#0F172A'
      }}
    >
      <div
        style={{
          maxWidth: '440px',
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '36px 32px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          border: '1px solid #1E293B',
          textAlign: 'center',
          animation: 'fadeInScale 0.2s ease-out'
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#EFF6FF',
            color: '#2563EB',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}
        >
          <Mail size={32} />
        </div>

        <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
          Check Your Inbox
        </h1>

        <p style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: 1.45, marginBottom: '20px' }}>
          We've sent a confirmation link to{' '}
          <strong style={{ color: '#1E293B' }}>{currentUser?.email || 'your email address'}</strong>. Click the link in your email to confirm your account.
        </p>

        {resendNotice && (
          <div
            className="flex items-center justify-center gap-xs"
            style={{
              backgroundColor: '#ECFDF5',
              border: '1px solid #A7F3D0',
              color: '#059669',
              padding: '10px 12px',
              borderRadius: '10px',
              fontSize: '0.82rem',
              marginBottom: '20px'
            }}
          >
            <CheckCircle2 size={16} />
            <span>{resendNotice}</span>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Button
            variant="primary"
            size="lg"
            icon={<ArrowRight size={16} />}
            onClick={() => navigate('/account')}
            style={{ width: '100%', borderRadius: '10px' }}
          >
            Continue to Account Dashboard
          </Button>

          <Button
            variant="ghost"
            size="md"
            icon={<RefreshCw size={14} className={isResending ? 'spin' : ''} />}
            disabled={isResending}
            onClick={handleResend}
            style={{ width: '100%', color: '#64748B' }}
          >
            {isResending ? 'Resending Link...' : 'Resend Verification Email'}
          </Button>
        </div>

        <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #F1F5F9', fontSize: '0.82rem', color: '#94A3B8' }}>
          Back to{' '}
          <button
            onClick={() => navigate('/login')}
            style={{ background: 'none', border: 'none', color: '#2563EB', fontWeight: 700, cursor: 'pointer', padding: 0 }}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};
