<template>
  <div class="marker-size-editor-box">
    <el-form-item label="标记大小:">
      <el-input-number v-model="widgetItem.css.markerSize" :min="0" />
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
  .marker-size-editor-box {
    .unit {
      margin-left: 10px;
      color: #929292;
      letter-spacing: 2px;
    }
  }
</style>
