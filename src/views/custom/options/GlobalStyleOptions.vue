<!-- 全局主题设置 -->
<template>
  <div class="resume-theme-box">
    <el-form label-width="120px" label-position="left">
      <el-form-item label="主题颜色:">
        <color-picker-custom-vue
          v-model="designJsonStore.GLOBAL_STYLE.themeColor"
          @change="changeThemeColor"
        ></color-picker-custom-vue>
      </el-form-item>
      <!-- 字体大小设置 -->
      <el-form-item label="模块标题字体大小:">
        <el-select
          v-model="designJsonStore.GLOBAL_STYLE.firstTitleFontSize"
          @change="changeFirstTitleFontSize"
          class="m-2"
          placeholder="请选择"
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
          v-model="designJsonStore.GLOBAL_STYLE.secondTitleFontSize"
          class="m-2"
          placeholder="请选择"
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
          v-model="designJsonStore.GLOBAL_STYLE.textFontSize"
          class="m-2"
          placeholder="请选择"
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
          v-model="designJsonStore.GLOBAL_STYLE.secondTitleColor"
          @change="secondTitleColorChange"
        ></color-picker-custom-vue>
      </el-form-item>
      <el-form-item label="正文字体颜色:">
        <color-picker-custom-vue
          v-model="designJsonStore.GLOBAL_STYLE.textFontColor"
          @change="textColorChange"
        ></color-picker-custom-vue>
      </el-form-item>
      <!-- 字体粗细设置 -->
      <el-form-item label="二级标题字体粗细:">
        <el-select
          v-model="designJsonStore.GLOBAL_STYLE.secondTitleWeight"
          class="m-2"
          placeholder="请选择"
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
          v-model="designJsonStore.GLOBAL_STYLE.textFontWeight"
          class="m-2"
          placeholder="请选择"
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
  import appStore from '@/store';
  import { pxTonumber } from '@/utils/common';
  import { useFontSizeList } from '@/hooks/useFontSizeList';
  import ColorPickerCustomVue from '@/components/ColorPicker/ColorPickerCustom.vue';
  import { IMATERIALITEM } from '@/interface/material';

  const { designJsonStore } = appStore.useDesignStore;

  // 改变主题色
  const changeThemeColor = (item: { rgb: string; hex: string }) => {
    // 改变一级标题颜色
    designJsonStore.components.forEach((cptItem: IMATERIALITEM) => {
      cptItem.style.themeColor = item.hex;
    });
  };
  // 改变一级字体大小
  const changeFirstTitleFontSize = (value: string) => {
    designJsonStore.components.forEach((cptItem: IMATERIALITEM) => {
      cptItem.style.firstTitleFontSize = value;
    });
  };

  // 字体大小
  const fontSizeList = useFontSizeList();

  // 字体粗细
  const fontWeightList = reactive<Array<number>>([100, 200, 300, 400, 500, 600, 700, 800, 900]);

  // 二级标题字体大小发生变化时
  const secondTitleFontSizeChange = (value: string) => {
    designJsonStore.components.forEach((cptItem: IMATERIALITEM) => {
      cptItem.style.titleFontSize = value;
    });
  };

  // 正文字体大小发生变化
  const textFontSizeChange = (value: string) => {
    designJsonStore.components.forEach((cptItem: IMATERIALITEM) => {
      cptItem.style.titleFontSize = value;
    });
  };

  // 二级标题颜色改变
  const secondTitleColorChange = (item: { hex: string; rgba: string }) => {
    designJsonStore.components.forEach((cptItem: IMATERIALITEM) => {
      cptItem.style.titleColor = item.hex;
    });
  };

  // 正文字体颜色发生改变
  const textColorChange = (item: { hex: string; rgba: string }) => {
    designJsonStore.components.forEach((cptItem: IMATERIALITEM) => {
      cptItem.style.textColor = item.hex;
    });
  };

  // 二级标题字体粗细
  const secondTitleWeightChange = (value: number) => {
    designJsonStore.components.forEach((cptItem: IMATERIALITEM) => {
      cptItem.style.titleFontWeight = value;
    });
  };

  // 正文字体粗细
  const textFontWeight = (value: number) => {
    designJsonStore.components.forEach((cptItem: IMATERIALITEM) => {
      cptItem.style.textFontWeight = value;
    });
  };

  // 上外边距
  const defaultMtop: number = pxTonumber(designJsonStore.GLOBAL_STYLE.modelMarginTop);
  const mTop = ref<number>(defaultMtop);
  const handleChange = (value: number): void => {
    if (designJsonStore.GLOBAL_STYLE) {
      designJsonStore.GLOBAL_STYLE.modelMarginTop = value + 'px';
    }
    designJsonStore.components.forEach((item) => {
      item.style.mTop = designJsonStore.GLOBAL_STYLE.modelMarginTop;
    });
  };
  // 下外边距
  const defaultMbottom: number = pxTonumber(designJsonStore.GLOBAL_STYLE.modelMarginBottom);
  const mBottom = ref<number>(defaultMbottom);
  const handleChangeMBottom = (value: number): void => {
    if (designJsonStore.GLOBAL_STYLE) {
      designJsonStore.GLOBAL_STYLE.modelMarginBottom = value + 'px';
    }
    designJsonStore.components.forEach((item) => {
      item.style.mBottom = designJsonStore.GLOBAL_STYLE.modelMarginBottom;
    });
  };
</script>
<style lang="scss" scoped>
  .resume-theme-box {
    padding: 20px;
    box-sizing: border-box;
  }
</style>
