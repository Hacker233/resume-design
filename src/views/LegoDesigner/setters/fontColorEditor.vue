<template>
  <div class="font-color-editor-box">
    <el-form-item label="字体颜色:">
      <color-picker-custom-vue v-model="widgetItem.css.fontColor"></color-picker-custom-vue>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import useSelectWidgetItem from '../hooks/useSelectWidgetItem';
  import ColorPickerCustomVue from '../components/ColorPicker/ColorPickerCustom.vue';

  const props = defineProps<{
    id: string;
    pageIndex: number;
  }>();

  // 选中的widgetItem
  const { widgetItem } = useSelectWidgetItem(props.id, props.pageIndex);
</script>
