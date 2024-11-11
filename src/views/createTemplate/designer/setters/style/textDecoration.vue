<template>
  <div class="height-editor-box">
    <el-form-item size="default" label="链接标志:">
      <el-radio-group v-model="module.css.textDecoration">
        <el-radio label="none">无</el-radio>
        <el-radio label="line-through">中划线 </el-radio>
        <el-radio label="overline">上划线 </el-radio>
        <el-radio label="underline">下划线 </el-radio>
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
