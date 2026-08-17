import React, { useState } from 'react';
import { ArticleFAQ } from '../../types/content';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQAccordionProps {
  faqs: ArticleFAQ[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div style={{ marginTop: '36px', marginBottom: '32px' }}>
      <div className="flex items-center gap-xs" style={{ marginBottom: '16px' }}>
        <HelpCircle size={20} style={{ color: '#2563EB' }} />
        <h3 className="h3" style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em', fontSize: '1.05rem', color: '#1A1A1A' }}>
          Frequently Asked Questions
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid var(--border-default)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-card)'
              }}
            >
              <button
                onClick={() => toggle(idx)}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: isOpen ? '#F8FAFC' : '#FFFFFF',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: '#1A1A1A'
                }}
              >
                <span>{faq.question}</span>
                {isOpen ? <ChevronUp size={16} style={{ color: '#2563EB' }} /> : <ChevronDown size={16} style={{ color: '#6B7280' }} />}
              </button>

              {isOpen && (
                <div style={{ padding: '16px 20px', fontSize: '0.88rem', color: '#4B5563', lineHeight: 1.6, borderTop: '1px solid #F1F5F9' }}>
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
