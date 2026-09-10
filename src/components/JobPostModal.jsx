import React, { useState } from 'react';
import { X, PlusCircle, Building, MapPin, DollarSign, Briefcase, GraduationCap, FileText, CheckCircle2 } from 'lucide-react';
import { postJob } from '../utils/api.js';
import { useTranslation } from '../i18n/i18n.jsx';

export default function JobPostModal({ isOpen, onClose, currentCity, onJobPosted }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    city: currentCity || 'New York',
    district: 'Downtown',
    address: '',
    industry: '互联网/IT/技术',
    salary: '$5k-8k',
    salaryType: '月薪',
    type: '全职',
    experience: '1-3年',
    education: '本科',
    tags: 'Health Insurance, Remote OK, Flexible Hours',
    urgent: false,
    description: '',
    requirements: '',
    recruiterName: 'Sarah (HR)'
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.company) {
      alert(t('post.alertRequired'));
      return;
    }

    setLoading(true);
    try {
      await postJob({
        ...formData,
        tags: formData.tags.split(/[,，\s]+/).filter(Boolean)
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onJobPosted();
        onClose();
      }, 1200);
    } catch (err) {
      alert(err.message || t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content glass-panel" 
        style={{ maxWidth: '720px', padding: '32px', borderRadius: '24px' }}
        onClick={e => e.stopPropagation()}
      >
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PlusCircle size={22} color="#fff" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', color: 'var(--text-main)' }}>{t('post.title')}</h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{t('post.subtitle')}</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        {success ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#10b981' }}>
            <CheckCircle2 size={48} style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '1.4rem' }}>{t('post.success')}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t('post.successDesc')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            {/* Row 1: Title & Company */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  {t('post.jobTitle')}
                </label>
                <input
                  type="text"
                  name="title"
                  className="glass-input"
                  placeholder={t('post.jobTitlePlaceholder')}
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  {t('post.company')}
                </label>
                <input
                  type="text"
                  name="company"
                  className="glass-input"
                  placeholder={t('post.companyPlaceholder')}
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Row 2: Type, Industry, Salary & SalaryType */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  {t('post.jobType')}
                </label>
                <select name="type" className="glass-input" value={formData.type} onChange={handleChange}>
                  <option value="全职" style={{ background: '#0f172a' }}>{t('type.fulltime')}</option>
                  <option value="兼职" style={{ background: '#0f172a' }}>{t('type.parttime')}</option>
                  <option value="远程" style={{ background: '#0f172a' }}>{t('type.remote')}</option>
                  <option value="实习" style={{ background: '#0f172a' }}>{t('type.intern')}</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  {t('post.industry')}
                </label>
                <select name="industry" className="glass-input" value={formData.industry} onChange={handleChange}>
                  <option value="互联网/IT/技术" style={{ background: '#0f172a' }}>{t('industry.tech')}</option>
                  <option value="新媒体/自媒体/影视" style={{ background: '#0f172a' }}>{t('industry.media')}</option>
                  <option value="设计/创意/广告" style={{ background: '#0f172a' }}>{t('industry.design')}</option>
                  <option value="教育/培训/翻译" style={{ background: '#0f172a' }}>{t('industry.education')}</option>
                  <option value="电子商务/跨境" style={{ background: '#0f172a' }}>{t('industry.ecommerce')}</option>
                  <option value="金融/投资/财会" style={{ background: '#0f172a' }}>{t('industry.finance')}</option>
                  <option value="消费/零售/服务" style={{ background: '#0f172a' }}>{t('industry.retail')}</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  {t('post.salary')}
                </label>
                <input
                  type="text"
                  name="salary"
                  className="glass-input"
                  placeholder={t('post.salaryPlaceholder')}
                  value={formData.salary}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  {t('post.salaryPeriod')}
                </label>
                <select name="salaryType" className="glass-input" value={formData.salaryType} onChange={handleChange}>
                  <option value="月薪" style={{ background: '#0f172a' }}>{t('job.salaryMonthly')}</option>
                  <option value="日薪" style={{ background: '#0f172a' }}>{t('post.salaryPeriodDaily')}</option>
                  <option value="时薪" style={{ background: '#0f172a' }}>{t('job.salaryHourly')}</option>
                </select>
              </div>
            </div>

            {/* Row 3: City, District & Address */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  {t('post.city')}
                </label>
                <input
                  type="text"
                  name="city"
                  className="glass-input"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  {t('post.district')}
                </label>
                <input
                  type="text"
                  name="district"
                  className="glass-input"
                  placeholder={t('post.districtPlaceholder')}
                  value={formData.district}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  {t('post.address')}
                </label>
                <input
                  type="text"
                  name="address"
                  className="glass-input"
                  placeholder={t('post.addressPlaceholder')}
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Row 4: Experience, Education, Recruiter */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  {t('post.experience')}
                </label>
                <select name="experience" className="glass-input" value={formData.experience} onChange={handleChange}>
                  <option value="经验不限" style={{ background: '#0f172a' }}>{t('post.expNoLimit')}</option>
                  <option value="应届生/在校生" style={{ background: '#0f172a' }}>{t('post.expFresh')}</option>
                  <option value="1-3年" style={{ background: '#0f172a' }}>{t('post.exp1to3')}</option>
                  <option value="3-5年" style={{ background: '#0f172a' }}>{t('post.exp3to5')}</option>
                  <option value="5年以上" style={{ background: '#0f172a' }}>{t('post.exp5plus')}</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  {t('post.education')}
                </label>
                <select name="education" className="glass-input" value={formData.education} onChange={handleChange}>
                  <option value="学历不限" style={{ background: '#0f172a' }}>{t('post.eduNoLimit')}</option>
                  <option value="大专及以上" style={{ background: '#0f172a' }}>{t('post.eduCollege')}</option>
                  <option value="本科" style={{ background: '#0f172a' }}>{t('post.eduBachelor')}</option>
                  <option value="硕士及以上" style={{ background: '#0f172a' }}>{t('post.eduMaster')}</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  {t('post.recruiterName')}
                </label>
                <input
                  type="text"
                  name="recruiterName"
                  className="glass-input"
                  placeholder={t('post.recruiterPlaceholder')}
                  value={formData.recruiterName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Row 5: Benefits Tags */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                {t('post.tags')}
              </label>
              <input
                type="text"
                name="tags"
                className="glass-input"
                placeholder={t('post.tagsPlaceholder')}
                value={formData.tags}
                onChange={handleChange}
              />
            </div>

            {/* Row 6: Checkbox Urgent */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                id="urgent"
                name="urgent"
                checked={formData.urgent}
                onChange={handleChange}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <label htmlFor="urgent" style={{ fontSize: '0.9rem', color: '#fb7185', fontWeight: 600, cursor: 'pointer' }}>
                {t('post.urgentLabel')}
              </label>
            </div>

            {/* Row 7: Description & Requirements */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                {t('post.description')}
              </label>
              <textarea
                name="description"
                rows={3}
                className="glass-input"
                placeholder={t('post.descPlaceholder')}
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                {t('post.requirements')}
              </label>
              <textarea
                name="requirements"
                rows={3}
                className="glass-input"
                placeholder={t('post.reqPlaceholder')}
                value={formData.requirements}
                onChange={handleChange}
              />
            </div>

            {/* Form Action */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
              <button type="button" onClick={onClose} className="secondary-btn">{t('post.cancel')}</button>
              <button
                type="submit"
                disabled={loading}
                className="gradient-btn"
                style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', padding: '10px 28px' }}
              >
                {loading ? t('post.publishing') : t('post.publish')}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}

