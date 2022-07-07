<!-- 全局样式配置 -->
<template>
  <el-form label-width="100px" label-position="left">
    <el-form-item label="标题字体大小:">
      <el-select v-model="resumeJsonStore.TITLE_FONT_SIZE" class="m-2" placeholder="Select">
        <el-option v-for="(item, index) in fontSizeList" :key="index" :label="item" :value="item" />
      </el-select>
    </el-form-item>
    <el-form-item label="标题字体颜色:">
      <color-picker v-model:rgba="resumeJsonStore.TITLE_COLOR"></color-picker>
    </el-form-item>
    <el-form-item label="模块上外边距:">
      <el-input-number v-model="mTop" :min="-100" :max="100" @change="handleChange" />
    </el-form-item>
    <el-form-item label="模块下外边距:">
      <el-input-number v-model="mBottom" :min="-100" :max="100" @change="handleChangeMBottom" />
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
  import { useResumeJsonStore } from '@/store/resume';
  import { ref } from 'vue';
  import { pxTonumber } from '@/utils/common';
  import { useFontSizeList } from '@/hooks/useFontSizeList';
  const { resumeJsonStore } = useResumeJsonStore();

  // 字体大小
  const fontSizeList = useFontSizeList();

  // 上外边距
  const defaultMtop: number = pxTonumber(resumeJsonStore.MODEL_MARGIN_TOP);
  const mTop = ref<number>(defaultMtop);
  const handleChange = (value: number): void => {
    resumeJsonStore.MODEL_MARGIN_TOP = value + 'px';
    resumeJsonStore.LIST.forEach((item) => {
      item.style.mTop = resumeJsonStore.MODEL_MARGIN_TOP;
    });
  };
  // 下外边距
  const defaultMbottom: number = pxTonumber(resumeJsonStore.MODEL_MARGIN_BOTTOM);
  const mBottom = ref<number>(defaultMbottom);
  const handleChangeMBottom = (value: number): void => {
    resumeJsonStore.MODEL_MARGIN_BOTTOM = value + 'px';
    resumeJsonStore.LIST.forEach((item) => {
      item.style.mBottom = resumeJsonStore.MODEL_MARGIN_BOTTOM;
    });
  };
</script>
<style lang="less" scoped>
  .el-form {
    padding: 20px;
    display: flex;
    flex-direction: column;
  }
</style>
