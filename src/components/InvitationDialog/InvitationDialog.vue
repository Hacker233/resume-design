<!-- 邀请注册弹窗 -->
<template>
  <el-dialog
    class="invitation-dialog-box"
    :model-value="dialogInvitationVisible"
    width="500px"
    :show-close="false"
    append-to-body
    @close="cancle"
    @open="handleOpen"
  >
    <!-- 邀请注册海报 -->
    <div class="invitation-page">
      <!-- 邀请码 -->
      <div class="invitation-top">
        <!-- 邀请码 -->
        <div class="invitation-code">
          <span class="code">{{ invitationCode }}</span>
        </div>
        <!-- 复制邀请码 -->
        <div class="copy-invitation-code">
          <div class="copy-button" @click="copyCode"></div>
        </div>
      </div>
      <!-- 邀请人数 -->
      <div class="invitation-bottom">
        <span class="invitation-num">{{ invitationNum }}人</span>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { getInviteCodeAsync } from '@/http/api/invitations';
  import useClipboard from 'vue-clipboard3';
  const emit = defineEmits(['cancle']);
  interface TDialog {
    dialogInvitationVisible: boolean;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogInvitationVisible: false
  });

  watch(
    () => props.dialogInvitationVisible,
    (newVal) => {
      if (newVal) {
        getInviteCode();
      }
    },
    {
      deep: true
    }
  );

  // 邀请人数
  const invitationNum = ref<number>(0);
  // 邀请码
  const invitationCode = ref<string>('');

  // 取消
  const cancle = () => {
    emit('cancle');
  };

  // 复制邀请码
  const { toClipboard } = useClipboard();
  const copyCode = async () => {
    try {
      await toClipboard(invitationCode.value);
      ElMessage.success('复制成功，快去邀请注册吧~');
    } catch (e: any) {
      ElMessage.error(e);
    }
  };

  // 弹窗打开回调
  const handleOpen = () => {
    console.log('弹窗打开回调');
  };

  // 获取专属邀请码
  const getInviteCode = async () => {
    const data = await getInviteCodeAsync();
    if (data.data.status === 200) {
      invitationCode.value = data.data.data.inviteCode;
      invitationNum.value = data.data.data.totalInvited;
    } else {
      ElMessage.error(data.data.message);
    }
  };
</script>
<style lang="scss" scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>
<style lang="scss">
  .invitation-dialog-box {
    .el-dialog__header {
      display: none !important;
    }
    .el-dialog__body {
      padding: 0 !important;
    }
    .invitation-page {
      width: 500px;
      height: 400px;
      background-image: url('@/assets/images/invitation.png');
      background-size: cover;
      display: flex;
      flex-direction: column;
      .invitation-top {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        .invitation-code {
          display: flex;
          justify-content: center;
          height: 70px;
          align-items: center;
          .code {
            font-size: 22px;
            font-weight: 600;
            letter-spacing: 1px;
          }
        }
        .copy-invitation-code {
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          .copy-button {
            margin-top: 13px;
            margin-right: 3px;
            width: 126px;
            height: 39px;
            border-radius: 20px;
            cursor: pointer;
            background: green;
            opacity: 0;
            transition: all 0.3s;
            &:hover {
              opacity: 0.1;
            }
          }
        }
      }
      .invitation-bottom {
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        .invitation-num {
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 18px;
        }
      }
    }
  }
</style>
