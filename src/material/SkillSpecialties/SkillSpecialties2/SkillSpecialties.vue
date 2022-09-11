<!-- 技能特长 -->
<template>
  <div class="skill-specialties">
    <!-- 标题 -->
    <div class="skill-title">
      <svg-icon icon-name="icon-techang" color="#fff" size="26px"></svg-icon>
      <h1>{{ modelData.title }}</h1>
    </div>
    <!-- 技能特长 -->
    <ul>
      <template v-for="item in modelData.LIST" :key="item.skillName">
        <li>
          <p>{{ item.skillName }}</p>
          <el-slider
            :model-value="vModelPro(item.proficiency)"
            :step="4"
            size="small"
            :format-tooltip="formatTooltip"
            disabled
          />
        </li>
      </template>
    </ul>
  </div>
</template>
<script setup lang="ts">
  import { ISKILLSPECIALTIES } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  import { numberToText, textToNumber } from '@/utils/common';
  defineProps<{
    modelData: ISKILLSPECIALTIES;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
  const vModelPro = (text: string) => {
    return textToNumber(text);
  };
  // 提示文字
  const formatTooltip = (number: number): string => {
    return numberToText(number);
  };
</script>
<style lang="scss" scoped>
  .skill-specialties {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    padding-top: v-bind('modelStyle.pTop');
    padding-bottom: v-bind('modelStyle.pBottom');
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    box-sizing: border-box;
    margin-top: v-bind('modelStyle.mTop');
    margin-bottom: v-bind('modelStyle.mBottom');
    .skill-title {
      display: flex;
      align-items: center;
      width: 100%;
      margin-bottom: 18px;
      h1 {
        font-size: 20px;
        color: #fff;
        margin: 0 0 0 10px;
      }
    }

    ul {
      display: flex;
      width: 100%;
      flex-direction: column;
      li {
        height: 44px;
        margin-bottom: 20px;
        list-style: none;
        p {
          padding: 0 0 6px 4px;
          color: v-bind('modelStyle.textColor');
          font-size: v-bind('modelStyle.textFontSize');
          font-weight: v-bind('modelStyle.textFontWeight');
        }
        :deep(.el-slider) {
          .el-slider__bar {
            background-color: #4487c6;
            border-radius: 0;
          }
          .el-slider__button {
            width: 10px;
            height: 10px;
            background-color: #4487c6;
            border: none;
          }
          .el-slider__runway {
            border-radius: 0;
          }
        }
      }
    }
  }
</style>
