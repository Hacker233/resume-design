<template>
  <!-- 提示信息 -->
  <el-alert
    title="导出文件保留说明"
    type="info"
    :closable="false"
    show-icon
  >
    <template #default>
      <span>导出的文件将在生成后</span>
      <el-tag type="warning" size="small" style="margin: 0 8px;">7天</el-tag>
      <span>内有效，过期后文件将被自动删除</span>
    </template>
  </el-alert>
  
  <el-table class="template-list-table" :data="tableData" style="width: 100%" size="default" border>
    <el-table-column prop="type" label="导出类型">
      <template #default="scope">
        <el-tag :type="scope.row.type === 'pdf' ? 'primary' : 'success'">
          {{ scope.row.type === 'pdf' ? 'PDF' : '图片' }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="expiresAt" label="过期时间" width="180" :show-overflow-tooltip="true">
      <template #default="scope">
        {{ formatListDate(scope.row.expiresAt) }}
      </template>
    </el-table-column>
    <el-table-column prop="isExpired" label="是否过期">
      <template #default="scope">
        <el-tag :type="scope.row.isExpired ? 'danger' : 'success'">
          {{ scope.row.isExpired ? '是' : '否' }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="createDate" label="创建日期" width="180" :show-overflow-tooltip="true">
      <template #default="scope">
        {{ formatListDate(scope.row.createDate) }}
      </template>
    </el-table-column>
    <el-table-column label="操作" width="100">
      <template #default="scope">
        <el-button v-if="!scope.row.isExpired" type="success" size="small" @click="downloadFile(scope.row)" style="margin-right: 8px;">
          <svg-icon icon-name="icon-xiazai-wenjianxiazai-01" size="14px" color="#fff"></svg-icon>
          下载
        </el-button>
        <span v-else class="expired-text">已过期</span>
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页组件 -->
  <Pagination
    :total="total"
    :limit="limit"
    is-page-sizes
    :current-page="currentPage"
    @handle-current-change="handleCurrentChange"
    @handle-size-change="handleSizeChange"
  ></Pagination>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { ElMessage } from 'element-plus';
  import 'element-plus/es/components/message/style/index';
  import Pagination from '@/components/Pagination/pagination.vue';
  import { formatListDate } from '@/utils/common';
  import { getMyExportRecordsAsync } from '@/http/api/exportRecord';

  // 查询导出记录列表
  let tableData = ref<any>([]);
  const page = ref<number>(1);
  const limit = ref<number>(10);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const getExportRecords = async () => {
    let params = {
      page: page.value,
      limit: limit.value
    };
    const data = await getMyExportRecordsAsync(params);
    if (data.data.status === 200) {
      tableData.value = data.data.data.list;
      total.value = data.data.data.page.count;
      currentPage.value = data.data.data.page.currentPage;
    } else {
      ElMessage.error(data.data.message);
    }
  };

  // 页面挂载时获取数据
  onMounted(() => {
    getExportRecords();
  });

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    getExportRecords();
  };

  // 改变每页数量
  const handleSizeChange = (pageSize: number) => {
    limit.value = pageSize;
    getExportRecords();
  };

  // 下载文件
  const downloadFile = (item: any) => {
    if (item.fileUrl) {
      window.open(item.fileUrl, '_blank');
    } else {
      ElMessage.error('文件URL不存在');
    }
  };
</script>
<style lang="scss">
  .el-alert {
    margin-bottom: 20px;
  }
  
  .demo-form-inline {
    margin-bottom: 20px;
  }
  
  .expired-text {
    color: #909399;
    font-size: 12px;
  }
</style>