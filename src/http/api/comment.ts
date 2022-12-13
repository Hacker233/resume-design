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
