<template>
  <!-- 查询表单 -->
  <el-form :inline="true" :model="formInline" class="demo-form-inline" size="default">
    <el-form-item label="用户邮箱">
      <el-input v-model="formInline.EMAIL" placeholder="用户邮箱" />
    </el-form-item>
    <el-form-item label="简历ID">
      <el-input v-model="formInline.ID" placeholder="简历模板ID" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
  <el-table class="template-list-table" :data="tableData" style="width: 100%" size="default" border>
    <el-table-column prop="ID" label="简历模板ID" />
    <el-table-column prop="EMAIL" label="用户邮箱" />
    <el-table-column prop="TITLE" label="简历标题" />
    <el-table-column prop="USER" label="用户昵称" />
    <el-table-column prop="CATEGORY" label="简历分类" />
    <el-table-column prop="createDate" label="创建日期">
      <template #default="scope">
        <div>
          {{ formatListDate(scope.row.createDate) }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="updateDate" label="更新日期">
      <template #default="scope">
        <div>
          {{ formatListDate(scope.row.updateDate) }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="140">
      <template #default="scope">
        <el-button link size="small" @click="preview(scope.row)">预览</el-button>
        <el-button link type="primary" size="small" @click="deleteResume(scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页组件 -->
  <Pagination
    :total="total"
    :limit="limit"
    :current-page="currentPage"
    @handle-current-change="handleCurrentChange"
  ></Pagination>

  <!-- 预览弹窗 -->
  <resume-preview-dialog
    v-if="dialogVisible"
    :dialog-visible="dialogVisible"
    :row="row"
    @cancle="cancle"
  ></resume-preview-dialog>
</template>
<script lang="ts" setup>
  import { deleteUserResumeByAdminAsync, getAllUserResumeListAsync } from '@/http/api/userResume';
  import { formatListDate } from '@/utils/common';
  import ResumePreviewDialog from './components/ResumePreviewDialog.vue';
  import Pagination from '@/components/Pagination/pagination.vue';
  import { ElMessageBox } from 'element-plus';
  import 'element-plus/es/components/message-box/style/index';

  // 表单查询
  const formInline = reactive({
    EMAIL: '',
    ID: ''
  });

  // 查询
  const onSubmit = () => {
    page.value = 1;
    currentPage.value = 1;
    getAllUserResumeList();
  };
  // 重置
  const resetForm = () => {
    formInline.EMAIL = '';
    formInline.ID = '';
    page.value = 1;
    currentPage.value = 1;
    getAllUserResumeList();
  };

  // 查询用户简历列表
  let tableData = ref<any>([]);
  const page = ref<number>(1);
  const limit = ref<number>(15);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const getAllUserResumeList = async () => {
    let params = {
      page: page.value,
      limit: limit.value,
      EMAIL: formInline.EMAIL,
      ID: formInline.ID
    };
    const data = await getAllUserResumeListAsync(params);
    if (data.data.status === 200) {
      tableData.value = data.data.data.list;
      total.value = data.data.data.page.count;
      currentPage.value = data.data.data.page.currentPage;
      console.log('tableData', tableData);
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getAllUserResumeList();

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    getAllUserResumeList();
  };

  // 删除简历
  const deleteResume = async (item: any) => {
    ElMessageBox.confirm('删除该简历后将无法恢复，确定继续？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        let params = {
          EMAIL: item.EMAIL,
          ID: item.ID
        };
        const data = await deleteUserResumeByAdminAsync(params);
        if (data.data.status === 200) {
          ElMessage.success('删除成功');
          getAllUserResumeList();
        } else {
          ElMessage.error(data.data.message);
        }
      })
      .catch(() => {});
  };

  // 预览简历
  const dialogVisible = ref<boolean>(false);
  const row = ref<any>(null);
  const preview = (item: any) => {
    row.value = item;
    dialogVisible.value = true;
  };

  // 关闭预览弹窗
  const cancle = () => {
    dialogVisible.value = false;
  };
</script>
<style lang="scss">
  .demo-form-inline {
    margin-bottom: 20px;
  }
</style>
