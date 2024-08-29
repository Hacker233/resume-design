<template>
  <div class="font-weight-editor-box">
    <el-form-item label="文本内容:">
      <el-input v-model="widgetItem.dataSource.text" type="textarea" :rows="4" />
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import useSelectWidgetItem from '../../hooks/useSelectWidgetItem';

  const props = defineProps<{
    id: string;
    pageIndex: number;
  }>();

  // 选中的widgetItem
  const { widgetItem } = useSelectWidgetItem(props.id, props.pageIndex);
</script>
