<template>
  <!-- 新增 -->
  <div class="top-box">
    <el-button type="primary" size="default" @click="createTemplate"> 创建模版 </el-button>
  </div>
  <el-table class="template-list-table" :data="tableData" style="width: 100%" size="default" border>
    <el-table-column prop="_id" label="模板id" />
    <el-table-column prop="template_title" label="模板名称" />
    <el-table-column prop="template_style" label="模板风格">
      <template #default="scope">
        <span>{{ scope.row.template_style || '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="template_use" label="模板用途">
      <template #default="scope">
        <span>{{ scope.row.template_use || '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="template_industry" label="所属行业">
      <template #default="scope">
        <span>{{ scope.row.template_industry || '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="template_post" label="所属岗位">
      <template #default="scope">
        <span>{{ scope.row.template_post || '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="template_cover" label="封面预览">
      <template #default="scope">
        <img v-viewer class="preview-img" :src="scope.row.template_cover" alt="" srcset="" />
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
    <el-table-column prop="template_status" label="审核状态">
      <template #default="scope">
        <div>
          <el-tag v-if="scope.row.template_status == 1" type="success">已同意</el-tag>
          <el-tag v-else-if="scope.row.template_status == 2" type="error">拒绝</el-tag>
          <el-tag v-else-if="scope.row.template_status == 3" type="info">待审核</el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="270">
      <template #default="scope">
        <el-button link size="small" @click="edit(scope.row)">编辑</el-button>
        <el-button link size="small" @click="audit(scope.row)">审核</el-button>
        <el-button link type="primary" size="small" @click="deleteTemplate(scope.row)"
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

  <!-- 审核弹窗 -->
  <audit-dialog-vue
    :dialog-audit-visible="dialogAuditVisible"
    :row="row"
    @cancle="cancleAudit"
    @update-success="updateAuditSuccess"
  ></audit-dialog-vue>
</template>

<script lang="ts" setup>
  import moment from 'moment';
  import Pagination from '@/components/Pagination/pagination.vue';
  import AuditDialogVue from './components/AuditDialog.vue';
  import { ElMessageBox } from 'element-plus';
  import 'element-plus/es/components/message-box/style/index';
  import { deleteTemplateAsync, templateListAsync } from '@/http/api/createTemplate';
  let tableData = ref<any>([]);

  // 获取模板列表
  const page = ref<number>(1);
  const limit = ref<number>(10);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const getTemplateList = async () => {
    let params = {
      page: page.value,
      limit: limit.value
    };
    const data = await templateListAsync(params);
    if (data.status === 200) {
      tableData.value = data.data.list;
      total.value = data.data.page.count;
      currentPage.value = data.data.page.currentPage;
      console.log('tableData', tableData);
    } else {
      ElMessage.error(data.message);
    }
  };
  getTemplateList();

  // 跳转编辑页面
  const router = useRouter();
  const edit = (rowData: any) => {
    router.push({
      path: '/createTemplate',
      query: {
        id: rowData._id,
        type: 'create'
      }
    });
  };

  // 跳转创建模版页面
  const createTemplate = () => {
    router.push({
      path: '/createTemplate',
      query: {
        type: 'create'
      }
    });
  };

  // 审核成功
  const updateAuditSuccess = () => {
    getTemplateList();
    dialogAuditVisible.value = false;
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

  // 点击删除
  const deleteTemplate = (row: any) => {
    ElMessageBox.confirm('将会删除该模板，请确保您有备份，是否继续？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        const data = await deleteTemplateAsync(row._id);
        if (data.data.status === 200) {
          ElMessage({
            type: 'success',
            message: '删除成功'
          });
          getTemplateList();
        } else {
          ElMessage.error(data.data.message);
        }
      })
      .catch(() => {});
  };

  // 打开审核弹窗
  const row = ref<any>(null);
  const dialogAuditVisible = ref<boolean>(false);
  const audit = (rowData: any) => {
    row.value = rowData;
    dialogAuditVisible.value = true;
  };
  // 取消审核弹窗
  const cancleAudit = () => {
    dialogAuditVisible.value = false;
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
