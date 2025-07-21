<template>
  <!-- 新增 -->
  <div class="top-box">
    <!-- 查询表单 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="default">
      <el-form-item label="用户邮箱：">
        <el-input v-model="formInline.email" placeholder="用户邮箱" />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="formInline.createDate"
          type="date"
          placeholder="请选择日期"
          size="default"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
  <el-table class="template-list-table" :data="tableData" style="width: 100%" size="default" border>
    <el-table-column prop="user_email" label="用户邮箱" />
    <el-table-column prop="template_id" label="模版id" />
    <el-table-column prop="resume_title" label="简历标题" />
    <el-table-column prop="template_cover" label="封面预览">
      <template #default="scope">
        <img v-viewer class="preview-img" :src="scope.row.template_cover" alt="" srcset="" />
      </template>
    </el-table-column>
    <!-- 所属组织 -->
    <el-table-column prop="organization" label="所属组织">
      <template #default="scope">
        <el-tag v-if="scope.row.organization" type="info">{{ scope.row.organization }}</el-tag>
        <span v-else>-</span>
      </template>
    </el-table-column>
    <el-table-column prop="createDate" label="创建日期">
      <template #default="scope">
        <div>
          {{ moment(new Date(scope.row.createDate)).format('YYYY-MM-DD HH:mm:ss') }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="updateDate" label="更新日期">
      <template #default="scope">
        <div>
          {{ moment(new Date(scope.row.updateDate)).format('YYYY-MM-DD HH:mm:ss') }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="150">
      <template #default="scope">
        <el-button link size="small" @click="openJsonDrawer(scope.row)">JSON</el-button>
        <el-button link size="small" @click="previewResume(scope.row)">预览</el-button>
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

  <!-- 预览窗口 -->
  <PreviewImage v-if="dialogPreviewVisible" @close="closePreview">
    <resume-preview :show-line="true"></resume-preview>
  </PreviewImage>

  <!-- 查看JSON抽屉 -->
  <view-json-drawer :json="json" :drawer="jsonDrawer" @close-json-drawer="closeJsonDrawer">
  </view-json-drawer>
</template>

<script lang="ts" setup>
  import moment from 'moment';
  import Pagination from '@/components/Pagination/pagination.vue';
  import 'element-plus/es/components/message-box/style/index';
  import { getOrgUserResumeListAsync } from '@/http/api/createTemplate';
  import ResumePreview from '@/views/createTemplate/previewer/index.vue';
  import { storeToRefs } from 'pinia';
  import appStore from '@/store';
  import ViewJsonDrawer from './components/ViewJsonDrawer.vue';

  // 表单查询
  const formInline = reactive({
    email: '',
    createDate: ''
  });

  let tableData = ref<any>([]);

  // 查询用户简历列表
  const page = ref<number>(1);
  const limit = ref<number>(10);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const getTemplateList = async () => {
    let params = {
      page: page.value,
      limit: limit.value,
      email: formInline.email,
      createDate: formInline.createDate
    };
    const data = await getOrgUserResumeListAsync(params);
    if (data.data.status === 200) {
      tableData.value = data.data.data.list;
      total.value = data.data.data.page.count;
      currentPage.value = data.data.data.page.currentPage;
      console.log('tableData', tableData);
      tableData.value = tableData.value.map((item: any) => {
        return {
          ...item,
          resume_title: item.template_json.config.title
        };
      });
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getTemplateList();

  // 查询
  const onSubmit = () => {
    page.value = 1;
    currentPage.value = 1;
    getTemplateList();
  };

  // 重置
  const resetForm = () => {
    formInline.email = '';
    formInline.createDate = '';
    page.value = 1;
    currentPage.value = 1;
    getTemplateList();
  };

  // 预览简历
  const dialogPreviewVisible = ref<boolean>(false);
  const { HJNewJsonStore } = storeToRefs(appStore.useCreateTemplateStore);
  const previewResume = (row: any) => {
    HJNewJsonStore.value = row.template_json;
    dialogPreviewVisible.value = true;
  };

  // 查看JSON数据
  const jsonDrawer = ref<boolean>(false);
  const json = ref<any>(null);
  const openJsonDrawer = (row: any) => {
    jsonDrawer.value = true;
    json.value = row.template_json;
  };

  // 关闭JSON抽屉
  const closeJsonDrawer = () => {
    jsonDrawer.value = false;
    json.value = null;
  };

  // 关闭预览弹窗
  const closePreview = () => {
    dialogPreviewVisible.value = false;
  };

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    getTemplateList();
  };

  // 改变每页数量
  const handleSizeChange = (pageSize: number) => {
    limit.value = pageSize;
    console.log('改变每页数量', pageSize);
    getTemplateList();
  };
</script>
<style lang="scss" scoped>
  .template-list-table {
    .preview-img {
      max-width: 100px;
      cursor: pointer;
    }
  }
  .top-box {
    margin-bottom: 20px;
  }
</style>
