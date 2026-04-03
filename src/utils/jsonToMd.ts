import { cloneDeep } from 'lodash';

// 简历JSON转化为markdown
export const resumeJsonToMarkdown = (resumeData: any) => {
  const dataSource = extractResumeDataToArray(resumeData, true);
  console.log(JSON.stringify(dataSource));
  const md = jsonToMarkdown(dataSource);
  return md;
};

// 将简历中的JSON数据提取出来
export const extractResumeDataToArray = (resumeData: any, filterNotShowModule?: boolean) => {
  const extractedData: Array<{ id: string; moduleContent: any; moduleTitle: string }> = [];

  resumeData.componentsTree.forEach((module: any) => {
    if (filterNotShowModule && module.customProps?.showModule === false) {
      return;
    }
    const shortId = module.id.slice(-10);
    extractedData.push({
      id: shortId,
      moduleContent: extractContentData(cloneDeep(module.dataSource), module.props),
      moduleTitle: module.title
    });
  });

  return extractedData;
};

export const jsonToMarkdown = (jsonDataArray: any) => {
  let markdown = '';
  jsonDataArray.forEach((item: any) => {
    markdown += `## ${item.moduleTitle}\n\n`;
    const moduleContent = item.moduleContent;
    Object.keys(moduleContent).forEach((key) => {
      markdown = concatMarkdown(markdown, key, moduleContent[key]);
    });
    markdown += '\n';
  });
  return markdown;
};

const htmlToMarkdown = (html: string): string => {
  // 先移除所有样式和类属性
  let result = html.replace(/ (style|class)="[^"]*"/g, '');

  // 处理图片标签
  result = result.replace(/<img([^>]+)>/g, (match, attrs) => {
    const srcMatch = attrs.match(/src="([^"]*)"/);
    const altMatch = attrs.match(/alt="([^"]*)"/);
    const src = srcMatch ? srcMatch[1] : '';
    const alt = altMatch ? altMatch[1] : 'image';
    return `![${alt}](${src})`;
  });

  // 处理列表项 - 彻底移除所有属性
  result = result.replace(/<li[^>]*>/g, '- ');

  // 处理其他HTML标签 - 分步骤转换
  result = result
    // 移除所有剩余属性
    .replace(/<(\w+)[^>]*>/g, '<$1>')
    // 标题
    .replace(/<h1>(.*?)<\/h1>/g, '\n# $1\n\n')
    .replace(/<h2>(.*?)<\/h2>/g, '\n## $1\n\n')
    .replace(/<h3>(.*?)<\/h3>/g, '\n### $1\n\n')
    .replace(/<h4>(.*?)<\/h4>/g, '\n#### $1\n\n')
    .replace(/<h5>(.*?)<\/h5>/g, '\n##### $1\n\n')
    .replace(/<h6>(.*?)<\/h6>/g, '\n###### $1\n\n')
    // 加粗
    .replace(/<b>(.*?)<\/b>/g, '**$1**')
    .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
    // 斜体
    .replace(/<i>(.*?)<\/i>/g, '*$1*')
    .replace(/<em>(.*?)<\/em>/g, '*$1*')
    // 删除线
    .replace(/<s>(.*?)<\/s>/g, '~~$1~~')
    .replace(/<del>(.*?)<\/del>/g, '~~$1~~')
    // 链接
    .replace(/<a href="([^"]*)">(.*?)<\/a>/g, '[$2]($1)')
    // 无序列表
    .replace(/<ul>(.*?)<\/ul>/gs, (match, p1) => {
      return p1.replace(/<li>(.*?)<\/li>/gs, (m, p2) => `- ${htmlToMarkdown(p2).trim()}\n`);
    })
    // 有序列表
    .replace(/<ol>(.*?)<\/ol>/gs, (match, p1) => {
      let counter = 1;
      return p1.replace(
        /<li>(.*?)<\/li>/gs,
        (m, p2) => `${counter++}. ${htmlToMarkdown(p2).trim()}\n`
      );
    })
    // 段落
    .replace(/<p>(.*?)<\/p>/g, '\n$1\n\n')
    // 换行
    .replace(/<br>/g, '\n')
    // 代码块
    .replace(/<pre>(.*?)<\/pre>/gs, '\n```\n$1\n```\n')
    .replace(/<code>(.*?)<\/code>/g, '`$1`')
    // 引用
    .replace(/<blockquote>(.*?)<\/blockquote>/gs, (match, p1) => {
      return (
        p1
          .split('\n')
          .map((line) => `> ${line}`)
          .join('\n') + '\n'
      );
    })
    // 移除所有剩余标签但保留内容
    .replace(/<[^>]+>/g, '')
    // 合并多余的空行
    .replace(/\n{3,}/g, '\n\n')
    // 去除首尾空白
    .trim();

  return result;
};

