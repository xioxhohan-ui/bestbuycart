import React, { useState } from 'react';
import { UserProfile, UserRole, UserStatus } from '../../types/user';
import { authService } from '../../services/authService';
import { communityService } from '../../services/communityService';
import { X, User, Shield, CheckCircle2, AlertCircle, Award, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface AdminUserEditModalProps {
  user: UserProfile;
  onClose: () => void;
  onSaved: (updatedUser: UserProfile) => void;
}

export const AdminUserEditModal: React.FC<AdminUserEditModalProps> = ({ user, onClose, onSaved }) => {
  const [formData, setFormData] = useState<UserProfile>({ ...user });
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg(null);

    try {
      const updated = await authService.updateProfile(user.id, {
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        role: formData.role,
        status: formData.status,
        bio: formData.bio,
        location: formData.location,
        website: formData.website,
        reputationPoints: Number(formData.reputationPoints)
      });
      onSaved(updated);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to save user updates.');
    } finally {
      setIsSaving(false);
    }
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
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          maxWidth: '640px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #E2E8F0',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F8FAFC'
          }}
        >
          <div className="flex items-center gap-xs">
            <User size={18} style={{ color: '#2563EB' }} />
            <div>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#1A1A1A' }}>
                Edit Member Account: {user.fullName}
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                ID: {user.id} • Member Since {user.memberSince}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
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

        {/* Form Body */}
        <form onSubmit={handleSave} style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {errorMsg && (
            <div className="flex items-center gap-xs" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '10px 14px', borderRadius: '8px', fontSize: '0.82rem' }}>
              <AlertCircle size={15} />
              <span>{errorMsg}</span>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', marginBottom: '4px' }}>
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', marginBottom: '4px' }}>
                Username
              </label>
              <input
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', marginBottom: '4px' }}>
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', marginBottom: '4px' }}>
                Reputation Points
              </label>
              <input
                type="number"
                value={formData.reputationPoints}
                onChange={(e) => setFormData({ ...formData, reputationPoints: Number(e.target.value) })}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', marginBottom: '4px' }}>
                Account Role
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none', backgroundColor: '#FFFFFF' }}
              >
                <option value="user">Standard User</option>
                <option value="editor">Editorial Reviewer</option>
                <option value="moderator">Community Moderator</option>
                <option value="admin">Master Admin</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', marginBottom: '4px' }}>
                Account Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as UserStatus })}
                style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none', backgroundColor: '#FFFFFF' }}
              >
                <option value="active">Active (Good Standing)</option>
                <option value="suspended">Suspended (Read Only)</option>
                <option value="banned">Banned (Blocked Access)</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', marginBottom: '4px' }}>
              Location
            </label>
            <input
              type="text"
              value={formData.location || ''}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', marginBottom: '4px' }}>
              Bio Description
            </label>
            <textarea
              rows={3}
              value={formData.bio || ''}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', outline: 'none', resize: 'vertical' }}
            />
          </div>

          {/* User Metrics Summary */}
          <div style={{ backgroundColor: '#F8FAFC', padding: '12px 16px', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748B' }}>
            <span>Reviews: <strong>{user.stats.reviewsCount}</strong></span>
            <span>Helpful Votes: <strong>{user.stats.helpfulVotesCount}</strong></span>
            <span>Wishlist Items: <strong>{user.stats.wishlistCount}</strong></span>
            <span>Watchlist Radars: <strong>{user.stats.watchlistCount}</strong></span>
          </div>

          <div className="flex items-center justify-end gap-sm" style={{ marginTop: '10px', paddingTop: '16px', borderTop: '1px solid #F1F5F9' }}>
            <Button type="button" variant="ghost" size="md" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save User Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
