import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Mail, Lock, User, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, authModalMode, closeAuthModal, login, register, socialLogin } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(authModalMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  React.useEffect(() => {
    setMode(authModalMode);
    setErrorMsg(null);
    setSuccessMsg(null);
  }, [authModalMode, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
        setSuccessMsg('Signed in successfully!');
        setTimeout(() => {
          closeAuthModal();
        }, 600);
      } else {
        if (!fullName.trim() || !username.trim()) {
          throw new Error('Please enter your full name and username.');
        }
        await register(fullName, email, username);
        setSuccessMsg('Account created successfully! Welcome to Best Buy Cart.');
        setTimeout(() => {
          closeAuthModal();
        }, 800);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocial = async (provider: 'google' | 'apple' | 'github') => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      await socialLogin(provider);
      setSuccessMsg(`Signed in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}!`);
      setTimeout(() => {
        closeAuthModal();
      }, 600);
    } catch (err: any) {
      setErrorMsg(err.message || 'Social sign-in failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAuthModal();
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          maxWidth: '460px',
          width: '100%',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #E2E8F0',
          overflow: 'hidden',
          animation: 'fadeInScale 0.2s ease-out'
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F8FAFC'
          }}
        >
          <div className="flex items-center gap-xs">
            <ShieldCheck size={18} style={{ color: '#2563EB' }} />
            <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#1A1A1A' }}>
              {mode === 'login' ? 'Sign In to Best Buy Cart' : 'Create Your Account'}
            </span>
          </div>
          <button
            onClick={closeAuthModal}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#64748B',
              padding: '4px',
              borderRadius: '6px'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid #E2E8F0' }}>
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMsg(null);
            }}
            style={{
              padding: '12px',
              fontSize: '0.85rem',
              fontWeight: 700,
              backgroundColor: mode === 'login' ? '#FFFFFF' : '#F8FAFC',
              color: mode === 'login' ? '#2563EB' : '#64748B',
              border: 'none',
              borderBottom: mode === 'login' ? '2.5px solid #2563EB' : '2.5px solid transparent',
              cursor: 'pointer'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMsg(null);
            }}
            style={{
              padding: '12px',
              fontSize: '0.85rem',
              fontWeight: 700,
              backgroundColor: mode === 'register' ? '#FFFFFF' : '#F8FAFC',
              color: mode === 'register' ? '#2563EB' : '#64748B',
              border: 'none',
              borderBottom: mode === 'register' ? '2.5px solid #2563EB' : '2.5px solid transparent',
              cursor: 'pointer'
            }}
          >
            Create Account
          </button>
        </div>

        <div style={{ padding: '24px' }}>
          {errorMsg && (
            <div
              className="flex items-center gap-xs"
              style={{
                backgroundColor: '#FEF2F2',
                border: '1px solid #FECACA',
                color: '#DC2626',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                marginBottom: '16px'
              }}
            >
              <AlertCircle size={15} style={{ flexShrink: 0 }} />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div
              className="flex items-center gap-xs"
              style={{
                backgroundColor: '#ECFDF5',
                border: '1px solid #A7F3D0',
                color: '#059669',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                marginBottom: '16px'
              }}
            >
              <CheckCircle2 size={15} style={{ flexShrink: 0 }} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Social Sign-In Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '20px' }}>
            <button
              type="button"
              onClick={() => handleSocial('google')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '9px 10px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                backgroundColor: '#FFFFFF',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#1A1A1A',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              <span style={{ fontWeight: 800, color: '#4285F4' }}>G</span>
              <span>Google</span>
            </button>
            <button
              type="button"
              onClick={() => handleSocial('apple')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '9px 10px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                backgroundColor: '#FFFFFF',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#1A1A1A',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              <span style={{ fontWeight: 800 }}></span>
              <span>Apple</span>
            </button>
            <button
              type="button"
              onClick={() => handleSocial('github')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '9px 10px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                backgroundColor: '#FFFFFF',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#1A1A1A',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              <span style={{ fontWeight: 800 }}>⌨</span>
              <span>GitHub</span>
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: '16px 0',
              color: '#94A3B8',
              fontSize: '0.75rem',
              fontWeight: 600
            }}
          >
            <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }} />
            <span style={{ padding: '0 10px', textTransform: 'uppercase' }}>Or with email</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }} />
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {mode === 'register' && (
              <>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', marginBottom: '4px' }}>
                    Full Name
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px 10px 36px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.88rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', marginBottom: '4px' }}>
                    Username
                  </label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', fontSize: '0.85rem', fontWeight: 700 }}>@</span>
                    <input
                      type="text"
                      required
                      placeholder="johndoe"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px 10px 36px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.88rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', marginBottom: '4px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                <input
                  type="email"
                  required
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 36px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', marginBottom: '4px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 36px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isLoading}
              style={{
                width: '100%',
                borderRadius: '8px',
                marginTop: '6px',
                height: '42px'
              }}
            >
              {isLoading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Free Account'}
            </Button>
          </form>

          {/* Quick Demo Login Presets */}
          <div
            style={{
              marginTop: '20px',
              padding: '12px 14px',
              backgroundColor: '#F8FAFC',
              borderRadius: '10px',
              border: '1px solid #E2E8F0'
            }}
          >
            <div className="flex items-center gap-xs" style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '8px' }}>
              <Sparkles size={13} style={{ color: '#2563EB' }} /> Quick Demo Profiles:
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => handleQuickDemo('john@email.com')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#2563EB',
                  cursor: 'pointer'
                }}
              >
                John Doe (Enthusiast)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('sarah@email.com')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#9333EA',
                  cursor: 'pointer'
                }}
              >
                Sarah J. (Expert)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
