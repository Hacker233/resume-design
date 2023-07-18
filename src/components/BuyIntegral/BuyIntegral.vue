<template>
  <div class="buy-integral-box">
    <!-- 套餐选择 -->
    <div class="package-box">
      <h3>充值金额</h3>
      <div class="card-box">
        <el-radio-group v-model="radio">
          <el-radio
            v-for="(item, index) in packageList"
            :key="index"
            :label="item.id"
            size="large"
            border
            @change="handleRadioChange"
            >￥{{ item.price }}</el-radio
          >
          <el-radio label="custom" size="large" border @change="handleCustomRadioChange"
            >自定义</el-radio
          >
        </el-radio-group>
        <!-- 自定义输入框 -->
        <el-input-number
          v-if="radio === 'custom'"
          v-model="totalAmount"
          size="large"
          :min="0.1"
          :step="0.1"
          @change="handleChange"
        />
      </div>
    </div>
    <!-- 充值方式 -->
    <div class="pay-way">
      <h3>充值方式</h3>
      <el-radio-group v-model="payzfb" class="ml-4">
        <el-radio label="zfb" size="default">支付宝</el-radio>
      </el-radio-group>
    </div>
    <!-- 将获得简币 -->
    <div class="integral-total-box">
      <h3>获得简币</h3>
      <div class="integral-num">
        <span>{{ totalAmount * 10 }}</span>
        <img width="24" src="@/assets/images/jianB.png" alt="简币" />
      </div>
    </div>
    <!-- 充值按钮 -->
    <div class="pay-button">
      <el-button size="default" type="primary" :disabled="payDisabled" @click="getOrderQrcode"
        >立即充值</el-button
      >
    </div>

    <!-- 二维码付费弹窗 -->
    <el-dialog
      class="pay-qrcode-dialog"
      :model-value="dialogQrcodeVisible"
      width="400px"
      :show-close="false"
      :close-on-click-modal="false"
      :append-to-body="false"
      @open="handleOpen"
      @close="handleClose"
    >
      <div class="qrcode-box">
        <h3>{{ subject }}</h3>
        <div class="qrcode-wrapper">
          <qrcode-vue :value="qrCodeLink" :size="220" level="H" foreground="#00c091" />
          <!-- 二维码失效遮罩层 -->
          <div v-if="orderIsFail" class="qrcode-fail"> 订单已失效 </div>
        </div>
        <p>订单金额：{{ totalAmount.toFixed(2) }} ￥</p>
        <div class="countdown-box">
          <span v-if="!orderIsFail">
            （请在3分钟内完成支付：<span v-if="m < 10">0</span>{{ m }}:<span v-if="s < 10">0</span
            >{{ s }}）
          </span>
          <span v-else> （订单已失效） </span>
        </div>
      </div>
      <template #footer>
        <el-button class="cancle-order" @click="cancleOrder">取消订单</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
  import { aliPayAsync, tradeCloseAsync, tradeQueryAsync } from '@/http/api/integral';
  import appStore from '@/store';
  import QrcodeVue from 'qrcode.vue';

  const packageList = [
    {
      id: '1',
      price: 1, // 套餐价格
      integralNum: 10 // 所获得的简币
    },
    {
      id: '2',
      price: 10, // 套餐价格
      integralNum: 100 // 所获得的简币
    },
    {
      id: '3',
      price: 20, // 套餐价格
      integralNum: 200 // 所获得的简币
    },
    {
      id: '4',
      price: 30, // 套餐价格
      integralNum: 300 // 所获得的简币
    }
  ];
  // 单选框选中值
  const radio = ref<string>('');

  // 支付方式
  const payzfb = ref<string>('zfb');

  // 单选改变
  const handleRadioChange = (value: string) => {
    const price = packageList.filter((item) => item.id === value)[0];
    totalAmount.value = price.price;
  };

  // 充值按钮是否可用
  const payDisabled = computed(() => {
    return totalAmount.value > 0 ? false : true;
  });

  // 自定义单选改变
  const handleCustomRadioChange = () => {
    totalAmount.value = 0.1;
  };

  // 充值金额
  const totalAmount = ref<number>(0);

  // 自定义金额发生改变
  const handleChange = (value: number) => {
    const temp = Number(value.toFixed(1));
    totalAmount.value = temp;
  };

  // 点击充值按钮
  const orderIsFail = ref<boolean>(false);
  const outTradeNo = ref<string>(''); // 商户订单号
  const getOrderQrcode = async () => {
    const params = {
      totalAmount: totalAmount.value
    };
    const data = await aliPayAsync(params);
    if (data.data.status === 200) {
      qrCodeLink.value = data.data.data.qrCode;
      subject.value = data.data.data.subject;
      outTradeNo.value = data.data.data.outTradeNo;
      dialogQrcodeVisible.value = true;
    } else {
      ElMessage.error(data.data.message);
    }
  };

  // 二维码弹窗
  const dialogQrcodeVisible = ref<boolean>(false);

  // 二维码链接
  const qrCodeLink = ref<string>('');

  // 订单名称
  const subject = ref<string>('');

  // 取消订单
  const cancleOrder = () => {
    tradeClose(); // 关闭交易
    dialogQrcodeVisible.value = false;
    // 取消轮训
    if (orderTime) {
      clearInterval(orderTime);
    }
  };

  // 关闭交易
  const tradeClose = async () => {
    let params = {
      outTradeNo: outTradeNo.value
    };
    const data = await tradeCloseAsync(params);
    if (data.data.status === 200) {
      outTradeNo.value = '';
    } else {
      ElMessage.error(data.data.message);
    }
  };

  // 弹窗关闭回调
  const handleClose = () => {
    // 取消轮训
    if (orderTime) {
      clearInterval(orderTime);
    }
  };

  // 弹窗打开回调
  let orderTime: any = '';
  const handleOpen = () => {
    orderIsFail.value = false;
    countdown(); // 倒计时
    orderTime = setInterval(() => {
      getOrderInfo();
    }, 3000);
  };

  // 倒计时
  const m = ref<number>(2); //设置分
  const s = ref<number>(59); //设置秒
  let settime: any = '';
  const countdown = () => {
    settime = setInterval(() => {
      s.value = s.value - 1;
      // 秒为0
      if (s.value == 0) {
        if (m.value > 0) {
          m.value = m.value - 1;
          s.value = 60;
        } else {
          // 倒计时结束
          orderIsFail.value = true;
          clearInterval(settime);
          if (orderTime) {
            clearInterval(orderTime);
          }
        }
      }
    }, 1000);
  };

  // 轮训查询订单信息
  const { getUserIntegralTotal } = appStore.useUserInfoStore;
  const getOrderInfo = async () => {
    let params = {
      outTradeNo: outTradeNo.value
    };
    const data = await tradeQueryAsync(params);
    if (data.data.status === 200) {
      const orderInfo = data.data.data;
      if (orderInfo.code == 40004) {
        return;
      } else if (orderInfo.code == 10000) {
        if (orderInfo.tradeStatus === 'WAIT_BUYER_PAY') {
          // 交易创建，等待买家付款
          return;
        } else if (orderInfo.tradeStatus === 'TRADE_CLOSED') {
          // 未付款交易超时关闭，或支付完成后全额退款
          if (orderTime) {
            clearInterval(orderTime);
            orderIsFail.value = true;
          }
        } else if (orderInfo.tradeStatus === 'TRADE_FINISHED') {
          // 交易结束，不可退款
          if (orderTime) {
            clearInterval(orderTime);
            orderIsFail.value = true;
          }
        } else if (orderInfo.tradeStatus === 'TRADE_SUCCESS') {
          // 支付成功
          dialogQrcodeVisible.value = false;
          outTradeNo.value = '';
          if (orderTime) {
            clearInterval(orderTime);
          }
          ElMessage.success('支付成功');
          // 查询用简币信息
          getUserIntegralTotal();
        }
      }
    } else {
      return;
    }
  };

  // 销毁
  onBeforeMount(() => {
    if (settime) {
      clearInterval(settime);
    }
    // 关闭交易
    if (outTradeNo.value) {
      tradeClose();
    }
  });
