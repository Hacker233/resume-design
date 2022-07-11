<!-- 自我评价 -->
<template>
  <div class="self-eavluation">
    <!-- 标题 -->
    <model-title :title="modelData.title"></model-title>
    <!-- 兴趣爱好 -->
    <div class="self-eavluation-content">
      <p>{{ modelData.content }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ISELFEVALUATION } from '@/interface/model';
  import ModelTitle from './ModelTitle.vue';
  defineProps<{
    modelData: ISELFEVALUATION;
  }>();
</script>
<style lang="less" scoped>
  .self-eavluation {
    margin-bottom: v-bind('modelData.style.mBottom');
    margin-top: v-bind('modelData.style.mTop');
    .self-eavluation-content {
      display: flex;
      flex-direction: column;
      display: flex;
      width: 100%;
      flex-direction: column;
      margin-top: 20px;
      p {
        letter-spacing: 2px;
        text-align: justify;
        font-size: v-bind('modelData.style.textFontSize');
        color: v-bind('modelData.style.textColor');
        font-weight: v-bind('modelData.style.textFontWeight');
        line-height: 1.5;
      }
    }
  }
</style>
