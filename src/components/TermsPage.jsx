import React, { useState } from 'react';
import { useTranslation } from '../i18n/i18n.jsx';
import { FileText, ChevronDown, ChevronUp } from 'lucide-react';

function Section({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="glass-panel" style={{ marginBottom: '16px', overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--text-main)', fontWeight: 700, fontSize: '1rem',
          borderBottom: open ? '1px solid rgba(255,255,255,0.07)' : 'none',
        }}
      >
        {title}
        {open ? <ChevronUp size={18} color="var(--text-dim)" /> : <ChevronDown size={18} color="var(--text-dim)" />}
      </button>
      {open && (
        <div style={{ padding: '20px 24px', color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.92rem' }}>
          {children}
        </div>
      )}
    </div>
  );
}

export default function TermsPage() {
  const { t } = useTranslation();

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(59,130,246,0.12) 100%)',
        border: '1px solid rgba(245,158,11,0.25)',
        borderRadius: '20px',
        padding: '48px 40px',
        textAlign: 'center',
        marginBottom: '36px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '18px',
            background: 'linear-gradient(135deg, #f59e0b, #3b82f6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 25px rgba(245,158,11,0.4)',
          }}>
            <FileText size={30} color="#fff" />
          </div>
        </div>
        <h1 style={{
          fontSize: '2.2rem', fontWeight: 800,
          background: 'linear-gradient(135deg, #fbbf24, #60a5fa)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: '12px',
        }}>
          {t('terms.heroTitle')}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          {t('terms.lastUpdated')}: September 1, 2026
        </p>
      </div>

      {/* Intro */}
      <div className="glass-panel" style={{
        padding: '24px', marginBottom: '24px',
        background: 'rgba(245,158,11,0.06)',
        border: '1px solid rgba(245,158,11,0.2)',
      }}>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.95rem' }}>
          {t('terms.intro')}
        </p>
      </div>

      <Section title={t('terms.sec1Title')}>
        <p>{t('terms.sec1P1')}</p>
      </Section>

      <Section title={t('terms.sec2Title')}>
        <p style={{ marginBottom: '12px' }}>{t('terms.sec2P1')}</p>
        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>{t('terms.sec2L1')}</li>
          <li>{t('terms.sec2L2')}</li>
          <li>{t('terms.sec2L3')}</li>
          <li>{t('terms.sec2L4')}</li>
        </ul>
      </Section>

      <Section title={t('terms.sec3Title')}>
        <p style={{ marginBottom: '12px' }}>{t('terms.sec3P1')}</p>
        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>{t('terms.sec3L1')}</li>
          <li>{t('terms.sec3L2')}</li>
          <li>{t('terms.sec3L3')}</li>
        </ul>
      </Section>

      <Section title={t('terms.sec4Title')}>
        <p>{t('terms.sec4P1')}</p>
      </Section>

      <Section title={t('terms.sec5Title')}>
        <p style={{ marginBottom: '12px' }}>{t('terms.sec5P1')}</p>
        <p>{t('terms.sec5P2')}</p>
      </Section>

      <Section title={t('terms.sec6Title')}>
        <p>{t('terms.sec6P1')}</p>
      </Section>

      <Section title={t('terms.sec7Title')}>
        <p>{t('terms.sec7P1')}</p>
      </Section>

      <Section title={t('terms.sec8Title')}>
        <p>{t('terms.sec8P1')}</p>
      </Section>

      {/* Contact */}
      <div className="glass-panel" style={{
        padding: '24px',
        background: 'rgba(245,158,11,0.06)',
        border: '1px solid rgba(245,158,11,0.2)',
      }}>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.92rem' }}>
          <strong style={{ color: 'var(--text-main)' }}>{t('terms.contactTitle')}: </strong>
          {t('terms.contactDesc')} <a href="mailto:lidong0000006@gmail.com" style={{ color: '#60a5fa' }}>lidong0000006@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
