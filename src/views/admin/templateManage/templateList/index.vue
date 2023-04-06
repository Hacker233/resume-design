<template>
  <el-table class="template-list-table" :data="tableData" style="width: 100%" size="default" border>
    <el-table-column prop="ID" label="模板ID" />
    <el-table-column prop="USER" label="模板创建人" />
    <el-table-column prop="EMAIL" label="创建邮箱" />
    <el-table-column prop="previewUrl" label="封面预览">
      <template #default="scope">
        <img v-viewer class="preview-img" :src="scope.row.previewUrl" alt="" srcset="" />
      </template>
    </el-table-column>
    <el-table-column prop="TITLE" label="模板标题" />
    <el-table-column prop="CATEGORY" label="模板分类" />
    <el-table-column prop="LAYOUT" label="布局模式">
      <template #default="scope">
        <div>
          {{ scope.row.LAYOUT === 'classical' ? '传统模式' : '左右布局模式' }}
        </div>
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
    <el-table-column prop="PASS_AUDIT" label="审核状态">
      <template #default="scope">
        <div>
          <el-tag v-if="scope.row.PASS_AUDIT == 1" type="success">已同意</el-tag>
          <el-tag v-else-if="scope.row.PASS_AUDIT == 2" type="error">拒绝</el-tag>
          <el-tag v-else-if="scope.row.PASS_AUDIT == 3" type="info">待审核</el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="270">
      <template #default="scope">
        <el-button link size="small" @click="edit(scope.row)">编辑</el-button>
        <el-button link size="small" @click="toPreview(scope.row)">预览</el-button>
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
    :current-page="currentPage"
    @handle-current-change="handleCurrentChange"
  ></Pagination>

  <!-- 编辑弹窗 -->
  <edit-dialog
    :dialog-visible="dialogVisible"
    :row="row"
    @cancle="cancle"
    @update-success="updateSuccess"
  ></edit-dialog>

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
  import { deleteTemplateAsync, getResumeListAllAsync } from '@/http/api/resume';
  import EditDialog from './components/EditDialog.vue';
  import AuditDialogVue from './components/AuditDialog.vue';
  import { ElMessageBox } from 'element-plus';
  import 'element-plus/es/components/message-box/style/index';
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
    const data = await getResumeListAllAsync(params);
    if (data.data.status === 200) {
      tableData.value = data.data.data.list;
      total.value = data.data.data.page.count;
      currentPage.value = data.data.data.page.currentPage;
      console.log('tableData', tableData);
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getTemplateList();

  // 打开修改弹窗
  const row = ref<any>(null);
  const dialogVisible = ref<boolean>(false);
  const edit = (rowData: any) => {
    row.value = rowData;
    dialogVisible.value = true;
  };
  // 关闭弹窗
  const cancle = () => {
    row.value = null;
    dialogVisible.value = false;
  };

  // 更新成功
  const updateSuccess = () => {
    getTemplateList();
    dialogVisible.value = false;
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

  // 点击删除
  const deleteTemplate = (row: any) => {
    ElMessageBox.confirm('将会删除改模板，请确保您有备份，是否继续？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        const data = await deleteTemplateAsync(row.ID);
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
  const dialogAuditVisible = ref<boolean>(false);
  const audit = (rowData: any) => {
    row.value = rowData;
    dialogAuditVisible.value = true;
  };
  // 取消审核弹窗
  const cancleAudit = () => {
    dialogAuditVisible.value = false;
  };

  // 点击去预览
  const router = useRouter();
  const toPreview = (row: any) => {
    router.push({
      path: '/custom',
      query: {
        ID: row.ID,
        previewUrl: row.previewUrl,
        category: JSON.stringify(row.CATEGORY)
      }
    });
  };
</script>
<style lang="scss" scoped>
  .template-list-table {
    .preview-img {
      max-width: 100px;
      cursor: pointer;
    }
  }
</style>
