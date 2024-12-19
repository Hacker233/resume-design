<template>
  <div class="height-editor-box">
    <el-form-item size="default" label="块级属性">
      <el-radio-group v-model="module.css.display">
        <el-radio label="flex">水平排列</el-radio>
        <el-radio label="inline-block">行内块级</el-radio>
        <el-radio label="block">块级</el-radio>
      </el-radio-group>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import { useModuleWithStyle } from './useModuleWithStyle';

  const props = defineProps<{
    id?: string;
    customCssProp?: string;
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
    .unit {
      margin-left: 10px;
      color: #929292;
      letter-spacing: 2px;
    }
  }
</style>
