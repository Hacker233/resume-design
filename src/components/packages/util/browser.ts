export function useBrowser() {
  const { clientWidth } = document.documentElement;

  // 浏览器信息
  const ua = navigator.userAgent.toLowerCase();

  // 浏览器类型
  let type = (ua.match(/firefox|chrome|safari|opera/g) || 'other')[0];

  if ((ua.match(/msie|trident/g) || [])[0]) {
    type = 'msie';
  }

  // 平台标签
  let tag = '';

  const isTocuh =
    'ontouchstart' in window || ua.indexOf('touch') !== -1 || ua.indexOf('mobile') !== -1;
  if (isTocuh) {
    if (ua.indexOf('ipad') !== -1) {
      tag = 'pad';
    } else if (ua.indexOf('mobile') !== -1) {
      tag = 'mobile';
    } else if (ua.indexOf('android') !== -1) {
      tag = 'androidPad';
    } else {
      tag = 'pc';
    }
  } else {
    tag = 'pc';
  }

  // 浏览器内核
  let prefix = '';

  switch (type) {
    case 'chrome':
    case 'safari':
    case 'mobile':
      prefix = 'webkit';
      break;
    case 'msie':
      prefix = 'ms';
      break;
    case 'firefox':
      prefix = 'Moz';
      break;
    case 'opera':
      prefix = 'O';
      break;
    default:
      prefix = 'webkit';
      break;
  }

  // 操作平台
  const plat = ua.indexOf('android') > 0 ? 'android' : navigator.platform.toLowerCase();

  // 屏幕信息
  let screen = 'full';

  if (clientWidth < 768) {
    screen = 'xs';
  } else if (clientWidth < 992) {
    screen = 'sm';
  } else if (clientWidth < 1200) {
    screen = 'md';
  } else if (clientWidth < 1920) {
    screen = 'xl';
  } else {
    screen = 'full';
  }

  // 是否 ios
  const isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

  // 浏览器版本
  const version = (ua.match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1];

  // 是否 PC 端
  const isPC = tag === 'pc';

  // 是否移动端
  const isMobile = isPC ? false : true;

  // 是否移动端 + 屏幕宽过小
  const isMini = screen === 'xs' || isMobile;

  const innerHeight = window.innerHeight + 'px';

  return {
    version,
    type,
    plat,
    tag,
    prefix,
    isMobile,
    isIOS,
    isPC,
    isMini,
    screen,
    innerHeight
  };
}
