<template>
  <!-- 查询表单 -->
  <div class="filter-container">
    <el-form
      label-width="100px"
      :inline="true"
      :model="formInline"
      size="default"
      class="filter-form"
    >
      <div class="filter-grid">
        <el-form-item label="用户名：" class="filter-item">
          <el-input v-model="formInline.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="邮箱/账号：" class="filter-item">
          <el-input v-model="formInline.queryEmail" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="简币排序：" class="filter-item">
          <el-select v-model="formInline.integral_sort" placeholder="请选择">
            <el-option
              v-for="(item, index) in integralSortList"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="账号状态：" class="filter-item">
          <el-select v-model="formInline.accountStatus" placeholder="请选择">
            <el-option
              v-for="(item, index) in accountStatusList"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="全站免费：" class="filter-item">
          <el-select v-model="formInline.isAllFree" placeholder="请选择">
            <el-option
              v-for="(item, index) in isAllFreeList"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="注册时间：" class="filter-item">
          <el-select v-model="formInline.register_sort" placeholder="请选择">
            <el-option
              v-for="(item, index) in registerSortList"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <div class="filter-actions">
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="resetForm">重置</el-button>
        </div>
      </div>
    </el-form>
  </div>

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
    <el-table-column prop="roles" label="角色">
      <template #default="scope">
        <el-tag v-for="role in scope.row.roles" :key="role" type="success">{{ role }}</el-tag>
      </template>
    </el-table-column>
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
    <el-table-column prop="valid" label="邮箱验证">
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
    <el-table-column prop="organization" label="所属组织">
      <template #default="scope">
        <div>
          {{ scope.row.organization || '-' }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="isAllFree" label="全站免费">
      <template #default="scope">
        <el-tag v-if="scope.row.isAllFree" type="success" size="default">是</el-tag>
        <el-tag v-else type="danger" size="default">否</el-tag>
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
</template>
<script lang="ts" setup>
  import { formatListDate } from '@/utils/common';
  import Pagination from '@/components/Pagination/pagination.vue';
  import { getAllUserByOrgAdminAsync } from '@/http/api/user';
  import 'element-plus/es/components/message-box/style/index';
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

  // 是否全站免费
  const isAllFreeList = reactive([
    {
      label: '是',
      value: true
    },
    {
      label: '否',
      value: false
    }
  ]);

  // 表单查询
  const formInline = reactive({
    queryEmail: '',
    integral_sort: '',
    register_sort: '',
    accountStatus: '',
    name: '',
    organizationId: '',
    isAllFree: ''
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
    formInline.name = '';
    formInline.organizationId = '';
    formInline.isAllFree = '';
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
      name: formInline.name,
      email: formInline.queryEmail,
      integral_sort: formInline.integral_sort,
      createDate: formInline.register_sort,
      accountStatus: formInline.accountStatus,
      organizationId: formInline.organizationId,
      isAllFree: formInline.isAllFree,
      page: page.value,
      limit: limit.value
    };
    const data = await getAllUserByOrgAdminAsync(params);
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
          serialNumber: limit.value * (page.value - 1) + index + 1, // 序号
          organization: item.organization || '-',
          organizationId: item.organizationId,
          isAllFree: item.isAllFree
        };
      });
      console.log('tableData', tableData);
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getUserList();

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
</script>
<style lang="scss" scoped>
  .filter-container {
    padding: 16px;
    margin-bottom: 20px;
    background: #f8fafc;
    border-radius: 4px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  }

  .filter-form {
    width: 100%;

    .filter-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(280px, 1fr)); /* 替换auto-fill为固定3列 */
      gap: 16px;
    }
    .filter-grid > * {
      align-self: flex-end; /* 将align-items改为子元素上的align-self */
    }

    .filter-item {
      margin: 0;

      :deep(.el-form-item__label) {
        width: 80px;
        text-align: right;
        padding-right: 12px;
        color: #606266;
        font-weight: normal;
      }

      :deep(.el-input),
      :deep(.el-select) {
        width: 100%;
      }
    }

    .filter-actions {
      display: flex;
      gap: 12px;
      grid-column: 1 / -1;
      justify-content: flex-end;
      padding-top: 8px;
    }
  }

  :deep(.integral-value-box) {
    display: flex;
    align-items: center;
    img {
      margin: 0 5px;
    }
  }
</style>
