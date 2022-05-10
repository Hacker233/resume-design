<template>
  <div class="title">
    <h1>{{ title }}</h1>
  </div>
</template>
<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
}>(),
  {
    title: '模块选择'
  }
)


</script>
<style lang="less" scoped>
.title {
  height: 40px;
  width: 100%;
  background-color: aquamarine;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;

  h1 {
    font-size: 16px;
    letter-spacing: 3px;
  }
}
</style>