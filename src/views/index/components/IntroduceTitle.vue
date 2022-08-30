<template>
  <div class="title">
    <h1>{{ title }}</h1>
    <p>{{ subtitle }}</p>
  </div>
</template>
<script lang="ts" setup>
  defineProps<{
    title: string;
    subtitle: string;
    titleColor: string;
    subtitleColor: string;
  }>();
</script>
<style lang="scss" scoped>
  .title {
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h1 {
      position: relative;
      letter-spacing: 3px;
      margin-bottom: 25px;
      color: v-bind('titleColor');
      &::before {
        content: '';
        width: 200px;
        height: 1px;
        background-color: #bdc7d0;
        position: absolute;
        left: -250px;
        top: 50%;
      }
      &::after {
        content: '';
        width: 200px;
        height: 1px;
        background-color: #bdc7d0;
        position: absolute;
        right: -250px;
        top: 50%;
      }
    }
    p {
      font-size: 14px;
      color: v-bind('subtitleColor');
    }
  }
</style>
