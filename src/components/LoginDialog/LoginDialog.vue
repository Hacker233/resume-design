<template>
  <el-dialog
    :model-value="show"
    title="Tips"
    width="400px"
    :show-close="false"
    :close-on-click-modal="false"
    :before-close="handleClose"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="confirm">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  const props = defineProps({
    cancle: {
      type: Function,
      default: (fun: any) => fun()
    },
    confirm: {
      type: Function,
      default: (fun: any) => fun()
    }
  });

  const show = ref<boolean>(true);

  // 取消登录
  const handleClose = () => {
    show.value = false;
    props.cancle();
  };

  // 登录成功
  const confirm = () => {
    show.value = false;
    props.confirm();
  }
</script>
<style scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>
