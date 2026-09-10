import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';

/**
 * Intelligent Resume Parsing Engine
 * Extracts candidate profile, contact details, skills, education, and target job parameters.
 */
export async function parseResumeFile(filePath, originalFilename) {
  let rawText = '';
  const ext = path.extname(originalFilename).toLowerCase();

  try {
    if (ext === '.pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);
      rawText = pdfData.text || '';
    } else {
      // TXT / DOC text fallback
      rawText = fs.readFileSync(filePath, 'utf-8');
    }
  } catch (err) {
    console.error('Error reading/parsing file text:', err);
    rawText = '';
  }

  // Perform intelligent extraction
  const parsedData = extractInformationFromText(rawText, originalFilename);
  return parsedData;
}

function extractInformationFromText(text, filename) {
  const cleanText = text.replace(/\r\n/g, '\n');

  // 1. Phone extraction
  const phoneMatch = cleanText.match(/(?:1[3-9]\d{9})|(?:0\d{2,3}-?\d{7,8})/);
  const phone = phoneMatch ? phoneMatch[0] : '';

  // 2. Email extraction
  const emailMatch = cleanText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const email = emailMatch ? emailMatch[0] : '';

  // 3. Name extraction
  let name = '';
  // Match lines near top or "姓名: xxx"
  const nameLabelMatch = cleanText.match(/(?:姓名|Name|应聘者)[:：\s]+([\u4e00-\u9fa5]{2,4})/i);
  if (nameLabelMatch) {
    name = nameLabelMatch[1];
  } else {
    // Look for Chinese name (2-4 characters) at start of text or lines
    const lines = cleanText.split('\n').filter(l => l.trim().length > 0);
    for (let i = 0; i < Math.min(5, lines.length); i++) {
      const lineText = lines[i].trim();
      const cnMatch = lineText.match(/^([\u4e00-\u9fa5]{2,4})(?:\s|$|\||\/|男|女|\d+岁)/);
      if (cnMatch) {
        name = cnMatch[1];
        break;
      }
    }
    if (!name) {
      // Fallback from filename (e.g. "张伟_前端开发简历.pdf" -> "张伟")
      const fnMatch = filename.match(/^([\u4e00-\u9fa5]{2,4})/);
      name = fnMatch ? fnMatch[1] : '求职者';
    }
  }

  // 4. Highest Education
  let degree = '本科';
  if (/博士/i.test(cleanText)) degree = '博士';
  else if (/硕士|研究生|Master/i.test(cleanText)) degree = '硕士';
  else if (/本科|学士|Bachelor/i.test(cleanText)) degree = '本科';
  else if (/大专|专科|Associate/i.test(cleanText)) degree = '大专';
  else if (/高中|中专/i.test(cleanText)) degree = '高中/中专';

  // 5. Work Experience Years
  let experienceYears = '3年';
  const expMatch = cleanText.match(/(\d+)\s*年(?:工作|项目|相关)?经验/);
  if (expMatch) {
    experienceYears = `${expMatch[1]}年`;
  } else if (/应届|毕业|在校生|实习/i.test(cleanText)) {
    experienceYears = '应届生/实习';
  } else if (/1年|一年/i.test(cleanText)) experienceYears = '1年';
  else if (/2年|两年/i.test(cleanText)) experienceYears = '2年';
  else if (/5年|五年/i.test(cleanText)) experienceYears = '5年';

  // 6. Target City
  let expectedCity = '深圳市';
  const cities = ['深圳市', '深圳', '北京市', '北京', '上海市', '上海', '广州市', '广州', '杭州市', '杭州', '成都市', '成都', '武汉市', '武汉', '南京市', '南京'];
  for (const c of cities) {
    if (new RegExp(`期望城市|工作地点|意向城市|${c}`, 'i').test(cleanText)) {
      expectedCity = c.endsWith('市') ? c : c + '市';
      break;
    }
  }

  // 7. Expected Salary
  let expectedSalary = '15k-25k';
  const salaryMatch = cleanText.match(/(\d+[kKkK千-]-?\d+[kKkK千-]|面议|\d+-\d+元\/天)/);
  if (salaryMatch) {
    expectedSalary = salaryMatch[0];
  }

  // 8. Skill Tags extraction & Industry Classifier
  const knownSkills = [
    'React', 'Vue', 'Node.js', 'JavaScript', 'TypeScript', 'HTML/CSS',
    'Python', 'Java', 'C++', 'Go', 'PHP', 'SQL', 'MongoDB', 'Redis',
    'Docker', 'Git', 'Linux', 'Vite', 'Webpack', 'Tailwind',
    'UI设计', 'Figma', 'Sketch', 'Photoshop', 'AE', 'PR', '剪映',
    '短视频运营', '新媒体文案', '英文翻译', '英语八级', '数据分析', '项目管理'
  ];
  const detectedSkills = [];
  for (const skill of knownSkills) {
    if (new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(cleanText) ||
        (skill.length > 2 && cleanText.toLowerCase().includes(skill.toLowerCase()))) {
      detectedSkills.push(skill);
    }
  }
  if (detectedSkills.length === 0) {
    detectedSkills.push('沟通表达', '团队协作', '熟练办公软件', '学习能力强');
  }

  // 8.5 Industry Categorization Detection
  let industry = '互联网/IT/技术';
  if (/剪映|PR|AE|短视频|自媒体|公众号|文案|抖音|小红书|运营/i.test(cleanText)) {
    industry = '新媒体/自媒体/影视';
  } else if (/UI设计|Figma|Sketch|Photoshop|视觉设计|美术|原画/i.test(cleanText)) {
    industry = '设计/创意/广告';
  } else if (/翻译|英语|八级|外语|教学|培训|教师/i.test(cleanText)) {
    industry = '教育/培训/翻译';
  } else if (/电商|跨境|亚马逊|淘宝|客服|仓储/i.test(cleanText)) {
    industry = '电子商务/跨境';
  } else if (/金融|会计|财务|投资|银行|证券/i.test(cleanText)) {
    industry = '金融/投资/财会';
  } else if (/React|Vue|Node|Python|Java|C\+\+|Go|算法|全栈|后端|前端/i.test(cleanText)) {
    industry = '互联网/IT/技术';
  }

  // 9. Generate Auto Summary
  const summaryLines = cleanText.split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 10 && !l.includes('@') && !l.match(/1[3-9]\d{9}/))
    .slice(0, 3);
  
  const summary = summaryLines.length > 0 
    ? summaryLines.join('；') 
    : `资深求职者，具备${degree}学历与${experienceYears}经验，精通 ${detectedSkills.slice(0, 4).join('、')}。`;

  // 10. Calculate Resume Completeness Score
  let score = 50;
  if (name && name !== '求职者') score += 10;
  if (phone) score += 15;
  if (email) score += 15;
  if (degree) score += 5;
  if (detectedSkills.length >= 3) score += 10;
  if (cleanText.length > 100) score += 5;
  score = Math.min(100, score);

  return {
    id: 'res-' + Date.now(),
    name,
    phone: phone || '13800138000',
    email: email || `${name || 'user'}@example.com`,
    gender: cleanText.includes('女') ? '女' : '男',
    age: (cleanText.match(/(\d{2})岁/) || [])[1] || '26',
    degree,
    experienceYears,
    expectedCity,
    expectedSalary,
    industry,
    skills: Array.from(new Set(detectedSkills)),
    summary,
    rawTextSnippet: cleanText.slice(0, 400),
    score,
    parsedAt: new Date().toISOString()
  };
}
