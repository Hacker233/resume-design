// 设置打印样式,在这可以自定义打印出来的内容的样式
function getStyle() {
  const styleContent = `#print-container {
      display: none
    }
    @media print {
      body > :not(.print-container) {
          display: none
      }
      html,
      body {
          display: block !important;
      }
      #print-container {
          display: block;
          overflow:visible
      }
      @page {
        size: A4 portrait;
        margin: 0;
      }
    }`;
  const style = document.createElement('style');
  style.innerHTML = styleContent;
  return style;
}

// 清空打印内容
function cleanPrint() {
  const div = document.getElementById('print-container');
  if (div) {
    document.querySelector('body')?.removeChild(div);
  }
}

// 新建DOM，将需要打印的内容填充到DOM
function getContainer(html: string) {
  cleanPrint();
  const container = document.createElement('div');
  container.setAttribute('id', 'print-container');
  container.innerHTML = html;
  return container;
}

// 图片完全加载后再调用打印方法
function getLoadPromise(dom: HTMLDivElement) {
  let imgs: any = dom.querySelectorAll('img');
  imgs = [].slice.call(imgs);

  if (imgs.length === 0) {
    return Promise.resolve();
  }

  let finishedCount = 0;
  return new Promise((resolve) => {
    function check() {
      finishedCount += 1;
      if (finishedCount === imgs.length) {
        resolve(null);
      }
    }
    imgs.forEach(
      (img: { addEventListener: (arg0: string, arg1: { (): void; (): void }) => void }) => {
        img.addEventListener('load', check);
        img.addEventListener('error', check);
      }
    );
  });
}

export default function printHtml(html: string) {
  const style = getStyle();
  const container = getContainer(html);
  document.body.appendChild(style);
  document.body.appendChild(container);
  getLoadPromise(container).then(() => {
    window.print();
    document.body.removeChild(style);
    document.body.removeChild(container);
  });
}
