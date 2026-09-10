import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const JOBS_FILE = path.join(DATA_DIR, 'jobs.json');
const RESUMES_FILE = path.join(DATA_DIR, 'resumes.json');
const APPS_FILE = path.join(DATA_DIR, 'applications.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial Seed Jobs (Comprehensive initial database including global cities)
const INITIAL_JOBS = [
  {
    id: "job-201",
    title: "Senior Full Stack Engineer (React & Node.js)",
    company: "Stripe Inc.",
    logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=120&auto=format&fit=crop&q=80",
    city: "New York",
    district: "Manhattan",
    address: "510 Broadway, New York, NY",
    industry: "互联网/IT/技术",
    salary: "$140k-$190k",
    salaryType: "月薪",
    type: "全职",
    experience: "3-5年",
    education: "本科",
    tags: ["React", "Node.js", "Remote OK", "Health Insurance", "401k"],
    urgent: true,
    hot: true,
    description: "Build scale-resilient payment APIs and web platforms for global commerce with React, TypeScript and Node.",
    requirements: "3+ years of production experience with modern Web frameworks; strong CS fundamentals.",
    recruiter: {
      name: "Sarah Jenkins",
      title: "Senior Tech Recruiter",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
    },
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString()
  },
  {
    id: "job-202",
    title: "UI/UX & Product Designer (Figma Specialist)",
    company: "Sony Music Entertainment",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=120&auto=format&fit=crop&q=80",
    city: "Tokyo",
    district: "Shibuya",
    address: "Shibuya Park Tower 15F, Tokyo",
    industry: "设计/创意/广告",
    salary: "¥6M - ¥9M",
    salaryType: "月薪",
    type: "全职",
    experience: "1-3年",
    education: "大专及以上",
    tags: ["Figma", "UI Design", "Creative", "Flex Hours"],
    urgent: false,
    hot: true,
    description: "Design digital music interactive platforms and brand graphics for top global artists in Shibuya, Tokyo.",
    requirements: "Solid portfolio in mobile UI design; fluency in Japanese or English.",
    recruiter: {
      name: "Kenji Sato",
      title: "Design Director",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
    },
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString()
  },
  {
    id: "job-203",
    title: "Part-time English Content Editor",
    company: "BBC Digital Content",
    logo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=120&auto=format&fit=crop&q=80",
    city: "London",
    district: "Westminster",
    address: "Broadcasting House, Portland Place, London",
    industry: "新媒体/自媒体/影视",
    salary: "£18-£25/hr",
    salaryType: "日薪",
    type: "兼职",
    experience: "经验不限",
    education: "本科",
    tags: ["Part-Time", "Remote Friendly", "Copywriting", "Daily Pay"],
    urgent: true,
    hot: false,
    description: "Review and edit social media video scripts and news captions for global broadcasts.",
    requirements: "Native-level English command and attention to editorial standards.",
    recruiter: {
      name: "Emma Watson",
      title: "Managing Editor",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
    },
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: "job-101",
    title: "高级前端开发工程师 (React/Vite)",
    company: "腾讯科技 (Tencent)",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
    city: "深圳市",
    district: "南山区",
    address: "腾讯滨海大厦",
    industry: "互联网/IT/技术",
    salary: "25k-40k",
    salaryType: "月薪",
    type: "全职",
    experience: "3-5年",
    education: "本科",
    tags: ["React", "TypeScript", "五险一金", "年底双薪", "弹性工作"],
    urgent: true,
    hot: true,
    description: "1. 负责腾讯核心业务前端架构设计与可视化研发；\n2. 优化 Web 页面性能、交互体验与高并发处理能力；\n3. 参与 AI 智能辅助系统的组件库开发。",
    requirements: "1. 熟练掌握 React/Vue3 框架及底层原理；\n2. 具备良好的 CSS 功底与组件化开发思维；\n3. 有大型 Web 应用性能优化经验优先。",
    recruiter: {
      name: "林经理",
      title: "资深招聘专家",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
    },
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },

  {
    id: "job-102",
    title: "自媒体短视频剪辑与运营",
    company: "星光传媒有限公司",
    logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=120&auto=format&fit=crop&q=80",
    city: "深圳市",
    district: "福田区",
    address: "卓越世纪中心 12楼",
    industry: "新媒体/自媒体/影视",
    salary: "250-400元/天",
    salaryType: "日薪",
    type: "兼职",
    experience: "经验不限",
    education: "大专及以上",
    tags: ["日结", "可远程", "剪映/PR", "灵活工时"],
    urgent: true,
    hot: false,
    description: "1. 负责抖音/小红书日常短视频剪辑与脚本拍摄辅助；\n2. 提炼热门爆点，制作吸引人的片头与字幕特效；\n3. 支持远程完成，按日结算绩效。",
    requirements: "1. 熟练使用剪映或 Premiere / AE；\n2. 刷网感好，熟悉当下流行音乐与梗；\n3. 细心负责，按时交付。",
    recruiter: {
      name: "陈主管",
      title: "内容运营负责人",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
    },
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: "job-103",
    title: "AI 算法与 Node.js 后端工程师",
    company: "字节跳动 (ByteDance)",
    logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=120&auto=format&fit=crop&q=80",
    city: "北京市",
    district: "海淀区",
    address: "中关村创新大厦",
    industry: "互联网/IT/技术",
    salary: "30k-50k",
    salaryType: "月薪",
    type: "全职",
    experience: "3-5年",
    education: "硕士及以上",
    tags: ["Node.js", "Python", "大模型微调", "免费三餐", "股票期权"],
    urgent: false,
    hot: true,
    description: "1. 负责 LLM 大模型服务化集成与高性能 Node.js API 研发；\n2. 参与智能智能体的链路搭建与分布式任务调度；\n3. 保障后端高吞吞量与极低延迟应用。",
    requirements: "1. 精通 Node.js/Python 异步编程与高性能服务架构；\n2. 熟悉 RESTful/GraphQL 与 Redis/MongoDB；\n3. 对 AI Agent 与大模型技术有浓厚兴趣。",
    recruiter: {
      name: "王 HR",
      title: "技术招聘顾问",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
    },
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: "job-104",
    title: "UI/UX 资深视觉设计师",
    company: "阿里巴巴 (Alibaba)",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=120&auto=format&fit=crop&q=80",
    city: "杭州市",
    district: "余杭区",
    address: "西溪园区 5号楼",
    industry: "设计/创意/广告",
    salary: "20k-35k",
    salaryType: "月薪",
    type: "全职",
    experience: "1-3年",
    education: "本科",
    tags: ["Figma", "UI设计", "B端产品", "定期体检", "打卡灵活"],
    urgent: false,
    hot: true,
    description: "1. 负责阿里云控制台及设计系统的体验升级与视觉规范；\n2. 输出高保真原型与 Figma 动态设计组件库；\n3. 与前端团队协同保障设计还原度。",
    requirements: "1. 优秀的审美与设计品味，熟练运用 Figma/Sketch/AE；\n2. 具备良好的逻辑思维与用户体验敏锐度；\n3. 附带完整作品集链接。",
    recruiter: {
      name: "赵总监",
      title: "体验设计专家",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
    },
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString()
  },
  {
    id: "job-105",
    title: "全栈全职远程开发 (React + Python)",
    company: "CyberPulse Global",
    logo: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=120&auto=format&fit=crop&q=80",
    city: "上海市",
    district: "浦东新区",
    address: "远程办公 / 陆家嘴金融中心",
    industry: "互联网/IT/技术",
    salary: "22k-38k",
    salaryType: "月薪",
    type: "远程",
    experience: "3-5年",
    education: "本科",
    tags: ["100%远程", "美元结算可选", "弹性工时", "极客文化"],
    urgent: true,
    hot: true,
    description: "1. 参与跨国跨境电商 SaaS 平台的全栈功能迭代；\n2. 独立完成 React 前端页面与 Python FastApi 后端逻辑；\n3. 支持全远程协同，时间自由按任务交付。",
    requirements: "1. 3年以上全栈开发经验，熟悉 React/Tailwind/Node/Python；\n2. 自律性强，具备良好的英文文档读写能力；\n3. 有远程协作或独立作品经验者优先。",
    recruiter: {
      name: "David Zhang",
      title: "CTO",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80"
    },
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: "job-106",
    title: "新媒体内容实习生 (包住/可转正)",
    company: "小红书科技",
    logo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=120&auto=format&fit=crop&q=80",
    city: "广州市",
    district: "天河区",
    address: "珠江新城 IFC 18楼",
    industry: "新媒体/自媒体/影视",
    salary: "180-260元/天",
    salaryType: "日薪",
    type: "实习",
    experience: "应届生/在校生",
    education: "本科在读",
    tags: ["餐补", "转正机会", "导师带教", "年轻团队"],
    urgent: false,
    hot: false,
    description: "1. 协助官方公众号及生活方式板块内容选题规划；\n2. 撰写文案与制图排版，跟进粉丝互动及数据统计；\n3. 参与线上活动策划与效果评估。",
    requirements: "1. 本科及以上在校生，每周实习 4 天以上，至少持续 3 个月；\n2. 文字功底扎实，热衷生活方式与流行趋势；\n3. 转正意愿强优先考虑。",
    recruiter: {
      name: "孙HR",
      title: "校招实习生HR",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
    },
    createdAt: new Date(Date.now() - 3600000 * 30).toISOString()
  },
  {
    id: "job-107",
    title: "兼职英语翻译与本地化校对",
    company: "环球译语翻译社",
    logo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=120&auto=format&fit=crop&q=80",
    city: "成都市",
    district: "武侯区",
    address: "高新区天府软件园",
    industry: "教育/培训/翻译",
    salary: "150-300元/千字",
    salaryType: "日薪",
    type: "兼职",
    experience: "经验不限",
    education: "本科",
    tags: ["按字计酬", "居家兼职", "时间自由"],
    urgent: false,
    hot: false,
    description: "1. 负责科技、游戏、电商等领域的中英双向笔译与校对；\n2. 保证术语准确性与语句流畅度；\n3. 在指定截止时间内提交高质量稿件。",
    requirements: "1. 英语专业八级 (TEM-8) 或 CATTI 二级以上；\n2. 有良好的中文表达能力与科技词汇储备；\n3. 严谨细致，守时保质。",
    recruiter: {
      name: "周老师",
      title: "翻译项目总监",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80"
    },
    createdAt: new Date(Date.now() - 3600000 * 36).toISOString()
  }
];

function readJSON(file, fallback) {
  try {
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, JSON.stringify(fallback, null, 2), 'utf-8');
      return fallback;
    }
    const data = fs.readFileSync(file, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${file}:`, err);
    return fallback;
  }
}

function writeJSON(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${file}:`, err);
    return false;
  }
}

export const db = {
  getJobs: () => readJSON(JOBS_FILE, INITIAL_JOBS),
  saveJobs: (jobs) => writeJSON(JOBS_FILE, jobs),
  getResumes: () => readJSON(RESUMES_FILE, []),
  saveResumes: (resumes) => writeJSON(RESUMES_FILE, resumes),
  getApplications: () => readJSON(APPS_FILE, []),
  saveApplications: (apps) => writeJSON(APPS_FILE, apps),
};
