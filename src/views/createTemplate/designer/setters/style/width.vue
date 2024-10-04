<template>
  <div class="width-editor-box">
    <el-form-item size="default" label="宽度:">
      <el-input-number v-model="module.css.width" size="default" :min="0" />
      <span class="unit">像素</span>
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
  .width-editor-box {
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
    .unit {
      margin-left: 10px;
      color: #929292;
      letter-spacing: 2px;
    }
  }
</style>
