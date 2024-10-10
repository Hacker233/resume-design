<template>
  <div class="height-editor-box">
    <el-form-item size="default" label="定位模式:">
      <el-radio-group v-model="module.css.position">
        <el-radio label="static">默认</el-radio>
        <el-radio label="relative">相对定位</el-radio>
        <el-radio label="absolute">绝对定位</el-radio>
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
