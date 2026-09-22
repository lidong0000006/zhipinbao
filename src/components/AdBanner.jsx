import React, { useEffect, useRef } from 'react';

/**
 * AdBanner - Google AdSense 广告组件
 * 
 * 使用方法:
 * 1. 申请通过后，将 YOUR_ADSENSE_CLIENT_ID 替换为你的 ca-pub-XXXXXXXXXX
 * 2. 将 YOUR_AD_SLOT_ID 替换为对应广告单元的 slot ID
 * 3. 在 index.html 中取消注释 AdSense script 标签
 * 
 * 广告尺寸参考:
 * - 'horizontal': 728x90 (leaderboard) 或 320x50 (mobile banner)
 * - 'rectangle': 300x250 (medium rectangle) - 最高转化率
 * - 'vertical': 160x600 (wide skyscraper) 或 300x600 (half page)
 */

const AD_CONFIG = {
  client: 'ca-pub-XXXXXXXXXX', // ← 替换为你的 Publisher ID
  slots: {
    horizontal: 'XXXXXXXXXX',  // ← 替换为横幅广告的 slot ID
    rectangle: 'XXXXXXXXXX',   // ← 替换为矩形广告的 slot ID
    vertical: 'XXXXXXXXXX',    // ← 替换为竖幅广告的 slot ID
  },
};

const SLOT_STYLES = {
  horizontal: {
    display: 'block',
    minHeight: '90px',
    width: '100%',
  },
  rectangle: {
    display: 'inline-block',
    width: '300px',
    height: '250px',
  },
  vertical: {
    display: 'inline-block',
    width: '160px',
    height: '600px',
  },
};

/**
 * @param {'horizontal' | 'rectangle' | 'vertical'} type - 广告类型
 * @param {string} className - 额外的 CSS class
 * @param {object} style - 额外的内联样式
 */
export default function AdBanner({ type = 'horizontal', className = '', style = {} }) {
  const adRef = useRef(null);
  const isProduction = AD_CONFIG.client !== 'ca-pub-XXXXXXXXXX';

  useEffect(() => {
    if (!isProduction) return;
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.warn('AdSense push failed:', e);
    }
  }, [isProduction]);

  // 开发模式：显示占位符
  if (!isProduction) {
    return (
      <div
        style={{
          ...SLOT_STYLES[type],
          background: 'rgba(59,130,246,0.04)',
          border: '1px dashed rgba(59,130,246,0.25)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '6px',
          color: 'var(--text-dim)',
          fontSize: '0.78rem',
          fontWeight: 500,
          ...style,
        }}
        className={className}
      >
        <span style={{ fontSize: '1.2rem' }}>📢</span>
        <span>Ad Placeholder ({type})</span>
        <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>AdSense 广告将在审批后显示</span>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', ...style }} className={className}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={SLOT_STYLES[type]}
        data-ad-client={AD_CONFIG.client}
        data-ad-slot={AD_CONFIG.slots[type]}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
