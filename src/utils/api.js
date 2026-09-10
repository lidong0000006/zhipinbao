const API_BASE = '/api';

export async function fetchCities() {
  try {
    const res = await fetch(`${API_BASE}/cities`);
    if (!res.ok) throw new Error('获取城市失败');
    return await res.json();
  } catch (err) {
    console.error('fetchCities error:', err);
    return {
      popular: [
        { name: '深圳市', province: '广东省', hot: true },
        { name: '北京市', province: '北京市', hot: true },
        { name: '上海市', province: '上海市', hot: true },
        { name: '广州市', province: '广东省', hot: true },
        { name: '杭州市', province: '浙江省', hot: true },
        { name: '成都市', province: '四川省', hot: true },
      ],
      all: []
    };
  }
}

export async function fetchCurrentLocation() {
  try {
    const res = await fetch(`${API_BASE}/location/current`);
    if (!res.ok) throw new Error('定位感知失败');
    return await res.json();
  } catch (err) {
    console.error('fetchCurrentLocation error:', err);
    return { city: '深圳市', district: '南山区' };
  }
}

export async function fetchJobs(params = {}) {
  try {
    const query = new URLSearchParams();
    if (params.city && params.city !== '全国' && params.city !== '全部') query.append('city', params.city);
    if (params.search) query.append('search', params.search);
    if (params.type && params.type !== '全部') query.append('type', params.type);
    if (params.industry && params.industry !== '全部' && params.industry !== '全部行业') query.append('industry', params.industry);
    if (params.district && params.district !== '全部') query.append('district', params.district);

    const res = await fetch(`${API_BASE}/jobs?${query.toString()}`);
    if (!res.ok) throw new Error('获取职位列表失败');
    return await res.json();
  } catch (err) {
    console.error('fetchJobs error:', err);
    return { total: 0, jobs: [] };
  }
}

export async function postJob(jobData) {
  const res = await fetch(`${API_BASE}/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jobData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || '发布职位失败');
  return data;
}

export async function uploadAndParseResume(file) {
  const formData = new FormData();
  formData.append('resumeFile', file);

  const res = await fetch(`${API_BASE}/resume/parse`, {
    method: 'POST',
    body: formData
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || '简历上传解析失败');
  return data;
}

export async function applyJob(jobId, applicationData) {
  const res = await fetch(`${API_BASE}/jobs/${jobId}/apply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(applicationData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || '投递失败');
  return data;
}

export async function fetchResumes(industry = '') {
  try {
    const query = industry && industry !== '全部' && industry !== '全部行业' ? `?industry=${encodeURIComponent(industry)}` : '';
    const res = await fetch(`${API_BASE}/resumes${query}`);
    if (!res.ok) throw new Error('获取简历库失败');
    return await res.json();
  } catch (err) {
    console.error('fetchResumes error:', err);
    return [];
  }
}

export async function fetchApplications(industry = '') {
  try {
    const query = industry && industry !== '全部' && industry !== '全部行业' ? `?industry=${encodeURIComponent(industry)}` : '';
    const res = await fetch(`${API_BASE}/applications${query}`);
    if (!res.ok) throw new Error('获取投递记录失败');
    return await res.json();
  } catch (err) {
    console.error('fetchApplications error:', err);
    return [];
  }
}

export async function fetchPlatformStats() {
  try {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) throw new Error('获取统计数据失败');
    return await res.json();
  } catch (err) {
    console.error('fetchPlatformStats error:', err);
    return { totalJobs: 0, totalResumes: 0, totalApplications: 0, activeCities: 0 };
  }
}
