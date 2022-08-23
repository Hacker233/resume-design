<template>
  <div class="title">
    <div class="left"></div>
    <div class="editor-resume">{{ data.title }}</div>
  </div>
</template>
<script lang="ts" setup>
  import { IMATERIALITEM } from '@/interface/material';
  import { IRESUMETITLE } from '@/interface/model';
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  const { resumeJsonNewStore } = storeToRefs(appStore.useResumeJsonNewStore);
  const props = defineProps<{
    modelData: IMATERIALITEM;
    data: IRESUMETITLE;
  }>();
  console.log('resumeTitle数据', props.modelData);
</script>

<style lang="scss" scoped>
  .title {
    width: 100%;
    min-height: 32px;
    padding: v-bind('modelData.style.pTopBottom') v-bind('modelData.style.pLeftRight');
    margin-bottom: v-bind('modelData.style.mBottom');
    margin-top: v-bind('modelData.style.mTop');
    box-sizing: border-box;
    background-color: v-bind('resumeJsonNewStore.GLOBAL_STYLE.themeColor');
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
