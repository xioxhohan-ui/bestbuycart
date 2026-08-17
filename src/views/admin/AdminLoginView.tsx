import React, { useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useNavigation } from '../../context/NavigationContext';
import { Lock, ArrowRight, ShieldCheck, ArrowLeft, KeyRound } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const AdminLoginView: React.FC = () => {
  const { login } = useAdminAuth();
  const { navigate } = useNavigation();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (!success) {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div
      style={{
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        backgroundColor: '#0F172A'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: '#1E293B',
          borderRadius: '20px',
          border: '1px solid #334155',
          padding: '36px 32px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          color: '#FFFFFF'
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              backgroundColor: 'rgba(37, 99, 235, 0.2)',
              border: '1px solid rgba(37, 99, 235, 0.4)',
              color: '#60A5FA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}
          >
            <Lock size={26} />
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 6px', letterSpacing: '-0.02em', color: '#FFFFFF' }}>
            Master Administration
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.86rem', margin: 0 }}>
            Enter your administrative credentials to access full CMS control.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#CBD5E1', marginBottom: '8px' }}>
              Master Security Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Enter password..."
                autoFocus
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  backgroundColor: '#0F172A',
                  border: `1.5px solid ${error ? '#EF4444' : '#475569'}`,
                  color: '#FFFFFF',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>
            {error && (
              <div style={{ color: '#F87171', fontSize: '0.78rem', marginTop: '6px', fontWeight: 600 }}>
                Invalid access password. Please try again.
              </div>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            style={{ width: '100%', borderRadius: '10px', backgroundColor: '#2563EB', height: '46px', marginBottom: '20px' }}
            icon={<ArrowRight size={16} />}
            iconPosition="right"
          >
            Authenticate & Open CMS
          </Button>
        </form>

        <div style={{ textAlign: 'center', paddingTop: '16px', borderTop: '1px solid #334155' }}>
          <button
            onClick={() => navigate('/')}
            className="btn btn-ghost btn-sm"
            style={{ color: '#94A3B8', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <ArrowLeft size={14} />
            <span>Return to Public Site</span>
          </button>
        </div>
      </div>
    </div>
  );
};
