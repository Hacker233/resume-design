<!-- 简历主题设置 -->
<template>
  <div class="resume-theme-box">
    <el-form label-width="120px" label-position="left">
      <el-form-item label="主题颜色:">
        <color-picker-custom-vue
          v-model="resumeJsonStore.GLOBAL_STYLE.themeColor"
        ></color-picker-custom-vue>
      </el-form-item>
      <!-- 字体大小设置 -->
      <el-form-item label="模块标题字体大小:">
        <el-select
          v-model="resumeJsonStore.GLOBAL_STYLE.firstTitleFontSize"
          class="m-2"
          placeholder="Select"
        >
          <el-option
            v-for="(item, index) in fontSizeList"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级标题字体大小:">
        <el-select
          v-model="resumeJsonStore.GLOBAL_STYLE.secondTitleFontSize"
          class="m-2"
          placeholder="Select"
          @change="secondTitleFontSizeChange"
        >
          <el-option
            v-for="(item, index) in fontSizeList"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="正文字体大小:">
        <el-select
          v-model="resumeJsonStore.GLOBAL_STYLE.textFontSize"
          class="m-2"
          placeholder="Select"
          @change="textFontSizeChange"
        >
          <el-option
            v-for="(item, index) in fontSizeList"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <!-- 字体颜色设置 -->
      <el-form-item label="二级标题颜色:">
        <color-picker-custom-vue
          v-model="resumeJsonStore.GLOBAL_STYLE.secondTitleColor"
          @change="secondTitleColorChange"
        ></color-picker-custom-vue>
      </el-form-item>
      <el-form-item label="正文字体颜色:">
        <color-picker-custom-vue
          v-model="resumeJsonStore.GLOBAL_STYLE.textFontColor"
          @change="textColorChange"
        ></color-picker-custom-vue>
      </el-form-item>
      <!-- 字体粗细设置 -->
      <el-form-item label="二级标题字体粗细:">
        <el-select
          v-model="resumeJsonStore.GLOBAL_STYLE.secondTitleWeight"
          class="m-2"
          placeholder="Select"
          @change="secondTitleWeightChange"
        >
          <el-option
            v-for="(item, index) in fontWeightList"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="正文字体粗细:">
        <el-select
          v-model="resumeJsonStore.GLOBAL_STYLE.textFontWeight"
          class="m-2"
          placeholder="Select"
          @change="textFontWeight"
        >
          <el-option
            v-for="(item, index) in fontWeightList"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <!-- 模块上下边距设置 -->
      <el-form-item label="模块上外边距:">
        <el-input-number v-model="mTop" :min="-100" :max="100" @change="handleChange" />
      </el-form-item>
      <el-form-item label="模块下外边距:">
        <el-input-number v-model="mBottom" :min="-100" :max="100" @change="handleChangeMBottom" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
  import { useResumeJsonStore } from '@/store/resume';
  import { reactive, ref } from 'vue';
  import { pxTonumber } from '@/utils/common';
  import { useFontSizeList } from '@/hooks/useFontSizeList';
  import ColorPickerCustomVue from '../ColorPicker/ColorPickerCustom.vue';
  const { resumeJsonStore } = useResumeJsonStore();

  // 字体大小
  const fontSizeList = useFontSizeList();

  // 字体粗细
  const fontWeightList = reactive<Array<number>>([100, 200, 300, 400, 500, 600, 700, 800, 900]);

  // 二级标题字体大小发生变化时
  const secondTitleFontSizeChange = (value: string) => {
    resumeJsonStore.LIST.forEach((item) => {
      if (item.model !== 'BASE_INFO') {
        item.style.titleFontSize = value;
      }
    });
  };

  // 正文字体大小发生变化
  const textFontSizeChange = (value: string) => {
    resumeJsonStore.LIST.forEach((item) => {
      item.style.textFontSize = value;
    });
  };

  // 二级标题颜色改变
  const secondTitleColorChange = (value: { hex: string; rgba: string }) => {
    resumeJsonStore.LIST.forEach((item) => {
      item.style.titleColor = value.hex;
    });
  };

  // 正文字体颜色发生改变
  const textColorChange = (value: { hex: string; rgba: string }) => {
    resumeJsonStore.LIST.forEach((item) => {
      item.style.textColor = value.hex;
    });
  };

  // 二级标题字体粗细
  const secondTitleWeightChange = (value: number) => {
    resumeJsonStore.LIST.forEach((item) => {
      item.style.titleFontWeight = value;
    });
  };

  // 正文字体粗细
  const textFontWeight = (value: number) => {
    resumeJsonStore.LIST.forEach((item) => {
      item.style.textFontWeight = value;
    });
  };

  // 上外边距
  const defaultMtop: number = pxTonumber(resumeJsonStore.GLOBAL_STYLE.modelMarginTop);
  const mTop = ref<number>(defaultMtop);
  const handleChange = (value: number): void => {
    if (resumeJsonStore.GLOBAL_STYLE) {
      resumeJsonStore.GLOBAL_STYLE.modelMarginTop = value + 'px';
    }
    resumeJsonStore.LIST.forEach((item) => {
      item.style.mTop = resumeJsonStore.GLOBAL_STYLE.modelMarginTop;
    });
  };
  // 下外边距
  const defaultMbottom: number = pxTonumber(resumeJsonStore.GLOBAL_STYLE.modelMarginBottom);
  const mBottom = ref<number>(defaultMbottom);
  const handleChangeMBottom = (value: number): void => {
    if (resumeJsonStore.GLOBAL_STYLE) {
      resumeJsonStore.GLOBAL_STYLE.modelMarginBottom = value + 'px';
    }
    resumeJsonStore.LIST.forEach((item) => {
      item.style.mBottom = resumeJsonStore.GLOBAL_STYLE.modelMarginBottom;
    });
  };
</script>
<style lang="scss" scoped>
  .resume-theme-box {
    padding: 20px;
    box-sizing: border-box;
  }
</style>
