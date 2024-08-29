<template>
  <div class="year-editor-box">
    <el-form-item label="年份选择:">
      <el-date-picker
        v-model="widgetItem.dataSource.year"
        type="year"
        placeholder="请选择年份"
        value-format="YYYY"
      />
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