</script>
<style lang="scss" scoped>
  .buy-integral-box {
    display: flex;
    flex-direction: column;
    padding: 3px;
    .package-box {
      display: flex;
      flex-direction: column;
      h3 {
        font-size: 16px;
        letter-spacing: 1px;
      }
      .card-box {
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        :deep(.el-radio) {
          width: 100px;
        }
      }
    }
    .pay-way {
      h3 {
        font-size: 16px;
        letter-spacing: 1px;
      }
    }
    .integral-total-box {
      margin-top: 10px;
      h3 {
        font-size: 16px;
        letter-spacing: 1px;
      }
      .integral-num {
        display: flex;
        align-items: center;
        span {
          margin-right: 10px;
        }
      }
    }
    .pay-button {
      margin-top: 20px;
    }
  }

  // 弹窗样式
  :deep(.pay-qrcode-dialog) {
    .el-dialog__header {
      display: none;
    }
  }
  .qrcode-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    .qrcode-wrapper {
      position: relative;
      width: 220px;
      height: 220px;
      border-radius: 3px;
      overflow: hidden;
      .qrcode-fail {
        width: 100%;
        height: 100%;
        font-size: 16px;
        letter-spacing: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(255, 255, 255, 0.2);
        -webkit-backdrop-filter: blur(8px);
        backdrop-filter: blur(8px);
        box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.2);
      }
    }
    h3 {
      font-size: 16px;
      margin: 20px;
    }
    p {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
      font-size: 16px;
    }
    .countdown-box {
      margin-top: 15px;
      color: red;
      letter-spacing: 1px;
    }
  }
  .cancle-order {
    width: 100%;
    height: 40px;
    font-size: 16px;
    letter-spacing: 2px;
  }
</style>
