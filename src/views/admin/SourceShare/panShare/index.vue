<template>
  <!-- 新增 -->
  <div class="top-box">
    <el-button type="primary" size="default" @click="openAddDialog"> 新增网盘资源 </el-button>
  </div>

  <!-- 表格列表 -->
  <el-table
    class="pan-source-list-table"
    :data="tableData"
    style="width: 100%; margin-top: 20px"
    size="default"
    border
  >
    <el-table-column prop="pan_source_title" label="资源名称" />
    <el-table-column prop="pan_source_price" label="资源价格" />
    <el-table-column prop="pan_source_user_email" label="发布者" />
    <el-table-column prop="pan_source_cover" label="封面图">
      <template #default="scope">
        <img v-viewer class="cover-img" :src="scope.row.pan_source_cover" alt="" srcset="" />
      </template>
    </el-table-column>
    <el-table-column prop="pan_source_abstract" label="简介">
      <template #default="scope">
        <el-tooltip effect="light" :content="scope.row.pan_source_abstract" raw-content>
          <div class="article-content-box">
            {{ scope.row.pan_source_abstract }}
          </div>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="pan_source_screen" label="截图">
      <template #default="scope">
        <div v-viewer class="source-screen-box">
          <div v-for="(item, index) in scope.row.pan_source_screen" :key="index">
            <img v-if="item.url" class="preview-img" :src="item.url" alt="图片" srcset="" />
            <img
              v-else
              class="preview-img"
              :src="item.response.data.fileUrl"
              alt="图片"
              srcset=""
            />
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="downloads" label="下载量" />
    <el-table-column prop="pan_source_likes_count" label="点赞量" />
    <el-table-column prop="pan_source_status" label="审核状态">
      <template #default="scope">
        <el-tag v-if="scope.row.pan_source_status === '1'" type="warning">待审核</el-tag>
        <el-tag v-else-if="scope.row.pan_source_status === '3'" type="success">已通过</el-tag>
        <el-tag v-else type="danger">已拒绝</el-tag>
      </template>
    </el-table-column>

    <el-table-column prop="createDate" label="创建日期">
      <template #default="scope">
        <div>
          {{ formatListDate(scope.row.createDate) }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="updateDate" label="更新日期" sortable>
      <template #default="scope">
        <div>
          {{ formatListDate(scope.row.updateDate) }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="150">
      <template #default="scope">
        <el-button link size="small" @click="audit(scope.row)">审核</el-button>
        <el-button link size="small" @click="edit(scope.row)">编辑</el-button>
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

  <!-- 审核弹窗 -->
  <audit-dialog
    :dialog-audit-visible="dialogAuditVisible"
    :audit-row="auditRow"
    @cancle="cancleAudit"
    @update-success="auditSuccess"
  ></audit-dialog>

  <!-- 新增或者编辑弹窗 -->
  <pan-share-dialog
    :dialog-pan-share-visible="dialogPanShareVisible"
    :title="title"
    :row="row"
    :btn-text="btnText"
    :category-list="categoryList"
    @cancle="handleCancle"
    @update-success="handleSuccess"
  ></pan-share-dialog>
</template>
<script lang="ts" setup>
  import {
    deletePanSourceAsync,
    getPanSourceShareListAsync,
    panShareCategroyListAsync
  } from '@/http/api/panShare';
  import PanShareDialog from './components/PanShareDialog.vue';
  import { formatListDate } from '@/utils/common';
  import AuditDialog from './components/AuditDialog.vue';
  import { ElMessageBox } from 'element-plus';
  import 'element-plus/es/components/message-box/style/index';

  const title = ref<string>('新增分类');
  const btnText = ref<string>('新增');
  const row = ref<any>(null);

  // 打开新增弹窗
  const dialogPanShareVisible = ref<boolean>(false);
  const openAddDialog = () => {
    title.value = '新增分类';
    dialogPanShareVisible.value = true;
  };

  // 取消弹窗
  const handleCancle = () => {
    dialogPanShareVisible.value = false;
  };

  // 弹窗成功
  const handleSuccess = () => {
    dialogPanShareVisible.value = false;
    getPanShareList();
  };

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    getPanShareList();
  };

  // 查询网盘资源分享列表
  const tableData = ref<any>();
  const page = ref<number>(1);
  const limit = ref<number>(10);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const getPanShareList = async () => {
    let params = {
      page: page.value,
      limit: limit.value
    };
    const data = await getPanSourceShareListAsync(params);
    if (data.data.status === 200) {
      tableData.value = data.data.data.list;
      total.value = data.data.data.page.count;
      currentPage.value = data.data.data.page.currentPage;
    } else {
      ElMessage.error(data.message);
    }
  };
  getPanShareList();

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
    getPanShareList();
  };

  // 编辑
  const edit = (item: any) => {
    btnText.value = '修改';
    title.value = '修改分类';
    row.value = item;
    dialogPanShareVisible.value = true;
  };

  // 查询分类列表
  const categoryList = ref<any>();
  const getCategoryList = async () => {
    const data = await panShareCategroyListAsync();
    if (data.status === 200) {
      categoryList.value = data.data;
    } else {
      ElMessage.error(data.message);
    }
  };
  getCategoryList();

  // 删除分类
  const deleteTemplate = (row: any) => {
    ElMessageBox.confirm('删除该分类后无法恢复，确定继续？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        const data = await deletePanSourceAsync(row._id);
        if (data.data.status === 200) {
          ElMessage.success('删除成功');
          getPanShareList();
        } else {
          ElMessage.error(data.data.message);
        }
      })
      .catch(() => {});
  };
</script>
<style lang="scss" scoped>
  .pan-source-list-table {
    .cover-img {
      max-height: 100px;
    }
    .article-content-box {
      max-width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .source-screen-box {
      display: flex;
      overflow: auto;
      .preview-img {
        max-height: 100px;
        border: 1px solid #eee;
      }
    }
  }
</style>
