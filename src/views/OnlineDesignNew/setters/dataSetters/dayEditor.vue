<template>
  <div class="day-editor-box">
    <el-form-item label="日期选择:">
      <el-date-picker
        v-model="widgetItem.dataSource.day"
        type="date"
        placeholder="请选择日期"
        value-format="YYYY.MM.DD"
      />
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import useSelectWidgetItem from '../../hooks/useSelectWidgetItem';

  const props = defineProps<{
    id: string;
  }>();

  // 选中的widgetItem
  const { widgetItem } = useSelectWidgetItem(props.id);
</script>
