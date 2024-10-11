<template>
  <div class="font-weight-editor-box">
    <el-form-item label="行间距:" size="default">
      <el-input-number v-model="module.css.lineHeight" :max="1000" :step="0.1" />
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import { useModuleWithStyle } from './useModuleWithStyle';

  const props = defineProps<{
    id?: string;
    customCssProp?: string;
  }>();

  // 选中的module
  const { module } = useModuleWithStyle(props.id, props.customCssProp);
</script>
<style lang="scss" scoped>
  .el-form-item {
    display: flex;
    .el-form-item__content {
      flex: 1;
      display: flex;
      .el-input-number {
        flex: 1;
      }
    }
  }
</style>
