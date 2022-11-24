const serverAddress =
  import.meta.env.MODE === 'development' ? 'http://localhost:3399' : 'https://91huajian.cn';
const CONFIG = {
  // serverAddress: 'http://localhost:3399',
  // serverAddress: 'https://91huajian.cn',
  serverAddress: serverAddress,
  smallpigAddress: 'https://smallpig.site'
};
export default CONFIG;

// /www/wwwroot/huajian.smallpig.site/resume-server/resume-server/node_modules/_puppeteer@17.1.3@puppeteer/.local-chromium/linux-1036745/chrome-linux/chrome: error while loading shared libraries: libnss3.so: cannot open shared object file: No such file or directory
// /www/wwwroot/huajian.smallpig.site/resume-server/resume-server/node_modules/_puppeteer@17.1.3@puppeteer/.local-chromium/linux-1036745/chrome-linux/chrome: error while loading shared libraries: libdrm.so.2: cannot open shared object file: No such file or directory
// yum install mesa-libgbm
