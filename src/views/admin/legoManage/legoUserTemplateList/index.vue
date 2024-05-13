<template>
  <!-- 查询表单 -->
  <el-form :inline="true" :model="formInline" class="demo-form-inline" size="default">
    <el-form-item label="用户邮箱">
      <el-input v-model="formInline.email" placeholder="用户邮箱" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
  <el-table
    class="lego-user-template-list-table"
    :data="tableData"
    style="width: 100%"
    size="default"
    border
  >
    <el-table-column prop="_id" label="id" />
    <el-table-column prop="email" label="用户邮箱" />
    <el-table-column prop="category" label="分类" />
    <el-table-column prop="username" label="用户昵称" />
    <el-table-column prop="previewUrl" label="快照">
      <template #default="scope">
        <img v-viewer class="preview-img" :src="scope.row.previewUrl" alt="" srcset="" />
      </template>
    </el-table-column>
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
        <el-button link size="small" @click="toPreview(scope.row)">预览</el-button>
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
    is-page-sizes
    :current-page="currentPage"
    @handle-current-change="handleCurrentChange"
    @handle-size-change="handleSizeChange"
  ></Pagination>

  <!-- 预览弹窗 -->
  <preview-image v-if="dialogPreviewVisible" @close="closePreview">
    <render-page></render-page>
  </preview-image>
</template>
<script lang="ts" setup>
  import { formatListDate } from '@/utils/common';
  import Pagination from '@/components/Pagination/pagination.vue';
  import { ElMessageBox } from 'element-plus';
  import 'element-plus/es/components/message-box/style/index';
  import {
    deleteLegoUserResumeByAdminAsync,
    legoUserResumeListByAdminAsync
  } from '@/http/api/lego';
  import PreviewImage from '@/views/LegoDesigner/render/PreviewImage/PreviewImage.vue';
  import RenderPage from '@/views/LegoDesigner/render/index.vue';
  import appStore from '@/store';

  // 表单查询
  const formInline = reactive({
    email: ''
  });

  // 查询
  const onSubmit = () => {
    page.value = 1;
    currentPage.value = 1;
    getAllUserLegoTemplateList();
  };
  // 重置
  const resetForm = () => {
    formInline.email = '';
    page.value = 1;
    currentPage.value = 1;
    getAllUserLegoTemplateList();
  };

  // 查询用户创作列表
  let tableData = ref<any>([]);
  const page = ref<number>(1);
  const limit = ref<number>(10);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const getAllUserLegoTemplateList = async () => {
    let params = {
      page: page.value,
      limit: limit.value,
      email: formInline.email
    };
    const data = await legoUserResumeListByAdminAsync(params);
    if (data.data.status === 200) {
      tableData.value = data.data.data.list;
      total.value = data.data.data.page.count;
      currentPage.value = data.data.data.page.currentPage;
      console.log('tableData', tableData);
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getAllUserLegoTemplateList();

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    getAllUserLegoTemplateList();
  };

  // 改变每页数量
  const handleSizeChange = (pageSize: number) => {
    limit.value = pageSize;
    console.log('改变每页数量', pageSize);
    getAllUserLegoTemplateList();
  };

  // 删除简历
  const deleteResume = async (item: any) => {
    ElMessageBox.confirm('删除该创作后将无法恢复，确定继续？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        let params = {
          email: item.email,
          id: item._id
        };
        const data = await deleteLegoUserResumeByAdminAsync(params);
        if (data.data.status === 200) {
          ElMessage.success('删除成功');
          getAllUserLegoTemplateList();
        } else {
          ElMessage.error(data.data.message);
        }
      })
      .catch(() => {});
  };

  // 预览
  const { changeHJSchemaJsonData } = appStore.useLegoJsonStore;
  const dialogPreviewVisible = ref<boolean>(false);
  const toPreview = (row: any) => {
    console.log('row', row);
    changeHJSchemaJsonData(row.lego_json);
    dialogPreviewVisible.value = true;
  };

  // 关闭预览弹窗
  const closePreview = () => {
    dialogPreviewVisible.value = false;
  };
</script>
<style lang="scss" scoped>
  .lego-user-template-list-table {
    .preview-img {
      max-width: 100px;
      max-height: 100px;
      cursor: pointer;
    }
  }
  .demo-form-inline {
    margin-bottom: 20px;
  }
</style>
