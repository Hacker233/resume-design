<!-- 自我评价 -->
<template>
  <div class="self-eavluation">
    <!-- 标题 -->
    <slot name="model-title"></slot>
    <!-- 兴趣爱好 -->
    <div class="self-eavluation-content">
      <p>{{ data.content }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { IMATERIALITEM } from '@/interface/material';
  import { ISELFEVALUATION } from '@/interface/model';
  defineProps<{
    modelData: IMATERIALITEM;
    data: ISELFEVALUATION;
  }>();
</script>
<style lang="scss" scoped>
  .self-eavluation {
    padding: v-bind('modelData.style.pTopBottom') v-bind('modelData.style.pLeftRight');
    margin-bottom: v-bind('modelData.style.mBottom');
    margin-top: v-bind('modelData.style.mTop');
    box-sizing: border-box;
    .self-eavluation-content {
      display: flex;
      margin-top: 25px;
      p {
        letter-spacing: 2px;
        font-size: v-bind('modelData.style.textFontSize');
        color: v-bind('modelData.style.textColor');
        font-weight: v-bind('modelData.style.textFontWeight');
        line-height: 1.5;
      }
    }
  }
</style>
