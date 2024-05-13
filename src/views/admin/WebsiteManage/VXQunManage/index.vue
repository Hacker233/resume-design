<template>
  <div class="vx-qun-box">
    <!-- 新增微信群 -->
    <div class="top-box">
      <el-button type="primary" size="default" @click="openAddDialog"> 新增微信群 </el-button>
    </div>
  </div>

  <!-- 表格列表 -->
  <el-table class="vxqun-list-table" :data="qunList" style="width: 100%" size="default" border>
    <el-table-column prop="name" label="群名称" />
    <el-table-column prop="qr_code" label="二维码">
      <template #default="scope">
        <img v-viewer class="preview-img" :src="scope.row.qr_code" alt="" srcset="" />
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
        <el-button link size="small" @click="edit(scope.row)">编辑</el-button>
        <el-button link type="primary" size="small" @click="deleteTemplate(scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <!-- 新增和编辑分类弹窗 -->
  <qun-dialog
    :dialog-pay-visible="dialogPayVisible"
    :row="row"
    :title="title"
    :btn-text="btnText"
    @cancle="cancle"
    @update-success="updateSuccess"
  ></qun-dialog>

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
  import QunDialog from './components/QunDialog.vue';
  import { formatListDate } from '@/utils/common';
  import { ElMessageBox } from 'element-plus';
  import 'element-plus/es/components/message-box/style/index';
  import { getVXQunListAsync, vxqunDeleteAsync } from '@/http/api/website';

  const dialogPayVisible = ref<boolean>(false);
  const row = ref<any>(null);
  const title = ref<string>('title');
  const btnText = ref<string>('添加');

  // 打开弹窗
  const openAddDialog = () => {
    btnText.value = '添加';
    title.value = '添加用户';
    dialogPayVisible.value = true;
  };

  // 取消弹窗
  const cancle = () => {
    dialogPayVisible.value = false;
  };

  // 提交成功
  const updateSuccess = () => {
    dialogPayVisible.value = false;
    getPaystatsList();
  };

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    getPaystatsList();
  };

  // 改变每页数量
  const handleSizeChange = (pageSize: number) => {
    limit.value = pageSize;
    console.log('改变每页数量', pageSize);
    getPaystatsList();
  };

  // 查询群列表
  const page = ref<number>(1);
  const limit = ref<number>(10);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  let qunList = ref<any>([]);
  const getPaystatsList = async () => {
    let params = {
      page: page.value,
      limit: limit.value
    };
    const data = await getVXQunListAsync(params);
    if (data.data.status === 200) {
      qunList.value = data.data.data.list;
      total.value = data.data.data.page.count;
      currentPage.value = data.data.data.page.currentPage;
      console.log('qunList', qunList);
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getPaystatsList();

  // 编辑
  const edit = (item: any) => {
    btnText.value = '修改';
    title.value = '修改群';
    row.value = item;
    dialogPayVisible.value = true;
  };

  // 删除群
  const deleteTemplate = (row: any) => {
    ElMessageBox.confirm('删除该付费用户后无法恢复，确定继续？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        const data = await vxqunDeleteAsync(row._id);
        if (data.data.status === 200) {
          ElMessage.success('删除成功');
          getPaystatsList();
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

  .vxqun-list-table {
    .preview-img {
      max-width: 100px;
      cursor: pointer;
    }
  }
</style>
