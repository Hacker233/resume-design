const fs = require('fs');
const path = require('path');

// 读取原始JSON文件
const originalData = require('./resume.templates.json');

// 读取words.json文件
const wordsData = require('./resume.words.json');

// 读取ppt.json文件
const pptData = require('./resume.ppts.json');

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

// 生成JS文件（src/static/ppt.ts）
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

console.log(`
✅ 生成在线制作模版、在线制作word和在线制作ppt结果：
  模版JSON文件: ${jsonOutputPath}
  模版JS模块: ${jsOutputPath}
  wordJSON文件: ${wordsJsonOutputPath}
  wordJS模块: ${wordsJsOutputPath}
  pptJSON文件: ${pptJsonOutputPath}
  pptJS模块: ${pptJsOutputPath}
`);