const cleanHtml = (html: string): string => {
  // 先移除所有HTML注释
  let cleaned = html.replace(/<!--[\s\S]*?-->/g, '');

  // 移除所有样式和类属性
  cleaned = cleaned.replace(/ (style|class)="[^"]*"/g, '');

  // 使用改进的htmlToMarkdown转换
  cleaned = htmlToMarkdown(cleaned);

  // 移除空列表项和多余空行
  cleaned = cleaned.replace(/- \s*\n/g, '');
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  return cleaned.trim();
};

const formatDateMd = (dateStr: string): string => {
  return dateStr.replace(/-/g, '.');
};

const formatDateArray = (dateArray: string[]): string[] => {
  return dateArray.map((date) => formatDateMd(date));
};

export const concatMarkdown = (markdown: string, key: string, content: any): string => {
  const keyName = key.split('_')[1] || key;
  const keyPrefix = key.split('_')[0];

  if (typeof content.value === 'string' || typeof content.value === 'number') {
    if (keyPrefix.toLowerCase() === 'companyname' || keyPrefix.toLowerCase() === 'schoolname') {
      return `${markdown}## ${content.value}\n\n`;
    } else if (keyPrefix.toLowerCase() === 'avatar') {
      return `${markdown}- ${keyName}：\n<img src="${content.value}" alt="证件照" width="120" />\n\n`;
    } else if (typeof content.value === 'string' && content.value.includes('<')) {
      const cleanedContent = cleanHtml(content.value);
      if (cleanedContent) {
        return `${markdown}- ${keyName}：\n${cleanedContent}\n\n`;
      }
    } else {
      return `${markdown}- ${keyName}：${content.value}\n\n`;
    }
  } else if (
    Array.isArray(content.value) &&
    content.value.every((item) => typeof item === 'string')
  ) {
    if (keyPrefix.toLowerCase() === 'date') {
      const formattedDates = formatDateArray(content.value);
      return `${markdown}- ${keyName}：${formattedDates.join(' - ')}\n\n`;
    } else {
      return `${markdown}- ${keyName}：${content.value.join(' - ')}\n\n`;
    }
  } else if (
    Array.isArray(content.value) &&
    content.value.every((item) => typeof item === 'object')
  ) {
    let newMarkdown = markdown;
    let hasTitle = false;

    content.value.forEach((item: any) => {
      Object.keys(item).forEach((subKey) => {
        const subKeyPrefix = subKey.split('_')[0].toLowerCase();
        if (subKeyPrefix === 'companyname' || subKeyPrefix === 'schoolname') {
          hasTitle = true;
        }
      });
    });

    content.value.forEach((item: any) => {
      let title = '';
      Object.keys(item).forEach((subKey) => {
        const subKeyPrefix = subKey.split('_')[0];
        if (
          subKeyPrefix === 'schoolName' ||
          subKeyPrefix === 'skillName' ||
          subKeyPrefix.toLowerCase() === 'companyname'
        ) {
          title = item[subKey]?.value || title;
        }
      });

      if (title) {
        newMarkdown += `### ${title}\n\n`;
      }

      Object.keys(item).forEach((subKey) => {
        const subKeyPrefix = subKey.split('_')[0].toLowerCase();
        const subKeyName = subKey.split('_')[1] || subKey;
        const subValue = item[subKey]?.value;

        if (subValue === undefined || subValue === null) return;

        if (hasTitle && (subKeyPrefix === 'companyname' || subKeyPrefix === 'schoolname')) {
          return;
        }

        if (subKeyPrefix === 'jobcontent') {
          if (Array.isArray(subValue)) {
            subValue.forEach((contentItem: any) => {
              if (contentItem.content_内容?.value) {
                const cleanedContent = cleanHtml(contentItem.content_内容.value);
                if (cleanedContent) {
                  newMarkdown += `  - ${cleanedContent}\n`;
                }
              }
            });
            newMarkdown += '\n';
          }
        } else {
          if (Array.isArray(subValue)) {
            if (subKeyPrefix === 'date') {
              const formattedDates = formatDateArray(subValue);
              newMarkdown += `- ${subKeyName}：${formattedDates.join(' - ')}\n`;
            } else {
              newMarkdown += `- ${subKeyName}：${subValue.join(' - ')}\n`;
            }
          } else if (typeof subValue === 'object') {
            // 跳过嵌套对象
          } else {
            newMarkdown += `- ${subKeyName}：${subValue}\n`;
          }
        }
      });
      newMarkdown += '\n';
    });
    return newMarkdown;
  } else if (
    typeof content.value === 'object' &&
    content.value !== null &&
    !Array.isArray(content.value)
  ) {
    let newMarkdown = `${markdown}### ${keyName}\n\n`;
    Object.keys(content.value).forEach((subKey) => {
      newMarkdown = concatMarkdown(newMarkdown, subKey, content.value[subKey]);
    });
    return newMarkdown;
  }

  return markdown;
};

