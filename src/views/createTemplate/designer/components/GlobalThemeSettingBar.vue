<template>
  <div class="global-theme-setting-bar-box">
    <!-- 字体选择 -->
    <el-select
      v-model="defaultFamily"
      :teleported="true"
      placeholder="请选择字体"
      size="default"
      style="width: 130px"
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
    <!-- 字体大小 -->
    <el-select
      v-model="fontSize"
      :teleported="true"
      size="default"
      placeholder="请选择字号"
      style="width: 90px; margin: 0 0 0 10px"
      @change="secondFontSizeChange"
    >
      <el-option
        v-for="(item, index) in fontSizeList"
        :key="index"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <!-- 主题色 -->
    <div class="theme-color">
      <el-tooltip effect="light" content="主题颜色" placement="bottom">
        <color-picker-custom
          v-model="HJNewJsonStore.css.themeColor"
          :show-list="true"
          :list-number="5"
        ></color-picker-custom>
      </el-tooltip>
    </div>
    <!-- 行高 -->
    <div class="module-padding">
      <el-popover placement="bottom" :width="250" trigger="click">
        <template #reference>
          <div>
            <el-tooltip effect="light" content="行高" placement="bottom">
              <svg-icon icon-name="icon-ziyuan" color="#606266" size="27px"></svg-icon>
            </el-tooltip>
          </div>
        </template>
        <!-- 快捷操作列表 -->
        <div class="global-module-line-height-content-box">
          <div class="padding-item">
            <el-input-number
              v-model="lineHeight"
              :max="1000"
              :step="0.1"
              size="default"
              style="width: 100%"
              @change="handleChangeLineHeight"
            />
          </div>
        </div>
      </el-popover>
    </div>
    <!-- 模块内间距 -->
    <div class="module-padding">
      <el-popover placement="bottom" :width="350" trigger="click">
        <template #reference>
          <div>
            <el-tooltip effect="light" content="模块内边距" placement="bottom">
              <svg-icon icon-name="icon-23waibianju" color="#606266" size="28px"></svg-icon>
            </el-tooltip>
          </div>
        </template>
        <!-- 快捷操作列表 -->
        <div class="global-module-padding--popver-content-box">
          <template v-if="HJNewJsonStore.css?.modulePadding">
            <div class="padding-item">
              <p>上内边距</p>
              <el-slider v-model="HJNewJsonStore.css.modulePadding.top" show-input />
            </div>
            <div class="padding-item">
              <p>右内边距</p>
              <el-slider v-model="HJNewJsonStore.css.modulePadding.right" show-input />
            </div>
            <div class="padding-item">
              <p>下内边距</p>
              <el-slider v-model="HJNewJsonStore.css.modulePadding.bottom" show-input />
            </div>
            <div class="padding-item">
              <p>左内边距</p>
              <el-slider v-model="HJNewJsonStore.css.modulePadding.left" show-input />
            </div>
          </template>
        </div>
      </el-popover>
    </div>
    <!-- 模块外边距 -->
    <div class="module-padding">
      <el-popover placement="bottom" :width="350" trigger="click">
        <template #reference>
          <div>
            <el-tooltip effect="light" content="模块外边距" placement="bottom">
              <svg-icon icon-name="icon-waibianju" color="#606266" size="30px"></svg-icon>
            </el-tooltip>
          </div>
        </template>
        <!-- 快捷操作列表 -->
        <div class="global-module-padding--popver-content-box">
          <template v-if="HJNewJsonStore.css?.moduleMargin">
            <div class="padding-item">
              <p>上外边距</p>
              <el-slider v-model="HJNewJsonStore.css.moduleMargin.top" show-input />
            </div>
            <div class="padding-item">
              <p>右外边距</p>
              <el-slider v-model="HJNewJsonStore.css.moduleMargin.right" show-input />
            </div>
            <div class="padding-item">
              <p>下外边距</p>
              <el-slider v-model="HJNewJsonStore.css.moduleMargin.bottom" show-input />
            </div>
            <div class="padding-item">
              <p>左外边距</p>
              <el-slider v-model="HJNewJsonStore.css.moduleMargin.left" show-input />
            </div>
          </template>
        </div>
      </el-popover>
    </div>
    <!-- 模块标题整体切换 -->
    <div class="module-padding">
      <el-tooltip effect="light" content="模块标题全量替换" placement="bottom">
        <svg-icon
          icon-name="icon-mokuaizhuanhua"
          color="#606266"
          size="32px"
          @click="selectModuleTitle"
        ></svg-icon>
      </el-tooltip>
    </div>
    <!-- 标题整体外边距 -->
    <div class="module-padding">
      <el-popover placement="bottom" :width="350" trigger="click">
        <template #reference>
          <div>
            <el-tooltip effect="light" content="标题外边距" placement="bottom">
              <svg-icon icon-name="icon-icon3" color="#606266" size="30px"></svg-icon>
            </el-tooltip>
          </div>
        </template>
        <!-- 快捷操作列表 -->
        <div class="global-module-padding--popver-content-box">
          <div class="padding-item">
            <p>上外边距</p>
            <el-slider
              v-model="moduleTitleMargin.top"
              show-input
              @change="handleChangeModuleTitleMargin($event, 'top')"
            />
          </div>
          <div class="padding-item">
            <p>右外边距</p>
            <el-slider
              v-model="moduleTitleMargin.right"
              show-input
              @change="handleChangeModuleTitleMargin($event, 'right')"
            />
          </div>
          <div class="padding-item">
            <p>下外边距</p>
            <el-slider
              v-model="moduleTitleMargin.bottom"
              show-input
              @change="handleChangeModuleTitleMargin($event, 'bottom')"
            />
          </div>
          <div class="padding-item">
            <p>左外边距</p>
            <el-slider
              v-model="moduleTitleMargin.left"
              show-input
              @change="handleChangeModuleTitleMargin($event, 'left')"
            />
          </div>
        </div>
      </el-popover>
    </div>

    <!-- 标题整体内边距 -->
    <div class="module-padding">
      <el-popover placement="bottom" :width="350" trigger="click">
        <template #reference>
          <div>
            <el-tooltip effect="light" content="标题内边距" placement="bottom">
              <svg-icon icon-name="icon-beijingbianju" color="#606266" size="32px"></svg-icon>
            </el-tooltip>
          </div>
        </template>
        <!-- 快捷操作列表 -->
        <div class="global-module-padding--popver-content-box">
          <div class="padding-item">
            <p>上内边距</p>
            <el-slider
              v-model="moduleTitlePadding.top"
              show-input
              @change="handleChangeModuleTitlePadding($event, 'top')"
            />
          </div>
          <div class="padding-item">
            <p>右内边距</p>
            <el-slider
              v-model="moduleTitlePadding.right"
              show-input
              @change="handleChangeModuleTitlePadding($event, 'right')"
            />
          </div>
          <div class="padding-item">
            <p>下内边距</p>
            <el-slider
              v-model="moduleTitlePadding.bottom"
              show-input
              @change="handleChangeModuleTitlePadding($event, 'bottom')"
            />
          </div>
          <div class="padding-item">
            <p>左内边距</p>
            <el-slider
              v-model="moduleTitlePadding.left"
              show-input
              @change="handleChangeModuleTitlePadding($event, 'left')"
            />
          </div>
        </div>
      </el-popover>
    </div>

    <!-- 切换模块标题弹窗 -->
    <select-global-module-title-dialog
      :dialog-module-title-visible="dialogModuleTitleVisible"
      @cancle="handleCancleModuleTitle"
    ></select-global-module-title-dialog>
  </div>
