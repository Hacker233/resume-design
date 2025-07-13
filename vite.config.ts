import { fileURLToPath } from 'url';
import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import type { UserConfig } from 'vite';

import { createVitePlugins } from './build/vite/plugin';
import { wrapperEnv } from './build/utils';
import autoprefixer from 'autoprefixer';
import compression from 'vite-plugin-compression';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

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
        '@': fileURLToPath(new URL('./src', import.meta.url))
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
      compression()
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
          target: 'your https address', // 请替换为实际API地址
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, '')
        }
      }
    }
  };
});
