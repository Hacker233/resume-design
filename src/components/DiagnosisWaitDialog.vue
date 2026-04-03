<template>
  <el-dialog
    v-model="dialogVisible"
    :title="dialogTitle"
    width="450px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    class="wait-dialog"
    append-to-body
  >
    <div class="wait-dialog-content">
      <div v-if="!isCompleted" class="loading-container">
        <el-icon class="is-loading loading-icon"><Loading /></el-icon>
        <div class="loading-spinner"></div>
      </div>
      <div v-else class="completed-container">
        <el-icon class="completed-icon"><Check /></el-icon>
      </div>
      
      <h3 v-if="!isCompleted">诊断过程可能需要几分钟</h3>
      <h3 v-else class="completed-title">诊断已完成</h3>
      
      <p v-if="!isCompleted" class="wait-message">AI正在分析您的简历内容，这可能需要一些时间，请耐心等待...</p>
      <p v-else class="completed-message">您的简历诊断已完成，现在可以查看详细报告</p>
      
      <div class="wait-tip">
        <el-icon color="#4096ff"><InfoFilled /></el-icon>
        <span>您可以在诊断完成后在右侧查看报告，也可以在个人中心查看历史诊断记录</span>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer" v-if="!isCompleted">
        <el-button size="large" class="secondary-button" @click="goToPersonCenter">查看个人中心</el-button>
        <el-button type="primary" size="large" class="primary-button" @click="dialogVisible = false">我知道了</el-button>
      </span>
      <span class="dialog-footer" v-else>
        <el-button size="large" class="secondary-button" @click="goToPersonCenter">查看历史记录</el-button>
        <el-button type="primary" size="large" class="primary-button" @click="handleViewReport">查看报告</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { Loading, InfoFilled, Check } from '@element-plus/icons-vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const props = defineProps<{
    visible: boolean;
    isCompleted?: boolean;
  }>();
  
  const emit = defineEmits<{
    (e: 'update:visible', value: boolean): void;
    (e: 'close'): void;
    (e: 'view-report'): void;
  }>();
  
  const dialogVisible = computed({
    get: () => props.visible,
    set: (value) => {
      emit('update:visible', value);
      if (!value) {
        emit('close');
      }
    }
  });
  
  const isCompleted = computed(() => props.isCompleted || false);
  
  const dialogTitle = computed(() => {
    return isCompleted.value ? '诊断完成' : 'AI诊断提示';
  });
  
  const goToPersonCenter = () => {
    router.push('/person/aiOptimizeLogs');
    dialogVisible.value = false;
  };

  const handleViewReport = () => {
    emit('view-report');
    dialogVisible.value = false;
  };
</script>

<style lang="scss" scoped>
  // 等待提示弹窗样式
  .wait-dialog {
    .el-dialog__header {
      background: linear-gradient(135deg, #4096ff 0%, #1677ff 100%) !important;
      padding: 20px 24px !important;
      color: #ffffff !important;
      font-size: 18px !important;
      font-weight: 600 !important;

      .el-dialog__title {
        color: #ffffff !important;
      }
    }

    .el-dialog__body {
      padding: 30px 24px !important;
    }

    .wait-dialog-content {
      text-align: center !important;

      .loading-container {
        position: relative !important;
        width: 80px !important;
        height: 80px !important;
        margin: 0 auto 24px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;

        .loading-icon {
          font-size: 40px !important;
          color: #4096ff !important;
          animation: rotate 1s linear infinite !important;
        }

        .loading-spinner {
          position: absolute !important;
          width: 100% !important;
          height: 100% !important;
          border: 3px solid #e6f7ff !important;
          border-top-color: #4096ff !important;
          border-radius: 50% !important;
          animation: rotate 1s linear infinite !important;
        }
      }

      .completed-container {
        width: 80px !important;
        height: 80px !important;
        margin: 0 auto 24px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        background: #f0fdf4 !important;
        border-radius: 50% !important;

        .completed-icon {
          font-size: 40px !important;
          color: #22c55e !important;
        }
      }

      h3 {
        font-size: 18px !important;
        font-weight: 600 !important;
        color: #1f2937 !important;
        margin-bottom: 12px !important;
      }

      .completed-title {
        color: #166534 !important;
      }

      .wait-message {
        font-size: 14px !important;
        color: #6b7280 !important;
        margin-bottom: 20px !important;
        line-height: 1.6 !important;
      }

      .completed-message {
        font-size: 14px !important;
        color: #166534 !important;
        margin-bottom: 20px !important;
        line-height: 1.6 !important;
      }

      .wait-tip {
        display: flex !important;
        align-items: flex-start !important;
        gap: 8px !important;
        padding: 12px 16px !important;
        background: #f0f9ff !important;
        border-radius: 8px !important;
        border-left: 4px solid #4096ff !important;
        text-align: left !important;

        .el-icon {
          flex-shrink: 0 !important;
          margin-top: 2px !important;
        }

        span {
          font-size: 13px !important;
          color: #4b5563 !important;
          line-height: 1.5 !important;
        }
      }
    }

    .el-dialog__footer {
      padding: 16px 24px 24px !important;
      border-top: 1px solid #e5e7eb !important;

      .dialog-footer {
        display: flex !important;
        gap: 12px !important;

        button {
          flex: 1 !important;
          height: 44px !important;
          font-size: 15px !important;
          font-weight: 600 !important;
          border-radius: 8px !important;
        }
      }

      .secondary-button {
        background: #ffffff !important;
        border: 1px solid #d1d5db !important;
        color: #374151 !important;

        &:hover {
          background: #f9fafb !important;
          border-color: #9ca3af !important;
        }
      }

      .primary-button {
        background: linear-gradient(135deg, #4096ff 0%, #1677ff 100%) !important;
        border: none !important;

        &:hover {
          background: linear-gradient(135deg, #1677ff 0%, #0958d9 100%) !important;
        }
      }
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>