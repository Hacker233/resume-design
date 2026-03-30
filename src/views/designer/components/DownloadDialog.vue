<!-- 下载简历弹窗 -->
<template>
  <el-dialog
    class="download-resume-dialog"
    :model-value="dialogDownloadVisible"
    title="下载简历"
    width="720px"
    append-to-body
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <div class="download-content">
      <!-- 下载选项列表 -->
      <div class="download-options">
        <!-- 下载图片 -->
        <DownloadOptionCard
          type="img"
          icon="icon-tupian"
          title="下载图片"
          description="适合微信、QQ发送"
          gradient="purple"
          :is-free-mode="userInfo.isAllFree"
          :is-member="membershipInfo.hasMembership && !membershipInfo.isExpired"
          :can-download="isCanDownloadImg"
          :price="exportImgPayIntegral"
          @click="handleDownload('img')"
        />

        <!-- 下载PDF -->
        <DownloadOptionCard
          type="pdf"
          icon="icon-pdf"
          title="下载PDF"
          description="适合打印、在线投递等"
          :is-recommended="true"
          gradient="orange"
          :is-free-mode="userInfo.isAllFree"
          :is-member="membershipInfo.hasMembership && !membershipInfo.isExpired"
          :can-download="isCanDownloadPDF"
          :price="exportPdfPayIntegral"
          @click="handleDownload('pdf')"
        />

        <!-- 下载Markdown -->
        <DownloadOptionCard
          type="md"
          icon="icon-markdown-line"
          title="下载Markdown"
          description="适合本地修改、提取简历内容等"
          gradient="blue"
          :is-free-mode="userInfo.isAllFree"
          :is-member="membershipInfo.hasMembership && !membershipInfo.isExpired"
          :is-member-only="true"
          @click="handleDownloadMD"
        />

        <!-- 下载JSON -->
        <div class="download-option-wrapper">
          <!-- 完全免费标识 -->
          <div class="free-badge">
            <el-icon><CircleCheckFilled /></el-icon>
            <span>免费</span>
          </div>
          <DownloadOptionCard
            type="json"
            icon="icon-json"
            title="下载JSON"
            description="适合开发人员二次开发、数据备份等"
            gradient="teal"
            :is-free-mode="userInfo.isAllFree"
            :is-member="membershipInfo.hasMembership && !membershipInfo.isExpired"
            :can-download="true"
            @click="handleDownloadJSON"
          />
        </div>
      </div>

      <!-- 用户信息区域 -->
      <div v-if="!userInfo.isAllFree" class="user-info-bar">
        <div class="user-integral">
          <span class="integral-label">我的简币：</span>
          <span class="integral-value">{{ appStore.useUserInfoStore.userIntegralInfo.integralTotal || 0 }}</span>
          <img width="18" src="@/assets/images/jianB.png" alt="简币" />
        </div>
        <div class="user-membership" :class="{
          'is-member': membershipInfo.hasMembership && !membershipInfo.isExpired,
          'is-expired': membershipInfo.hasMembership && membershipInfo.isExpired
        }">
          <el-icon><StarFilled /></el-icon>
          <span v-if="!membershipInfo.hasMembership">普通用户</span>
          <span v-else-if="membershipInfo.type === 'lifetime' && !membershipInfo.isExpired">永久会员</span>
          <span v-else-if="membershipInfo.hasMembership && !membershipInfo.isExpired">
            {{ membershipInfo.type === 'yearly' ? '年度会员' : '月度会员' }}
            <span class="days-remaining">({{ membershipInfo.daysRemaining }}天)</span>
          </span>
          <span v-else>已过期{{ membershipInfo.expiredDays }}天</span>
        </div>
      </div>

      <!-- 获取简币按钮 -->
      <div v-if="!userInfo.isAllFree" class="action-bar">
        <div class="get-coins-btn" @click="openGetDialog">
          <el-icon><Coin /></el-icon>
          <span>获取简币</span>
        </div>
      </div>
    </div>
  </el-dialog>

  <!-- 支付确认弹窗 -->
  <pay-integral-dialog
    :title="title"
    :dialog-get-integral-visible="dialogGetIntegralVisible"
    :pay-number="-Math.abs(exportPdfPayIntegral) || 0"
    :confirm-disabled="confirmDisabled"
    :confirm-tip="confirmTip"
    :btn-text="confirmTip"
    placeholder="下载该创作"
    @cancle="handleCancelDialog"
    @confirm="handleConfirmDialog"
  ></pay-integral-dialog>
