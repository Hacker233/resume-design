<template>
  <div class="top-editor-box">
    <el-form-item label="Y坐标:">
      <el-input-number :model-value="top" @change="handleCHange" />
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

  // Y坐标
  const top = ref<number>(widgetItem.css.top - 50 * (props.pageIndex + 1) - props.pageIndex * 1160);

  watch(
    () => widgetItem.css.top,
    () => {
      top.value = widgetItem.css.top - 50 * (props.pageIndex + 1) - props.pageIndex * 1160;
    }
  );

  // 数值发生改变
  const handleCHange = (value: number) => {
    widgetItem.css.top = value + 50 * (props.pageIndex + 1) + props.pageIndex * 1160;
  };
</script>
