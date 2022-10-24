<!-- 技能特长 -->
<template>
  <div class="skill-specialties">
    <!-- 标题 -->
    <slot name="model-title"></slot>
    <!-- 技能特长 -->
    <ul>
      <!-- 左边部分 -->
      <div class="left">
        <template v-for="(item, index) in modelData.LIST" :key="index">
          <li v-if="index % 2 === 0" v-dompurify-html="item.introduce"></li>
        </template>
      </div>
      <!-- 右边部分 -->
      <div class="right">
        <template v-for="(item, index) in modelData.LIST" :key="index">
          <li v-if="index % 2 != 0" v-dompurify-html="item.introduce"></li>
        </template>
      </div>
    </ul>
  </div>
</template>
<script setup lang="ts">
  import useGetLineLeft from '@/hooks/material/useTemplate3LeftLine';
  import { ISKILLSPECIALTIES } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  const props = defineProps<{
    modelData: ISKILLSPECIALTIES;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
  // 模板3左侧竖线
  const { left } = useGetLineLeft(props.modelStyle);
</script>
<style lang="scss" scoped>
  .skill-specialties {
    padding-top: v-bind('modelStyle.pTop');
    padding-bottom: v-bind('modelStyle.pBottom');
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    margin-bottom: v-bind('modelStyle.mBottom');
    margin-top: v-bind('modelStyle.mTop');
    box-sizing: border-box;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      width: 1px;
      height: 100%;
      background-color: v-bind('modelStyle.themeColor');
      left: v-bind('left');
      top: 5px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      .left,
      .right {
        flex: 40%;
        margin-top: 25px;
        li {
          letter-spacing: 2px;
          font-size: v-bind('modelStyle.textFontSize');
          color: v-bind('modelStyle.textColor');
          font-weight: v-bind('modelStyle.textFontWeight');
          line-height: 1.5;
          &:not(:last-child) {
            margin-bottom: 10px;
          }
        }
      }
      .left {
        padding: 0 20px;
      }
      .right {
        padding: 0 0 0 10px;
      }
    }
  }
</style>
