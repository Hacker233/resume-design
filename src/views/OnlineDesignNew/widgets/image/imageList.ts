export const imageList = [
  {
    title: '上传控件',
    imgUrl: '',
    width: 200,
    height: 300
  },
  {
    title: '背景图',
    imgUrl: 'private_bgc.jpg',
    width: 300,
    height: 200
  },
  {
    title: '背景图',
    imgUrl: 'template3_bg_1.png',
    width: 300,
    height: 100
  },
  {
    title: '背景图',
    imgUrl: 'person-bgc.jpg',
    width: 570,
    height: 200
  },
  {
    title: '背景图',
    imgUrl: 'sponsor.png',
    width: 400,
    height: 380
  },
  {
    title: '背景图',
    imgUrl: 'index.png',
    width: 450,
    height: 300
  },
  {
    title: '背景图',
    imgUrl: 'j2_head.png',
    width: 450,
    height: 300
  }
];

// 获取列表静态资源
export const getImgListStyleImageFile = (url: string) => {
  const isOnlineUrl = url.includes('https://');
  if (isOnlineUrl) {
    return url;
  } else {
    return new URL(`./imgs/${url}`, import.meta.url).href;
  }
};
