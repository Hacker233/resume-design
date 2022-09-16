<template>
  <el-form-item label="字体颜色:">
    <color-picker-custom-vue v-model="modelItem.style.textColor"></color-picker-custom-vue>
  </el-form-item>
  <el-form-item label="字体大小:">
    <el-select v-model="modelItem.style.textFontSize" class="m-2" placeholder="Select">
      <el-option v-for="(item, index) in fontSizeList" :key="index" :label="item" :value="item" />
    </el-select>
  </el-form-item>
  <el-form-item label="字体粗细:">
    <el-select v-model="modelItem.style.textFontWeight" class="m-2" placeholder="Select">
      <el-option v-for="(item, index) in fontWeightList" :key="index" :label="item" :value="item" />
    </el-select>
  </el-form-item>
  <el-form-item label="上外边距:">
    <el-input-number v-model="mTop" :min="-300" :max="300" @change="handleChange" />
  </el-form-item>
  <el-form-item label="下外边距:">
    <el-input-number v-model="mBottom" :min="-300" :max="300" @change="handleChangeMBottom" />
  </el-form-item>
  <el-form-item label="上内边距:">
    <el-input-number v-model="pTop" :min="-300" :max="300" @change="handleChangePTop" />
  </el-form-item>
  <el-form-item label="下内边距:">
    <el-input-number v-model="pBottom" :min="-300" :max="300" @change="handleChangePBottom" />
  </el-form-item>
  <el-form-item label="左右内边距:">
    <el-input-number v-model="pLeftRight" :min="-300" :max="300" @change="handleChangePLeftRight" />
  </el-form-item>
</template>
<script lang="ts" setup>
  import { useFontSizeList } from '@/hooks/useFontSizeList';
  import { pxTonumber } from '@/utils/common';
  import ColorPickerCustomVue from '@/components/ColorPicker/ColorPickerCustom.vue';
  import useDesignSelectModelItem from '@/hooks/material/useDesignSelectModelItem';

  // 选中的模块
  const { modelItem } = useDesignSelectModelItem();

  // 字体大小
  const fontSizeList = useFontSizeList();
  // 字体粗细
  const fontWeightList = reactive<Array<number>>([100, 200, 300, 400, 500, 600, 700, 800, 900]);
  // 上外边距
  const defaultMtop: number = pxTonumber(modelItem.style.mTop);
  const mTop = ref<number>(defaultMtop);
  const handleChange = (value: number): void => {
    modelItem.style.mTop = value + 'px';
  };

  // 下外边距
  const defaultMbottom: number = pxTonumber(modelItem.style.mBottom);
  const mBottom = ref<number>(defaultMbottom);
  const handleChangeMBottom = (value: number): void => {
    modelItem.style.mBottom = value + 'px';
  };

  // 上内边距
  const defaultPTop: number = pxTonumber(modelItem.style.pTop);
  const pTop = ref<number>(defaultPTop);
  const handleChangePTop = (value: number): void => {
    modelItem.style.pTop = value + 'px';
  };

  // 下内边距
  const defaultPBottom: number = pxTonumber(modelItem.style.pBottom);
  const pBottom = ref<number>(defaultPBottom);
  const handleChangePBottom = (value: number): void => {
    modelItem.style.pBottom = value + 'px';
  };

  // 左右内边距
  const defaultPLeftRight: number = pxTonumber(modelItem.style.pLeftRight);
  const pLeftRight = ref<number>(defaultPLeftRight);
  const handleChangePLeftRight = (value: number): void => {
    modelItem.style.pLeftRight = value + 'px';
  };
</script>
