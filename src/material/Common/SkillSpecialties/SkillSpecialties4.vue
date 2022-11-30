<!-- 技能特长 -->
<template>
  <div class="skill-specialties-content">
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
  .skill-specialties-content {
    box-sizing: border-box;

    ul {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      justify-content: space-between;
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
            background-color: #333;
            opacity: 0.7;
            border-radius: 0;
          }
          .el-slider__button {
            width: 10px;
            height: 10px;
            background-color: #000;
            opacity: 0.7;
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
