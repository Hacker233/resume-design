<template>
  <div class="letter-space-editor-box">
    <el-form-item label="字间距:">
      <el-input-number v-model="widgetItem.css.letterSpace" :min="0" />
      <span class="unit">像素</span>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import useSelectWidgetItem from '../hooks/useSelectWidgetItem';

  const props = defineProps<{
    id: string;
    pageIndex: number;
  }>();

  // 选中的widgetItem
  const { widgetItem } = useSelectWidgetItem(props.id, props.pageIndex);
</script>
<style lang="scss" scoped>
  .letter-space-editor-box {
    .unit {
      margin-left: 10px;
      color: #929292;
      letter-spacing: 2px;
    }
  }
</style>
