<template>
  <!-- 查询表单 -->
  <el-form :inline="true" :model="formInline" class="demo-form-inline" size="default">
    <el-form-item label="用户邮箱：">
      <el-input v-model="formInline.queryEmail" placeholder="用户邮箱" />
    </el-form-item>
    <el-form-item label="简币排序:" prop="integral_sort">
      <el-select v-model="formInline.integral_sort" placeholder="请选择简币排序规则">
        <el-option
          v-for="(item, index) in integralSortList"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="账号状态:" prop="acc">
      <el-select v-model="formInline.accountStatus" placeholder="请选择账号状态">
        <el-option
          v-for="(item, index) in accountStatusList"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="注册时间排序:" prop="register_sort">
      <el-select v-model="formInline.register_sort" placeholder="请选择注册时间顺序">
        <el-option
          v-for="(item, index) in registerSortList"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button @click="resetForm">重置</el-button>
      <!-- <el-tooltip :disabled="multipleSelection.length > 0" effect="light" content="请先选择用户">
        <el-button :disabled="multipleSelection.length <= 0" @click="sendEmailToSelectedUsers"
          >发送邮件</el-button
        >
      </el-tooltip>
      <el-button @click="sendEmailToAllUsers">发送全体邮件</el-button> -->
    </el-form-item>
  </el-form>

  <el-table
    class="template-list-table"
    :data="tableData"
    style="width: 100%"
    size="default"
    row-key="email"
    border
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="50" align="center" :reserve-selection="true" />
    <el-table-column label="序号" prop="serialNumber" width="60" align="center"></el-table-column>
    <el-table-column prop="name" label="昵称" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="roles" label="角色" />
    <el-table-column prop="integral" label="简币数量">
      <template #default="scope">
        <div class="integral-value-box">
          <span>{{ scope.row.integral }}</span>
          <img
            width="24"
            src="@/assets/images/jianB.png"
            alt="简币"
            title="简币 - 您的专属虚拟货币"
          />
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="valid" label="是否验证邮箱">
      <template #default="scope">
        <el-tag v-if="scope.row.valid === '已验证'" type="success" size="default">{{
          scope.row.valid
        }}</el-tag>
        <el-tag v-else type="danger" size="default">{{ scope.row.valid }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="accountStatus" label="用户状态">
      <template #default="scope">
        <el-tag v-if="scope.row.accountStatus === 1" type="success" size="default">启用中</el-tag>
        <el-tag v-else-if="scope.row.accountStatus === 2" type="danger" size="default"
          >永久封禁</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column prop="profilePic" label="头像">
      <template #default="scope">
        <el-avatar :size="50" :src="scope.row.profilePic" />
      </template>
    </el-table-column>
    <el-table-column prop="createDate" label="注册日期" sortable>
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
    <el-table-column label="操作" width="140">
      <template #default="scope">
        <el-button link size="small" @click="edit(scope.row)">编辑</el-button>
        <el-button link type="primary" size="small" @click="deleteUser(scope.row)">删除</el-button>
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

  <!-- 编辑弹窗 -->
  <edit-dialog
    :dialog-visible="dialogVisible"
    :row="row"
    @cancle="cancle"
    @update-success="updateSuccess"
  ></edit-dialog>
</template>
<script lang="ts" setup>
  import { formatListDate } from '@/utils/common';
  import Pagination from '@/components/Pagination/pagination.vue';
  import { deleteUserAsync, getAllUserListAsync } from '@/http/api/user';
  import { ElMessageBox } from 'element-plus';
  import 'element-plus/es/components/message-box/style/index';
  import EditDialog from './components/EditDialog.vue';
  let tableData = ref<any>([]);

  // 简币排序规则下拉
  const integralSortList = reactive([
    {
      label: '由多到少',
      value: -1
    },
    {
      label: '由少到多',
      value: 1
    }
  ]);

  // 注册时间排序
  const registerSortList = reactive([
    {
      label: '由近到远',
      value: -1
    },
    {
      label: '由远到近',
      value: 1
    }
  ]);

  // 账号状态
  const accountStatusList = reactive([
    {
      label: '启用中',
      value: 1
    },
    {
      label: '永久封禁',
      value: 2
    }
  ]);

  // 表单查询
  const formInline = reactive({
    queryEmail: '',
    integral_sort: '',
    register_sort: '',
    accountStatus: ''
  });

  // 查询
  const onSubmit = () => {
    page.value = 1;
    currentPage.value = 1;
    getUserList();
  };

  // 重置
  const resetForm = () => {
    formInline.queryEmail = '';
    formInline.integral_sort = '';
    formInline.register_sort = '';
    formInline.accountStatus = '';
    page.value = 1;
    currentPage.value = 1;
    getUserList();
  };

  // 发送邮件至选中的用户
  // const sendEmailToSelectedUsers = () => {};

  // 当选择项发生变化时会触发该事件
  const multipleSelection = ref<any>([]);
  const handleSelectionChange = (val: any) => {
    multipleSelection.value = val;
    console.log('当前选中项', multipleSelection.value, val.updateDate);
  };

  // 给所有用户发送邮件
  // const sendEmailToAllUsers = () => {};

  // 获取用户列表
  const page = ref<number>(1);
  const limit = ref<number>(15);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const getUserList = async () => {
    let params = {
      email: formInline.queryEmail,
      integral_sort: formInline.integral_sort,
      createDate: formInline.register_sort,
      accountStatus: formInline.accountStatus,
      page: page.value,
      limit: limit.value
    };
    const data = await getAllUserListAsync(params);
    if (data.data.status === 200) {
      tableData.value = data.data.data.list;
      total.value = data.data.data.page.count;
      currentPage.value = data.data.data.page.currentPage;
      // 过滤数据
      tableData.value = tableData.value.map((item: any, index: number) => {
        return {
          valid: item.auth.email.valid ? '已验证' : '未验证',
          createDate: item.createDate,
          updateDate: item.updateDate || '-',
          email: item.email,
          name: item.name,
          profilePic: item.photos.profilePic.url,
          roles: item.roles,
          integral: item.integral,
          accountStatus: item.auth.accountStatus,
          serialNumber: limit.value * (page.value - 1) + index + 1 // 序号
        };
      });
      console.log('tableData', tableData);
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getUserList();

  // 打开修改弹窗
  const row = ref<any>(null);
  const dialogVisible = ref<boolean>(false);
  const edit = (rowData: any) => {
    console.log(rowData);
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
    getUserList();
    dialogVisible.value = false;
  };

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    console.log('页码改变', currentPage);
    getUserList();
  };

  // 改变每页数量
  const handleSizeChange = (pageSize: number) => {
    limit.value = pageSize;
    console.log('改变每页数量', pageSize);
    getUserList();
  };

  // 点击删除
  const deleteUser = (row: any) => {
    ElMessageBox.confirm('删除该用户后将无法登录，确定继续？', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        const data = await deleteUserAsync(row.email);
        if (data.data.status === 200) {
          ElMessage({
            type: 'success',
            message: '删除成功'
          });
          getUserList();
        } else {
          ElMessage.error(data.data.message);
        }
      })
      .catch(() => {});
  };
</script>
<style lang="scss" scoped>
  :deep(.integral-value-box) {
    display: flex;
    align-items: center;
    img {
      margin: 0 5px;
    }
  }
</style>
