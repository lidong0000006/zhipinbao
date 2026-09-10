import React, { useState } from 'react';
import { X, MapPin, Building, Briefcase, GraduationCap, Flame, Send, CheckCircle, Navigation, ShieldCheck, Sparkles } from 'lucide-react';
import { applyJob } from '../utils/api.js';
import { useTranslation } from '../i18n/i18n.jsx';

export default function JobDetailModal({ job, onClose, activeResume, onApplicationSuccess }) {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const [applicantNote, setApplicantNote] = useState('');
  const [appliedStatus, setAppliedStatus] = useState(false);

  if (!job) return null;

  const handleApply = async () => {
    setSubmitting(true);
    try {
      await applyJob(job.id, {
        resumeId: activeResume?.id || null,
        candidateName: activeResume?.name || 'Applicant',
        candidatePhone: activeResume?.phone || '13800138000',
        candidateIndustry: activeResume?.industry || 'Tech',
        note: applicantNote || 'Very interested in this position!'
      });
      setAppliedStatus(true);
      if (onApplicationSuccess) onApplicationSuccess();
    } catch (err) {
      alert(err.message || t('common.error'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content glass-panel" 
        style={{ maxWidth: '800px', padding: '32px', borderRadius: '24px' }} 
        onClick={e => e.stopPropagation()}
      >
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className={`badge ${job.type === '兼职' ? 'badge-parttime' : (job.type === '远程' ? 'badge-remote' : 'badge-fulltime')}`}>
                {job.type}
              </span>
              {job.urgent && (
                <span className="badge badge-urgent"><Flame size={12} /> {t('detail.urgentJob')}</span>
              )}
              <span style={{ fontSize: '0.8rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.12)', padding: '2px 8px', borderRadius: '12px' }}>
                <ShieldCheck size={12} style={{ verticalAlign: 'middle', marginRight: '3px' }} /> {t('detail.verified')}
              </span>
            </div>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '6px' }}>{job.title}</h2>
            <div style={{ fontSize: '1.05rem', color: '#60a5fa', fontWeight: 600 }}>{job.company}</div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: job.salaryType === '日薪' ? '#fbbf24' : '#38bdf8' }}>
              {job.salary}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
              {job.salaryType === '日薪' ? t('job.salaryDaily') : t('job.salaryMonthly')} · {t('detail.salaryOnTime')}
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', marginTop: '8px' }}>
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Basic Info Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
          background: 'rgba(30, 41, 59, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{t('detail.location')}</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={15} color="#10b981" /> {job.city} · {job.district}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{t('detail.experience')}</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Briefcase size={15} color="#3b82f6" /> {job.experience}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{t('detail.education')}</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <GraduationCap size={15} color="#8b5cf6" /> {job.education}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{t('detail.jobType')}</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fbbf24' }}>{job.type}</div>
          </div>
        </div>

        {/* Tags */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>{t('detail.tagsTitle')}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {job.tags && job.tags.map((tag, i) => (
              <span key={i} className="chip-tag" style={{ padding: '5px 12px', fontSize: '0.85rem', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', borderColor: 'rgba(59, 130, 246, 0.3)' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Recruiter Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '16px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <img
              src={job.recruiter?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
              alt="HR"
              style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid #3b82f6' }}
            />
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {job.recruiter?.name} · <span style={{ fontSize: '0.85rem', fontWeight: 400, color: 'var(--text-muted)' }}>{job.recruiter?.title}</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <CheckCircle size={13} /> {t('detail.hrOnline')}
              </div>
            </div>
          </div>
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 600 }}>
            {t('detail.allowChat')}
          </div>
        </div>

        {/* Location & Map Visual Box */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Navigation size={16} color="#10b981" /> {t('detail.navTitle')}
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{t('detail.distance')}</span>
          </div>
          <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            📍 {job.city} {job.district} {job.address}
          </div>
        </div>

        {/* Job Description & Requirements */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '10px' }}>{t('detail.descTitle')}</h4>
          <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)', whitespace: 'pre-line', lineHeight: 1.7, background: 'rgba(30, 41, 59, 0.4)', padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
            {job.description}
          </div>

          <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '10px' }}>{t('detail.reqTitle')}</h4>
          <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)', whitespace: 'pre-line', lineHeight: 1.7, background: 'rgba(30, 41, 59, 0.4)', padding: '16px', borderRadius: '12px' }}>
            {job.requirements}
          </div>
        </div>

        {/* Application Submit Action Box */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.8)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {appliedStatus ? (
            <div style={{ textAlign: 'center', color: '#10b981', padding: '10px 0', fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <CheckCircle size={24} /> {t('detail.applySuccess')}
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={16} color="#60a5fa" />
                  {t('detail.linkedResume')} <span style={{ color: '#60a5fa' }}>{activeResume ? `${activeResume.name} (${activeResume.expectedCity})` : t('detail.defaultResume')}</span>
                </div>
              </div>

              <input
                type="text"
                className="glass-input"
                placeholder={t('detail.notePlaceholder')}
                value={applicantNote}
                onChange={e => setApplicantNote(e.target.value)}
              />

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button onClick={onClose} className="secondary-btn">{t('detail.close')}</button>
                <button
                  onClick={handleApply}
                  disabled={submitting}
                  className="gradient-btn"
                  style={{ padding: '10px 28px', fontSize: '1rem' }}
                >
                  <Send size={18} />
                  {submitting ? t('detail.submitting') : t('detail.submitApply')}
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}

