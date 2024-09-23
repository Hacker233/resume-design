<template>
  <div class="border-width-editor-box">
    <el-form-item label="边框宽度:">
      <el-input-number v-model="widgetItem.css.borderWidth" :min="0" @change="handleChange" />
      <span class="unit">像素</span>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import useSelectWidgetItem from '../hooks/useSelectWidgetItem';
  import appStore from '@/store';

  const props = defineProps<{
    id: string;
  }>();

  // 选中的widgetItem
  const { widgetItem } = useSelectWidgetItem(props.id);
  const { HJSchemaJsonStore } = storeToRefs(appStore.useOnlineDesignNewJsonStore);
  const handleChange = () => {
    console.log('边框宽度改变', HJSchemaJsonStore);
  };
</script>
<style lang="scss" scoped>
  .border-width-editor-box {
    .unit {
      margin-left: 10px;
      color: #929292;
      letter-spacing: 2px;
    }
  }
</style>
