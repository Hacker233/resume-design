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
