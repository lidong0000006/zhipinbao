import React, { useState } from 'react';
import { useTranslation } from '../i18n/i18n.jsx';
import { Shield, ChevronDown, ChevronUp } from 'lucide-react';

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

export default function PrivacyPage() {
  const { t } = useTranslation();

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(59,130,246,0.12) 100%)',
        border: '1px solid rgba(16,185,129,0.25)',
        borderRadius: '20px',
        padding: '48px 40px',
        textAlign: 'center',
        marginBottom: '36px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '18px',
            background: 'linear-gradient(135deg, #10b981, #3b82f6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 25px rgba(16,185,129,0.4)',
          }}>
            <Shield size={30} color="#fff" />
          </div>
        </div>
        <h1 style={{
          fontSize: '2.2rem', fontWeight: 800,
          background: 'linear-gradient(135deg, #34d399, #60a5fa)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: '12px',
        }}>
          {t('privacy.heroTitle')}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          {t('privacy.lastUpdated')}: September 1, 2026
        </p>
      </div>

      {/* Intro */}
      <div className="glass-panel" style={{
        padding: '24px', marginBottom: '24px',
        background: 'rgba(59,130,246,0.06)',
        border: '1px solid rgba(59,130,246,0.2)',
      }}>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.95rem' }}>
          {t('privacy.intro')}
        </p>
      </div>

      <Section title={t('privacy.sec1Title')}>
        <p style={{ marginBottom: '12px' }}>{t('privacy.sec1P1')}</p>
        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>{t('privacy.sec1L1')}</li>
          <li>{t('privacy.sec1L2')}</li>
          <li>{t('privacy.sec1L3')}</li>
          <li>{t('privacy.sec1L4')}</li>
        </ul>
      </Section>

      <Section title={t('privacy.sec2Title')}>
        <p style={{ marginBottom: '12px' }}>{t('privacy.sec2P1')}</p>
        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>{t('privacy.sec2L1')}</li>
          <li>{t('privacy.sec2L2')}</li>
          <li>{t('privacy.sec2L3')}</li>
        </ul>
      </Section>

      <Section title={t('privacy.sec3Title')}>
        <p style={{ marginBottom: '12px' }}>{t('privacy.sec3P1')}</p>
        <p>{t('privacy.sec3P2')}</p>
      </Section>

      <Section title={t('privacy.sec4Title')}>
        <p style={{ marginBottom: '12px' }}>{t('privacy.sec4P1')}</p>
        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>{t('privacy.sec4L1')}</li>
          <li>{t('privacy.sec4L2')}</li>
          <li>{t('privacy.sec4L3')}</li>
        </ul>
      </Section>

      <Section title={t('privacy.sec5Title')}>
        <p style={{ marginBottom: '12px' }}>{t('privacy.sec5P1')}</p>
        <p style={{ marginBottom: '12px' }}>{t('privacy.sec5P2')}</p>
        <p>{t('privacy.sec5P3')}</p>
      </Section>

      <Section title={t('privacy.sec6Title')}>
        <p>{t('privacy.sec6P1')}</p>
      </Section>

      <Section title={t('privacy.sec7Title')}>
        <p>{t('privacy.sec7P1')}</p>
      </Section>

      {/* Contact */}
      <div className="glass-panel" style={{
        padding: '24px',
        background: 'rgba(16,185,129,0.06)',
        border: '1px solid rgba(16,185,129,0.2)',
      }}>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.92rem' }}>
          <strong style={{ color: 'var(--text-main)' }}>{t('privacy.contactTitle')}: </strong>
          {t('privacy.contactDesc')} <a href="mailto:lidong0000006@gmail.com" style={{ color: '#60a5fa' }}>lidong0000006@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
