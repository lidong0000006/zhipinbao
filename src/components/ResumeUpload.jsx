import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle, Sparkles, User, Phone, Mail, Award, Briefcase, MapPin, DollarSign, Tag, Edit3, Save } from 'lucide-react';
import { uploadAndParseResume } from '../utils/api.js';
import { useTranslation } from '../i18n/i18n.jsx';

export default function ResumeUpload({ activeResume, setActiveResume }) {
  const { t } = useTranslation();
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [parsedData, setParsedData] = useState(activeResume || null);
  const [editMode, setEditMode] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file) => {
    setUploading(true);
    try {
      const res = await uploadAndParseResume(file);
      if (res.data) {
        setParsedData(res.data);
        setActiveResume(res.data);
      }
    } catch (err) {
      alert(err.message || t('common.error'));
    } finally {
      setUploading(false);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && parsedData) {
      const updated = {
        ...parsedData,
        skills: Array.from(new Set([...(parsedData.skills || []), newSkill.trim()]))
      };
      setParsedData(updated);
      setActiveResume(updated);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    if (parsedData) {
      const updated = {
        ...parsedData,
        skills: parsedData.skills.filter(s => s !== skillToRemove)
      };
      setParsedData(updated);
      setActiveResume(updated);
    }
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      
      {/* Banner */}
      <div className="glass-panel" style={{ padding: '28px 32px', marginBottom: '24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-remote" style={{ padding: '4px 12px' }}>
                <Sparkles size={14} /> {t('resume.badge')}
              </span>
            </div>
            <h2 style={{ fontSize: '1.75rem', color: 'var(--text-main)', marginBottom: '8px' }}>
              {t('resume.title')} <span className="gradient-text">{t('resume.titleHighlight')}</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
              {t('resume.subtitle')}
            </p>
          </div>

          {parsedData && (
            <div style={{ textAlign: 'center', background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '16px 24px', borderRadius: '16px' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#60a5fa' }}>{parsedData.score || 90}%</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>{t('resume.completeness')}</div>
            </div>
          )}
        </div>
      </div>

      {/* Drag & Drop Upload Box */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className="glass-panel"
        style={{
          border: dragActive ? '2px dashed #3b82f6' : '2px dashed rgba(255, 255, 255, 0.15)',
          background: dragActive ? 'rgba(59, 130, 246, 0.15)' : 'rgba(15, 23, 42, 0.6)',
          borderRadius: '20px',
          padding: '40px 20px',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
          marginBottom: '28px'
        }}
        onClick={() => document.getElementById('resumeFileInput').click()}
      >
        <input
          id="resumeFileInput"
          type="file"
          accept=".pdf,.txt,.doc,.docx"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        {uploading ? (
          <div style={{ padding: '20px 0' }}>
            <div className="spin" style={{ display: 'inline-block', marginBottom: '16px' }}>
              <Sparkles size={40} color="#3b82f6" />
            </div>
            <h3 style={{ fontSize: '1.2rem', color: '#60a5fa', marginBottom: '6px' }}>{t('resume.parsing')}</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t('resume.parsingDesc')}</p>
          </div>
        ) : (
          <div>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(59, 130, 246, 0.12)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <UploadCloud size={32} color="#3b82f6" />
            </div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '8px' }}>
              {t('resume.dragTitle')} <span style={{ color: '#3b82f6', textDecoration: 'underline' }}>{t('resume.dragLink')}</span>
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {t('resume.dragDesc')}
            </p>
          </div>
        )}
      </div>

      {/* Parsed Result Profile Card */}
      {parsedData && (
        <div className="glass-panel" style={{ padding: '32px', borderRadius: '24px' }}>
          
          {/* Section Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', pb: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle size={20} color="#10b981" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)' }}>{t('resume.profileTitle')}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('resume.profileDesc')}</p>
              </div>
            </div>

            <button
              onClick={() => setEditMode(!editMode)}
              className="secondary-btn"
              style={{ padding: '6px 16px', fontSize: '0.88rem' }}
            >
              {editMode ? <Save size={16} color="#10b981" /> : <Edit3 size={16} />}
              {editMode ? t('resume.saveBtn') : t('resume.editBtn')}
            </button>
          </div>

          {/* Grid of Attributes */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '28px' }}>
            
            {/* Name */}
            <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <User size={14} color="#3b82f6" /> {t('resume.name')}
              </div>
              {editMode ? (
                <input
                  type="text"
                  className="glass-input"
                  value={parsedData.name}
                  onChange={e => setParsedData({ ...parsedData, name: e.target.value })}
                />
              ) : (
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>{parsedData.name || 'John Doe'}</div>
              )}
            </div>

            {/* Phone */}
            <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Phone size={14} color="#10b981" /> {t('resume.phone')}
              </div>
              {editMode ? (
                <input
                  type="text"
                  className="glass-input"
                  value={parsedData.phone}
                  onChange={e => setParsedData({ ...parsedData, phone: e.target.value })}
                />
              ) : (
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>{parsedData.phone || '+1 555-0199'}</div>
              )}
            </div>

            {/* Email */}
            <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Mail size={14} color="#8b5cf6" /> {t('resume.email')}
              </div>
              {editMode ? (
                <input
                  type="text"
                  className="glass-input"
                  value={parsedData.email}
                  onChange={e => setParsedData({ ...parsedData, email: e.target.value })}
                />
              ) : (
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>{parsedData.email || 'user@example.com'}</div>
              )}
            </div>

            {/* Degree */}
            <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Award size={14} color="#fbbf24" /> {t('resume.degree')}
              </div>
              {editMode ? (
                <input
                  type="text"
                  className="glass-input"
                  value={parsedData.degree}
                  onChange={e => setParsedData({ ...parsedData, degree: e.target.value })}
                />
              ) : (
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fbbf24' }}>{parsedData.degree || 'Bachelor'}</div>
              )}
            </div>

            {/* Experience */}
            <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Briefcase size={14} color="#38bdf8" /> {t('resume.expYears')}
              </div>
              {editMode ? (
                <input
                  type="text"
                  className="glass-input"
                  value={parsedData.experienceYears}
                  onChange={e => setParsedData({ ...parsedData, experienceYears: e.target.value })}
                />
              ) : (
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#38bdf8' }}>{parsedData.experienceYears || '3 years'}</div>
              )}
            </div>

            {/* Target City */}
            <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={14} color="#10b981" /> {t('resume.targetCity')}
              </div>
              {editMode ? (
                <input
                  type="text"
                  className="glass-input"
                  value={parsedData.expectedCity}
                  onChange={e => setParsedData({ ...parsedData, expectedCity: e.target.value })}
                />
              ) : (
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#10b981' }}>{parsedData.expectedCity || 'New York'}</div>
              )}
            </div>

            {/* Industry Classification */}
            <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(59, 130, 246, 0.3)', gridColumn: 'span 3' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Sparkles size={14} color="#a78bfa" /> {t('resume.industryLabel')}
              </div>
              {editMode ? (
                <select
                  className="glass-input"
                  value={parsedData.industry || '互联网/IT/技术'}
                  onChange={e => setParsedData({ ...parsedData, industry: e.target.value })}
                >
                  <option value="互联网/IT/技术" style={{ background: '#0f172a' }}>{t('industry.tech')}</option>
                  <option value="新媒体/自媒体/影视" style={{ background: '#0f172a' }}>{t('industry.media')}</option>
                  <option value="设计/创意/广告" style={{ background: '#0f172a' }}>{t('industry.design')}</option>
                  <option value="教育/培训/翻译" style={{ background: '#0f172a' }}>{t('industry.education')}</option>
                  <option value="电子商务/跨境" style={{ background: '#0f172a' }}>{t('industry.ecommerce')}</option>
                  <option value="金融/投资/财会" style={{ background: '#0f172a' }}>{t('industry.finance')}</option>
                  <option value="消费/零售/服务" style={{ background: '#0f172a' }}>{t('industry.retail')}</option>
                </select>
              ) : (
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#c084fc', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-remote" style={{ fontSize: '0.88rem', padding: '4px 12px' }}>
                    🏢 {parsedData.industry || t('industry.tech')}
                  </span>
                </div>
              )}
            </div>

          </div>

          {/* Skill Tag Cloud Section */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Tag size={16} color="#3b82f6" /> {t('resume.skillsTitle')}
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
              {parsedData.skills && parsedData.skills.map(skill => (
                <span
                  key={skill}
                  style={{
                    background: 'rgba(59, 130, 246, 0.18)',
                    border: '1px solid rgba(59, 130, 246, 0.35)',
                    color: '#60a5fa',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {skill}
                  <span
                    onClick={() => handleRemoveSkill(skill)}
                    style={{ cursor: 'pointer', opacity: 0.6, fontSize: '0.75rem', marginLeft: '4px' }}
                  >
                    ✕
                  </span>
                </span>
              ))}
            </div>

            {/* Add Custom Skill Input */}
            <div style={{ display: 'flex', gap: '8px', maxWidth: '360px' }}>
              <input
                type="text"
                className="glass-input"
                style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                placeholder={t('resume.addSkillPlaceholder')}
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddSkill()}
              />
              <button onClick={handleAddSkill} className="secondary-btn" style={{ padding: '6px 14px', fontSize: '0.85rem' }}>
                {t('resume.addSkillBtn')}
              </button>
            </div>
          </div>

          {/* Summary / Highlights */}
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
              {t('resume.summaryTitle')}
            </div>
            <div style={{
              background: 'rgba(30, 41, 59, 0.4)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '14px',
              padding: '16px',
              color: 'var(--text-muted)',
              fontSize: '0.92rem',
              lineHeight: 1.6
            }}>
              {parsedData.summary}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

