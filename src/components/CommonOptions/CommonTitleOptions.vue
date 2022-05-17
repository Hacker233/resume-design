<template>
  <el-form-item :label="`${colorLabel}:`">
    <color-picker v-model:rgba="modelItem.style.titleColor"></color-picker>
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
  import { useResumeJsonStore, useResumeModelStore } from '@/store/resume';
  import { reactive } from 'vue';
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
  // store
  const useModel = useResumeModelStore();
  const useResumeJson = useResumeJsonStore();
  // 选中的模块
  const modelItem = reactive(useResumeJson.LIST[useModel.index]);
  // 字体大小
  const fontSizeList = reactive<Array<string>>([
    '10px',
    '12px',
    '14px',
    '16px',
    '18px',
    '20px',
    '22px',
    '24px',
    '26px',
    '28px',
    '30px',
    '32px',
    '34px',
    '36px',
    '38px',
    '40px'
  ]);
  // 字体粗细
  const fontWeightList = reactive<Array<number>>([100, 200, 300, 400, 500, 600, 700, 800, 900]);
</script>
