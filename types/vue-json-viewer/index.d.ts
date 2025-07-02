import type { DefineComponent } from 'vue';

declare module 'vue-json-viewer' {
  const JsonViewer: DefineComponent<any, any, any>;
  export default JsonViewer;
}
