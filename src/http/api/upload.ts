import http from '../request';

// 多个文件一次上传
export const filesUploadAsync: any = (data: any, path: string) => {
  return http.request({
    url: `/huajian/upload/filesUpload/${path}`,
    method: 'post',
    data: data
  });
};
