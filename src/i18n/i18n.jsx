import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Import all locale files
import zhCN from './locales/zh-CN.js';
import en from './locales/en.js';
import ja from './locales/ja.js';
import ko from './locales/ko.js';
import fr from './locales/fr.js';
import es from './locales/es.js';

// Supported languages configuration
export const SUPPORTED_LANGUAGES = [
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳', shortName: '中文' },
  { code: 'en',    name: 'English',  flag: '🇺🇸', shortName: 'EN' },
  { code: 'ja',    name: '日本語',    flag: '🇯🇵', shortName: '日本語' },
  { code: 'ko',    name: '한국어',    flag: '🇰🇷', shortName: '한국어' },
  { code: 'fr',    name: 'Français', flag: '🇫🇷', shortName: 'FR' },
  { code: 'es',    name: 'Español',  flag: '🇪🇸', shortName: 'ES' },
];

// Locale data map
const LOCALES = {
  'zh-CN': zhCN,
  'en': en,
  'ja': ja,
  'ko': ko,
  'fr': fr,
  'es': es,
};

const STORAGE_KEY = 'jobportal_locale';

/**
 * Detect the best matching locale from browser settings
 */
function detectBrowserLocale() {
  const browserLangs = navigator.languages || [navigator.language || navigator.userLanguage || 'en'];
  
  for (const lang of browserLangs) {
    const normalized = lang.trim();
    // Exact match
    if (LOCALES[normalized]) return normalized;
    // zh-CN, zh-TW, zh -> zh-CN
    if (normalized.startsWith('zh')) return 'zh-CN';
    // Base language match (e.g., 'en-GB' -> 'en')
    const base = normalized.split('-')[0];
    if (LOCALES[base]) return base;
  }
  
  return 'en'; // default fallback
}

/**
 * Get the initial locale: saved preference > browser detection
 */
function getInitialLocale() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && LOCALES[saved]) return saved;
  } catch (e) {
    // localStorage not available
  }
  return detectBrowserLocale();
}

// Create context
const LanguageContext = createContext(null);

/**
 * LanguageProvider - wraps the app to provide i18n context
 */
export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(getInitialLocale);

  const setLocale = useCallback((newLocale) => {
    if (LOCALES[newLocale]) {
      setLocaleState(newLocale);
      try {
        localStorage.setItem(STORAGE_KEY, newLocale);
      } catch (e) {
        // ignore
      }
      // Update HTML lang attribute
      document.documentElement.lang = newLocale;
    }
  }, []);

  // Set initial HTML lang
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  /**
   * Translation function with fallback chain:
   * current locale -> en -> key itself
   * Supports interpolation: t('hello', { name: 'World' }) where message is "Hello {name}"
   */
  const t = useCallback((key, params = {}) => {
    let message = LOCALES[locale]?.[key] ?? LOCALES['en']?.[key] ?? key;

    // Simple interpolation: replace {variable} patterns
    if (params && typeof message === 'string') {
      Object.entries(params).forEach(([k, v]) => {
        message = message.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
      });
    }

    return message;
  }, [locale]);

  const value = {
    locale,
    setLocale,
    t,
    languages: SUPPORTED_LANGUAGES,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * useTranslation hook - access t(), locale, setLocale from any component
 */
export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
