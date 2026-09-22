import React from 'react';
import { useTranslation } from '../i18n/i18n.jsx';
import { Sparkles, Target, Globe, Users, Shield, Zap, Award, Heart } from 'lucide-react';

export default function AboutPage() {
  const { t } = useTranslation();

  const stats = [
    { value: '120+', label: t('about.stat1') },
    { value: '50K+', label: t('about.stat2') },
    { value: '98%', label: t('about.stat3') },
    { value: '6', label: t('about.stat4') },
  ];

  const values = [
    {
      icon: <Target size={28} color="#3b82f6" />,
      title: t('about.value1Title'),
      desc: t('about.value1Desc'),
    },
    {
      icon: <Shield size={28} color="#10b981" />,
      title: t('about.value2Title'),
      desc: t('about.value2Desc'),
    },
    {
      icon: <Zap size={28} color="#f59e0b" />,
      title: t('about.value3Title'),
      desc: t('about.value3Desc'),
    },
    {
      icon: <Globe size={28} color="#8b5cf6" />,
      title: t('about.value4Title'),
      desc: t('about.value4Desc'),
    },
  ];

  const team = [
    {
      name: 'Alex Chen',
      role: t('about.team1Role'),
      bio: t('about.team1Bio'),
      avatar: '👨‍💼',
    },
    {
      name: 'Sarah Lin',
      role: t('about.team2Role'),
      bio: t('about.team2Bio'),
      avatar: '👩‍💻',
    },
    {
      name: 'Marcus Wei',
      role: t('about.team3Role'),
      bio: t('about.team3Bio'),
      avatar: '👨‍🔬',
    },
  ];

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(139,92,246,0.15) 100%)',
        border: '1px solid rgba(59,130,246,0.2)',
        borderRadius: '20px',
        padding: '60px 40px',
        textAlign: 'center',
        marginBottom: '48px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px',
          width: '200px', height: '200px',
          background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '20px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 30px rgba(59,130,246,0.4)',
          }}>
            <Sparkles size={36} color="#fff" />
          </div>
        </div>
        <h1 style={{
          fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em',
          background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: '16px',
        }}>
          {t('about.heroTitle')}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '640px', margin: '0 auto', lineHeight: 1.7 }}>
          {t('about.heroDesc')}
        </p>
      </div>

      {/* Stats Row */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '20px', marginBottom: '48px',
      }}>
        {stats.map((s, i) => (
          <div key={i} className="glass-panel" style={{ padding: '28px', textAlign: 'center' }}>
            <div style={{
              fontSize: '2.4rem', fontWeight: 800,
              background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              marginBottom: '8px',
            }}>{s.value}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Mission */}
      <div className="glass-panel" style={{ padding: '40px', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.6rem', color: 'var(--text-main)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Heart size={24} color="#f43f5e" /> {t('about.missionTitle')}
        </h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1rem' }}>
          {t('about.missionDesc')}
        </p>
      </div>

      {/* Core Values */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '24px' }}>
        {t('about.valuesTitle')}
      </h2>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '20px', marginBottom: '48px',
      }}>
        {values.map((v, i) => (
          <div key={i} className="glass-panel" style={{ padding: '28px' }}>
            <div style={{ marginBottom: '14px' }}>{v.icon}</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
              {v.title}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>{v.desc}</p>
          </div>
        ))}
      </div>

      {/* Team */}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Users size={24} color="#3b82f6" /> {t('about.teamTitle')}
      </h2>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '20px', marginBottom: '48px',
      }}>
        {team.map((m, i) => (
          <div key={i} className="glass-panel" style={{ padding: '32px', textAlign: 'center' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '12px' }}>{m.avatar}</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>{m.name}</div>
            <div style={{
              display: 'inline-block', padding: '4px 14px', borderRadius: '20px',
              background: 'rgba(59,130,246,0.15)', color: '#60a5fa',
              fontSize: '0.8rem', fontWeight: 600, marginBottom: '12px',
            }}>{m.role}</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.7 }}>{m.bio}</p>
          </div>
        ))}
      </div>

      {/* Awards / Trust Signals */}
      <div className="glass-panel" style={{
        padding: '32px',
        background: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(59,130,246,0.08) 100%)',
        border: '1px solid rgba(16,185,129,0.2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <Award size={28} color="#10b981" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>
            {t('about.trustTitle')}
          </h3>
        </div>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {['trust1', 'trust2', 'trust3', 'trust4'].map((key, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              <span style={{ color: '#10b981', fontWeight: 700, marginTop: '2px' }}>✓</span>
              {t(`about.${key}`)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
