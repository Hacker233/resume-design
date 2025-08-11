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
const generateFooterHtml = (vxquns = [], links = []) => {
  // 关键 CSS - 添加作用域限定
  const criticalCSS = `
    <style>
      .global-footer-box {
        background-color: #2a2a2a;
        color: #e0e0e0;
        padding: 40px 0 10px 0;
        font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
        width: 100%;
      }
      
      .recommend {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 15px;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 15px 15px;
      }
      
      .contact-me {
        min-width: 150px;
        margin-bottom: 0;
        padding: 0 5px;
      }
      
      .about-me, .links {
        min-width: 150px;
        margin-bottom: 0;
        padding: 0 5px;
      }
      
      h4 {
        color: #ffffff;
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 10px;
        position: relative;
        padding-bottom: 5px;
      }
      
      h4::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 30px;
        height: 2px;
        background: linear-gradient(90deg, #4caf50, #8bc34a);
      }
      
      .add-wechat {
        text-align: center;
        margin-right: 10px;
      }
      
      .add-wechat img {
        width: 100px;
        height: 100px;
        border-radius: 5px;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      h5 {
        margin-top: 5px;
        font-size: 14px;
        color: #b0b0b0;
        margin: 0;
        margin-bottom: 8px;
      }
      
      .links-box {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        align-items: center;
      }
      
      .links-box p {
        margin: 0;
      }
      
      .links-box a {
        color: #8d8d8d;
        font-size: 13px;
        text-decoration: none;
      }
      
      .apply-links {
        background: rgba(76, 175, 80, 0.1);
        border: 1px solid rgba(76, 175, 80, 0.3);
        color: #4caf50;
        padding: 4px 10px;
        border-radius: 14px;
        font-size: 12px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
      
      .site-map {
        color: #b0b0b0;
        font-size: 14px;
        text-decoration: none;
      }
      
      .line {
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        margin-bottom: 10px;
        max-width: 1200px;
        margin: 0 auto;
      }
      
      .copyright-notice p, .icp-record-number a {
        color: #757575;
        font-size: 12px;
        text-decoration: none;
      }
      
      .copyright-notice, .icp-record-number {
        text-align: center;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 15px;
      }
      
      @media (max-width: 900px) {
        .contact-me, .about-me, .links {
          flex: 0 0 calc(50% - 15px);
        }
      }
      
      @media (max-width: 600px) {
        .recommend {
          flex-direction: column;
          gap: 15px;
        }
        
        .contact-me, .about-me, .links {
          flex: 0 0 100%;
          min-width: 100%;
        }
      }
    </style>
  `;

  const vxQunHtml = vxquns
    .map(
      (item) => `
      <div class="add-wechat">
        <img src="${item.qr_code || item.qrcode || ''}" alt="${
        item.name || ''
      } 二维码" title="扫描二维码添加 ${item.name || ''}" loading="lazy" />
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
    <div class="global-footer-box" id="global-footer-box">
      <div class="recommend">
        <div class="contact-me" v-viewer>
          <h4>联系我们</h4>
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
            <button class="apply-links" onclick="applyLinks()">+ 申请友链</button>
          </div>
          <div class="links-box">
            ${linksHtml}
          </div>
        </div>
        <div class="links">
          <h4>网站地图</h4>
          <a class="site-map" href="https://maobucv.com/sitemap.xml">🗺️ 站点地图</a>
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
