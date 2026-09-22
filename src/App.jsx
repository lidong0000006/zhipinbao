import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import JobCard from './components/JobCard.jsx';
import JobDetailModal from './components/JobDetailModal.jsx';
import JobPostModal from './components/JobPostModal.jsx';
import CitySelector from './components/CitySelector.jsx';
import ResumeUpload from './components/ResumeUpload.jsx';
import AppliedJobs from './components/AppliedJobs.jsx';
import AboutPage from './components/AboutPage.jsx';
import ContactPage from './components/ContactPage.jsx';
import PrivacyPage from './components/PrivacyPage.jsx';
import TermsPage from './components/TermsPage.jsx';
import BlogPage from './components/BlogPage.jsx';
import BlogPostPage from './components/BlogPostPage.jsx';
import AdBanner from './components/AdBanner.jsx';
import { fetchJobs, fetchCurrentLocation, fetchPlatformStats } from './utils/api.js';
import { useTranslation } from './i18n/i18n.jsx';
import { Sparkles, Briefcase, RefreshCw, Shield, FileText, Mail, BookOpen, Info } from 'lucide-react';

export default function App() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('jobs');
  const [currentCity, setCurrentCity] = useState('New York');
  const [isCitySelectorOpen, setIsCitySelectorOpen] = useState(false);
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [activeBlogPostId, setActiveBlogPostId] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('全部');
  const [activeIndustry, setActiveIndustry] = useState('全部行业');

  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  const [activeResume, setActiveResume] = useState(null);
  const [stats, setStats] = useState({ totalJobs: 0, totalResumes: 0, totalApplications: 0, activeCities: 0 });

  // On App Mount
  useEffect(() => {
    initApp();
  }, []);

  // Fetch jobs when city, category, or industry changes
  useEffect(() => {
    loadJobs();
  }, [currentCity, activeCategory, activeIndustry]);

  const initApp = async () => {
    try {
      const loc = await fetchCurrentLocation();
      if (loc && loc.city) {
        setCurrentCity(loc.city);
      }
      const st = await fetchPlatformStats();
      setStats(st);
    } catch (err) {
      console.error(err);
    }
  };

  const loadJobs = async () => {
    setLoadingJobs(true);
    try {
      const data = await fetchJobs({
        city: currentCity,
        search: searchQuery,
        type: activeCategory,
        industry: activeIndustry
      });
      setJobs(data.jobs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingJobs(false);
    }
  };

  const handleSearch = () => {
    loadJobs();
  };

  const handleCityChange = (newCity) => {
    setCurrentCity(newCity);
  };

  const handleTabChange = (tab) => {
    if (tab === 'postJob') {
      setIsPostJobOpen(true);
    } else {
      setActiveTab(tab);
      setActiveBlogPostId(null);
    }
  };

  const handleBlogPostClick = (postId) => {
    setActiveBlogPostId(postId);
  };

  const handleBlogBack = () => {
    setActiveBlogPostId(null);
  };

  const footerLinks = [
    {
      heading: t('brand.name'),
      links: [
        { label: t('nav.jobs'), tab: 'jobs' },
        { label: t('nav.resume'), tab: 'resume' },
        { label: t('nav.applications'), tab: 'applications' },
        { label: t('nav.blog'), tab: 'blog' },
      ],
    },
    {
      heading: t('about.heroTitle'),
      links: [
        { label: t('nav.about'), tab: 'about' },
        { label: t('nav.contact'), tab: 'contact' },
      ],
    },
    {
      heading: t('footer.legal'),
      links: [
        { label: t('privacy.heroTitle'), tab: 'privacy' },
        { label: t('terms.heroTitle'), tab: 'terms' },
      ],
    },
  ];

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '60px' }}>
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        currentCity={currentCity}
        openCitySelector={() => setIsCitySelectorOpen(true)}
        activeResume={activeResume}
      />

      {/* Main Container */}
      <main className="app-container">
        
        {activeTab === 'jobs' && (
          <>
            {/* Hero & Search Header */}
            <HeroSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              activeIndustry={activeIndustry}
              setActiveIndustry={setActiveIndustry}
              currentCity={currentCity}
              onSearch={handleSearch}
              stats={stats}
            />

            {/* Ad Banner - Top of Job List */}
            <div style={{ marginBottom: '24px' }}>
              <AdBanner type="horizontal" />
            </div>

            {/* Job Grid Header & Filters */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#3b82f6' }} />
                <h2 style={{ fontSize: '1.4rem', color: 'var(--text-main)' }}>
                  {t('jobList.title', { city: currentCity, count: jobs.length })}
                </h2>
                {activeCategory !== '全部' && (
                  <span className="badge badge-remote">{t('jobList.filterType', { type: activeCategory })}</span>
                )}
              </div>

              <button
                onClick={loadJobs}
                className="secondary-btn"
                style={{ padding: '6px 14px', fontSize: '0.85rem' }}
              >
                <RefreshCw size={14} className={loadingJobs ? 'spin' : ''} />
                {t('jobList.refresh')}
              </button>
            </div>

            {/* Job Cards Grid */}
            {loadingJobs ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-dim)' }}>
                <Sparkles size={32} color="#3b82f6" className="spin" style={{ margin: '0 auto 12px' }} />
                <p>{t('jobList.loading', { city: currentCity })}</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="glass-panel" style={{ padding: '48px', textAlign: 'center' }}>
                <Briefcase size={40} color="var(--text-dim)" style={{ marginBottom: '12px' }} />
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '8px' }}>
                  {t('jobList.emptyTitle', { query: searchQuery })}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
                  {t('jobList.emptyDesc')}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('全部');
                    setActiveIndustry('全部行业');
                    loadJobs();
                  }}
                  className="gradient-btn"
                >
                  {t('jobList.resetFilters')}
                </button>
              </div>
            ) : (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
                  {jobs.slice(0, 6).map(job => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onClick={setSelectedJob}
                      onApplyQuick={(selectedJobObj) => setSelectedJob(selectedJobObj)}
                    />
                  ))}
                </div>

                {/* Mid-list Ad Banner */}
                {jobs.length > 6 && (
                  <div style={{ margin: '28px 0' }}>
                    <AdBanner type="horizontal" />
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px', marginTop: jobs.length > 6 ? '0' : '20px' }}>
                  {jobs.slice(6).map(job => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onClick={setSelectedJob}
                      onApplyQuick={(selectedJobObj) => setSelectedJob(selectedJobObj)}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* Tab 2: Resume Upload & Parsing */}
        {activeTab === 'resume' && (
          <ResumeUpload
            activeResume={activeResume}
            setActiveResume={setActiveResume}
          />
        )}

        {/* Tab 3: Applications & Tracker */}
        {activeTab === 'applications' && (
          <AppliedJobs />
        )}

        {/* Tab 4: Blog */}
        {activeTab === 'blog' && (
          activeBlogPostId ? (
            <BlogPostPage postId={activeBlogPostId} onBack={handleBlogBack} />
          ) : (
            <BlogPage onPostClick={handleBlogPostClick} />
          )
        )}

        {/* Tab 5: About */}
        {activeTab === 'about' && <AboutPage />}

        {/* Tab 6: Contact */}
        {activeTab === 'contact' && <ContactPage />}

        {/* Tab 7: Privacy */}
        {activeTab === 'privacy' && <PrivacyPage />}

        {/* Tab 8: Terms */}
        {activeTab === 'terms' && <TermsPage />}

      </main>

      {/* Modals */}
      <CitySelector
        isOpen={isCitySelectorOpen}
        onClose={() => setIsCitySelectorOpen(false)}
        selectedCity={currentCity}
        onSelectCity={handleCityChange}
      />

      <JobPostModal
        isOpen={isPostJobOpen}
        onClose={() => setIsPostJobOpen(false)}
        currentCity={currentCity}
        onJobPosted={loadJobs}
      />

      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          activeResume={activeResume}
          onApplicationSuccess={loadJobs}
        />
      )}

      {/* Footer */}
      <footer style={{
        marginTop: '80px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        paddingTop: '48px',
        paddingBottom: '32px',
      }}>
        <div className="app-container">
          {/* Three-column footer */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}>
            {/* Brand Column */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{
                  width: '38px', height: '38px', borderRadius: '10px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.35)',
                }}>
                  <Sparkles size={20} color="#fff" />
                </div>
                <span style={{
                  fontSize: '1.2rem', fontWeight: 800,
                  background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  {t('brand.name')}
                </span>
              </div>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', lineHeight: 1.7, maxWidth: '240px' }}>
                {t('brand.footerDesc')}
              </p>
            </div>

            {/* Nav link columns */}
            {footerLinks.map((col, i) => (
              <div key={i}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '16px' }}>
                  {col.heading}
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <button
                        onClick={() => handleTabChange(link.tab)}
                        style={{
                          background: 'none', border: 'none', cursor: 'pointer',
                          color: 'var(--text-dim)', fontSize: '0.88rem',
                          padding: 0, textAlign: 'left',
                          transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#60a5fa'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>
                © {new Date().getFullYear()} {t('brand.name')}. All rights reserved.
              </p>
              <div style={{ display: 'flex', gap: '20px' }}>
                <button
                  onClick={() => handleTabChange('privacy')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#60a5fa'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}
                >
                  <Shield size={13} /> {t('privacy.heroTitle')}
                </button>
                <button
                  onClick={() => handleTabChange('terms')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#60a5fa'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}
                >
                  <FileText size={13} /> {t('terms.heroTitle')}
                </button>
                <button
                  onClick={() => handleTabChange('contact')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#60a5fa'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}
                >
                  <Mail size={13} /> {t('nav.contact')}
                </button>
                <button
                  onClick={() => handleTabChange('about')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#60a5fa'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}
                >
                  <Info size={13} /> {t('nav.about')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
