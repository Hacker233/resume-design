<template>
  <el-dialog
    :model-value="dialogVisible"
    width="30%"
    :close-on-click-modal="false"
    class="pdf-progress"
    append-to-body
    destroy-on-close
  >
    <template #header>
      <div class="header">
        <h1 class="animated-title">{{ statusText }}</h1>
      </div>
    </template>
    <div class="download-status">
      <el-progress
        type="circle"
        :percentage="percentageNum"
        :width="180"
        :stroke-width="25"
        :color="gradientColor"
      />
      <p v-if="percentageNum === 100" class="download-tip"
        >如果下载未开始，请联系客服：LHQfighting</p
      >
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancle">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { defineEmits, defineProps, withDefaults, watch, ref, computed } from 'vue';

  const emit = defineEmits(['cancle']);

  interface TDialog {
    dialogVisible: boolean;
    percentageNum: number;
  }

  const props = withDefaults(defineProps<TDialog>(), {
    dialogVisible: false,
    percentageNum: 1
  });

  watch(
    () => props.percentageNum,
    (newVal) => {
      if (newVal === 100) {
        statusText.value = '下载完成';
      }
    },
    {
      deep: true
    }
  );

  const statusText = ref<string>('下载中');

  // 计算颜色渐变
  const gradientColor = computed(() => {
    return [
      { color: '#ff9f43', percentage: 20 },
      { color: '#ff6565', percentage: 40 },
      { color: '#ffcc5c', percentage: 60 },
      { color: '#4ecdc4', percentage: 80 },
      { color: '#7fb80e', percentage: 100 }
    ];
  });

  // 关闭
  const cancle = () => {
    emit('cancle');
  };
</script>

<style lang="scss">
  .pdf-progress {
    .header {
      h1 {
        font-size: 20px;
        text-align: center;
        animation: pulse 1.5s infinite;
      }

      @keyframes pulse {
        0%,
        100% {
          transform: scale(1);
          opacity: 1;
        }
        50% {
          transform: scale(1.05);
          opacity: 0.8;
        }
      }
    }

    .download-status {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 20px;

      .el-progress-circle__track {
        stroke: #e5e9f2;
      }

      .el-progress-circle__path {
        transition: stroke-dashoffset 0.6s ease-out;
        filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.8));
      }

      .download-tip {
        margin-top: 10px;
        color: #909399;
        font-size: 14px;
        text-align: center;
      }
    }
  }
</style>
