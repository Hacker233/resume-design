<template>
  <el-dialog
    :model-value="dialogPreviewResumeVisible"
    title="导出PDF预览（如和设计页面有差异，请调整各模块边距后再导出）"
    width="820px"
    :show-close="true"
    :close-on-click-modal="false"
    append-to-body
    class="pdf-preview-dialog-container"
    @close="cancle"
    @open="handleOpen"
  >
    <div class="pdf-preview-dialog">
      <!-- 加载状态 -->
      <div v-if="loading" class="loading-container">
        <el-icon class="is-loading"><Loading /></el-icon>
        <el-progress :percentage="progressPercent" :stroke-width="8" :format="progressFormat" />
        <span>正在为您生成高清预览，可能需要10-30秒，请耐心等待...</span>
        <p class="loading-tip">小贴士：PDF生成时间取决于简历复杂度和网络状况</p>
      </div>

      <!-- PDF 预览区域 -->
      <div v-if="pdfUrl && !loading" class="pdf-viewer-container">
        <template v-for="page in pageCount" :key="page">
          <vue-pdf-embed :source="pdfUrl" :page="page" class="vue-pdf-embed" />
        </template>
      </div>

      <!-- 错误提示 -->
      <div v-if="error" class="error-message">
        <el-alert
          title="生成预览失败"
          type="error"
          :description="error"
          show-icon
          closable
          @close="error = ''"
        />
        <el-button @click="handleOpen">重试</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { Loading } from '@element-plus/icons-vue';
  import VuePdfEmbed from 'vue-pdf-embed';
  import { exportPdfPreview } from '@/utils/pdf';
  import { useRoute } from 'vue-router';

  const emit = defineEmits(['cancle', 'updateSuccess']);

  interface TDialog {
    dialogPreviewResumeVisible: boolean;
  }

  withDefaults(defineProps<TDialog>(), {
    dialogPreviewResumeVisible: false
  });

  const route = useRoute();
  const loading = ref(false);
  const error = ref('');
  const pdfUrl = ref('');
  const currentPage = ref(1);
  const pageCount = ref(0);
  const progressPercent = ref(0);
  const progressInterval = ref<any>(null);

  // 取消
  const cancle = () => {
    // 清理资源
    if (pdfUrl.value) {
      URL.revokeObjectURL(pdfUrl.value);
      pdfUrl.value = '';
    }
    emit('cancle');
  };

  // 进度条格式化
  const progressFormat = () => {
    return `正在处理 ${progressPercent.value}%`;
  };

  // 打开弹窗时加载PDF
  const handleOpen = async () => {
    try {
      loading.value = true;
      error.value = '';
      currentPage.value = 1;
      pageCount.value = 0;
      progressPercent.value = 0;

      // 启动模拟进度
      progressInterval.value = setInterval(() => {
        if (progressPercent.value < 90) {
          progressPercent.value += Math.floor(Math.random() * 5) + 1;
        }
      }, 500);

      // 清理之前的PDF
      if (pdfUrl.value) {
        URL.revokeObjectURL(pdfUrl.value);
        pdfUrl.value = '';
      }

      // 获取PDF Blob
      const data: any = await exportPdfPreview(route.params.id as string);

      if (data.blob) {
        // 创建对象URL用于预览
        pdfUrl.value = URL.createObjectURL(data.blob);
        pageCount.value = data.pageCount;
      } else {
        throw new Error('未能获取PDF内容');
      }
    } catch (err) {
      console.error('生成预览出错:', err);
      error.value = err instanceof Error ? err.message : String(err);
    } finally {
      if (progressInterval.value) {
        clearInterval(progressInterval.value);
        progressInterval.value = null;
      }
      progressPercent.value = 100;
      loading.value = false;
    }
  };
</script>

<style lang="scss">
  .pdf-preview-dialog-container {
    .el-dialog__body {
      padding: 30px 15px;
    }
    .pdf-preview-dialog {
      min-height: 300px;
      display: flex;
      flex-direction: column;

      .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 300px;
        gap: 16px;

        .el-icon {
          font-size: 24px;
          animation: rotating 2s linear infinite;
        }

        .el-progress {
          width: 80%;
        }

        .loading-tip {
          font-size: 12px;
          color: var(--el-text-color-secondary);
          margin-top: 8px;
        }
      }

      .pdf-viewer-container {
        display: flex;
        flex-direction: column;
        gap: 16px;

        .vue-pdf-embed {
          border-radius: 6px;
          overflow: hidden;
          min-height: 500px;
          box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
        }
      }

      .page-controls {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 16px;
        padding: 8px 0;

        .page-info {
          min-width: 120px;
          text-align: center;
        }
      }

      .preview-actions {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        padding-top: 16px;
        border-top: 1px solid #eee;
      }

      .error-message {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;

        .el-alert {
          width: 100%;
        }
      }
    }

    @keyframes rotating {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
</style>
