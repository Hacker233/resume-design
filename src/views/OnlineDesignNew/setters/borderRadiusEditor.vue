<template>
  <div class="border-radius-editor-box">
    <el-form-item label="圆角:">
      <el-input-number v-model="widgetItem.css.borderRadius" :min="0" />
      <span class="unit">像素</span>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import useSelectWidgetItem from '../hooks/useSelectWidgetItem';

  const props = defineProps<{
    id: string;
  }>();

  // 选中的widgetItem
  const { widgetItem } = useSelectWidgetItem(props.id);
</script>
<style lang="scss" scoped>
  .border-radius-editor-box {
    .unit {
      margin-left: 10px;
      color: #929292;
      letter-spacing: 2px;
    }
  }
</style>
