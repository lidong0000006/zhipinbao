import React from 'react';
import { useTranslation } from '../i18n/i18n.jsx';
import { getPostById } from '../utils/blogData.js';
import { Clock, ArrowLeft, Calendar, Tag } from 'lucide-react';

export default function BlogPostPage({ postId, onBack }) {
  const { t, locale } = useTranslation();
  const post = getPostById(postId);
  const isZh = locale === 'zh-CN';

  if (!post) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <p style={{ color: 'var(--text-muted)' }}>Post not found.</p>
        <button onClick={onBack} className="gradient-btn" style={{ marginTop: '16px' }}>
          <ArrowLeft size={16} /> {t('blog.backToList')}
        </button>
      </div>
    );
  }

  const content = isZh ? post.contentZh : post.contentEn;
  const title = isZh ? post.titleZh : post.titleEn;
  const summary = isZh ? post.summaryZh : post.summaryEn;

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Back */}
      <button
        onClick={onBack}
        className="secondary-btn"
        style={{ marginBottom: '24px', padding: '8px 16px', fontSize: '0.87rem' }}
      >
        <ArrowLeft size={15} /> {t('blog.backToList')}
      </button>

      {/* Article Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(139,92,246,0.1) 100%)',
        border: '1px solid rgba(59,130,246,0.2)',
        borderRadius: '20px',
        padding: '48px 40px',
        marginBottom: '36px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>{post.emoji}</div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
          <span style={{
            padding: '5px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700,
            background: `${post.categoryColor}22`, color: post.categoryColor,
            border: `1px solid ${post.categoryColor}44`,
            display: 'flex', alignItems: 'center', gap: '5px',
          }}><Tag size={12} /> {post.category}</span>
          <span style={{ color: 'var(--text-dim)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={13} /> {post.readTime}
          </span>
          <span style={{ color: 'var(--text-dim)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={13} /> {post.date}
          </span>
        </div>

        <h1 style={{
          fontSize: '2rem', fontWeight: 800, lineHeight: 1.25,
          background: 'linear-gradient(135deg, #f8fafc, #94a3b8)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: '16px', letterSpacing: '-0.02em',
        }}>
          {title}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '620px', margin: '0 auto', lineHeight: 1.7 }}>
          {summary}
        </p>
      </div>

      {/* Article Content */}
      <div className="glass-panel" style={{ padding: '40px' }}>
        <div
          style={{
            color: 'var(--text-muted)',
            lineHeight: 1.85,
            fontSize: '1rem',
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

      {/* Article Footer */}
      <div style={{
        marginTop: '24px', padding: '24px',
        borderRadius: '16px',
        background: 'rgba(59,130,246,0.06)',
        border: '1px solid rgba(59,130,246,0.15)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px',
      }}>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.88rem' }}>
          {t('blog.articleFooter')}
        </p>
        <button onClick={onBack} className="gradient-btn" style={{ padding: '8px 20px', fontSize: '0.88rem' }}>
          <ArrowLeft size={15} /> {t('blog.backToList')}
        </button>
      </div>

      {/* Inline CSS for article content */}
      <style>{`
        .glass-panel h2 {
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--text-main);
          margin: 28px 0 12px;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .glass-panel p {
          margin-bottom: 14px;
        }
        .glass-panel ul {
          padding-left: 22px;
          margin-bottom: 14px;
        }
        .glass-panel li {
          margin-bottom: 8px;
          line-height: 1.7;
        }
      `}</style>
    </div>
  );
}