</template>
<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useFontFamilyList } from '../hooks/useFontFamlyList';
  import appStore from '@/store';
  import ColorPickerCustom from './ColorPickerCustom.vue';
  import SelectGlobalModuleTitleDialog from './SelectGlobalModuleTitleDialog.vue';
  import { useFontSizeListPx } from '../hooks/useFontSizeList';
  import { moduleTitleCustomProp } from '../dicts/moduleTitleCssProp';

  const { HJNewJsonStore } = storeToRefs(appStore.useCreateTemplateStore);
  const defaultFamily = ref<string>('微软雅黑');
  if (!HJNewJsonStore.value.css?.fontFamily) {
    HJNewJsonStore.value.css.fontFamily = '微软雅黑';
  } else {
    defaultFamily.value = HJNewJsonStore.value.css.fontFamily;
  }

  // 字体列表
  const fontFamilyList = useFontFamilyList();

  // 字体变化
  const secondFontFamilyChange = (value: string) => {
    HJNewJsonStore.value.css.fontFamily = value;
  };

  // 字号
  const fontSize = ref<number>(14);

  // 字号列表
  const fontSizeList = useFontSizeListPx();

  // 字号变化
  const secondFontSizeChange = (value: number) => {
    console.log('字号变化', value);
    HJNewJsonStore.value.componentsTree.forEach((item: any) => {
      item.customCss.forEach((customCssItem: any) => {
        if (moduleTitleCustomProp.indexOf(customCssItem.prop) < 0) {
          customCssItem.css['fontSize'] = value;
        }
      });
    });
  };

  // 行高
  const lineHeight = ref<number>(2);

  // 行高变化
  const handleChangeLineHeight = (value: number) => {
    HJNewJsonStore.value.componentsTree.forEach((item: any) => {
      item.customCss.forEach((customCssItem: any) => {
        if (moduleTitleCustomProp.indexOf(customCssItem.prop) < 0) {
          customCssItem.css['lineHeight'] = value;
        }
      });
    });
  };

  // 打开切换模块title弹窗
  const dialogModuleTitleVisible = ref<boolean>(false);
  const selectModuleTitle = () => {
    dialogModuleTitleVisible.value = true;
  };

  // 关闭切换模块标题弹窗
  const handleCancleModuleTitle = () => {
    dialogModuleTitleVisible.value = false;
  };

  // 标题整体外边距
  const moduleTitleMargin = ref<any>({
    top: 0,
    right: 0,
    left: 0,
    bottom: 0
  });

  // 标题外边距发生变化
  const handleChangeModuleTitleMargin = ($event: number, key: string) => {
    console.log('标题外边距发生变化', $event, key);
    HJNewJsonStore.value.componentsTree.forEach((item: any) => {
      if (item.customProps.hasOwnProperty('ModuleTitleCpt')) {
        item.customCss.forEach((customCssItem: any) => {
          if (customCssItem.prop === 'moduleTitle') {
            customCssItem.css.margin[key] = $event;
          }
        });
      }
    });
  };

  // 标题整体内边距
  const moduleTitlePadding = ref<any>({
    top: 0,
    right: 0,
    left: 0,
    bottom: 0
  });

  // 标题外边距发生变化
  const handleChangeModuleTitlePadding = ($event: number, key: string) => {
    console.log('标题外边距发生变化', $event, key);
    HJNewJsonStore.value.componentsTree.forEach((item: any) => {
      if (item.customProps.hasOwnProperty('ModuleTitleCpt')) {
        item.customCss.forEach((customCssItem: any) => {
          if (customCssItem.prop === 'moduleTitle') {
            if (customCssItem.css.hasOwnProperty('padding')) {
              customCssItem.css.padding[key] = $event;
            } else {
              customCssItem.css.padding = {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
              };
              customCssItem.css.padding[key] = $event;
            }
          }
        });
      }
    });
  };
