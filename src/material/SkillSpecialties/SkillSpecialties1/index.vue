<!-- 技能特长 -->
<template>
  <div class="skill-specialties">
    <!-- 标题 -->
    <model-title :title="modelData.title" :model-style="modelStyle"></model-title>
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
  import ModelTitle from '../../ModelTitle/ModelTitle1/ModelTitle1.vue';
  import { ISKILLSPECIALTIES } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  defineProps<{
    modelData: ISKILLSPECIALTIES;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
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
