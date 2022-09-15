import http from '../request';

// 查询分类列表
export const getCategoryListAsync: any = () => {
  return http.request({
    url: '/huajian/common/getCategoryList',
    method: 'get'
  });
};
