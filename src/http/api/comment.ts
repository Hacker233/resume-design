import http from '../request';

// 插入一条评论
export const addCommentAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/comment/addComment',
    method: 'post',
    data
  });
};

// 查询评论列表
export const getCommentListAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/comment/getCommentList',
    method: 'get',
    params
  });
};
