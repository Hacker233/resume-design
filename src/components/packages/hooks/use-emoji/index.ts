import { Emoji } from '@/components/packages/components/emoji/index';
export const useEmojiParse = (allEmoji: Emoji, val: string): string => {
  //解析表情
  const reg = /\[.+?\]/g;
  val = val.replace(reg, (str: any) => {
    const emojiPath = allEmoji[str];
    //表情库不存在的就默认返回原字符串
    if (!emojiPath) {
      return str;
    }
    return [
      '<img src="',
      emojiPath,
      '" width="20" height="20" alt="',
      str,
      '" title="',
      str,
      '" style="margin: 0 1px; vertical-align: text-bottom"',
      '/>'
    ].join('');
  });
  return val;
};
