<template>
  <!-- 标题样式属性 -->
  <common-title-options
    color-label="姓名字体颜色"
    font-size-label="姓名字体大小"
    font-weight-label="姓名字体粗细"
  ></common-title-options>
  <!-- 公共样式属性 -->
  <common-options></common-options>
</template>
<script setup lang="ts">
  import CommonOptions from './CommonOptions.vue';
  import CommonTitleOptions from './CommonTitleOptions.vue';
</script>
<script lang="ts">
  export default {
    name: 'BASE_INFO_OPTIONS'
  };
</script>
<style lang="scss"></style>
