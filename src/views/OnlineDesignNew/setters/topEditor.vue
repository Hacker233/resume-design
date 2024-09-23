<template>
  <div class="top-editor-box">
    <el-form-item label="Y坐标:">
      <el-input-number v-model="widgetItem.css.top" />
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
