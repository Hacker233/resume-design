<template>
  <div class="template3-box">
    <!-- 简历模块 -->
    <template v-for="item in resumeJsonStore.LIST">
      <component v-if="item.style" :is="components[item.model]" :modelData="item"></component>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import BaseInfoVue from './components/BaseInfo.vue';
  import { useResumeJsonStore } from '@/store/resume';
  import { storeToRefs } from 'pinia';
  const { resumeJsonStore } = storeToRefs(useResumeJsonStore());
  // 注册局部组件
  const components: any = {
    BASE_INFO: BaseInfoVue
  };
</script>

<script lang="ts">
  export default {
    name: 'template3'
  };
</script>
<style lang="less" scoped>
  .template3-box {
    background: url(../../assets/images/template3_bg_2.png);
    background-repeat: no-repeat;
    min-height: 1160px;
  }
</style>
