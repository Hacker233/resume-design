<template>
  <div class="global-theme-setting-bar-box">
    <!-- 字体选择 -->
    <el-select
      v-model="defaultFamily"
      :teleported="true"
      placeholder="请选择字体"
      size="normal"
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
    <!-- 模块间距 -->
    <div class="module-padding">
      <el-popover placement="bottom" :width="350" trigger="click">
        <template #reference>
          <div>
            <el-tooltip effect="light" content="模块内边距" placement="bottom">
              <svg-icon
                icon-name="icon-zujianyangshi-bianju"
                color="#606266"
                size="28px"
              ></svg-icon>
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
  </div>
</template>
<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useFontFamilyList } from '../hooks/useFontFamlyList';
  import appStore from '@/store';
  import ColorPickerCustom from './ColorPickerCustom.vue';

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
    z-index: 100;
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
        width: 90px;
      }
    }
  }
</style>
