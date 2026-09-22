import React, { useState } from 'react';
import { useTranslation } from '../i18n/i18n.jsx';
import { Mail, MessageSquare, Clock, Send, CheckCircle, MapPin, Building } from 'lucide-react';

export default function ContactPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const contacts = [
    {
      icon: <Mail size={24} color="#3b82f6" />,
      title: t('contact.emailTitle'),
      value: 'lidong0000006@gmail.com',
      desc: t('contact.emailDesc'),
    },
    {
      icon: <Clock size={24} color="#10b981" />,
      title: t('contact.hoursTitle'),
      value: t('contact.hoursValue'),
      desc: t('contact.hoursDesc'),
    },
    {
      icon: <Building size={24} color="#8b5cf6" />,
      title: t('contact.businessTitle'),
      value: 'business@jobportal.com',
      desc: t('contact.businessDesc'),
    },
  ];

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(16,185,129,0.12) 100%)',
        border: '1px solid rgba(59,130,246,0.2)',
        borderRadius: '20px',
        padding: '48px 40px',
        textAlign: 'center',
        marginBottom: '40px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '18px',
            background: 'linear-gradient(135deg, #3b82f6, #10b981)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 25px rgba(59,130,246,0.4)',
          }}>
            <MessageSquare size={30} color="#fff" />
          </div>
        </div>
        <h1 style={{
          fontSize: '2.2rem', fontWeight: 800,
          background: 'linear-gradient(135deg, #60a5fa, #34d399)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: '12px',
        }}>
          {t('contact.heroTitle')}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto' }}>
          {t('contact.heroDesc')}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '28px', alignItems: 'start' }}>
        {/* Left: Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {contacts.map((c, i) => (
            <div key={i} className="glass-panel" style={{ padding: '24px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                {c.icon}
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px', fontSize: '0.95rem' }}>{c.title}</div>
                <div style={{ color: '#60a5fa', fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>{c.value}</div>
                <div style={{ color: 'var(--text-dim)', fontSize: '0.82rem' }}>{c.desc}</div>
              </div>
            </div>
          ))}

          {/* Map placeholder */}
          <div className="glass-panel" style={{
            padding: '20px', textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(59,130,246,0.05), rgba(139,92,246,0.05))',
          }}>
            <MapPin size={20} color="#8b5cf6" style={{ marginBottom: '8px' }} />
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>
              {t('contact.globalDesc')}
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="glass-panel" style={{ padding: '36px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <CheckCircle size={56} color="#10b981" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '10px' }}>
                {t('contact.successTitle')}
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>{t('contact.successDesc')}</p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                className="gradient-btn"
                style={{ marginTop: '24px' }}
              >
                {t('contact.sendAnother')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '24px' }}>
                {t('contact.formTitle')}
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>
                    {t('contact.nameLabel')} *
                  </label>
                  <input
                    id="contact-name"
                    className="glass-input"
                    placeholder={t('contact.namePlaceholder')}
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>
                    {t('contact.emailLabel')} *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className="glass-input"
                    placeholder={t('contact.emailPlaceholder')}
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>
                  {t('contact.subjectLabel')}
                </label>
                <input
                  id="contact-subject"
                  className="glass-input"
                  placeholder={t('contact.subjectPlaceholder')}
                  value={form.subject}
                  onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>
                  {t('contact.messageLabel')} *
                </label>
                <textarea
                  id="contact-message"
                  className="glass-input"
                  rows={6}
                  style={{ resize: 'vertical' }}
                  placeholder={t('contact.messagePlaceholder')}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  required
                />
              </div>

              <button
                type="submit"
                className="gradient-btn"
                style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
                disabled={submitting}
              >
                {submitting ? (
                  <>{t('contact.sending')}...</>
                ) : (
                  <><Send size={16} /> {t('contact.sendBtn')}</>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
