import { fileURLToPath } from 'url';
import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import path from 'path'; // 导入 path 模块

import { createBuild } from './build/vite/build';
import { wrapperEnv } from './build/utils';
import { createProxy } from './build/vite/proxy';
import { createVitePlugins } from './build/vite/plugin';
import autoprefixer from 'autoprefixer';
import prerender from 'vite-plugin-prerender';

export default defineConfig(async ({ command, mode }: ConfigEnv) => {
  const root = process.cwd(); // 当前工作目录
  const isBuild = command === 'build'; // 是否是构建 serve
  const env = loadEnv(mode, root); // 加载 env 环境
  const viteEnv = wrapperEnv(env);

  // 动态导入 vite-plugin-sitemap
  const { default: sitemap } = await import('vite-plugin-sitemap');

  return {
    // base: './',
    resolve: {
      // 设置别名
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: createBuild(viteEnv),
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/style/global.scss" as *;' // 关键
        }
      },
      postcss: {
        // ⚠️ 关键代码
        plugins: [
          autoprefixer({
            // 自动添加前缀
            overrideBrowserslist: [
              'Android 4.1',
              'iOS 7.1',
              'Chrome > 31',
              'ff > 31',
              'ie >= 8'
              //'last 2 versions', // 所有主流浏览器最近 2 个版本
            ],
            grid: true
          })
        ]
      }
    },
    plugins: [
      ...(await createVitePlugins(viteEnv, isBuild)),
      prerender({
        staticDir: path.resolve(__dirname, 'dist'), // 指定预渲染的静态文件目录
        routes: ['/', '/template'] // 预渲染的路径列表
      }),
      sitemap({
        hostname: 'https://91huajian.cn' // 修正 URL
      })
    ],
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' }
    },
    server: {
      port: 8888, // 启动端口
      host: '0.0.0.0',
      open: true,
      hmr: true,
      // 设置代理
      proxy: createProxy()
    }
  };
});
