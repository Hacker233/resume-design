/**
 * parseJSON 函数用于尝试解析 JSON 数据，支持常见的格式修复。
 * @param {string} input - 要解析的 JSON 字符串。
 * @returns {object|null} 返回解析后的对象，若解析失败，则返回 null。
 */
export const parseJSON = (input: any): any => {
  try {
    // 处理可能的空白字符问题
    input = input.trim();

    // 校验并修复常见格式问题（如引号错误、转义符问题）
    input = fixJSON(input);

    // 解析 JSON 数据
    return JSON.parse(input);
  } catch (error) {
    console.error('JSON 解析错误:', error);
    return null; // 解析失败返回 null
  }
};

/**
 * fixJSON 函数修复翻译过程中的常见问题，例如引号错误、转义符问题等。
 * @param {string} input - 需要修复的 JSON 字符串。
 * @returns {string} 修复后的 JSON 字符串。
 */
export const fixJSON = (input: any): any => {
  // 修复翻译时可能丢失的双引号问题
  // eslint-disable-next-line quotes
  input = input.replace(/“|”/g, '"').replace(/‘|’/g, "'");

  // 处理特殊字符转义（比如中文字符的转义）
  input = input.replace(/\\n/g, '\\\\n').replace(/\\t/g, '\\\\t');

  return input;
};

/**
 * preprocessData 函数用于预处理数据，确保格式正确，适应各种翻译场景。
 * @param {string|object} data - 需要处理的数据，可以是字符串或对象。
 * @returns {string|object} 预处理后的数据。
 */
export const preprocessData = (data: any): any => {
  // 1. 处理可能丢失的键值对格式
  data = ensureProperFormat(data);

  // 2. 处理编码问题（如确保 UTF-8 编码）
  data = ensureUTF8Encoding(data);

  // 3. 进行翻译修复
  data = fixTranslationIssues(data);

  return data;
};

/**
 * ensureProperFormat 函数确保数据格式正确。
 * @param {string|object} data - 需要处理的数据。
 * @returns {string|object} 处理后的数据。
 */
export const ensureProperFormat = (data: any): any => {
  if (typeof data === 'string') {
    data = data.trim();
  }

  if (typeof data === 'object' && data !== null) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        data[key] = ensureProperFormat(data[key]);
      }
    }
  }

  return data;
};

/**
 * ensureUTF8Encoding 函数确保文本数据采用 UTF-8 编码。
 * @param {string|object} data - 需要处理的数据。
 * @returns {string|object} 处理后的数据。
 */
export const ensureUTF8Encoding = (data: any): any => {
  // 假设处理的数据是文本，确保 UTF-8 编码一致性
  if (typeof data === 'string') {
    return new TextDecoder('utf-8').decode(new TextEncoder().encode(data));
  }
  return data;
};

/**
 * fixTranslationIssues 函数修复翻译过程中可能产生的问题，如引号、特殊字符等。
 * @param {string|object} data - 需要处理的数据。
 * @returns {string|object} 处理后的数据。
 */
export const fixTranslationIssues = (data: any): any => {
  if (typeof data === 'string') {
    data = fixJSON(data);
  } else if (typeof data === 'object') {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        data[key] = fixTranslationIssues(data[key]);
      }
    }
  }
  return data;
};

/**
 * parseWithErrorHandling 函数增强 JSON 解析的错误处理，解析失败时提供友好的错误提示。
 * @param {string} input - 要解析的 JSON 字符串。
 * @returns {object|null} 返回解析后的对象，若解析失败，则返回 null。
 */
export const parseWithErrorHandling = (input: any): any => {
  const result = parseJSON(input);

  if (result === null) {
    console.warn('JSON 解析失败，请检查数据格式或修复翻译错误。');
  }
  return result;
};

// 提取值
export const extractValues = (data: any): any[] => {
  const values: any = [];
  function traverse(obj: any) {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        if (Array.isArray(obj[key])) {
          obj[key].forEach((item: any) => {
            if (typeof item === 'object') {
              traverse(item);
            } else {
              values.push(item);
            }
          });
        } else {
          if (key === 'value') {
            values.push(obj[key]);
          } else {
            traverse(obj[key]);
          }
        }
      } else {
        if (key === 'value') {
          values.push(obj[key]);
        }
      }
    }
  }
  traverse(data);
  return values;
};

// 恢复原始 JSON 数据
export const restoreJsonData = (values: any[], structure: any): any => {
  let index = 0;
  function buildObject(obj: any) {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        if (Array.isArray(obj[key])) {
          obj[key] = obj[key].map((item: any) => {
            if (typeof item === 'object') {
              return buildObject(item);
            } else {
              return values[index++];
            }
          });
        } else {
          if (key === 'value') {
            obj[key] = values[index++];
          } else {
            buildObject(obj[key]);
          }
        }
      } else {
        if (key === 'value') {
          obj[key] = values[index++];
        }
      }
    }
    return obj;
  }
  return buildObject(JSON.parse(JSON.stringify(structure)));
};
