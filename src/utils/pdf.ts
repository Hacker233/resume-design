import { getPNGAsync, getPreviewPdfAsync, getResumePdfAsync } from '@/http/api/resume';
import appStore from '@/store';

import { saveAs } from 'file-saver'; // 引入 file-saver 库

// 辅助函数：创建并触发下载
const triggerDownload = (blob: any, fileName: any) => {
  // 使用 file-saver 的 saveAs 方法来触发下载
  saveAs(blob, fileName);
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

  ElMessage.info('正在生成PDF，请稍等...'); // 提示用户生成中

  const pdfData = await getResumePdfAsync(params);
  if (pdfData.status) {
    ElMessage.error('网络过慢，请求超时，请重新尝试导出');
    return;
  } else {
    const blob = new Blob([pdfData], { type: 'application/pdf' });
    triggerDownload(blob, `${fileName}.pdf`);
    ElMessage.success('下载完成！');
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

// 改版后生成pdf方法
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
    triggerDownload(blob, `${fileName}.pdf`);
  }
};

// 改版后生成PNG方法
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

// 返回预览PDF
export const exportPdfPreview = (id?: string) => {
  return new Promise(async (resolve) => {
    const params = {
      url: `${location.origin}/resumePreview?type=page&id=${id}`,
      printBackground: true,
      timezone: '',
      margin: '',
      filename: '',
      format: 'A4',
      integralPayGoodsId: id
    };

    const { blob, pageCount } = await getPreviewPdfAsync(params);
    if (!blob) {
      ElMessage.error('网络过慢，请求超时，请重新尝试导出');
      resolve(null);
      return;
    } else {
      resolve({ blob, pageCount });
      return { blob, pageCount };
    }
  });
};
