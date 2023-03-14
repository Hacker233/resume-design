<template>
  <div class="rotate-editor-box">
    <el-form-item label="旋转角度:">
      <el-input-number v-model="widgetItem.css.rotate" :min="-360" :max="360" />
      <span class="unit">deg</span>
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
  .rotate-editor-box {
    .unit {
      margin-left: 10px;
      color: #929292;
      letter-spacing: 2px;
    }
  }
</style>
