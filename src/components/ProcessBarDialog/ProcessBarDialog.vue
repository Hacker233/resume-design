<template>
  <el-dialog
    :model-value="dialogVisible"
    width="40%"
    :show-close="false"
    :close-on-click-modal="false"
    custom-class="pdf-progress"
    append-to-body
    destroy-on-close
  >
    <template #title>
      <div class="header">
        <h1>{{ statusText }}</h1>
      </div>
    </template>
    <div class="download-status">
      <el-progress :text-inside="true" :stroke-width="20" :percentage="percentageNum" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancle">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
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
      }
    }
  }
</style>
