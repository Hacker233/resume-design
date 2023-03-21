<template>
  <el-drawer
    :model-value="drawer"
    :size="600"
    class="json-drawer"
    direction="ltr"
    title="页面JSON数据"
    @close="handleClose"
    @open="handleOpen"
  >
    <codemirror
      v-model="code"
      placeholder="请编写JSON"
      :style="{ height: '100%' }"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
      disabled
      @ready="handleReady"
    />
  </el-drawer>
</template>
<script lang="ts" setup>
  import { Codemirror } from 'vue-codemirror';
  import { oneDark } from '@codemirror/theme-one-dark';
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import { json } from '@codemirror/lang-json';

  const { HJSchemaJsonStore } = storeToRefs(appStore.useLegoJsonStore);

  const emit = defineEmits(['closeJsonDrawer']);
  interface IJsonDrawer {
    drawer: boolean;
  }
  withDefaults(defineProps<IJsonDrawer>(), {
    drawer: false
  });

  // 关闭弹窗
  const handleClose = () => {
    emit('closeJsonDrawer');
  };

  const code = ref(JSON.stringify(HJSchemaJsonStore.value, null, 4));

  // 打开弹窗
  const handleOpen = () => {
    code.value = JSON.stringify(HJSchemaJsonStore.value, null, 4);
  };

  const extensions = [json(), oneDark];

  // Codemirror EditorView instance ref
  const handleReady = () => {
    code.value = JSON.stringify(HJSchemaJsonStore.value, null, 2);
  };
</script>
<style lang="scss">
  .json-drawer {
    .el-drawer__body {
      padding: 0;
    }
    .cm-editor {
      height: 100%;
      font-size: 16px;
    }
  }
</style>
