<template>
  <!-- 查询表单 -->
  <el-form :inline="true" :model="formInline" class="demo-form-inline" size="default">
    <el-form-item label="用户邮箱">
      <el-input v-model="formInline.email" placeholder="用户邮箱" />
    </el-form-item>
    <el-form-item label="导出类型">
      <el-select v-model="formInline.type" placeholder="导出类型">
        <el-option label="PDF" value="pdf" />
        <el-option label="图片" value="image" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
  <el-table class="template-list-table" :data="tableData" style="width: 100%" size="default" border>
    <el-table-column prop="email" label="用户邮箱" />
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
    <el-table-column label="操作" width="160">
      <template #default="scope">
        <el-button v-if="!scope.row.isExpired" type="success" size="small" @click="downloadFile(scope.row)"
          style="margin-right: 8px;">
          <svg-icon icon-name="icon-xiazai-wenjianxiazai-01" size="14px" color="#fff"></svg-icon>
          下载
        </el-button>
        <span v-else class="expired-text">已过期</span>
        <el-button link type="primary" size="small" @click="deleteExportRecord(scope.row)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页组件 -->
  <Pagination :total="total" :limit="limit" is-page-sizes :current-page="currentPage"
    @handle-current-change="handleCurrentChange" @handle-size-change="handleSizeChange"></Pagination>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import 'element-plus/es/components/message-box/style/index';
import 'element-plus/es/components/message/style/index';
import Pagination from '@/components/Pagination/pagination.vue';
import { formatListDate } from '@/utils/common';
import { getExportRecordsAsync, deleteExportRecordAsync, checkFileExistsAsync } from '@/http/api/exportRecord';

// 表单查询
const formInline = reactive({
  email: '',
  type: ''
});

// 查询
const onSubmit = () => {
  page.value = 1;
  currentPage.value = 1;
  getExportRecords();
};
// 重置
const resetForm = () => {
  formInline.email = '';
  formInline.type = '';
  page.value = 1;
  currentPage.value = 1;
  getExportRecords();
};

// 查询导出记录列表
let tableData = ref<any>([]);
const page = ref<number>(1);
const limit = ref<number>(10);
const total = ref<number>(0);
const currentPage = ref<number>(1);
const getExportRecords = async () => {
  let params = {
    page: page.value,
    limit: limit.value,
    email: formInline.email,
    type: formInline.type
  };
  const data = await getExportRecordsAsync(params);
  if (data.data.status === 200) {
    tableData.value = data.data.data.list;
    total.value = data.data.data.page.count;
    currentPage.value = data.data.data.page.currentPage;
  } else {
    ElMessage.error(data.data.message);
  }
};
getExportRecords();

// 下载文件
const downloadFile = async (item: any) => {
  if (item.fileUrl) {
    try {
      // 检查文件是否存在
      const checkResult = await checkFileExistsAsync(item.fileUrl);
      if (checkResult.data.status === 200 && checkResult.data.data.exists) {
        window.open(item.fileUrl, '_blank');
      } else {
        ElMessage.error('文件已不存在');
        // 刷新列表，以便更新状态
        getExportRecords();
      }
    } catch (error) {
      ElMessage.error('文件已不存在');
      // 刷新列表，以便更新状态
      getExportRecords();
    }
  } else {
    ElMessage.error('文件URL不存在');
  }
};

// 删除导出记录
const deleteExportRecord = (row: any) => {
  ElMessageBox.confirm('删除该导出记录后，文件也将被删除，确定继续？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      const data = await deleteExportRecordAsync(row._id);
      if (data.data.status === 200) {
        ElMessage.success('删除成功');
        getExportRecords();
      } else {
        ElMessage.error(data.data.message);
      }
    })
    .catch(() => { });
};

// 改变页码时
const handleCurrentChange = (currentPage: number) => {
  page.value = currentPage;
  getExportRecords();
};

// 改变每页数量时
const handleSizeChange = (size: number) => {
  limit.value = size;
  page.value = 1;
  currentPage.value = 1;
  getExportRecords();
};
</script>
<style lang="scss" scoped>
.demo-form-inline {
  margin-bottom: 20px;
}

.expired-text {
  color: #909399;
  font-size: 12px;
  margin-right: 8px;
}
</style>
