<template>
  <h1> 测试 vueUse 的鼠标坐标 </h1>
  <h3>Mouse: {{ x }} x {{ y }}</h3>
  <router-link to="/">点击跳转至首页</router-link>
</template>

<script lang="ts" setup>
  import { useMouse } from '@vueuse/core';
  const { x, y } = useMouse();
</script>
