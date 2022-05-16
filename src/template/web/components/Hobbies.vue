<!-- 兴趣爱好 -->
<template>
  <div class="hobbies">
    <!-- 标题 -->
    <model-title :title="modelData.title"></model-title>
    <!-- 兴趣爱好 -->
    <div class="hobbies-content">
      <p>{{ modelData.content }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { IHOBBIES } from '@/types/model';
  import ModelTitle from './ModelTitle.vue';
  defineProps<{
    modelData: IHOBBIES;
  }>();
</script>
<style lang="less" scoped>
  .hobbies {
    padding: 0 40px;
    margin-bottom: 45px;
    .hobbies-content {
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
