import type { BuildOptions } from 'vite';

// 提取环境常量以提高可读性
const isProduction = process.env.VITE_ENV === 'production';
const isDev = !isProduction;

// 生成 Vite 的构建配置
export function createBuild(viteEnv: { VITE_ENV: string; VITE_OUTPUT_DIR: string }): BuildOptions {
  const { VITE_OUTPUT_DIR } = viteEnv;

  return {
    // 启用 SourceMap，仅在开发环境启用
    sourcemap: isDev,

    // 设置构建输出目录
    outDir: VITE_OUTPUT_DIR,

    // 启用 CSS 代码拆分
    cssCodeSplit: true,

    // 关闭报告压缩后文件的大小
    reportCompressedSize: false,

    // 设置构建目标为 esnext，支持现代浏览器
    target: 'esnext',

    // 根据环境设置不同的混淆器，生产环境使用 terser（体积更小），开发环境使用 esbuild（更快）
    minify: isProduction ? 'terser' : 'esbuild',

    // 设置小于此值的资源内联为 Base64
    assetsInlineLimit: 4096, // 默认值：4096

    // chunk 文件过大时，警告限制：5000KB
    chunkSizeWarningLimit: 5000, // 默认值：5000

    // 设置静态资源目录
    assetsDir: 'static',

    // Rollup 输出配置
    rollupOptions: {
      output: {
        // 手动拆分 vendor chunk，按包名划分
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.split('node_modules/')[1].split('/')[0]; // 按模块名分块
          }
        },
        // 设置输出文件名称（JS 文件）
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',

        // 动态设置资源文件（图片、字体等）的文件名
        assetFileNames: (chunkInfo) => {
          const extType = chunkInfo.name?.match(/\.(png|jpe?g|gif|svg)$/i)
            ? 'images'
            : chunkInfo.name?.match(/\.(woff2?|eot|ttf|otf)$/i)
            ? 'fonts'
            : chunkInfo.name?.match(/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i)
            ? 'media'
            : 'static'; // 默认为静态文件

          return `static/${extType}/[name]-[hash][extname]`;
        }
      },
      treeshake: true // 启用 tree shaking 优化
    },

    // 配置 Terser 优化，移除不必要的代码
    terserOptions: {
      compress: {
        drop_console: isProduction, // 生产环境移除 console
        drop_debugger: true, // 生产环境移除 debugger
        pure_funcs: ['console.log'] // 移除 console.log
      },
      mangle: true, // 启用混淆
      keep_classnames: false, // 移除类名
      keep_fnames: false // 移除函数名
    }
  };
}
