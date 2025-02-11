<template>
  <div class="product-price-box">
    <!-- 动态渲染权益卡片 -->
    <div v-for="(plan, index) in pricePlans" :key="index" class="card">
      <div class="top" :style="{ backgroundColor: plan.buttonColor }">
        <h3>{{ plan.title }}</h3>
        <div :class="['price-box', { 'price-pay': index !== 0 }]">
          <span>￥</span>
          <p>{{ plan.price }}</p>
        </div>
        <div class="button button-pay" @click="handleButtonClick(plan)">
          {{ plan.buttonText }}
        </div>
      </div>
      <div class="center">
        <ul>
          <li v-for="(feature, i) in plan.features" :key="i">
            {{ feature.text }}
            <template v-if="feature.desc">
              <span>{{ feature.desc }}</span>
            </template>
            <template v-else>
              <svg-icon
                v-if="feature.included"
                icon-name="icon-duigou_kuai"
                color="#2ddd9d"
                size="22px"
              />
              <svg-icon v-else icon-name="icon-shanchu_huaban" color="#333" size="16px" />
            </template>
          </li>
        </ul>
      </div>
      <div class="bottom">
        <p>{{ plan.bottomText }}</p>
        <span v-if="plan.bottomDesc">{{ plan.bottomDesc }}</span>
      </div>
    </div>

    <!-- 购买弹窗 -->
    <el-dialog v-model="dialogVisible" class="pay-dialog-wrapper" width="500px" destroy-on-close>
      <div class="pay-img-box">
        <img :src="imgSrc" alt="购买" />
      </div>
      <div class="pay-tips">
        <p>支付成功后，添加作者微信，凭支付记录获取相关权限！</p>
        <p class="vx">作者微信：LHQfighting（备注“猫步简历”）</p>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
  import { pricePlans } from './pricePlans'; // 引入权益配置
  import type { PricePlan } from './pricePlans'; // 引入PricePlan类型

  const dialogVisible = ref<boolean>(false);
  const imgSrc = ref<string>('');

  // 处理按钮点击事件
  const handleButtonClick = (plan: PricePlan) => {
    switch (plan.title) {
      case '免费版':
        window.open('https://github.com/Hacker233/resume-design', '_blank');
        break;
      case '基础版':
        imgSrc.value = 'https://maobucv.com:9000/resume/logo/vx-pay1.jpg';
        dialogVisible.value = true;
        break;
      case '升级版':
        imgSrc.value = 'https://maobucv.com:9000/resume/logo/vx-pay399.jpg';
        dialogVisible.value = true;
        break;
      case '永久更新版':
        imgSrc.value = 'https://maobucv.com:9000/resume/logo/vx-pay699.jpg';
        dialogVisible.value = true;
        break;
      default:
        break;
    }
  };
</script>
<style lang="scss" scoped>
  .product-price-box {
    display: flex;
    justify-content: center;
    margin: 60px 0 150px 0;
    .card {
      width: 330px;
      min-height: 500px;
      background-color: #ffffff;
      box-shadow: 0px 5px 4px 0px rgba(74, 75, 77, 0.08);
      border-radius: 6px;
      flex-shrink: 0;
      margin: 0 20px;
      overflow: hidden;
      transition: all 0.3s;
      &:hover {
        box-shadow: 5px 5px 20px rgba(203, 205, 211, 0.5);
      }
      .top {
        width: 100%;
        height: 250px;
        padding: 30px 0;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        opacity: 0.8;
        h3 {
          margin: 0;
          color: #202327;
          font-size: 24px;
          text-align: center;
          letter-spacing: 1px;
          font-weight: 400;
        }
        .price-box {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          color: #6d7581;
          font-weight: 600;

          span {
            font-size: 18px;
            padding-bottom: 5px;
          }
          p {
            font-size: 42px;
            letter-spacing: 1px;
          }
        }

        .price-pay {
          color: #fff;
          font-weight: 600;
        }
        .button {
          width: 110px;
          height: 40px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          letter-spacing: 2px;
          font-size: 14px;
          border-radius: 50px;
          cursor: pointer;
          user-select: none;
        }
        .button-free {
          color: #574537;
          background-color: #e0e7f1;
          cursor: not-allowed;
        }
        .button-pay {
          color: #574537;
          background-color: #fff;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s;
          &:hover {
            opacity: 0.8;
          }
        }
      }
      .color-1 {
        background-color: #ecf1f9;
      }
      .color-2 {
        background-color: #6ed6bd;
      }
      .color-3 {
        background-color: #9a95eb;
      }
      .color-4 {
        background-color: #bd9772;
      }

      .center {
        width: 100%;
        padding: 10px 30px;
        ul {
          display: flex;
          flex-direction: column;
          li {
            position: relative;
            display: flex;
            align-items: center;
            line-height: 40px;
            color: #5f656f;
            justify-content: center;
            font-size: 14px;
            .svg-icon {
              position: absolute;
              right: 0;
              top: 50%;
              transform: translate(0, -50%);
            }
            span {
              position: absolute;
              right: 0;
              top: 50%;
              transform: translate(0, -50%);
            }
          }
        }
      }

      .bottom {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-top: 1px solid #eee;
        height: 80px;
        p {
          font-size: 16px;
          font-weight: bold;
          letter-spacing: 1px;
        }
        span {
          font-size: 12px;
          color: #727272;
          margin-top: 10px;
        }
      }
    }

    .pay-img-box {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      img {
        width: 300px;
        height: 420px;
        border-radius: 5px;
        box-shadow: 0px 16px 22px 2px rgb(0 37 58 / 10%);
      }
    }
    .pay-tips {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p {
        line-height: 2;
      }
      .vx {
        font-size: 16px;
        font-weight: 600;
      }
    }
  }
</style>
