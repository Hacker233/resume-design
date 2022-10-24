<!-- 技能特长 -->
<template>
  <div class="skill-specialties">
    <!-- 标题 -->
    <model-title :title="modelData.title" :model-style="modelStyle"></model-title>
    <!-- 技能特长 -->
    <ul>
      <li
        v-for="(item, index) in modelData.LIST"
        :key="index"
        v-dompurify-html="item.introduce"
      ></li>
    </ul>
  </div>
</template>
<script setup lang="ts">
  import ModelTitle from '@/material/ModelTitle/ModelTitle5/ModelTitle.vue';
  import { ISKILLSPECIALTIES } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  import useGetLineLeft from '@/hooks/material/useTemplate3LeftLine';
  const props = defineProps<{
    modelData: ISKILLSPECIALTIES;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
  const { left } = useGetLineLeft(props.modelStyle, -23);
</script>
<style lang="scss" scoped>
  .skill-specialties {
    padding-top: v-bind('modelStyle.pTop');
    padding-bottom: v-bind('modelStyle.pBottom');
    padding-left: v-bind('modelStyle.pLeftRight');
    padding-right: v-bind('modelStyle.pLeftRight');
    box-sizing: border-box;
    margin-top: v-bind('modelStyle.mTop');
    margin-bottom: v-bind('modelStyle.mBottom');
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
      flex-direction: column;
      padding: 30px 30px 10px 66px;
      box-sizing: border-box;
      li {
        letter-spacing: 2px;
        font-size: v-bind('modelStyle.textFontSize');
        color: v-bind('modelStyle.textColor');
        font-weight: v-bind('modelStyle.textFontWeight');
        line-height: 1.5;
        text-align: justify;
        margin-bottom: 10px;
      }
    }
  }
</style>
