<!-- eslint-disable vue/no-v-html -->
<template>
  <!-- 二维码付费弹窗 -->
  <el-dialog
    class="private-service-dialog"
    :model-value="dialogPrivateServiceVisible"
    width="700px"
    :show-close="true"
    :append-to-body="false"
    @close="handleClose"
  >
    <!-- // eslint-disable-next-line vue/no-v-html -->
    <div class="private-service-dialog-box" v-html="privateServiceContent"></div>
  </el-dialog>
</template>

<script lang="ts" setup>
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';

  const emit = defineEmits(['update:modelValue', 'paySuccess', 'cancel']);

  interface TDialog {
    modelValue: boolean;
    type: string; // 展示协议
  }

  const props = withDefaults(defineProps<TDialog>(), {
    modelValue: false,
    type: ''
  });

  // 双向绑定 modelValue
  const privateServiceContent = ref(''); // 协议内容
  const dialogPrivateServiceVisible = ref(props.modelValue);
  const { websiteConfig } = storeToRefs(appStore.useWebsiteConfigStore);
  watch(
    () => props.modelValue,
    (newVal) => {
      if (props.type === 'privacy') {
        privateServiceContent.value = websiteConfig.value.privacy_policy;
      } else if (props.type === 'service') {
        privateServiceContent.value = websiteConfig.value.service_agreement;
      }
      dialogPrivateServiceVisible.value = newVal;
    }
  );
  watch(dialogPrivateServiceVisible, (newVal) => {
    emit('update:modelValue', newVal);
  });

  // 关闭弹窗逻辑
  const closeDialog = () => {
    dialogPrivateServiceVisible.value = false;
  };

  // 弹窗关闭回调
  const handleClose = () => {
    closeDialog();
  };
</script>

<style lang="scss" scoped>
  .private-service-dialog-box {
    padding: 30px;
    max-height: 70vb;
    overflow: auto;
    padding-top: 0;
    line-height: 1.5;
    ul,
    ol {
      list-style-position: inside !important;
    }
  }
</style>
<style lang="scss">
  // 弹窗样式
  .private-service-dialog {
    padding: 0 0 0 0;
    box-shadow: 0 5px 15px 0 #ddd;
    border-radius: 18px;
    .el-dialog__footer {
      display: none !important;
    }
    .el-dialog__body {
      padding: 0 !important;
    }
  }
</style>