</script>
<style lang="scss" scoped>
  .global-theme-setting-bar-box {
    width: 100%;
    height: 50px;
    background-color: #fff;
    padding: 10px 25px;
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 2;
    .theme-color {
      .color-picker-box {
        margin: 0 8px 0 15px;
        :deep(.item-box) {
          height: 28px;
          width: 28px;
          transition: all 0.3s;
          margin: 0 5px;
          &:hover {
            transform: scale(1.07);
          }
          .custom-color-btn {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
          .item {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
      }
    }
    .module-padding {
      margin-right: 5px;
      .svg-icon {
        cursor: pointer;
        padding: 4px;
        transition: all 0.3s;
        &:hover {
          background-color: #eee;
          border-radius: 4px;
        }
      }
    }
  }
</style>
<style lang="scss">
  .global-module-padding--popver-content-box {
    .padding-item {
      margin-bottom: 10px;
      padding-left: 10px;
      p {
        font: 12px;
        font-weight: 600;
        margin-bottom: 2px;
        letter-spacing: 1px;
      }
      .el-slider__button {
        width: 12px;
        height: 12px;
      }
      .el-input-number {
        width: 120px;
      }
    }
  }
  .global-module-line-height-content-box {
    .padding-item {
      margin: 0;
      padding: 0;
    }
  }
</style>
