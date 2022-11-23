import smallpigHttp from '../smallpig';

// 查询软件分类
export const querySocategoryAllAsync: any = () => {
  return smallpigHttp.request({
    url: '/api/source/querySocategoryAll',
    method: 'get'
  });
};

// 查询软件列表
export const getSoftListAsync: any = (params: any) => {
  return smallpigHttp.request({
    url: '/api/source/querySourceByCategory',
    method: 'get',
    params: params
  });
};

// 根据软件id查询详细信息
export const getySoftInfoByIdAsync: any = (params: any) => {
  return smallpigHttp.request({
    url: '/api/source/querySourceById',
    method: 'get',
    params: params
  });
};
