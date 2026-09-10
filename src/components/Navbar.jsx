import React from 'react';
import { MapPin, Briefcase, FileText, PlusCircle, UserCheck, Sparkles } from 'lucide-react';
import { useTranslation } from '../i18n/i18n.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';

export default function Navbar({ activeTab, setActiveTab, currentCity, openCitySelector, activeResume }) {
  const { t } = useTranslation();

  return (
    <header className="glass-panel" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none', position: 'sticky', top: 0, zIndex: 100, marginBottom: '24px' }}>
      <div className="app-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
        
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div 
            onClick={() => setActiveTab('jobs')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          >
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)'
            }}>
              <Sparkles size={22} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {t('brand.name')} <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#10b981', background: 'rgba(16, 185, 129, 0.15)', padding: '2px 8px', borderRadius: '10px', WebkitTextFillColor: 'initial', verticalAlign: 'middle', marginLeft: '4px' }}>{t('brand.badge')}</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', letterSpacing: '0.05em' }}>
                {t('brand.slogan')}
              </div>
            </div>
          </div>

          {/* City Selector Switcher */}
          <button 
            onClick={openCitySelector}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              color: '#60a5fa',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <MapPin size={15} color="#3b82f6" />
            <span>{currentCity || 'New York'}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>[{t('nav.switchCity')}]</span>
          </button>
        </div>

        {/* Navigation Tabs & Language Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setActiveTab('jobs')}
              className={activeTab === 'jobs' ? 'gradient-btn' : 'secondary-btn'}
              style={{ padding: '8px 16px', fontSize: '0.9rem' }}
            >
              <Briefcase size={17} />
              {t('nav.jobs')}
            </button>

            <button
              onClick={() => setActiveTab('resume')}
              className={activeTab === 'resume' ? 'gradient-btn' : 'secondary-btn'}
              style={{ padding: '8px 16px', fontSize: '0.9rem', position: 'relative' }}
            >
              <FileText size={17} />
              {t('nav.resume')}
              {activeResume && (
                <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', position: 'absolute', top: '6px', right: '6px' }} />
              )}
            </button>

            <button
              onClick={() => setActiveTab('applications')}
              className={activeTab === 'applications' ? 'gradient-btn' : 'secondary-btn'}
              style={{ padding: '8px 16px', fontSize: '0.9rem' }}
            >
              <UserCheck size={17} />
              {t('nav.applications')}
            </button>

            <button
              onClick={() => setActiveTab('postJob')}
              className="gradient-btn"
              style={{
                padding: '8px 18px',
                fontSize: '0.9rem',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
              }}
            >
              <PlusCircle size={17} />
              {t('nav.postJob')}
            </button>
          </nav>

          {/* Language Switcher Dropdown */}
          <LanguageSwitcher />
        </div>

      </div>
    </header>
  );
}

