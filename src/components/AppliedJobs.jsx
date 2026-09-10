import React, { useState, useEffect } from 'react';
import { UserCheck, Briefcase, Building, MapPin, Clock, Phone, FileText, CheckCircle, Award } from 'lucide-react';
import { fetchApplications } from '../utils/api.js';
import { useTranslation } from '../i18n/i18n.jsx';

export default function AppliedJobs() {
  const { t } = useTranslation();
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('candidate'); // 'candidate' or 'recruiter'
  const [selectedIndustry, setSelectedIndustry] = useState('全部行业');
  const [loading, setLoading] = useState(true);

  const industries = [
    { label: t('industry.all'), value: '全部行业' },
    { label: t('industry.tech'), value: '互联网/IT/技术' },
    { label: t('industry.media'), value: '新媒体/自媒体/影视' },
    { label: t('industry.design'), value: '设计/创意/广告' },
    { label: t('industry.education'), value: '教育/培训/翻译' },
    { label: t('industry.ecommerce'), value: '电子商务/跨境' },
    { label: t('industry.finance'), value: '金融/投资/财会' }
  ];

  useEffect(() => {
    loadApplications();
  }, [selectedIndustry]);

  const loadApplications = async () => {
    setLoading(true);
    try {
      const data = await fetchApplications(selectedIndustry);
      setApplications(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      
      {/* Tab Header Switcher */}
      <div className="glass-panel" style={{ padding: '20px 24px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UserCheck size={22} color="#3b82f6" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--text-main)' }}>{t('applied.title')}</h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{t('applied.subtitle')}</p>
          </div>
        </div>

        <div style={{ display: 'flex', background: 'rgba(30, 41, 59, 0.8)', padding: '4px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            onClick={() => setActiveTab('candidate')}
            style={{
              background: activeTab === 'candidate' ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' : 'transparent',
              color: activeTab === 'candidate' ? '#fff' : 'var(--text-muted)',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {t('applied.myApps', { count: applications.length })}
          </button>
          <button
            onClick={() => setActiveTab('recruiter')}
            style={{
              background: activeTab === 'recruiter' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'transparent',
              color: activeTab === 'recruiter' ? '#fff' : 'var(--text-muted)',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {t('applied.received', { count: applications.length })}
          </button>
        </div>
      </div>

      {/* Industry Filter Pills Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '20px', padding: '12px 18px', background: 'rgba(15,23,42,0.6)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 600, marginRight: '4px' }}>{t('applied.industryFilter')}</span>
        {industries.map(ind => {
          const isActive = selectedIndustry === ind.value;
          return (
            <button
              key={ind.value}
              onClick={() => setSelectedIndustry(ind.value)}
              style={{
                background: isActive ? 'rgba(59, 130, 246, 0.25)' : 'rgba(30, 41, 59, 0.5)',
                border: isActive ? '1px solid #60a5fa' : '1px solid rgba(255,255,255,0.08)',
                color: isActive ? '#60a5fa' : 'var(--text-muted)',
                padding: '4px 12px',
                borderRadius: '16px',
                fontSize: '0.82rem',
                fontWeight: isActive ? 700 : 400,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {ind.label}
            </button>
          );
        })}
      </div>

      {/* List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-dim)' }}>{t('applied.loading')}</div>
      ) : applications.length === 0 ? (
        <div className="glass-panel" style={{ padding: '48px', textAlign: 'center' }}>
          <Briefcase size={40} color="var(--text-dim)" style={{ marginBottom: '12px' }} />
          <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '6px' }}>{t('applied.emptyTitle')}</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>{t('applied.emptyDesc')}</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {applications.map(app => (
            <div
              key={app.id}
              className="glass-panel"
              style={{
                padding: '24px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>{app.jobTitle}</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8' }}>{app.salary}</span>
                  <span className="badge badge-remote" style={{ padding: '2px 8px', fontSize: '0.75rem' }}>{t('applied.status')}</span>
                  {app.candidateIndustry && (
                    <span className="badge badge-intern" style={{ padding: '2px 8px', fontSize: '0.75rem' }}>
                      🏢 {app.candidateIndustry}
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#f8fafc' }}>
                    <Building size={14} color="#60a5fa" /> {app.company}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={14} color="#10b981" /> {app.city}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} /> {new Date(app.appliedAt).toLocaleString()}
                  </span>
                </div>

                {app.note && (
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)', marginTop: '8px', background: 'rgba(30,41,59,0.4)', padding: '6px 12px', borderRadius: '6px' }}>
                    {t('applied.note')} {app.note}
                  </div>
                )}
              </div>

              <div style={{ textAlign: 'right', minWidth: '180px' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  {t('applied.applicant')} <span style={{ color: '#fff', fontWeight: 600 }}>{app.candidateName}</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                  <Phone size={12} color="#10b981" /> {app.candidatePhone}
                </div>
                <button
                  onClick={() => alert(t('applied.alertResume', { name: app.candidateName }))}
                  className="secondary-btn"
                  style={{ marginTop: '10px', padding: '4px 12px', fontSize: '0.78rem' }}
                >
                  <FileText size={13} /> {t('applied.viewResume')}
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}

