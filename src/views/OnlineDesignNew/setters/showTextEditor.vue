<template>
  <div class="show-text-editor-box">
    <el-form-item label="提示文字:">
      <el-switch v-model="widgetItem.props.showText" />
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
