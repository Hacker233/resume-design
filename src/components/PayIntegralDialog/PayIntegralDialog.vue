<template>
  <el-dialog
    :model-value="dialogGetIntegralVisible"
    class="get-integral-dialog-box"
    width="500px"
    :show-close="true"
    :close-on-click-modal="true"
    :before-close="handleBeforeClose"
    append-to-body
  >
    <!-- 标题 -->
    <template #header>
      <div class="get-integral-header-box">
        确定消费{{ payNumber }}<img width="24" src="@/assets/images/jianB.png" alt="简币" />
        {{ placeholder }}？
      </div>
    </template>
    <div class="get-integral-content-box">
      <!-- 当前简币数量 -->
      <div class="current-total">
        （当前简币数量：{{ appStore.useUserInfoStore.userIntegralInfo.integralTotal }}
        <img width="18" src="@/assets/images/jianB.png" alt="简币" />）
        <div class="get-bi-method" @click="openGetDialog">获取简币</div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancle">取消</el-button>
        <el-button type="primary" @click="confirmDialog">确定</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 如何获取简币弹窗 -->
  <get-integral-dialog
    :dialog-get-integral-visible="dialogGetIntegralVisibleMethods"
    @cancle="cancleDialog"
  ></get-integral-dialog>
</template>
<script lang="ts" setup>
  import appStore from '@/store';

  const emit = defineEmits(['cancle', 'confirm']);
  interface TDialog {
    dialogGetIntegralVisible: boolean;
    payNumber: number;
    placeholder: string;
  }
  withDefaults(defineProps<TDialog>(), {
    dialogGetIntegralVisible: false,
    payNumber: 0,
    placeholder: '下载该模板'
  });

  // 关闭前回调
  const handleBeforeClose = () => {
    emit('cancle');
  };

  // 确定弹窗
  const confirmDialog = () => {
    emit('confirm');
  };

  // 取消弹窗
  const cancle = () => {
    emit('cancle');
  };

  // 打开获取简币弹窗
  const dialogGetIntegralVisibleMethods = ref<boolean>(false);
  const openGetDialog = () => {
    dialogGetIntegralVisibleMethods.value = true;
  };

  // 关闭弹窗
  const cancleDialog = () => {
    dialogGetIntegralVisibleMethods.value = false;
  };
</script>
<style lang="scss">
  .get-integral-dialog-box {
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
    .el-dialog__body {
      padding: 0 20px;
    }
    .get-integral-content-box {
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
