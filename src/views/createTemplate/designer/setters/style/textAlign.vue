<template>
  <div class="height-editor-box">
    <el-form-item size="default" label="文字对齐">
      <el-radio-group v-model="module.css.justifyContent">
        <el-radio label="left">左对齐</el-radio>
        <el-radio label="center">居中 </el-radio>
        <el-radio label="justify"> 两端对齐</el-radio>
        <el-radio label="right">右对齐 </el-radio>
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
  }
</style>
