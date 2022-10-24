<!-- 技能特长 -->
<template>
  <div class="skill-specialties-content">
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
  import { ISKILLSPECIALTIES } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  defineProps<{
    modelData: ISKILLSPECIALTIES;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped>
  .skill-specialties-content {
    box-sizing: border-box;
    ul {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding-top: 15px;
      padding-left: 18px;
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
