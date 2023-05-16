<template>
  <div class="category-title-box">
    <svg-icon
      icon-name="icon-shixi1"
      class-name="category-title-icon"
      color="#00523d"
      size="23px"
    ></svg-icon>
    <h3>{{ title }}</h3>
  </div>
</template>
<script lang="ts" setup>
  defineProps<{
    title: string;
  }>();
</script>
<style lang="scss" scoped>
  .category-title-box {
    display: flex;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #eee;
    .category-title-icon {
      margin-right: 10px;
    }
    h3 {
      margin: 0;
      font-size: 16px;
      letter-spacing: 2px;
      color: #00523d;
    }
  }
</style>
