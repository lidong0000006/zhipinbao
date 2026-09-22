import React, { useState } from 'react';
import { useTranslation } from '../i18n/i18n.jsx';
import { BLOG_POSTS } from '../utils/blogData.js';
import { Clock, ArrowRight, BookOpen, Tag } from 'lucide-react';

export default function BlogPage({ onPostClick }) {
  const { t, locale } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('All');
  const isZh = locale === 'zh-CN';

  const categories = ['All', ...new Set(BLOG_POSTS.map(p => p.category))];
  const filtered = activeCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.category === activeCategory);

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(139,92,246,0.12) 100%)',
        border: '1px solid rgba(59,130,246,0.2)',
        borderRadius: '20px',
        padding: '48px 40px',
        textAlign: 'center',
        marginBottom: '36px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '18px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 25px rgba(59,130,246,0.4)',
          }}>
            <BookOpen size={30} color="#fff" />
          </div>
        </div>
        <h1 style={{
          fontSize: '2.2rem', fontWeight: 800,
          background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: '12px',
        }}>
          {t('blog.heroTitle')}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '540px', margin: '0 auto' }}>
          {t('blog.heroDesc')}
        </p>
      </div>

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '28px' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={activeCategory === cat ? 'gradient-btn' : 'secondary-btn'}
            style={{ padding: '7px 16px', fontSize: '0.85rem' }}
          >
            <Tag size={13} />
            {cat === 'All' ? t('cat.all') : cat}
          </button>
        ))}
      </div>

      {/* Featured Post (first) */}
      {filtered.length > 0 && (
        <div
          className="glass-panel"
          onClick={() => onPostClick(filtered[0].id)}
          style={{
            padding: '36px',
            marginBottom: '28px',
            cursor: 'pointer',
            background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(139,92,246,0.08) 100%)',
            border: '1px solid rgba(59,130,246,0.25)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(59,130,246,0.25)'; }}
        >
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div style={{ fontSize: '5rem', flexShrink: 0 }}>{filtered[0].emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap' }}>
                <span style={{
                  padding: '4px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700,
                  background: `${filtered[0].categoryColor}22`, color: filtered[0].categoryColor,
                  border: `1px solid ${filtered[0].categoryColor}44`,
                }}>{filtered[0].category}</span>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} /> {filtered[0].readTime}
                </span>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.82rem' }}>{filtered[0].date}</span>
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '10px', lineHeight: 1.3 }}>
                {isZh ? filtered[0].titleZh : filtered[0].titleEn}
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '16px', fontSize: '0.95rem' }}>
                {isZh ? filtered[0].summaryZh : filtered[0].summaryEn}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#60a5fa', fontWeight: 600, fontSize: '0.9rem' }}>
                {t('blog.readMore')} <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {filtered.slice(1).map(post => (
          <div
            key={post.id}
            className="glass-panel"
            onClick={() => onPostClick(post.id)}
            style={{
              padding: '28px', cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = ''; }}
          >
            <div style={{ fontSize: '2.8rem', marginBottom: '16px' }}>{post.emoji}</div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap' }}>
              <span style={{
                padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700,
                background: `${post.categoryColor}22`, color: post.categoryColor,
                border: `1px solid ${post.categoryColor}44`,
              }}>{post.category}</span>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Clock size={11} /> {post.readTime}
              </span>
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px', lineHeight: 1.4 }}>
              {isZh ? post.titleZh : post.titleEn}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.87rem', lineHeight: 1.65, marginBottom: '16px' }}>
              {isZh ? post.summaryZh : post.summaryEn}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#60a5fa', fontWeight: 600, fontSize: '0.85rem' }}>
              {t('blog.readMore')} <ArrowRight size={14} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
