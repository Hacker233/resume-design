<template>
  <div class="organization-list-box">
    <!-- 查询表单 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="default">
      <el-form-item label="组织名称">
        <el-input v-model="formInline.name" placeholder="组织名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="handleAdd">新增组织</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格列表 -->
    <el-table
      class="organization-list-table"
      :data="tableData"
      style="width: 100%"
      size="default"
      border
    >
      <el-table-column prop="name" label="组织名称" />
      <el-table-column prop="domain" label="组织域名"
        ><template #default="scope">
          <div>{{ scope.row.domain || '-' }}</div>
        </template></el-table-column
      >
      <el-table-column prop="description" label="组织描述" />
      <el-table-column prop="admin" label="负责人" />
      <el-table-column prop="memberCount" label="成员数量" width="120" />
      <el-table-column prop="endDate" label="到期时间">
        <template #default="scope">
          <div>{{ formatListDate(scope.row.endDate) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="remainingDays" label="剩余天数" width="100">
        <template #default="scope">
          <el-tag :type="scope.row.remainingDays > 0 ? 'success' : 'danger'" size="default">
            {{ scope.row.remainingDays }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="totalPayment" label="实缴总费用" width="120">
        <template #default="scope">
          <div>￥{{ scope.row.totalPayment.toFixed(2) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="isAllFree" label="全站免费">
        <template #default="scope">
          <el-tag v-if="scope.row.isAllFree" type="success" size="default">是</el-tag>
          <el-tag v-else type="danger" size="default">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template #default="scope">
          <el-tag v-if="scope.row.remainingDays > 0" type="success" size="default">正常</el-tag>
          <el-tag v-else type="danger" size="default">已到期</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="entryType" label="入驻方式">
        <template #default="scope">
          <el-tag type="success" effect="light">
            {{ entryTypeList.find((item) => item.value === scope.row.entryType)?.label || '-' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="isRegisterGiftMember" label="注册赠送会员">
        <template #default="scope">
          <el-tag v-if="scope.row.isRegisterGiftMember" type="success" size="default">是</el-tag>
          <el-tag v-else type="danger" size="default">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="giftMemberDays" label="赠送会员天数">
        <template #default="scope">
          <div>{{ scope.row.giftMemberDays || 0 }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="createDate" label="创建日期">
        <template #default="scope">
          <div>{{ formatListDate(scope.row.createDate) }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template #default="scope">
          <!-- 导入成员 -->
          <el-button type="primary" size="small" @click="handleImportMember(scope.row)"
            >导入成员</el-button
          >
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
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

    <!-- 新增或编辑弹窗 -->
    <edit-and-add-dialog
      :dialog-org-visible="dialogOrgVisible"
      :row="row"
      :title="title"
      :btn-text="btnText"
      @cancle="cancle"
      @update-success="updateSuccess"
    ></edit-and-add-dialog>

    <!-- 导入成员弹窗 -->
    <import-member-dialog
      :dialog-import-visible="dialogImportVisible"
      :row="row"
      @cancle="handleImportCancle"
      @update-success="handleImportSuccess"
    ></import-member-dialog>
  </div>
</template>

<script lang="ts" setup>
  import { ElMessageBox, ElMessage } from 'element-plus';
  import { formatListDate } from '@/utils/common';
  import { deleteOrgAsync, getOrgListAsync } from '@/http/api/organization';
  import EditAndAddDialog from './components/EditAndAddDialog.vue';
  import ImportMemberDialog from './components/ImportMemberDialog.vue';

  interface Organization {
    _id: string;
    name: string;
    description: string;
    admin: string;
    memberCount: number;
    endDate: string;
    remainingDays: number;
    totalPayment: number;
    isAllFree: boolean;
    createDate: string;
  }

  const formInline = ref({
    name: ''
  });

  const tableData = ref<Organization[]>([]);

  const entryTypeList = ref([
    {
      value: 1,
      label: 'sass'
    },
    {
      value: 2,
      label: '独立域名'
    }
  ]);

  // 查询组织列表
  const page = ref<number>(1);
  const limit = ref<number>(15);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const getList = async () => {
    let params = {
      ...formInline.value,
      page: page.value,
      limit: limit.value
    };
    const data = await getOrgListAsync(params);
    if (data.data.status === 200) {
      tableData.value = data.data.data.list;
      total.value = data.data.data.page.count;
      currentPage.value = data.data.data.page.currentPage;
      console.log('tableData', tableData);
    } else {
      ElMessage.error(data.data.message);
    }
  };

  const handleSearch = () => {
    currentPage.value = 1;
    getList();
  };

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    console.log('页码改变', currentPage);
    getList();
  };

  // 改变每页数量
  const handleSizeChange = (pageSize: number) => {
    limit.value = pageSize;
    console.log('改变每页数量', pageSize);
    getList();
  };

  const resetForm = () => {
    formInline.value = {
      name: ''
    };
    getList();
  };

  const handleEdit = (rowitem: Organization) => {
    dialogOrgVisible.value = true;
    title.value = '编辑组织';
    btnText.value = '编辑';
    row.value = rowitem;
  };

  const handleDelete = (row: Organization) => {
    ElMessageBox.confirm(`确定要删除组织 ${row.name} 吗?`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      // API删除请求
      let params = {
        _id: row._id
      };
      let data = await deleteOrgAsync(params);
      if (data.data.status === 200) {
        ElMessage.success('删除成功');
        getList();
      } else {
        ElMessage.error(data.data.message);
      }
    });
  };

  // 打开新增或编辑弹窗
  const dialogOrgVisible = ref<boolean>(false);
  const title = ref<string>('新增组织');
  const btnText = ref<string>('新增');
  const row = ref<any>(null);
  const handleAdd = () => {
    dialogOrgVisible.value = true;
    title.value = '新增组织';
    btnText.value = '新增';
    row.value = null;
  };

  // 关闭弹窗
  const cancle = () => {
    dialogOrgVisible.value = false;
  };

  // 更新成功
  const updateSuccess = () => {
    getList();
    dialogOrgVisible.value = false;
  };

  // 导入成员
  const dialogImportVisible = ref<boolean>(false);
  const handleImportMember = (rowData: Organization) => {
    dialogImportVisible.value = true;
    row.value = rowData;
    console.log('导入成员', row.value);
  };

  // 导入成功
  const handleImportSuccess = () => {
    dialogImportVisible.value = false;
    getList();
  };

  // 导入取消
  const handleImportCancle = () => {
    dialogImportVisible.value = false;
  };

  onMounted(() => {
    getList();
  });
</script>

<style scoped>
  .organization-list-box {
    padding: 20px;
  }
  .demo-form-inline {
    margin-bottom: 20px;
  }
  .organization-list-table {
    margin-bottom: 20px;
  }
</style>
