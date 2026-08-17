import React from 'react';
import { Product } from '../../types/product';
import { SpecComparisonRow } from '../../types/comparison';
import { Check, X, Sparkles } from 'lucide-react';

interface SpecificationMatrixProps {
  productA: Product;
  productB: Product;
  productC?: Product;
  customRows?: SpecComparisonRow[];
}

export const SpecificationMatrix: React.FC<SpecificationMatrixProps> = ({
  productA,
  productB,
  productC,
  customRows
}) => {
  // Built-in feature rows if no custom rows
  const rows: SpecComparisonRow[] = customRows || [
    { featureName: 'Product Brand', valueA: productA.brand, valueB: productB.brand },
    { featureName: 'Customer Rating', valueA: `${productA.rating} / 5.0 (${productA.reviewCount.toLocaleString()} reviews)`, valueB: `${productB.rating} / 5.0 (${productB.reviewCount.toLocaleString()} reviews)`, highlightDifference: true },
    { featureName: 'Hype Index', valueA: `${productA.hypeScore}%`, valueB: `${productB.hypeScore}%` },
    { featureName: 'Worth Index', valueA: `${productA.worthScore}%`, valueB: `${productB.worthScore}%`, highlightDifference: true },
    { featureName: 'In-Stock Availability', valueA: productA.inStock !== false, valueB: productB.inStock !== false },
    ...((productA.specs || []).map((s, idx) => {
      const matchB = productB.specs?.find((sb) => sb.name.toLowerCase() === s.name.toLowerCase());
      return {
        featureName: s.name,
        valueA: s.value,
        valueB: matchB ? matchB.value : '—'
      };
    }))
  ];

  const renderValue = (val: string | boolean | undefined) => {
    if (val === true) return <Check size={16} style={{ color: '#059669', strokeWidth: 3 }} />;
    if (val === false) return <X size={16} style={{ color: '#DC2626', strokeWidth: 2.5 }} />;
    return <span>{val || '—'}</span>;
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid var(--border-default)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-card)',
        marginBottom: '36px'
      }}
    >
      <div style={{ padding: '18px 24px', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', fontWeight: 800, fontSize: '0.95rem', color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        Detailed Specification Matrix
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#FFFFFF', borderBottom: '2px solid #E2E8F0' }}>
              <th style={{ padding: '14px 20px', width: '28%', color: '#6B7280', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Feature / Spec
              </th>
              <th style={{ padding: '14px 20px', width: '36%', color: '#2563EB', fontWeight: 800 }}>
                {productA.name.slice(0, 32)}...
              </th>
              <th style={{ padding: '14px 20px', width: '36%', color: '#1A1A1A', fontWeight: 800 }}>
                {productB.name.slice(0, 32)}...
              </th>
              {productC && (
                <th style={{ padding: '14px 20px', width: '25%', color: '#9333EA', fontWeight: 800 }}>
                  {productC.name.slice(0, 28)}...
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={idx}
                style={{
                  backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC',
                  borderBottom: '1px solid #F1F5F9'
                }}
              >
                <td style={{ padding: '12px 20px', fontWeight: 600, color: '#374151' }}>
                  {row.featureName}
                </td>
                <td style={{ padding: '12px 20px', color: '#1A1A1A', fontWeight: 500 }}>
                  {renderValue(row.valueA)}
                </td>
                <td style={{ padding: '12px 20px', color: '#1A1A1A', fontWeight: 500 }}>
                  {renderValue(row.valueB)}
                </td>
                {productC && (
                  <td style={{ padding: '12px 20px', color: '#1A1A1A', fontWeight: 500 }}>
                    {renderValue(row.valueC)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
