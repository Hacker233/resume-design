<template>
  <div class="height-editor-box">
    <el-form-item size="default" label="填充方式">
      <el-radio-group v-model="module.css.objectFit">
        <el-radio label="fill">填充</el-radio>
        <el-radio label="cover">覆盖</el-radio>
        <el-radio label="none">原始</el-radio>
        <el-radio label="scale-down">缩小</el-radio>
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
