import type { DefineComponent } from 'vue';

declare module 'colorpicker-v3' {
  const ColorPicker: DefineComponent<any, any, any>;
  export default ColorPicker;
}
