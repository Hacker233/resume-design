<!-- 荣誉奖项 -->
<template>
  <div class="awards">
    <!-- 标题 -->
    <model-title :title="modelData.title" :model-style="modelStyle"></model-title>
    <!-- 荣誉奖项 -->
    <div class="awards-list">
      <ul v-for="(item, index) in modelData.LIST" :key="index">
        <!-- 获奖日期 -->
        <li v-show="modelData.isShow.date">{{ formatDate(item.date) }}</li>
        <!-- 奖项名称 -->
        <li v-show="modelData.isShow.awardsName">{{ item.awardsName }}</li>
        <!-- 奖项等级 -->
        <li v-show="modelData.isShow.awardsGrade">{{ item.awardsGrade }}</li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { IAWARDS } from '@/interface/model';
  import ModelTitle from '@/material/ModelTitle/ModelTItle4/ModelTitle.vue';
  import { formatDate } from '@/utils/common';
  import IMODELSTYLE from '@/interface/modelStyle';
  import useGetLineLeft from '@/hooks/material/useTemplate3LeftLine';
  const props = defineProps<{
    modelData: IAWARDS;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();

  const { left } = useGetLineLeft(props.modelStyle, -23);
</script>
<style lang="scss" scoped>
  .awards {
    padding-top: v-bind('modelStyle.pTop');
    padding-bottom: v-bind('modelStyle.pBottom');
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    box-sizing: border-box;
    margin-bottom: v-bind('modelStyle.mBottom');
    margin-top: v-bind('modelStyle.mTop');
    &::before {
      content: '';
      position: absolute;
      width: 1px;
      height: 100%;
      background-color: v-bind('modelStyle.themeColor');
      left: v-bind('left');
      top: 5px;
    }
    .awards-list {
      display: flex;
      width: 100%;
      flex-direction: column;
      padding: 30px 30px 10px 50px;
      box-sizing: border-box;

      ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
        li {
          list-style: none;
          font-size: v-bind('modelStyle.textFontSize');
          color: v-bind('modelStyle.textColor');
          font-weight: v-bind('modelStyle.textFontWeight');
          letter-spacing: 2px;
        }
        &:not(:last-child) {
          margin-bottom: 20px;
        }
      }
    }
  }
</style>
