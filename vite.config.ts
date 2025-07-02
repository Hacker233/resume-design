import { fileURLToPath } from 'url';
import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import type { UserConfig } from 'vite';

import { createBuild } from './build/vite/build';
import { wrapperEnv } from './build/utils';
import { createProxy } from './build/vite/proxy';
import { createVitePlugins } from './build/vite/plugin';
import autoprefixer from 'autoprefixer';
import compression from 'vite-plugin-compression';

export default defineConfig(async ({ command, mode }: ConfigEnv): Promise<UserConfig> => {
  const root = process.cwd(); // 当前工作目录
  const isBuild = command === 'build'; // 是否是构建 serve
  const env = loadEnv(mode, root); // 加载 env 环境
  const viteEnv = wrapperEnv(env);

  return {
    // base: './',
    resolve: {
      // 设置别名
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      ...createBuild(viteEnv),
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router', 'pinia'],
            element: ['element-plus'],
            codemirror: ['codemirror', '@codemirror/lang-javascript', '@codemirror/lang-json'],
            echarts: ['echarts'],
            wangeditor: ['@wangeditor/editor', '@wangeditor/editor-for-vue']
          }
        }
      }
    },
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
              'ie >= 8',
              'last 2 versions', // 所有主流浏览器最近 2 个版本
              'not IE <= 11' // 排除 IE11 及以下
            ],
            grid: true
          })
        ]
      }
    },
    plugins: [...(await createVitePlugins(viteEnv, isBuild)), compression()],
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
