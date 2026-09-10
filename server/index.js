import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { db } from './storage.js';
import { parseResumeFile } from './parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5050;

// Enable CORS & Body Parser
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Setup file upload destination
const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Serve uploaded files statically
app.use('/uploads', express.static(UPLOAD_DIR));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Comprehensive Global & Regional City Dataset
const POPULAR_CITIES = [
  { name: 'New York', country: 'United States', hot: true, pinyin: 'newyork' },
  { name: 'Tokyo', country: 'Japan', hot: true, pinyin: 'tokyo' },
  { name: 'London', country: 'United Kingdom', hot: true, pinyin: 'london' },
  { name: 'Paris', country: 'France', hot: true, pinyin: 'paris' },
  { name: 'Seoul', country: 'South Korea', hot: true, pinyin: 'seoul' },
  { name: 'Singapore', country: 'Singapore', hot: true, pinyin: 'singapore' },
  { name: 'Sydney', country: 'Australia', hot: true, pinyin: 'sydney' },
  { name: 'Berlin', country: 'Germany', hot: true, pinyin: 'berlin' },
  { name: '深圳市', country: 'China', hot: true, pinyin: 'shenzhen' },
  { name: '北京市', country: 'China', hot: true, pinyin: 'beijing' },
  { name: '上海市', country: 'China', hot: true, pinyin: 'shanghai' },
  { name: '广州市', country: 'China', hot: true, pinyin: 'guangzhou' },
  { name: '杭州市', country: 'China', hot: false, pinyin: 'hangzhou' },
  { name: '成都市', country: 'China', hot: false, pinyin: 'chengdu' },
  { name: 'Hong Kong', country: 'China', hot: false, pinyin: 'hongkong' },
  { name: 'Toronto', country: 'Canada', hot: false, pinyin: 'toronto' },
];


// --- ROUTES ---

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Get Cities
app.get('/api/cities', (req, res) => {
  res.json({
    popular: POPULAR_CITIES.filter(c => c.hot),
    all: POPULAR_CITIES
  });
});

// Detect Current City
app.get('/api/location/current', (req, res) => {
  res.json({
    city: '深圳市',
    district: '南山区',
    latitude: 22.5431,
    longitude: 114.0579,
    formattedAddress: '广东省深圳市南山区粤海街道科技园',
    accuracy: 'GPS 精准定位'
  });
});

// Get Jobs List with Filtering (city, search, type, industry, salary, district)
app.get('/api/jobs', (req, res) => {
  const { city, search, type, industry, salary, district } = req.query;
  let jobs = db.getJobs();

  if (city && city !== '全国' && city !== '全部') {
    const cleanCity = city.replace(/市$/, '');
    jobs = jobs.filter(j => j.city.includes(cleanCity));
  }

  if (type && type !== '全部') {
    jobs = jobs.filter(j => j.type === type);
  }

  if (industry && industry !== '全部' && industry !== '全部行业') {
    jobs = jobs.filter(j => j.industry === industry);
  }

  if (district && district !== '全部') {
    jobs = jobs.filter(j => j.district === district);
  }

  if (search && search.trim() !== '') {
    const q = search.trim().toLowerCase();
    jobs = jobs.filter(j => 
      j.title.toLowerCase().includes(q) ||
      j.company.toLowerCase().includes(q) ||
      (j.industry && j.industry.toLowerCase().includes(q)) ||
      j.tags.some(t => t.toLowerCase().includes(q)) ||
      j.description.toLowerCase().includes(q)
    );
  }

  res.json({
    total: jobs.length,
    jobs
  });
});

// Get Single Job Detail
app.get('/api/jobs/:id', (req, res) => {
  const jobs = db.getJobs();
  const job = jobs.find(j => j.id === req.params.id);
  if (!job) {
    return res.status(404).json({ error: '职位不存在' });
  }
  res.json(job);
});

