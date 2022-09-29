<!-- 审核弹窗 -->
<template>
  <el-dialog
    :model-value="dialogOnlineVisible"
    title="在线简历发布成功"
    width="500px"
    :show-close="false"
    :close-on-click-modal="false"
    append-to-body
  >
    <div class="content-box">
      <p>
        <span>在线地址：</span>
        <a :href="link" target="_blank">{{ link }}</a>
      </p>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="cancle">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  const emit = defineEmits(['cancle']);
  interface TDialog {
    dialogOnlineVisible: boolean;
    resumeId: string;
  }
  const props = withDefaults(defineProps<TDialog>(), {
    dialogOnlineVisible: false,
    resumeId: ''
  });

  const link = computed(() => {
    return `${location.origin}/online/${props.resumeId}`;
  });

  // 取消
  const cancle = () => {
    emit('cancle');
  };
</script>
<style lang="scss" scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>
