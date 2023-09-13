<template>
  <div class="order-list-table-box">
    <el-table :data="tableData" style="width: 100%" show-overflow-tooltip>
      <el-table-column prop="outTradeNo" label="订单号" :width="150" />
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

      <el-table-column prop="createDate" label="创建日期" :width="180">
        <template #default="scope">
          <div>
            {{ formatListDate(scope.row.createDate) }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-box">
      <!-- 分页组件 -->
      <Pagination
        :total="total"
        :limit="limit"
        :current-page="currentPage"
        @handle-current-change="handleCurrentChange"
      ></Pagination>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { getUserOrderListAsync } from '@/http/api/integral';
  import { formatListDate } from '@/utils/common';

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

  // 查询订单列表
  const page = ref<number>(1);
  const limit = ref<number>(10);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  let tableData = ref<any>([]);
  const getUserOrderList = async () => {
    let params = {
      page: page.value,
      limit: limit.value
    };
    const data = await getUserOrderListAsync(params);
    if (data.data.status === 200) {
      tableData.value = data.data.data.list;
      total.value = data.data.data.page.count;
      currentPage.value = data.data.data.page.currentPage;
      console.log('tableData', tableData);
    } else {
      ElMessage.error(data.data.message);
    }
  };
  getUserOrderList();

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    getUserOrderList();
  };
</script>
<style lang="scss" scoped>
  .order-list-table-box {
    .page-box {
      display: flex;
      justify-content: flex-end;
      height: 70px;
      align-items: center;
    }
  }
</style>
