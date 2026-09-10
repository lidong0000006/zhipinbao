import React from 'react';
import { Search, Sparkles, Zap, MapPin } from 'lucide-react';
import { useTranslation } from '../i18n/i18n.jsx';

export default function HeroSection({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  activeIndustry,
  setActiveIndustry,
  currentCity,
  onSearch,
  stats
}) {
  const { t } = useTranslation();

  const categories = [
    { label: t('cat.all'), value: '全部', icon: '🔥' },
    { label: t('cat.fulltime'), value: '全职', icon: '💼' },
    { label: t('cat.parttime'), value: '兼职', icon: '⚡' },
    { label: t('cat.remote'), value: '远程', icon: '🌐' },
    { label: t('cat.intern'), value: '实习', icon: '🎓' },
  ];

  const industries = [
    { label: t('industry.all'), value: '全部行业' },
    { label: t('industry.tech'), value: '互联网/IT/技术' },
    { label: t('industry.media'), value: '新媒体/自媒体/影视' },
    { label: t('industry.design'), value: '设计/创意/广告' },
    { label: t('industry.education'), value: '教育/培训/翻译' },
    { label: t('industry.ecommerce'), value: '电子商务/跨境' },
    { label: t('industry.finance'), value: '金融/投资/财会' }
  ];

  const quickKeywords = ['React', 'Python', 'Video Editor', 'UI Design', 'Remote', 'Node.js'];

  return (
    <div className="glass-panel pulse-card" style={{ padding: '36px 32px', marginBottom: '28px', position: 'relative', overflow: 'hidden' }}>
      
      {/* Glow Orbs */}
      <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: '-40px', bottom: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '840px', margin: '0 auto', textAlign: 'center' }}>
        
        {/* Tech Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(59, 130, 246, 0.12)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '30px',
          padding: '6px 16px',
          fontSize: '0.85rem',
          color: '#60a5fa',
          fontWeight: 600,
          marginBottom: '16px'
        }}>
          <Sparkles size={16} color="#60a5fa" />
          <span>{t('hero.badge')}</span>
        </div>

        {/* Hero Title */}
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '12px', lineHeight: 1.2 }}>
          {t('hero.titlePrefix')} <span className="gradient-text">{currentCity || 'New York'}</span> - <span style={{ color: '#38bdf8' }}>{t('hero.titleFulltime')}</span> {t('hero.titleOr')} <span style={{ color: '#fbbf24' }}>{t('hero.titleParttime')}</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '28px' }}>
          {t('hero.subtitle')}
        </p>

        {/* Big Search Input Container */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(15, 23, 42, 0.9)',
          border: '1px solid rgba(59, 130, 246, 0.4)',
          borderRadius: '16px',
          padding: '6px',
          boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
          marginBottom: '20px'
        }}>
          <div style={{ paddingLeft: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#60a5fa', fontWeight: 600, whiteSpace: 'nowrap' }}>
            <MapPin size={18} />
            <span>{currentCity || 'New York'}</span>
            <span style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.15)', margin: '0 8px' }} />
          </div>

          <Search size={20} color="var(--text-dim)" style={{ marginLeft: '4px' }} />
          <input
            type="text"
            className="glass-input"
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: '1.05rem',
              boxShadow: 'none',
              padding: '12px 14px'
            }}
            placeholder={t('hero.searchPlaceholder')}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && onSearch()}
          />

          <button 
            onClick={onSearch}
            className="gradient-btn"
            style={{ padding: '14px 28px', fontSize: '1rem', borderRadius: '12px', whiteSpace: 'nowrap' }}
          >
            <Zap size={18} />
            {t('hero.searchBtn')}
          </button>
        </div>

        {/* Job Category Chips */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '14px' }}>
          {categories.map(cat => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                style={{
                  background: isActive ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' : 'rgba(30, 41, 59, 0.7)',
                  border: isActive ? '1px solid #60a5fa' : '1px solid rgba(255,255,255,0.08)',
                  color: isActive ? '#fff' : 'var(--text-muted)',
                  padding: '8px 18px',
                  borderRadius: '24px',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Industry Filter Pills */}
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '18px', padding: '8px 16px', background: 'rgba(15,23,42,0.6)', borderRadius: '30px' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)', fontWeight: 600, marginRight: '4px' }}>{t('hero.industryLabel')}</span>

          {industries.map(ind => {
            const isActive = activeIndustry === ind.value;
            return (
              <button
                key={ind.value}
                onClick={() => setActiveIndustry(ind.value)}
                style={{
                  background: isActive ? 'rgba(59, 130, 246, 0.3)' : 'transparent',
                  border: isActive ? '1px solid #60a5fa' : '1px solid transparent',
                  color: isActive ? '#60a5fa' : 'var(--text-muted)',
                  padding: '3px 12px',
                  borderRadius: '16px',
                  fontSize: '0.82rem',
                  fontWeight: isActive ? 700 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {ind.label}
              </button>
            );
          })}
        </div>

        {/* Quick Tag Suggestion */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-dim)' }}>
          <span>{t('hero.hotSearch')}</span>
          {quickKeywords.map(kw => (
            <span
              key={kw}
              onClick={() => {
                setSearchQuery(kw);
                onSearch();
              }}
              style={{
                cursor: 'pointer',
                color: '#60a5fa',
                background: 'rgba(59, 130, 246, 0.1)',
                padding: '2px 8px',
                borderRadius: '4px'
              }}
            >
              {kw}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}

