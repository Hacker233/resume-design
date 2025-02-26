<template>
  <el-drawer
    :model-value="drawer"
    :size="820"
    class="ai-optimize-drawer"
    direction="rtl"
    title="AI诊断结果"
    destroy-on-close
    @close="handleClose"
    @open="handleOpen"
  >
    <div v-if="!json" class="view-json-footer"> </div>
  </el-drawer>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { cloneDeep } from 'lodash';
  import { storeToRefs } from 'pinia';

  const emit = defineEmits(['closeAiOptimizeDrawer']);
  interface IJsonDrawer {
    drawer: boolean;
    json?: any;
  }
  const props = withDefaults(defineProps<IJsonDrawer>(), {
    drawer: false,
    json: null
  });

  // 关闭弹窗
  const handleClose = () => {
    emit('closeAiOptimizeDrawer');
  };

  const code = ref<any>({});

  // 打开弹窗
  const handleOpen = () => {
    const { HJNewJsonStore } = storeToRefs(appStore.useCreateTemplateStore);
    if (props.json) {
      code.value = props.json;
      return;
    }
    code.value = cloneDeep(HJNewJsonStore.value);
  };
</script>
<style lang="scss">
  .ai-optimize-drawer {
    .footer-box {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 20px;
    }
    .el-drawer__body {
      padding: 0;
      display: flex;
      flex-direction: column;
    }
  }
  .view-json-footer {
    height: 60px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 20px;
  }
</style>
