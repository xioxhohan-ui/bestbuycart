import React, { useState, useEffect } from 'react';
import { LoyaltyTier, LoyaltyRule } from '../../types/community';
import { UserProfile } from '../../types/user';
import { communityService } from '../../services/communityService';
import { authService } from '../../services/authService';
import {
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Edit2,
  Plus,
  Trophy,
  Star,
  Users,
  Settings
} from 'lucide-react';
import { Button } from '../ui/Button';

export const AdminLoyaltyManager: React.FC = () => {
  const [tiers, setTiers] = useState<LoyaltyTier[]>([]);
  const [rules, setRules] = useState<LoyaltyRule[]>([]);
  const [topUsers, setTopUsers] = useState<UserProfile[]>([]);
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null);
  const [rulePoints, setRulePoints] = useState<number>(0);
  const [saveNotice, setSaveNotice] = useState<string | null>(null);

  const loadData = async () => {
    const t = communityService.getLoyaltyTiers();
    const r = await communityService.getLoyaltyRules();
    const u = await authService.getAllUsers();
    setTiers(t);
    setRules(r);
    setTopUsers([...u].sort((a, b) => b.reputationPoints - a.reputationPoints).slice(0, 5));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleRule = async (rule: LoyaltyRule) => {
    await communityService.updateLoyaltyRule(rule.id, rule.pointsAwarded, !rule.isEnabled);
    await loadData();
  };

  const handleSaveRulePoints = async (rule: LoyaltyRule) => {
    await communityService.updateLoyaltyRule(rule.id, rulePoints, rule.isEnabled);
    setEditingRuleId(null);
    setSaveNotice(`Updated rule: ${rule.action}`);
    setTimeout(() => setSaveNotice(null), 2500);
    await loadData();
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div className="flex items-center gap-xs" style={{ marginBottom: '4px' }}>
            <Award size={22} style={{ color: '#2563EB' }} />
            <h2 className="h2" style={{ margin: 0 }}>
              LOYALTY & REPUTATION ENGINE
            </h2>
          </div>
          <p style={{ color: '#64748B', margin: 0, fontSize: '0.9rem' }}>
            Configure community progression tiers, reputation point reward weights, and perks.
          </p>
        </div>
      </div>

      {saveNotice && (
        <div className="flex items-center gap-xs" style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', color: '#059669', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '20px' }}>
          <CheckCircle2 size={16} />
          <span>{saveNotice}</span>
        </div>
      )}

      {/* 4 Loyalty Tiers Grid */}
      <div style={{ marginBottom: '36px' }}>
        <h3 className="h3" style={{ margin: '0 0 16px', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Community Reputation Tiers
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {tiers.map((tier) => (
            <div
              key={tier.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid var(--border-default)',
                boxShadow: 'var(--shadow-card)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div className="flex items-center justify-between" style={{ marginBottom: '12px' }}>
                <span
                  style={{
                    backgroundColor: tier.badgeColor + '15',
                    color: tier.badgeColor,
                    padding: '4px 10px',
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    border: `1px solid ${tier.badgeColor}30`
                  }}
                >
                  {tier.name}
                </span>
                <span className="font-mono" style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 700 }}>
                  {tier.minPoints} - {tier.maxPoints === 99999 ? '∞' : tier.maxPoints} pts
                </span>
              </div>

              <p style={{ margin: '0 0 16px', fontSize: '0.84rem', color: '#4B5563', lineHeight: 1.4 }}>
                {tier.description}
              </p>

              <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Tier Perks:
                </div>
                <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.78rem', color: '#334155', lineHeight: 1.45 }}>
                  {tier.perks.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Point Multiplier Rules & Leaderboard Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Left: Point Rules Table */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid var(--border-default)',
            boxShadow: 'var(--shadow-card)'
          }}
        >
          <div className="flex items-center gap-xs" style={{ marginBottom: '18px' }}>
            <Settings size={18} style={{ color: '#2563EB' }} />
            <h3 className="h3" style={{ margin: 0, fontSize: '1rem' }}>
              REPUTATION POINT WEIGHTS
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {rules.map((rule) => {
              const isEditing = editingRuleId === rule.id;
              return (
                <div
                  key={rule.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    backgroundColor: '#F8FAFC',
                    borderRadius: '10px',
                    border: '1px solid #E2E8F0'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1A1A1A' }}>
                      {rule.action}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                      {rule.description}
                    </div>
                  </div>

                  <div className="flex items-center gap-sm">
                    {isEditing ? (
                      <div className="flex items-center gap-xs">
                        <input
                          type="number"
                          value={rulePoints}
                          onChange={(e) => setRulePoints(Number(e.target.value))}
                          style={{ width: '60px', padding: '4px 6px', borderRadius: '6px', border: '1.5px solid #2563EB', fontSize: '0.85rem' }}
                        />
                        <Button size="sm" variant="primary" onClick={() => handleSaveRulePoints(rule)}>
                          Save
                        </Button>
                      </div>
                    ) : (
                      <span
                        onClick={() => {
                          setEditingRuleId(rule.id);
                          setRulePoints(rule.pointsAwarded);
                        }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          backgroundColor: '#EFF6FF',
                          color: '#2563EB',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 800,
                          cursor: 'pointer'
                        }}
                        title="Click to edit points"
                      >
                        +{rule.pointsAwarded} pts <Edit2 size={11} />
                      </span>
                    )}

                    <input
                      type="checkbox"
                      checked={rule.isEnabled}
                      onChange={() => handleToggleRule(rule)}
                      style={{ accentColor: '#2563EB', cursor: 'pointer', width: '16px', height: '16px' }}
                      title="Enable or disable rule"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Reputation Leaderboard */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid var(--border-default)',
            boxShadow: 'var(--shadow-card)'
          }}
        >
          <div className="flex items-center gap-xs" style={{ marginBottom: '18px' }}>
            <Trophy size={18} style={{ color: '#D97706' }} />
            <h3 className="h3" style={{ margin: 0, fontSize: '1rem' }}>
              COMMUNITY LEADERBOARD
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {topUsers.map((user, idx) => (
              <div
                key={user.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  backgroundColor: idx === 0 ? '#FEF3C7' : '#F8FAFC',
                  borderRadius: '10px',
                  border: `1px solid ${idx === 0 ? '#FDE68A' : '#E2E8F0'}`
                }}
              >
                <div className="flex items-center gap-sm">
                  <span className="font-mono" style={{ fontWeight: 900, color: idx === 0 ? '#D97706' : '#64748B', width: '20px', fontSize: '0.9rem' }}>
                    #{idx + 1}
                  </span>
                  <img
                    src={user.avatarUrl}
                    alt={user.fullName}
                    style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#1A1A1A' }}>
                      {user.fullName}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                      {user.tierName} • {user.stats.reviewsCount} reviews
                    </div>
                  </div>
                </div>

                <span className="font-mono" style={{ fontSize: '0.9rem', fontWeight: 900, color: '#2563EB' }}>
                  {user.reputationPoints} pts
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
