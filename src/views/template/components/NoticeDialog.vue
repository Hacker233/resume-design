<!-- 审核弹窗 -->
<template>
  <el-dialog
    :model-value="dialogNoticeVisible"
    title="公告"
    width="400px"
    :show-close="false"
    append-to-body
  >
    <div class="notice-content-box">
      <p style="line-height: 2; font-size: 14px"
        >您正在访问旧版简历制作，此版本随时可能下线，请您尽快迁移至新版本设计您的简历！谢谢支持~~</p
      >
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" :loading="sureLoading" @click="submit">我已知晓</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  const emit = defineEmits(['cancle']);
  interface TDialog {
    dialogNoticeVisible: boolean;
  }
  withDefaults(defineProps<TDialog>(), {
    dialogNoticeVisible: false
  });

  // 确认修改
  const sureLoading = ref<boolean>(false);
  const submit = () => {
    emit('cancle');
  };
</script>
<style lang="scss" scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>
