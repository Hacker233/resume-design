<!-- 全局主题设置 -->
<template>
  <div class="resume-theme-box">
    <el-form label-width="120px" label-position="left">
      <!-- 简历背景选择 -->
      <el-form-item label="背景选择:">
        <resume-background-popover></resume-background-popover>
      </el-form-item>
      <!-- 左右布局时主题颜色配置 -->
      <template v-if="resumeJsonNewStore.LAYOUT === 'leftRight'">
        <el-form-item label="左侧主题颜色:">
          <color-picker-custom-vue
            v-model="resumeJsonNewStore.GLOBAL_STYLE.leftThemeColor"
          ></color-picker-custom-vue>
        </el-form-item>
        <el-form-item label="左侧容器宽度：">
          <el-input-number v-model="form.leftWidth" :min="0" :max="820" @change="handleLeftWidth" />
        </el-form-item>
        <el-form-item label="右侧主题颜色:">
          <color-picker-custom-vue
            v-model="resumeJsonNewStore.GLOBAL_STYLE.rightThemeColor"
          ></color-picker-custom-vue>
        </el-form-item>
        <el-form-item label="右侧容器宽度：">
          <el-input-number
            v-model="form.rightWidth"
            :min="0"
            :max="820"
            @change="handleRightWidth"
          />
        </el-form-item>
      </template>
      <el-form-item label="主题颜色:">
        <color-picker-custom-vue
          v-model="resumeJsonNewStore.GLOBAL_STYLE.themeColor"
          @change="changeThemeColor"
        ></color-picker-custom-vue>
      </el-form-item>
      <!-- 字体选择 -->
      <el-form-item label="字体选择:">
        <el-select
          v-model="resumeJsonNewStore.GLOBAL_STYLE.fontFamily"
          class="m-2"
          placeholder="请选择字体"
          @change="secondFontFamilyChange"
        >
          <el-option
            v-for="(item, index) in fontFamilyList"
            :key="index"
            :label="item"
            :value="item"
            :style="{ fontFamily: item }"
          />
        </el-select>
      </el-form-item>
      <!-- 字体大小设置 -->
      <el-form-item label="模块标题字体大小:">
        <el-select
          v-model="resumeJsonNewStore.GLOBAL_STYLE.firstTitleFontSize"
          class="m-2"
          placeholder="请选择"
          @change="changeFirstTitleFontSize"
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
          v-model="resumeJsonNewStore.GLOBAL_STYLE.secondTitleFontSize"
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
          v-model="resumeJsonNewStore.GLOBAL_STYLE.textFontSize"
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
          v-model="resumeJsonNewStore.GLOBAL_STYLE.secondTitleColor"
          @change="secondTitleColorChange"
        ></color-picker-custom-vue>
      </el-form-item>
      <el-form-item label="正文字体颜色:">
        <color-picker-custom-vue
          v-model="resumeJsonNewStore.GLOBAL_STYLE.textFontColor"
          @change="textColorChange"
        ></color-picker-custom-vue>
      </el-form-item>
      <!-- 字体粗细设置 -->
      <el-form-item label="二级标题字体粗细:">
        <el-select
          v-model="resumeJsonNewStore.GLOBAL_STYLE.secondTitleWeight"
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
          v-model="resumeJsonNewStore.GLOBAL_STYLE.textFontWeight"
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
      <el-divider>间距调整</el-divider>
      <el-form-item label="计数器模式:">
        <el-switch v-model="countModel" @change="handleChangeCountModel" />
      </el-form-item>
      <!-- 模块上下边距设置 -->
      <el-form-item label="模块上外边距:">
        <el-slider
          v-show="!countModel"
          v-model="mTop"
          :min="-300"
          :max="300"
          @input="handleChange"
        />
        <el-input-number
          v-show="countModel"
          v-model="mTop"
          :min="-100"
          :max="100"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="模块下外边距:">
        <el-slider
          v-show="!countModel"
          v-model="mBottom"
          :min="-300"
          :max="300"
          @input="handleChangeMBottom"
        />
        <el-input-number
          v-show="countModel"
          v-model="mBottom"
          :min="-100"
          :max="100"
          @change="handleChangeMBottom"
        />
      </el-form-item>

      <!-- 模块上内边距 -->
      <el-form-item label="模块上内边距:">
        <el-slider
          v-show="!countModel"
          v-model="pTop"
          :min="-300"
          :max="300"
          @input="handleChangePTop"
        />
        <el-input-number
          v-show="countModel"
          v-model="pTop"
          :min="-100"
          :max="100"
          @change="handleChangePTop"
        />
      </el-form-item>
      <!-- 模块下内边距 -->
      <el-form-item label="模块下内边距:">
        <el-slider
          v-show="!countModel"
          v-model="pBottom"
          :min="-300"
          :max="300"
          @input="handleChangePBottom"
        />
        <el-input-number
          v-show="countModel"
          v-model="pBottom"
          :min="-100"
          :max="100"
          @change="handleChangePBottom"
        />
      </el-form-item>

      <!-- 模块左右内边距 -->
      <el-form-item label="模块左右内边距:">
        <el-slider
          v-show="!countModel"
          v-model="pLeftRight"
          :min="-300"
          :max="300"
          @input="handleChangePLeftRight"
        />
        <el-input-number
          v-show="countModel"
          v-model="pLeftRight"
          :min="-100"
          :max="100"
          @change="handleChangePLeftRight"
        />
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
  import ResumeBackgroundPopover from '@/components/ResumeBackgroundPopover/ResumeBackgroundPopover.vue';
  import { useFontFamilyList } from '@/hooks/useFontFamlyList';

  const { resumeJsonNewStore } = appStore.useResumeJsonNewStore;
  const countModel = ref<boolean>(false);
  const localCountModel = localStorage.getItem('countModel');
  if (localCountModel === '1') {
    countModel.value = true;
  } else {
    countModel.value = false;
  }

  // 计数器模式变化
  const handleChangeCountModel = (value: boolean) => {
    if (value) {
      localStorage.setItem('countModel', '1');
    } else {
      localStorage.setItem('countModel', '0');
    }
  };

  // 表单数据
  const form = reactive({
    leftWidth: 270,
    rightWidth: 550
  });
  // 左侧宽度改变
  const handleLeftWidth = (value: number) => {
    form.rightWidth = 820 - value;
    resumeJsonNewStore.GLOBAL_STYLE.leftWidth = `${form.leftWidth}px`;
    resumeJsonNewStore.GLOBAL_STYLE.rightWidth = `${820 - value}px`;
  };

  // 右侧宽度改变
  const handleRightWidth = (value: number) => {
    form.leftWidth = 820 - value;
    resumeJsonNewStore.GLOBAL_STYLE.rightWidth = `${form.rightWidth}px`;
    resumeJsonNewStore.GLOBAL_STYLE.leftWidth = `${820 - value}px`;
  };

  // 改变主题色
  const changeThemeColor = (item: { rgb: string; hex: string }) => {
    // 改变一级标题颜色
    resumeJsonNewStore.COMPONENTS.forEach((cptItem: IMATERIALITEM) => {
      cptItem.style.themeColor = item.hex;
    });
    console.log('改变主题色后的COMPONENTS', resumeJsonNewStore.COMPONENTS);
  };
  // 改变一级字体大小
  const changeFirstTitleFontSize = (value: string) => {
    resumeJsonNewStore.COMPONENTS.forEach((cptItem: IMATERIALITEM) => {
      cptItem.style.firstTitleFontSize = value;
    });
  };

  // 字体大小
  const fontSizeList = useFontSizeList();

  // 字体列表
  const fontFamilyList = useFontFamilyList();

  // 字体粗细
  const fontWeightList = reactive<Array<number>>([100, 200, 300, 400, 500, 600, 700, 800, 900]);

  // 字体变化
  const secondFontFamilyChange = (value: string) => {
    console.log(value);
  };

  // 二级标题字体大小发生变化时
  const secondTitleFontSizeChange = (value: string) => {
    resumeJsonNewStore.COMPONENTS.forEach((cptItem: IMATERIALITEM) => {
      cptItem.style.titleFontSize = value;
    });
  };

  // 正文字体大小发生变化
  const textFontSizeChange = (value: string) => {
    resumeJsonNewStore.COMPONENTS.forEach((cptItem: IMATERIALITEM) => {
      cptItem.style.titleFontSize = value;
    });
  };

  // 二级标题颜色改变
  const secondTitleColorChange = (item: { hex: string; rgba: string }) => {
    resumeJsonNewStore.COMPONENTS.forEach((cptItem: IMATERIALITEM) => {
      cptItem.style.titleColor = item.hex;
    });
  };

  // 正文字体颜色发生改变
  const textColorChange = (item: { hex: string; rgba: string }) => {
    resumeJsonNewStore.COMPONENTS.forEach((cptItem: IMATERIALITEM) => {
      cptItem.style.textColor = item.hex;
    });
  };

  // 二级标题字体粗细
  const secondTitleWeightChange = (value: number) => {
    resumeJsonNewStore.COMPONENTS.forEach((cptItem: IMATERIALITEM) => {
      cptItem.style.titleFontWeight = value;
    });
  };

  // 正文字体粗细
  const textFontWeight = (value: number) => {
    resumeJsonNewStore.COMPONENTS.forEach((cptItem: IMATERIALITEM) => {
      cptItem.style.textFontWeight = value;
    });
  };

  // 上外边距
  const defaultMtop: number = pxTonumber(resumeJsonNewStore.GLOBAL_STYLE.modelMarginTop);
  const mTop = ref<number>(defaultMtop);
  const handleChange = (value: number): void => {
    if (resumeJsonNewStore.GLOBAL_STYLE) {
      resumeJsonNewStore.GLOBAL_STYLE.modelMarginTop = value + 'px';
    }
    resumeJsonNewStore.COMPONENTS.forEach((item) => {
      item.style.mTop = resumeJsonNewStore.GLOBAL_STYLE.modelMarginTop;
    });
  };
  // 下外边距
  const defaultMbottom: number = pxTonumber(resumeJsonNewStore.GLOBAL_STYLE.modelMarginBottom);
  const mBottom = ref<number>(defaultMbottom);
  const handleChangeMBottom = (value: number): void => {
    if (resumeJsonNewStore.GLOBAL_STYLE) {
      resumeJsonNewStore.GLOBAL_STYLE.modelMarginBottom = value + 'px';
    }
    resumeJsonNewStore.COMPONENTS.forEach((item) => {
      item.style.mBottom = resumeJsonNewStore.GLOBAL_STYLE.modelMarginBottom;
    });
  };

  // 上内边距
  const defaultPTop: number = pxTonumber(resumeJsonNewStore.GLOBAL_STYLE.pTop);
  const pTop = ref<number>(defaultPTop);
  const handleChangePTop = (value: number): void => {
    if (resumeJsonNewStore.GLOBAL_STYLE) {
      resumeJsonNewStore.GLOBAL_STYLE.pTop = value + 'px';
    }
    resumeJsonNewStore.COMPONENTS.forEach((item) => {
      item.style.pTop = resumeJsonNewStore.GLOBAL_STYLE.pTop;
    });
  };
  // 下边距
  const defaultPBottom: number = pxTonumber(resumeJsonNewStore.GLOBAL_STYLE.pBottom);
  const pBottom = ref<number>(defaultPBottom);
  const handleChangePBottom = (value: number): void => {
    if (resumeJsonNewStore.GLOBAL_STYLE) {
      resumeJsonNewStore.GLOBAL_STYLE.pBottom = value + 'px';
    }
    resumeJsonNewStore.COMPONENTS.forEach((item) => {
      item.style.pBottom = resumeJsonNewStore.GLOBAL_STYLE.pBottom;
    });
  };

  // 左右内边距
  const defaultPLeftRight: number = pxTonumber(resumeJsonNewStore.GLOBAL_STYLE.pLeftRight);
  const pLeftRight = ref<number>(defaultPLeftRight);
  const handleChangePLeftRight = (value: number): void => {
    if (resumeJsonNewStore.GLOBAL_STYLE) {
      resumeJsonNewStore.GLOBAL_STYLE.pLeftRight = value + 'px';
    }
    resumeJsonNewStore.COMPONENTS.forEach((item) => {
      item.style.pLeftRight = resumeJsonNewStore.GLOBAL_STYLE.pLeftRight;
    });
  };
</script>
<style lang="scss" scoped>
  .resume-theme-box {
    padding: 20px;
    box-sizing: border-box;
  }
</style>
