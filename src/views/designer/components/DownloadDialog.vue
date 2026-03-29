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

  const emit = defineEmits(['closeDownloadDialog', 'downloadFile', 'downloadMarkdown']);

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
      Number(userIntegralTotal.userIntegralInfo.value.integralTotal) >=
        Math.abs(props.exportImgPayIntegral) ||
      (membershipInfo.value.hasMembership && !membershipInfo.value.isExpired)
    );
  });

  // 是否可下载PDF
  const isCanDownloadPDF = computed(() => {
    return (
      Number(userIntegralTotal.userIntegralInfo.value.integralTotal) >=
        Math.abs(props.exportPdfPayIntegral) ||
      (membershipInfo.value.hasMembership && !membershipInfo.value.isExpired)
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
        if (membershipInfo.value.hasMembership && !membershipInfo.value.isExpired) {
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
        if (membershipInfo.value.hasMembership && !membershipInfo.value.isExpired) {
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
      padding: 30px 20px;
    }

    .download-options {
      display: flex;
      justify-content: center;
      gap: 24px;
      flex-wrap: wrap;
    }

    .action-bar {
      display: flex;
      justify-content: center;
      margin-top: 28px;

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
