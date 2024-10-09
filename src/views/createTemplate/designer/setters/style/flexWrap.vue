<template>
  <div class="height-editor-box">
    <el-form-item size="default" label="自动换行:">
      <el-radio-group v-model="module.css.flex">
        <el-radio label="wrap">是</el-radio>
        <el-radio label="no-wrap">否</el-radio>
      </el-radio-group>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import { useModuleWithStyle } from './useModuleWithStyle';

  const props = defineProps<{
    id: string;
    customCssProp?: string; // 有值，则代表是自定义样式属性设置
  }>();

  const { module } = useModuleWithStyle(props.id, props.customCssProp);
</script>
<style lang="scss" scoped>
  .height-editor-box {
    .el-form-item {
      display: flex;
      .el-form-item__content {
        flex: 1;
        display: flex;
      }
    }
  }
</style>
