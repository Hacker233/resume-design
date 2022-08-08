<!-- 基础信息属性设置 -->
<template>
  <!-- 公共样式属性 -->
  <common-options></common-options>
</template>
<script setup lang="ts">
  import CommonOptions from './CommonOptions.vue';
  let activeName = ref('style');
</script>
<script lang="ts">
  export default {
    name: 'BASE_INFO_OPTIONS'
  };
</script>
<style lang="scss"></style>
