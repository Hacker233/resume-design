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
      <div class="pay-way-box">
        <div
          :class="['pay-way-zfb', { 'pay-active': payType === 'zfb' }]"
          @click="selectPayWay('zfb')"
        >
          <img src="@/assets/images/pay/zfb.png" alt="支付宝" />
        </div>
        <div
          :class="['pay-way-wx', { 'pay-active': payType === 'wxpay' }]"
          @click="selectPayWay('wxpay')"
        >
          <img src="@/assets/images/pay/wxpay.png" alt="微信支付" />
        </div>
      </div>
    </div>
    <!-- 将获得简币 -->
    <div class="integral-total-box">
      <h3>获得简币</h3>
      <div class="integral-num">
        <span>{{ totalAmount * 10 }}</span>
        <img
          width="24"
          src="@/assets/images/jianB.png"
          alt="简币"
          title="简币 - 您的专属虚拟货币"
        />
      </div>
    </div>
    <!-- 充值按钮 -->
    <div class="pay-button">
      <el-button size="large" type="primary" :disabled="payDisabled" @click="getOrderQrcode"
        >立即充值</el-button
      >
    </div>
  </div>
  <!-- 充值弹窗 -->
  <buy-qr-code-dialog
    :model-value="dialogQrcodeVisible"
    :total-amount="totalAmount"
    :order-type="1"
    :options="{}"
    subject="购买简币"
    @pay-success="handlePaySuccess"
    @cancel="handleCancel"
  ></buy-qr-code-dialog>

  <!-- 微信充值二维码弹窗 -->
  <w-x-buy-qr-code-dialog
    :model-value="dialogWXQrcodeVisible"
    :total-amount="totalAmount"
    :order-type="1"
    pay-type="wxpay"
    :options="{}"
    subject="购买简币"
    @pay-success="handleWXPaySuccess"
    @cancel="handleWXCancel"
  ></w-x-buy-qr-code-dialog>
</template>
<script lang="ts" setup>
  import BuyQrCodeDialog from '@/components/BuyQrcodeDialog/index.vue';
  import WXBuyQrCodeDialog from '@/components/WXBuyQrcodeDialog/index.vue';

  const emit = defineEmits(['paySuccess', 'cancel']);

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
  const payType = ref<string>('zfb');

  // 选择支付方式
  const selectPayWay = (type: string) => {
    payType.value = type;
  };

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
  const dialogQrcodeVisible = ref<boolean>(false); // 支付宝
  const dialogWXQrcodeVisible = ref<boolean>(false); // 微信
  const getOrderQrcode = async () => {
    if (payType.value === 'zfb') {
      dialogQrcodeVisible.value = true;
    } else if (payType.value === 'wxpay') {
      console.log('微信支付');
      dialogWXQrcodeVisible.value = true;
    }
  };

  // 支付成功
  const handlePaySuccess = () => {
    dialogQrcodeVisible.value = false;
    emit('paySuccess');
  };

  // 微信支付成功
  const handleWXPaySuccess = () => {
    dialogWXQrcodeVisible.value = false;
    emit('paySuccess');
  };

  // 微信取消订单
  const handleWXCancel = () => {
    dialogWXQrcodeVisible.value = false;
    emit('cancel');
  };

  // 取消订单
  const handleCancel = () => {
    dialogQrcodeVisible.value = false;
    emit('cancel');
  };
</script>
<style lang="scss" scoped>
  .buy-integral-box {
    display: flex;
    flex-direction: column;
    padding: 3px;
    .package-box {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
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
      .pay-way-box {
        display: flex;
        align-items: center;
        .pay-way-zfb {
          width: 116px;
          height: 40px;
          margin-right: 20px;
          border: 2px solid transparent;
          border-radius: 5px;
          padding: 3px;
          cursor: pointer;
          user-select: none;
          transition: all 0.3s;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .pay-way-wx {
          width: 116px;
          height: 40px;
          border: 2px solid transparent;
          border-radius: 5px;
          padding: 1px;
          cursor: pointer;
          user-select: none;
          transition: all 0.3s;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .pay-active {
          border-color: #00c091;
        }
      }
    }
    .integral-total-box {
      margin-top: 20px;
      border-bottom: 1px solid #eee;
      padding-bottom: 20px;
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
      display: flex;
      justify-content: center;
      .el-button {
        width: 150px;
      }
    }
  }
</style>
