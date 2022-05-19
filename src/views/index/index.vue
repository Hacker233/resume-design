<template>
  首页
  <el-button @click="toDesign">模板1</el-button>
</template>
<script setup lang="ts">
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const toDesign = () => {
    router.push({
      path: '/designer',
      query: {
        id: 1,
        name: 'web-develop'
      }
    });
  };
</script>
