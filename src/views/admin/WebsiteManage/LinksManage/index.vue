<template>
  <div class="vx-qun-box">
    <!-- 新增友情链接 -->
    <div class="top-box">
      <el-button type="primary" size="default" @click="openAddDialog"> 新增友链 </el-button>
    </div>
  </div>

  <!-- 表格列表 -->
  <el-table class="link-list-table" :data="qunList" style="width: 100%" size="default" border>
    <el-table-column prop="apply_email" label="申请人邮箱">
      <template #default="scope">
        <span>{{ scope.row.apply_email || '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="友链名称" />
    <el-table-column prop="link" label="链接">
      <template #default="scope">
        <a :href="scope.row.link" target="_blank" rel="noopener noreferrer">{{ scope.row.link }}</a>
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
    <el-table-column prop="audit" label="审核状态">
      <template #default="scope">
        <div>
          <el-tag v-if="scope.row.audit == 1" type="success">审核通过</el-tag>
          <el-tag v-else-if="scope.row.audit == 2" type="error">拒绝</el-tag>
          <el-tag v-else-if="scope.row.audit == 0" type="info">待审核</el-tag>
          <el-tag v-else-if="!scope.row.audit" type="success">审核通过</el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="150">
      <template #default="scope">
        <el-button link size="small" @click="edit(scope.row)">编辑</el-button>
        <el-button link type="primary" size="small" @click="deleteLink(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 新增和编辑友链弹窗 -->
  <link-dialog
    :dialog-pay-visible="dialogPayVisible"
    :row="row"
    :title="title"
    :btn-text="btnText"
    @cancle="cancle"
    @update-success="updateSuccess"
  ></link-dialog>

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
  import LinkDialog from './components/LinkDialog.vue';
  import { formatListDate } from '@/utils/common';
  import { ElMessageBox } from 'element-plus';
  import 'element-plus/es/components/message-box/style/index';
  import { getLinksListAsync, linksDeleteAsync } from '@/http/api/website';

  const dialogPayVisible = ref<boolean>(false);
  const row = ref<any>(null);
  const title = ref<string>('title');
  const btnText = ref<string>('添加');

  // 打开弹窗
  const openAddDialog = () => {
    btnText.value = '添加';
    title.value = '添加友链';
    dialogPayVisible.value = true;
  };

  // 取消弹窗
  const cancle = () => {
    dialogPayVisible.value = false;
  };

  // 提交成功
  const updateSuccess = () => {
    dialogPayVisible.value = false;
    getLinksList();
  };

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    getLinksList();
  };

  // 改变每页数量
  const handleSizeChange = (pageSize: number) => {
    limit.value = pageSize;
    console.log('改变每页数量', pageSize);
    getLinksList();
  };

  // 查询友链列表
  const page = ref<number>(1);
  const limit = ref<number>(10);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  let qunList = ref<any>([]);
  const getLinksList = async () => {
    let params = {
      page: page.value,
      limit: limit.value
    };
    const data = await getLinksListAsync(params);
    if (data.status === 200) {
      qunList.value = data.data.list;
      total.value = data.data.page.count;
      currentPage.value = data.data.page.currentPage;
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getLinksList();

  // 编辑
  const edit = (item: any) => {
    btnText.value = '修改';
    title.value = '修改友链';
    row.value = item;
    dialogPayVisible.value = true;
  };

  // 删除群
  const deleteLink = (row: any) => {
    ElMessageBox.confirm('删除该条友链将无法恢复，确定继续？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        const data = await linksDeleteAsync(row._id);
        if (data.data.status === 200) {
          ElMessage.success('删除成功');
          getLinksList();
        } else {
          ElMessage.error(data.data.message);
        }
      })
      .catch(() => {});
  };
</script>
<style lang="scss" scoped>
  .vx-qun-box {
    .top-box {
      margin-bottom: 20px;
    }
  }

  .link-list-table {
    .preview-img {
      max-width: 100px;
      cursor: pointer;
    }
  }
</style>
