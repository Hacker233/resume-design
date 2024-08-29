<template>
  <div class="month-editor-box">
    <el-form-item label="年月选择:">
      <el-date-picker
        v-model="widgetItem.dataSource.month"
        type="month"
        placeholder="请选择年月"
        value-format="YYYY.MM"
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
