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
</template>
<script lang="ts" setup>
  import BuyQrCodeDialog from '@/components/BuyQrcodeDialog/index.vue';

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
  const dialogQrcodeVisible = ref<boolean>(false);
  const getOrderQrcode = async () => {
    dialogQrcodeVisible.value = true;
  };

  // 支付成功
  const handlePaySuccess = () => {
    dialogQrcodeVisible.value = false;
    emit('paySuccess');
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
</style>
