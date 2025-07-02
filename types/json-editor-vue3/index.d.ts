import type { DefineComponent } from 'vue';

declare module 'json-editor-vue3' {
  const JsonEditor: DefineComponent<{}, {}, any>;
  export default JsonEditor;
}
