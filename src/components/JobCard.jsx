import React from 'react';
import { MapPin, Building, GraduationCap, Briefcase, Flame, CheckCircle } from 'lucide-react';
import { useTranslation } from '../i18n/i18n.jsx';

export default function JobCard({ job, onClick, onApplyQuick }) {
  const { t } = useTranslation();

  const getTypeBadgeClass = (type) => {
    switch (type) {
      case '全职': case 'Full-Time': case '正社員': case '정규직': case 'Temps plein': case 'Tiempo Completo': return 'badge-fulltime';
      case '兼职': case 'Part-Time': case 'アルバイト': case '알바': case 'Temps partiel': case 'Medio Tiempo': return 'badge-parttime';
      case '远程': case 'Remote': case 'リモート': case '재택': case 'Télétravail': case 'Remoto': return 'badge-remote';
      case '实习': case 'Internship': case 'インターン': case '인턴': case 'Stage': case 'Prácticas': return 'badge-intern';
      default: return 'badge-fulltime';
    }
  };

  const getTranslatedType = (type) => {
    switch (type) {
      case '全职': return t('type.fulltime');
      case '兼职': return t('type.parttime');
      case '远程': return t('type.remote');
      case '实习': return t('type.intern');
      default: return type;
    }
  };

  return (
    <div 
      className="glass-panel"
      onClick={() => onClick(job)}
      style={{
        padding: '22px',
        borderRadius: '16px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        position: 'relative'
      }}
    >
      <div>
        {/* Top Header: Title & Badges */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '10px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
              <span className={`badge ${getTypeBadgeClass(job.type)}`}>
                {getTranslatedType(job.type)}
              </span>
              {job.industry && (
                <span className="badge badge-remote" style={{ padding: '2px 8px' }}>
                  🏢 {job.industry}
                </span>
              )}
              {job.urgent && (
                <span className="badge badge-urgent">
                  <Flame size={12} /> {t('job.urgent')}
                </span>
              )}
            </div>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', lineHeight: 1.3 }}>
              {job.title}
            </h3>
          </div>

          {/* Salary Highlight */}
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: job.salaryType === '日薪' ? '#fbbf24' : '#38bdf8' }}>
              {job.salary}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
              {job.salaryType === '日薪' ? t('job.salaryDaily') : t('job.salaryMonthly')}
            </div>
          </div>
        </div>

        {/* Company & Location Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px', flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#f8fafc', fontWeight: 600 }}>
            <Building size={15} color="#60a5fa" />
            {job.company}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={14} color="#10b981" />
            {job.city} · {job.district}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Briefcase size={14} />
            {job.experience}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <GraduationCap size={14} />
            {job.education}
          </span>
        </div>

        {/* Benefit & Skill Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
          {job.tags && job.tags.slice(0, 4).map((tag, idx) => (
            <span key={idx} className="chip-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer: Recruiter Card & Apply Button */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '12px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img
            src={job.recruiter?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
            alt={job.recruiter?.name}
            style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(59, 130, 246, 0.4)' }}
          />
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)' }}>
              {job.recruiter?.name || t('job.recruiter')}
            </div>
            <div style={{ fontSize: '0.7rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <CheckCircle size={10} /> {t('job.onlineRecruit')}
            </div>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onApplyQuick(job);
          }}
          className="gradient-btn"
          style={{ padding: '6px 14px', fontSize: '0.82rem', borderRadius: '8px' }}
        >
          {t('job.applyNow')}
        </button>
      </div>

    </div>
  );
}

