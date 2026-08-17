import React, { useState, useEffect } from 'react';
import { RecommendationSettings } from '../../types/gifts';
import { giftService } from '../../services/giftService';
import { Sliders, Save, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export const AdminRecommendationSettings: React.FC = () => {
  const [settings, setSettings] = useState<RecommendationSettings>({
    categorySimilarityWeight: 80,
    priceSimilarityWeight: 60,
    brandSimilarityWeight: 50,
    featureOverlapWeight: 85,
    userBehaviorWeight: 70,
    personalizationLevel: 60,
    maxItemsPerCrossSell: 4,
    minDiscountForUpsell: 10,
    showRelatedOnCart: true,
    showCompleteTheSet: true
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    giftService.getRecommendationSettings().then(setSettings);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await giftService.updateRecommendationSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: 'var(--shadow-card)' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
          <div className="flex items-center gap-xs">
            <Sliders size={20} style={{ color: '#2563EB' }} />
            <h3 className="h3" style={{ margin: 0, color: '#1A1A1A' }}>
              AI Recommendation & Similarity Algorithm Weights
            </h3>
          </div>

          <Button variant="primary" size="sm" onClick={handleSave} icon={<Save size={14} />}>
            Save Configuration
          </Button>
        </div>

        {savedSuccess && (
          <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', padding: '12px 16px', borderRadius: '10px', color: '#065F46', fontSize: '0.86rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={16} />
            <span>Algorithmic similarity weights successfully updated and deployed to public stores.</span>
          </div>
        )}

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Sliders Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div>
              <div className="flex items-center justify-between" style={{ marginBottom: '6px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#374151' }}>Category Similarity Weight</label>
                <span className="font-mono" style={{ fontSize: '0.85rem', fontWeight: 800, color: '#2563EB' }}>{settings.categorySimilarityWeight}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={settings.categorySimilarityWeight}
                onChange={(e) => setSettings({ ...settings, categorySimilarityWeight: Number(e.target.value) })}
                style={{ width: '100%', accentColor: '#2563EB' }}
              />
              <span style={{ fontSize: '0.72rem', color: '#6B7280' }}>Prioritizes items strictly inside the same taxonomy group</span>
            </div>

            <div>
              <div className="flex items-center justify-between" style={{ marginBottom: '6px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#374151' }}>Price Range Similarity Weight</label>
                <span className="font-mono" style={{ fontSize: '0.85rem', fontWeight: 800, color: '#2563EB' }}>{settings.priceSimilarityWeight}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={settings.priceSimilarityWeight}
                onChange={(e) => setSettings({ ...settings, priceSimilarityWeight: Number(e.target.value) })}
                style={{ width: '100%', accentColor: '#2563EB' }}
              />
              <span style={{ fontSize: '0.72rem', color: '#6B7280' }}>Recommends products in equivalent price brackets</span>
            </div>

            <div>
              <div className="flex items-center justify-between" style={{ marginBottom: '6px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#374151' }}>Feature & Spec Overlap Weight</label>
                <span className="font-mono" style={{ fontSize: '0.85rem', fontWeight: 800, color: '#2563EB' }}>{settings.featureOverlapWeight}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={settings.featureOverlapWeight}
                onChange={(e) => setSettings({ ...settings, featureOverlapWeight: Number(e.target.value) })}
                style={{ width: '100%', accentColor: '#2563EB' }}
              />
              <span style={{ fontSize: '0.72rem', color: '#6B7280' }}>Calculates matching technical specs (e.g. ANC, Bluetooth 5.4)</span>
            </div>

            <div>
              <div className="flex items-center justify-between" style={{ marginBottom: '6px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#374151' }}>User Behavior Co-Occurrence</label>
                <span className="font-mono" style={{ fontSize: '0.85rem', fontWeight: 800, color: '#2563EB' }}>{settings.userBehaviorWeight}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={settings.userBehaviorWeight}
                onChange={(e) => setSettings({ ...settings, userBehaviorWeight: Number(e.target.value) })}
                style={{ width: '100%', accentColor: '#2563EB' }}
              />
              <span style={{ fontSize: '0.72rem', color: '#6B7280' }}>Weights products frequently viewed or compared together</span>
            </div>
          </div>

          {/* Cross-Sell & Upsell Toggles */}
          <div style={{ paddingTop: '16px', borderTop: '1px solid #F1F5F9', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', fontWeight: 600, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.showCompleteTheSet}
                onChange={(e) => setSettings({ ...settings, showCompleteTheSet: e.target.checked })}
                style={{ width: '16px', height: '16px', accentColor: '#2563EB' }}
              />
              <span>Enable "Complete the Set" companion accessory upsells on Product Detail pages</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', fontWeight: 600, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.showRelatedOnCart}
                onChange={(e) => setSettings({ ...settings, showRelatedOnCart: e.target.checked })}
                style={{ width: '16px', height: '16px', accentColor: '#2563EB' }}
              />
              <span>Enable "You Might Also Like" cross-sell carousels on Product and Category pages</span>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};
