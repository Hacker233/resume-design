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
import serveStatic from 'serve-static';
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

          const app = express();
          app.use(serveStatic(path.resolve(__dirname, VITE_OUTPUT_DIR)));
          const server = app.listen(5137);

          console.log('Starting Puppeteer prerender...');
          const browser = await chrome.launch({
            headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
          });

          try {
            const outputPath = path.resolve(__dirname, VITE_OUTPUT_DIR);
            const page = await browser.newPage();

            // 设置拦截规则，阻止iconfont.js加载
            await page.setRequestInterception(true);
            page.on('request', (request) => {
              if (request.url().includes('iconfont.js')) {
                request.abort();
              } else {
                request.continue();
              }
            });

            // 注入预渲染标记
            await page.evaluateOnNewDocument(() => {
              (window as any).__PRERENDER_INJECTED = true;
            });

            // 设置视口为常见的桌面端尺寸（推荐）
            await page.setViewport({
              width: 1920,
              height: 1080,
              deviceScaleFactor: 1,
              isMobile: false,
              hasTouch: false,
              isLandscape: false
            });

            await page.goto('http://localhost:5137', {
              waitUntil: 'networkidle0',
              timeout: 30000
            });

            // 等待Vue应用完全加载
            await page.waitForFunction(
              () => {
                return (document.querySelector('#app') as any)?.__vue_app__ !== undefined;
              },
              { timeout: 10000 }
            );

            // 获取处理后的HTML
            const html = await page.evaluate(() => {
              // 移除可能存在的空图标容器
              document.querySelectorAll('[class*="icon"]').forEach((el) => {
                if (!el.innerHTML.trim()) el.remove();
              });
              return document.documentElement.outerHTML;
            });

            // 保存HTML（不再包含图标JS）
            fs.writeFileSync(path.join(outputPath, 'index.html'), html, { flag: 'w' });

            console.log('Prerendered HTML saved without iconfont.js');
          } finally {
            await browser.close();
            server.close();
            console.log('Prerender completed successfully');
          }
        }
      }
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
