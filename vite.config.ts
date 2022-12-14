import { fileURLToPath } from 'url';
import { ConfigEnv, defineConfig, loadEnv } from 'vite';

import { createBuild } from './build/vite/build';
import { wrapperEnv } from './build/utils';
import { createProxy } from './build/vite/proxy';
import { createVitePlugins } from './build/vite/plugin';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv) => {
  const root = process.cwd(); // 当前工作目录
  const isBuild = command === 'build'; // 是否是构建 serve
  const env = loadEnv(mode, root); // 加载env环境
  const viteEnv = wrapperEnv(env);
  return {
    // base: './',
    resolve: {
      //设置别名
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: createBuild(viteEnv),
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/style/global.scss" as *;' //关键
        }
      }
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' }
    },
    server: {
      port: 8888, //启动端口
      host: '0.0.0.0',
      open: true,
      hmr: {
        host: 'localhost',
        port: 8080
      },
      // 设置代理
      proxy: createProxy()
    }
  };
});
