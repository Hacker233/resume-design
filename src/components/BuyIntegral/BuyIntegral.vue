<template>
  <div class="buy-integral-box">
    <!-- 当前简币数量 -->
    <div class="content-box integral-display">
      <div class="section-header">
        <span class="section-title">您当前简币数量</span>
      </div>
      <div class="integral-value">
        {{ formatNumberWithCommas(appStore.useUserInfoStore.userIntegralInfo.integralTotal) }}
        <img width="20" src="@/assets/images/jianB.png" alt="简币" />
      </div>
    </div>

    <!-- 套餐选择 -->
    <div class="content-box">
      <div class="section-header">
        <span class="section-title">💰 充值金额</span>
      </div>
      <div class="card-box">
        <div
          v-for="(item, index) in packageList"
          :key="index"
          :class="['package-card', { 'package-card-active': radio === item.id }]"
          @click="selectPackage(item)"
        >
          <div class="package-card-content">
            <div class="package-header">
              <div class="package-price">
                <span class="price-symbol">￥</span>
                <span class="price-value">{{ item.price }}</span>
              </div>
              <div class="package-radio">
                <div :class="['radio-circle', { 'radio-checked': radio === item.id }]"></div>
              </div>
            </div>
            <div class="package-integral">
              <span class="integral-value">{{ item.integralNum }}</span>
              <img width="14" height="14" src="@/assets/images/jianB.png" alt="简币" />
            </div>
          </div>
        </div>
        <div
          :class="['package-card', 'custom-card', { 'package-card-active': radio === 'custom' }]"
          @click="selectCustomPackage"
        >
          <div class="package-card-content">
            <div class="package-header">
              <div class="package-price custom-price">自定义金额</div>
              <div class="package-radio">
                <div :class="['radio-circle', { 'radio-checked': radio === 'custom' }]"></div>
              </div>
            </div>
            <div class="package-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        <!-- 自定义输入框 -->
        <div v-if="radio === 'custom'" class="custom-input-box">
          <div class="input-row">
            <div class="input-label">
              <span class="input-currency">￥</span>
              <span class="input-title">自定义金额</span>
            </div>
            <div class="custom-input-container">
              <input
                type="number"
                v-model="totalAmount"
                min="0.1"
                step="0.1"
                @change="handleChange(Number(($event.target as HTMLInputElement).value))"
                class="custom-input"
              />
            </div>
          </div>
          <p class="input-hint">单次充值金额限制：支付宝≤200元，微信≤150元</p>
        </div>
    </div>

    <!-- 充值方式 -->
    <div class="content-box">
      <div class="section-header">
        <span class="section-title">💳 充值方式</span>
      </div>
      <div class="pay-way-box">
        <div
          :class="['pay-way-item', { 'pay-active': payType === 'zfb' }]"
          @click="selectPayWay('zfb')"
        >
          <img src="@/assets/images/pay/zfb1.png" alt="支付宝" />
          <span class="pay-way-name">支付宝</span>
        </div>
        <div
          :class="['pay-way-item', { 'pay-active': payType === 'wxpay' }]"
          @click="selectPayWay('wxpay')"
        >
          <img src="@/assets/images/pay/wxpay.png" alt="微信支付" />
          <span class="pay-way-name">微信支付</span>
        </div>
      </div>
    </div>

    <!-- 将获得简币 -->
    <div class="content-box integral-total-box">
      <div class="section-header">
        <span class="section-title">🎁 获得简币</span>
      </div>
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
    <div class="content-box">
      <div class="pay-button">
        <el-button size="large" type="primary" :disabled="payDisabled" @click="getOrderQrcode"
          >立即充值</el-button
        >
      </div>
    </div>
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
  import appStore from '@/store';
  import { formatNumberWithCommas } from '@/utils/common';

  const emit = defineEmits(['paySuccess', 'cancel']);

  const packageList = [
    {
      id: '1',
      price: 1, // 套餐价格
      integralNum: 10 // 所获得的简币
    },
    {
      id: '2',
      price: 5, // 套餐价格
      integralNum: 50 // 所获得的简币
    },
    {
      id: '3',
      price: 10, // 套餐价格
      integralNum: 100 // 所获得的简币
    },
    {
      id: '4',
      price: 20, // 套餐价格
      integralNum: 200 // 所获得的简币
    },
    {
      id: '5',
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

  // 选择套餐
  const selectPackage = (item: any) => {
    radio.value = item.id;
    totalAmount.value = item.price;
  };

  // 选择自定义套餐
  const selectCustomPackage = () => {
    radio.value = 'custom';
    totalAmount.value = 0.1;
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

  // 增加金额
  const incrementAmount = () => {
    totalAmount.value = Number((totalAmount.value + 0.1).toFixed(1));
  };

  // 减少金额
  const decrementAmount = () => {
    if (totalAmount.value > 0.1) {
      totalAmount.value = Number((totalAmount.value - 0.1).toFixed(1));
    }
  };

  // 点击充值按钮
  const dialogQrcodeVisible = ref<boolean>(false); // 支付宝
  const dialogWXQrcodeVisible = ref<boolean>(false); // 微信
  const getOrderQrcode = async () => {
    if (payType.value === 'zfb') {
      if (totalAmount.value > 200) {
        ElMessage.error('单次充值金额不能超过200元哦~');
        return;
      }
      dialogQrcodeVisible.value = true;
    } else if (payType.value === 'wxpay') {
      if (totalAmount.value > 150) {
        ElMessage.error('单次充值金额不能超过150元哦~');
        return;
      }
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
    gap: 8px;
    
    .content-box {
      background: #ffffff;
      border-radius: 8px;
      padding: 12px;
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.04);
      
      &.integral-display {
        text-align: center;
        padding: 20px 12px 12px 12px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: #ffffff;

        .section-header {
          margin-bottom: 16px;
          padding-bottom: 0;
          border-bottom: none;

          .section-title {
            font-size: 14px;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.9);
          }

          &::after {
            display: none;
          }
        }

        .integral-value {
          font-size: 36px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;

          img {
            width: 24px;
            height: 24px;
          }
        }
      }
      
      .section-header {
        margin-bottom: 12px;
        padding-bottom: 8px;
        border-bottom: 2px solid #e2e8f0;
        position: relative;

        .section-title {
          font-size: 16px;
          font-weight: 700;
          color: #2d3748;
          position: relative;
          display: inline-block;
        }

        &::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          border-radius: 1px;
        }
      }
    }
    
    .card-box {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      
      .package-card {
        border: 2px solid #e2e8f0;
        border-radius: 6px;
        padding: 6px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
        text-align: center;
        position: relative;
        background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
        min-height: 52px;
        max-height: 75px;
        overflow: hidden;
        
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        
        &::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        &:hover {
          border-color: #667eea;
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.2);
          transform: translateY(-4px);
          
          &::before {
            transform: scaleX(1);
          }
          
          &::after {
            opacity: 1;
          }
        }
        
        &.package-card-active {
          border-color: #667eea;
          background: linear-gradient(135deg, #f0f4ff 0%, #e8eef8 100%);
          box-shadow: 0 4px 16px rgba(102, 126, 234, 0.25);
          
          &::before {
            transform: scaleX(1);
          }
          
          .package-price .price-value {
            color: #667eea;
          }
          
          .package-integral .integral-value {
            color: #667eea;
          }
        }
        
        .package-card-content {
          display: flex;
          flex-direction: column;
          gap: 6px;
          position: relative;
          z-index: 2;
          height: 100%;
          justify-content: center;
        }
        
        .package-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2px;
        }
        
        .package-price {
          display: flex;
          align-items: baseline;
          gap: 1px;
          flex-wrap: nowrap;
          
          .price-symbol {
            font-size: 11px;
            font-weight: 600;
            color: #666;
          }
          
          .price-value {
            font-size: 18px;
            font-weight: 800;
            color: #2d3748;
            transition: color 0.3s ease;
          }
        }
        
        .package-radio {
          .radio-circle {
            width: 16px;
            height: 16px;
            border: 2px solid #cbd5e0;
            border-radius: 50%;
            transition: all 0.3s ease;
            position: relative;
            
            &.radio-checked {
              border-color: #667eea;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              
              &::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 6px;
                height: 6px;
                background: #fff;
                border-radius: 50%;
              }
            }
          }
        }
        
        .package-integral {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2px;
          font-size: 11px;
          color: #718096;
          flex-wrap: nowrap;
          
          .integral-value {
            font-weight: 700;
            color: #667eea;
            font-size: 15px;
            transition: color 0.3s ease;
          }
        }
        
        .package-desc {
          font-size: 10px;
          color: #a0aec0;
          font-weight: 500;
        }
        
        .package-icon {
          margin-top: 2px;
          color: #667eea;
          opacity: 0.8;
        }
        
        &.custom-card {
          border: 2px dashed #b2b9d6;
          
          .package-card-content {
            gap: 8px;
          }
          
          .package-price.custom-price {
            font-size: 16px;
            font-weight: 700;
            color: #667eea;
          }
          
          .package-icon {
            margin-top: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
      
      .custom-input-box {
        grid-column: span 2;
        padding: 6px;
        border: 2px solid #667eea;
        border-radius: 6px;
        background: linear-gradient(135deg, #f0f4ff 0%, #ffffff 100%);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        min-height: 52px;
        max-height: 75px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 4px;
        
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        }
        
        .input-row {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
        }
        
        .input-label {
          display: flex;
          align-items: center;
          gap: 4px;
          min-width: 80px;
          
          .input-currency {
            font-size: 16px;
            font-weight: 800;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .input-title {
            font-size: 12px;
            font-weight: 600;
            color: #667eea;
          }
        }
        
        .custom-input-container {
          display: flex;
          align-items: center;
          gap: 6px;
          flex: 1;
          max-width: 140px;
        }
        
        .custom-input {
          flex: 1;
          height: 32px;
          padding: 0 10px;
          border: 2px solid #e2e8f0;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          color: #2d3748;
          background: #ffffff;
          transition: all 0.3s ease;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
          
          &:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.12);
          }
          
          &:hover {
            border-color: #667eea;
            box-shadow: 0 2px 8px rgba(102, 126, 234, 0.15);
          }
        }
        
        .custom-controls {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .control-btn {
          width: 24px;
          height: 24px;
          border: 2px solid #e2e8f0;
          border-radius: 50%;
          background: #ffffff;
          color: #667eea;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 0;
          
          &:hover {
            background: #667eea;
            color: #ffffff;
            border-color: #667eea;
            transform: scale(1.05);
          }
          
          &:active {
            transform: scale(0.95);
          }
          
          &.decrement {
            margin-top: 2px;
          }
        }
        
        .input-hint {
          font-size: 10px;
          color: #718096;
          line-height: 1.2;
          text-align: left;
          margin-top: 2px;
        }
      }
    }
    
    .pay-way-box {
        display: flex;
        align-items: center;
        gap: 20px;
        
        .pay-way-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          width: 120px;
          height: 70px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          padding: 10px;
          cursor: pointer;
          user-select: none;
          transition: all 0.2s ease;
          background-color: #fff;
          
          &:hover {
            border-color: #667eea;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
            transform: translateY(-2px);
          }
          
          img {
            width: 50px;
            height: 50px;
            object-fit: contain;
          }
          
          .pay-way-name {
            font-size: 12px;
            color: #718096;
            font-weight: 500;
          }
        }
        
        .pay-active {
          border-color: #667eea;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
          background-color: rgba(102, 126, 234, 0.05);
          
          .pay-way-name {
            color: #667eea;
            font-weight: 600;
          }
        }
      }
    
    .integral-total-box {
      .integral-num {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        
        span {
          font-size: 24px;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: 1px;
        }
        
        img {
          animation: bounce 2s infinite;
        }
      }
    }
    
    .pay-button {
      display: flex;
      justify-content: center;
      
      .el-button {
        width: 200px;
        height: 44px;
        font-size: 16px;
        font-weight: 600;
        border-radius: 22px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        transition: all 0.2s ease;
        
        &:hover {
          opacity: 0.9;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }
        
        &:active {
          transform: translateY(0);
        }
      }
    }
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-8px);
    }
    60% {
      transform: translateY(-4px);
    }
  }
  
  /* 响应式设计 */
  @media screen and (max-width: 768px) {
    .buy-integral-box {
      .card-box {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .pay-way-box {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
        
        .pay-way-item {
          width: 100%;
          max-width: 140px;
        }
      }
      
      .integral-display {
        .integral-value {
          font-size: 30px;
        }
      }
      
      .integral-total-box {
        .integral-num {
          span {
            font-size: 20px;
          }
        }
      }
      
      .pay-button {
        .el-button {
          width: 100%;
          max-width: 200px;
        }
      }
    }
  }
  
  @media screen and (max-width: 480px) {
    .buy-integral-box {
      .card-box {
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
        
        .package-card {
          padding: 12px;
          min-height: 75px;
          
          .package-price .price-value {
            font-size: 20px;
          }
          
          .package-integral .integral-value {
            font-size: 16px;
          }
        }
      }
    }
  }
</style>
