<!-- 兴趣爱好 -->
<template>
  <div class="hobbies-content">
    <!-- 兴趣爱好 -->
    <div class="hobbies-content">
      <p v-dompurify-html="modelData.content"></p>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { IHOBBIES } from '@/interface/model';
  import IMODELSTYLE from '@/interface/modelStyle';
  defineProps<{
    modelData: IHOBBIES;
    modelStyle: IMODELSTYLE; // 模块样式
  }>();
</script>
<style lang="scss" scoped>
  .hobbies-content {
    box-sizing: border-box;
    .hobbies-content {
      display: flex;
      padding-top: 15px;
      box-sizing: border-box;
      p {
        letter-spacing: 2px;
        font-size: v-bind('modelStyle.textFontSize');
        color: v-bind('modelStyle.textColor');
        font-weight: v-bind('modelStyle.textFontWeight');
        line-height: 1.5;
        text-align: justify;
      }
    }
  }
</style>
