<template>
  <el-dialog :model-value="dialogVisible" width="600px" :close-on-click-modal="false" class="ai-process-dialog"
    append-to-body destroy-on-close :custom-class="{ 'export-process-dialog': true }">

    <!-- AI风格头部 -->
    <template #header>
      <div class="ai-export-header">
        <div class="ai-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
          </svg>
        </div>
        <h1 class="ai-title">{{ statusText }}</h1>
      </div>
    </template>

    <!-- 内容区域 -->
    <div class="ai-content">
      <template v-if="dialogVisible">
        <!-- 加载状态 -->
        <div v-if="percentageNum < 100" class="loading-state">
          <div class="ai-progress-container">
            <div class="ai-progress-circle" :style="{ '--progress': percentageNum }">
              <svg class="progress-svg" width="180" height="180" viewBox="0 0 180 180">
                <circle class="progress-bg" cx="90" cy="90" r="80" />
                <circle class="progress-bar" cx="90" cy="90" r="80" :stroke-dasharray="502.4"
                  :stroke-dashoffset="502.4 - (502.4 * percentageNum / 100)" />
              </svg>
              <div class="progress-text">{{ percentageNum }}%</div>
            </div>
          </div>
          <div class="loading-dots">
            <span class="dot" :style="{ animationDelay: '0ms' }"></span>
            <span class="dot" :style="{ animationDelay: '100ms' }"></span>
            <span class="dot" :style="{ animationDelay: '200ms' }"></span>
          </div>
        </div>

        <!-- 完成状态 -->
        <transition name="ai-fade">
          <div v-if="percentageNum === 100" class="completion-state">
            <div class="success-animation">
              <div class="success-circle">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none"
                  stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
            </div>

            <h2 class="completion-title">导出完成</h2>
            <p class="completion-subtitle">文件将在7天内有效</p>

            <div class="ai-info-card">
              <div class="ai-card-header">
                <div class="ai-card-icon">
                  <div class="ai-icon-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <path d="M12 17h.01" />
                    </svg>
                  </div>
                </div>
                <h3 class="ai-card-title">导出记录管理</h3>
              </div>
              <div class="ai-card-content">
                <p class="ai-card-description">
                  智能管理您的所有导出记录，管理历史导出文件
                </p>
                <div class="ai-card-features">
                  <div class="ai-feature-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>7天文件保留</span>
                  </div>
                  <div class="ai-feature-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                    <span>一键查看历史</span>
                  </div>
                </div>
              </div>
              <div class="ai-card-actions">
                <el-button @click="goToExportRecords" class="ai-primary-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  查看导出记录
                </el-button>
              </div>
            </div>
          </div>
        </transition>
      </template>
    </div>

    <!-- 底部按钮 -->
    <template #footer>
      <span class="ai-footer">
        <el-button @click="cancle" class="ai-cancel-button" :class="{ 'ai-secondary-button': percentageNum === 100 }">
          <svg v-if="percentageNum === 100" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" style="margin-right: 6px;">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          {{ percentageNum === 100 ? '关闭' : '取消' }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
const emit = defineEmits(['cancle']);
const router = useRouter();

interface TDialog {
  dialogVisible: boolean;
  percentageNum: number;
}

const props = withDefaults(defineProps<TDialog>(), {
  dialogVisible: false,
  percentageNum: 1
});

const statusText = ref<string>('导出中');

watch(
  () => props.percentageNum,
  (newVal) => {
    if (props.dialogVisible) {
      statusText.value = newVal === 100 ? '导出完成' : '导出中';
    }
  },
  {
    deep: true,
    immediate: true
  }
);

// 跳转到个人中心导出记录页面
const goToExportRecords = () => {
  router.push('/person/exportRecords');
  emit('cancle');
};

// 关闭
const cancle = () => {
  emit('cancle');
};
</script>

<style lang="scss">
// AI风格弹窗基础样式
.export-process-dialog {
  border-radius: 16px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: none;
  background: #ffffff;
}