</template>

<script lang="ts" setup>
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import { ElMessage } from 'element-plus';
  import { Coin } from '@element-plus/icons-vue';
  import { debounce } from 'lodash';
  import DownloadOptionCard from './DownloadOptionCard.vue';

  // 获取用户会员信息
  const { membershipInfo } = storeToRefs(appStore.useMembershipStore);

  // 获取用户是否免费信息
  const { userInfo } = storeToRefs(appStore.useUserInfoStore);

  const emit = defineEmits(['closeDownloadDialog', 'downloadFile', 'downloadMarkdown', 'download-json']);

  interface TDialog {
    dialogDownloadVisible: boolean;
    exportPdfPayIntegral: number;
    exportImgPayIntegral: number;
    isDownloading?: boolean;
  }

  const props = withDefaults(defineProps<TDialog>(), {
    dialogDownloadVisible: false,
    exportPdfPayIntegral: 0,
    exportImgPayIntegral: 0,
    isDownloading: false
  });

  // 下载类型
  const downloadType = ref<string>('');

  // 弹窗标题
  const title = ref<string>('');

  // 支付弹窗显示状态
  const dialogGetIntegralVisible = ref<boolean>(false);

  // 用户积分信息
  const userIntegralTotal = storeToRefs(appStore.useUserInfoStore);

  // 确认按钮提示文本
  const confirmTip = computed(() => {
    if (!downloadType.value) return '';
    if (downloadType.value === 'img') {
      return isCanDownloadImg.value ? '导出图片' : '简币数量不足';
    }
    return isCanDownloadPDF.value ? '导出PDF' : '简币数量不足';
  });

  // 确认按钮是否禁用
  const confirmDisabled = computed(() => {
    if (!downloadType.value) return false;
    return downloadType.value === 'img' ? !isCanDownloadImg.value : !isCanDownloadPDF.value;
  });

  // 是否可下载图片
  const isCanDownloadImg = computed(() => {
    return (
      Number(userIntegralTotal.userIntegralInfo.value?.integralTotal) >=
        Math.abs(props.exportImgPayIntegral) ||
      (membershipInfo.value?.hasMembership && !membershipInfo.value?.isExpired)
    );
  });

  // 是否可下载PDF
  const isCanDownloadPDF = computed(() => {
    return (
      Number(userIntegralTotal.userIntegralInfo.value?.integralTotal) >=
        Math.abs(props.exportPdfPayIntegral) ||
      (membershipInfo.value?.hasMembership && !membershipInfo.value?.isExpired)
    );
  });

  // 是否正在处理下载
  const isProcessing = ref<boolean>(false);

  // 处理下载（带防抖）
  const handleDownload = debounce(
    async (type: string) => {
      // 如果全局正在下载中，提示用户
      if (props.isDownloading) {
        ElMessage.warning('正在下载中，请稍候...');
        return;
      }

      // 防止重复点击
      if (isProcessing.value) return;
      isProcessing.value = true;

      try {
        downloadType.value = type;

        // 纯净模式直接下载
        if (userInfo.value.isAllFree) {
          handleConfirmDialog();
          return;
        }

        // 会员且未过期直接下载
        if (membershipInfo.value?.hasMembership && !membershipInfo.value?.isExpired) {
          emit('downloadFile', downloadType.value);
          return;
        }

        // 检查积分是否足够
        if (type === 'img' && !isCanDownloadImg.value) return;
        if (type === 'pdf' && !isCanDownloadPDF.value) return;

        dialogGetIntegralVisible.value = true;
      } finally {
        // 延迟重置处理状态，防止快速连续点击
        setTimeout(() => {
          isProcessing.value = false;
        }, 500);
      }
    },
    300,
    { leading: true, trailing: false }
  );

  // 处理下载Markdown（带防抖）
  const handleDownloadMD = debounce(
    () => {
      // 如果全局正在下载中，提示用户
      if (props.isDownloading) {
        ElMessage.warning('正在下载中，请稍候...');
        return;
      }

      // 防止重复点击
      if (isProcessing.value) return;
      isProcessing.value = true;

      try {
        // 纯净模式直接下载
        if (userInfo.value.isAllFree) {
          emit('downloadMarkdown');
          return;
        }

        // 会员且未过期直接下载
        if (membershipInfo.value?.hasMembership && !membershipInfo.value?.isExpired) {
          emit('downloadMarkdown');
          return;
        }

        // 非会员跳转会员页面
        window.open('/membership', '_blank');
      } finally {
        // 延迟重置处理状态
        setTimeout(() => {
          isProcessing.value = false;
        }, 500);
      }
    },
    300,
    { leading: true, trailing: false }
  );

  // 处理下载JSON（带防抖）
  const handleDownloadJSON = debounce(
    () => {
      // 如果全局正在下载中，提示用户
      if (props.isDownloading) {
        ElMessage.warning('正在下载中，请稍候...');
        return;
      }

      // 防止重复点击
      if (isProcessing.value) return;
      isProcessing.value = true;

      try {
        // 所有用户都可以免费下载JSON
        emit('download-json');
      } finally {
        // 延迟重置处理状态
        setTimeout(() => {
          isProcessing.value = false;
        }, 500);
      }
    },
    300,
    { leading: true, trailing: false }
  );

  // 取消支付弹窗
  const handleCancelDialog = () => {
    dialogGetIntegralVisible.value = false;
  };

  // 确认支付弹窗
  const handleConfirmDialog = () => {
    dialogGetIntegralVisible.value = false;
    if (title.value === '如何获取简币') {
      return;
    }
    emit('downloadFile', downloadType.value);
  };

  // 关闭弹窗
  const handleClose = () => {
    emit('closeDownloadDialog');
  };

  // 打开获取简币弹窗
  const openGetDialog = () => {
    title.value = '如何获取简币';
    downloadType.value = '';
    dialogGetIntegralVisible.value = true;
  };
