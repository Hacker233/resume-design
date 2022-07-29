<template>
  <div class="title">
    <div class="left"></div>
    <div class="editor-resume">{{ modelData.title }}</div>
  </div>
</template>
<script lang="ts" setup>
  import { IRESUMETITLE, ISTYLE } from '@/interface/model';
  import { useResumeJsonStore } from '@/store/resume';
  import { storeToRefs } from 'pinia';
  const { resumeJsonStore } = storeToRefs(useResumeJsonStore());
  defineProps<{
    modelData: IRESUMETITLE;
  }>();
</script>

<style lang="scss" scoped>
  .title {
    width: 100%;
    min-height: 32px;
    margin-bottom: v-bind('modelData.style.mBottom');
    margin-top: v-bind('modelData.style.mTop');
    background-color: v-bind('resumeJsonStore.GLOBAL_STYLE.themeColor');
    display: flex;
    .left {
      min-height: 32px;
      width: 36px;
      background-color: #258bb1;
      margin-right: 18px;
    }

    .editor-resume {
      color: v-bind('modelData.style.textColor');
      outline: none;
      font-weight: v-bind('modelData.style.textFontWeight');
      font-size: v-bind('modelData.style.textFontSize');
      letter-spacing: 2px;
      word-break: break-all;
      width: 0;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: v-bind('modelData.style.align');
    }
  }
</style>
