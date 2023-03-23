<template>
  <div class="font-weight-editor-box">
    <el-form-item label="字体粗细:">
      <el-input-number v-model="widgetItem.css.fontWeight" :min="0" :max="1000" :step="50" />
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
