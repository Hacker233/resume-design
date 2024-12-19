<template>
  <div class="height-editor-box">
    <el-form-item size="default" label="背景重复">
      <el-radio-group v-model="module.css.backgroundRepeat">
        <el-radio label="repeat">repeat</el-radio>
        <el-radio label="no-repeat">no-repeat</el-radio>
        <el-radio label="round">round</el-radio>
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
