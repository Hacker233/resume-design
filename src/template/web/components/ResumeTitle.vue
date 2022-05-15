<template>
  <div class="title">
    <div class="left"></div>
    <div class="editor-resume">{{ resumeTitle.title }}</div>
  </div>
</template>
<script lang="ts" setup>
  import { IRESUMETITLE, ISTYLE } from '@/types/model';
  import { reactive } from 'vue';
  const props = defineProps<{
    resumeTitle: IRESUMETITLE;
  }>();
  const style = reactive<ISTYLE>(props.resumeTitle.style);
</script>

<style lang="less" scoped>
  .title {
    width: 100%;
    min-height: 32px;
    margin-bottom: v-bind('style.mBottom');
    margin-top: v-bind('style.mTop');
    background-color: v-bind('style.backgroundColor');
    display: flex;
    .left {
      min-height: 32px;
      width: 36px;
      background-color: #258bb1;
      margin-right: 18px;
    }

    .editor-resume {
      color: v-bind('style.titleColor');
      outline: none;
      font-weight: v-bind('style.titleFontWeight');
      font-size: v-bind('style.titleFontSize');
      letter-spacing: 2px;
      word-break: break-all;
      width: 0;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: v-bind('style.align');
    }
  }
</style>
