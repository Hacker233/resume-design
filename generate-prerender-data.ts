// generate-prerender-data.ts

import fs from 'fs';
import path from 'path';
import axios from 'axios'; // 需要安装 axios，或者改成你用的请求库

// 兼容 ESModule 的 __dirname 获取
const __dirname = path.resolve(); // ✅ 直接使用 Node.js 的 __dirname

const API_BASE = 'https://maobucv.com'; // 请替换成你的接口基础URL

// 请求获取无需权限微信群列表
async function getVXQunListUnauthAsync(params = { page: 1, limit: 100 }) {
  try {
    const res = await axios.get(`${API_BASE}/huajian/common/getVXQunListUnauth`, { params });
    return res.data;
  } catch (error) {
    console.error('请求微信群列表失败:', error);
    return { data: [] };
  }
}

// 请求获取友链列表
async function getLinksListAsync(params = { page: 1, limit: 100 }) {
  try {
    const res = await axios.get(`${API_BASE}/huajian/common/getLinksList`, { params });
    return res.data;
  } catch (error) {
    console.error('请求友链列表失败:', error);
    return { data: { list: [] } };
  }
}

const writeDataToFile = (data: any) => {
  const tempDir = path.resolve(__dirname, '.temp');
  const filePath = path.resolve(tempDir, 'prerender-data.json');

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log('✅ prerender-data.json 写入成功:', filePath);
};

// generate-prerender-data.ts

