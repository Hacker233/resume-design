<template>
  <!-- 二维码付费弹窗 -->
  <el-dialog
    class="pay-qrcode-dialog"
    :model-value="dialogWXQrcodeVisible"
    width="400px"
    :show-close="false"
    :close-on-click-modal="false"
    :append-to-body="false"
    @open="handleOpen"
    @close="handleClose"
  >
    <div class="qrcode-box">
      <h3>{{ props.subject }}</h3>
      <div v-loading="loading" class="qrcode-wrapper">
        <qrcode-vue :value="qrCodeLink" :size="220" level="H" foreground="#00c091" />
        <!-- 二维码失效遮罩层 -->
        <div v-if="orderIsFail" class="qrcode-fail">订单已失效</div>
      </div>
      <p>订单金额：{{ props.totalAmount.toFixed(2) }} ￥</p>
      <div class="countdown-box">
        <span v-if="!orderIsFail">
          （请使用微信在3分钟内完成支付：<span v-if="m < 10">0</span>{{ m }}:<span v-if="s < 10"
            >0</span
          >{{ s }}）
        </span>
        <span v-else>（订单已失效）</span>
      </div>
    </div>
    <template #footer>
      <el-button class="cancel-order" @click="cancelOrder">取消订单</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { getPayURLAsync, wxtradeQueryAsync } from '@/http/api/pay';
  import appStore from '@/store';
  import QrcodeVue from 'qrcode.vue';

  const emit = defineEmits(['update:modelValue', 'paySuccess', 'cancel']);

  interface TDialog {
    modelValue: boolean;
    totalAmount: number;
    subject: string;
    orderType: number;
    options: any;
    payType: string;
  }

  const props = withDefaults(defineProps<TDialog>(), {
    modelValue: false,
    totalAmount: 0,
    payType: 'wxpay', // 支付类型
    subject: '购买简币',
    orderType: 1, // 订单类型： 1-充值简币 2-充值会员
    options: {}
  });

  // 双向绑定 modelValue
  const dialogWXQrcodeVisible = ref(props.modelValue);
  watch(
    () => props.modelValue,
    (newVal) => {
      dialogWXQrcodeVisible.value = newVal;
      if (newVal) {
        loading.value = true;
        outTradeNo.value = '';
        orderIsFail.value = false;
      }
    }
  );
  watch(dialogWXQrcodeVisible, (newVal) => {
    emit('update:modelValue', newVal);
  });

  // 获取充值二维码
  const orderIsFail = ref<boolean>(false);
  const outTradeNo = ref<string>(''); // 商户订单号
  const loading = ref<boolean>(true);
  const getOrderQrcode = async () => {
    const params = {
      type: props.payType, // 支付类型
      totalAmount: props.totalAmount,
      subject: props.subject,
      orderType: props.orderType,
      returnUrl: location.origin //回跳转地址
    };
    const data = await getPayURLAsync(params);
    if (data.data.status === 200) {
      qrCodeLink.value = data.data.data.qrcode;
      outTradeNo.value = data.data.data.out_trade_no;
      dialogWXQrcodeVisible.value = true;
      loading.value = false;
    } else {
      ElMessage.error(data.data.message);
      loading.value = false;
    }
  };

  // 二维码链接
  const qrCodeLink = ref<string>('');

  // 取消订单
  const cancelOrder = () => {
    closeDialog();
  };

  // 关闭弹窗逻辑
  const closeDialog = () => {
    dialogWXQrcodeVisible.value = false;
    if (orderTime) {
      clearInterval(orderTime);
    }
    if (settime) {
      clearInterval(settime);
    }
    emit('cancel');
  };

  // 弹窗关闭回调
  const handleClose = () => {
    closeDialog();
  };

  // 弹窗打开回调
  let orderTime: any = '';
  const handleOpen = () => {
    orderIsFail.value = false;
    getOrderQrcode();
    countdown(); // 倒计时
    orderTime = setInterval(() => {
      getOrderInfo();
    }, 3000);
  };

  // 倒计时
  const m = ref<number>(2); // 设置分
  const s = ref<number>(59); // 设置秒
  let settime: any = '';
  const countdown = () => {
    m.value = 2;
    s.value = 59;
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

  // 轮询查询订单信息
  const { getUserIntegralTotal } = appStore.useUserInfoStore;
  const getOrderInfo = async () => {
    const params = {
      outTradeNo: outTradeNo.value,
      orderType: props.orderType,
      subject: props.subject,
      ...props.options
    };
    const data = await wxtradeQueryAsync(params);
    if (data.data.status === 200) {
      const orderInfo = data.data.data;
      console.log('订单信息', orderInfo);
      if (orderInfo.code == '0') {
        ElMessage.error('创建订单失败');
        closeDialog();
      } else {
        if (orderInfo.status == '0') {
          // 交易创建，等待买家付款
          console.log('等待付款');
          return;
        } else if (orderInfo.status == '1') {
          // 支付成功
          dialogWXQrcodeVisible.value = false;
          outTradeNo.value = '';
          if (orderTime) {
            clearInterval(orderTime);
          }
          ElMessage.success('支付成功');
          emit('paySuccess');
          // 查询用简币信息
          getUserIntegralTotal();
        }
      }
    }
    //  else {
    //   ElMessage.error(data.data.message);
    //   closeDialog();
    //   return;
    // }
  };

  // 销毁
  onBeforeUnmount(() => {
    if (settime) {
      clearInterval(settime);
    }
  });
</script>

<style lang="scss" scoped>
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
      margin-bottom: 10px;

      .qrcode-fail {
        width: 100%;
        height: 100%;
        font-size: 16px;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        backdrop-filter: blur(1px);
        border-radius: 3px;
        color: rgb(255, 255, 255);
      }
    }
  }

  .countdown-box {
    font-size: 12px;
    color: #e6a23c;
    margin-top: 10px;
  }

  .cancel-order {
    width: 100%;
    height: 40px;
    font-size: 16px;
    letter-spacing: 2px;
  }
</style>
<style lang="scss">
  // 弹窗样式
  .pay-qrcode-dialog {
    .el-dialog__header {
      display: none;
    }
  }
</style>
