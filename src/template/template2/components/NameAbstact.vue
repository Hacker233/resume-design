<!-- 姓名与简介 -->
<template>
  <div class="name-introduce" v-if="modelData">
    <h1>{{ modelData.name }}</h1>
    <p>{{ modelData.abstract }}</p>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import { IBASEINFO } from '@/interface/model';
  const { resumeJsonStore } = storeToRefs(appStore.useResumeJsonStore); // 简历数据
  // 获得基础信息数据
  const modelData: IBASEINFO = resumeJsonStore.value.LIST.find((item) => {
    return item.model == 'BASE_INFO';
  }) as IBASEINFO;
</script>
<style lang="scss" scoped>
  .name-introduce {
    width: 100%;
    cursor: pointer;
    h1 {
      height: 30px;
      line-height: 29px;
      font-size: v-bind('modelData.style.titleFontSize');
      color: v-bind('modelData.style.titleColor');
      font-weight: v-bind('modelData.style.titleFontWeight');
      margin: 0 0 25px 0;
    }
    p {
      font-size: 14px;
      color: #686868;
      font-weight: 500;
    }
  }
</style>
