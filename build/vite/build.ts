import type { BuildOptions } from 'vite';

export function createBuild(viteEnv: { VITE_ENV: string; VITE_OUTPUT_DIR: string }): BuildOptions {
  const { VITE_ENV, VITE_OUTPUT_DIR } = viteEnv;
  return {
    sourcemap: VITE_ENV !== 'production', // 是否启用 source map
    outDir: VITE_OUTPUT_DIR,
    cssCodeSplit: true, // 启用 CSS 代码拆分，按需加载
    reportCompressedSize: false, // 关闭打包计算压缩后的文件大小
    target: 'esnext',
    minify: VITE_ENV === 'production' ? 'terser' : 'esbuild', // 混淆器, terser 构建后文件体积更小, esbuild 更快
    assetsInlineLimit: 4096, // 小于此阈值的导入或引用资源将内联为 base64 编码
    chunkSizeWarningLimit: 5000, // chunk 大小警告的限制（以 kbs 为单位）
    assetsDir: 'static', // 静态资源目录
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name) {
            const info = chunkInfo.name.split('.');
            let extType = info[info.length - 1];
            if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(chunkInfo.name)) {
              extType = 'media';
            } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(chunkInfo.name)) {
              extType = 'images';
            } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/.test(chunkInfo.name)) {
              extType = 'fonts';
            }
            return `static/${extType}/[name]-[hash][extname]`;
          }
          return 'static/[ext]/[name]-[hash].[ext]';
        }
      },
      treeshake: true // 启用 tree shaking
    },
    terserOptions: {
      compress: {
        drop_console: VITE_ENV === 'production', // 生产环境移除 console
        drop_debugger: true, // 生产环境移除 debugger
        pure_funcs: ['console.log']
      },
      mangle: true, // 压缩混淆变量名
      keep_classnames: false, // 移除类名
      keep_fnames: false // 移除函数名
    }
  };
}
