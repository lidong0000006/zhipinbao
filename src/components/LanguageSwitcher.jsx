import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from '../i18n/i18n';
import './LanguageSwitcher.css';

export function LanguageSwitcher({ compact = false }) {
  const { locale, setLocale, languages, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLang = languages.find(l => l.code === locale) || languages[0];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="language-switcher-container" ref={dropdownRef}>
      <button 
        type="button"
        className={`lang-trigger-btn ${compact ? 'compact' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title={t('lang.switchTitle')}
        aria-expanded={isOpen}
      >
        <span className="lang-flag">{currentLang.flag}</span>
        {!compact && <span className="lang-name">{currentLang.shortName}</span>}
        <svg className={`lang-arrow ${isOpen ? 'open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className="lang-dropdown-menu animate-fadeIn">
          <div className="lang-menu-header">
            <span>🌐 {t('lang.switchTitle')}</span>
          </div>
          <div className="lang-options-list">
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                className={`lang-option-item ${lang.code === locale ? 'active' : ''}`}
                onClick={() => {
                  setLocale(lang.code);
                  setIsOpen(false);
                }}
              >
                <span className="lang-option-flag">{lang.flag}</span>
                <span className="lang-option-name">{lang.name}</span>
                {lang.code === locale && (
                  <span className="lang-checkmark">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
