<!-- 兴趣爱好 -->
<template>
  <div class="hobbies">
    <!-- 标题 -->
    <model-title :title="data.title" :iconfont="data.iconfont"></model-title>
    <!-- 兴趣爱好 -->
    <div class="hobbies-content">
      <p>{{ data.content }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { IMATERIALITEM } from '@/interface/material';
  import { IHOBBIES } from '@/interface/model';
  import ModelTitle from './ModelTitle.vue';
  defineProps<{
    modelData: IMATERIALITEM;
    data: IHOBBIES;
  }>();
</script>
<style lang="scss" scoped>
  .hobbies {
    padding: v-bind('modelData.style.pTopBottom') v-bind('modelData.style.pLeftRight');
    margin-bottom: v-bind('modelData.style.mBottom');
    margin-top: v-bind('modelData.style.mTop');
    box-sizing: border-box;
    .hobbies-content {
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
