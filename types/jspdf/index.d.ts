declare module 'jspdf' {
  class jsPDF {
    constructor(orientation?: string, unit?: string, format?: string | [number, number]);
    save(filename: string): void;
    addImage(
      imageData: string,
      format: string,
      x: number,
      y: number,
      width?: number,
      height?: number
    ): void;
    setTextColor(r: number, g: number, b: number): void;
    text(text: string, x: number, y: number): void;
    rect(x: number, y: number, width: number, height: number, style?: string): void;
    line(x1: number, y1: number, x2: number, y2: number): void;
    addPage(): void;
    output(type?: string): string;
  }
  export default jsPDF;
}
