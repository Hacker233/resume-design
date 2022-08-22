<!-- 姓名与简介 -->
<template>
  <div v-if="modelData" class="name-introduce">
    <h1>{{ modelData.data.name }}</h1>
    <p>{{ modelData.data.abstract }}</p>
  </div>
</template>
<script lang="ts" setup>
  import appStore from '@/store';
  import { storeToRefs } from 'pinia';
  import { IBASEINFO } from '@/interface/model';
  const { resumeJsonNewStore } = storeToRefs(appStore.useResumeJsonNewStore); // 简历数据
  // 获得基础信息数据
  const modelData: IBASEINFO = resumeJsonNewStore.value.COMPONENTS.find(
    (item) => item.model == 'BASE_INFO'
  );
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
