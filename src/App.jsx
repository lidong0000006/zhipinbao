import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import JobCard from './components/JobCard.jsx';
import JobDetailModal from './components/JobDetailModal.jsx';
import JobPostModal from './components/JobPostModal.jsx';
import CitySelector from './components/CitySelector.jsx';
import ResumeUpload from './components/ResumeUpload.jsx';
import AppliedJobs from './components/AppliedJobs.jsx';
import { fetchJobs, fetchCurrentLocation, fetchPlatformStats } from './utils/api.js';
import { useTranslation } from './i18n/i18n.jsx';
import { Sparkles, Briefcase, RefreshCw, Layers } from 'lucide-react';

export default function App() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('jobs');
  const [currentCity, setCurrentCity] = useState('New York');
  const [isCitySelectorOpen, setIsCitySelectorOpen] = useState(false);
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);

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
    }
  };

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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
                {jobs.map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onClick={setSelectedJob}
                    onApplyQuick={(selectedJobObj) => setSelectedJob(selectedJobObj)}
                  />
                ))}
              </div>
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
        marginTop: '60px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        paddingTop: '24px',
        textAlign: 'center',
        color: 'var(--text-dim)',
        fontSize: '0.85rem'
      }}>
        <div className="app-container">
          <p style={{ marginBottom: '6px' }}>
            🚀 <strong style={{ color: 'var(--text-main)' }}>{t('brand.footer')}</strong> - {t('brand.footerDesc')}
          </p>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.78rem' }}>
            {t('brand.footerSub')}
          </p>
        </div>
      </footer>

    </div>
  );
}

