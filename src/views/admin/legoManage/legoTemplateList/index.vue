<template>
  <!-- 表格列表 -->
  <el-table
    class="lego-template-list-table"
    :data="tableData"
    style="width: 100%"
    size="default"
    border
  >
    <el-table-column prop="email" label="用户邮箱" />
    <el-table-column prop="username" label="用户昵称" />
    <el-table-column prop="title" label="模板标题" />
    <el-table-column prop="category" label="模板分类" />
    <el-table-column prop="audit_status" label="模板状态">
      <template #default="scope">
        <el-tag v-if="scope.row.audit_status === 1" type="success" size="default">审核通过</el-tag>
        <el-tag v-else-if="scope.row.audit_status === 0" type="info" size="default">待审核</el-tag>
        <el-tag v-else type="danger" size="default">未通过</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="how_much" label="模板价格">
      <template #default="scope">
        <div v-if="scope.row.how_much !== 0" class="how-much-box">
          <span>{{ scope.row.how_much }}</span>
          <img
            width="24"
            src="@/assets/images/jianB.png"
            alt="简币"
            title="简币 - 您的专属虚拟货币"
          />
        </div>
        <div v-else>免费</div>
      </template>
    </el-table-column>
    <el-table-column prop="createDate" label="创建日期">
      <template #default="scope">
        <div>
          {{ formatListDate(scope.row.createDate) }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="createDate" label="修改日期">
      <template #default="scope">
        <div>
          {{ formatListDate(scope.row.updateDate) }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="previewUrl" label="模板封面">
      <template #default="scope">
        <div v-viewer>
          <img class="preview-img" :src="scope.row.previewUrl" alt="" srcset="" />
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="200">
      <template #default="scope">
        <el-button type="primary" size="small" @click="deleteTemplate(scope.row)">删除</el-button>
        <el-button type="primary" size="small" @click="audit(scope.row)">审核</el-button>
        <el-button type="primary" size="small" @click="toPreview(scope.row)">预览</el-button>
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
  <audit-dialog
    :dialog-audit-visible="dialogAuditVisible"
    :audit-row="auditRow"
    @cancle="cancleAudit"
    @update-success="auditSuccess"
  ></audit-dialog>

  <!-- 预览弹窗 -->
  <preview-image v-if="dialogPreviewVisible" @close="closePreview">
    <render-page></render-page>
  </preview-image>
</template>
<script lang="ts" setup>
  import { formatListDate } from '@/utils/common';
  import { deleteLegoTemplateByAdminAsync, getLegoTemplateListAsync } from '@/http/api/lego';
  import { ElMessageBox } from 'element-plus';
  import 'element-plus/es/components/message-box/style/index';
  import AuditDialog from './components/AuditDialog.vue';
  import PreviewImage from '@/views/LegoDesigner/render/PreviewImage/PreviewImage.vue';
  import RenderPage from '@/views/LegoDesigner/render/index.vue';
  import appStore from '@/store';

  // 获取所有模板列表
  const page = ref<number>(1);
  const limit = ref<number>(10);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const tableData = ref<any>([]);
  const getLegoTemplateList = async () => {
    let params = {
      page: page.value,
      limit: limit.value
    };
    const data = await getLegoTemplateListAsync(params);
    if (data.data.status === 200) {
      tableData.value = data.data.data.list;
      total.value = data.data.data.page.count;
      currentPage.value = data.data.data.page.currentPage;
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getLegoTemplateList();

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    getLegoTemplateList();
  };

  // 改变每页数量
  const handleSizeChange = (pageSize: number) => {
    limit.value = pageSize;
    console.log('改变每页数量', pageSize);
    getLegoTemplateList();
  };

  // 删除模板
  const deleteTemplate = (rowItem: any) => {
    ElMessageBox.confirm('删除该模板后无法恢复，确定继续？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        const data = await deleteLegoTemplateByAdminAsync(rowItem._id);
        if (data.data.status === 200) {
          ElMessage.success('删除成功');
          getLegoTemplateList();
        } else {
          ElMessage.error(data.data.message);
        }
      })
      .catch(() => {});
  };

  // 审核
  const dialogAuditVisible = ref<boolean>(false);
  const auditRow = ref<any>(null);
  const audit = (row: any) => {
    auditRow.value = row;
    dialogAuditVisible.value = true;
  };

  // 取消审核
  const cancleAudit = () => {
    dialogAuditVisible.value = false;
  };

  // 审核成功
  const auditSuccess = () => {
    dialogAuditVisible.value = false;
    getLegoTemplateList();
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
  .lego-template-list-table {
    .how-much-box {
      display: flex;
      align-items: center;
      span {
        margin-right: 10px;
      }
    }
    .preview-img {
      width: 100%;
    }
  }
</style>
