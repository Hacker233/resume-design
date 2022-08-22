<template>
  <el-form-item :label="`${colorLabel}:`">
    <color-picker-custom-vue v-model="modelItem.style.titleColor"></color-picker-custom-vue>
  </el-form-item>
  <el-form-item :label="`${fontSizeLabel}:`">
    <el-select v-model="modelItem.style.titleFontSize" class="m-2" placeholder="Select">
      <el-option v-for="(item, index) in fontSizeList" :key="index" :label="item" :value="item" />
    </el-select>
  </el-form-item>
  <el-form-item :label="`${fontWeightLabel}:`">
    <el-select v-model="modelItem.style.titleFontWeight" class="m-2" placeholder="Select">
      <el-option v-for="(item, index) in fontWeightList" :key="index" :label="item" :value="item" />
    </el-select>
  </el-form-item>
</template>
<script setup lang="ts">
  import { useFontSizeList } from '@/hooks/useFontSizeList';
  import ColorPickerCustomVue from '@/components/ColorPicker/ColorPickerCustom.vue';
  import useDesignSelectModelItem from '@/hooks/material/useDesignSelectModelItem';
  interface IProps {
    colorLabel?: string;
    fontSizeLabel?: string;
    fontWeightLabel?: string;
  }
  withDefaults(defineProps<IProps>(), {
    colorLabel: '标题字体颜色',
    fontSizeLabel: '标题字体大小',
    fontWeightLabel: '标题字体粗细'
  });
  // 选中的模块
  const { modelItem } = useDesignSelectModelItem();
  // 字体大小
  const fontSizeList = useFontSizeList();
  // 字体粗细
  const fontWeightList = reactive<Array<number>>([100, 200, 300, 400, 500, 600, 700, 800, 900]);
</script>
