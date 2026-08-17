import React, { useState, useEffect } from 'react';
import { EmailCampaign } from '../../types/deals';
import { dealService } from '../../services/dealService';
import { Mail, Send, Clock, Users, CheckCircle2, TrendingUp } from 'lucide-react';
import { Button } from '../ui/Button';

export const AdminNewsletterManager: React.FC = () => {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [isSendingTest, setIsSendingTest] = useState(false);

  const [formData, setFormData] = useState({
    name: 'Weekly Price Drops — Radar Drop',
    subject: '5 Verified Price Drops on Sony, Breville, and Anker',
    template: 'price_drop_alert' as const
  });

  const loadData = () => {
    dealService.getEmailCampaigns().then(setCampaigns);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSendTest = () => {
    setIsSendingTest(true);
    setTimeout(() => {
      setIsSendingTest(false);
      alert('Test newsletter dispatched to admin email: shohan@bestbuycart.com');
    }, 1000);
  };

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    await dealService.saveEmailCampaign({
      name: formData.name,
      subject: formData.subject,
      template: formData.template,
      dealIds: ['deal-1', 'deal-2', 'deal-3'],
      status: 'scheduled'
    });
    alert('Campaign scheduled successfully for broadcast!');
    loadData();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Subscriber Statistics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Subscribers</span>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1A1A1A', marginTop: '4px' }}>5,678</div>
          <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, marginTop: '2px' }}>↑ 340 new this week</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Avg Open Rate</span>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#2563EB', marginTop: '4px' }}>42.4%</div>
          <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, marginTop: '2px' }}>High buyer engagement</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '18px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'var(--shadow-card)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>Avg Click Rate</span>
          <div className="font-mono" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#059669', marginTop: '4px' }}>18.1%</div>
          <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, marginTop: '2px' }}>Industry top quartile</div>
        </div>
      </div>

      {/* 2. Create Broadcast Campaign */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: 'var(--shadow-card)' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
          <div className="flex items-center gap-xs">
            <Mail size={20} style={{ color: '#2563EB' }} />
            <h3 className="h3" style={{ margin: 0, color: '#1A1A1A' }}>
              Compose Price Drop Newsletter Campaign
            </h3>
          </div>

          <Button variant="secondary" size="sm" onClick={handleSendTest} disabled={isSendingTest}>
            {isSendingTest ? 'Sending Test...' : 'Send Test to Admin'}
          </Button>
        </div>

        <form onSubmit={handleCreateCampaign} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Internal Campaign Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.85rem' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4B5563', display: 'block', marginBottom: '4px' }}>Email Subject Line *</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.85rem' }}
              />
            </div>
          </div>

          <div className="flex justify-end gap-sm" style={{ paddingTop: '12px', borderTop: '1px solid #E5E7EB' }}>
            <Button type="submit" variant="primary" size="md" icon={<Send size={14} />}>
              Schedule Broadcast Campaign
            </Button>
          </div>
        </form>
      </div>

      {/* 3. Past Campaigns */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: 'var(--shadow-card)' }}>
        <h4 style={{ margin: '0 0 16px', fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#1A1A1A' }}>
          Past Dispatched Campaigns
        </h4>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#4B5563', fontSize: '0.75rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '10px 14px' }}>Date</th>
              <th style={{ padding: '10px 14px' }}>Subject Line</th>
              <th style={{ padding: '10px 14px' }}>Sent</th>
              <th style={{ padding: '10px 14px' }}>Opens</th>
              <th style={{ padding: '10px 14px' }}>Clicks</th>
              <th style={{ padding: '10px 14px', textAlign: 'right' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '12px 14px', color: '#6B7280' }}>
                  {new Date(c.sendDate).toLocaleDateString()}
                </td>
                <td style={{ padding: '12px 14px', fontWeight: 700, color: '#1A1A1A' }}>{c.subject}</td>
                <td className="font-mono" style={{ padding: '12px 14px', color: '#4B5563' }}>{c.subscribersCount.toLocaleString()}</td>
                <td className="font-mono" style={{ padding: '12px 14px', color: '#2563EB', fontWeight: 600 }}>{c.opensCount.toLocaleString()}</td>
                <td className="font-mono" style={{ padding: '12px 14px', color: '#059669', fontWeight: 800 }}>{c.clicksCount.toLocaleString()}</td>
                <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                  <span style={{ backgroundColor: c.status === 'sent' ? '#ECFDF5' : '#EFF6FF', color: c.status === 'sent' ? '#059669' : '#2563EB', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700 }}>
                    {c.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