export const extractContentData = (contentData: any, props?: Record<string, any>) => {
  const content: any = {};
  if (contentData?.list) {
    content.list = {};
    content.list.value = processValue(contentData.list.value, props);
  } else {
    Object.keys(contentData).forEach((key: any) => {
      const relKey = `${key}_${contentData[key].label}`;

      if (props && props[key]?.show === false) {
        return;
      }

      content[relKey] = {};
      content[relKey].value = processValue(contentData[key].value, props);
    });
  }
  return content;
};

type ProcessedValue = string | number | ProcessedObject | ProcessedList;

interface ProcessedObject {
  [key: string]: ProcessedValue;
}

type ProcessedList = ProcessedValue[];

export const processValue = (value: any, props?: Record<string, any>): ProcessedValue => {
  if (
    typeof value === 'string' ||
    (Array.isArray(value) && value.every((item) => typeof item === 'string'))
  ) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => processValue(item, props));
  }

  if (typeof value === 'object' && value !== null) {
    const result: ProcessedObject = {};
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        const item = value[key];
        const relKey = `${key}_${item.label}`;

        if (props && props[key]?.show === false) {
          continue;
        }

        if (typeof item === 'object' && item !== null && 'label' in item && 'value' in item) {
          result[relKey] = { value: processValue(item.value, props) };
        } else {
          result[relKey] = processValue(item, props);
        }
      }
    }
    return result;
  }

  return value;
};

/**
 * 清洗Markdown内容
 * 用于简历诊断前对转换后的Markdown进行数据清洗
 * @param markdown 原始Markdown内容
 * @param aggressive 是否使用激进模式（进一步压缩换行）
 * @returns 清洗后的Markdown内容
 */