// Post New Job
app.post('/api/jobs', (req, res) => {
  const {
    title, company, logo, city, district, address, industry, salary, salaryType,
    type, experience, education, tags, urgent, description, requirements, recruiterName
  } = req.body;

  if (!title || !company || !city || !salary) {
    return res.status(400).json({ error: '请填写必要的职位信息（标题、公司、城市、薪资）' });
  }

  const newJob = {
    id: 'job-' + Date.now(),
    title,
    company,
    logo: logo || 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=120&auto=format&fit=crop&q=80',
    city: city.endsWith('市') ? city : city + '市',
    district: district || '市中心',
    address: address || '商业核心区',
    industry: industry || '互联网/IT/技术',
    salary,
    salaryType: salaryType || '月薪',
    type: type || '全职',
    experience: experience || '经验不限',
    education: education || '学历不限',
    tags: Array.isArray(tags) ? tags : (tags ? tags.split(/[,，\s]+/) : ['五险一金', '团队氛围好']),
    urgent: Boolean(urgent),
    hot: false,
    description: description || '暂无详细描述',
    requirements: requirements || '暂无无特别要求',
    recruiter: {
      name: recruiterName || '招聘HR',
      title: '招聘负责人',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
    },
    createdAt: new Date().toISOString()
  };

  const currentJobs = db.getJobs();
  currentJobs.unshift(newJob);
  db.saveJobs(currentJobs);

  res.status(201).json({
    message: '职位发布成功',
    job: newJob
  });
});

// Upload & Parse Resume
app.post('/api/resume/parse', upload.single('resumeFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: '未检测到上传的简历文件' });
    }

    const filePath = req.file.path;
    const originalName = req.file.originalname;

    // Run resume parser
    const parsedResult = await parseResumeFile(filePath, originalName);
    parsedResult.fileUrl = `/uploads/${req.file.filename}`;
    parsedResult.originalFileName = originalName;

    // Save parsed resume to persistent db
    const currentResumes = db.getResumes();
    currentResumes.unshift(parsedResult);
    db.saveResumes(currentResumes);

    res.json({
      success: true,
      message: '简历上传并解析成功！',
      data: parsedResult
    });
  } catch (err) {
    console.error('Upload & parse error:', err);
    res.status(500).json({ error: '简历解析过程发生异常，请重试' });
  }
});

// Get Resumes with optional Industry filter
app.get('/api/resumes', (req, res) => {
  const { industry } = req.query;
  let resumes = db.getResumes();
  if (industry && industry !== '全部' && industry !== '全部行业') {
    resumes = resumes.filter(r => r.industry === industry);
  }
  res.json(resumes);
});

// Apply for Job
app.post('/api/jobs/:id/apply', (req, res) => {
  const jobId = req.params.id;
  const { resumeId, candidateName, candidatePhone, candidateIndustry, note } = req.body;

  const jobs = db.getJobs();
  const job = jobs.find(j => j.id === jobId);
  if (!job) {
    return res.status(404).json({ error: '目标职位不存在' });
  }

  const applications = db.getApplications();
  const newApp = {
    id: 'app-' + Date.now(),
    jobId: job.id,
    jobTitle: job.title,
    company: job.company,
    city: job.city,
    salary: job.salary,
    resumeId: resumeId || null,
    candidateName: candidateName || '张求职者',
    candidatePhone: candidatePhone || '13800138000',
    candidateIndustry: candidateIndustry || '互联网/IT/技术',
    note: note || '',
    status: '已投递',
    appliedAt: new Date().toISOString()
  };

  applications.unshift(newApp);
  db.saveApplications(applications);

  res.json({
    success: true,
    message: '简历投递成功！HR 将在 24 小时内查阅',
    application: newApp
  });
});

// Get Applications List with Industry Filter
app.get('/api/applications', (req, res) => {
  const { industry } = req.query;
  let apps = db.getApplications();
  if (industry && industry !== '全部' && industry !== '全部行业') {
    apps = apps.filter(a => a.candidateIndustry === industry);
  }
  res.json(apps);
});

// Platform Stats
app.get('/api/stats', (req, res) => {
  const jobs = db.getJobs();
  const resumes = db.getResumes();
  const apps = db.getApplications();

  res.json({
    totalJobs: jobs.length,
    totalResumes: resumes.length + 128, // base offset for live count feeling
    totalApplications: apps.length + 342,
    activeCities: POPULAR_CITIES.length,
    successfulMatches: 98.4
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Recruitment Server running on http://localhost:${PORT}`);
});
