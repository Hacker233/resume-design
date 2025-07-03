<template>
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
      <p class="subject">{{ props.subject }}</p>
      <p class="totalAmount">￥{{ props.totalAmount.toFixed(2) }} </p>
      <div v-loading="loading" class="qrcode-wrapper">
        <qrcode-vue :value="qrCodeLink" :size="300" level="H" foreground="#333" />
        <!-- 二维码失效遮罩层 -->
        <div v-if="orderIsFail" class="qrcode-fail">订单已失效</div>
      </div>
      <div class="countdown-box">
        <span v-if="!orderIsFail">
          （请使用支付宝在5分钟内完成支付：<span v-if="m < 10">0</span>{{ m }}:<span v-if="s < 10"
            >0</span
          >{{ s }}）
        </span>
        <span v-else>（订单已失效）</span>
      </div>

      <el-button class="cancel-order" @click="cancelOrder">取消订单</el-button>

      <div class="wx-tip">请使用支付宝扫码支付</div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { aliPayAsync, tradeCloseAsync, tradeQueryAsync } from '@/http/api/integral';
  import appStore from '@/store';
  import { ElMessageBox, ElNotification } from 'element-plus';
  import QrcodeVue from 'qrcode.vue';

  const emit = defineEmits(['update:modelValue', 'paySuccess', 'cancel']);

  interface TDialog {
    modelValue: boolean;
    totalAmount: number;
    subject: string;
    orderType: number;
    options: any;
    membershipType?: string; // 购买的会员类型
  }

  const props = withDefaults(defineProps<TDialog>(), {
    modelValue: false,
    totalAmount: 0,
    subject: '购买简币',
    orderType: 1, // 订单类型： 1-充值简币 2-充值会员
    options: {},
    membershipType: '' // 购买的会员类型
  });

  // 双向绑定 modelValue
  const dialogQrcodeVisible = ref(props.modelValue);
  watch(
    () => props.modelValue,
    (newVal) => {
      dialogQrcodeVisible.value = newVal;
      if (newVal) {
        loading.value = true;
        outTradeNo.value = '';
        orderIsFail.value = false;
      }
    }
  );
  watch(dialogQrcodeVisible, (newVal) => {
    emit('update:modelValue', newVal);
  });

  // 获取充值二维码
  const orderIsFail = ref<boolean>(false);
  const outTradeNo = ref<string>(''); // 商户订单号
  const loading = ref<boolean>(true);
  const getOrderQrcode = async () => {
    const params = {
      totalAmount: props.totalAmount,
      subject: props.subject,
      orderType: props.orderType,
      membershipType: props.membershipType || '' // 购买的会员类型
    };
    const data = await aliPayAsync(params);
    if (data.data.status === 200) {
      qrCodeLink.value = data.data.data.qrCode;
      outTradeNo.value = data.data.data.outTradeNo;
      dialogQrcodeVisible.value = true;
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
    tradeClose(); // 关闭交易
    closeDialog();
  };

  // 关闭交易
  const tradeClose = async () => {
    if (outTradeNo.value) {
      const params = {
        outTradeNo: outTradeNo.value
      };
      const data = await tradeCloseAsync(params);
      if (data.data.status === 200) {
        outTradeNo.value = '';
      } else {
        ElMessage.error(data.data.message);
      }
    }
  };

  // 关闭弹窗逻辑
  const closeDialog = () => {
    dialogQrcodeVisible.value = false;
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
  const m = ref<number>(4); // 设置分
  const s = ref<number>(59); // 设置秒
  let settime: any = '';
  const countdown = () => {
    m.value = 4;
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
  const { getUserIntegralTotal, getAndUpdateUserInfo } = appStore.useUserInfoStore;
  const getOrderInfo = async () => {
    const params = {
      outTradeNo: outTradeNo.value,
      subject: props.subject,
      orderType: props.orderType,
      ...props.options
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
          emit('paySuccess');
          // 查询用简币信息
          getUserIntegralTotal();
          // 查询用户信息
          getAndUpdateUserInfo();
          ElNotification({
            title: '支付成功',
            message: '您的支付已成功',
            type: 'success'
          });
          // 支付成功，是否立即刷新页面
          ElMessageBox.confirm('支付成功，是否立即刷新页面？', '刷新页面', {
            confirmButtonText: '刷新',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // 强制刷新页面
            location.reload();
          });
        }
      }
    } else {
      ElMessage.error(data.data.message);
      closeDialog();
      return;
    }
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
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    text-align: center;
    background: #fff;
    border-radius: 15px;
    box-shadow: 0 5px 15px 0 #ddd;
    overflow: hidden;

    .qrcode-wrapper {
      position: relative;
      width: 300px;
      height: 300px;
      overflow: hidden;
      margin-bottom: 15px;
      transition: transform 0.3s;

      .qrcode-fail {
        width: 100%;
        height: 100%;
        font-size: 16px;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        backdrop-filter: blur(2px);
        border-radius: 10px;
        color: #ff4d4f;
      }
    }
    .subject {
      font-size: 16px;
      color: #000;
    }
    .totalAmount {
      font-size: 40px;
      margin: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .countdown-box {
    font-size: 14px;
    color: #e6a23c;
    margin-top: 15px;
    font-weight: bold;
  }
  .wx-tip {
    font-size: 16px;
    width: 100%;
    background: #222;
    color: #fff;
    padding: 20px;
    letter-spacing: 1px;
  }

  .cancel-order {
    height: 40px;
    font-size: 16px;
    margin: 20px 0;
    letter-spacing: 1px;
    background-color: #f56c6c;
    color: white;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #ff7875;
    }
  }
</style>
<style lang="scss">
  // 弹窗样式
  .pay-qrcode-dialog {
    padding: 30px 0 0 0;
    box-shadow: 0 5px 15px 0 #ddd;
    border-radius: 18px;
    .el-dialog__header {
      display: none;
    }
    .el-dialog__footer {
      display: none;
    }
    .el-dialog__body {
      padding: 0;
    }
  }
</style>
