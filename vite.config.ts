import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import type { UserConfig } from 'vite';
import { createVitePlugins } from './build/vite/plugin';
import { wrapperEnv } from './build/utils';
import autoprefixer from 'autoprefixer';
import compression from 'vite-plugin-compression';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import path from 'path';
import chrome from 'puppeteer';
import express from 'express';
// import serveStatic from 'serve-static';
import prerender from 'vite-plugin-prerender';
import templates from './public/static/templates.json';

const fs = require('fs');

const isProduction = process.env.VITE_ENV === 'production';
const isDev = !isProduction;

export default defineConfig(async ({ command, mode }: ConfigEnv): Promise<UserConfig> => {
  const root = process.cwd();
  const isBuild = command === 'build';
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_OUTPUT_DIR } = viteEnv;

  console.log('Building in:', isBuild ? 'production' : 'development');
  console.log('Environment variables:', viteEnv);

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    build: {
      sourcemap: isDev,
      outDir: VITE_OUTPUT_DIR,
      cssCodeSplit: false,
      reportCompressedSize: false,
      target: 'esnext',
      minify: isProduction ? 'terser' : 'esbuild',
      assetsInlineLimit: 4096,
      chunkSizeWarningLimit: 5000,
      assetsDir: 'static',
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
            elementPlus: ['element-plus'],
            echarts: ['echarts'],
            wangeditor: ['@wangeditor/editor', '@wangeditor/editor-for-vue'],
            codemirror: ['codemirror', '@codemirror/lang-javascript', '@codemirror/lang-json'],
            lodash: ['lodash'],
            vendor: ['axios']
          },
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: (chunkInfo) => {
            const extType = chunkInfo.name?.match(/\.(png|jpe?g|gif|svg)$/i)
              ? 'images'
              : chunkInfo.name?.match(/\.(woff2?|eot|ttf|otf)$/i)
                ? 'fonts'
                : chunkInfo.name?.match(/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i)
                  ? 'media'
                  : 'static';
            return `static/${extType}/[name]-[hash][extname]`;
          }
        },
        treeshake: true
      },
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.*'],
          passes: 3,
          dead_code: true,
          unused: true
        },
        mangle: {
          toplevel: true
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/style/global.scss" as *;'
        }
      },
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: [
              'Android 4.1',
              'iOS 7.1',
              'Chrome > 31',
              'ff > 31',
              'ie >= 8',
              'last 2 versions',
              'not IE <= 11'
            ],
            grid: true
          })
        ]
      }
    },
    plugins: [
      ...(await createVitePlugins(viteEnv, isBuild)),
      ViteImageOptimizer({
        png: {
          quality: 65,
          compressionLevel: 9
        },
        jpeg: {
          quality: 65,
          progressive: true
        },
        webp: {
          quality: 65,
          lossless: false
        },
        avif: {
          quality: 65,
          lossless: false
        }
      }),
      compression(),
      {
        name: 'puppeteer-prerender',
        closeBundle: async () => {
          if (!isBuild) return;
          console.log('process.env.VITE_BUILD_MODE', process.env.VITE_BUILD_MODE);
          const buildMode = process.env.VITE_BUILD_MODE;
          if (buildMode !== 'ssr') return;

          const app = express();
          const staticDir = path.resolve(__dirname, VITE_OUTPUT_DIR);

          // 先设置静态文件服务
          app.use(express.static(staticDir));

          // 然后设置SPA回退路由（修正后的写法）
          app.get(/^\/(?!api).*/, (req, res) => {
            res.sendFile(path.join(staticDir, 'index.html'));
          });

          const server = app.listen(5137, '0.0.0.0', () => {
            console.log('Prerender server running at http://localhost:5137');
          });

          console.log('Starting Puppeteer prerender for templates...');
          const browser = await chrome.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
          });

          try {
            const outputPath = path.resolve(__dirname, VITE_OUTPUT_DIR);
            const templateDir = path.join(outputPath, 'template');

            if (!fs.existsSync(templateDir)) {
              fs.mkdirSync(templateDir, { recursive: true });
            }

            // ============= 新增的sitemap预渲染部分 =============
            console.log('Prerendering sitemap page...');
            const sitemapPage = await browser.newPage();

            // 设置拦截规则（与现有逻辑一致）
            await sitemapPage.setRequestInterception(true);
            sitemapPage.on('request', (request) => {
              if (request.url().includes('iconfont.js')) {
                request.abort();
              } else {
                request.continue();
              }
            });

            // 设置视口（与现有逻辑一致）
            await sitemapPage.setViewport({
              width: 1920,
              height: 1080,
              deviceScaleFactor: 1,
              isMobile: false,
              hasTouch: false,
              isLandscape: false
            });

            try {
              // 访问sitemap路由
              await sitemapPage.goto('http://localhost:5137/sitemap', {
                waitUntil: 'networkidle0',
                timeout: 60000
              });

              // 获取处理后的HTML
              const sitemapHtml = await sitemapPage.evaluate(
                () => document.documentElement.outerHTML
              );

              // 插入 native-events.js 脚本
              const sitemapInjectedScriptTag = '<script src="/static/native-events.js"></script>';
              const sitemapModifiedHtml = sitemapHtml
                .replace('</body>', `${sitemapInjectedScriptTag}</body>`);

              // 保存到dist根目录
              fs.writeFileSync(path.join(outputPath, 'sitemap.html'), sitemapModifiedHtml, {
                encoding: 'utf-8'
              });

              console.log('Sitemap prerendered successfully');
            } catch (err) {
              console.error('Error prerendering sitemap:', err);
            } finally {
              await sitemapPage.close();
            }
            // ============= 新增部分结束 =============

            // 在线制作模版预渲染
            const idList = templates;
            console.log('idList', idList);

            for (let i = 0; i < idList.length; i++) {
              const id = idList[i].id;
              const pageName = idList[i].page;
              const templateTitle = idList[i].title;

              // 获取当前模板的SEO信息
              const templateData = idList[i];
              const seoInfo: any = templateData.seo || {};

              const page = await browser.newPage();

              // 设置拦截规则
              await page.setRequestInterception(true);
              page.on('request', (request) => {
                if (request.url().includes('iconfont.js')) {
                  request.abort();
                } else {
                  request.continue();
                }
              });

              console.log(`Prerendering template for id: ${id}`);

              // 设置视口为常见的桌面端尺寸（推荐）
              await page.setViewport({
                width: 1920,
                height: 1080,
                deviceScaleFactor: 1,
                isMobile: false,
                hasTouch: false,
                isLandscape: false
              });

              try {
                // 方法1：直接访问动态路由
                await page.goto(`http://localhost:5137/resumedetail/${id}`, {
                  waitUntil: 'networkidle0',
                  timeout: 60000
                });

                // 获取处理后的HTML
                const html = await page.evaluate(() => document.documentElement.outerHTML);

                // 插入 native-events.js 脚本
                const injectedScriptTag = '<script src="/static/native-events.js"></script>';

                // SEO优化 - 使用预生成的SEO信息
                const title = `${templateTitle} - 专业简历设计 - 猫步简历`;
                const description = seoInfo.description || `${templateTitle} - 猫步简历提供的专业简历模板，助力您的求职之路`;
                const keywords = seoInfo.keywords || `${templateTitle},简历模板,专业简历,求职简历,猫步简历`;
                const canonicalUrl = seoInfo.canonicalUrl || `https://maobucv.com/template/${id}`;
                const imageUrl = seoInfo.imageUrl || 'https://maobucv.com/static/images/logo-maobu-Cs7LMwDk.png';

                // 结构化数据
                const schemaData = {
                  "@context": "https://schema.org",
                  "@type": "WebPage",
                  "name": title,
                  "description": description,
                  "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": canonicalUrl
                  },
                  "breadcrumb": {
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                      {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "首页",
                        "item": "https://maobucv.com/"
                      },
                      {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "简历模板",
                        "item": "https://maobucv.com/resume"
                      },
                      {
                        "@type": "ListItem",
                        "position": 3,
                        "name": templateTitle
                      }
                    ]
                  }
                };

                // 社交分享标签
                const socialTags = `
                  <meta property="og:title" content="${title}">
                  <meta property="og:description" content="${description}">
                  <meta property="og:url" content="${canonicalUrl}">
                  <meta property="og:type" content="website">
                  <meta property="og:image" content="${imageUrl}">
                  <meta name="twitter:card" content="summary_large_image">
                  <meta name="twitter:title" content="${title}">
                  <meta name="twitter:description" content="${description}">
                  <meta name="twitter:image" content="${imageUrl}">
                `;

                // 修改HTML
                let modifiedHtml = html
                  // 修改标题
                  .replace(/<title>.*<\/title>/, `<title>${title}</title>`)
                  // 修改描述
                  .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${description}">`)
                  // 修改关键词
                  .replace(/<meta name="keywords" content="[^"]*">/, `<meta name="keywords" content="${keywords}">`)
                  // 修改规范链接
                  .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${canonicalUrl}">`)
                  // 替换结构化数据
                  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify(schemaData)}</script>`)
                  // 添加社交分享标签
                  .replace('</head>', `${socialTags}</head>`)
                  // 插入脚本
                  .replace('</body>', `${injectedScriptTag}</body>`);

                // 保存文件
                fs.writeFileSync(path.join(templateDir, pageName), modifiedHtml, {
                  encoding: 'utf-8'
                });

                console.log(`Template ${i + 1} prerendered successfully`);
              } catch (err) {
                console.error(`Error prerendering id ${id}:`, err);
              } finally {
                await page.close();
              }
            }
          } catch (err) {
            console.error('Prerender failed:', err);
          } finally {
            await browser.close();
            server.close(() => {
              console.log('Prerender server closed');
            });
          }
        }
      },
      // ✅ prerender 插件
      prerender({
        staticDir: path.resolve(__dirname, VITE_OUTPUT_DIR),
        routes: ['/'],
        postProcess: (context) => {
          const dataPath = path.resolve(__dirname, '.temp/prerender-data.json');

          if (!context || !context.html) {
            console.warn('⚠️ context.html 不存在，可能未正确渲染');
            return context;
          }

          // 只对根路由 / 进行替换
          if (context.route === '/') {
            if (fs.existsSync(dataPath)) {
              try {
                const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
                // 尝试替换占位符
                if (context.html.includes('<div id="footer"></div>')) {
                  context.html = context.html.replace(
                    '<div id="footer"></div>',
                    `${data.FOOTER_HTML}`
                  );
                } else if (context.html.includes('<div class="global-footer-box"')) {
                  // 如果占位符已被替换，尝试替换整个footer部分
                  context.html = context.html.replace(
                    /<div class="global-footer-box"[^>]*>[\s\S]*?<\/div>/,
                    `${data.FOOTER_HTML}`
                  );
                }
                return context;
              } catch (err) {
                console.error('❌ 解析 prerender-data.json 失败:', err);
                return context;
              }
            } else {
              console.warn('⚠️ prerender-data.json 不存在于 .temp/，请检查是否成功生成');
              return context;
            }
          }

          // 非根路由，原样返回不做处理
          return context;
        }
      })
    ],
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' }
    },
    server: {
      port: 8888,
      host: '0.0.0.0',
      open: true,
      hmr: true,
      proxy: {
        '/api': {
          target: 'your https address',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, '')
        }
      }
    }
  };
});
