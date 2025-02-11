import { getPNGAsync, getResumePdfAsync } from '@/http/api/resume';
import appStore from '@/store';

// 辅助函数：创建并触发下载
const triggerDownload = (blob: any, fileName: any) => {
  const blobUrl = window.URL.createObjectURL(blob);
  const downloadElement = document.createElement('a');
  downloadElement.href = blobUrl;
  downloadElement.download = fileName;
  document.body.appendChild(downloadElement);
  downloadElement.click();
  document.body.removeChild(downloadElement);
  window.URL.revokeObjectURL(blobUrl);
};

// 辅助函数：通过iframe加载PDF
const loadPdfInIframe = (blob: any, fileName: any) => {
  const blobUrl = window.URL.createObjectURL(blob);
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = blobUrl;

  iframe.onload = () => {
    triggerDownload(blob, fileName);
    document.body.removeChild(iframe);
  };

  document.body.appendChild(iframe);
};

// 生成pdf方法
export const exportPdf = async (id?: string, height?: string) => {
  const { resumeJsonNewStore } = appStore.useResumeJsonNewStore;
  const fileName = resumeJsonNewStore.TITLE;
  const params = {
    url: `${location.origin}/pdfPreview?id=${id}&&height=${height}`,
    printBackground: true,
    timezone: '',
    margin: '',
    filename: '',
    format: 'A4',
    integralPayGoodsId: id
  };
  const pdfData = await getResumePdfAsync(params);
  if (pdfData.status) {
    ElMessage.error('网络过慢，请求超时，请重新尝试导出');
    return;
  } else {
    const blob = new Blob([pdfData], { type: 'application/pdf' });
    loadPdfInIframe(blob, `${fileName}.pdf`);
  }
};

// 生成PNG方法
export const exportPNG = async (id?: string, height?: string) => {
  const { resumeJsonNewStore } = appStore.useResumeJsonNewStore;
  const fileName = resumeJsonNewStore.TITLE;
  const params = {
    url: `${location.origin}/pdfPreview?id=${id}&&height=${height}`,
    format: 'A4',
    integralPayGoodsId: id
  };
  const pngData = await getPNGAsync(params);
  if (pngData.status) {
    ElMessage.error('网络过慢，请求超时，请重新尝试导出');
    return;
  } else {
    const blob = new Blob([pngData], { type: 'image/png' });
    triggerDownload(blob, `${fileName}.png`);
  }
};

export const getPdfUrl = (id?: string, height?: string) => {
  return `${location.origin}/pdfPreview?id=${id}&&height=${height}`;
};

// 改版后

// 生成pdf方法
export const exportPdfNew = async (id?: string) => {
  const { HJNewJsonStore } = appStore.useCreateTemplateStore;
  const fileName = HJNewJsonStore.config.title;
  const params = {
    url: `${location.origin}/resumePreview?type=page&id=${id}`,
    printBackground: true,
    timezone: '',
    margin: '',
    filename: '',
    format: 'A4',
    integralPayGoodsId: id
  };
  const pdfData = await getResumePdfAsync(params);
  if (pdfData.status) {
    ElMessage.error('网络过慢，请求超时，请重新尝试导出');
    return;
  } else {
    const blob = new Blob([pdfData], { type: 'application/pdf' });
    loadPdfInIframe(blob, `${fileName}.pdf`);
  }
};

// 生成PNG方法
export const exportPNGNew = async (id?: string) => {
  const { HJNewJsonStore } = appStore.useCreateTemplateStore;
  const fileName = HJNewJsonStore.config.title;
  const params = {
    url: `${location.origin}/resumePreview?type=page&id=${id}`,
    format: 'A4',
    integralPayGoodsId: id
  };
  const pngData = await getPNGAsync(params);
  if (pngData.status) {
    ElMessage.error('网络过慢，请求超时，请重新尝试导出');
    return;
  } else {
    const blob = new Blob([pngData], { type: 'image/png' });
    triggerDownload(blob, `${fileName}.png`);
  }
};
