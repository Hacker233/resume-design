import type { DefineComponent } from 'vue';

declare module 'v-contextmenu' {
  const VContextmenu: DefineComponent<any, any, any>;
  export default VContextmenu;
}
