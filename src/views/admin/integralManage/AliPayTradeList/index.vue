<!-- 当面付订单 -->
<template>
  <div class="alipay-trade-list-box">
    <!-- 查询表单 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="default">
      <el-form-item label="用户邮箱：">
        <el-input v-model="formInline.queryEmail" placeholder="用户邮箱" />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="formInline.createDate"
          type="date"
          placeholder="请选择日期"
          size="default"
        />
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
      <el-table-column prop="email" label="用户邮箱" />
      <el-table-column prop="tradeNo" label="支付宝交易号" />
      <el-table-column prop="outTradeNo" label="商户订单号" />
      <el-table-column prop="buyerLogonId" label="买家支付宝号" />
      <el-table-column prop="tradeStatus" label="订单状态">
        <template #default="scope">
          <el-tag :type="tradeStatusTags[scope.row.tradeStatus].tag || 'danger'" size="default">{{
            tradeStatusTags[scope.row.tradeStatus].desc || '-'
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="totalAmount" label="订单金额" />
      <el-table-column prop="buyerPayAmount" label="实付金额" />
      <el-table-column prop="receiptAmount" label="实收金额" />
      <el-table-column prop="subject" label="订单描述"></el-table-column>
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

      <!-- 操作区域 -->
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="updateAliPayTrade(scope.row)"
            >同步订单</el-button
          >
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
  import { tradeQueryByAdminAsync, tradeQueryListAsync } from '@/http/api/integral';
  import { formatListDate } from '@/utils/common';
  import 'element-plus/es/components/message-box/style/index';

  // 订单状态对应tags
  const tradeStatusTags: any = {
    WAIT_BUYER_PAY: {
      tag: 'info',
      desc: '待支付'
    },
    TRADE_CLOSED: {
      tag: 'danger',
      desc: '交易关闭'
    },
    TRADE_SUCCESS: {
      tag: 'success',
      desc: '交易成功'
    },
    TRADE_FINISHED: {
      tag: 'warning',
      desc: '交易结束'
    }
  };

  // 表单查询
  const formInline = reactive({
    queryEmail: '',
    createDate: ''
  });

  // 查询订单列表
  const page = ref<number>(1);
  const limit = ref<number>(10);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  let tableData = ref<any>([]);
  const tradeQueryList = async () => {
    let params = {
      email: formInline.queryEmail,
      createDate: formInline.createDate,
      page: page.value,
      limit: limit.value
    };
    const data = await tradeQueryListAsync(params);
    if (data.data.status === 200) {
      tableData.value = data.data.data.list;
      total.value = data.data.data.page.count;
      currentPage.value = data.data.data.page.currentPage;
      console.log('tableData', tableData);
    } else {
      ElMessage.error(data.data.message);
    }
  };
  tradeQueryList();

  // 查询
  const onSubmit = () => {
    page.value = 1;
    currentPage.value = 1;
    tradeQueryList();
  };

  // 重置
  const resetForm = () => {
    formInline.queryEmail = '';
    formInline.createDate = '';
    page.value = 1;
    currentPage.value = 1;
    tradeQueryList();
  };

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    tradeQueryList();
  };

  // 改变每页数量
  const handleSizeChange = (pageSize: number) => {
    limit.value = pageSize;
    console.log('改变每页数量', pageSize);
    tradeQueryList();
  };

  // 更新支付宝订单，更新订单状态
  const updateAliPayTrade = async (row: any) => {
    let params = {
      email: row.email,
      outTradeNo: row.outTradeNo,
      orderType: row.orderType
    };
    const data = await tradeQueryByAdminAsync(params);
    if (data.data.status === 200) {
      ElMessage.success('同步成功');
      tradeQueryList();
    } else {
      ElMessage.error(data.data.message);
    }
  };
</script>
<style lang="scss" scoped></style>
