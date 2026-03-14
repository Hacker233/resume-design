import http from '@/http/request';

// 管理员分页查询所有导出记录
export const getExportRecordsAsync = async (params: any) => {
  return http.request({
    url: `/huajian/export-record/admin/list`,
    method: 'get',
    params
  });
};

// 个人用户查询自己的导出记录
export const getMyExportRecordsAsync = async (params: any) => {
  return http.request({
    url: `/huajian/export-record/by-email`,
    method: 'get',
    params
  });
};

// 管理员删除导出记录
export const deleteExportRecordAsync = async (id: string) => {
  return http.request({
    url: `/huajian/export-record/admin/delete/${id}`,
    method: 'delete'
  });
};