</script>

<style lang="scss" scoped>
  .download-resume-dialog {
    :deep(.el-dialog__body) {
      padding: 0;
    }

    .download-content {
      padding: 0 20px;
    }

    .download-options {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
      max-width: 480px;
      margin: 0 auto;
    }

    .download-option-wrapper {
      position: relative;
      width: 100%;

      // 完全免费标识
      .free-badge {
        position: absolute;
        top: -10px;
        right: 10px;
        z-index: 10;
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 10px;
        background: linear-gradient(135deg, #4ade80 0%, #10b981 100%);
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(74, 222, 128, 0.3);

        .el-icon {
          font-size: 14px;
          color: #fff;
        }

        span {
          font-size: 12px;
          font-weight: 600;
          color: #fff;
        }
      }
    }

    .user-info-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
      padding: 16px 20px;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

      .user-integral {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;

        .integral-label {
          font-weight: 600;
          color: #333;
        }

        .integral-value {
          font-weight: 700;
          color: #ffd700;
          font-size: 16px;
        }
      }

      .user-membership {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        font-weight: 600;
        color: #666;

        .el-icon {
          color: #ccc;
          font-size: 18px;
        }

        .days-remaining {
          font-size: 12px;
          font-weight: 400;
          opacity: 0.8;
        }

        &.is-member {
          color: #ffd700;

          .el-icon {
            color: #ffd700;
            animation: pulse 2s infinite;
          }
        }

        &.is-expired {
          color: #ff4d4f;

          .el-icon {
            color: #ff4d4f;
          }
        }
      }
    }

    @keyframes pulse {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.1);
        opacity: 0.8;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }

    .action-bar {
      display: flex;
      justify-content: center;
      margin-top: 20px;

      .get-coins-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 10px 24px;
        background: linear-gradient(135deg, #70f5c4 0%, #4ade80 100%);
        border-radius: 20px;
        font-size: 14px;
        font-weight: 500;
        color: #065f46;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(112, 245, 196, 0.3);

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(112, 245, 196, 0.4);
        }

        &:active {
          transform: translateY(0);
        }
      }
    }
  }
</style>
