import React from 'react';
import { useCountry } from '../../context/CountryContext';
import { dealService } from '../../services/dealService';
import { TrendingDown, ShieldCheck, Info } from 'lucide-react';

interface PriceHistoryChartProps {
  productId: string;
  currentPriceUSD: number;
}

export const PriceHistoryChart: React.FC<PriceHistoryChartProps> = ({ productId, currentPriceUSD }) => {
  const { formatPrice } = useCountry();
  const { history, lowest30d, highest30d, average30d } = dealService.getPriceHistory(productId, currentPriceUSD);

  const maxVal = highest30d * 1.05;
  const minVal = lowest30d * 0.92;
  const range = maxVal - minVal;

  const width = 600;
  const height = 180;
  const paddingX = 40;
  const paddingY = 24;

  const points = history.map((pt, idx) => {
    const x = paddingX + (idx / (history.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - ((pt.priceUSD - minVal) / range) * (height - paddingY * 2);
    return { x, y, pt };
  });

  const pathD = points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  const isAtLowest = currentPriceUSD <= lowest30d;

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid var(--border-default)',
        padding: '24px',
        boxShadow: 'var(--shadow-card)',
        marginBottom: '32px'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <div className="flex items-center gap-xs">
            <TrendingDown size={18} style={{ color: '#059669' }} />
            <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#1A1A1A' }}>
              30-Day Price History Radar
            </h4>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
            Multi-retailer price tracking across Amazon, Walmart, and Best Buy
          </span>
        </div>

        {isAtLowest && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#ECFDF5', color: '#059669', padding: '3px 10px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 800 }}>
            <ShieldCheck size={13} /> Lowest Price in 30 Days
          </span>
        )}
      </div>

      {/* SVG Chart Container */}
      <div style={{ width: '100%', overflowX: 'auto', backgroundColor: '#F8FAFC', borderRadius: '12px', padding: '12px', border: '1px solid #E2E8F0' }}>
        <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
          {/* Subtle Gridlines */}
          <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} stroke="#E2E8F0" strokeDasharray="3 3" />
          <line x1={paddingX} y1={height / 2} x2={width - paddingX} y2={height / 2} stroke="#E2E8F0" strokeDasharray="3 3" />
          <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="#CBD5E1" strokeWidth={1.5} />

          {/* Area Fill */}
          <path d={areaD} fill="rgba(37, 99, 235, 0.08)" />

          {/* Line Path */}
          <path d={pathD} fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Data Points */}
          {points.map((p, idx) => (
            <g key={idx}>
              <circle cx={p.x} cy={p.y} r={idx === points.length - 1 ? 6 : 4} fill={idx === points.length - 1 ? '#059669' : '#2563EB'} stroke="#FFFFFF" strokeWidth={2} />
              <text x={p.x} y={p.y - 10} textAnchor="middle" fontSize="10" fontWeight="700" fill="#1A1A1A">
                {formatPrice(p.pt.priceUSD)}
              </text>
              <text x={p.x} y={height - 6} textAnchor="middle" fontSize="9" fontWeight="600" fill="#6B7280">
                {p.pt.dayLabel}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Summary Footer */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          marginTop: '16px',
          paddingTop: '12px',
          borderTop: '1px solid #F1F5F9',
          textAlign: 'center'
        }}
      >
        <div>
          <span style={{ fontSize: '0.72rem', color: '#6B7280', textTransform: 'uppercase' }}>Lowest (30d)</span>
          <div className="font-mono" style={{ fontSize: '1rem', fontWeight: 800, color: '#059669' }}>
            {formatPrice(lowest30d)}
          </div>
        </div>

        <div>
          <span style={{ fontSize: '0.72rem', color: '#6B7280', textTransform: 'uppercase' }}>Average (30d)</span>
          <div className="font-mono" style={{ fontSize: '1rem', fontWeight: 800, color: '#4B5563' }}>
            {formatPrice(average30d)}
          </div>
        </div>

        <div>
          <span style={{ fontSize: '0.72rem', color: '#6B7280', textTransform: 'uppercase' }}>Highest (30d)</span>
          <div className="font-mono" style={{ fontSize: '1rem', fontWeight: 800, color: '#DC2626' }}>
            {formatPrice(highest30d)}
          </div>
        </div>
      </div>
    </div>
  );
};
