<!-- 易支付订单管理 -->
<template>
  <div class="yipay-trade-list-box">
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
      <el-table-column prop="status" label="订单状态">
        <template #default="scope">
          <el-tag v-if="scope.row.status == '0'" type="danger" size="default">未支付</el-tag>
          <el-tag v-else-if="scope.row.status == '2'" type="info" size="default">已退款</el-tag>
          <el-tag v-else-if="scope.row.status == '1'" type="success" size="default"
            >支付成功</el-tag
          >
          <el-tag v-else type="error" size="default">未知状态</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品名称" />
      <el-table-column prop="money" label="商品金额" />
      <el-table-column prop="out_trade_no" label="商户订单号" />
      <el-table-column prop="trade_no" label="易支付订单号">
        <template #default="scope">
          <span v-if="scope.row.trade_no">{{ scope.row.trade_no }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="交易渠道">
        <template #default="scope">
          <el-tag v-if="scope.row.type == 'alipay'" type="primary" size="default">支付宝</el-tag>
          <el-tag v-else-if="scope.row.type.indexOf('wxpay') > -1" type="success" size="default"
            >微信支付</el-tag
          >
        </template>
      </el-table-column>
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
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="refundTrade(scope.row)"
            >退款</el-button
          >
          <el-button link type="primary" size="small" @click="updateyiPayTrade(scope.row)"
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
  import {
    yipayRefundAsync,
    yipayTradeQueryByAdminAsync,
    yipayTradeQueryListAsync
  } from '@/http/api/pay';
  import { formatListDate } from '@/utils/common';
  import { ElMessageBox } from 'element-plus';
  import 'element-plus/es/components/message-box/style/index';

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
    const data = await yipayTradeQueryListAsync(params);
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

  // 更新订单，更新订单状态
  const updateyiPayTrade = async (row: any) => {
    const params = {
      email: row.email,
      outTradeNo: row.out_trade_no,
      orderType: row.orderType,
      subject: row.subject,
      type: row.type
    };
    const data = await yipayTradeQueryByAdminAsync(params);
    if (data.data.status === 200) {
      ElMessage.success('同步成功');
      tradeQueryList();
    } else {
      ElMessage.error(data.data.message);
    }
  };

  // 管理员发起退款
  const refundTrade = async (row: any) => {
    ElMessageBox.confirm('此操作将退款, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        const params = {
          trade_no: row.trade_no,
          out_trade_no: row.out_trade_no,
          money: row.money,
          orderType: row.orderType,
          email: row.email
        };
        const data = await yipayRefundAsync(params);
        if (data.data.status === 200) {
          ElMessage.success('退款成功');
          updateyiPayTrade(row);
        } else {
          ElMessage.error(data.data.message);
        }
      })
      .catch(() => {});
  };
</script>
<style lang="scss" scoped></style>
