import React, { useEffect, useRef } from 'react';

/**
 * AdBanner - Google AdSense 广告组件
 * 
 * 使用方法:
 * 1. index.html 中的 AdSense script 用于站点关联和审核
 * 2. 申请通过后，将下面的广告位 slot ID 替换为 AdSense 后台生成的真实 ID
 * 
 * 广告尺寸参考:
 * - 'horizontal': 728x90 (leaderboard) 或 320x50 (mobile banner)
 * - 'rectangle': 300x250 (medium rectangle) - 最高转化率
 * - 'vertical': 160x600 (wide skyscraper) 或 300x600 (half page)
 */

const AD_CONFIG = {
  client: 'ca-pub-1547189169506398',
  slots: {
    horizontal: 'XXXXXXXXXX',
    rectangle: 'XXXXXXXXXX',
    vertical: 'XXXXXXXXXX',
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
  const adSlot = AD_CONFIG.slots[type];
  const hasValidAdConfig = AD_CONFIG.client.startsWith('ca-pub-') && adSlot && adSlot !== 'XXXXXXXXXX';

  useEffect(() => {
    if (!hasValidAdConfig) return;
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.warn('AdSense push failed:', e);
    }
  }, [hasValidAdConfig]);

  // 站点审核阶段可能还没有广告单元 ID，先保留版位但不加载无效广告。
  if (!hasValidAdConfig) {
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
        <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>AdSense 通过后填入广告位 ID</span>
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
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
