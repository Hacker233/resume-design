/**
 *  Introduces component library styles on demand.
 * https://github.com/antfu/unplugin-vue-components
 */
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export function configAutoComponentsPlugin() {
  return Components({
    // 指定组件位置，默认是src/components
    // dirs: ['src/components'],
    // extensions: ['vue', 'tsx'],
    // 配置文件生成位置
    dts: 'src/components.d.ts',
    // 搜索子目录
    // deep: true,
    // 允许子目录作为组件的命名空间前缀。
    // directoryAsNamespace: false,
    // include:[],
    // ui库解析器
    resolvers: [
      ElementPlusResolver({
        // 关键：自动引入修改主题色添加这一行，使用预处理样式
        importStyle: 'sass'
      })
    ]
  });
}
