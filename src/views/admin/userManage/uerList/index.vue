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
    </el-form-item>
  </el-form>

  <el-table class="template-list-table" :data="tableData" style="width: 100%" size="default" border>
    <el-table-column prop="name" label="昵称" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="roles" label="角色" />
    <el-table-column prop="integral" label="简币数量">
      <template #default="scope">
        <div class="integral-value-box">
          <span>{{ scope.row.integral }}</span>
          <img width="24" src="@/assets/images/jianB.png" alt="简币" />
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

  // 表单查询
  const formInline = reactive({
    queryEmail: '',
    integral_sort: '',
    register_sort: ''
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
    page.value = 1;
    currentPage.value = 1;
    getUserList();
  };

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
      page: page.value,
      limit: limit.value
    };
    const data = await getAllUserListAsync(params);
    if (data.data.status === 200) {
      tableData.value = data.data.data.list;
      total.value = data.data.data.page.count;
      currentPage.value = data.data.data.page.currentPage;
      // 过滤数据
      tableData.value = tableData.value.map((item: any) => {
        return {
          valid: item.auth.email.valid ? '已验证' : '未验证',
          createDate: item.createDate,
          updateDate: item.updateDate || '-',
          email: item.email,
          name: item.name,
          profilePic: item.photos.profilePic.url,
          roles: item.roles,
          integral: item.integral
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
