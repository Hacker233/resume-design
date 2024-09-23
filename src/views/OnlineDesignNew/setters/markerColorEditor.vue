<template>
  <div class="marker-color-editor-box">
    <el-form-item label="标记颜色:">
      <color-picker-custom-vue v-model="widgetItem.css.markerColor"></color-picker-custom-vue>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
  import useSelectWidgetItem from '../hooks/useSelectWidgetItem';
  import ColorPickerCustomVue from '../components/ColorPicker/ColorPickerCustom.vue';

  const props = defineProps<{
    id: string;
  }>();

  // 选中的widgetItem
  const { widgetItem } = useSelectWidgetItem(props.id);
</script>
