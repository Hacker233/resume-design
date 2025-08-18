const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// 设置文件路径
const dataDir = path.join(__dirname, 'ssr-data');

// 读取原始JSON文件
const originalData = require(path.join(dataDir, 'resume.templates.json'));

// 读取words.json文件
const wordsData = require(path.join(dataDir, 'resume.words.json'));

// 读取ppt.json文件
const pptData = require(path.join(dataDir, 'resume.ppts.json'));

// 转换数据（使用索引+1作为递增编号）
const transformedData = originalData.map((item, index) => ({
  id: item._id.$oid,
  page: `template-${index + 1}.html`,
  title: item.template_title
}));

// 转换wordsData
const transformedWordsData = wordsData.map((item, index) => ({
  id: item._id.$oid,
  page: `word-${index + 1}.html`,
  title: item.name
}));

// 转换pptData
const transformedPptData = pptData.map((item, index) => ({
  id: item._id.$oid,
  page: `ppt-${index + 1}.html`,
  title: item.name
}));

// 确保目录存在（同时创建JSON和JS输出目录）
const outputDirs = {
  json: path.join(__dirname, 'public', 'static'),
  js: path.join(__dirname, 'src', 'static')
};

// 创建所有需要的目录
Object.values(outputDirs).forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// 生成JSON文件（public/static/templates.json）
const jsonOutputPath = path.join(outputDirs.json, 'templates.json');
fs.writeFileSync(jsonOutputPath, JSON.stringify(transformedData, null, 2), { encoding: 'utf-8' });

// 生成JSON文件（public/static/words.json）
const wordsJsonOutputPath = path.join(outputDirs.json, 'words.json');
fs.writeFileSync(wordsJsonOutputPath, JSON.stringify(transformedWordsData, null, 2), {
  encoding: 'utf-8'
});

// 生成JSON文件（public/static/ppt.json）
const pptJsonOutputPath = path.join(outputDirs.json, 'ppt.json');
fs.writeFileSync(pptJsonOutputPath, JSON.stringify(transformedPptData, null, 2), {
  encoding: 'utf-8'
});

// 生成JS文件（src/static/templates.ts）
const jsOutputPath = path.join(outputDirs.js, 'templates.ts');

// 生成JS文件（src/static/words.ts）
const wordsJsOutputPath = path.join(outputDirs.js, 'words.ts');

// 生成JS文件（src/static/ppt.ts')
const pptJsOutputPath = path.join(outputDirs.js, 'ppt.ts');

// 生成JS文件（src/static/words.ts）
fs.writeFileSync(
  wordsJsOutputPath,
  `// 自动生成的word模板数据\nconst words = ${JSON.stringify(
    transformedWordsData,
    null,
    2
  )};\n\nexport default words;`,
  { encoding: 'utf-8' }
);

fs.writeFileSync(
  jsOutputPath,
  `// 自动生成的模板数据\nconst templates = ${JSON.stringify(
    transformedData,
    null,
    2
  )};\n\nexport default templates;`,
  { encoding: 'utf-8' }
);

// 生成JS文件（src/static/ppt.ts）
fs.writeFileSync(
  pptJsOutputPath,
  `// 自动生成的ppt模板数据\nconst ppt = ${JSON.stringify(
    transformedPptData,
    null,
    2
  )};\n\nexport default ppt;`,
  { encoding: 'utf-8' }
);

// 生成sitemap.xml
const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
const today = new Date().toISOString().split('T')[0]; // 获取当前日期，格式为YYYY-MM-DD

// 额外的静态页面链接
const additionalPages = [
  { title: '首页', url: 'https://maobucv.com/' },
  { title: '简历定制服务', url: 'https://maobucv.com/resumeService' },
  { title: '在线制作模版列表', url: 'https://maobucv.com/resume' },
  { title: 'AI简历智能生成', url: 'https://maobucv.com/generateAiResume' },
  { title: 'AI简历智能诊断', url: 'https://maobucv.com/aiDiagnosticCV' },
  { title: 'word简历模版列表', url: 'https://maobucv.com/word' },
  { title: 'ppt模版列表', url: 'https://maobucv.com/ppt' },
  { title: '整站部署方案', url: 'https://maobucv.com/webcode' },
  { title: '组织入驻', url: 'https://maobucv.com/orgSettled' },
  { title: '项目文档', url: 'https://maobucv.com/deployDoc' },
  { title: '会员开通', url: 'https://maobucv.com/membership' },
  { title: '友链申请', url: 'https://maobucv.com/linksApply' }
];

// 读取CSV文件中的URL
const csvUrls = [];
fs.createReadStream(path.join(dataDir, 'export-all-urls-.csv'))
  .pipe(csv())
  .on('data', (row) => {
    if (row.URL) {
      csvUrls.push({
        title: row.Title,
        url: row.URL
      });
    }
  })
  .on('end', () => {
    // 生成sitemap内容
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
>
    <!-- 静态页面 -->
    ${additionalPages
      .map(
        (page) => `
    <url>
        <loc>${page.url}</loc>
        <lastmod>${today}</lastmod>
        <priority>${page.url === 'https://maobucv.com/' ? '1.0' : '0.8'}</priority>
    </url>
    `
      )
      .join('')}
    
    <!-- 文章页面 -->
    ${csvUrls
      .map(
        (item) => `
    <url>
        <loc>${item.url}</loc>
        <lastmod>${today}</lastmod>
        <priority>0.7</priority>
    </url>
    `
      )
      .join('')}
    
    <!-- 所有模板详情页 -->
    ${transformedData
      .map(
        (item) => `
    <url>
        <loc>https://maobucv.com/template/${item.page}</loc>
        <lastmod>${today}</lastmod>
        <priority>0.5</priority>
    </url>
    `
      )
      .join('')}
</urlset>`;

    fs.writeFileSync(sitemapPath, sitemapContent, { encoding: 'utf-8' });

    console.log(`
✅ 生成在线制作模版、在线制作word和在线制作ppt结果：
  模版JSON文件: ${jsonOutputPath}
  模版JS模块: ${jsOutputPath}
  wordJSON文件: ${wordsJsonOutputPath}
  wordJS模块: ${wordsJsOutputPath}
  pptJSON文件: ${pptJsonOutputPath}
  pptJS模块: ${pptJsOutputPath}
  sitemap.xml: ${sitemapPath}
`);
  })
  .on('error', (error) => {
    console.error('读取CSV文件时出错:', error);
  });
