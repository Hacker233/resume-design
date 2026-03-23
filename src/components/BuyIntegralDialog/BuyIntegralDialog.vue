<!-- 简币充值弹窗 -->
<template>
  <el-dialog
    :model-value="dialogBuyIntegralVisible"
    class="get-integral-dialog-box"
    width="620px"
    :show-close="true"
    :close-on-click-modal="false"
    :before-close="handleBeforeClose"
    append-to-body
  >
    <!-- 标题 -->
    <template #header>
      <div class="get-integral-header-box">
        简币购买
        <img
          width="18"
          src="@/assets/images/jianB.png"
          alt="简币"
          title="简币 - 您的专属虚拟货币"
        />
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
  .get-integral-dialog-box {
    width: 620px;

    & .el-dialog__header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 10px 16px;
      padding-right: 40px;
      border-bottom: none;

      .el-dialog__headerbtn {
        color: #ffffff;
        font-size: 18px;
        top: 10px;
        right: 10px;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s ease;

        &:hover {
          color: #f0f0f0;
          background: rgba(255, 255, 255, 0.2);
        }
      }
    }

    .get-integral-header-box {
      font-size: 14px;
      font-weight: 600;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 5px;

      img {
        width: 16px;
        height: 16px;
      }
    }

    .el-dialog__body {
      padding: 12px;
      background: #fafbfc;
    }
    
    .get-integral-content-box {
      .content-box {
        background: #ffffff;
        border-radius: 8px;
        padding: 10px;
        margin-bottom: 8px;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.04);

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
</style>
