<!-- 简币充值弹窗 -->
<template>
  <el-dialog
    :model-value="dialogBuyIntegralVisible"
    class="pay-integral-dialog-box"
    width="880px"
    :show-close="true"
    :close-on-click-modal="false"
    :before-close="handleBeforeClose"
    append-to-body
  >
    <!-- 标题 -->
    <template #header>
      <div class="get-integral-header-box">
        简币购买<img width="24" src="@/assets/images/jianB.png" alt="简币" />
      </div>
    </template>
    <!-- 充值内容 -->
    <div class="get-integral-content-box">
      <buy-integral @pay-success="hanldePaySuccess"></buy-integral>
    </div>
  </el-dialog>
</template>
<script lang="ts" setup>
  const emit = defineEmits(['cancle', 'confirm']);
  interface TDialog {
    dialogBuyIntegralVisible: boolean;
  }
  withDefaults(defineProps<TDialog>(), {
    dialogBuyIntegralVisible: false
  });

  // 关闭前回调
  const handleBeforeClose = () => {
    emit('cancle');
  };

  // 充值成功
  const hanldePaySuccess = () => {
    emit('cancle');
  };
</script>
<style lang="scss">
  .pay-integral-dialog-box {
    .get-integral-header-box {
      display: flex;
      align-items: center;
      font-size: 18px;
      letter-spacing: 2px;
      font-weight: 600;
      img {
        margin: 0 5px;
      }
    }
    .get-integral-content-box {
      margin-bottom: 20px;
      .current-total {
        margin-bottom: 30px;
        font-size: 12px;
        color: #777777;
        display: flex;
        align-items: center;
        padding-bottom: 10px;
        border-bottom: none;
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
  }
</style>
