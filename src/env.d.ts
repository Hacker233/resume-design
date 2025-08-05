/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare module 'marked' {
  interface MarkedOptions {
    highlight?: (code: string, language: string) => string;
  }
}
// 第三方库类型声明已迁移到types目录下的对应文件中

import type { DefineComponent } from 'vue';

declare global {
  const defineOptions: typeof DefineComponent;
}

declare module 'unplugin-vue-define-options';

declare interface Window {
  __PRERENDER_INJECTED?: boolean;
}
