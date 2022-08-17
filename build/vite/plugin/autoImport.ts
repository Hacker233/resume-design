/**
 *  Introduces component library styles on demand.
 * https://github.com/antfu/unplugin-auto-import
 */
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export function configAutoImportPlugin() {
  return AutoImport({
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/, // .vue
      /\.md$/ // .md
    ],
    imports: ['vue', 'vue-router', '@vueuse/core'],
    // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
    dts: 'src/auto-import.d.ts',
    // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
    // 生成全局声明文件，给eslint用
    eslintrc: {
      enabled: true, // Default `false`
      filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
      globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
    },
    resolvers: [
      ElementPlusResolver({
        // 关键：自动引入修改主题色添加这一行，使用预处理样式，不添加将会导致使用ElMessage，ElNotification等组件时默认的主题色会覆盖自定义的主题色
        importStyle: 'sass'
      })
    ]
  });
}
