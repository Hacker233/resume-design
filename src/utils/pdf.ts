import { getPNGAsync, getResumePdfAsync } from '@/http/api/resume';
import appStore from '@/store';

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
    const downloadElement = document.createElement('a');
    const href = window.URL.createObjectURL(blob); //创建下载的链接
    downloadElement.href = href;
    downloadElement.download = `${fileName}.pdf`; //下载后的文件名，根据需求定义
    document.body.appendChild(downloadElement);
    downloadElement.click(); //点击下载
    document.body.removeChild(downloadElement); //下载完成移除元素
    window.URL.revokeObjectURL(href); //释放掉blob对象
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
  const pdfData = await getPNGAsync(params);
  if (pdfData.status) {
    ElMessage.error('网络过慢，请求超时，请重新尝试导出');
    return;
  } else {
    const blob = new Blob([pdfData], { type: 'application/image' });
    const downloadElement = document.createElement('a');
    const href = window.URL.createObjectURL(blob); //创建下载的链接
    downloadElement.href = href;
    downloadElement.download = `${fileName}.png`; //下载后的文件名，根据需求定义
    document.body.appendChild(downloadElement);
    downloadElement.click(); //点击下载
    document.body.removeChild(downloadElement); //下载完成移除元素
    window.URL.revokeObjectURL(href); //释放掉blob对象
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
    const downloadElement = document.createElement('a');
    const href = window.URL.createObjectURL(blob); //创建下载的链接
    downloadElement.href = href;
    downloadElement.download = `${fileName}.pdf`; //下载后的文件名，根据需求定义
    document.body.appendChild(downloadElement);
    downloadElement.click(); //点击下载
    document.body.removeChild(downloadElement); //下载完成移除元素
    window.URL.revokeObjectURL(href); //释放掉blob对象
  }
};

// 生成PNG方法
export const exportPNGNew = async (id?: string) => {
  const { HJNewJsonStore } = appStore.useCreateTemplateStore;
  const fileName = HJNewJsonStore.config.title;
  const params = {
    url: `${location.origin}/pdfPreview?type=page&id=${id}`,
    format: 'A4',
    integralPayGoodsId: id
  };
  const pdfData = await getPNGAsync(params);
  if (pdfData.status) {
    ElMessage.error('网络过慢，请求超时，请重新尝试导出');
    return;
  } else {
    const blob = new Blob([pdfData], { type: 'application/image' });
    const downloadElement = document.createElement('a');
    const href = window.URL.createObjectURL(blob); //创建下载的链接
    downloadElement.href = href;
    downloadElement.download = `${fileName}.png`; //下载后的文件名，根据需求定义
    document.body.appendChild(downloadElement);
    downloadElement.click(); //点击下载
    document.body.removeChild(downloadElement); //下载完成移除元素
    window.URL.revokeObjectURL(href); //释放掉blob对象
  }
};