export const cleanMarkdownForDiagnosis = (markdown: string, aggressive: boolean = true): string => {
  if (!markdown || typeof markdown !== 'string') {
    return '';
  }

  let cleaned = markdown;

  // 1. 移除多余的空行（3个及以上连续换行合并为2个）
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  // 2. 移除行首行尾的多余空格
  cleaned = cleaned.split('\n').map(line => line.trim()).join('\n');

  // 3. 移除空的列表项
  cleaned = cleaned.replace(/^-\s*$/gm, '');

  // 4. 移除空的标题行
  cleaned = cleaned.replace(/^#{1,6}\s*$/gm, '');

  // 5. 移除重复的换行符
  cleaned = cleaned.replace(/\n\n\n+/g, '\n\n');

  // 6. 移除特殊控制字符
  cleaned = cleaned.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '');

  // 7. 移除HTML注释
  cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '');

  // 8. 标准化Markdown标题格式（确保#后有空格）
  cleaned = cleaned.replace(/^(#{1,6})([^\s#])/gm, '$1 $2');

  // 9. 移除图片链接（诊断不需要图片）
  cleaned = cleaned.replace(/!\[([^\]]*)\]\([^)]+\)/g, '');

  // 10. 移除纯URL链接，保留文本
  cleaned = cleaned.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  // 11. 再次清理多余的空行
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  // 12. 移除首尾空白
  cleaned = cleaned.trim();

  // 13. 移除包含特定无意义内容的行
  const meaninglessPatterns = [
    /^-\s*[:：]\s*$/,  // 空的冒号行
    /^#{1,6}\s*[:：]\s*$/,  // 空的标题冒号行
    /^\s*[-—–]\s*$/,  // 只有分隔符的行
  ];
  cleaned = cleaned.split('\n').filter(line => {
    return !meaninglessPatterns.some(pattern => pattern.test(line));
  }).join('\n');

  // 14. 最后再次清理多余的空行
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  // 15. 激进模式：进一步压缩换行符，将双换行改为单换行
  if (aggressive) {
    // 将双换行改为单换行
    cleaned = cleaned.replace(/\n\n/g, '\n');
    // 移除行首的Markdown列表符号后的多余空格
    cleaned = cleaned.replace(/^-\s+/gm, '- ');
    // 移除标题后的多余空行
    cleaned = cleaned.replace(/^(#{1,6}.*)\n+/gm, '$1\n');
  }

  return cleaned.trim();
};

/**
 * 将Markdown转换为纯文本
 * 去除所有Markdown格式标记，只保留文本内容
 * @param markdown Markdown内容
 * @returns 纯文本内容
 */
export const markdownToPlainText = (markdown: string): string => {
  if (!markdown || typeof markdown !== 'string') {
    return '';
  }

  let text = markdown;

  // 1. 移除Markdown标题标记 (# ## ### 等)
  text = text.replace(/^#{1,6}\s+/gm, '');

  // 2. 移除粗体和斜体标记
  text = text.replace(/\*\*(.*?)\*\*/g, '$1');
  text = text.replace(/\*(.*?)\*/g, '$1');
  text = text.replace(/__(.*?)__/g, '$1');
  text = text.replace(/_(.*?)_/g, '$1');

  // 3. 移除删除线标记
  text = text.replace(/~~(.*?)~~/g, '$1');

  // 4. 移除行内代码标记
  text = text.replace(/`([^`]+)`/g, '$1');

  // 5. 移除代码块标记
  text = text.replace(/```[\s\S]*?```/g, '');

  // 6. 移除链接标记，保留链接文本
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  text = text.replace(/\[([^\]]+)\]\[[^\]]*\]/g, '$1');

  // 7. 移除图片标记
  text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, '');

  // 8. 移除列表标记 (- * + 等)
  text = text.replace(/^[\s]*[-\*\+]\s+/gm, '');
  text = text.replace(/^\s*\d+\.\s+/gm, '');

  // 9. 移除引用标记
  text = text.replace(/^>\s*/gm, '');

  // 10. 移除水平分割线
  text = text.replace(/^[-*_]{3,}\s*$/gm, '');

  // 11. 移除HTML标签
  text = text.replace(/<[^>]+>/g, '');

  // 12. 移除HTML实体
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");

  // 13. 移除特殊控制字符
  text = text.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '');

  // 14. 合并多个空行为单个空行
  text = text.replace(/\n{3,}/g, '\n\n');

  // 15. 移除行首行尾空格
  text = text.split('\n').map(line => line.trim()).join('\n');

  // 16. 移除空行
  text = text.replace(/^\s*$/gm, '');

  // 17. 最后再次合并空行并去除首尾空白
  text = text.replace(/\n{2,}/g, '\n');

  return text.trim();
};
