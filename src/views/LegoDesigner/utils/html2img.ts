import html2canvas from 'html2canvas';

const getImgBase64URL = (el: any): Promise<string> => {
  // html2canvas(el, {
  //   width: el.clientWidth, //dom 原始宽度
  //   height: el.clientHeight,
  //   allowTaint: true, //允许污染
  //   taintTest: true, //在渲染前测试图片
  //   // useCORS: true, //开启跨域配置，但和allowTaint不能共存
  // }.then((img: any) => {})
  return new Promise((resolve, reject) => {
    html2canvas(el, {
      useCORS: true,
      scale: 0.6
    })
      .then((canvas) => {
        const dataURL = canvas.toDataURL('image/jpeg', 0.1);
        resolve(dataURL);
      })
      .catch(() => {
        reject('');
      });
  });
};

export { getImgBase64URL };
