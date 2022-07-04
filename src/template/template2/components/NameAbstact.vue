<!-- 姓名与简介 -->
<template>
  <div class="name-introduce" v-if="modelData">
    <h1>{{ modelData.name }}</h1>
    <p>{{ modelData.abstract }}</p>
  </div>
</template>
<script lang="ts" setup>
  import { useResumeJsonStore, useResumeModelStore } from '@/store/resume';
  import { storeToRefs } from 'pinia';
  const { resumeJsonStore } = storeToRefs(useResumeJsonStore()); // 简历数据
  // 获得基础信息数据
  const modelData = resumeJsonStore.value.LIST.find((item) => {
    return item.model == 'BASE_INFO';
  });
  console.log('modelData', modelData);
</script>
<style lang="less" scoped>
  .name-introduce {
    width: 100%;
    cursor: pointer;
    h1 {
      height: 30px;
      line-height: 29px;
      font-size: 30px;
      color: #414141;
      font-weight: 500;
      margin: 0 0 25px 0;
    }
    p {
      font-size: 14px;
      color: #686868;
      font-weight: 500;
    }
  }
</style>
