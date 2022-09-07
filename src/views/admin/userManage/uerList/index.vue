<template>
  <el-table class="template-list-table" :data="tableData" style="width: 100%" size="default" border>
    <el-table-column prop="name" label="昵称" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="roles" label="角色" />
    <el-table-column prop="valid" label="是否验证邮箱">
      <template #default="scope">
        <el-tag type="success" size="default" v-if="scope.row.valid === '已验证'">{{ scope.row.valid }}</el-tag>
        <el-tag type="danger" size="default" v-else>{{ scope.row.valid }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="profilePic" label="头像">
      <template #default="scope">
        <el-avatar :size="50" :src="scope.row.profilePic" />
      </template>
    </el-table-column>
    <el-table-column prop="createDate" label="注册日期">
      <template #default="scope">
        <div>
          {{ moment(new Date(scope.row.date)).format('YYYY-MM-DD HH:mm:ss') }}
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
    @handle-current-change="handleCurrentChange"
  ></Pagination>
</template>
<script lang="ts" setup>
  import moment from 'moment';
  import Pagination from '@/components/Pagination/pagination.vue';
  import { getAllUserListAsync } from '@/http/api/user';
  let tableData = ref<any>([]);

  // 编辑用户信息
  const edit = (row: any) => {};

  // 删除用户
  const deleteUser = (row: any) => {};

  // 获取用户列表
  const page = ref<number>(1);
  const limit = ref<number>(15);
  const total = ref<number>(0);
  const getUserList = async () => {
    let params = {
      page: page.value,
      limit: limit.value
    };
    const data = await getAllUserListAsync(params);
    if (data.data.status === 200) {
      tableData.value = data.data.data.list;
      total.value = data.data.data.page.count;
      // 过滤数据
      tableData.value = tableData.value.map((item: any) => {
        return {
          valid: item.auth.email.valid ? '已验证' : '未验证',
          date: item.date,
          email: item.email,
          name: item.name,
          profilePic: item.photos.profilePic.url,
          roles: item.roles
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
</script>
