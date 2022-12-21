import { ElNotification } from 'element-plus';
import 'element-plus/theme-chalk/el-notification.css';

const browser = {
  versions: (function () {
    const u = navigator.userAgent;
    return {
      //移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
    };
  })(),
  language: navigator.language.toLowerCase()
};
export const userAgent = () => {
  if (browser.versions.mobile) {
    ElNotification({
      title: '提示',
      message: '在电脑端访问将会获得更好的体验哦~',
      type: 'warning'
    });
  } else if (browser.versions.trident || browser.versions.presto || browser.versions.gecko) {
    ElNotification({
      title: '提示',
      message: '建议使Chrome浏览器访问，以获得最佳体验！~',
      type: 'warning'
    });
  }
};
