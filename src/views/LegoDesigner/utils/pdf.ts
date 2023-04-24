import { getLegoPNGAsync, getLegoResumePdfAsync } from '@/http/api/lego';
import appStore from '@/store';

// 生成pdf方法
export const exportLegoPdf = async (token?: string, id?: string) => {
  const { HJSchemaJsonStore } = appStore.useLegoJsonStore;
  const fileName = HJSchemaJsonStore.config.title;
  const params = {
    url: `${location.origin}/legoPrintPdfPreview?token=${token}&&id=${id}`,
    printBackground: true,
    timezone: '',
    margin: '',
    filename: '',
    width: HJSchemaJsonStore.css.width + 'px',
    height: HJSchemaJsonStore.css.height + 'px',
    integralPayGoodsId: id
  };
  const pdfData = await getLegoResumePdfAsync(params);
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
export const exportLegoPNG = async (token?: string, id?: string) => {
  const { HJSchemaJsonStore } = appStore.useLegoJsonStore;
  const fileName = HJSchemaJsonStore.config.title;
  const params = {
    url: `${location.origin}/legoPrintPdfPreview?token=${token}&&id=${id}`,
    selector: '#lego-preview-designer',
    integralPayGoodsId: id
  };
  const pdfData = await getLegoPNGAsync(params);
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

export const getLegoPdfUrl = (token?: string, id?: string) => {
  return `${location.origin}/legoPrintPdfPreview?token=${token}&&id=${id}`;
};
