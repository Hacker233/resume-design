/**
 * 当前时间状态
 */
export const useTimeState = () => {
  // 获取当前时间
  const now = new Date();
  // 获取当前小时
  const hours = now.getHours();
  // 设置默认文字
  let msg = '晚上好!';
  if (hours >= 0 && hours < 6) {
    msg = '凌晨好!';
  } else if (hours < 9) {
    msg = '早上好!';
  } else if (hours < 12) {
    msg = '上午好!';
  } else if (hours < 14) {
    msg = '中午好!';
  } else if (hours < 17) {
    msg = '下午好!';
  } else if (hours < 19) {
    msg = '傍晚好!';
  }
  return msg;
};
