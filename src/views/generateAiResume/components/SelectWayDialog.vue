<template>
  <el-dialog
    class="select-way-dialog"
    :model-value="dialogSelectWayVisible"
    title="请选择简历生成方式"
    width="600px"
    :close-on-click-modal="false"
  >
    <div class="select-way-dialog-content">
      <div class="selection-cards">
        <div
          class="card template-card"
          :class="{ active: selectedOption === 'template' }"
          @click="selectedOption = 'template'"
        >
          <div class="card-icon">
            <el-icon :size="42"><Document /></el-icon>
          </div>
          <h3>模板生成</h3>
          <p>根据简历模版生成</p>
          <div class="tips">
            <el-icon><InfoFilled /></el-icon>
            <span>若生成失败请多次尝试</span>
          </div>
          <div v-if="selectedOption === 'template'" class="corner-ribbon">
            <el-icon><Select /></el-icon>
          </div>
        </div>

        <div
          class="card markdown-card"
          :class="{ active: selectedOption === 'markdown' }"
          @click="selectedOption = 'markdown'"
        >
          <div class="card-icon">
            <el-icon :size="42"><DocumentCopy /></el-icon>
          </div>
          <h3>Markdown格式</h3>
          <p>直接生成Markdown格式简历</p>
          <div class="tips">
            <el-icon><InfoFilled /></el-icon>
            <span>支持下载到本地修改，不可在线编辑</span>
          </div>
          <div v-if="selectedOption === 'markdown'" class="corner-ribbon">
            <el-icon><Select /></el-icon>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancle">取消</el-button>
        <el-button
          type="primary"
          :loading="sureLoading"
          :disabled="selectedOption ? false : true"
          @click="submit"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { Document, Select, InfoFilled, DocumentCopy } from '@element-plus/icons-vue';

  const emit = defineEmits(['cancle', 'updateSuccess']);
  interface TDialog {
    dialogSelectWayVisible: boolean;
  }
  withDefaults(defineProps<TDialog>(), {
    dialogSelectWayVisible: false
  });

  const selectedOption = ref<'template' | 'markdown' | null>(null);

  // 取消
  const cancle = () => {
    selectedOption.value = null;
    emit('cancle');
  };

  // 提交
  const sureLoading = ref<boolean>(false);
  const submit = () => {
    if (selectedOption.value) {
      // 根据selectedOption.value执行不同操作
      emit('updateSuccess', selectedOption.value);
      sureLoading.value = false;
      selectedOption.value = null;
    } else {
      sureLoading.value = false;
      if (!selectedOption.value) {
        ElMessage.warning('请选择一种生成方式');
      }
    }
  };
</script>

<style lang="scss" scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }

  .selection-cards {
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 15px 0;

    .card {
      position: relative;
      width: 250px;
      padding: 35px 15px;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      text-align: center;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(5px);
      border: 1px solid rgba(225, 228, 232, 0.5);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, #409eff, #67c23a);
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
        border-color: rgba(64, 158, 255, 0.3);

        &::before {
          opacity: 1;
        }
      }

      &.active {
        border: 1px solid var(--el-color-primary);
        background: rgba(240, 247, 255, 0.9);
        box-shadow: 0 8px 25px rgba(64, 158, 255, 0.2);
        transform: translateY(-3px);

        &::before {
          opacity: 1;
          background: var(--el-color-primary);
        }
      }

      .card-icon {
        margin-bottom: 15px;
        color: var(--el-color-primary);
        transition: all 0.3s ease;

        .el-icon {
          width: 42px;
          height: 42px;
        }
      }

      h3 {
        margin: 0 0 10px;
        font-size: 17px;
        font-weight: 600;
        color: #303133;
        transition: all 0.3s ease;
      }

      p {
        margin: 0 0 10px;
        font-size: 13px;
        color: #606266;
        line-height: 1.5;
      }

      .tips {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: #909399;
        margin-top: 8px;

        .el-icon {
          color: #e6a23c;
          margin-right: 5px;
          font-size: 14px;
        }
      }

      .corner-ribbon {
        position: absolute;
        top: 0;
        right: 0;
        width: 28px;
        height: 28px;
        background: var(--el-color-primary);
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        color: white;
        clip-path: polygon(0 0, 100% 0, 100% 100%);
        padding: 2px;

        .el-icon {
          width: 16px;
          height: 16px;
        }
      }
    }

    .template-card.active {
      .card-icon {
        color: #67c23a;
      }
      .corner-ribbon {
        background: #67c23a;
      }
    }

    .markdown-card.active {
      .card-icon {
        color: #f56c6c;
      }
      .corner-ribbon {
        background: #f56c6c;
      }
    }
  }
</style>

<style lang="scss">
  .select-way-dialog {
    border-radius: 10px;
    overflow: hidden;

    .el-dialog__header {
      border-bottom: 1px solid rgba(225, 228, 232, 0.5);
      margin-right: 0;
      padding: 16px 20px;
      background: linear-gradient(145deg, #f8fafc, #ffffff);
    }

    .el-dialog__title {
      font-size: 17px;
      font-weight: 600;
      color: #303133;
      letter-spacing: 0.3px;
    }

    .el-dialog__body {
      padding: 20px;
      background: linear-gradient(145deg, #f8fafc, #ffffff);
    }

    .el-dialog__footer {
      border-top: 1px solid rgba(225, 228, 232, 0.5);
      padding: 12px 20px;
      background: linear-gradient(145deg, #f8fafc, #ffffff);
    }

    .el-dialog__headerbtn {
      top: 16px;
      right: 16px;
    }

    .el-button {
      border-radius: 6px;
      padding: 8px 16px;
      font-weight: 500;
      letter-spacing: 0.3px;
    }
  }
</style>
