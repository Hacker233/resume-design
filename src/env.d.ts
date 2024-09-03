/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare module 'jspdf';
declare module 'colorpicker-v3';
declare module 'vue3-pdfjs/esm';
declare module 'vue3-print-nb';
declare module 'v-contextmenu';
declare module 'vue-json-viewer';
declare module 'json-editor-vue3';
declare module 'vue-smooth-dnd';
