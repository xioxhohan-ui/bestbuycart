import React, { useState, useEffect } from 'react';
import { UserProfile, UserRole, UserStatus } from '../../types/user';
import { authService } from '../../services/authService';
import { AdminUserEditModal } from './AdminUserEditModal';
import {
  Users,
  Search,
  Filter,
  ArrowUpDown,
  Download,
  Edit2,
  ShieldCheck,
  Ban,
  UserCheck,
  Trash2,
  Award,
  Sparkles
} from 'lucide-react';
import { Button } from '../ui/Button';

export const AdminUserManager: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'points' | 'reviews'>('newest');
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);

  const loadUsers = async () => {
    const list = await authService.getAllUsers();
    setUsers(list);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = users
    .filter((u) => {
      if (roleFilter !== 'all' && u.role !== roleFilter) return false;
      if (statusFilter !== 'all' && u.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          u.fullName.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.username.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'points') return b.reputationPoints - a.reputationPoints;
      if (sortBy === 'reviews') return b.stats.reviewsCount - a.stats.reviewsCount;
      return 0;
    });

  const handleExportCSV = () => {
    const header = 'ID,Full Name,Username,Email,Role,Status,Reputation Points,Tier,Reviews Count,Helpful Votes,Member Since\n';
    const rows = users
      .map((u) => `"${u.id}","${u.fullName}","${u.username}","${u.email}","${u.role}","${u.status}",${u.reputationPoints},"${u.tierName}",${u.stats.reviewsCount},${u.stats.helpfulVotesCount},"${u.memberSince}"`)
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `best-buy-cart-users-export-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleToggleStatus = async (user: UserProfile) => {
    const newStatus: UserStatus = user.status === 'active' ? 'suspended' : 'active';
    await authService.updateProfile(user.id, { status: newStatus });
    await loadUsers();
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div className="flex items-center gap-xs" style={{ marginBottom: '4px' }}>
            <Users size={22} style={{ color: '#2563EB' }} />
            <h2 className="h2" style={{ margin: 0 }}>
              USER & COMMUNITY MANAGEMENT
            </h2>
          </div>
          <p style={{ color: '#64748B', margin: 0, fontSize: '0.9rem' }}>
            Manage registered members, role privileges, account standing, and reputation leaderboards.
          </p>
        </div>

        <Button variant="secondary" size="md" icon={<Download size={15} />} onClick={handleExportCSV}>
          Export Users (CSV)
        </Button>
      </div>

      {/* 4 Quick Stat KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Total Registered Users</div>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 900, color: '#1A1A1A', marginTop: '4px' }}>
            {users.length.toLocaleString()}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>+89 new this week</span>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Active (Last 30 Days)</div>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 900, color: '#2563EB', marginTop: '4px' }}>
            {users.filter((u) => u.status === 'active').length}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748B' }}>100% good standing</span>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Expert / Master Curators</div>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 900, color: '#9333EA', marginTop: '4px' }}>
            {users.filter((u) => u.tierId === 'tier-expert' || u.tierId === 'tier-master').length}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#9333EA', fontWeight: 600 }}>Top tier reviewers</span>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Suspended Accounts</div>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 900, color: '#DC2626', marginTop: '4px' }}>
            {users.filter((u) => u.status !== 'active').length}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#DC2626', fontWeight: 600 }}>Action required</span>
        </div>
      </div>

      {/* Filters Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '16px 20px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid var(--border-default)',
          boxShadow: 'var(--shadow-xs)',
          marginBottom: '24px'
        }}
      >
        <div style={{ position: 'relative', minWidth: '240px', flex: 1 }}>
          <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input
            type="text"
            placeholder="Search by name, email, @username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '8px 12px 8px 34px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', outline: 'none' }}
          />
        </div>

        <div className="flex items-center gap-xs flex-wrap">
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B' }}>Role:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.82rem', backgroundColor: '#FFFFFF', outline: 'none' }}
          >
            <option value="all">All Roles</option>
            <option value="user">User</option>
            <option value="editor">Editor</option>
            <option value="moderator">Moderator</option>
            <option value="admin">Admin</option>
          </select>

          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', marginLeft: '6px' }}>Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.82rem', backgroundColor: '#FFFFFF', outline: 'none' }}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="banned">Banned</option>
          </select>

          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748B', marginLeft: '6px' }}>Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.82rem', backgroundColor: '#FFFFFF', outline: 'none' }}
          >
            <option value="newest">Newest First</option>
            <option value="points">Highest Points</option>
            <option value="reviews">Most Reviews</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid var(--border-default)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-card)'
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                <th style={{ padding: '14px 20px', width: '30%', color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Member / Email
                </th>
                <th style={{ padding: '14px 20px', width: '15%', color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Role
                </th>
                <th style={{ padding: '14px 20px', width: '18%', color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Reputation / Tier
                </th>
                <th style={{ padding: '14px 20px', width: '15%', color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Status
                </th>
                <th style={{ padding: '14px 20px', width: '12%', color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Activity
                </th>
                <th style={{ padding: '14px 20px', width: '10%', textAlign: 'right', color: '#64748B', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, idx) => (
                <tr
                  key={user.id}
                  style={{
                    backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC',
                    borderBottom: '1px solid #F1F5F9'
                  }}
                >
                  {/* Member Column */}
                  <td style={{ padding: '14px 20px' }}>
                    <div className="flex items-center gap-sm">
                      <img
                        src={user.avatarUrl}
                        alt={user.fullName}
                        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: 800, color: '#1A1A1A', fontSize: '0.9rem' }}>
                          {user.fullName}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                          @{user.username} • {user.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Role Column */}
                  <td style={{ padding: '14px 20px' }}>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        backgroundColor: user.role === 'admin' ? '#FEF2F2' : user.role === 'editor' ? '#EFF6FF' : '#F1F5F9',
                        color: user.role === 'admin' ? '#DC2626' : user.role === 'editor' ? '#2563EB' : '#475569'
                      }}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Reputation / Tier */}
                  <td style={{ padding: '14px 20px' }}>
                    <div className="flex items-center gap-xs">
                      <Award size={13} style={{ color: '#D97706' }} />
                      <span style={{ fontWeight: 700, color: '#1A1A1A', fontSize: '0.82rem' }}>
                        {user.tierName}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>
                      {user.reputationPoints} pts
                    </div>
                  </td>

                  {/* Status Column */}
                  <td style={{ padding: '14px 20px' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '3px 8px',
                        borderRadius: '999px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        backgroundColor: user.status === 'active' ? '#ECFDF5' : '#FEF2F2',
                        color: user.status === 'active' ? '#059669' : '#DC2626',
                        border: `1px solid ${user.status === 'active' ? '#A7F3D0' : '#FECACA'}`
                      }}
                    >
                      {user.status === 'active' ? <ShieldCheck size={11} /> : <Ban size={11} />}
                      <span style={{ textTransform: 'capitalize' }}>{user.status}</span>
                    </span>
                  </td>

                  {/* Activity Stats */}
                  <td style={{ padding: '14px 20px', fontSize: '0.78rem', color: '#64748B' }}>
                    <div>{user.stats.reviewsCount} reviews</div>
                    <div>{user.stats.helpfulVotesCount} helpful</div>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                    <div className="flex items-center justify-end gap-xs">
                      <Button
                        size="sm"
                        variant="secondary"
                        icon={<Edit2 size={13} />}
                        onClick={() => setEditingUser(user)}
                        title="Edit User"
                        style={{ padding: '5px 8px' }}
                      />
                      <button
                        onClick={() => handleToggleStatus(user)}
                        title={user.status === 'active' ? 'Suspend Account' : 'Activate Account'}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '6px',
                          border: '1px solid #CBD5E1',
                          backgroundColor: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: user.status === 'active' ? '#DC2626' : '#059669',
                          cursor: 'pointer'
                        }}
                      >
                        {user.status === 'active' ? <Ban size={13} /> : <UserCheck size={13} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingUser && (
        <AdminUserEditModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSaved={() => {
            loadUsers();
            setEditingUser(null);
          }}
        />
      )}
    </div>
  );
};