const generateFooterHtml = (vxquns: any[], links: any[]) => {
  // 关键 CSS - 添加作用域限定
  const criticalCSS = `
    <style>
      /* 所有样式都限定在 .global-footer-box 内部 */
      .global-footer-box {
        width: 100%;
        background-color: #333333;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 15px 0;
      }
      
      .global-footer-box .recommend {
        display: flex;
        padding: 20px 0;
        width: 100%;
        height: 250px;
        justify-content: center;
        align-items: center;
      }
      
      .global-footer-box h4 {
        color: #a3a5a7;
        font-size: 16px;
        padding-bottom: 10px;
        letter-spacing: 1px;
        font-weight: 500;
        margin: 0;
      }
      
      .global-footer-box .contact-me {
        display: flex;
      }
      
      .global-footer-box .contact-me img {
        width: 105px;
        height: 105px;
      }
      
      .global-footer-box h5 {
        font-size: 14px;
        color: #fff;
        margin: 0;
        margin-top: 10px;
      }
      
      .global-footer-box .add-wechat {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 40px;
        cursor: pointer;
        user-select: none;
      }
      
      .global-footer-box .about-me {
        height: 100%;
        display: flex;
        flex-direction: column;
        padding-top: 30px;
        margin-right: 40px;
      }
      
      .global-footer-box .about-me h5 {
        color: #fff;
        display: flex;
        justify-content: flex-start;
        margin: 0;
        margin-bottom: 10px;
        font-size: 14px;
      }
      
      .global-footer-box .about-me a {
        color: inherit;
        text-decoration: none;
        letter-spacing: 2px;
        transition: all 0.3s;
      }
      
      .global-footer-box .about-me a:hover {
        color: rgb(123, 238, 123);
      }
      
      .global-footer-box .links {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding-top: 30px;
      }
      
      .global-footer-box .links-box {
        display: flex;
        flex-wrap: wrap;
        max-width: 200px;
      }
      
      .global-footer-box .links-box .site-map {
        text-decoration: none;
        cursor: pointer;
        color: #a3a5a7;
      }
      
      .global-footer-box .links-box h4 {
        margin-right: 38px;
      }
      
      .global-footer-box .links-box p {
        color: #fff;
        display: flex;
        justify-content: flex-start;
        font-size: 14px;
        box-sizing: border-box;
        flex-shrink: 0;
      }
      
      .global-footer-box .links-box a {
        color: inherit;
        text-decoration: none;
        letter-spacing: 2px;
        transition: all 0.3s;
        flex-shrink: 0;
        margin: 0 20px 10px 0;
      }
      
      .global-footer-box .links-box a:hover {
        color: rgb(123, 238, 123);
      }
      
      .global-footer-box .apply-links {
        cursor: pointer;
        transition: all 0.3s;
        margin-right: 0;
      }
      
      .global-footer-box .apply-links:hover {
        color: rgb(123, 238, 123);
      }
      
      .global-footer-box .line {
        height: 1px;
        width: 650px;
        background-color: #5b5b5b;
      }
      
      .global-footer-box .copyright-notice {
        margin: 15px 0;
      }
      
      .global-footer-box .copyright-notice p {
        color: #757c88;
        font-size: 12px;
      }
      
      .global-footer-box .icp-record-number {
        display: flex;
      }
      
      .global-footer-box .icp-record-number p {
        color: #757c88;
        font-size: 12px;
        display: flex;
        align-items: center;
        margin: 0 10px;
      }
      
      .global-footer-box .icp-record-number a {
        color: inherit;
        text-decoration: none;
        letter-spacing: 2px;
        transition: all 0.3s;
      }
      
      .global-footer-box .icp-record-number a:hover {
        color: rgb(123, 238, 123);
      }
    </style>
  `;

  const vxQunHtml = vxquns
    .map(
      (item) => `
      <div class="add-wechat">
        <img src="${item.qr_code || item.qrcode || ''}" alt="${
        item.name || ''
      } 二维码" title="扫描二维码添加 ${item.name}" loading="lazy" />
        <h5>${item.name || ''}</h5>
      </div>
    `
    )
    .join('\n');

  const linksHtml = links
    .filter((item) => item.audit === 1)
    .map(
      (item) => `
      <p><a href="${item.link || item.url || '#'}" target="_blank" rel="noopener noreferrer">${
        item.name || ''
      }</a></p>
    `
    )
    .join('\n');

  return `
    ${criticalCSS}
    <div class="global-footer-box">
      <div class="recommend">
        <div class="contact-me" v-viewer>
          ${vxQunHtml}
        </div>
        <div class="about-me">
          <h4>社交平台</h4>
          <h5><a href="https://space.bilibili.com/493520625" target="_blank" rel="noopener noreferrer">哔哩哔哩</a></h5>
          <h5><a href="https://juejin.cn/user/3034307822112798" target="_blank" rel="noopener noreferrer">稀土掘金</a></h5>
          <h5><a href="https://www.zhihu.com/people/luhongquan" target="_blank" rel="noopener noreferrer">个人知乎</a></h5>
        </div>
        <div class="links">
          <div class="links-box">
            <h4>友情链接</h4>
            <h4 class="apply-links" onclick="applyLinks()">申请友链</h4>
          </div>
          <div class="links-box">
            ${linksHtml}
          </div>
        </div>
        <div class="links">
          <div class="links-box">
            <a class="apply-links site-map" href="https://maobucv.com/sitemap.xml">站点地图</a>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="copyright-notice">
        <p>Copyright © 2025 猫步简历 All Rights Reserved.</p>
      </div>
      <div class="icp-record-number">
        <p><a href="https://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer">蜀ICP备2020034752号</a></p>
      </div>
    </div>
  `;
};

(async () => {
  try {
    // 获取微信群和友链数据
    const [vxqunRes, linksRes] = await Promise.all([
      getVXQunListUnauthAsync(),
      getLinksListAsync({ page: 1, limit: 100 })
    ]);

    // 取出数据主体，根据接口结构调整
    const vxquns = vxqunRes?.data || [];
    const links = linksRes?.data?.list || [];

    // 生成完整footer html字符串
    const footerHtml = generateFooterHtml(vxquns, links);

    // 写入到文件
    writeDataToFile({
      FOOTER_HTML: footerHtml
    });
  } catch (err) {
    console.error('❌ 生成 prerender-data.json 失败:', err);
    process.exit(1);
  }
})();
