import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import { configAutoImportPlugin } from './autoImport';
import { configAutoComponentsPlugin } from './autocomponents';
import { configCompressPlugin } from './compress';
import { configSvgIconsPlugin } from './svgIcons';
import OptimizationPersist from 'vite-plugin-optimize-persist';
import PkgConfig from 'vite-plugin-package-config';
import DefineOptions from 'unplugin-vue-define-options/vite';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import { createHtmlPlugin } from 'vite-plugin-html';
import { title, description, keywords } from './seo';

export const createVitePlugins = async (viteEnv: ViteEnv, isBuild: boolean) => {
  const { VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv;

  const vitePlugins: (Plugin | Plugin[])[] = [
    vue(), // have to
    configAutoComponentsPlugin(),
    configAutoImportPlugin(),
    configSvgIconsPlugin(),
    DefineOptions(),
    PkgConfig(),
    OptimizationPersist(),
    viteCommonjs(),
    createHtmlPlugin({
      inject: {
        data: {
          SEO_TITLE: title,
          SEO_DESCRIPTION: description,
          SEO_KEYWORDS: keywords
        }
      }
    })
  ];

  // 仅在生产环境使用的插件
  if (isBuild) {
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE)
    );
  }
  return vitePlugins;
};
