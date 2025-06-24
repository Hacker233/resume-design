<template>
  <!-- AI调用日志 -->
  <div class="integral-list-box">
    <!-- 查询表单 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="default">
      <el-form-item label="用户邮箱：">
        <el-input v-model="formInline.userEmail" placeholder="用户邮箱" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格列表 -->
    <el-table
      class="article-list-table"
      :data="tableData"
      style="width: 100%"
      size="default"
      border
    >
      <el-table-column prop="user_email" label="用户邮箱" />
      <el-table-column prop="ai_model" label="调用模型" />
      <el-table-column prop="integral_type" label="AI用途">
        <template #default="scope">
          <span>{{ aiPurposeDic[scope.row.type] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="serial_number" label="调用流水号" />
      <el-table-column prop="response_status" label="调用是否成功">
        <template #default="scope">
          <el-tag
            v-if="scope.row.response_status === undefined || scope.row.response_status === true"
            type="success"
            size="default"
            >调用成功</el-tag
          >
          <el-tag v-else type="danger" size="default">调用失败</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="error_msg" label="失败原因">
        <template #default="scope">
          <span v-if="scope.row.error_msg">{{ scope.row.error_msg }}</span>
          <span v-else>-</span>
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
  </div>
</template>
<script lang="ts" setup>
  import { formatListDate } from '@/utils/common';
  import 'element-plus/es/components/message-box/style/index';
  import { aiPurposeDic } from '@/dictionary/ai';
  import { getAiLogsByAdminAsync } from '@/http/api/ai';

  // 表单查询
  const formInline = reactive({
    userEmail: ''
  });
  // 查询所有简币列表
  const page = ref<number>(1);
  const limit = ref<number>(10);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  let tableData = ref<any>([]);
  const getAllAiLogsList = async () => {
    let params = {
      userEmail: formInline.userEmail,
      page: page.value,
      limit: limit.value
    };
    const data = await getAiLogsByAdminAsync(params);
    if (data.data.status === 200) {
      tableData.value = data.data.data.list;
      total.value = data.data.data.page.count;
      currentPage.value = data.data.data.page.currentPage;
      console.log('tableData', tableData);
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getAllAiLogsList();

  // 查询
  const onSubmit = () => {
    page.value = 1;
    currentPage.value = 1;
    getAllAiLogsList();
  };

  // 重置
  const resetForm = () => {
    formInline.userEmail = '';
    page.value = 1;
    currentPage.value = 1;
    getAllAiLogsList();
  };

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    getAllAiLogsList();
  };

  // 改变每页数量
  const handleSizeChange = (pageSize: number) => {
    limit.value = pageSize;
    console.log('改变每页数量', pageSize);
    getAllAiLogsList();
  };
</script>
