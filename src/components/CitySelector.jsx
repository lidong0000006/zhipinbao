import React, { useState, useEffect } from 'react';
import { MapPin, Search, X, Compass, Check } from 'lucide-react';
import { fetchCities, fetchCurrentLocation } from '../utils/api.js';
import { useTranslation } from '../i18n/i18n.jsx';

export default function CitySelector({ isOpen, onClose, selectedCity, onSelectCity }) {
  const { t } = useTranslation();
  const [citiesData, setCitiesData] = useState({ popular: [], all: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [detecting, setDetecting] = useState(false);
  const [detectedInfo, setDetectedInfo] = useState(null);

  useEffect(() => {
    if (isOpen) {
      loadCities();
    }
  }, [isOpen]);

  const loadCities = async () => {
    const data = await fetchCities();
    setCitiesData(data);
  };

  const handleAutoLocate = async () => {
    setDetecting(true);
    try {
      const loc = await fetchCurrentLocation();
      setDetectedInfo(loc);
      onSelectCity(loc.city);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setDetecting(false), 400);
    }
  };

  if (!isOpen) return null;

  const popularCities = citiesData.popular || [];
  const filteredAll = (citiesData.all || []).filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (c.pinyin && c.pinyin.includes(searchTerm.toLowerCase())) ||
    (c.country && c.country.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" style={{ padding: '24px', borderRadius: '20px' }} onClick={e => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MapPin size={20} color="#3b82f6" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>{t('region.title')}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('region.subtitle')}</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {/* Current Auto Geolocation Box */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.6)',
          border: '1px solid rgba(59, 130, 246, 0.25)',
          borderRadius: '12px',
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Compass size={22} color="#10b981" className={detecting ? 'spin' : ''} />
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>{t('region.gpsLabel')}</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#10b981' }}>
                {detectedInfo ? `${detectedInfo.city} (${detectedInfo.district})` : `${selectedCity || 'New York'}`}
              </div>
            </div>
          </div>
          <button 
            onClick={handleAutoLocate}
            disabled={detecting}
            className="secondary-btn"
            style={{ padding: '6px 14px', fontSize: '0.82rem', borderColor: 'rgba(16, 185, 129, 0.4)' }}
          >
            {detecting ? t('region.detecting') : t('region.relocate')}
          </button>
        </div>

        {/* Search City Box */}
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <Search size={18} color="var(--text-dim)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="glass-input"
            style={{ paddingLeft: '42px' }}
            placeholder={t('region.searchPlaceholder')}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Popular Cities Grid */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '10px' }}>{t('region.popular')}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {popularCities.map(c => {
              const isSelected = selectedCity === c.name || (selectedCity && selectedCity.includes(c.name));
              return (
                <button
                  key={c.name}
                  onClick={() => {
                    onSelectCity(c.name);
                    onClose();
                  }}
                  style={{
                    background: isSelected ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' : 'rgba(30, 41, 59, 0.7)',
                    border: isSelected ? '1px solid #60a5fa' : '1px solid rgba(255, 255, 255, 0.08)',
                    color: isSelected ? '#fff' : 'var(--text-main)',
                    borderRadius: '10px',
                    padding: '10px',
                    fontSize: '0.9rem',
                    fontWeight: isSelected ? 700 : 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {isSelected && <Check size={14} />}
                  {c.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filtered Cities List */}
        {searchTerm && (
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '10px' }}>{t('region.searchResults', { count: filteredAll.length })}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxHeight: '160px', overflowY: 'auto' }}>
              {filteredAll.map(c => (
                <button
                  key={c.name}
                  onClick={() => {
                    onSelectCity(c.name);
                    onClose();
                  }}
                  className="secondary-btn"
                  style={{ padding: '6px 14px', fontSize: '0.85rem' }}
                >
                  {c.name} {c.country ? `(${c.country})` : ''}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