.ai-process-dialog {
  .el-dialog__header {
    padding: 0 !important;
    margin: 0 !important;
    .el-dialog__headerbtn {
      top: 7px;
    }
  }

  // AI风格头部
  .ai-export-header {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    color: #334155;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    margin: 0 !important;

    .ai-icon {
      margin-right: 10px;
      animation: float 3s ease-in-out infinite;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #64748b;
    }

    .ai-title {
      font-size: 18px;
      font-weight: 600;
      margin: 0;
      text-align: center;
      letter-spacing: 0.5px;
    }
  }

  // 内容区域
  .ai-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 280px;

    // 加载状态
    .loading-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;

      // AI风格进度条
      .ai-progress-container {
        position: relative;
        margin-bottom: 24px;

        .ai-progress-circle {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;

          .progress-svg {
            transform: rotate(-90deg);
            width: 160px;
            height: 160px;
          }

          .progress-bg {
            fill: none;
            stroke: #f1f5f9;
            stroke-width: 6;
          }

          .progress-bar {
            fill: none;
            stroke: #94a3b8;
            stroke-width: 6;
            stroke-linecap: round;
            transition: stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            filter: drop-shadow(0 0 6px rgba(148, 163, 184, 0.5));
          }

          .progress-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 20px;
            font-weight: 600;
            color: #334155;
          }
        }
      }

      // 加载动画
      .loading-dots {
        display: flex;
        gap: 6px;

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: linear-gradient(135deg, #94a3b8, #cbd5e1);
          animation: pulse 1.5s ease-in-out infinite;
        }
      }
    }

    // 完成状态
    .completion-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;

      // 成功动画
      .success-animation {
        margin-bottom: 20px;

        .success-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #34d399);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: successPop 0.6s ease-out;
          box-shadow: 0 0 16px rgba(16, 185, 129, 0.4);
        }
      }

      // 完成标题
      .completion-title {
        font-size: 20px;
        font-weight: 600;
        color: #1e293b;
        margin: 0 0 8px 0;
        text-align: center;
      }

      // 完成副标题
      .completion-subtitle {
        font-size: 14px;
        color: #64748b;
        margin: 0 0 24px 0;
        text-align: center;
      }

      // AI信息卡片
      .ai-info-card {
        width: 100%;
        padding: 24px;
        background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
        border-radius: 16px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        border: 1px solid #e2e8f0;
        margin-bottom: 24px;
        position: relative;
        overflow: hidden;

        // AI风格装饰
        &::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(148, 163, 184, 0.1) 0%, transparent 70%);
          transform: rotate(30deg);
          z-index: 0;
        }

        .ai-card-header {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;

          .ai-card-icon {
            margin-right: 16px;
            flex-shrink: 0;

            .ai-icon-circle {
              width: 48px;
              height: 48px;
              border-radius: 16px;
              background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 4px 12px rgba(148, 163, 184, 0.2);
              animation: float 3s ease-in-out infinite;

              svg {
                color: #64748b;
              }
            }
          }

          .ai-card-title {
            font-size: 18px;
            font-weight: 700;
            color: #334155;
            margin: 0;
            letter-spacing: 0.5px;
          }
        }

        .ai-card-content {
          margin-bottom: 20px;
          position: relative;
          z-index: 1;

          .ai-card-description {
            margin: 0 0 16px 0;
            color: #475569;
            font-size: 14px;
            line-height: 1.6;
          }

          .ai-card-features {
            display: flex;
            gap: 20px;

            .ai-feature-item {
              display: flex;
              align-items: center;
              gap: 6px;

              svg {
                color: #94a3b8;
                flex-shrink: 0;
              }

              span {
                font-size: 13px;
                color: #64748b;
                font-weight: 500;
              }
            }
          }
        }

        .ai-card-actions {
          display: flex;
          justify-content: flex-start;
          position: relative;
          z-index: 1;

          .ai-primary-button {
            display: flex;
            align-items: center;
            padding: 10px 20px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 14px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            background: linear-gradient(135deg, #64748b 0%, #94a3b8 100%);
            border: none;
            color: white;
            box-shadow: 0 4px 12px rgba(100, 116, 139, 0.3);

            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 16px rgba(100, 116, 139, 0.4);
              background: linear-gradient(135deg, #475569 0%, #64748b 100%);
            }
          }
        }
      }
    }
  }

  // 底部按钮区域
  .ai-footer {
    display: flex;
    justify-content: center;
    gap: 12px;

    .ai-cancel-button {
      padding: 8px 20px;
      border-radius: 6px;
      font-weight: 500;
      font-size: 13px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid #e2e8f0;
      background: white;
      color: #64748b;

      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        border-color: #cbd5e1;
      }
    }

    .ai-secondary-button {
      border-color: #e2e8f0;
      background: #f8fafc;
    }
  }
}

// 动画效果
@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-6px);
  }
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.2);
    opacity: 0.6;
  }
}

@keyframes successPop {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }

  50% {
    transform: scale(1.1);
    opacity: 1;
  }

  70% {
    transform: scale(0.95);
  }

  100% {
    transform: scale(1);
  }
}

// 过渡动画
.ai-fade-enter-active,
.ai-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.ai-fade-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

.ai-fade-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(1.05);
}

// 渐变定义
.ai-process-dialog {
  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    overflow: hidden;
  }
}

// 响应式设计
@media (max-width: 576px) {
  .ai-dialog {
    width: 90% !important;
    max-width: 400px;
  }

  .ai-process-dialog {
    .ai-content {
      padding: 30px 20px;
    }

    .ai-footer {
      padding: 0 20px 20px;
    }
  }
}
</style>
