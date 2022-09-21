import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import { configAutoImportPlugin } from './autoImport';
import { configAutoComponentsPlugin } from './autocomponents';
import { configCompressPlugin } from './compress';
import { configSvgIconsPlugin } from './svgIcons';
import OptimizationPersist from 'vite-plugin-optimize-persist';
import PkgConfig from 'vite-plugin-package-config';
import DefineOptions from 'unplugin-vue-define-options/vite';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv;

  const vitePlugins: (Plugin | Plugin[])[] = [
    // have to
    vue()
  ];

  // unplugin-vue-components
  vitePlugins.push(configAutoComponentsPlugin());

  // unplugin-auto-import
  vitePlugins.push(configAutoImportPlugin());

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin());

  // unplugin-vue-define-options
  vitePlugins.push(DefineOptions());

  vitePlugins.push(PkgConfig());

  vitePlugins.push(OptimizationPersist());

  // The following plugins only work in the production environment
  if (isBuild) {
    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE)
    );
  }
  return vitePlugins;
}
