export const fileToDataURL = (file: Blob): Promise<any> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = (e) => resolve((e.target as FileReader).result);
    reader.readAsDataURL(file);
  });
};
export const dataURLToImage = (dataURL: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = dataURL;
  });
};
export const canvastoFile = (
  canvas: HTMLCanvasElement,
  type: string,
  quality: number
): Promise<Blob | null> => {
  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), type, quality));
};
/**
 * 图片压缩方法
 * @param {Object}  file 图片文件
 * @param {String} type 想压缩成的文件类型
 * @param {Nubmber} quality 压缩质量参数
 * @returns 压缩后的新图片
 */
export const compressionFile = async (file: any, type = 'image/jpeg', quality = 0.5) => {
  const fileName = file.name;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  const base64 = await fileToDataURL(file);
  const img = await dataURLToImage(base64);
  canvas.width = img.width;
  canvas.height = img.height;
  context.clearRect(0, 0, img.width, img.height);
  context.drawImage(img, 0, 0, img.width, img.height);
  const blob = (await canvastoFile(canvas, type, quality)) as Blob;
  const newFile = await new File([blob], fileName, {
    type: type
  });
  return newFile;
};
