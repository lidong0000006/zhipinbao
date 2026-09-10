import zhCN from './zh-CN.js';
import en from './en.js';
import ja from './ja.js';
import ko from './ko.js';
import fr from './fr.js';
import es from './es.js';

export const locales = {
  'zh-CN': { name: '简体中文', nativeName: '中文 (中国)', flag: '🇨🇳', messages: zhCN },
  'en': { name: 'English', nativeName: 'English (US)', flag: '🇺🇸', messages: en },
  'ja': { name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', messages: ja },
  'ko': { name: 'Korean', nativeName: '한국어', flag: '🇰🇷', messages: ko },
  'fr': { name: 'French', nativeName: 'Français', flag: '🇫🇷', messages: fr },
  'es': { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', messages: es },
};

export default locales;
