import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import * as path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { createBuild } from './build/vite/build';
import { wrapperEnv } from './build/utils';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv) => {
  const root = process.cwd(); // 当前工作目录
  const isBuild = command === 'build'; // 是否是构建 serve
  console.log(isBuild);
  const env = loadEnv(mode, root); // 加载env环境
  const viteEnv = wrapperEnv(env);
  return {
    base: './',
    resolve: {
      //设置别名
      alias: {
        '@': path.resolve(__dirname, 'src')
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
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(__dirname, 'src/assets/icons/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      }),
      AutoImport({
        resolvers: [
          ElementPlusResolver({
            // 关键：自动引入修改主题色添加这一行，使用预处理样式，不添加将会导致使用ElMessage，ElNotification等组件时默认的主题色会覆盖自定义的主题色
            importStyle: 'sass'
          })
        ]
      }),
      Components({
        resolvers: [
          ElementPlusResolver({
            // 关键：自动引入修改主题色添加这一行，使用预处理样式
            importStyle: 'sass'
          })
        ]
      })
    ],
    server: {
      port: 8080, //启动端口
      host: '0.0.0.0',
      open: true,
      hmr: {
        host: 'localhost',
        port: 8080
      },
      // 设置代理
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
