<template>
  <div class="width-editor-box">
    <el-form-item label="宽度:">
      <el-input-number v-model="widgetItem.css.width" :min="-300" :max="300" />
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
