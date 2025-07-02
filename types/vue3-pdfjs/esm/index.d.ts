import type { DefineComponent } from 'vue';

declare module 'vue3-pdfjs/esm' {
  const PDFViewer: DefineComponent<any, any, any>;
  export default PDFViewer;
}
