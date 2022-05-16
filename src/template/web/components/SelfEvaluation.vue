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
  import { ISELFEVALUATION } from '@/types/model';
  import ModelTitle from './ModelTitle.vue';
  defineProps<{
    modelData: ISELFEVALUATION;
  }>();
</script>
<style lang="less" scoped>
  .self-eavluation {
    padding: 0 40px;
    margin-bottom: 45px;
    .self-eavluation-content {
      display: flex;
      margin-top: 25px;
      p {
        letter-spacing: 2px;
        font-size: @primary-text-font-size;
        color: @primary-text-color;
        line-height: 1.5;
      }
    }
  }
</style>
