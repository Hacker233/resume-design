<template>
  <div class="my-integral-box">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleChange">
      <el-tab-pane label="我的简币" name="myIntegral">
        <div class="my-integral-info-box">
          <div class="integral-line">
            <span>可用简币：</span>
            <p
              >{{ appStore.useUserInfoStore.userIntegralInfo.integralTotal
              }}<img width="24" src="@/assets/images/jianB.png" alt="简币"
            /></p>
            <div class="get-bi-method" @click="openGetDialog">获取简币</div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="购买简币" name="buyIntegral">
        <buy-integral></buy-integral>
      </el-tab-pane>
      <el-tab-pane label="简币记录" name="integralLog">
        <div v-if="!isShowSkeleton">
          <div v-if="integralList.length" class="integral-log-box">
            <ul>
              <li v-for="(item, index) in integralList" :key="index">
                <span class="time">{{ formatListDate(item.createDate) }}</span>
                <span>{{ item.integral_reason }}</span>
                <p
                  :class="[
                    'integral-value',
                    { 'add-integral': item.integral_value > 0 },
                    { 'sub-integral': item.integral_value < 0 }
                  ]"
                  >{{ getFormatIntegral(item.integral_value) }}
                  <img src="@/assets/images/jianB.png" alt="" />
                </p>
              </li>
            </ul>
          </div>

          <!-- 无数据页 -->
          <template v-else>
            <div class="audit-no-data-box">
              <no-data-vue width="200px" height="200px"></no-data-vue>
            </div>
          </template>
        </div>
        <el-skeleton v-else :rows="5" animated />

        <!-- 分页组件 -->
        <Pagination
          v-if="total > limit"
          :limit="limit"
          :total="total"
          :current-page="currentPage"
          @handle-current-change="handleCurrentChange"
        ></Pagination>
      </el-tab-pane>
      <el-tab-pane label="订单信息" name="orderList">
        <order-list></order-list>
      </el-tab-pane>
    </el-tabs>

    <!-- 如何获取简币弹窗 -->
    <get-integral-dialog
      :dialog-get-integral-visible="dialogGetIntegralVisible"
      @cancle="cancleDialog"
    ></get-integral-dialog>
  </div>
</template>
<script lang="ts" setup>
  import { getUserIntegralLogsAsync } from '@/http/api/integral';
  import appStore from '@/store';
  import { formatListDate } from '@/utils/common';
  import NoDataVue from '@/components/NoData/NoData.vue';
  import BuyIntegral from '@/components/BuyIntegral/BuyIntegral.vue';
  import OrderList from './components/OrderList.vue';

  const activeName = ref('myIntegral');
  const handleChange = () => {};

  // 查询用户简币信息
  const { getUserIntegralTotal } = appStore.useUserInfoStore;
  const { token } = appStore.useTokenStore;
  if (token) {
    getUserIntegralTotal();
  }

  // 查询用户简币记录
  const integralList = ref<Array<any>>([]);
  const page = ref<number>(1);
  const limit = ref<number>(8);
  const total = ref<number>(0);
  const currentPage = ref<number>(1);
  const isShowSkeleton = ref<boolean>(true);
  const getUserIntegralLogs = async () => {
    let params = {
      page: page.value,
      limit: limit.value
    };
    const data = await getUserIntegralLogsAsync(params);
    if (data.data.status === 200) {
      integralList.value = data.data.data.list;
      total.value = data.data.data.page.count;
      currentPage.value = data.data.data.page.currentPage;
      isShowSkeleton.value = false;
    } else {
      isShowSkeleton.value = false;
      ElMessage.error(data.data.message);
    }
  };
  getUserIntegralLogs();

  // 改变页码时
  const handleCurrentChange = (currentPage: number) => {
    page.value = currentPage;
    getUserIntegralLogs();
  };

  // 返回格式化后的简币展示
  const getFormatIntegral = (value: number) => {
    if (value > 0) {
      return '+' + value;
    } else {
      return value;
    }
  };

  // 打开获取简币弹窗
  const dialogGetIntegralVisible = ref<boolean>(false);
  const openGetDialog = () => {
    dialogGetIntegralVisible.value = true;
  };

  // 关闭弹窗
  const cancleDialog = () => {
    dialogGetIntegralVisible.value = false;
  };
</script>
<style lang="scss" scoped>
  .my-integral-box {
    :deep(.el-tabs__content) {
      padding: 0;
    }
    .my-integral-info-box {
      padding-top: 20px;
      .integral-line {
        display: flex;
        align-items: center;
        span {
          margin-right: 10px;
        }
        p {
          padding: 3px 10px;
          text-align: center;
          font-size: 14px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          cursor: pointer;
          -webkit-transition: all 0.2s;
          -moz-transition: all 0.2s;
          -ms-transition: all 0.2s;
          transition: all 0.2s;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          img {
            margin-left: 10px;
          }
        }
        .get-bi-method {
          font-size: 12px;
          border: 1px solid burlywood;
          padding: 2px 5px;
          border-radius: 10px;
          cursor: pointer;
          color: burlywood;
          margin-left: 5px;
          margin-top: 2px;
          transition: all 0.3s;
          &:hover {
            opacity: 0.7;
          }
        }
      }
    }

    .integral-log-box {
      ul {
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          color: #333;
          height: 50px;
          border-bottom: 1px solid #eee;
          .add-integral {
            color: green;
            letter-spacing: 2px;
          }
          .sub-integral {
            color: red;
            letter-spacing: 2px;
          }
          .integral-value {
            display: flex;
            align-items: center;
            width: 110px;
            display: flex;
            justify-content: flex-end;
            img {
              width: 24px;
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
</style>
