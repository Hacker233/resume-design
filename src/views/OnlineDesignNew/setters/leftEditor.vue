<template>
  <div class="left-editor-box">
    <el-form-item label="X坐标:">
      <el-input-number v-model="widgetItem.css.left" />
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
