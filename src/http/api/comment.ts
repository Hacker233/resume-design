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
    url: '/huajian/common/getCommentList',
    method: 'get',
    params
  });
};

// 点赞一条评论
export const liseCommentAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/comment/likeComment',
    method: 'post',
    data
  });
};

// 取消点赞一条评论
export const cancleLikeCommentAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/comment/cancleLikeComment',
    method: 'post',
    data
  });
};

// 删除一条评论
export const deleteOneCommentAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/comment/deleteOneComment',
    method: 'delete',
    data
  });
};

// 查询用户点赞ids
export const getUserLikeCommentIdsAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/userLikeComment/getUserLikeCommentIds',
    method: 'get',
    params
  });
};

// 管理员分页查询评论列表
export const getAllCommentPageAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/comment/getAllCommentPage',
    method: 'get',
    params
  });
};

// 管理员删除评论
export const deleteCommentByAdminAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/comment/deleteCommentByAdmin',
    method: 'delete',
    params
  });
};

// 管理员恢复一条评论
export const recoverCommentByAdminAsync: any = (data: any) => {
  return http.request({
    url: '/huajian/comment/recoverCommentByAdmin',
    method: 'post',
    data
  });
};

// 查询单个软件的评论数量
export const getSoftCommentCountAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/common/getSoftCommentCount',
    method: 'get',
    params
  });
};

// 用户查询个人评论列表
export const getPersonCommentPageAsync: any = (params: any) => {
  return http.request({
    url: '/huajian/comment/getPersonCommentPage',
    method: 'get',
    params
  });
};
