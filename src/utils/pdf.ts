import { getResumePdfAsync } from '@/http/api/resume';
import appStore from '@/store';

// 生成pdf方法
const exportPdf = async (token?: string, id?: string, height?: string) => {
  const { resumeJsonNewStore } = appStore.useResumeJsonNewStore;
  const fileName = resumeJsonNewStore.TITLE;
  const params = {
    url: `${location.origin}/pdfPreview?token=${token}&&id=${id}&&height=${height}`,
    printBackground: true,
    timezone: '',
    margin: '',
    filename: '',
    format: 'A4'
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

export default exportPdf;
