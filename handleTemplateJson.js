const fs = require('fs');
const path = require('path');

// 读取原始JSON文件
const originalData = require('./resume.templates.json');

// 转换数据（使用索引+1作为递增编号）
const transformedData = originalData.map((item, index) => ({
  id: item._id.$oid,
  page: `template-${index + 1}.html`,
  title: item.template_title
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

// 生成JS文件（src/static/templates.ts）
const jsOutputPath = path.join(outputDirs.js, 'templates.ts');
fs.writeFileSync(
  jsOutputPath,
  `// 自动生成的模板数据\nconst templates = ${JSON.stringify(
    transformedData,
    null,
    2
  )};\n\nexport default templates;`,
  { encoding: 'utf-8' }
);

console.log(`
✅ 生成结果：
  JSON文件: ${jsonOutputPath}
  JS模块: ${jsOutputPath}
`);
