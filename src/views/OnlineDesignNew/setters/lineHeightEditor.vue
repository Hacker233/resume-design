<template>
  <div class="line-height-editor-box">
    <el-form-item label="行间距:">
      <el-input-number v-model="widgetItem.css.lineHeight" :min="0" :max="10" :step="0.5" />
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
