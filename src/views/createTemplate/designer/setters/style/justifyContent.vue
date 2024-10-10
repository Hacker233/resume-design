<template>
  <div class="height-editor-box">
    <el-form-item size="default" label="水平对齐:">
      <el-radio-group v-model="module.css.justifyContent">
        <el-radio label="flex-start">左对齐</el-radio>
        <el-radio label="center">居中 </el-radio>
        <el-radio label="flex-end">右对齐 </el-radio>
        <el-radio label="space-between">两端对齐 </el-radio>
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
