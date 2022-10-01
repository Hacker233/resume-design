import baiduHttp from '../baidu';

// 向百度提供url收录
export const postBaiDuZZAsync: any = (url: string) => {
  return baiduHttp.request({
    url: '/urls?site=91huajian.cn&token=etY3Cs6P6wfmaP3J',
    method: 'post',
    data: [url],
    headers: {
      'Content-Type': 'text/plain'
    }
  });
};
