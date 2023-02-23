<template>
  <el-dialog
    :model-value="dialogPayTipsVisible"
    width="500px"
    :show-close="false"
    class="pay-tips-dialog"
    append-to-body
    @close="closeDialog"
  >
    <template #header>
      <h1>提示</h1>
    </template>
    <div class="pay-tips-dialog-box">
      <p class="p-1">该文章仅限于购买了源码的用户阅读！</p>
      <p class="p-2">
        如果您已经购买了源码，请及时添加作者微信，并且提供网站注册邮箱，网站作者将为您开通权限！
      </p>
      <img class="auth-vx" src="@/assets/images/vx.jpg" alt="作者微信" />
      <div class="button" @click="getCode"> 源码获取 </div>
    </div>
  </el-dialog>
</template>
<script lang="ts" setup>
  const emit = defineEmits(['closeDialog']);

  interface TDialog {
    dialogPayTipsVisible: boolean;
  }
  withDefaults(defineProps<TDialog>(), {
    dialogPayTipsVisible: false
  });

  // 关闭弹窗回调
  const closeDialog = () => {
    emit('closeDialog');
  };

  // 源码获取
  const router = useRouter();
  const getCode = () => {
    router.push({
      path: '/webCode'
    });
  };
</script>
<style lang="scss">
  .pay-tips-dialog {
    .el-dialog__header {
      margin: 0;
      display: flex;
      justify-content: center;
      h1 {
        font-size: 20px;
        letter-spacing: 2px;
        color: #333;
      }
    }
    .pay-tips-dialog-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .p-1 {
        text-align: center;
        letter-spacing: 1px;
        margin-bottom: 20px;
      }
      .p-2 {
        width: 80%;
        display: felx;
        align-items: center;
        justify-content: center;
        padding: 5px;
        letter-spacing: 2px;
        line-height: 1.5;
        background-color: #e1ebdd;
        border-radius: 5px;
        font-size: 12px;
        text-align: center;
        color: rgb(172, 38, 38);
        margin-bottom: 20px;
      }
      .auth-vx {
        width: 100px;
      }
      .button {
        width: 100px;
        height: 32px;
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #00c090;
        text-align: center;
        color: #fff;
        font-size: 12px;
        border-radius: 52px;
        cursor: pointer;
        -webkit-transition: all 0.2s;
        -moz-transition: all 0.2s;
        -ms-transition: all 0.2s;
        transition: all 0.2s;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
</style>
